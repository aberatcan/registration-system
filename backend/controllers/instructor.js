const Instructor = require("../models/instructor");
const bcrypt = require("bcrypt");

exports.loginController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  Instructor.login(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else if (data.length === 0) {
      console.log("Wrong username!");
      res.send({ success: false, message: "Wrong username!" });
    } else if (bcrypt.compareSync(password, data[0].password)) {
      console.log("Instructor Successfully logged in!", username);
      res.send({ success: true, message: "Successfully logged in!" });
    } else {
      console.log("Wrong password!");
      res.send({ success: false, message: "Wrong password" });
    }
  });
};

exports.createCourseController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const course_id = req.body.course_id;
  const name = req.body.name;
  const department_id = req.body.department_id;
  const classroom_id = req.body.classroom_id;
  const time_slot = req.body.time_slot;
  const quota = req.body.quota;
  const credits = req.body.credits;
  const instructor_name = req.body.instructor_name;

  // Create a course
  const course = {
    course_id,
    name,
    credits,
    classroom_id,
    time_slot,
    quota,
    department_id,
    instructor_name,
  };

  // Save course in the database
  Instructor.createCourse(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else
      res.send({
        succes: true,
        message: "Successfully created new course!",
      });
  });
};

exports.getAllClassroomsController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const time_slot = req.body.time_slot;

  Instructor.getAllClassrooms(time_slot, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No Classroom!");
      res.send({ success: false, message: "No Classroom!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.addPrerequisitesController = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const course_id = req.body.course_id;
  const pre_course_id = req.body.pre_course_id;

  const prerequisite = {
    course_id,
    pre_course_id,
  };

  Instructor.addPrerequisites(prerequisite, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    else
      res.send({
        succes: true,
        message: "Successfully created new prerequisite!",
      });
  });
};

exports.viewAllStudentsController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const course_id = req.body.course_id;

  Instructor.viewAllStudents(course_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No Student!");
      res.send({ success: false, message: "No Student!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.listGivenCoursesController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;

  Instructor.listGivenCourses(username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    else if (data.length === 0) {
      console.log("No Course!");
      res.send({ success: false, message: "No Course!" });
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.updateCourseNameController = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Instructor.updateCourseName(req.body.course_id, req.body.name, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          success: false,
          message: `Not found Course with course id ${req.body.course_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Course with course id " + req.body.course_id,
        });
      }
    } else
      res.send({
        success: true,
        message: "Course Name is successfully updated!",
      });
  });
};
