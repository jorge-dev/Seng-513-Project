import mongoose from "mongoose";
import logger from "../logger/devLogger.js";

const connectToMongoDB = async () => {
  const connection = mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection
    .then(() => {
      logger.info("Successfully connected to MongoDB");
    })
    .catch((err) => {
      logger.debug("Error connecting to MongoDB");
      logger.error(err);
    });
};
export default connectToMongoDB;
