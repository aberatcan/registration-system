const Student = require("../models/student");
const bcrypt = require("bcrypt");

exports.loginController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  Student.login(username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    else if (data.length === 0) {
      console.log("Wrong username!");
      res.send({ success: false, message: "Wrong username!" });
    } else if (bcrypt.compareSync(password, data[0].password)) {
      console.log("Successfully logged in!");
      res.send({
        success: true,
        message: "Successfully logged in!",
        student_id: data[0].student_id,
      });
    } else {
      console.log("Wrong password!");
      res.send({ success: false, message: "Wrong password" });
    }
  });
};

exports.listAllGivenCoursesController = (req, res) => {
  Student.listAllGivenCourses((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Managers.",
      });
    else res.send(data);
  });
};

exports.viewTakenCoursesController = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const student_id = req.body.student_id;

  Student.viewTakenCourses(student_id, (err, data) => {
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

exports.searcKeywordController = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    
    const keyword = req.body.keyword;
    console.log(keyword)
    Student.searchKeyword(keyword, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      else if (data.length === 0) {
        console.log("No Result!");
        res.send({ success: false, message: "No Result!" });
      } else {
        console.log(data);
        res.send(data);
      }
    });
  };

  exports.filterCoursesController = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    
    const department_id = req.body.department_id;
    const campus = req.body.campus;
    const minimum_credits = req.body.minimum_credits;
    const maximum_credits = req.body.maximum_credits
    Student.filterCourses(department_id,campus,minimum_credits,maximum_credits, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred.",
        });
      else if (data.length === 0) {
        console.log("No Result!");
        res.send({ success: false, message: "No Result!" });
      } else {
        console.log(data);
        res.send(data);
      }
    });
  };