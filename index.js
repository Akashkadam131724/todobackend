require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!2");
});

app.get("/twitter", (req, res) => {
  res.send("Hello Twitter");
});

app.get("/login", (req, res) => {
  res.send("<h1>Hello Login page</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
