import express from "express";
import db from "./db/index.js";
import { User } from "./db/entities/User.js";
var app = express();

const PORT = 5000;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const name = req.body.username;
    const password = req.body.password;
    if (!name || !password) {
      console.log("need both");
      res.send("You need a valid username and password to create an account");
    }
    const user = new User();
    user.userName = name;
    user.password = password;
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.send("failed to create a new user");
  }
});


app.get("/", (req, res) => {
  res.send("Server UP!");
});

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
  db.initialize();
});
