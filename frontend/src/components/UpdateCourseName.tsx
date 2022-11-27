import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface IUpdateCourseNameProps {}

type Course = {
  name: string;
  course_id: string;
};

export function UpdateCourseName(props: IUpdateCourseNameProps) {
  const { Option } = Select;
  const onFinish = (values: Course) => {
    const { name, course_id } = values;
    axios
      .patch("http://localhost:5001/instructor/updateCourseName", {
        name,
        course_id,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="updateCoursName"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Course ID"
        name="course_id"
        rules={[
          {
            required: true,
            message: "Please input your course ID!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your Course Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
}
