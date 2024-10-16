import * as echarts from 'echarts'
var xData = (function () {
  var data = [];
  for (var i = 1; i < 13; i++) {
    data.push(i + "月份");
  }
  return data;
})();

export const ageOptions = {
  title: {
    text: "男女人数统计",
    x: "2%",
    y: "2%",
    textStyle: {
      color: "#222222",
      fontSize: "18",
    },
    subtextStyle: {
      color: "#90979c",
      fontSize: "16",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff",
      },
    },
  },
  grid: {
    borderWidth: 0,
    top: '15%',
    bottom: '14%',
    right: '4%',
    left: '8%',
    textStyle: {
      color: "#fff",
    },
  },
  legend: {
    x: "50%",
    top: "4%",
    textStyle: {
      color: "#90979c",
    },
    data: ["女", "男", "平均"],
  },

  calculable: true,
  xAxis: [
    {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#90979c",
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      data: xData,
    },
  ],
  yAxis: [
    {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#90979c",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      splitArea: {
        show: false,
      },
    },
  ],
  dataZoom: [
    {
      show: true,
      height: 15,
      xAxisIndex: [0],
      bottom: 6,
      start: 10,
      end: 80,
      handleIcon:
        "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
      handleSize: "110%",
      handleStyle: {
        color: "#d3dee5",
      },
      textStyle: {
        color: "#fff",
      },
      borderColor: "#90979c",
    },
    {
      type: "inside",
      show: true,
      height: 7,
      start: 1,
      end: 35,
    },
  ],
  series: [
    {
      name: "女",
      type: "bar",
      stack: "总量",
      barMaxWidth: 25,
      barGap: "10%",
      itemStyle: {
        normal: {
          color: "rgba(255,144,128,1)",
          label: {
            show: true,
            textStyle: {
              color: "#fff",
            },
            position: "inside",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [
        709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078,
      ],
    },

    {
      name: "男",
      type: "bar",
      stack: "总量",
      itemStyle: {
        normal: {
          color: "rgba(0,191,183,1)",
          barBorderRadius: 0,
          label: {
            show: true,
            position: "inside",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220],
    },
    {
      name: "总数",
      type: "line",
      symbolSize: 10,
      symbol: "circle",
      itemStyle: {
        normal: {
          color: "rgba(252,230,48,1)",
          barBorderRadius: 0,
          label: {
            show: true,
            position: "top",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [
        1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298,
      ],
    },
  ],
};


export const sexOptions = {
  title: {
    text: "男女占比",
    left: "5%",
    top: '2%',
    textStyle: {
      color: "#222",
    },
  },

  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)",
  },

  visualMap: {
    show: false,
    min: 500,
    max: 600,
    inRange: {
      //colorLightness: [0, 1]
    },
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      center: ["50%", "50%"],
      color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
      data: [
        {
          value: 285,
          name: "黑名单查询",
        },
        {
          value: 410,
          name: "红名单查询",
        },
        {
          value: 274,
          name: "法人行政处罚",
        },
        {
          value: 235,
          name: "其它查询",
        },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: "radius",

      label: {
        normal: {
          formatter: ["{c|{c}次}", "{b|{b}}"].join("\n"),
          rich: {
            c: {
              color: "rgb(21,46,64)",
              fontSize: 20,
              fontWeight: "bold",
              lineHeight: 5,
            },
            b: {
              color: "rgb(98,137,169)",
              fontSize: 15,
              height: 40,
            },
          },
        },
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: "rgb(98,137,169)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
      },
      itemStyle: {
        normal: {
        },
      },
    },
  ],
};


export const moneyOptions = {
  title: {
    text: "月人数统计",
    top: '2%',
    left: '3%'
    // show: true,
    // textStyle: {
    //   align: "center",
    //   color: "#fff",
    //   fontSize: 20,
    // },
    // top: "10%",
    // left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 255, 233,1)",
            },
            {
              offset: 0.5,
              color: "rgba(255, 0, 255,1)",
            },
            {
              offset: 1,
              color: "rgba(233, 255, 0,1)",
            },
          ],
          global: false,
        },
      },
    },
  },
  grid: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "15%",
    // containLabel: true
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: '#dedede'
        }
      },
      splitArea: {
        // show: true,
        color: "#f00",
        lineStyle: {
          color: "#f00",
        },
      },
      axisLabel: {
        color: "#8a8a8a",
      },
      splitLine: {
        show: false,
      },
      boundaryGap: false,
      data: ["A", "B", "C", "D", "E", "F"],
    },
  ],

  yAxis: [
    {
      type: "value",
      min: 0,
      // max: 140,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#d8d8d0'
        }
      },
      axisLabel: {
        show: false,
        margin: 20,
        textStyle: {
          color: "#d1e6eb",
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "注册总量",
      type: "line",
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: "circle",
      symbolSize: 8,
      lineStyle: {
        normal: {
          color: "#6c50f3",
        },
      },
      label: {
        show: true,
        position: "top",
        textStyle: {
          color: "#6c50f3",
        },
      },
      itemStyle: {
        color: "#6c50f3",
      },
      tooltip: {
        show: false,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(108,80,243,0.3)",
              },
              {
                offset: 1,
                color: "rgba(108,80,243,0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(108,80,243, 0.9)",
          shadowBlur: 20,
        },
      },
      data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
    },
    {
      name: "注册总量",
      type: "line",
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "#00ca95",
        },
      },
      label: {
        show: true,
        position: "top",
        textStyle: {
          color: "#00ca95",
        },
      },

      itemStyle: {
        color: "#00ca95",
      },
      tooltip: {
        show: false,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(0,202,149,0.3)",
              },
              {
                offset: 1,
                color: "rgba(0,202,149,0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(0,202,149, 0.9)",
          shadowBlur: 20,
        },
      },
      data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
    },
  ],
};


