import jwt from "jsonwebtoken";

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export default generateAuthToken;
