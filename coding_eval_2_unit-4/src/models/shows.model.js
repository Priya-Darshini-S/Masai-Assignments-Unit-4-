// Create a shows collection which has the following fields

// timing
// show ( references the movies collection )
// total_seats
// screen ( references the screens collection )

const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        timing: { type: String, required: true},
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movie",
            required: true
 
        },
        total_Seats: { type: Number, required: true },
        screen_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "screen",
            required: true
 
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Show = mongoose.model("show", showSchema);
module.exports = Show;