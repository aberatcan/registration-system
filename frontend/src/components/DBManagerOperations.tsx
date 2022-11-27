import { Card, Col, Row } from "antd";
import * as React from "react";
import { CreateInstructor } from "./CreateInstructor";
import { CreateStudent } from "./CreateStudent";
import { DeleteStudent } from "./DeleteStudent";
import { GetAllInstructors } from "./GetAllInstructors";
import { GetAllStudents } from "./GetAllStudents";
import { UpdateInstructorTitle } from "./UpdateInstructorTitle";
import { ViewAllCourses } from "./ViewAllCourses";
import { ViewAllGrades } from "./ViewAllGrades";
import { ViewAverageGrade } from "./ViewAverageGrade";

interface IDBManagerOperationsProps {}

const DBManagerOperations: React.FunctionComponent<
  IDBManagerOperationsProps
> = (props) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card title="Req 2: Add new Student">
            <CreateStudent />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 2: Add new Instructor">
            <CreateInstructor />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 3: Delete Student with Student ID">
            <DeleteStudent />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 4: Update Instructor's Title">
            <UpdateInstructorTitle />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 5: Get All Students">
            <GetAllStudents />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 6: Get All Instructors">
            <GetAllInstructors />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 7: Get All grades of a Student">
            <ViewAllGrades />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 8: Get all courses of an Instructor">
            <ViewAllCourses />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 9: Get Average Grade of a Course">
            <ViewAverageGrade />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DBManagerOperations;
