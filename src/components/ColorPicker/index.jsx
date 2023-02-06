import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import {
  SketchPicker, // 取色器面板（全，不好看）
  AlphaPicker, // 滑块（单色，不好看）
  ChromePicker, // 面板 + 滑块（全，不好看）
  CompactPicker, // 面板（部分，不好看）
  HuePicker, // 滑块（多色，不好看）
  MaterialPicker, // 面板（部分，不好看）
  PhotoshopPicker, // 面板（全，不好看）
  SliderPicker, // 滑块（部分，不好看）
  BlockPicker, // 面板（部分）
  CirclePicker, // 面板（部分，圆角）
  GithubPicker, // 弹出面板（部分）
  SwatchesPicker, // 面板（部分）
  TwitterPicker // 弹出面板（部分）
} from "react-color";
import { css } from "@emotion/react";

export default function ColorPicker(props) {
  const pickerRefs = useRef(null);

  const [color, setColor] = useState("#333");
  const [colorList, setColorList] = useState(["#333"]);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const onChangeComplete = (color) => {
    console.log("color: ", color);
    setColor(color?.hex);
    // setVisible(false);
  };

  const onSwatchHover = (color, event) => {
    // console.log("event: ", event.target);
    // const background = event.target.style.background;
    // event.target.style.boxShadow = `${background} 0px 0px 4px`;
    // console.log('color: ', color);
  };

  return (
    <div className="relative">
      <div
        className="w-16 h-8 rounded-md cursor-pointer border border-solid border-slate-300 relative"
        onClick={handleClick}
        css={css`
          &::before {
            content: "";
            background-color: ${color};
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            height: 60%;
            display: block;
            border-radius: 4px;
          }
        `}
      />

      {visible && (
        <div className="absolute left-0 top-11 z-10" ref={pickerRefs}>
          {/* 用于点击浮窗外，将浮窗关闭 */}
          <div className="fixed inset-0" onClick={() => setVisible(false)} />
          <TwitterPicker
            onChangeComplete={onChangeComplete} // 颜色变化的回调
            triangle="top-left" // 小箭头的方向，hidden 为不显示
            onSwatchHover={onSwatchHover} // 移入的事件
            css={css`
              > div:nth-child(3) {
                > span > div {
                  transition: all 0.3s;
                  /* &:hover {
                    box-shadow: 
                  } */
                }
                > div:nth-of-type(-n + 2) {
                  display: none !important;
                }
              }
            `}
          />
        </div>
      )}
    </div>
  );
}
