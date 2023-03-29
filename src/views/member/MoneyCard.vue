<template>
  <div>
    <div class="box">
      <Breadcrumb></Breadcrumb>
      <div class="xiangqing">省钱卡</div>
    </div>
    <div class="box-a">
      <div class="a">
        <span>省钱卡名称：</span>
        <el-select v-model="valuee" placeholder="请选择省钱卡名称">
          <el-option
            v-for="item in options"
            :key="item.valuee"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="b">
        <!-- <el-button plain class="f" @click="selectgradeamount()" :lista="list">查询</el-button> -->
        <el-button type="primary" @click="selectgradeamount()">查询</el-button>
        <el-button plain @click="result()">重置</el-button>
      </div>
    </div>

    <div class="warp">
      <div class="header">
        <div class="boxa">会员列表</div>
        <div class="btn">
          <!-- <Memberfrom @xinzeng="shuaxin"></Memberfrom> -->
        </div>
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
            {{ scope.$index + (page - 1) * size + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="cardname" label="卡名称" align="center">
        </el-table-column>
        <el-table-column prop="cardprice" label="卡售价（元）" align="center">
        </el-table-column>
        <el-table-column prop="renewal" label="续费价（元）" align="center">
        </el-table-column>
        <el-table-column prop="gradeequity" label="等级权益" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="change(scope)"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="editdatetime"
          label="最后修改时间"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.editdatetime | formadate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="操作" align="center">
          <template slot-scope="scope">
            <!-- 引入组件 -->
            <el-button type="text" @click="edit(scope.$index, scope.row)">
              <Integral :formcard="cur" @xiugai="shuaxin"></Integral>
            </el-button>
            <el-button type="text" @click="del(scope.$index, scope.row)"
              >删除</el-button
            >
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
  </div>
</template>
  
<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";
//   import Memberfrom from '@/views/member/moneycard/Memberfrom.vue';
import Integral from "@/views/member/moneycard/Integral.vue";
import { moneycard, selectcard, delcard } from "@/api/request";
export default {
  data() {
    return {
      input: "",
      newlist: [],
      list: [],
      multipleSelection: [],
      countsize: 30,
      page: 1,
      size: 10,
      cur: {},
      value: true,
      valuee: "",
      options: [
        {
          value: "选项1",
          label: "LV1省钱卡",
        },
        {
          value: "选项2",
          label: "LV2省钱卡",
        },
        {
          value: "选项3",
          label: "LV3省钱卡",
        },
        {
          value: "选项4",
          label: "LV4省钱卡",
        },
        {
          value: "选项5",
          label: "LV5省钱卡",
        },
      ],
    };
  },
  components: { Integral, Breadcrumb },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getdata();
    },
    change(scope) {
      console.log(this.newlist[scope.$index].status);
    },
    //获取所有数据
    getdata() {
      // 1、获取所有数据不需要参数
      moneycard().then((res) => {
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
    selectgradeamount() {
      // console.log(this.value)
      // console.log(this.valuee)
      //查询当前选择的内容
      selectcard({ cardname: this.valuee }).then((res) => {
        if (res.data.list !== undefined) {
          if (res.data.list.length > 0) {
            // console.log(res.data.list);
            this.newlist = res.data.list;
          } else {
            this.newlist = [];
          }
        } else {
          this.newlist = [];
        }
      });
    },
    del(index, row) {
      this.$confirm("是否要删除数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcard({ id: row.id }).then((res) => {
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!',
            //   duration: 1000,
            // });
            this.$message.success("删除成功!");
            this.getdata();
          });
          // this.$router.go(0)
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   duration: 1000
          // });
          this.$message.info("已取消删除!");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.cur = JSON.parse(JSON.stringify(row));
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

      //   // console.log(a);
    },
    //点击重置按钮
    result() {
      // 清空
      this.value = "";
      this.valuee = "";
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

  filters: {},
};
</script>
  
<style lang="scss" scoped>
::v-deep {
  .el-switch__core {
    width: 45px !important;
  }

  //加深当前页面名称颜色
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: black;
  }
}

//swith宽度

//会员管理
.box {
  height: 80px;
  padding-left: 20px;
  padding-top: 20px;
  background-color: #fff;

  .xiangqing {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
  }
}

//等级名称
.box-a {
  line-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  background-color: #fff;

  span {
    width: 100px;
  }

  .a {
    padding-left: 20px;
    display: flex;
    font-size: 15px;
    line-height: 50px;
  }

  .b {
    margin-right: 20px;
  }
}

//表格颜色
.warp {
  background-color: #fff;
  margin-top: 20px;
}

.btn {
  align-items: center;
  margin-left: 50px;
  display: flex;
}

//表格表头
.header {
  display: flex;
  // border: 1px solid red;
}

//会员列表
.boxa {
  width: 80%;
  // border: 1px solid black;
  line-height: 60px;
  font-size: 17px;
  padding-left: 20px;
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  height: 50px;
}
</style>