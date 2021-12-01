const mongoose = require("mongoose");

const evalSchema = new mongoose.Schema(
    {
        eval_date: { type: String, required: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true, 
         }
    
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Eval = mongoose.model("eval", evalSchema);

module.exports = Eval;