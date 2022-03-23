import { format, createLogger, transports } from "winston";
const { timestamp, combine, printf, errors } = format;
import dotenv from "dotenv";

dotenv.config();
console.log("log level:", process.env.LOG_LEVEL);

function logger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}
const devLogger = logger();
devLogger.info("Logger initialized");

export default devLogger;
