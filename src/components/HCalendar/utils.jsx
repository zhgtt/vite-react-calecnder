import solarLunar from "solarlunar-es"; // 农历 / 公历 互转
import clsx from "clsx";
import dayjs from "dayjs";
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
 * @isTerm 是否有节气
 * @term 节气
 * @isLeap 是否为闰月
 * @lunarFestival 农历节日（只有国内传统节日）
 * @festival 公历节日（只有国内节日）
 * @animal 生肖
 * @isToday 是否为今天
 * @gzYear 年的农历叫法（干支）
 * @gzMonth 月的农历叫法（干支）
 * @gzDay 日的农历叫法(干支)
 */

// Method 获取某天为周几（周日为 0，改为 7）
const getWeekDay = (date) => {
  return date.day() || 7;
};

// Method 获取特殊节日（母亲节 / 父亲节）
const getSpecialDay = (type, { year }) => {
  const firstDayInMay = dayjs(`${year}-05-01`);
  const firstDayInJun = dayjs(`${year}-06-01`);

  let days = null;

  switch (type) {
    case "mothersDay":
      days = firstDayInMay.add(2, "week").subtract(getWeekDay(firstDayInMay), "day"); // 以 5月1日 为基数获取其第二周，再减去 weekDay，即为 母亲节
      break;

    case "fathersDay":
      days = firstDayInJun.add(3, "week").subtract(getWeekDay(firstDayInJun), "day"); // 以 6月1日 为基数获取其第三周，再减去 weekDay，即为 父亲节
      break;

    default:
      break;
  }

  return days.format("MM-DD");
};

// Method 获取每天的农历日期、农历节日、公历节日
export const getLunarDate = (date, options = {}) => {
  const { isCurMonth, isCheck, isToday } = options;

  const year = date.year(); // 年份
  const month = date.month() + 1; // 月份
  const day = date.date(); // 日期
  const formatDate = date.format("MM-DD");
  const enMonth = date.format("MMM"); // 获取英文月份

  // 公历 -> 农历
  const lunarDate = solarLunar.solar2lunar(year, month, day);
  // console.log("lunarDate: ", lunarDate);
  const { monthCn, dayCn } = lunarDate;

  // 获取农历节日
  const { name: lunarHoliday } = LUNAR_HOLIDAY.find((item) => item.date === `${monthCn}${dayCn}`) || {};

  // 获取公历节日
  let { name: solarHoliday } = SOLAR_HOLIDAY[enMonth].find((item) => item.date === formatDate) || {};

  // 获取特殊节日 - 母亲节 / 父亲节
  if (isCurMonth && enMonth === "May" && formatDate === getSpecialDay("mothersDay", { year })) {
    solarHoliday = "母亲节";
  }
  if (isCurMonth && enMonth === "Jun" && formatDate === getSpecialDay("fathersDay", { year })) {
    solarHoliday = "父亲节";
  }

  // 判断是否为初一
  const isJuniorOne = dayCn === "初一";

  // 判断是否为休息日 / 工作日
  const { holiday = [], weekday = [] } = REST_DAY[year] || {};
  const isRestDay = holiday.includes(formatDate);
  const isWeekDay = weekday.includes(formatDate);

  return { ...lunarDate, solarHoliday, lunarHoliday, isRestDay, isWeekDay, isJuniorOne };
};
