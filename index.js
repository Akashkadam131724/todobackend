// imports
import { config } from "dotenv";
config();
import express from "express";
import ConnectDB from "./src/db/db.js";

// Routes-----------------------
import ToDoRoute from "./src/routes/todo.js";

// -----------------------

const app = express();

// middleware --------------------------------
app.use(express.json());
//---------------

const DB = process.env.DB;
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("??hello world");
});

app.use("/todo", ToDoRoute);

// connect to Db and listen on port
app.listen(PORT, async () => {
  await ConnectDB(DB);
  console.log("listening on Port", ", " + PORT);
});
