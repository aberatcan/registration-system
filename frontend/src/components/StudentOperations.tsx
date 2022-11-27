import { Card, Col, Row } from "antd";
import * as React from "react";
import { FilterCourses } from "./FilterCourses";
import { ListAllGivenCourses } from "./ListAllGivenCourses";
import { SearchKeyword } from "./SearchKeyword";
import { ViewCurrentCourses } from "./ViewCurrentCourses";

interface IStudentOperationsProps {}

const StudentOperations: React.FunctionComponent<IStudentOperationsProps> = (
  props
) => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card title="Req 18: List All Given Courses ">
            <ListAllGivenCourses />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 19: "></Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 20: View Current and Previous Courses">
            <ViewCurrentCourses />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Req 21: Search keyword">
            <SearchKeyword />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Req 22: Filter Courses">
            <FilterCourses />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentOperations;
