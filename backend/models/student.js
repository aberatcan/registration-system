const sql = require("../dataAccess/db");

class Student {
  constructor(student) {
    this.username = student.username;
    this.password = student.password;
  }

  static login(username, result) {
    sql.query(
      "SELECT username,password,student_id FROM Student WHERE username = ?",
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

  static listAllGivenCourses(result) {
    sql.query(
      `SELECT Course.course_id, Course.name,instructor.surname, Course.department_id,Course.credits, Course.classroom_id, Course.time_slot, Course.quota, pre_ids 
      FROM ((Course LEFT JOIN (SELECT course_id, GROUP_CONCAT(pre_course_id) as pre_ids 
      FROM prerequisites GROUP BY course_id)  K  USING(course_id)))
      INNER JOIN simpleboundb.Instructor ON instructor.username = course.instructor_name
      ORDER BY course_id ASC`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("Courses:", res);
        result(null, res);
      }
    );
  }

  static viewTakenCourses(student_id, result) {
    sql.query(
      `Select Added_Courses.course_id, Course.name, Added_Courses.grade from Added_Courses inner join Course on Course.course_id = Added_Courses.course_id where student_id = ?
      union
      Select Grades.course_id, Course.name, Grades.grade from Grades inner join Course on Course.course_id = Grades.course_id where student_id = ?`,
      [student_id, student_id],
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

  static searchKeyword(keyword, result) {
    console.log(keyword);
    sql.query(
      `SELECT Course.course_id,
      Course.name, 
      instructor.surname, 
      Course.department_id,
      Course.credits, 
      Course.classroom_id, 
      Course.time_slot, 
      Course.quota, 
      Pre_ids 
     FROM ((simpleboundb.Course LEFT JOIN (SELECT course_id, GROUP_CONCAT(pre_course_id) as Pre_ids 
     FROM simpleboundb.prerequisites GROUP BY course_id) K USING(course_id)))
     INNER JOIN simpleboundb.Instructor ON instructor.username = course.instructor_name
     WHERE Course.name like '%${keyword}%'
     ORDER BY course_id ASC;`,
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
  static filterCourses(department_id,campus,minimum_credits,maximum_credits, result) {
      console.log(department_id,campus,minimum_credits,maximum_credits)

    sql.query(`call FilterCourses(?,?,?,?)`,[department_id,campus,minimum_credits,maximum_credits], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Student;
