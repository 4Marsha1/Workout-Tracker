const mongoose = require("mongoose")
const expressAsyncHandler = require("express-async-handler");
const MONGO_URI = "mongodb+srv://4Marsha1:test1234@workoutappmern.i98h01k.mongodb.net/?retryWrites=true&w=majority"

const connectDB = expressAsyncHandler(async (req, res) => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGO_URI);
        // console.log(conn)
        console.log(`Connected Successfully to ${conn.connection.host}`);
    } catch (err) {
        res.status(501);
        throw new Error('Connection to Database Failed')
    }
})

module.exports = connectDB;