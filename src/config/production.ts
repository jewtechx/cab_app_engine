import { Config } from ".";

const config:Config = {
    app: {
        name: "Cab App",
        environment: "production",
        port: process.env.PORT || 8080
    },
    db:{
        uri:process.env.MONGODB_PROD_URI || ""
    }
}

export default config