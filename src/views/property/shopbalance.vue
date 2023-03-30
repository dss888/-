<template>
  <section>
    <div>
      <div class="box">
        <Breadcrumb></Breadcrumb>
        <div class="xiangqing">店铺余额</div>
        <div class="hrr"></div>
        <div class="box-header">
          <div class="box-nav">
            <div>
              <div
                style="color: rgba(0, 0, 0, 0.427450980392157); font-size: 14px"
              >
                店铺余额（元）
              </div>
              <div style="font-size: 30px; font-weight: 700">126,560</div>
            </div>
            <div style="margin-top: 20px; margin-left: 30px">
              <el-button type="primary">充值</el-button>
              <el-button>提现</el-button>
            </div>
          </div>
          <div>
            <div
              style="color: rgba(0, 0, 0, 0.427450980392157); font-size: 14px"
            >
              待结算
            </div>
            <div style="font-size: 30px; font-weight: 700">6,560</div>
          </div>
          <div>
            <div
              style="color: rgba(0, 0, 0, 0.427450980392157); font-size: 14px"
            >
              不可用
            </div>
            <div style="font-size: 30px; font-weight: 700">1,000</div>
          </div>
        </div>
      </div>
      <!-- 会员查询最下方表格 -->
      <div class="warp">
        <div class="header">
          <div class="boxa">交易记录</div>
        </div>
        <el-table
          ref="multipleTable"
          :data="newlist"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            background: '#f9f9f9',
            color: '#595859',
            fontWeight: '600',
          }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50" label="序号">
            <template slot-scope="scope">
              <!-- 需要写死的每页五条要对应修改 -->
              {{ scope.$index + (page - 1) * size + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="时间" width="200px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.time | formadate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="moneytype" label="收支类型" width="90px"> </el-table-column>
          <el-table-column prop="amount" label="金额(元)"> </el-table-column>
          <el-table-column prop="billtype" label="账单类型"> </el-table-column>
          <el-table-column prop="balance" label="余额(元)"> </el-table-column>
          <el-table-column prop="order" label="订单编号"></el-table-column>
          <el-table-column prop="abstract" label="交易摘要"> </el-table-column>
        </el-table>
        <!-- total总条数 
      page-size 每页显示的条数 
      page-sizes 规定一页显示多少条
        current-change 事件 获取到当前的第几页
        layout="prev 上一页  pager 分页页码  next 下一页  sizes 选择一页显示多少条"
      -->
        <el-pagination
          background
          layout="prev, pager, next,sizes,total"
          :total="countsize"
          :page-size="size"
          @current-change="getcurrent"
          :page-sizes="[5, 10, 15, 20, 25]"
        >
        </el-pagination>
      </div>
      <!-- <Membercontent :lista="list"></Membercontent> -->
    </div>
  </section>
  <!-- 会员查询 -->
  <!-- 会员查询 -->
</template>
<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";
import { storemoney} from "@/api/request";
export default {
  data() {
    return {
      list: [],
      newlist: [],
      multipleSelection: [],
      cur: {},
      countsize: 30,
      page: 1,
      size: 10,
    };
  },
  components: { Breadcrumb },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getdata();
    },
    //获取所有数据
    getdata() {
      // 1、获取所有数据不需要参数
      storemoney().then((res) => {
        // console.log(res);
        let { code, list } = res.data;
        if (code === 0) {
          this.list = list.info;
          this.countsize = list.count;
          this.newlist = this.list.slice(
            (this.page - 1) * this.size,
            this.page * this.size
          );
        }
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //2、获取当前点击分页的页数
    getcurrent(a) {
      this.page = a;
      // this.getdata();
      //  console.log(this.page);
      //  console.log(this.list);
      // 3、主要理解这代码
      this.newlist = this.list.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
      //  console.log(this.newlist);
      this.value = "";
      this.valuee = "";

      // console.log(a);
    },
    shuaxin() {
      this.getdata();
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.hrr {
  width: 100%;
  height: 1px;
  background-color: rgba(228, 207, 207, 0.4);
}

.box-header {
  display: flex;
  justify-content: space-around;

  .box-nav {
    display: flex;
    padding-left: 20px;
  }
}

.f {
  background-color: #1890ff;
  color: #fff;
}

.box {
  width: 100%;
  height: 200px;
  line-height: 50px;

  // border: 1px solid black;
  background-color: #fff;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 20px;

  .xiangqing {
    font-size: 20px;
    font-weight: 700;
  }
}

.el-breadcrumb {
  line-height: 30px;
  padding-left: 20px;
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  height: 50px;
}

::v-deep {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: black;
  }

  .cell {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.temp1 {
  display: flex;

  .sp1 {
    display: flex;
    flex-direction: column;
  }
}

.warp {
  background-color: #fff;
  margin-top: 20px;
}

.btn {
  align-items: center;
  margin-left: 50px;
  display: flex;
}

.header {
  display: flex;
}

.boxa {
  width: 75%;
  // border: 1px solid black;
  line-height: 60px;
  font-size: 17px;
  padding-left: 20px;
}

.el-button--medium {
  padding-left: 10px;
  margin-left: 20px;
  width: 78px;
  height: 40px;
}

.el-breadcrumb {
  padding-left: 0;
}
</style>