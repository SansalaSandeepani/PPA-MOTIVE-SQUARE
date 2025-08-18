
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({

    time: {
       type: String,   // format: "HH:mm" (24h) or "hh:mm AM/PM"
       required: true,
    },   
    date: {
        type: String,   // format: "YYYY-MM-DD"
        required: true,
    },
    Task_Id: {
        type: String,
        required: true,
        unique: true,
    },
    Task: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true
    }
})

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
