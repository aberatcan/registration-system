import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IViewAllStudentsProps {}

export function ViewAllStudents(props: IViewAllStudentsProps) {
  const [students, setStudents] = React.useState([]);
  const ViewAllStudents = (values: { course_id: string }) => {
    const { course_id } = values;
    axios
      .post("http://localhost:5001/instructor/viewAllStudents", {
        course_id,
      })
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setStudents(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Student ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
  ];

  return (
    <>
      <Form
        name="viewAllStudents"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ViewAllStudents}
        autoComplete="off"
      >
        <Form.Item
          label="Course ID"
          name="course_id"
          rules={[
            {
              required: true,
              message: "Please input the course ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            View All Students
          </Button>
        </Form.Item>
      </Form>

      {students.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={students}
          columns={columns}
        />
      )}
    </>
  );
}
