const express = require("express");
const ManagerController = require("../controllers/manager");

const router = express.Router();

router.route("/getAll").get(ManagerController.getManagerController);

router.route("/create").post(ManagerController.createManagerController);
router.route("/login").post(ManagerController.loginController);
router.route("/createStudent").post(ManagerController.createStudentController);
router.route("/deleteStudent").delete(ManagerController.deleteStudentController);
router.route("/getAllStudents").get(ManagerController.getAllStudentsController);
router.route("/getAllGrades").post(ManagerController.getAllGradesController);
router.route("/getAverageGrade").post(ManagerController.getAverageGradeController);


router.route("/createInstructor").post(ManagerController.createInstructorController);
router.route("/updateInstructorTitle").patch(ManagerController.updateInstructorController);
router.route("/getAllInstructors").get(ManagerController.getAllInstructorsController);
router.route("/getAllCourses").post(ManagerController.getAllCoursesController)



module.exports = router;
