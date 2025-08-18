const router = require("express").Router();
const { response } = require("express");
let task = require("../models/task");

// Add Task

router.route("/add").post((req, res) => {

    const time = req.body.time;
    const date = req.body.date;
    const Task_Id = req.body.Task_Id;
    const Task = req.body.Task;
    const answer = req.body.answer;
    const discription = req.body.discription;


    const newTask = new task({

        time,
        date,
        Task_Id,
        Task,
        answer,
        discription

    })

    newTask.save().then(() => {
        res.json("task Added")
    }).catch((err) => {
        console.log(err);
    })

})


//Get All Admins

router.route("/").get((req, res) => {

    task.find().then((Task) => {
        res.json(Task)
    }).catch((err) => {
        console.log(err)
    })

})

//update task

router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {
        time,
        date,
        Task_Id,
        Task,
        answer,
        discription
    } = req.body;

    const updateTask = {
        time,
        date,
        Task_Id,
        Task,
        answer,
        discription
    }

    const update = await task.findByIdAndUpdate(userId, updateTask).then(() => {
        res.status(200).send({
            status: "Task Updated",
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            status: "Error with updating data",
            error: err.message
        });
    })

})


//delete task

router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await task.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "task Delete" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })

})

//getOnlyOneUserData

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await task.findById(userId).then((task) => {
        res.status(200).send({
            status: "task Fetched",
            task
        })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Erroe with get user", error: err.message })
    })
})





module.exports = router;
