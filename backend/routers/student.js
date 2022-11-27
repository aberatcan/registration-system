const express = require("express");
const StudentController = require("../controllers/student");

const router = express.Router();


router.route("/login").post(StudentController.loginController);
router.route("/listAllGivenCourses").get(StudentController.listAllGivenCoursesController);
router.route("/viewTakenCourses").post(StudentController.viewTakenCoursesController);
router.route("/searchKeyword").post(StudentController.searcKeywordController);
router.route("/filterCourses").post(StudentController.filterCoursesController);

module.exports = router;