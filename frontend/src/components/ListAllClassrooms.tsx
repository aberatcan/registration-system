import { Button, Form, Input, InputNumber, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IListAllClassroomsProps {}

export function ListAllClassrooms(props: IListAllClassroomsProps) {
  const [classrooms, setClassrooms] = React.useState([]);
  const ListAllClassrooms = (values: { time_slot: number }) => {
    const { time_slot } = values;
    console.log(time_slot);
    axios
      .post("http://localhost:5001/instructor/getAllClassrooms", {
        time_slot,
      })
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setClassrooms(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const columns = [
    {
      title: "Classroom ID",
      dataIndex: "classroom_id",
      key: "classroom_id",
    },
    {
      title: "Campus",
      dataIndex: "campus",
      key: "campus",
    },

    {
      title: "Classroom Capacity",
      dataIndex: "classroom_capacity",
      key: "classroom_capacity",
    },
  ];

  return (
    <>
      <Form
        name="getAllclassrooms"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={ListAllClassrooms}
        autoComplete="off"
      >
        <Form.Item
          label="Time Slot"
          name="time_slot"
          rules={[
            {
              required: true,
              message: "Please input the time slot!",
              type: "number",
              max: 10,
              min: 1,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Get All Classrooms
          </Button>
        </Form.Item>
      </Form>

      {classrooms.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={classrooms}
          columns={columns}
        />
      )}
    </>
  );
}
