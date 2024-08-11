const express = require("express");
const { signUpFunction, 
        loginFunction, 
        downloadLogBookFunction,
        downloadAssessmentFunction
     } = require("../controllers/student-controllers");

const router = express.Router();

router.post("/sign-up", signUpFunction);
router.post("/login", loginFunction);
router.get('/download-logbook', downloadLogBookFunction);  // Changed to GET
router.get('/download-assessment', downloadAssessmentFunction);  // Changed to GET

module.exports = router;