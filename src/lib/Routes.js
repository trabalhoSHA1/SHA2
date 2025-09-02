import express from "express";
const routes = express();

routes.use(express.json());

const users = [];

routes.post("/", (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

routes.get("/", (req, res) => {
  res.status(200).json(users);
});

export default routes;
