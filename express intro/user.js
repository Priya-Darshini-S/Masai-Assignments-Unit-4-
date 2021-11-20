const express = require("express");
const users = require("./users.json")
//console.log(express);
const app= express();

app.get("/users",(req, res)=> {
    res.send({users});
});

app.listen(3001, function() {
    console.log('listening at 3001:', 3001)
});