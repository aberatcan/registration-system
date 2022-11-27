import { Button, Form, Input, InputNumber, Table } from "antd";
import axios from "axios";
import * as React from "react";

export interface IFilterCoursesProps {}

export function FilterCourses(props: IFilterCoursesProps) {
  const [courses, setCourses] = React.useState([]);
  const FilterCourses = (values: {
    department_id: string;
    campus: string;
    minimum_credits: number;
    maximum_credits: number;
  }) => {
    // const { department_id,campus,minimum_credits,maximum_credits } = values;
    axios
      .post("http://localhost:5001/student/filterCourses", values)
      .then((res) => {
        if (res.data.success === false) {
          alert(res.data.message);
        } else {
          setCourses(res.data[0]);
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
      dataIndex: "instructor_name",
      key: "instructor_name",
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
    {
      title: "Campus",
      dataIndex: "campus",
      key: "campus",
    },
  ];

  return (
    <>
      <Form
        name="FilterCourses"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={FilterCourses}
        autoComplete="off"
      >
        <Form.Item
          label="Department ID"
          name="department_id"
          rules={[
            {
              required: true,
              message: "Please input the department id!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Campus"
          name="campus"
          rules={[
            {
              required: true,
              message: "Please input the campus!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="minimum credits"
          name="minimum_credits"
          rules={[
            {
              required: true,
              message: "Please input the minimum!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="maximum credits"
          name="maximum_credits"
          rules={[
            {
              required: true,
              message: "Please input the maximum!",
              type: "number",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Filter
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
