<template>
  <div class="report">
    <div class="report_header"><div class="report_header_back iconfont" @click="handleBackClick">&#xe65e;</div>购物趋势图</div>
    <div class="report_content">
      <div class="report_content_title">购物统计报告</div>
      <div class="report_content_index">
        <span class="arrow-up">
          <svg data-v-666af9e5="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-up fa-w-10"><path data-v-666af9e5="" fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
        </span>
        <span class="percentage">34<span>%</span></span>
        <span class="text">+14,400</span>
      </div>
      <div class="report_content_chart" id="chart" />
      <div class="report_content_circle">
        <div
          :class="['circle', selected === index ? 'active' : '']"
          v-for="(item ,index) of circles"
          :key="index"
          @click="handleClickCircle(index)" />
      </div>
      <div class="report_content_bottom">购物趋势</div>
    </div>
    <div class="report_footer">
      <div class="report_footer_content">
        <div class="left">
          <div class="left_title">购物额</div>
          <div class="left_sub_title">累计购物额</div>
        </div>
        <div class="right">
          <small>&yen;</small> 300,254.00
        </div>
      </div>
      <div class="report_footer_progress">
        <div class="progress_background">
          <div class="progress_current" :style="{ width: `${progress * 100}%` }"></div>
        </div>
      </div>
      <div class="report_footer_text">
        <div>购物增长率</div>
        <div>34%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as Echarts from 'echarts'

export default {
  name: 'Report',
  setup () {
    const router = useRouter()
    const circles = Array(3).fill('')
    const selected = ref(0)
    const timer = ref(null)
    const progress = ref(0.35)
    onMounted(() => {
      getChart()
      timer.value = setInterval(() => {
        changeShowItem(++selected.value > 2 ? 0 : selected.value)
      }, 3000)
    })
    onUnmounted(() => {
      if (timer.value) clearInterval(timer.value)
    })
    const handleClickCircle = (index) => {
      selected.value = index
      getChart()
    }
    const changeShowItem = (index) => {
      handleClickCircle(index)
    }
    const handleBackClick = () => {
      router.back()
    }
    const getChart = () => {
      // 获取数据源
      const mockData = []
      for (let iii = 0; iii < 10; iii++) {
        mockData.push(Math.floor(Math.random() * 100 + 200))
      }
      // 获取Chart => DOM
      const chartDOM = document.getElementById('chart')
      // 初始化echarts对象
      const Chart = Echarts.init(chartDOM)
      // 生成渲染参数
      const options = {
        xAxis: {
          type: 'category', // 坐标轴类型
          show: false // 坐标轴显示
        },
        yAxis: {
          min: 0, // 最小值
          max: 350, // 最大值
          show: false
        },
        series: [{
          data: mockData,
          type: 'line',
          smooth: true, // 平滑
          areaStyle: { // 区域颜色
            color: 'rgba(75, 193, 252, .5)'
          },
          lineStyle: { // 线的颜色2
            width: 3,
            color: 'rgba(75, 193, 252, 1)'
          },
          itemStyle: { // 点样式
            color: 'rgba(75, 193, 252, 1)'
          },
          symbolSize: 8 // 点大小
        }],
        grid: { // 设置负数可以扩张延伸
          top: 0,
          bottom: 0,
          left: -30,
          right: -30
        },
        tooltip: {
          trigger: 'axis', // 如何触发
          axisPointer: { // tooltip类型
            type: 'cross',
            label: {
              backgroundColor: '#6a7985' // tooltip触发线背景颜色
            }
          }
        }
      }
      // 渲染图表
      Chart.setOption(options)
    }
    return { handleBackClick, circles, selected, progress, handleClickCircle }
  }
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';
.report {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 .02rem .08rem rgba(4, 9, 20, .03), 0 .02rem .08rem rgba(4, 9, 20, .03), 0 .02rem .08rem rgba(4, 9, 20, .03), 0 .02rem .08rem rgba(4, 9, 20, .03);
  &_header {
    width: 100%;
    align-items: center;
    height: .5rem;
    color: rgba(13, 27, 62, .7);
    border-bottom: .01rem solid #eee;
    box-sizing: border-box;
    font-size: .16rem;
    display: flex;
    &_back {
      width: .3rem;
      font-size: .24rem;
      color: #b6b6b6;
      padding: 0  0 0 .18rem;
    }
  }
  &_content {
    width: 100%;
    flex: 1;
    padding: 0 .28rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: .2rem;
    &_title {
      padding-top: .28rem;
      font-size: .13rem;
      color: rgb(108, 117, 125);
    }
    &_index {
      margin-top: .15rem;
      align-items: center;
      display: flex;
      .arrow-up {
        align-items: center;
        color: rgb(58, 196, 125);
        display: flex;
        svg {
          width: .25rem;
        }
      }
      .percentage {
        margin-left: .15rem;
        font-size: .35rem;
        font-weight: 700;
        color: #333;
        span {
          font-size: .28rem;
          font-weight: 400;
          color: #999;
          margin-left: .02rem;
        }
      }
      .text {
        margin-left: .15rem;
        color: rgb(58, 196, 125);
        font-size: .16rem;
      }
    }
    &_chart {
      width: 100%;
      flex: 1;
    }
    &_circle {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: .2rem;
      .circle {
        width: .1rem;
        margin: 0 .05rem;
        height: .1rem;
        background: #fff;
        border: .03rem solid rgb(63, 106, 216);
        border-radius: 50%;
      }
      .active {
        width: .12rem;
        height: .12rem;
        border: .05rem solid rgb(63, 106, 216);
      }
    }
    &_bottom {
      margin: .1rem 0;
      color: #999;
      font-size: .12rem;
    }
  }
  &_footer {
    width: 100%;
    height: 1.2rem;
    display: flex;
    flex-direction: column;
    border-top: .01rem solid #eee;
    box-sizing: border-box;
    font-size: .16rem;
    &_content {
      display: flex;
      padding: .14rem .14rem 0;
      .left {
        font-size: .13rem;
        &_title {
          font-weight: 700;
          color: #333;
        }
        &_sub_title {
          color: #999;
        }
      }
      .right {
        flex: 1;
        text-align: right;
        color: rgb(58, 196, 125);
        font-size: .25rem;
        font-weight: 700;
        small {
          font-weight: 400;
        }
      }
    }
    &_progress {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .14rem;
      .progress_background {
        width: 100%;
        height: .07rem;
        background: rgb(233, 236, 239);
        border-radius: .035rem;
        position: relative;
        .progress_current{
          height: .07rem;
          position: absolute;
          left: 0;
          right: 0;
          background: #3f6ad8;
          border-radius: .035rem;
          &::after {
            width: 100%;
            content: '';
            background: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            animation: progress_active 2s ease infinite; /** 动画名称 持续时间 执行方式（liner / ease） 是否重复 */
          }
          /** 动画 */
          @keyframes progress_active {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 100%;
              opacity: .3;
            }
          }
        }
      }
    }
    &_text {
      display: flex;
      justify-content: space-between;
      padding: 0 .14rem .14rem;
      font-size: .13rem;
      color: #999;
    }
  }
}
</style>
