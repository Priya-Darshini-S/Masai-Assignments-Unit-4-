const app = require("./index");

const connect = require("./configs/db");

app.listen(2007, async function () {
    await connect();
    console.log("listen on port 2007");
});

