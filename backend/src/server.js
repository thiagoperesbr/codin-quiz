import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import quizRouter from "./routes/quizRouter.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/quiz", quizRouter);

app.use(errorHandler);

mongoose
  .connect("mongodb+srv://codin:Deinf00@asstin.huqsjwp.mongodb.net/quiz")
  .then(() => {
    app.listen(8800, () => {
      console.log(`Server running on port 8800 - MongoDB connected.`);
    });
  })
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});
