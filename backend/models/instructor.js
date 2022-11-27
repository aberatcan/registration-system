const sql = require("../dataAccess/db");

class Instructor {
  constructor(instructor) {
    this.username = instructor.username;
    this.password = instructor.password;
  }
  static login(username, result) {
    sql.query(
      "SELECT username,password FROM Instructor WHERE username = ?",
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
  static createCourse(newCourse, result) {
    sql.query("INSERT INTO Course SET ?", newCourse, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Course: ", { newCourse });
      result(null, { newCourse });
    });
  }

  static getAllClassrooms(time_slot, result) {
    sql.query(
      `SELECT classroom_id,campus,classroom_capacity FROM simpleboundb.Classroom where classroom.classroom_id not in(SELECT teaches.classroom_id
        FROM simpleboundb.classroom 
        INNER JOIN simpleboundb.teaches ON teaches.classroom_id = classroom.classroom_id
        WHERE simpleboundb.teaches.time_slot = ?)`,
      time_slot,
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

  static addPrerequisites(newPrerequisite, result) {
    sql.query(
      "INSERT INTO Prerequisites SET ?",
      newPrerequisite,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("Created newPrerequisite: ", { newPrerequisite });
        result(null, { newPrerequisite });
      }
    );
  }

  static viewAllStudents(course_id, result) {
    sql.query(
      `SELECT student.username, student.student_id, student.email, student.name, student.surname FROM
      grades INNER JOIN student ON grades.student_id = student.student_id
      where grades.course_id = ?`,
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

  static listGivenCourses(username, result) {
    sql.query(
      `SELECT Course.course_id, Course.name,  Course.classroom_id, Course.time_slot, Course.quota, Pre_ids 
      FROM ((Course LEFT JOIN (SELECT course_id, GROUP_CONCAT(pre_course_id) as Pre_ids 
      FROM prerequisites GROUP BY course_id)  K  USING(course_id))) Where Course.instructor_name = ?
      ORDER BY course_id ASC`,
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

  static updateCourseName(course_id, name, result) {
    sql.query(
      "UPDATE Course SET name = ? WHERE course_id = ?",
      [name, course_id],
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

        console.log("updated course: ", course_id,"\nNew name:",name);
        result(null, { name });
      }
    );
  }
}

module.exports = Instructor;
