<template>
  <div>
    <div class="title">
      <span>实时概况</span>
      <span>更新时间：2021年/12/21&nbsp;10:00</span>
    </div>
    <div class="p-header" >
      <div class="biao">
        <div class="pie" ref="pie"></div>
      </div>
      <div class="p-header-right">
        <div v-for="item in list" :key="item.id" class="a">
            <p>{{item.title}}</p>
            <p>{{ item.num }}</p>
            <p>较上期{{ item.rise }}</p>
        </div>
      </div>

     
    </div>
 <ConTentUse></ConTentUse>
 <Datasheet></Datasheet>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {homedate}  from  '@/api/request.js'

import ConTentUse from './ConTentUse.vue';
import Datasheet from './Datasheet.vue';
export default {
  data(){
    return{
      list:[],
     
    }
  },
  components: {ConTentUse, Datasheet },

  created(){
    homedate().then(res=>{
      // console.log(res);
      let {code,list} = res.data
      if(code == 0 ){
        this.list = list
      }
    }).catch(error=>{
      console.log(error);
    })
  },  
  mounted() {
    // var chart = echarts.init(dom, 'dark');
    var myChart = echarts.init(this.$refs.pie);
    var option;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {  //x轴的文字样式
          color: '#d9d9d9'
        },
        axisLine: {  // x轴的轴线样式
          show: true,
          lineStyle: {
            color: '#dfdbdd',

          }
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        name: '支付金额（元）',
        nameTextStyle: { //y轴 名称样式
          color: '#fff',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 30,
          padding: [0, 0, 0, 30]//表示 [上, 右, 下, 左] 的边距
        },
        type: 'value',
        splitLine: { //网格线
          lineStyle: {
            type: 'dashed' //设置网格线类型 dotted：虚线 solid:实线
          },
          show: true //隐藏或显示
        },
        axisLabel: {  //y轴的文字样式
          color: '#fff',

        },

      },
      series: [
        {
          symbol: "none",
          data: [1000, 750, 901, 934, 1290, 1330, 1320],
          type: 'line',

          lineStyle: {
            color: 'rgb(0,208,171)',
            width: 8,
          },
          areaStyle: {
            color: 'rgba(0,208,171,.5)',
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }
}
</script>

<style lang="scss" scoped>
.a:hover{
    border: 2px solid #1890ff;
  }
  .a{
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
.p-header{


  display: flex;
  // width: 100vw;

  // height: 310px;
  // border: 1px solid black;

  .p-header-right{
    width: 100%;
    margin-left: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
    margin-top: 5px;
  height: 300px;


  
  div{
    text-align: left;
    text-indent: 20px;
    width:47%;
    height: 40%;
    line-height: 40px;
    border-radius: 10px;
    background-color: #fff;


    :nth-child(1){
     opacity: 0.7;
     font-size: 13px;


    }
    :nth-child(2){
     font-size: 27px;
      font-weight: 700;


    }
    :nth-child(3){
     font-size: 9px;
     opacity: 0.7;

     
    }
  }
  }
}
.biao {
  width: 550px;
  height: 280px;
  border-radius: 30px;
  background-color: #2e60ff;

}

.pie {
  width: 550px;
  height: 300px;
 
}
</style>