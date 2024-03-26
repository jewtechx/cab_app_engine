import IService, { IAppContext } from '../types/app';
import { IUserAuth, IUserInput, IUserResetPasswordInput, IUserVerificationInput } from '../types/user/user';
import sendSms from '../utils/sms';
import log from '../utils/log';
import otp from 'otp-generator'

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  // registers user
  async registerUser(req,res){
    try {
      const {phoneNumber} = req.body
      if(!phoneNumber){
        res.status(422).send('no input was received')
      }
      const _user = await this.models.User.findOne({ phoneNumber});
      if (_user) throw new Error('User already exists');
      
      const user = new this.models.User({phoneNumber});
      await user.save();
      
      await sendSms(phoneNumber,`This is your cab app verification code: ${user.verificationCode}. Thank you for signing up.`)
      
      return user
      
    } catch (e) {
      res.status(500).send(`Error creating new user: ${e}`)
    }
  }

  //verifies user
  async verifyUser(req,res): Promise<boolean> {
    const { id, verificationCode } = req.body;
    if(!id || !verificationCode){
      res.status(422).send('missing required fields')
    }
    try {
      // Find the user by Id
      const user = await this.authenticate_user(id)
      // Check if the user is already verified
      if (user.verified) {
        res.status(500).send('user is already verified')
      }
      
      // Check if verificationCode matches
      if (user.verificationCode != verificationCode) {
        res.status(500).send('Invalid verification code')
      }
      
      // Set verified to true and save user
      user.verified = true;
      await user.save();
      
      return true;
    } catch (e) {
      res.status(500).send(`Error validating user: ${e}`)
    }
  }

  // sends password reset code to user's email
  async forgotPassword(req,res) {
   try{
    const { phoneNumber } = req.body;
    if(!phoneNumber){
      res.status(422).send('no input received')
    }
    
    const user = await this.models.User.findOne({ phoneNumber });
    
    if (!user) {
      res.status(404).send('user not found')
    }
    
    if (!user.verified) {
      res.status(500).send('user is not verified')
    }

    const passwordResetCode = otp.generate(4,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});

    user.passwordResetCode = passwordResetCode;

    await user.save();

    await sendSms(phoneNumber,`This is your cab app password reset code:${user.passwordResetCode}`)

    log.debug(`Password reset code sent to ${user.phoneNumber}`);

    const message = 'password reset code sent';
    return message;
   }catch(e){
    res.status(500).send(`error handing password reset: ${e}`)
   }
  }

  // resets user's password to new password from email
  async resetPassword(req,res) {
    try{
      const { id, passwordResetCode, newPassword } = req.body;

    if(!id || !passwordResetCode || !newPassword ){
      res.status(422).send('missing required fields')
    }

    const user = await this.authenticate_user(id)

    if (!user || user.passwordResetCode !== passwordResetCode) {
      res.status(404).send('Could not reset password');
    }

    user.passwordResetCode = null;

    user.password = newPassword;

    await user.save();  

    const message = 'Successfully updated password';
    return message;
    }catch(e){
      res.status(500).send('error reseting password')
    }
  }

  // login user
  async loginUser(req,res) {
    const { phoneNumber, password } = req.body;
    if(!phoneNumber || !password){
      res.status(500).send('missing required fields')
    }

    const user = await this.models.User.findOne({ phoneNumber });
    if (!user) {
      res.status(404).send('user not found');
    }

    try {
      const valid = await user.validatePassword(password);
      if (!valid) {
        res.status(500).send('password incorrect');
      }
    } catch (e) {
      res.status(500).send('error logging in')
    }

    return user;
  }

  // updates user details
  async updateUser(req,res) {
    try {
      const user = await this.authenticate_user(req.user._id)
  
      if ('rating' in req.body) {
        user.rating = req.body.rating;
      } else {
        if (user._id.toString() !== req.user._id.toString()) {
          throw new Error(`Unauthorized: Cannot update another user's details`);
        }
  
        for (const key in req.body) {
          if (key !== 'rating') {
            user[key] = req.body[key];
          }
        }
      }
  
      await user.save();
  
      return user;
    } catch (e) {
      res.status(500).send(`Error updating user: ${e.message}`);
    }
  }
  
  // deletes user account
  async deleteUser(req,res) {
    const user = await this.authenticate_user(req.user._id)
    if(!user){
      res.status(404).send('Error deleting user')
    }

    try {
      await this.models.User.findByIdAndDelete(req.user._id);
      res.status(200).send(`Deleted user successfully`);
    } catch (e) {
      res.status(500).send(`Error deleting user`);
    }
  }

  // getting user rating
  async getUserRating(req,res) {
    try {
      const user = await this.models.User.findOne({_id:req.user._id});
      if (user.rating.length === 0) {
        return {
          averageRating: 0,
          totalRatings: 0,
        };
      }

      const totalScore = user.rating.reduce((sum: any, rating: any) => sum + rating.score, 0);
      const averageRating = totalScore / user.rating.length;

      return {
        averageRating,
        totalRatings: user.rating.length,
      };
    } catch (error) {
      res.status(500).send('Failed to fetch ratings');
    }
  }
}
