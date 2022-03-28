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
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

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
