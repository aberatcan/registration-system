const express = require("express");
const InstructorController = require("../controllers/instructor");

const router = express.Router();

router.route("/login").post(InstructorController.loginController);
router.route("/createCourse").post(InstructorController.createCourseController);
router.route("/getAllClassrooms").post(InstructorController.getAllClassroomsController);
router.route("/addPrerequisites").post(InstructorController.addPrerequisitesController);
router.route("/viewAllStudents").post(InstructorController.viewAllStudentsController);
router.route("/listGivenCourses").post(InstructorController.listGivenCoursesController);
router.route("/updateCourseName").patch(InstructorController.updateCourseNameController);


module.exports = router;
