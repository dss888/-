<template>
  <div>
    <div class="title">
      <span>实时概况</span>
      <span>更新时间：2021年/12/21&nbsp;10:00</span>
    </div>
    <div class="p-header">

      <div class="p-header-right">
        <div v-for="item in list" :key="item.id" class="a">
          <p>{{ item.title }}</p>
          <p>{{ item.num }}</p>
          <p>较上期{{ item.rise }}</p>
        </div>
      </div>
    </div>

   

    <div class="biaoc">
      <div class="piec" ref="piec"></div>
    </div>

    <div class="biao">
      <div class="piea" ref="piea"></div>
      <div class="pieb" ref="pieb"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { homedate } from '@/api/request.js'

// import ConTentUse from './ConTentUse.vue';
// import Datasheet from './Datasheet.vue';
export default {
  data() {
    return {
      list: [],

    }
  },
  created() {
    homedate().then(res => {
      // console.log(res);
      let { code, list } = res.data
      if (code == 0) {
        this.list = list
      }
    }).catch(error => {
      console.log(error);
    })
  },
  mounted() {
    // var chart = echarts.init(dom, 'dark');
    var myCharta = echarts.init(this.$refs.piea);
    var myChartb = echarts.init(this.$refs.pieb);
    var myChartc = echarts.init(this.$refs.piec);
    var optiona;
    var optionb;
    var optionc;
    optiona = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
    // doesn't perfectly work with our tricks, disable it
    selectedMode: false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['50%', '40%'],
      center: ['50%', '60%'],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
        formatter(param) {
          // correct the percentage
          return param.name + ' (' + param.percent  + '%)';
        }
      },
      data: [
        { value: 1048, name: '老客户' },
        { value: 735, name: '新客户' },

        {
          // make an record to fill the bottom 50%
          
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        }
      ]
    }
  ]
};
optionb = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
    // doesn't perfectly work with our tricks, disable it
    selectedMode: false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['50%', '40%'],
      center: ['50%', '60%'],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
        formatter(param) {
          // correct the percentage
          return param.name + ' (' + param.percent  + '%)';
        }
      },
      data: [
        { value: 1048, name: '老客户' },
        { value: 735, name: '新客户' },

        {
          // make an record to fill the bottom 50%
          
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        }
      ]
    }
  ]
};
    optionc = {
      xAxis: {
        type: 'category',
        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
      },
      yAxis: {
        type: 'value',
        name: '支付人数统计（小时）',
        nameTextStyle: { //y轴 名称样式
          color: 'black',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 30,
          padding: [0, 0, 0, 30]//表示 [上, 右, 下, 左] 的边距
        },
      },
      series: [
        {
          data: [230, 740, 1000, 780, 1100, 480, 260, 700, 500, 780, 580, 490, 230, 230, 720, 900, 500, 800, 300, 522, 500, 311, 800, 100, 500],
          type: 'bar'
        }
      ]
    };

    optiona && myCharta.setOption(optiona);
    optionb && myChartb.setOption(optionb);
    optionc && myChartc.setOption(optionc);

  }

}
</script>

<style lang="scss" scoped>
.a:hover {
  border: 2px solid #1890ff;
}

.a {
  height: 150px;
  border: 2px solid #fff;
}

.title {
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 0;
  font-weight: 700;
  font-size: 20px;

  :nth-child(2) {
    margin-left: 30px;
    font-weight: 300;
    font-size: 13px;
    opacity: 0.8;


  }
}

.p-header {
  display: flex;
  // width: 100vw;
  height: 150px;
  // border: 1px solid black;

  .p-header-right {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 5px;
    // height: 300px;

    div {
      text-align: left;
      text-indent: 20px;
      width: 22%;
      height: 130px;
      line-height: 40px;
      border-radius: 10px;
      background-color: #fff;


      :nth-child(1) {
        opacity: 0.7;
        font-size: 13px;
      }

      :nth-child(2) {
        font-size: 27px;
        font-weight: 700;

      }
      :nth-child(3) {
        font-size: 9px;
        opacity: 0.7;
      }
    }
  }
}
.biao{
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 400px;
  .piea{
  width: 46%;
  height: 300px;
  border-radius: 30px;
  background-color: #fff;
  border: 2px solid #fff;
}
.pieb{
  width: 46%;
  height: 300px;
  border-radius: 30px;
  background-color: #fff;
  border: 2px solid #fff;
}
}


.biaoc {
  width: 100%;
  height: 400px;
  border-radius: 30px;
  background-color: #fff;
  border: 2px solid #fff;

}

.piec {
  width: 80vw;
  height: 400px;

}
.piea:hover{
  border: 2px solid #1890ff;

}
.pieb:hover{
  border: 2px solid #1890ff;

}
.biaoc:hover{
  border: 2px solid #1890ff;

}
</style>