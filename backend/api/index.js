import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Load environment variables from .env file

const app = express();
// console.log("hello", process.env.HELLO);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB there");
});

app.get("/", (req, res) => {
  res.json("Server is ready sdd");
});

app.get("/api/data", (req, res) => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "a@gmail.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "b@gmail.com",
    },
    {
      id: 3,
      name: "Jim Doe",
      email: "c@gmail.com",
    },
  ];

  res.json(dummyData);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
