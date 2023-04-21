const mongoose = require("mongoose");
const filter = require("../util/filter");

const QuestionSchema = new mongoose.Schema(
    {
        poster: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        
       
    },
          { timestamps: true }
);


module.exports = mongoose.model("question", QuestionSchema);