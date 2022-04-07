import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import logger from "../logger/devLogger.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      logger.debug(`decoded: ${JSON.stringify(decoded)}`);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      logger.error(error);
      res.status(401);
      let sendError = "";
      switch (error.name) {
        case "TokenExpiredError":
          sendError = "Your Session is expired. Please sign in again.";
          break;
        case "JsonWebTokenError":
          sendError = `Invalid Token: ${error.message} .\n Please sign in again.`;
          break
        case "NotBeforeError":
          sendError = "Your Session is not valid yet. Please sign in again.";
          break
        default:
          sendError = "Invalid Token. Please sign in again.";
          break;
      }
      throw new Error(sendError);
    }

  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const authenticateAdmin = (req, res, next) => {
  logger.debug(`authenticateAdmin was called`);
  logger.debug(`req: ${JSON.stringify(req.user)}`);
  if (req.user.isAdmin && req.user) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized. Must be admin to access this endpoint");
  }
};

export const isUserAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized, token failed. Please login");
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized, no token found. Please login");
  }
};

// export{ authenticate, isUserAuthenticated };
