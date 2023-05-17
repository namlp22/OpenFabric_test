require("dotenv").config();
const express = require("express");
const allowCors = require('./cors');

const app = express();

const { productRouter } = require("./src/routes/product");
const { authRouter } = require("./src/routes/auth");

const connectToMongoDB = require("./src/database/db");

app.use(express.json());

app.use("/product", allowCors(productRouter));

app.use("/auth", allowCors(authRouter));

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(process.env.PORT, () =>
      console.log(`Server started port: http://localhost:${process.env.PORT}/`)
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
