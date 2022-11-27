const sql = require("../dataAccess/db");

class Manager {
  constructor(manager) {
    this.username = manager.username;
    this.password = manager.password;
  }
  static getAll(result) {
    sql.query("SELECT * FROM Database_Manager", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("managers: ", res);
      result(null, res);
    });
  }
  static create(newManager, result) {
    sql.query("INSERT INTO Database_Manager SET ?", newManager, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created Manager: ", { newManager });
      result(null, { newManager });
    });
  }
  static login(username, result) {
    sql.query(
      "SELECT username,password FROM Database_Manager WHERE username = ?",
      username,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  }

  static createStudent(newStudent, result) {
    sql.query("INSERT INTO Student SET ?", newStudent, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created Student: ", { newStudent });
      result(null, { newStudent });
    });
  }
  static createInstructor(newInstructor, result) {
    console.log(newInstructor);
    sql.query("INSERT INTO Instructor SET ?", newInstructor, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created Instructor: ", { newInstructor });
      result(null, { newInstructor });
    });
  }

  static updateTitle(username, title, result) {
    sql.query(
      "UPDATE Instructor SET title = ? WHERE username = ?",
      [title, username],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Customer with the username
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated instructor: ", username);
        result(null, { username });
      }
    );
  }

  static deleteStudent(student_id, result) {
    sql.query(
      "DELETE FROM Student WHERE student_id = ?",
      student_id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Student with the name
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("deleted student with student ID: ", student_id);
        result(null, res);
      }
    );
  }
  static getAllStudents(result) {
    sql.query(
      "SELECT  username, name, surname, email, department_id, completed_credits, gpa FROM Student ORDER BY completed_credits ASC",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("Students: ", res);
        result(null, res);
      }
    );
  }

  static getAllInstructors(result) {
    sql.query(
      "SELECT username, name, surname, email, department_id, title FROM Instructor",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("Instructors: ", res);
        result(null, res);
      }
    );
  }

  static getAllGrades(student_id, result) {
    sql.query(
      "SELECT Grades.course_id, Course.name, Grades.grade FROM((Grades INNER JOIN Course ON Grades.course_id = Course.course_id) INNER JOIN Student ON Student.student_id = Grades.student_id) WHERE Student.student_id = ? AND Grades.grade IS NOT NULL;",
      student_id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  }

  static getAllCourses(username, result) {
    sql.query(
      `SELECT Course.course_id,
      Course.name, 
      Classroom.classroom_id,
      Classroom.campus, 
      Course.time_slot
       FROM (Course INNER JOIN Classroom ON Course.classroom_id=Classroom.classroom_id)
       WHERE course.instructor_name = ? `,
      username,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  }

  static getAverageGrade(course_id, result) {
    sql.query(
      `SELECT Grades.course_id, Course.name, FORMAT(sum(grade)/count(*),2) AS 'grade_average' 
      FROM Course
      INNER JOIN Grades ON Grades.course_id = Course.course_id
      WHERE Grades.grade IS NOT NULL AND Grades.course_id = ? 
      GROUP BY Grades.course_id`,
      course_id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, res);
      }
    );
  }
}

module.exports = Manager;
