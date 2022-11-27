import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface IAddPrerequisitesProps {}

type Prerequisite = {
  course_id: string;
  pre_course_id: string;
};

export function AddPrerequisites(props: IAddPrerequisitesProps) {
  const onFinish = (values: Prerequisite) => {
    const { course_id, pre_course_id } = values;
    axios
      .post("http://localhost:5001/instructor/addPrerequisites", {
        course_id,
        pre_course_id,
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
      name="AddPrerequisites"
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
        label="Pre_Course ID"
        name="pre_course_id"
        rules={[
          { required: true, message: "Please input your pre_course_id!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
