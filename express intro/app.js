const express = require("express");
//console.log(express);
const app= express();

app.get("/",(req, res)=> {
    res.send("Hello")
})

app.listen(3000, function() {
    console.log('listening at 3000:', 3000)
});