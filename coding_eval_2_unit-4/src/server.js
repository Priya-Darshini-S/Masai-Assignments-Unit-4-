
const app = require("./index");
const connect = require("./configs/db");

app.listen(2123, async function() {
    await connect();
    console.log("listening at port 2123");
})