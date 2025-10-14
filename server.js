import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

const users = [];

app.post("/", (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

app.get("/", (req, res) => {
  res.status(200).json(users);
});


app.listen(port);

console.log("rodando");

// SHA
// SHA@abc