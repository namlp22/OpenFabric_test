require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { productRouter } = require("./src/routes/product");
const { authRouter } = require("./src/routes/auth");

const connectToMongoDB = require("./src/database/db");

app.use(express.json());

app.use(cors({
  origin: ['https://openfabric-test-peach.vercel.app'],
  credentials:true,   
}));

app.use("/product", productRouter);

app.use("/auth", authRouter);

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
