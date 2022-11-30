import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import zhCN from "antd/locale/zh_CN"; // 中文语言包
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale"; // 更改 dayjs 的语言配置
import "dayjs/locale/zh-cn"; // 国际化日期
import "./index.css";

// 重点 需要 dayjs 注册 updateLocale 插件并修改配置，配置项可参考文章 https://juejin.cn/post/6904788527205056520
dayjs.extend(updateLocale);

dayjs.updateLocale("zh-cn", {
  weekStart: 7 // 设置一周从周几开始（默认为周一，即 1）
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
