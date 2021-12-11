const express = require("express");
const { register, login, router } =require("./controllers/user_auth.controller")
const postController = require("./controllers/post.controller")
const app = express();
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.get("/", router);

app.use("/posts", postController )
module.exports = app;