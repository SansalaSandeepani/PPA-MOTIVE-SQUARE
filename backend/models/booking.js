const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookingSchema = new Schema({

    Booking_ID: {
        type: String,
        required: true,
        unique: true,
    },
    Lec_ID: {
        type: String,
        required: true,
    },
    Book_date: {
        type: String,
        required: true,
    },
    Book_time: {
        type: String,
        required: true
    }
})

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
