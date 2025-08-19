const router = require("express").Router();
const { response } = require("express");
let Student = require("../models/student");

//add Student

router.route("/add").post((req, res) => {

    const Student_id = req.body.Student_id;
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const email = req.body.email;
    const number = Number(req.body.number);
    const username = req.body.username;
    const password = req.body.password;
    const status = req.body.status;

    const newStudent = new Student({

        Student_id,
        name,
        age,
        gender,
        number,
        username,
        email,
        password,
        status

    })

    newStudent.save().then(() => {
        res.json("Student Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Get All Students

router.route("/").get((req, res) => {

    Student.find().then((student) => {
        res.json(student)
    }).catch((err) => {
        console.log(err)
    })

})


//update Students

router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {
        Student_id,
        name,
        age,
        gender,
        number,
        username,
        email,
        password,
        status
    } = req.body;

    const updateStudents = {
        Student_id,
        name,
        age,
        gender,
        number,
        username,
        email,
        password,
        status
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudents).then(() => {
        res.status(200).send({
            status: "Student Updated",
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            status: "Error with updating data",
            error: err.message
        });
    })

})

//delete Student

router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User Delete" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })

})

//getOnlyOneUserData

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId).then((Student) => {
        res.status(200).send({
            status: "user Fetched",
            Student
        })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Erroe with get user", error: err.message })
    })
})


module.exports = router;