import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IListGivenCoursesProps {}

export function ListGivenCourses(props: IListGivenCoursesProps) {
  const [courses, setCourses] = React.useState([]);
  const ListGivenCourses = () => {
    const username = localStorage.getItem("username");
    username &&
      axios
        .post("http://localhost:5001/instructor/listGivenCourses", {
          username,
        })
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
      dataIndex: "Pre_ids",
      key: "Pre_ids",
    },
  ];

  return (
    <>
      <Form
        name="getAllCourses"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ListGivenCourses}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            List Given Courses
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
