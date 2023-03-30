<template>
   
    <div class="warp">
        <div class="dv1">会员数据报表</div>
        <el-table :data="list" style="width: 100%" class="box">
            <el-table-column prop="id" label="序号">
                </el-table-column>
             
                <el-table-column prop="grade" label="会员等级">
                </el-table-column>
                <el-table-column prop="num" label="成交会员数">
                </el-table-column>
                <el-table-column prop="proportion" label="成交会员占比">
                </el-table-column>
                <el-table-column prop="orders" label="支付订单数">
                </el-table-column>
                <el-table-column prop="price" label="客单价（元）">
                </el-table-column>
                <el-table-column prop="amount" label="支付金额（元）">
                </el-table-column>
                <el-table-column prop="amountnum" label="支付金额占比">
                </el-table-column>
      

        </el-table>
      
    </div>
</template>

<script>
import { homedatetwo } from '@/api/request';
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.homedata()
    },
    methods: {
        homedata() {
            homedatetwo().then(res=>{
                let {code,list} = res.data
                if(code ===0){
                    this.list = list
                }
            })
        }
    }


}

</script>

<style lang="scss" scoped>
 .warp:hover{
    border: 2px solid #1890ff;
  }
.warp {
    width: 100%;
    margin-top: 25px;
    border-radius: 20px;
    height: 400px;
    border-bottom-left-radius: 20px;
    background-color: #fff;
    margin-bottom: 50px;
    border: 2px solid #fff;
    box-sizing: border-box;

    
    .dv1 {
        text-align: left;
        line-height: 40px;
        margin-left: 20px;
        padding-top: 10px;
    }

}


.el-table {

    line-height: 0;
}

</style>