import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IViewAllCoursesProps {}

export function ViewAllCourses(props: IViewAllCoursesProps) {
  const [courses, setCourses] = React.useState([]);
  const ViewAllCourses = (values: { username: string }) => {
    const { username } = values;
    console.log(username);
    axios
      .post("http://localhost:5001/manager/getAllCourses", {
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
      title: "Campus",
      dataIndex: "campus",
      key: "campus",
    },

    {
      title: "Time Slot",
      dataIndex: "time_slot",
      key: "time_slot",
    },
  ];

  return (
    <>
      <Form
        name="getAllCourses"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ViewAllCourses}
        autoComplete="off"
      >
        <Form.Item
          label="Instructor Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input the instructor username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get All Courses
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
