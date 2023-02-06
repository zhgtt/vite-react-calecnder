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
  Sep: [
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
  { date: "腊月廿三", name: "北方小年" },
  { date: "腊月三十", name: "除夕" }
];

// 月份诗句
export const MONTH_VERSE = {
  Jan: "正月山茶满盆开",
  Feb: "二月迎春初开放",
  Mar: "三月桃花红十里",
  Apr: "四月牡丹国色香",
  May: "五月石榴红似火",
  Jun: "六月荷花满池塘",
  Jul: "七月茉莉花如雪",
  Aug: "八月桂花满枝香",
  Sep: "九月菊花姿百态",
  Oct: "十月芙蓉正上妆",
  Nov: "冬月水仙案上供",
  Dec: "腊月寒梅抖冰霜"
};

// 法定休息日、调休（手动配置，2023 - 至今）
export const REST_DAY = {
  2022: { holiday: ["12-31"], weekday: [] },
  2023: {
    holiday: [
      "01-01",
      "01-02",
      "01-21",
      "01-22",
      "01-23",
      "01-24",
      "01-25",
      "01-26",
      "01-27",
      "04-05",
      "04-29",
      "04-30",
      "05-01",
      "05-02",
      "05-03",
      "06-22",
      "06-23",
      "06-24",
      "09-29",
      "09-30",
      "10-01",
      "10-02",
      "10-03",
      "10-04",
      "10-05",
      "10-06"
    ],
    weekday: ["01-28", "01-29", "04-23", "05-06", "06-25", "10-07", "10-08"]
  }
};

// 生肖图标
export const ANIMALS_ICON = [
  { name: "鼠", icon: "icon-dino-laoshu" },
  { name: "牛", icon: "icon-dino-niu" },
  { name: "虎", icon: "icon-dino-laohu" },
  { name: "兔", icon: "icon-dino-tuzi" },
  { name: "龙", icon: "icon-dino-long" },
  { name: "蛇", icon: "icon-dino-she" },
  { name: "马", icon: "icon-dino-ma" },
  { name: "羊", icon: "icon-dino-yang" },
  { name: "猴", icon: "icon-dino-houzi" },
  { name: "鸡", icon: "icon-dino-ji" },
  { name: "狗", icon: "icon-dino-gou" },
  { name: "猪", icon: "icon-dino-zhu" }
];
