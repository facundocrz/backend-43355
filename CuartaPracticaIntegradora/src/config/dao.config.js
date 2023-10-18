import config from './dotenv.config.js'

export default {
    fileSystem: {
        path: config.fileSystemPath,
    },
    mongoDB: {
        cnxStr: config.mongoUrl,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }
}