const app = require("./index");
const connect = require("./configs/db");

app.listen(2456, async function () {
  await connect();
  console.log("listening on port 2456");
});
