import React from "react";
import { Card } from "antd";
import HCalendar from "./components/HCalendar";

export default function App() {
  return (
    <div style={{ padding: 18 }}>
      {/* 日历组件 */}
      <HCalendar />
    </div>
  );
}
