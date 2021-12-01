const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        roll_id: { type: Number, required: true },
        curr_batch: { type: Number, required: true },
        user_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "user",
           required: true,          
        },
        eval_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "eval",
            required: true,          
        },
        topic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "topic",
            required: true,          
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;