import React from "react";
import { Form, Input, Button, Col, Row, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import StudentOperations from "./StudentOperations";

export interface IStudentProps {}

export type LoginProps = {
  username: string;
  password: string;
};

export function Student(props: IStudentProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [viewLogin, setViewLogin] = React.useState(true);

  const onFinishLogin = (values: LoginProps) => {
    const { username, password } = values;
    console.log(values);
    axios
      .post("http://localhost:5001/student/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          setViewLogin(false);
          localStorage.setItem("username", username);
          localStorage.setItem("student_id",res.data.student_id)
        }
        alert(res.data.message);
        console.log(res.data);
      });
  };
  const onLogout = () => {
    setIsLoggedIn(false);
    setViewLogin(true);
  };
  return (
    <div>
      {isLoggedIn && (
        <Row>
          <Col span={6}>
            <Button type="primary" onClick={onLogout}>
              Log out
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        {viewLogin && (
          <Col span={6}>
            <Card title="Student Login">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinishLogin}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        )}
      </Row>
      {isLoggedIn && <StudentOperations />}
    </div>
  );
}
