import React, { useState, useEffect } from "react";
import { Space } from "antd";
import dayjs from "dayjs";
import clsx from "clsx";
import IconFont from "@/components/IconFont";

export default function Timer(props) {
  const { className } = props;

  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interVal = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interVal);
  }, []);

  return (
    <Space className={clsx("text-2xl", className)} size={4}>
      <IconFont type="icon-dino-xiangsu_xiaoya" />
      <span className="font-primary italic">{time.format("HH:mm:ss")}</span>
    </Space>
  );
}
