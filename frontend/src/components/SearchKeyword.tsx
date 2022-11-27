import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface ISearchKeywordProps {}

export function SearchKeyword(props: ISearchKeywordProps) {
  const [courses, setCourses] = React.useState([]);
  const searchKeyword = (values: { keyword: string }) => {
    const { keyword } = values;
    console.log(keyword);
    axios
      .post("http://localhost:5001/student/searchKeyword", { keyword })
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setCourses(res.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Instructor Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Department",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },

    {
      title: "Classroom ID",
      dataIndex: "classroom_id",
      key: "classroom_id",
    },
    {
      title: "Time Slot",
      dataIndex: "time_slot",
      key: "time_slot",
    },
    {
      title: "Quota",
      dataIndex: "quota",
      key: "quota",
    },
    {
      title: "Prerequisites",
      dataIndex: "pre_ids",
      key: "pre_ids",
    },
  ];

  return (
    <>
      <Form
        name="searchKeyword"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={searchKeyword}
        autoComplete="off"
      >
        <Form.Item
          label="Search Keyword"
          name="keyword"
          rules={[
            {
              required: true,
              message: "Please input the keyword!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      {courses.length !== 0 && (
        <Table
          style={{ overflow: "scroll" }}
          dataSource={courses}
          columns={columns}
        />
      )}
    </>
  );
}
