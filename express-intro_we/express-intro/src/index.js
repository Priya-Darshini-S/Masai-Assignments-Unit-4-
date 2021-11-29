const express = require("express");

const usersController = require("./controllers/users.controller");
const tagsController = require("./controllers/tags.controller");
const postsController = require("./controllers/posts.controller");
const commentsController = require("./controllers/comments.controller");

const app = express();

app.use(express.json());

app.use("/posts", postsController);
app.use("/comments", commentsController);
app.use("/users", usersController);
app.use("/tags", tagsController);

module.exports = app;
