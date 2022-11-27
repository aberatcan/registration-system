import { Card, Col, Row } from "antd";
import * as React from "react";
import { AddPrerequisites } from "./AddPrerequisites";
import { CreateCourse } from "./CreateCourse";
import { ListAllClassrooms } from "./ListAllClassrooms";
import { ListGivenCourses } from "./ListGivenCourses";
import { UpdateCourseName } from "./UpdateCourseName";
import { ViewAllStudents } from "./ViewAllStudents";

interface IInstructorOperationsProps {}

const InstructorOperations: React.FunctionComponent<
  IInstructorOperationsProps
> = (props) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card title="Req 11: List All Classroom for a given time slot ">
            <ListAllClassrooms />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 12: ">
            <CreateCourse />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 13: Add prerequisites">
            <AddPrerequisites />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 14: List Given Courses ">
            <ListGivenCourses />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 15: View All Students taken course id">
            <ViewAllStudents />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 16: Update Course Name">
            <UpdateCourseName />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorOperations;
