import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Col, Row, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import DBManagerOperations from "./DBManagerOperations";

export interface IDBManagerProps {}

export type LoginProps = {
  username: string;
  password: string;
};

export function DBManager(props: IDBManagerProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [viewLogin, setViewLogin] = React.useState(true);
  const [viewRegister, setViewRegister] = React.useState(true);

  const onFinishRegister = (values: LoginProps) => {
    const { username, password } = values;
    // console.log(values)
    axios
      .post("http://localhost:5001/manager/create", {
        username,
        password,
      })
      .then((res) => {
        setViewRegister(false);
        alert(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const onFinishLogin = (values: LoginProps) => {
    const { username, password } = values;
    console.log(values);
    axios
      .post("http://localhost:5001/manager/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          setViewLogin(false);
          setViewRegister(false);
        }
        alert(res.data.message);
        console.log(res.data);
      });
  };
  const onLogout = () => {
    setIsLoggedIn(false);
    setViewLogin(true);
    setViewRegister(true);
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
        {viewRegister && (
          <Col span={6}>
            <Card title="Database Manager Register">
              <Form
                name="normal_register"
                className="register-form"
                initialValues={{ remember: true }}
                onFinish={onFinishRegister}
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
                    className="register-form-button"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        )}
        {viewLogin && (
          <Col span={6}>
            <Card title="Database Manager Login">
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
      {isLoggedIn && <DBManagerOperations />}
    </div>
  );
}
