import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { Calendar, Space, Card, Row, Col, Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import clsx from "clsx";
import { MONTH_VERSE } from "../../utils/constants";
import { getLunarDate, getDayRender } from "./utils";
import hesuan from "./../../assets/images/hesuan.svg";

// 所有的 date 参数都是 dayjs() 格式
console.log("dayjs 😄, ", dayjs().format("MMM"));

// 快速创建一个序列数组
const Dot = [...new Array(12).keys()];

/**
 * 组件 @components
 */
export default function LunarCalender(props) {
  const calendarRef = useRef(null);

  const [curPanelDate, setCurPanelDate] = useState(dayjs()); // 当前面板日期
  const [curDate, setCurDate] = useState(dayjs()); // 选中的日期

  // 重点 处理日历面板的的最后一行是否显示
  useEffect(() => {
    if (!calendarRef && !curPanelDate) return;
    const dom = calendarRef.current;
    const trLast = dom.querySelector(".ant-picker-content>tbody>tr:last-child"); // 获取日历的最后一组 tr
    const tdList = Array.from(trLast.children); // 转换成真正的数组

    // 判断 tdList 中第一个 td 的日期是否为当前月，非当前月，将 tr 隐藏（需异步操作）
    setTimeout(() => {
      const title = tdList[0].title;
      const isCurMonth = dayjs(title).format("MM") === curPanelDate.format("MM");

      trLast.style.display = isCurMonth ? "contents" : "none";
    }, 0);
  }, [calendarRef, curPanelDate]);

  // Method 自定义渲染日期单元格（只渲染当前月的日期）
  const dateFullCellRender = (date) => {
    const day = date.date();

    const isCheck = curDate.isSame(date, "date");
    const isToday = dayjs().isSame(date, "date"); // 判断是否为当天
    const isCurMonth = date.format("MM") === curDate.format("MM"); // 判断是否为当前月

    // 只展示当前月的日期
    return (
      <div
        className={clsx(
          "relative w-[40px] h-[40px] my-1.5 mx-auto flex flex-col items-center rounded-md border-transparent border border-solid transition-all",
          isCurMonth && isToday && !isCheck && ["text-primary"],
          isToday && isCheck && ["bg-primary", "text-white"],
          isCheck && ["!border-primary"]
        )}
      >
        <div className="text-base">{day}</div>
        {getDayRender(date, { isCurMonth, isCheck, isToday })}
      </div>
    );
  };

  // Method 自定义渲染头部
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const year = `${curDate.year()}`;
    const month = `${curDate.format("MM")}`;

    return (
      <div className="flex justify-between items-center mb-6">
        <div className="font-primary">
          <span className="text-4xl">{year}.</span>
          <span className="text-2xl">{month}</span>
        </div>
        <Space>
          <Tooltip title="回到今天 🥳">
            <Button onClick={() => onChange(dayjs())}>今</Button>
          </Tooltip>
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

  const onSelect = (date) => {
    //   setCurDate(date);
  };

  const onChange = (date) => {
    //   console.log("date: ", date.format("YYYY-MM-DD"));
    setCurDate(date);
  };

  const onPanelChange = (date, mode) => {
    setCurDate(date);
    setCurPanelDate(date);
  };

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
      <Row>
        <Col span={10}>
          <div ref={calendarRef} className="text-center">
            <Calendar
              //   value={curDate}
              headerRender={headerRender} // 自定义头部
              // validRange={[curDate.startOf("month"), curDate.endOf("month")]} // 设置可以显示、选择的日期，它是个由两个值组成的区间
              fullscreen={false}
              dateFullCellRender={dateFullCellRender} // 自定义渲染日期单元格，返回内容会覆盖原单元格
              onSelect={onSelect} // 日期选中回调
              onChange={onChange} // 日期变化回调
              onPanelChange={onPanelChange} // 面板变化回调，搭配 headerRender 使用
              css={css`
                .ant-picker-panel .ant-picker-body {
                  padding-top: 1.5rem;

                  .ant-picker-content {
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
        </Col>
        <Col span={14} className="flex justify-center items-center">
          <img src={hesuan} width={"60%"} />
        </Col>
      </Row>
    </Card>
  );
}
