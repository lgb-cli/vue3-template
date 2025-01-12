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
  xAxis: [{
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
  }, ],
  yAxis: [{
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
  }, ],
  dataZoom: [{
      show: true,
      height: 15,
      xAxisIndex: [0],
      bottom: 6,
      start: 10,
      end: 80,
      handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
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
  series: [{
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
  series: [{
    name: "访问来源",
    type: "pie",
    radius: "50%",
    center: ["50%", "50%"],
    color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
    data: [{
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
      normal: {},
    },
  }, ],
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
          colorStops: [{
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
  xAxis: [{
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
  }, ],

  yAxis: [{
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
  }, ],
  series: [{
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
            [{
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
            [{
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

export const bar_total = {
  legend: {
    top: '5%',
    textStyle: {
      color: '#fff'
    },
    itemGap: 20,
  },
  xAxis: {
    data: ['公安局', '公安厅', '公安处', '公安所', '公安邮局'],
    axisLabel: {
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
      color: '#999'
    }
  },
  grid: {
    top: "25%",
    left: '5%',
    right: '5%',
    bottom: '10%'
  },
  series: [{
    type: 'bar',
    barWidth: 24,
    name: '表',
    showBackground: false,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#01B3FF'
        },
        {
          offset: 1,
          color: '#0339FF'
        }
      ])
    },
    data: [20, 20, 20, 20, 20]
  }, {
    type: 'bar',
    name: '接口',
    barWidth: 24,
    showBackground: false,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#31FB99'
        },
        {
          offset: 1,
          color: '#02948F'
        }
      ])
    },
    data: [15, 15, 15, 15, 15]
  }, {
    type: 'bar',
    name: '文件',
    barWidth: 24,
    showBackground: false,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#2B84B3'
        },
        {
          offset: 1,
          color: '#6644FB'
        }
      ])
    },
    data: [10, 10, 10, 10, 10]
  }]
};
export const bar_total2 = {

  xAxis: {
    data: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    axisLabel: {
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#0A166E'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#0A166E'
      }
    },
    axisLabel: {
      show: true,
      color: '#fff'
    }
  },
  grid: {
    top: "10%",
    left: '10%',
    right: '5%',
    bottom: '10%'
  },
  series: [{
    type: 'bar',
    barWidth: 24,
    name: '表',
    showBackground: false,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#01B3FF'
        },
        {
          offset: 1,
          color: '#0339FF'
        }
      ])
    },
    label: {
      show: true,
      position: 'top',
      color: '#01B3FF'
    },
    data: [2000, 1800, 1500, 1200, 1000, 1010, 900, 820]
  }]
};
export const pie_total = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  color: ['#0278E7', '#6054FF', '#00C6FF', '#F19610', '#8A00E1', '#34D160'],
  colorBy: 'series',
  legend: {
    orient: 'vertical',
    right: '10%',
    top: 'middle',
    itemWidth: 30,
    itemHeight: 15,
    itemGap: 20,
    itemStyle: {

    },
    textStyle: {
      color: '#fff',
      fontSize: 18,
      rich: {
        name: {
          color: '#fff',
          fontSize: 21,
          height: 40,
          lineHeight: 40,
          align: 'left'
        },
        num: {
          color: '#00C6FF',
          fontSize: 18,
          fontWeight: 'bold',
        },
        unit: {
          color: '#00C6FF',
          fontSize: 18,
          width: 30,
          align: 'right',
          fontWeight: 'bold',

        }
      },
    },

    formatter: function (params) {
      return [
        '{name|' + params + '}',
        '{num|1138}{unit|40%}'
      ].join('\n')
    }

  },
  series: [{
    name: '资源统计',
    type: 'pie',
    radius: [50, 160],
    center: ['25%', '50%'],
    roseType: 'radius',
    itemStyle: {
      borderRadius: 5
    },
    label: {
      show: false
    },
    data: [{
        value: 40,
        name: '决策环节占比'
      },
      {
        value: 33,
        name: '办理环节占比'
      },
      {
        value: 28,
        name: '审核环节占比'
      },
      {
        value: 22,
        name: '未办环节占比'
      },
      {
        value: 20,
        name: '已办环节占比'
      },
      {
        value: 15,
        name: '失效环节占比'
      }
    ]
  }]
};
export const bar_3d_total = {
  tooltip: {},
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '15%',
  },
  xAxis: {
    data: ["企业", "农专", "个体"],

    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
      textStyle: {
        color: "#e54035",
      },
    },
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [{
      name: "年报上报率3",
      type: "pictorialBar",
      symbolSize: [80, 30],
      symbolOffset: [0, -18],
      z: 12,
      itemStyle: {
        normal: {
          color: "#14b1eb",
        },
      },
      data: [{
          value: 100,
          symbolPosition: "end",
        },
        {
          value: 50,
          symbolPosition: "end",
        },
        {
          value: 20,
          symbolPosition: "end",
        },
      ],
    },
    {
      name: "年报上报率2",
      type: "pictorialBar",
      symbolSize: [80, 30],
      symbolOffset: [0, 18],
      z: 12,
      itemStyle: {
        normal: {
          color: "#14b1eb",
        },
      },
      data: [100, 50, 20],
    },
    {
      name: "年报上报率1",
      type: "pictorialBar",
      symbolSize: [115, 55],
      symbolOffset: [0, 33],
      z: 11,
      itemStyle: {
        normal: {
          color: "transparent",
          borderColor: "#14b1eb",
          borderWidth: 5,
        },
      },
      data: [100, 50, 20],
    },
    {
      name: "年报上报率",
      type: "pictorialBar",
      symbolSize: [140, 80],
      symbolOffset: [0, 46],
      z: 10,
      itemStyle: {
        normal: {
          color: "transparent",
          borderColor: "#14b1eb",
          borderType: "dashed",
          borderWidth: 5,
        },
      },
      data: [100, 50, 20],
    },
    {
      type: "bar",
      itemStyle: {
        normal: {
          color: "#14b1eb",
          opacity: 0.7,
        },
      },
      label: {
        show: true,
        position: "top",
        textStyle: {
          color: "#1DDADE",
          fontSize: 24,
          fontWeight: "bold",
          padding: [0, 0, 18, 0],
        },
      },
      silent: true,
      barWidth: 80,
      barGap: "-100%", // Make series be overlap
      data: [100, 50, 20],
    },
  ],
};
export const map_options = {
  visualMap: {
    min: 0,
    max: 100,
    text: ['高', '中', '低'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['#F19610', '#8A00E1', '#34D160'],
    },
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'HENAN',
  },
  series: [{
    name: '河南省',
    type: 'map',
    map: 'HENAN',
    label: {
      show: true,
    },
    itemStyle: {
      areaColor: '#30d7e1',
      borderColor: '#fff',
      borderWidth: 1
    },
    data: [{
      name: '郑州市',
      value: 10
    }, {
      name: '开封市',
      value: 20
    }, {
      name: '洛阳市',
      value: 30
    }, {
      name: '平顶山市',
      value: 40
    }, {
      name: '安阳市',
      value: 50
    }]
  }, {
    name: 'Top5',
    type: 'effectScatter',
    colorBy: 'data',
    coordinateSystem: 'geo',
    data: [{
      value: [113.6, 34.8, 100],
      name: '郑州市'
    }, {
      value: [114.3, 34.7, 20],
      name: '开封市'
    }, {
      value: [112.4, 34.6, 30],
      name: '洛阳市'
    }, {
      value: [113.3, 33.7, 40],
      name: '平顶山市'
    }, {
      value: [114.3, 36.1, 50],
      name: '安阳市'
    }, {
      value: [113.8, 35.3, 60],
      name: '新乡市'
    }],
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true
      },
      emphasis: {
        show: true
      }
    },
    itemStyle: {
      color: '#fff',
      emphasis: {
        color: '#fff'
      },
      borderColor: '#fff',
      borderWidth: 2,
      shadowColor: '#fff',
      shadowBlur: 10

    },
    symbolSize: function (val) {
      return val[2] / 5
    }
  }, {
    type: 'lines',
    effect: {
      show: true,
      period: 6,
      trailLength: 0.7,
      symbol: 'arrow',
      symbolSize: 10
    },
    lineStyle: {
      normal: {
        color: '#010170',
        width: 2,
        opacity: .8,
        curveness: .3,
      }
    },
    data: [{
      coords: [
        [114.3, 34.7],
        [113.6, 34.8]
      ]
    }, {
      coords: [
        [114.3, 34.7],
        [113.6, 34.8]
      ]
    }, {
      coords: [
        [112.4, 34.6],
        [113.6, 34.8]
      ]
    }, {
      coords: [
        [113.3, 33.7],
        [113.6, 34.8]
      ]
    }, {
      coords: [
        [114.3, 36.1],
        [113.6, 34.8]
      ]
    }, {
      coords: [
        [113.8, 35.3],
        [113.6, 34.8]
      ]
    }]
  }]
}