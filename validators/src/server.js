const express = require("express");

const connect = require("./configs/db");

const app = require("./index")


const usersController = require("./controllers/user.controller");



app.use(express.json());

app.use("/users", usersController);

app.listen(2333, async function (){
    await connect();
    console.log("Listening in port 2333");
});


