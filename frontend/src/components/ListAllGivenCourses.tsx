import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IListAllGivenCoursesProps {}

export function ListAllGivenCourses(props: IListAllGivenCoursesProps) {
  const [courses, setCourses] = React.useState([]);
  const ListAllGivenCourses = () => {
    axios
      .get("http://localhost:5001/student/listAllGivenCourses")
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setCourses(res.data);
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
      title: "Instructor Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },

    {
      title: "Classroom ID",
      dataIndex: "classroom_id",
      key: "classroom_id",
    },
    {
      title: "Time Slot",
      dataIndex: "time_slot",
      key: "time_slot",
    },
    {
      title: "Quota",
      dataIndex: "quota",
      key: "quota",
    },
    {
      title: "Prerequisites",
      dataIndex: "pre_ids",
      key: "pre_ids",
    },
  ];

  return (
    <>
      <Form
        name="getAllGivenCourses"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ListAllGivenCourses}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            List All Given Courses
          </Button>
        </Form.Item>
      </Form>

      {courses.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={courses}
          columns={columns}
        />
      )}
    </>
  );
}
