<template>
    <div class="warp">
        <div class="box">
            <div>
                <div class="title">常用功能</div>
            </div>
            <div class="pagebox" >
                <div class="pagecenter" v-for="item in list" :key="item.id">
                    <i :class="item.icon"></i>
                    <div>{{ item.title }}</div>
                </div>
            </div>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>公告中心</span>
                <span style="float: right;">查看全部&gt;</span>
            </div>
            <div v-for="(item, index) in listright" :key="index" class="text item">
                <span>{{ item.title }}</span>
                <span>{{ item.time }}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                { id: 1, title: "会员查询", icon: "el-icon-user" },
                { id: 2, title: "标签管理", icon: "el-icon-collection-tag" },
                { id: 3, title: "会员权益", icon: "el-icon-medal" },
                { id: 4, title: "成长值管理", icon: "el-icon-s-marketing" },
                { id: 5, title: "订单查询", icon: "el-icon-notebook-2" },
                { id: 6, title: "优惠卷", icon: "el-icon-s-ticket" },
                { id: 7, title: "限时折扣", icon: "el-icon-time" },
                { id: 8, title: "满减满折", icon: "el-icon-menu" },
                { id: 9, title: "数据分析", icon: "el-icon-s-data" },
                { id: 10, title: "编辑常用功能", icon: "el-icon-edit" },
            ],
            listright: [
                { id: 1, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 2, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 3, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 4, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 5, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 6, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 7, title: '限时折扣分析功能上线', time: '4/02' },
                { id: 8, title: '限时折扣分析功能上线', time: '4/02' },

            ]
        };
    },
};
</script>

<style lang="scss" scoped>
  .box:hover{
    border: 2px solid #1890ff;
    box-sizing: border-box;
  }
  .box-card:hover{
    border: 2px solid #1890ff;
    // box-sizing: border-box;
  }
.warp {
    display: flex;
    width: 100%;

    .box-card{
    // border: 2px solid #fff;
    box-sizing: border-box;
        :nth-child(1){
          border: 0;
        
        }
        .item{
          
            font-size: 13px;
            display: flex;
            justify-content: space-around;
        }
    }
    .el-card {
        
        text-align: left;
        line-height: 0;
        margin-left: 30px;
        border-radius: 20px;
       height: 310px;
       width: 220px;
    }
   
}

.box {
    border: 2px solid #fff;
    display: flex;
    flex-direction: column;
    width: 76%;
    height: 310px;
    background-color: #fff;
    border-radius: 30px;
    box-sizing: border-box;
    
  
    .pagebox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-left: 25px;

        height: 100px;
        margin-top: 40px;

        .pagecenter {
            width: 16%;
            display: flex;
            text-align: center;
            flex-direction: column;
            align-items: center;
       

            i {
                width: 60px;
                height: 60px;
                line-height: 60px;
                font-size: 25px;
                background-color: #d1e9ff;
                color: #0f78da;
                border-radius: 12px;
            }

            div {
                line-height: 50px;
            }
        }
    }
}

.title {
    width: 100%;
    height: 30px;
    text-align: left;
    line-height: 60px;
    font-size: 16px;
    padding-left: 20px;

}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;

    
}

.box-card {
    width: 200px;
    border: 2px solid #fff;

 

}
</style>