<template>
  <section>
    <div v-if="isshow">
      <div class="box">
        <Breadcrumb></Breadcrumb>
        <div class="xiangqing">限时折扣</div>
        <div class="hrr"></div>
        <div class="ab">
          <div class="a">
            <div>状态</div>
            <el-select v-model="value" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="cd">
          <div>
            <!-- <el-button plain class="f" @click="selectgradeamount()" :lista="list">查询</el-button> -->
            <!-- <el-button plain class="f" @click="selectgradeamount()"
              >查询</el-button
            > -->
            <el-button plain >查询</el-button>

            <el-button plain @click="result()">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 会员查询最下方表格 -->
      <div class="warp">
        <div class="header">
          <div class="boxa">限时折扣活动列表</div>
          <div class="btn">
            <!-- <Memberfrom @xinzeng="shuaxin"></Memberfrom> -->
            <el-button size="medium">新增</el-button>

            <el-button size="medium">批量操作</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="
            newlist
          "
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
          <el-table-column label="活动名称" prop="activityname" >
          </el-table-column>
          <el-table-column prop="orginalprice" label="原价（元）" width="100px"> </el-table-column>
          <!-- <el-table-column prop="name" label="会员标签"> -->
          <!-- </el-table-column> -->
          <el-table-column prop="discountprice" label="折扣价（元）" width="120px"> </el-table-column>
          <el-table-column prop="stock" label="库存" width="80px"> </el-table-column>
          <el-table-column label="活动状态" width="80px" prop="activestate">
          </el-table-column>
          <el-table-column  label="有效期" align="center"> 
            <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.validperiod | formadate
            }}</span>
          </template>
          </el-table-column>

          <el-table-column width="210px"  label="操作">
            <!-- eslint-disable -->
           
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="details()">会员详情</el-button> -->
              <!-- 引入组件 -->
              <!-- <el-button type="text" @click="recharge(scope.$index, scope.row)">
                <RechargeVue
                  :formLabelAlign="cur"
                  @chongzhi="shuaxin"
                ></RechargeVue>
              </el-button> -->
              <!-- <el-button type="text" @click="edit(scope.$index, scope.row)">
                <Integral :formLabelAlign="cur" @xiugai="shuaxin"></Integral>
              </el-button> -->
              <!-- <el-button type="text" @click="del(scope.$index, scope.row)"
                >停用</el-button
              > -->
            <el-button plain >停用</el-button>

            </template>
          </el-table-column>
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
    <!-- <div class="box aaa" v-if="!isshow">
     
    </div> -->
  </section>
  <!-- 会员查询 -->
  <!-- 会员查询 -->
</template>
<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";
// import Memberfrom from "@/views/marketing/Memberfrom.vue";
// import RechargeVue from "@/views/member/memberselect/Recharge.vue";
// import Integral from "@/views/member/memberselect/Integral.vue";
// import { selectgrade } from "@/api/request";
import { disc, delmember } from "@/api/request";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "未开始",
        },
        {
          value: "选项2",
          label: "进行中",
        },
        {
          value: "选项3",
          label: "已结束",
        }
      ],
      value: "",
   
      list: [],
      newlist: [],
      search: "",
      multipleSelection: [],
      cur: {},
      countsize: 30,
      page: 1,
      size: 10,
      isshow: true,
    };
  },
  components: {   Breadcrumb },
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
      disc().then((res) => {
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
    //查询按钮
    // selectgradeamount() {
    //   // console.log(this.value)
    //   // console.log(this.valuee)
    //   //查询当前选择的内容

    //   selectgrade({ grade: this.value, numbertime: this.valuee }).then(
    //     (res) => {
    //       if (res.data.list !== undefined) {
    //         if (res.data.list.length > 0) {
    //           // console.log(res.data.list);
    //           this.newlist = res.data.list;
    //         } else {
    //           this.newlist = [];
    //         }
    //       } else {
    //         this.newlist = [];
    //       }
    //     }
    //   );
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //跳转会员详情
    details() {
      this.isshow = false;
    },
    //获取当前插入的信息内容
    recharge(index, row) {
      // console.log(index, row);
      //使用深拷贝，防止修改的时候使用一个数据
      this.cur = JSON.parse(JSON.stringify(row));
      // console.log(this.cur);
    },
    //获取当前修改的信息内容

    edit(index, row) {
      // console.log(index,row);
      //使用深拷贝，防止修改的时候使用一个数据
      //
      this.cur = JSON.parse(JSON.stringify(row));
    },
    //删除当前点击
    // del(index, row) {
    //   this.$confirm("是否要删除数据?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       delmember({ id: row.id }).then((res) => {
    //         // this.$message({
    //         //   type: 'success',
    //         //   message: '删除成功!',
    //         //   duration: 1000,
    //         // });
    //         this.$message.success("删除成功!");
    //         this.getdata();
    //       });
    //       // this.$router.go(0)
    //     })
    //     .catch(() => {
    //       // this.$message({
    //       //   type: 'info',
    //       //   message: '已取消删除',
    //       //   duration: 1000
    //       // });
    //       this.$message.info("已取消删除!");
    //     });
    // },
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

      // console.log(a);
    },
    //点击重置按钮
    result() {
      // 清空
      this.value = "";
      // 回归第一页，size不需要动
      // 理解：size是用户根据自己的喜好设置的，一般不会代码里去改他的size
      this.page = 1;
      // 查询数据
      // this.getdata()
      this.newlist = this.list.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
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

.cd {
  display: flex;
  margin-top: 10px;
  margin-right: 100px;
  justify-content: flex-end;
}

.a,
.b,
.c {
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 15px;

  div {
    margin-right: 20px;
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

// .select {
//   height: 50px;
//   text-align: left;

// }

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

//会员详情
.aaa {
  height: 80px;
  padding-top: 20px;
  background-color: #fff;
  padding-left: 0;

  .xiangqing {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    line-height: 10px;
    padding-left: 20px;
  }
}

.bbb {
  background-color: #fff;
  margin-top: 32px;
}
</style>