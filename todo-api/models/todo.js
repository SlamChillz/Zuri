const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TodoSchema = new Schema(
    {
        _id: {type: String, trim: true,},
        title: {
            type: String,
            set: (v) => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase(),
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true },
);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;