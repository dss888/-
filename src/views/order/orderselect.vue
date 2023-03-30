<template>
  <div>
    <div v-if="ishow">
      <div class="box">
        <Breadcrumb></Breadcrumb>
        <div class="xiangqing">订单查询</div>
        <div class="hrr"></div>
      </div>
      <div class="yetou">
        <div class="ab">
          <div class="a">
            <div>订单类型</div>
            <el-select v-model="value" placeholder="请订单类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <div class="b">
            <div>订单状态</div>
            <el-select v-model="valuee" placeholder="请选择订单状态">
              <el-option
                v-for="item in optionss"
                :key="item.valuee"
                :label="item.labell"
                :value="item.labell"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="cd">
          <div>
            <el-button plain class="f" @click="selectgradeamount()"
              >查询</el-button
            >
            <el-button plain @click="result()">重置</el-button>
          </div>
        </div>
      </div>
      <div class="warp">
        <div class="header">
          <div class="boxa">订单列表</div>
          <div class="btn">
            <el-button size="medium">批量操作</el-button>
          </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="first">
            <el-table :data="newlist" style="width: 100%; font-size: 11px">
              <el-table-column label="商品信息" width="300" >
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      订单编号：{{ scope.row.orderid }}
                    </div>
                    <div>
                      {{ scope.row.orderpage }}&nbsp;{{ scope.row.ordercolor }}
                      <div style="display: flex">
                        <div>单价：{{ scope.row.orderprice }}</div>
                        <div>数量：{{ scope.row.ordernum }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="会员信息" width="240">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      下单时间：{{ scope.row.ordertime | formadate }}
                    </div>
                    <div>
                      <div>{{ scope.row.ordername }}</div>
                      <div>{{ scope.row.ordertel }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单来源" width="150">
                <template>
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      微信支付
                    </div>
                    <div style="line-height: 46px">微信商城</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发货方式" width="120">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    ></div>
                    <div style="line-height: 46px">
                      {{ scope.row.orderexpress }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="100">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    ></div>
                    <div style="line-height: 46px">
                      {{ scope.row.orderstatus }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      共{{ scope.row.ordernum }}件,合计：{{
                        scope.row.orderprice
                      }}元
                    </div>
                    <div style="line-height: 46px">
                      <el-link
                        type="primary"
                        @click="edit(scope.$index, scope.row)"
                        :underline="false"
                      >
                        <Integral :formorder="cur" @xiugai="shuaxin"></Integral>
                      </el-link>
                      <el-link
                        style="margin-left: 20px"
                        type="primary"
                        @click="ishow = false"
                        :underline="false"
                        >订单详情
                      </el-link>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="second">
            <el-table :data="moneylist" style="width: 100%; font-size: 11px">
              <el-table-column label="商品信息" width="350">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      订单编号：{{ scope.row.orderid }}
                    </div>
                    <div>
                      {{ scope.row.orderpage }}&nbsp;{{ scope.row.ordercolor }}
                      <div style="display: flex">
                        <div>单价：{{ scope.row.orderprice }}</div>
                        <div>数量：{{ scope.row.ordernum }}</div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="会员信息" width="240">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      下单时间：{{ scope.row.ordertime | formadate }}
                    </div>
                    <div>
                      <div>{{ scope.row.ordername }}</div>
                      <div>{{ scope.row.ordertel }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单来源" width="150">
                <template>
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      微信支付
                    </div>
                    <div style="line-height: 46px">微信商城</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发货方式" width="150">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    ></div>
                    <div style="line-height: 46px">
                      {{ scope.row.orderexpress }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="150">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    ></div>
                    <div style="line-height: 46px">
                      {{ scope.row.orderstatus }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      flex-direction: column;
                    "
                  >
                    <div
                      style="
                        height: 50px;
                        line-height: 50px;
                        background-color: rgb(240, 242, 245);
                      "
                    >
                      共{{ scope.row.ordernum }}件,合计：{{
                        scope.row.orderprice
                      }}元
                    </div>
                    <div style="line-height: 46px">
                      <el-link
                        type="primary"
                        @click="edit(scope.$index, scope.row)"
                        :underline="false"
                      >
                        <Integral :formorder="cur" @xiugai="shuaxin"></Integral>
                      </el-link>
                      <el-link
                        style="margin-left: 20px"
                        type="primary"
                        @click="ishow = false"
                        :underline="false"
                        >订单详情
                      </el-link>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="代发货" name="third">代发货</el-tab-pane>
          <el-tab-pane label="已发货" name="fourth">已发货</el-tab-pane>
          <el-tab-pane label="已完成" name="fifth">已完成</el-tab-pane>
          <el-tab-pane label="已关闭" name="sixth">已关闭</el-tab-pane>
          <el-tab-pane label="售后中" name="seventh">售后中</el-tab-pane>
        </el-tabs>

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
    <div class="boxaa aaa" v-if="!ishow">
      <el-breadcrumb separator="/" style="padding-left: 20px">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单查询</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="xiangqing">订单详情</div>

      <div style="background-color: #fff; height: 200px; margin-top: 50px">
        <div style="display: flex">
          <div style="margin-right: 10px; margin-left: 20px">等待商家发货</div>
            <Integral :formorder="cur" @xiugai="shuaxin"></Integral>
           
        </div>

        <el-steps :active="2" align-center>
          <el-step title="买家下单" description="2020.09.10 10:12"></el-step>
          <el-step title="卖家发货"></el-step>
          <el-step title="买家收货"></el-step>
          <el-step title="买家评论"></el-step>
        </el-steps>
      </div>

      <div class="bbb">
        <el-descriptions
          title="基础资料"
          style="padding-left: 20px"
          :column="3"
        >
          <el-descriptions-item label="会员姓名">吴丽丽</el-descriptions-item>
          <el-descriptions-item label="会员手机号"
            >18888888888</el-descriptions-item
          >
          <el-descriptions-item label="会员卡号"
            >18888888888</el-descriptions-item
          >
          <el-descriptions-item label="会员性别">女</el-descriptions-item>
          <el-descriptions-item label="会员年龄">23</el-descriptions-item>
          <el-descriptions-item label="微信昵称">小丸子</el-descriptions-item>
          <el-descriptions-item label="常用收货人">吴丽丽</el-descriptions-item>
          <el-descriptions-item label="详细地址" :span="2"
            >浙江省杭州市西湖区工专路</el-descriptions-item
          >
          <el-descriptions-item label="来源方式">微信商城</el-descriptions-item>
          <el-descriptions-item label="成为会员时间"
            >2019-09-09 10:40</el-descriptions-item
          >
          <el-descriptions-item label="最近登录时间"
            >2019-09-09 10:40</el-descriptions-item
          >
          <el-descriptions-item label="会员备注">无</el-descriptions-item>
        </el-descriptions>
      </div>
      <el-button plain  @click="ishow = true"
              >返回</el-button
            >
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";
import Integral from "@/views/order/Integral.vue";

import { orderselect, selectstatus, paymentmoney } from "@/api/request";

export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "普通订单",
        },
        {
          value: "选项2",
          label: "代付订单",
        },
        {
          value: "选项3",
          label: "拼团订单",
        },
        {
          value: "选项4",
          label: "积分兑订单",
        },
      ],
      optionss: [
        {
          valuee: "选项1",
          labell: "待付款",
        },
        {
          valuee: "选项2",
          labell: "待发货",
        },
        {
          valuee: "选项3",
          labell: "已发货",
        },
        {
          valuee: "选项4",
          labell: "已完成",
        },
        {
          valuee: "选项5",
          labell: "已关闭",
        },
        {
          valuee: "选项6",
          labell: "售后中",
        },
      ],
      value: "",
      valuee: "",
      list: [],
      newlist: [],
      multipleSelection: [],
      cur: {},
      countsize: 30,
      page: 1,
      size: 10,
      activeName: "first",
      ishow: true,
      moneylist: [],
    };
  },
  components: { Breadcrumb, Integral },

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
      orderselect().then((res) => {
        console.log(res);
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
    edit(index, row) {
      // console.log(index,row);
      //使用深拷贝，防止修改的时候使用一个数据
      //
      this.cur = JSON.parse(JSON.stringify(row));
    },
    //查询按钮
    selectgradeamount() {
      // console.log(this.value)
      console.log(this.valuee);
      //查询当前选择的内容
      selectstatus({ orderstatus: this.valuee }).then((res) => {
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
    payment() {
      console.log(111);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "second") {
        this.second();
      }
    },
    second() {
      paymentmoney().then((res) => {
        console.log(res);
        if (res.data.list !== undefined) {
          if (res.data.list.length > 0) {
            // console.log(res.data.list);
            this.moneylist = res.data.list;
          } else {
            this.moneylist = [];
          }
        } else {
          this.moneylist = [];
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    details() {
      this.ishow = true;
    },
    //获取当前插入的信息内容
    recharge(index, row) {
      // console.log(index, row);
      //使用深拷贝，防止修改的时候使用一个数据
      this.cur = JSON.parse(JSON.stringify(row));
      // console.log(this.cur);
    },
    //获取当前修改的信息内容
    //2、获取当前点击分页的页数
    getcurrent(a) {
      this.page = a;
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
    //点击重置按钮
    result() {
      // 清空
      this.value = "";
      this.valuee = "";
      // 回归第一页，size不需要动
      // 理解：size是用户根据自己的喜好设置的，一般不会代码里去改他的size
      this.page = 1;
      // 查询数据
      this.newlist = this.list.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
    },
    shuaxin() {
      this.getdata();
    },
  },
};
</script>

<style lang="scss" scoped>

::v-deep {
  .el-tabs__nav-wrap {
    padding-left: 20px;
  }

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 0;
  }

  .el-table th.el-table__cell > .cell {
    padding-left: 20px;
    color: #0c0c0c;
    font-weight: 400;
    font-size: 17px;
  }

  .el-table .cell {
    padding-left: 0;
    padding-right: 0;
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: black;
  }
}

.box {
  height: 80px;
  padding-left: 20px;
  padding-top: 20px;
  background-color: #fff;

  .xiangqing {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 10px;
  }

  .hrr {
    height: 1px;
    background-color: rgba(146, 143, 143, 0.3);
  }
}

//等级名称
.yetou {
  background-color: #fff;
}

.ab {
  display: flex;
  justify-content: space-around;
}

.cd {
  height: 50px;
  display: flex;
  margin-top: 10px;
  margin-right: 100px;
  justify-content: flex-end;
}

.a,
.b {
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 15px;

  div {
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

.boxaa {
  width: 100%;
  height: 200px;
  line-height: 50px;

  // border: 1px solid black;
  background-color: #fff;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 20px;
}

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