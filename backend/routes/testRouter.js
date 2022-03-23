import express from "express";
import Test from "../models/testModel.js";
import data from "../testData.js";

const testRouter = express.Router();

testRouter.get("/", async (req, res) => {
  await Test.deleteMany({});
  const createTest = await Test.insertMany(data.test);
  res.send(createTest);
});

export default testRouter;
