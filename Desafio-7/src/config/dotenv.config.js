import dotenv from 'dotenv'

dotenv.config({path: 'src/.env'});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    fileSystemPath: process.env.FILESYSTEM_PATH,
    pers: process.env.PERS,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}