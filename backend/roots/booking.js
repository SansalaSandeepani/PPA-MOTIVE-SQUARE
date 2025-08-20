const router = require("express").Router();
const { response } = require("express");
let booking = require("../models/booking");

// Add booking

router.route("/add").post((req, res) => {

    const Booking_ID = req.body.Booking_ID;
    const Lec_ID = req.body.Lec_ID;
    const Book_date = req.body.Book_date;
    const Book_time = req.body.Book_time;

    const newbooking = new booking({

        Booking_ID,
        Lec_ID,
        Book_date,
        Book_time

    })

    newbooking.save().then(() => {
        res.json("booking Added")
    }).catch((err) => {
        console.log(err);
    })

})

//Get All booking

router.route("/").get((req, res) => {

    booking.find().then((Booking) => {
        res.json(Booking)
    }).catch((err) => {
        console.log(err)
    })

})


//update Admin

router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {
        Booking_ID,
        Lec_ID,
        Book_date,
        Book_time
    } = req.body;

    const updateBooking = {
        Booking_ID,
        Lec_ID,
        Book_date,
        Book_time
    }

    const update = await booking.findByIdAndUpdate(userId, updateBooking).then(() => {
        res.status(200).send({
            status: "Booking Updated",
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            status: "Error with updating data",
            error: err.message
        });
    })

})


//delete booking

router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await booking.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "booking Delete" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })

})

//getOnlyOneUserData

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await booking.findById(userId).then((admin) => {
        res.status(200).send({
            status: "user Fetched",
            admin
        })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Erroe with get user", error: err.message })
    })
})





module.exports = router;
