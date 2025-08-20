const router = require("express").Router();
const { response } = require("express");
let Course = require("../models/course");


//add Course

router.route("/add").post((req, res) => {

    const course_id = req.body.course_id;
    const name = req.body.name;
    const category = req.body.category;
    const status = req.body.status;

    const newCourse = new Course({

        course_id,
        name,
        category,
        status

    })

    newCourse.save().then(() => {
        res.json("Course Added")
    }).catch((err) => {
        console.log(err);
    })

})



//Get All course

router.route("/").get((req, res) => {

    Course.find().then((course) => {
        res.json(course)
    }).catch((err) => {
        console.log(err)
    })

})


//update Course

router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {
        course_id,
        name,
        category,
        status
    } = req.body;

    const updateCourse = {
        course_id,
        name,
        category,
        status
    }

    const update = await Course.findByIdAndUpdate(userId, updateCourse).then(() => {
        res.status(200).send({
            status: "Course Updated",
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            status: "Error with updating data",
            error: err.message
        });
    })

})

//delete Course

router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await Course.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User Delete" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })

})

//getOnlyOneUserData

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Course.findById(userId).then((Course) => {
        res.status(200).send({
            status: "user Fetched",
            Course
        })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Erroe with get user", error: err.message })
    })
})



module.exports = router;