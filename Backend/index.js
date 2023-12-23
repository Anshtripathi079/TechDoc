const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/Post");
const uploadMiddleware = multer({ dest: "uploads/" });

const app = express();

require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.genSaltSync(10);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    // origin: "http://localhost:5174",
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.CONN);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  try {
    const decoded = await jwt.verify(token, secret);
    res.json(decoded);
  } catch (err) {
    console.error("Error verifying JWT:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/createpost", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newpath = path + "." + ext;
  fs.renameSync(path, newpath);
  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    content,
    summary,
    cover: newpath,
  });
  res.json(postDoc);
});

app.get("/", (req, res) => {
  res.json("hello");
});
app.listen(4000);
