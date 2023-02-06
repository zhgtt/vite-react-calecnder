import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { Card, Divider, Space, Button, Badge } from "antd";
import { PlusOutlined, BellOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import { getLunarDate } from "./utils";
import { ANIMALS_ICON } from "@/utils/constants";

function changeUsername(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 3000);
  });
}

export default function ScheduleCard(props) {
  const { date } = props;

  //   const { run } = useRequest(
  //     "https://www.mxnzp.com/api/holiday/single/20221214?ignoreHoliday=false&app_id=jjepoehhwquhs7ls&app_secret=d3ZRZW9nWlRjQXlmbS9OWm1OMnlndz09",
  //     {
  //       manual: true,
  //       onSuccess: (res, params) => {
  //         console.log("res: ", res);
  //       }
  //     }
  //   );

  useEffect(() => {
    (async () => {
      //   run();
      fetch(changeUsername).then((res) => {
        console.log("res: ", res);
      });
    })();
  }, [date]);

  //   const [detailedDate, setDetailedDate] = useState({});

  //   useEffect(() => {
  //     if (!date) return;
  //     console.log("date: ", date.format("YYYY-MM-DD"));
  //     console.log(" getLunarDate(date): ", getLunarDate(date));
  //     setDetailedDate(getLunarDate(date));
  //   }, [date]);
  const {
    cDay, // 公历日期
    cMonth, // 公历月份
    ncWeek, // 星期
    monthCn, // 农历月份
    dayCn, // 农历日期
    animal, // 属年
    gzYear, // 农历年份
    gzMonth,
    gzDay,
    term,
    solarHoliday,
    lunarHoliday
  } = getLunarDate(date);

  const animalIcon = ANIMALS_ICON.find((item) => item.name === animal).icon;

  const holiday = [lunarHoliday, solarHoliday, term].filter(Boolean);

  return (
    <div className="w-full flex flex-col">
      <Space className="mb-12 self-end">
        <Button type="primary" icon={<PlusOutlined />}>
          添加日程
        </Button>
        <Button type="primary" icon={<BellOutlined />}>
          全部日程
        </Button>
      </Space>

      <Card className="bg-slate-100" bordered={false}>
        <div className="flex justify-between">
          <Space direction="vertical" align="center">
            <span className="font-primary text-6xl">{cDay}</span>
            <div className="text-base">
              {`${cMonth}月`} <Divider type="vertical" /> {ncWeek}
            </div>
          </Space>
          <Space direction="vertical" align="end" className="self-end text-base">
            <span>{`农历${monthCn}${dayCn}`}</span>
            <Space align="end">
              <span className="flex items-end">
                {gzYear}
                <IconFont className="text-3xl px-1" type={animalIcon} />年
              </span>
              <span>{`${gzMonth}月`}</span>
              <span>{`${gzDay}日`}</span>
            </Space>
          </Space>
        </div>

        <Divider className="my-10" />

        <div className="">
          {holiday.length > 0 && (
            <Card className="mb-3 bg-transparent" bordered={false} bodyStyle={{ padding: 12 }}>
              {/* <div className="text-lg font-medium mb-3">📅 节日</div> */}
              <Space direction="vertical">
                {holiday.map((item) => (
                  <div key={item}>
                    <div className="text-base">{item}</div>
                  </div>
                  //   <Badge color="blue" key={item} text={<span className="text-base">{item}</span>} />
                ))}
              </Space>
            </Card>
          )}

          <Card className="bg-transparent" bordered={false} bodyStyle={{ padding: 12 }}>
            <div className="text-lg font-medium mb-3">日程</div>
            今日暂无日程
          </Card>
        </div>
      </Card>
    </div>
  );
}
