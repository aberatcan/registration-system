import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IViewAverageGradeProps {}

export function ViewAverageGrade(props: IViewAverageGradeProps) {
  const [grades, setGrades] = React.useState([]);
  const ViewAverageGrade = (values: { course_id: string }) => {
    const { course_id } = values;
    console.log(course_id);
    axios
      .post("http://localhost:5001/manager/getAverageGrade", {
        course_id,
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
      title: "Grade Average",
      dataIndex: "grade_average",
      key: "grade_average",
    },
  ];

  return (
    <>
      <Form
        name="getAllGrades"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ViewAverageGrade}
        autoComplete="off"
      >
        <Form.Item
          label="Course ID"
          name="course_id"
          rules={[{ required: true, message: "Please input the Course ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get Average Grade
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
