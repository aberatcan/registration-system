const Manager = require("../models/manager");
const bcrypt = require("bcrypt");

exports.getManagerController = (req, res) => {
  Manager.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Managers.",
      });
    else res.send(data);
  });
};

exports.createManagerController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  // Create a manager
  const manager = new Manager({
    username,
    password,
  });

  // Save manager in the database
  Manager.create(manager, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else
      res.send({
        succes: true,
        message: "Successfully created new Database Manager!",
      });
  });
};

exports.loginController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  Manager.login(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else if (data.length === 0) {
      console.log("Wrong username!");
      res.send({ success: false, message: "Wrong username!" });
    } else if (bcrypt.compareSync(password, data[0].password)) {
      console.log("Successfully logged in!");
      res.send({ success: true, message: "Successfully logged in!" });
    } else {
      console.log("Wrong password!");
      res.send({ success: false, message: "Wrong password" });
    }
  });
};

exports.createStudentController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  const student_id = req.body.student_id;
  const name = req.body.name;
  const surname = req.body.surname;
  const department_id = req.body.department_id;
  const email = req.body.email;
  const gpa = 0.0;
  const completed_credits = 0.0;

  // Create a student
  const student = {
    username,
    password,
    student_id,
    name,
    surname,
    department_id,
    email,
  };

  // Save student in the database
  Manager.createStudent(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else
      res.send({
        succes: true,
        message: "Successfully created new Student!",
      });
  });
};

exports.createInstructorController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);
  const title = req.body.title;
  const name = req.body.name;
  const surname = req.body.surname;
  const department_id = req.body.department_id;
  const email = req.body.email;

  // Create an instructor
  const instructor = {
    username,
    password,
    title,
    name,
    surname,
    department_id,
    email,
  };

  // Save instructor in the database
  Manager.createInstructor(instructor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else
      res.send({
        succes: true,
        message: "Successfully created new Instructor!",
      });
  });
};

exports.updateInstructorController = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Manager.updateTitle(req.body.username, req.body.title, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          success: false,
          message: `Not found Instructor with username ${req.body.username}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Show with username " + req.body.username,
        });
      }
    } else
      res.send({
        success: true,
        message: "Instructor Title is successfully updated!",
      });
  });
};

exports.deleteStudentController = (req, res) => {
  Manager.deleteStudent(req.body.student_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found Student with student_id ${req.body.student_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Student with student_id " + req.body.student_id,
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

exports.getAllStudentsController = (req, res) => {
  Manager.getAllStudents((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Managers.",
      });
    else res.send(data);
  });
};

exports.getAllInstructorsController = (req, res) => {
  Manager.getAllInstructors((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Managers.",
      });
    else res.send(data);
  });
};

exports.getAllGradesController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const student_id = req.body.student_id;

  Manager.getAllGrades(student_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No grades!");
      res.send({ success: false, message: "No grades!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.getAllCoursesController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;

  Manager.getAllCourses(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No Courses!");
      res.send({ success: false, message: "No Courses!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.getAverageGradeController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const course_id = req.body.course_id;

  Manager.getAverageGrade(course_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No Courses!");
      res.send({ success: false, message: "No Courses!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};
