import React, { useState, useCallback, useMemo } from "react";
import { Calendar, Space, Card, Row, Col } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { solar2lunar, lunar2solar } from "solarLunar"; // 农历 / 公历 互转
import dayjs from "dayjs";
import { css } from "@emotion/react";
import clsx from "clsx";
import { SOLAR_HOLIDAY, LUNAR_HOLIDAY, EN_MONTH } from "../../utils/constants";

/** 重点 solarLunar 部分方法
 * @solar 公历、阳历
 * @lunar 农历、阴历
 *
 * 方法
 * @solar2lunar 公历 -> 农历，会返回相应的节气，属年等信息
 * @lunar2solar 农历 -> 公历
 *
 * 返回数据
 * @dayCn 农历日期
 * @monthCn 农历月份
 * @term 节气
 * @isLeap 是否为闰月
 */

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3492952_vlbtof57zac.js"
});

// 重点 获取每天的农历日期、农历节日、公历节日
const getLunarDate = (date) => {
  const year = dayjs(date).year(); // 年份
  const month = dayjs(date).month() + 1; // 月份
  const day = dayjs(date).date(); // 日期
  const formatDate = dayjs(date).format("MM-DD");

  // 公历 -> 农历
  const lunarDate = solar2lunar(year, month, day);

  // 获取公历日期
  const enMonth = EN_MONTH[month - 1];
  const { name: solarHoliday } = SOLAR_HOLIDAY[enMonth].find((item) => item.date === formatDate) || {};

  // 获取农历日期
  const { name: lunarHoliday } =
    LUNAR_HOLIDAY.find((item) => item.date === `${lunarDate.monthCn}${lunarDate.dayCn}`) || {};

  return { ...lunarDate, solarHoliday, lunarHoliday };
};

/** 重点 显示日期 Render，顺序为 农历节日 > 公历节日 > 节气 > 农历月份 > 农历日期
 * 1. 农历月份的样式上会有下划线，字体颜色不会变
 * 2. 如果是初一，显示为当前农历月份
 */
const getDayRender = (date) => {
  const { dayCn, term, monthCn, solarHoliday, lunarHoliday } = getLunarDate(date);

  // 判断是否有节日或节气
  const isHasHoliday = [lunarHoliday, solarHoliday, term].filter(Boolean).length;
  // 判断是否为初一
  const isJuniorOne = dayCn === "初一";

  const render = () => {
    if (isHasHoliday) return <span className="text-primary">{lunarHoliday || solarHoliday || term}</span>;
    if (isJuniorOne) return <span>{monthCn}</span>;
    return <span>{dayCn}</span>;
  };

  return (
    <>
      <div className="text-xs scale-[0.84] -mt-1.5">{render()}</div>
      {isJuniorOne && <span className="w-4 h-px bg-primary block" />}
    </>
  );
};

/**
 * @components
 */
export default function LunarCalender(props) {
  const [value, setValue] = useState(dayjs()); // 选中的日期

  const dateFullCellRender = (date) => {
    const day = dayjs(date).date(); // 日期

    const isCheck = dayjs(value).isSame(date, "date");
    const isToday = dayjs().isSame(date, "date"); // 判断是否为当天

    return (
      <div
        className={clsx(
          "w-[40px] h-[40px] my-1.5 mx-auto flex flex-col items-center rounded-md border-transparent border border-solid transition-all",
          // isToday && !isCheck && ["text-primary"],
          isToday && isCheck && ["bg-primary", "text-white"],
          // isCheck && ["!border-primary"]
        )}
      >
        <div className="text-base">{day}</div>
        {getDayRender(date)}
      </div>
    );
  };
  // [value]
  // []
  // );

  // const onSelect = (date) => {
  //   setValue(date);
  // };

  return (
    <Card>
      <Row>
        <Col span={12}>
          <div>日期</div>
          <Calendar
            //   style={{ width: "50%" }}
            //   value={value}
            // validRange={[dayjs("2022-11-01"), dayjs("2022-11-30")]} // 设置可以显示的日期，它是个由两个值组成的区间
            fullscreen={false}
            dateFullCellRender={dateFullCellRender} // 自定义渲染日期单元格，返回内容会覆盖原单元格
            // onSelect={onSelect}
          />
        </Col>
        <Col span={12}>插画</Col>
      </Row>
    </Card>
  );
}
