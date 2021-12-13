// Create a movies collection which has the following fields

// name
// actors ( array )
// languages ( array )
// directors ( array )
// poster_url ( image_url of the poster )

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        actors: [{ type: String, required: true}],
        languages: [{ type: String, required: true }],
        directors: [{ type: String, required: true }],
        poster_url: [{ type: String, required: true }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;