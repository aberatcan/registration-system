import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface ICreateCourseProps {}

export type Course = {
  course_id: string;
  name: string;
  credits: number;
  classroom_id: string;
  time_slot: number;
  quota: number;
  department_id: string;
};

export function CreateCourse(props: ICreateCourseProps) {
  const { Option } = Select;
  const onFinish = (values: Course) => {
    const {
      course_id,
      name,
      credits,
      classroom_id,
      time_slot,
      quota,
      department_id,
    } = values;
    // console.log(values)
    const instructor_name = localStorage.getItem("username");
    axios
      .post("http://localhost:5001/instructor/createCourse", {
        course_id,
        name,
        credits,
        classroom_id,
        time_slot,
        quota,
        department_id,
        instructor_name,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="CreateCourse"
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
        rules={[{ required: true, message: "Please input your course ID!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your course name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Credits"
        name="credits"
        rules={[
          {
            required: true,
            message: "Please input your course credits!",
            type: "number",
            min: 1,
            max: 5,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Classroom ID"
        name="classroom_id"
        rules={[{ required: true, message: "Please input classroom ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Time Slot"
        name="time_slot"
        rules={[
          {
            required: true,
            message: "Please input your time slot!",
            type: "number",
            min: 1,
            max: 10,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Quota"
        name="quota"
        rules={[
          {
            required: true,
            message: "Please input your quota!",
            type: "number",
            min: 1,
            max: 400,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department_id"
        rules={[
          { required: true, message: "Please input Your department ID!" },
        ]}
      >
        <Select placeholder="Select your department">
          <Option value="CMPE">CMPE</Option>
          <Option value="IE">IE</Option>
          <Option value="MATH">MATH</Option>
          <Option value="PHIL">PHIL</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
