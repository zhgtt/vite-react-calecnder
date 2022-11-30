import React from "react";
import { Card } from "antd";
import LunarCalender from "./components/LunarCalender";

export default function App() {
  return (
    <div style={{ padding: 18 }}>
      {/* 评论组件 */}
      {/* <Card style={{ width: "70%", margin: "0 auto" }}> */}
      <LunarCalender />
      {/* </Card> */}
    </div>
  );
}
