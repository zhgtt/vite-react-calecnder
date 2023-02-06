import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { Calendar, Space, Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import clsx from "clsx";
import { MONTH_VERSE } from "@/utils/constants";
import { getLunarDate } from "./utils";

/** Method 显示日期 Render，顺序为 农历节日 > 公历节日 > 节气 > 农历月份 > 农历日期
 * 1. 农历月份的样式上会有下划线，字体颜色不会变
 * 2. 如果是初一，显示为当前农历月份
 * 3. 所有的 date 参数都是 dayjs() 格式
 */
export const getDayRender = (date, options = {}) => {
  const { isCurMonth, isCheck, isToday } = options;

  const { dayCn, term, monthCn, solarHoliday, lunarHoliday, isRestDay, isWeekDay, isJuniorOne } =
    getLunarDate(date, options);

  // 判断是否有节日或节气
  const isHasHoliday = [lunarHoliday, solarHoliday, term].filter(Boolean).length;

  // 非当前月样式
  const disabledStyle = !isCurMonth && ["opacity-[0.35]"];

  const render = () => {
    if (isHasHoliday)
      return (
        <span
          className={clsx(
            "text-primary truncate block max-w-[36px]",
            disabledStyle,
            isToday && isCheck && ["text-white"]
          )}
        >
          {lunarHoliday || solarHoliday || term}
        </span>
      );
    if (isJuniorOne) return <span>{monthCn}</span>;
    return <span>{dayCn}</span>;
  };

  return (
    <>
      <div className="text-xs scale-[0.84] -mt-1.5">{render()}</div>
      {isJuniorOne && <span className={clsx("w-4 h-px bg-primary block", disabledStyle)} />}
      {(isRestDay || isWeekDay) && (
        <span
          className={clsx(
            "absolute -right-px -top-0.5 text-primary text-xs scale-75",
            disabledStyle,
            isWeekDay && ["text-red-500"],
            isToday && isCheck && ["text-white"]
          )}
        >
          {isRestDay ? "休" : "班"}
        </span>
      )}
    </>
  );
};

export default function MonthCalendar(props) {
  const { onTypeChange, defaultDate, onDateChange } = props;

  const calendarRef = useRef(null);

  const [curPanelDate, setCurPanelDate] = useState(dayjs()); // 当前面板日期
  const [curDate, setCurDate] = useState(dayjs()); // 选中的日期

  useEffect(() => {
    if (!defaultDate) return;
    setCurDate(defaultDate);
    setCurPanelDate(defaultDate);
  }, [defaultDate]);

  // 重点 处理日历面板的的最后一行是否显示
  useEffect(() => {
    if (!calendarRef && !curPanelDate) return;
    const dom = calendarRef.current;
    const trLast = dom.querySelector(".ant-picker-content>tbody>tr:last-child"); // 获取日历的最后一组 tr
    const tdList = Array.from(trLast.children); // 转换成真正的数组

    // 判断 tdList 中第一个 td 的日期是否为当前月，非当前月，将 tr 隐藏（需异步操作）
    setTimeout(() => {
      const title = tdList[0].title;
      //   console.log("title: ", title);
      const isCurMonth = dayjs(title).format("MM") === curPanelDate.format("MM");

      trLast.style.display = isCurMonth ? "contents" : "none";
    }, 10);
  }, [calendarRef, curPanelDate, defaultDate]);

  // Method 自定义渲染日期单元格（只渲染当前月的日期）
  const dateFullCellRender = useCallback(
    (date) => {
      const day = date.date();

      const isCheck = curDate.isSame(date, "date");
      const isToday = dayjs().isSame(date, "date"); // 判断是否为当天
      const isCurMonth = date.format("MM") === curDate.format("MM"); // 判断是否为当前月

      // 只展示当前月的日期
      return (
        <div
          className={clsx(
            "relative w-[40px] h-[40px] my-1.5 mx-auto flex flex-col items-center rounded-md border-transparent border border-solid transition-all hover:border-primary-opacity",
            isCurMonth && isToday && !isCheck && ["text-primary"],
            isToday && isCheck && ["bg-primary", "text-white"],
            isCheck && ["!border-primary"]
            // !isCurMonth && ["hover:border-gray-100"]
          )}
        >
          <div className="text-base">{day}</div>
          {getDayRender(date, { isCurMonth, isCheck, isToday })}
        </div>
      );
    },
    [curDate]
  );

  // Method 自定义渲染头部
  const headerRender = ({ value, type, onChange }) => {
    const year = `${curDate.year()}`;
    const month = `${curDate.format("MM")}`;
    const isToday = dayjs().isSame(curDate, "date"); // 判断是否为当天

    return (
      <div className="flex justify-between items-center mb-6">
        <div className="font-primary">
          <span
            className="text-4xl cursor-pointer"
            onClick={() => {
              onTypeChange && onTypeChange(curDate);
            }}
          >
            {year}.
          </span>
          <span className="text-2xl">{month}</span>
        </div>
        <Space>
          {!isToday && (
            <Tooltip title="回到今天 🥳">
              <Button onClick={() => onChange(dayjs())}>今</Button>
            </Tooltip>
          )}
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => {
              const prevMonthPanel = value.subtract(1, "month");
              // const m = curDate.month();
              // const prevMonth = value.clone().month(m - 1);
              onChange(prevMonthPanel); // 通过该事件来控制 📅 面板
            }}
          />
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={() => {
              const nextMonthPanel = value.add(1, "month");
              onChange(nextMonthPanel);
            }}
          />
        </Space>
      </div>
    );
  };

  const onSelect = (date) => {};

  const onChange = (date) => {
    setCurDate(date);
    onDateChange && onDateChange(date);
  };

  const onPanelChange = (date, mode) => {
    setCurDate(date);
    setCurPanelDate(date);
  };

  return (
    <div ref={calendarRef} className="text-center">
      <Calendar
        value={curDate}
        headerRender={headerRender} // 自定义头部
        fullscreen={false}
        dateFullCellRender={dateFullCellRender} // 自定义渲染日期单元格，返回内容会覆盖原单元格
        onSelect={onSelect} // 日期选中回调
        onChange={onChange} // 日期变化回调
        onPanelChange={onPanelChange} // 面板变化回调，搭配 headerRender 使用
        className="bg-transparent"
        css={css`
          .ant-picker-panel {
            background: transparent;
          }
          .ant-picker-panel .ant-picker-body {
            padding-top: 1.5rem;

            .ant-picker-content {
              position: relative;
              &::before {
                content: "${curDate.format("M")}";
                position: absolute;
                font-size: 12rem;
                opacity: 0.08;
                color: var(--color-primary);
                font-family: BadComic;
                line-height: 1;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -40%);
              }

              > tbody > tr:first-of-type td {
                padding-top: 18px;
              }
            }
          }
        `}
      />
      <aside className="mt-12">
        <p className="text-primary tracking-[0.8rem] text-xs">{MONTH_VERSE[curDate.format("MMM")]}</p>
      </aside>
    </div>
  );
}
