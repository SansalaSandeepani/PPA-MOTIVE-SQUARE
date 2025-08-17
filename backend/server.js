const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json())

const URL = process.env.MONGODB_URI;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
})

//Import routes
const adminRouter = require("./routes/admin.js");
const studentRouter = require("./routes/student.js");
const courseRouter = require("./routes/course.js");

//Use routes
app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/course", courseRouter);


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoBD Connection Success!!");
})












app.listen(PORT, () => {
    console.log('Server is up and Running on port : ${PORT}')
})