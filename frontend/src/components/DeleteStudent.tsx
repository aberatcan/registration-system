import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import * as React from "react";

export interface IDeleteStudentProps {}

type Student = {
  student_id: number;
};

export function DeleteStudent(props: IDeleteStudentProps) {
  const onFinish = (values: Student) => {
    const { student_id } = values;
    // console.log(values)
    axios
      .delete("http://localhost:5001/manager/deleteStudent", {
        data:{student_id},
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
      name="deleteStudent"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Delete
        </Button>
      </Form.Item>
    </Form>
  );
}
