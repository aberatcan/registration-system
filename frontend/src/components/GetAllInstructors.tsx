import {
  Button,
  Table,
} from "antd";
import axios from "axios";
import * as React from "react";

export interface IGetAllInstructorsProps {}

export function GetAllInstructors(props: IGetAllInstructorsProps) {
  const [instructors, setInstructors] = React.useState([]);
  const getAllInstructors = () => {
    axios
      .get("http://localhost:5001/manager/getAllInstructors")
      .then((res) => {
        setInstructors(res.data);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

 
  return (
    <>
      <Button type="primary" onClick={getAllInstructors}>
        Get All Instructors
      </Button>
      {instructors.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={instructors}
          columns={columns}
        />
      )}
    </>
  );
}
