import React from "react";
import { Tooltip } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import "./styles.scss";

export default function IconFont(props) {
  const { type, style, tip, onClick } = props;

  const Icon = createFromIconfontCN({
    scriptUrl: ["//at.alicdn.com/t/c/font_2788953_k9fzjx8n7x.js"]
  });

  const IconRender = <Icon className="icon-font" style={style} type={type} onClick={onClick} />;

  return tip ? <Tooltip title={tip}>{IconRender}</Tooltip> : <>{IconRender}</>;
}
