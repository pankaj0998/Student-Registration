import dotenv from "dotenv"
dotenv.config();

export const config = {
  app: {
    host: process.env.APP_HOST || "localhost",
    port: parseInt(process.env.APP_PORT, 10) || 9000,
    protocol: process.env.APP_PROTOCOL || "http",
    name: process.env.APP_NAME || "Student Registration",
    environment: process.env.NODE_ENV || "development",
  },
  database: {
    mongodb: {
      uri: getMongoDBURI(),
      options: {
        serverSelectionTimeoutMS:parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT, 10) || 50,
        connectTimeoutMS: parseInt(process.env.MONGO_CONNECT_TIMEOUT, 10) || 50,
      },
    },
    collectionName: {
      registration: process.env.REGISTRATION || "registrations",
    },
  },
  corsOption: {
    origin: "*"
  }
};

function getMongoDBURI() {
  const mongoCredentials =
    process.env.MONGO_USER &&
    process.env.MONGO_USER !== "" &&
    process.env.MONGO_PASSWORD &&
    process.env.MONGO_PASSWORD !== ""
      ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
      : "";
  const uri = process.env.MONGO_URI
    ? process.env.MONGO_URI
    : `mongodb://${mongoCredentials}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?${process.env.MONGO_QUERY_PARAMS}`;
  return uri;
}
