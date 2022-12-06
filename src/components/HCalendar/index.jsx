import React, { useState, useEffect } from "react";
import { Card } from "antd";
import dayjs from "dayjs";
import MonthCalendar from "./MonthCalendar";
import YearCalendar from "./YearCalendar";

// 快速创建一个序列数组
const Dot = [...new Array(12).keys()];

/**
 * 组件 @components
 * @props 属性
 * @mode month - 月份面板，year - 年份面板
 */
export default function LunarCalendar(props) {
  const { mode = "month" } = props;

  const [calendarMode, setCalendarMode] = useState("");
  const [curDate, setCurDate] = useState();

  useEffect(() => {
    if (!mode) return;
    setCalendarMode(mode);
  }, [mode]);

  return (
    <Card
      title={
        <div className="flex justify-between">
          {Dot.map((item) => (
            <span key={item} className="block w-6 h-6 rounded-full bg-gray-100" />
          ))}
        </div>
      }
      bodyStyle={{ paddingTop: 56 }}
      style={{ width: "90%", margin: "0 auto" }}
    >
      {calendarMode === "month" && (
        <MonthCalendar
          onTypeChange={(date) => {
            setCalendarMode("year");
            setCurDate(date);
          }}
          defaultDate={curDate}
        />
      )}

      {calendarMode === "year" && (
        <YearCalendar
          onTypeChange={(date) => {
            setCalendarMode("month");
            setCurDate(date);
          }}
          defaultDate={curDate}
        />
      )}
    </Card>
  );
}
