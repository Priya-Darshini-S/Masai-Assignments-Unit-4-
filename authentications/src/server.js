//const express = require("express");

const connect = require("./configs/db");

const app = require("./index")




app.listen(2163, async function (){
    await connect();
    console.log("Listening in port 2163");
});


