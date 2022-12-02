import { solar2lunar } from "solarLunar"; // 农历 / 公历 互转
import clsx from "clsx";
import { SOLAR_HOLIDAY, LUNAR_HOLIDAY, REST_DAY } from "../../utils/constants";

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

// Method 获取每天的农历日期、农历节日、公历节日
export const getLunarDate = (date) => {
  const year = date.year(); // 年份
  const month = date.month() + 1; // 月份
  const day = date.date(); // 日期
  const formatDate = date.format("MM-DD");
  const enMonth = date.format("MMM"); // 获取英文月份

  // 公历 -> 农历
  const lunarDate = solar2lunar(year, month, day);

  // 获取公历节日
  const { name: solarHoliday } = SOLAR_HOLIDAY[enMonth].find((item) => item.date === formatDate) || {};

  // 获取农历节日
  const { name: lunarHoliday } =
    LUNAR_HOLIDAY.find((item) => item.date === `${lunarDate.monthCn}${lunarDate.dayCn}`) || {};

  return { ...lunarDate, solarHoliday, lunarHoliday };
};

/** Method 显示日期 Render，顺序为 农历节日 > 公历节日 > 节气 > 农历月份 > 农历日期
 * 1. 农历月份的样式上会有下划线，字体颜色不会变
 * 2. 如果是初一，显示为当前农历月份
 */
export const getDayRender = (date, { isCurMonth, isCheck, isToday }) => {
  const year = date.year();
  const day = date.format("MM-DD");

  const { dayCn, term, monthCn, solarHoliday, lunarHoliday } = getLunarDate(date);

  // 判断是否有节日或节气
  const isHasHoliday = [lunarHoliday, solarHoliday, term].filter(Boolean).length;

  // 判断是否为初一
  const isJuniorOne = dayCn === "初一";

  // 非当前月样式
  const disabledStyle = !isCurMonth && ["opacity-[0.35]"];

  // 判断是否为休息日 / 工作日
  const { holiday = [], weekday = [] } = REST_DAY[year] || {};
  const isRestDay = holiday.includes(day);
  const isWeekDay = weekday.includes(day);

  const render = () => {
    if (isHasHoliday)
      return (
        <span className={clsx("text-primary truncate block max-w-[36px]", disabledStyle)}>
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
