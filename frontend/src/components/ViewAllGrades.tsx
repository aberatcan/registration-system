import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IViewAllGradesProps {}

export function ViewAllGrades(props: IViewAllGradesProps) {
  const [grades, setGrades] = React.useState([]);
  const ViewAllGrades = (values: { student_id: string }) => {
    const { student_id } = values;
    console.log(student_id);
    axios
      .post("http://localhost:5001/manager/getAllGrades", {
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
        name="getAllGrades"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ViewAllGrades}
        autoComplete="off"
      >
        <Form.Item
          label="Student ID"
          name="student_id"
          rules={[{ required: true, message: "Please input the Student ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get All grades
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
