const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_PATH = "../database/db.json";

// READ DB
app.get("/get", (req, res) => {
  let data = fs.readFileSync(DB_PATH);
  res.json(JSON.parse(data));
});

// SAVE DB
app.post("/save", (req, res) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(req.body, null, 2));
  res.send("Saved successfully");
});

app.listen(3000, () => console.log("Server running on 3000"));