import React from "react";
import { Tooltip } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";

export default function IconFont(props) {
  const { className, type, style, tip, onClick } = props;

  const Icon = createFromIconfontCN({
    scriptUrl: ["//at.alicdn.com/t/c/font_2788953_t2xp9148lks.js"]
  });

  const IconRender = <Icon className={className} style={style} type={type} onClick={onClick} />;

  return tip ? <Tooltip title={tip}>{IconRender}</Tooltip> : <>{IconRender}</>;
}
