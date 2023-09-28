import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || "production"

dotenv.config({path: environment === "production" ? "src/.env.production" : "src/.env.development"});

export default {
    environment: environment,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    fileSystemPath: process.env.FILESYSTEM_PATH,
    pers: process.env.PERS,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS
}