import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface ICreateStudentProps {}

export type Student = {
  username: string;
  password: string;
  student_id: number;
  name: string;
  surname: string;
  department_id: string;
  email: string;
};

export function CreateStudent(props: ICreateStudentProps) {
  const { Option } = Select;
  const onFinish = (values: Student) => {
    const {
      username,
      password,
      student_id,
      name,
      surname,
      department_id,
      email,
    } = values;
    // console.log(values)
    axios
      .post("http://localhost:5001/manager/createStudent", {
        username,
        password,
        student_id,
        name,
        surname,
        department_id,
        email,
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
      name="createStudent"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Student ID"
        name="student_id"
        rules={[
          {
            required: true,
            message: "Please input your student id!",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: "Please input your surname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department_id"
        rules={[{ required: true, message: "Please input your surname!" }]}
      >
        <Select placeholder="select your department">
          <Option value="CMPE">CMPE</Option>
          <Option value="IE">IE</Option>
          <Option value="MATH">MATH</Option>
          <Option value="PHIL">PHIL</Option>
        </Select>
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
