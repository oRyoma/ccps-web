import { measureTextWidth, Pie } from '@ant-design/charts';
import React from 'react';

const index: React.FC = () => {
  function renderStatistic(containerWidth: any, text: any, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
        ),
        1,
      );
    }
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : 'inherit'
    };">${text}</div>`;
  }
  const data = [
    {
      type: '已完成',
      value: 30,
    },
    {
      type: '待处理',
      value: 15,
    },
    {
      type: '进行中',
      value: 13,
    },
    {
      type: '待评价',
      value: 5,
    },
    {
      type: '驳回',
      value: 2,
    },
  ];
  const config = {
    height: 180,
    appendPadding: 10, //padding的基础上，额外设置的padding值
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      offsetY: -4,
      title: {
        style: {
          fontSize: '15px',
        },
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 15,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '10px',
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `订单数量 ${datum.value}`
            : `订单数量 ${data.reduce((r: any, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 15,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
};

export default index;
