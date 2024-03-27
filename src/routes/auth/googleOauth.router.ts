import express from "express";
import { google } from "googleapis";
import config from "../../config";
import { signJwt } from "../../utils/token";

const {oauth:
    {google:
        {clientId,clientSecret}
    }, app: {baseUrl}} = config

const router = express();

const redirectURI = "auth/google/callback";

const oauth2Client = new google.auth.OAuth2(
  clientId.trim(),
  clientSecret.trim(),
  `${baseUrl}/${redirectURI}`
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// Generate Google OAuth2 URL
function getGoogleAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
}

// Endpoint to get Google OAuth2 URL
router.get("/google/url", (req, res) => {
  return res.send(getGoogleAuthURL());
});

// Exchange code for tokens and fetch user profile
router.get(`/google/callback`, async (req, res) => {
  const code = req.query.code as string;
console.log('clientID',clientId)
console.log('clientSecret',clientSecret)
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens)
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: googleUser } = await oauth2.userinfo.get();
    console.log(googleUser)

    const token = signJwt(googleUser);

    res.cookie('tokens', token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });

    res.redirect(baseUrl);
  } catch (error) {
    res.status(500).send(`Error fetching user: ${error}`);
  }
});

export default router