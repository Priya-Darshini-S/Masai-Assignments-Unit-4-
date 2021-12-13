const express = require("express");
const app = express();

const usersController = require("./controllers/user.controller");
const moviesController = require("./controllers/movie.controller");
const theatresController = require("./controllers/theatre.controller");
const screensController = require("./controllers/screen.controller");
const seatsController = require("./controllers/seat.controller");
const showsController = require("./controllers/show.controller");

app.use(express.json());

app.use("/users", usersController);
app.use("/movies", moviesController);
app.use("/theatre", theatresController);
app.use("/screens", screensController);
app.use("/seats", seatsController);
app.use("/shows", showsController);

module.exports = app;