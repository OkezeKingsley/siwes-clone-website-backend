const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoute");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB CONNECTED")
    app.listen(PORT, () => {
        console.log(`SERVER LISTENING ON PORT ${PORT}`)
    })
}).catch((error) => {
    console.log("ERROR CONNECTING TO DB", error)
});



app.use(studentRoutes);

