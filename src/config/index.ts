import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error){
    throw new Error("Couldn't find .env file");
}

const config = {
    port: parseInt(process.env.port, 10),
    databaseURL: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    logs:{
        level: process.env.LOG_LEVEL || 'silly',
    },
    api:{
        prefix: '/api',
    }
}
export default config;