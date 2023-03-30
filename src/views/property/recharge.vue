<template>
  <section>
    <div>
      <div class="box">
        <Breadcrumb></Breadcrumb>
        <div class="hrr"></div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="充值" name="first" class="a">
            <div style="font-size: 15px">店家名称&nbsp;&nbsp;柒尾家居商城</div>
            <div style="font-size: 15px">店铺余额&nbsp;&nbsp;29,000元</div>
            <div style="font-size: 15px" class="b">
              <span>充值金额&nbsp;&nbsp;</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <el-button type="primary" style="margin-left: 80px"
              >确认充值</el-button
            >
          </el-tab-pane>
          <el-tab-pane label="充值记录" name="second">
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
                <el-table-column label="充值时间" width="200px" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.time | formadate }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="90px">
                </el-table-column>
                <el-table-column prop="price" label="金额(元)">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column prop="liushuihao" label="流水号">
                </el-table-column>
                <el-table-column
                  prop="caozuoren"
                  label="操作人"
                ></el-table-column>
                <el-table-column prop="zhifufangshi" label="支付方式">
                </el-table-column>
              </el-table>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
  <!-- 会员查询 -->
  <!-- 会员查询 -->
</template>
<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";
import { storerecharge} from "@/api/request";
export default {
  data() {
    return {
      activeName: "first",
      input: "",
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    init() {
      this.getdata();
    },
    getdata() {
      // 1、获取所有数据不需要参数
      storerecharge().then((res) => {
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
.a {
  margin-top: 30px;
  margin-left: 180px;
}
.b {
  display: flex;
}
.hrr {
  width: 100%;
  height: 1px;
  background-color: rgba(228, 207, 207, 0.4);
  margin-top: 10px;
}

.box {
  width: 100%;
  height: 600px;
  line-height: 50px;

  // border: 1px solid black;
  background-color: #fff;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 20px;
}

::v-deep {
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: black;
  }
  .el-input {
    width: 200px;
  }
  .cell {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  height: 50px;
}
.el-breadcrumb {
  padding-left: 0;
}
</style>