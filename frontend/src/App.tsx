import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Row, Col } from "antd";
import { DBManager } from "./components/DBManager";
import { Instructor } from "./components/Instructor";
import { Student } from "./components/Student";

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={24}>
          <DBManager />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Instructor />
        </Col>
        <Col span={24}>
          <Student />
        </Col>
      </Row>
    </div>
  );
}

export default App;
