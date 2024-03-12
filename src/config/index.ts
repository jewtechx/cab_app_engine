import development from "./development"
import production from './production'

export interface Config {
    app : {
        name: string,
        port: string | number,
        environment: string
    },
    db: {
        uri:string
    }
}

const config = process.env.NODE_ENV == "development" ? development : production

export default config