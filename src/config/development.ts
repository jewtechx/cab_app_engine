import { Config } from ".";

const config:Config = {
    app: {
        name: "Cab App",
        environment: "development",
        port:8080
    },
    db:{
        uri:process.env.MONGODB_DEV_URI || ""
    }
}

export default config