<script setup>
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

// 动态类型分布图第一个
const chartSort = ref(null)
const option = ref()
option.value = {
  title: {
    text: '动态类型分析',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '动态类型分析',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '猫咪救助' },
        { value: 735, name: '日常分享' },
        { value: 580, name: '猫粮带货' },
        { value: 484, name: '其他' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

// 第二个
const chartPeople = ref(null)
const optionSecond = ref()
optionSecond.value = {
  title: {
    text: '当天活跃人数',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 人'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 6,
        color: 'green'
      },
      {
        gt: 6,
        lte: 8,
        color: 'red'
      },
      {
        gt: 8,
        lte: 14,
        color: 'green'
      },
      {
        gt: 14,
        lte: 17,
        color: 'red'
      },
      {
        gt: 17,
        color: 'green'
      }
    ]
  },
  series: [
    {
      name: 'Electricity',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30'
            },
            {
              xAxis: '10:00'
            }
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    }
  ]
}

// 第三个
const chartOthers = ref(null)
const optionThree = reactive({
  title: {
    text: '活跃人数预测'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0]
      var date = new Date(params.name)
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      )
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {}
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data: [] // 初始化为一个空数组
    }
  ]
})

const randomData = () => {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}

let now = new Date(2024, 9, 3)
let oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
for (let i = 0; i < 1000; i++) {
  optionThree.series[0].data.push(randomData()) // 直接推入 optionThree.series[0].data 数组中
}

// 第四个
const chartFour = ref(null)
const optionFour = ref()
optionFour.value = {
  title: {
    text: '动态流量预测'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    }
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Lowest',
      type: 'line',
      data: [1, 0, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max'
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      }
    }
  ]
}

onMounted(() => {
  // 在 DOM 挂载后初始化 ECharts
  //  第一卦数据图
  const chart = echarts.init(chartSort.value)
  chart.setOption(option.value)

  //   第二个
  const chart2 = echarts.init(chartPeople.value)
  chart2.setOption(optionSecond.value)

  //   第三个
  const chart3 = echarts.init(chartOthers.value)
  chart3.setOption(optionThree)
  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      optionThree.series[0].data.shift()
      optionThree.series[0].data.push(randomData())
    }
    chart3.setOption({
      series: [
        {
          data: optionThree.series[0].data
        }
      ]
    })
  }, 1000)

  //   第四个数据图
  const chart4 = echarts.init(chartFour.value)
  chart4.setOption(optionFour.value)
})
</script>

<template>
  <el-card>
    <div class="main-box">
      <div style="width: 600px; height: 400px">
        <div ref="chartSort" style="width: 600px; height: 400px"></div>
      </div>
      <div
        style="width: 600px; height: 400px; margin-left: 20px"
        ref="chartPeople"
      ></div>
      <div
        style="width: 600px; height: 400px; margin-top: 20px"
        ref="chartOthers"
      ></div>
      <div
        ref="chartFour"
        style="width: 600px; height: 400px; margin-left: 20px; margin-top: 20px"
      ></div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.main-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
