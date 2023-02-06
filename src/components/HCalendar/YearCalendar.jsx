import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { Card, Calendar, Space, Row, Col, Button, Tooltip, Divider, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import clsx from "clsx";
import { getLunarDate } from "./utils";

// 快速创建一个数组序列
const MonthsList = Array.from({ length: 12 }, (item, index) => index + 1);
const YearsList = Array.from({ length: 40 }, (item, index) => 1995 + index).map((item) => ({
  label: `${item} 年`,
  value: item
}));

export default function MonthCalendar(props) {
  const { onTypeChange, defaultDate } = props;

  const [curYear, setCurYear] = useState();

  useEffect(() => {
    if (!defaultDate) return;
    setCurYear(defaultDate.year());
  }, [defaultDate]);

  // Method 自定义渲染日期单元格
  const dateFullCellRender = useCallback(
    (date, month) => {
      if (!curYear) return;

      const day = date.date();

      const currentDate = date.valueOf();
      const startDate = dayjs(`${curYear}-${month}`).startOf("month").valueOf(); // 当月的第一天
      const endDate = dayjs(`${curYear}-${month}`).endOf("month").valueOf(); // 当月的最后一天

      const { isRestDay, isWeekDay, isJuniorOne } = getLunarDate(date);

      const isCheck = defaultDate.isSame(date, "date");

      // 重点 取当前月第一天和最后一天的时间戳，在这个区间内说明是当前月的日期，其他多余的日期不渲染
      return currentDate >= startDate && currentDate <= endDate ? (
        <div
          className={clsx(
            "w-6 h-6 mx-auto flex flex-col items-center justify-center transition-all rounded hover:bg-gray-100",
            isCheck && ["bg-primary", "hover:bg-primary"]
          )}
        >
          <div
            className={clsx(
              "text-xs",
              isRestDay && ["text-primary"],
              isWeekDay && ["text-red-500"],
              isCheck && ["!text-white"]
            )}
          >
            {day}
          </div>
          {isJuniorOne && <span className={clsx("w-4 h-px bg-primary block", isCheck && ["bg-white"])} />}
        </div>
      ) : null;
    },
    [curYear]
  );

  const onSelect = (date) => {
    // console.log("date: ", date);
    onTypeChange && onTypeChange(date);
  };

  return (
    <>
      {/* 标题 */}
      <div className="flex justify-between items-end">
        <Space size={32} align="end">
          <span className="text-5xl font-primary">{curYear || "--"}</span>
          <Space size={20} className="text-xs mb-1">
            <span className="flex items-center">
              <span className="block w-3 h-px bg-primary mr-1" />
              农历初一
            </span>
            <span className="text-primary">休</span>
            <span className="text-red-500">班</span>
          </Space>
        </Space>

        <Space className="mb-[0.2rem]">
          <Select options={YearsList} value={curYear} onChange={(value) => setCurYear(value)} />
          <Tooltip title="回到今天 🥳">
            <Button onClick={() => onSelect(dayjs())}>今</Button>
          </Tooltip>
          <Button type="primary" icon={<LeftOutlined />} onClick={() => setCurYear(curYear - 1)} />
          <Button type="primary" icon={<RightOutlined />} onClick={() => setCurYear(curYear + 1)} />
        </Space>
      </div>

      <Divider className="mb-8" />

      {/* 日历 */}
      <Row gutter={[52, 32]} justify="space-between">
        {MonthsList.map((item) => {
          const ItemMonth = dayjs(`${curYear}-${item}`);
          const startDate = ItemMonth.startOf("month");
          const endDate = ItemMonth.endOf("month");

          const isCheck = defaultDate.format("YYYY-M") === `${curYear}-${item}`;

          return (
            <Col xl={6} lg={8} md={12} sm={24} key={item}>
              <Card bodyStyle={{ padding: curYear ? 0 : 16 }} bordered={false} loading={!curYear}>
                <Calendar
                  value={ItemMonth} // 必须要指定，否则只会渲染当前月的月份，无法渲染每个月的月份，
                  fullscreen={false}
                  headerRender={() => (
                    <span className={clsx("pl-2.5 pb-1.5 text-xl", isCheck && ["text-primary"])}>
                      {item}月
                    </span>
                  )}
                  dateFullCellRender={(date) => dateFullCellRender(date, item)}
                  validRange={[startDate, endDate]}
                  onSelect={onSelect}
                  css={css`
                    .ant-picker-panel {
                      border-top: none;

                      .ant-picker-body .ant-picker-content {
                        > thead > tr > th {
                          font-size: 12px;
                        }
                        > tbody > tr > td {
                          height: 32px;
                        }
                      }
                    }
                  `}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
