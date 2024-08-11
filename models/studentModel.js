const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    matricNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;