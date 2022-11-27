CREATE SCHEMA simpleboundb;
CREATE TABLE IF NOT EXISTS simpleboundb.Database_Manager (
  username VARCHAR(20) NOT NULL,
  password VARCHAR(64) NOT NULL,
  PRIMARY KEY (username));

CREATE TABLE IF NOT EXISTS simpleboundb.Department (
  department_id VARCHAR(5) UNIQUE NOT NULL,
  name VARCHAR(20) UNIQUE NOT NULL,
  PRIMARY KEY (department_id));
  
  
CREATE TABLE IF NOT EXISTS simpleboundb.Instructor (
  username VARCHAR(20) NOT NULL,
  title VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  name VARCHAR(20) NOT NULL,
  surname VARCHAR(20) NOT NULL,
  email VARCHAR(20) NOT NULL,
  department_id VARCHAR(5) NOT NULL,
  PRIMARY KEY (username));
  
  CREATE TABLE IF NOT EXISTS simpleboundb.Course (
  course_id char(10) NOT NULL,
  name char(50) NOT NULL,
  department_id char(5) NOT NULL,
  credits int NOT NULL,
  instructor_name char(20) NOT NULL,
  classroom_id char(10) NOT NULL,
  campus char(20) NOT NULL,
  classroom_capacity int NOT NULL,
  time_slot int NOT NULL,
  quota int NOT NULL,
  PRIMARY KEY (course_id),
FOREIGN KEY (instructor_name) REFERENCES Instructor(username) ON DELETE CASCADE ON UPDATE CASCADE
);
  
  CREATE TABLE IF NOT EXISTS simpleboundb.Classroom (
  classroom_id VARCHAR(10) NOT NULL,
  campus VARCHAR(20) NOT NULL,
  classroom_capacity VARCHAR(20) NOT NULL,
  PRIMARY KEY (classroom_id));
  
  CREATE TABLE IF NOT EXISTS simpleboundb.Student (
  username varchar(20) NOT NULL,
  student_id INT NOT NULL,
  password varchar(64) NOT NULL,
  name varchar(20) NOT NULL,
  surname varchar(20) NOT NULL,
  department_id varchar(5) NOT NULL,
  email varchar(20) NOT NULL,
  gpa DOUBLE NULL DEFAULT 0,
  completed_credits INT NULL DEFAULT 0,
  PRIMARY KEY (username),
  UNIQUE KEY student_id_UNIQUE (student_id),
FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS simpleboundb.Teaches (
  username VARCHAR(20) NOT NULL,
  department_id CHAR(5) NOT NULL,
  course_id CHAR(10) NOT NULL,
  classroom_id CHAR(10) NOT NULL,
  time_slot INT NOT NULL,
  PRIMARY KEY (department_id, course_id),
  FOREIGN KEY (classroom_id) REFERENCES Classroom(classroom_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (username) REFERENCES Instructor(username) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS simpleboundb.Grades (
  course_id CHAR(10) NOT NULL,
  student_id INT NOT NULL,
  grade DOUBLE DEFAULT 0,
  PRIMARY KEY (course_id,student_id),
  FOREIGN KEY(student_id) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(course_id) REFERENCES Course(course_id) ON DELETE CASCADE ON UPDATE CASCADE);
  
  CREATE TABLE IF NOT EXISTS simpleboundb.Added_Courses (
  course_id CHAR(10) NOT NULL,
  student_id INT NOT NULL,
  grade DOUBLE,
  PRIMARY KEY (course_id,student_id),
  FOREIGN KEY(student_id) REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(course_id) REFERENCES Course(course_id) ON DELETE CASCADE ON UPDATE CASCADE);
  
  CREATE TABLE IF NOT EXISTS simpleboundb.Prerequisites (
  course_id CHAR(10) NOT NULL,
  pre_course_id CHAR(10) NOT NULL,
  PRIMARY KEY (course_id,pre_course_id),
  FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (pre_course_id) REFERENCES Course(course_id) ON DELETE CASCADE ON UPDATE CASCADE);
  
  DELIMITER //
CREATE PROCEDURE simpleboundb.FilterCourses (IN department CHAR(10),
IN campusname CHAR(20), 
IN minCredits INTEGER, 
IN maxCredits INTEGER) BEGIN
	SELECT *
    FROM Course
    WHERE course.campus=campusname AND 
    Course.credits<=maxCredits AND
    Course.credits>=minCredits AND
    course.department_id=department ;
END//
DELIMITER
  
DELIMITER //
CREATE TRIGGER simpleboundb.prerequisites_trigger BEFORE INSERT
ON simpleboundb.Prerequisites
FOR EACH ROW
IF  (new.course_id < new.pre_course_id or new.course_id = new.pre_course_id) THEN
SIGNAL SQLSTATE '50001' SET MESSAGE_TEXT = 'A prerequisite must be less than the ID of the succeeding course';
END IF; //
DELIMITER ;


delimiter //
CREATE TRIGGER simpleboundb.db_limit BEFORE INSERT
ON simpleboundb.Database_Manager
FOR EACH ROW
IF (Select  Count(*) From Database_Manager) >= 4 THEN
SIGNAL SQLSTATE '50001' SET MESSAGE_TEXT = 'Number of Database Managers have to 4 or below';
END IF; //
delimiter ;

DELIMITER //
CREATE TRIGGER simpleboundb.course_overlap_trigger BEFORE INSERT
ON simpleboundb.Course
FOR EACH ROW
IF EXISTS (Select  * From simpleboundb.Course where (time_slot=new.time_slot and classroom_id=new.classroom_id)) THEN
SIGNAL SQLSTATE '50001' SET MESSAGE_TEXT = 'No two courses can overlap in terms of classroom and time_slot';
END IF; //
DELIMITER ;

DELIMITER $$
CREATE TRIGGER simpleboundb.CheckerQuota
BEFORE INSERT ON simpleboundb.Course FOR EACH ROW BEGIN
    IF((SELECT classroom_capacity FROM simpleboundb.classroom WHERE classroom_id = NEW.classroom_id) < NEW.quota)
        THEN SIGNAL SQLSTATE '45000'
SET
  MESSAGE_TEXT = 'Exceed Capacity';
END IF;
end;$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER simpleboundb.GpaUpdate
AFTER
UPDATE
  ON simpleboundb.teaches FOR EACH ROW BEGIN
UPDATE 
  simpleboundb.Student
SET
  gpa = FORMAT((
    SELECT
      SUM(grade * (SELECT credit FROM simpleboundb.Course
          WHERE Grades.course_id = Course.course_id))
    FROM
      teaches
    WHERE username = NEW.username) / completed_credits,2)
WHERE
  username = NEW.username;
end$$
DELIMITER ;