// Create a theatres collection which has following fields

// name
// location

// Create a movies collection which has the following fields

// name
// actors ( array )
// languages ( array )
// directors ( array )
// poster_url ( image_url of the poster )

const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        location: { type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Theatre = mongoose.model("theatre", theatreSchema);
module.exports = Theatre;