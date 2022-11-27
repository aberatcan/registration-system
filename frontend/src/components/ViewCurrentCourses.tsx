import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IViewCurrentCoursesProps {}

export function ViewCurrentCourses(props: IViewCurrentCoursesProps) {
  const [grades, setGrades] = React.useState([]);
  const ViewCurrentCourses = () => {
    const student_id = localStorage.getItem("student_id");
    console.log(student_id);
    axios
      .post("http://localhost:5001/student/viewTakenCourses", {
        student_id,
      })
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setGrades(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
  ];

  return (
    <>
      <Form
        name="viewCurrentCourses"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ViewCurrentCourses}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get All Taken Courses
          </Button>
        </Form.Item>
      </Form>

      {grades.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={grades}
          columns={columns}
        />
      )}
    </>
  );
}
