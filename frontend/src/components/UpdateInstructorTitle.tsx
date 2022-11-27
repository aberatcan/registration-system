import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface IUpdateInstructorTitleProps {}

type Instructor = {
  username: string;
  title: string;
};

export function UpdateInstructorTitle(props: IUpdateInstructorTitleProps) {
  const { Option } = Select;
  const onFinish = (values: Instructor) => {
    const { username, title } = values;
    axios
      .patch("http://localhost:5001/manager/updateInstructorTitle", {
        username,
        title,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
          console.log(err)
        alert(err.message);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="updateTitle"
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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Select placeholder="select your department">
          <Option value="Assistant Professor">Assistant Professor</Option>
          <Option value="Associate Professor">Associate Professor</Option>
          <Option value="Professor">Professor</Option>
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
