const studentModel = require("../models/studentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET_KEY;

const signUpFunction = async (req, res) => {
    const { firstName, lastName, matricNumber, accountType, password } = req.body;

    console.log('All sign up data:', { firstName, lastName, matricNumber, accountType, password });

    try {
        if (!firstName || !lastName || !matricNumber || !accountType || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await studentModel.findOne({ matricNumber });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        // Hash password using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newStudent = new studentModel({
            firstName,
            lastName,
            matricNumber,
            accountType,
            password: hashedPassword
        });

        const savedStudent = await newStudent.save();

        if (!savedStudent) {
            console.log("Failed to register student.");
            return res.status(500).json({ error: "Failed to register student." });
        }
console.log("Account created successfully!")
        return res.status(201).json({ message: "Account created successfully!" });
        
    } catch (error) {
        console.error("Server error during sign up:", error);
        return res.status(500).json({ error: "Internal server error!" });
    }
};



const loginFunction = async (req, res) => {
    const { matricNumber, password } = req.body;
console.log(matricNumber, password)
    try {
        if (!matricNumber) {
            return res.status(400).json({ error: 'User matric number is required!' });
        }

        if (!password) {
            return res.status(400).json({ error: 'User password is required!' });
        }

        const student = await studentModel.findOne({ matricNumber });

        if (!student) {
            return res.status(404).json({ error: 'Account does not exist!' });
        }

        const isPasswordValid = bcrypt.compareSync(password, student.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ matricNumber }, jwt_secret, { expiresIn: '1h' });
console.log("login successfully!")
        return res.status(200).json({
            firstName: student.firstName,
            lastName: student.lastName,
            matricNumber: student.matricNumber,
            token,
            accountType: student.accountType // Assuming you have accountType in your schema
        });

    } catch (error) {
        console.log('error login', error)
        return res.status(500).json({ error: "Internal server error!" });
    }
};




const downloadLogBookFunction = (req, res) => {
  const filePath = path.join(__dirname, '..', 'files', 'siwes-logbook.pdf');
  if (fs.existsSync(filePath)) {
      res.download(filePath, 'siwes-logbook.pdf', (err) => {
          if (err) {
              console.error('Error downloading the logbook:', err);
              res.status(500).send('Failed to download logbook.');
          }
      });
  } else {
      console.error('File not found:', filePath);
      res.status(404).send('Logbook file not found.');
  }
};





const downloadAssessmentFunction = (req, res) => {
    const filePath = path.join(__dirname, '..', 'files', 'siwes-monthly-assessment.docx');
    res.download(filePath, 'siwes-monthly-assessment.docx', (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            res.status(500).send('Could not download the file.');
        }
    });
};

module.exports = { signUpFunction, 
                    loginFunction, 
                    downloadLogBookFunction,
                    downloadAssessmentFunction
                 }