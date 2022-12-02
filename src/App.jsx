import React from "react";
import { Card } from "antd";
import LunarCalender from "./components/LunarCalender";

export default function App() {
  return (
    <div style={{ padding: 18 }}>
      {/* 日历组件 */}
      <LunarCalender />
    </div>
  );
}
