const express = require("express");

const connect = require("./configs/db");

const app = require("./index")


const usersController = require("./controllers/user.controller");
const evalsController = require("./controllers/eval.controller");
const studentController = require("./controllers/student.controller");
const topicsController = require("./controllers/topic.controller");


app.use(express.json());

app.use("/users", usersController);
app.use("/eval", evalsController);
app.use("/students", studentController);
app.use("/topic", topicsController);

app.listen(2009, async function (){
    await connect();
    console.log("Listening in port 2009");
});


