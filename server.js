import express from "express";
import Routeslib from "./src/lib/Routes.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.listen(port);

console.log("rodando");

// SHA
// SHA@abc