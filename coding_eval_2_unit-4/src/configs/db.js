const moongoose = require("mongoose");

module.exports = () => {
    return moongoose.connect("mongodb://localhost:27017/coding_eval");
};