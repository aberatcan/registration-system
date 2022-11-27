import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
} from "antd";
import axios from "axios";
import * as React from "react";

export interface IGetAllStudentsProps {}

export function GetAllStudents(props: IGetAllStudentsProps) {
  const [students, setStudents] = React.useState([]);
  const getAllStudents = () => {
    axios
      .get("http://localhost:5001/manager/getAllStudents")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Completed Credits",
      dataIndex: "completed_credits",
      key: "completed_credits",
    },
    {
        title: "GPA",
        dataIndex: "gpa",
        key: "gpa",
      },
  ];

  return (
    <>
      <Button type="primary" onClick={getAllStudents}>
        Get All Students
      </Button>
      {students.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={students}
          columns={columns}
        />
      )}
    </>
  );
}
