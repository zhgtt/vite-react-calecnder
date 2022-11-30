// 英文月份
export const EN_MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

// 公历节日
export const SOLAR_HOLIDAY = {
  Jan: [{ date: "01-01", name: "元旦" }],
  Feb: [{ date: "02-14", name: "情人节" }],
  Mar: [
    { date: "03-08", name: "妇女节" },
    { date: "03-12", name: "植树节" }
  ],
  Apr: [{ date: "04-05", name: "清明节" }],
  May: [
    { date: "05-01", name: "劳动节" },
    { date: "05-04", name: "青年节" }
  ],
  Jun: [{ date: "06-01", name: "儿童节" }],
  Jul: [
    { date: "07-01", name: "建党节" },
    { date: "07-07", name: "七七事变" }
  ],
  Aug: [{ date: "08-01", name: "建军节" }],
  Sept: [
    { date: "09-10", name: "教师节" },
    { date: "09-18", name: "九一八事变" }
  ],
  Oct: [
    { date: "10-01", name: "国庆节" },
    { date: "10-31", name: "万圣夜" }
  ],
  Nov: [{ date: "11-24", name: "感恩节" }],
  Dec: [
    { date: "12-13", name: "国家公祭日" },
    { date: "12-24", name: "平安夜" },
    { date: "12-25", name: "圣诞节" }
  ]
};

//   { date: "05-14", name: "母亲节" },
//   { date: "06-18", name: "父亲节" },

// 农历节日
export const LUNAR_HOLIDAY = [
  { date: "正月初一", name: "春节" },
  { date: "正月十五", name: "元宵节" },
  { date: "五月初五", name: "端午节" },
  { date: "七月初七", name: "七夕节" },
  { date: "七月十五", name: "中元节" },
  { date: "八月十五", name: "中秋节" },
  { date: "九月初九", name: "重阳节" },
  { date: "腊月初八", name: "腊八节" },
  { date: "腊月三十", name: "除夕" }
];
