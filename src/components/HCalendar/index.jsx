import React, { useState, useEffect } from "react";
import { Card, Row, Col, Space, Button } from "antd";
import dayjs from "dayjs";
import MonthCalendar from "./MonthCalendar"; // 月份面板
import YearCalendar from "./YearCalendar"; // 年份面板
import ScheduleCard from "./ScheduleCard"; // 日程卡片
import Timer from "@/components/Timer"; // 时间
import ColorPicker from "@/components/ColorPicker"; // 时间
import hesuan from "@/assets/images/hesuan.svg";
import zuohesuan from "@/assets/images/zuohesuan.svg";

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
  const [curDate, setCurDate] = useState(dayjs());

  useEffect(() => {
    if (!mode) return;
    setCalendarMode(mode);
  }, [mode]);

  return (
    <Card
    // title={
    //   <div className="flex justify-between">
    //     {Dot.map((item) => (
    //       <span key={item} className="block w-6 h-6 rounded-full bg-gray-100" />
    //     ))}
    //   </div>
    // }
    // bodyStyle={{ background: "#f1f5f9" }}
    // style={{ width: "90%", margin: "0 auto" }}
    // className="bg-slate-50"
    >
      {calendarMode === "month" && (
        <Row gutter={48}>
          <Col span={10}>
            <MonthCalendar
              onTypeChange={(date) => {
                setCalendarMode("year");
                setCurDate(date);
              }}
              defaultDate={curDate}
              onDateChange={(date) => setCurDate(date)}
            />
          </Col>
          <Col span={14} className="flex flex-col">
            {/* <Segmented
              className="self-end"
              options={[
                { label: "插画", value: "Illustration" },
                { label: "日程", value: "Schedule" }
              ]}
            /> */}
            {/* <img src={zuohesuan} width={"60%"} /> */}
            <ColorPicker />
            <ScheduleCard date={curDate} />
            <Timer className="mt-12 self-end" />
          </Col>
        </Row>
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
