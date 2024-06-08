// imports
import { config } from "dotenv";
config();
import express from "express";
import ConnectDB from "./src/db/db.js";

import ToDoRoute from "./src/routes/todo.js";
import TickerRoute from "./src/routes/ticker.js";

const app = express();
app.use(express.json());

const DB = process.env.DB;
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello world</h1>`);
});

app.use("/todo", ToDoRoute);
app.use("/ticker", TickerRoute);

app.listen(PORT, async () => {
  await ConnectDB(DB);
});
