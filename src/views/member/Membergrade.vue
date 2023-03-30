<template>
  <div>
    <div class="box">
      <Breadcrumb></Breadcrumb>

      <div class="xiangqing">
        会员等级管理
      </div>
    </div>
    <div class="box-a">
      <div class="a">
        <div>等级名称：</div>
        <el-select v-model="valuee" placeholder="请选择会员等级">
            <el-option v-for="item in options" :key="item.valuee" :label="item.label" :value="item.label">
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
      <el-table ref="multipleTable" :data="newlist" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#f9f9f9', color: '#595859', fontWeight: '600' }">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号">
          <template slot-scope="scope">
          {{ scope.$index + (page - 1) * size + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="等级" align="center">
        </el-table-column>
        <el-table-column prop="gradename" label="会员等级" align="center">
        </el-table-column>
        <el-table-column prop="growthvalue" label="成长值" width="100px" align="center">
        </el-table-column>
        <el-table-column prop="gradeequity" label="等级权益" align="center">
        </el-table-column>
        <el-table-column prop="upgrade" label="升级礼包" width="130px" align="center">
        </el-table-column>
        <el-table-column  label="等级状态" align="center">
          <template slot-scope="scope">
            <el-switch
                v-model ="scope.row.status"
                @change="change(scope)"
                active-value="1"
                inactive-value="0"
              >
            </el-switch>
         
        </template>
        </el-table-column>
        <el-table-column prop="editdatetime" label="最后修改时间" width="200px" align="center">
          <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.editdatetime |  formadate }}</span>
      </template>
        </el-table-column>
        <el-table-column width="80px" label="操作" align="center">
          <template slot-scope="scope">
            <!-- 引入组件 -->
            <el-button type="text" @click="edit(scope.$index, scope.row)">
              <Integral :formgrade="cur" @xiugai="shuaxin"></Integral>
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- total总条数 
     page-size 每页显示的条数 
     page-sizes 规定一页显示多少条
      current-change 事件 获取到当前的第几页
      layout="prev 上一页  pager 分页页码  next 下一页  sizes 选择一页显示多少条"
     -->
      <el-pagination background layout="prev, pager, next,sizes,total" :total="countsize" :page-size="size"
        @current-change="getcurrent" :page-sizes="[5, 10, 15, 20, 25]">
      </el-pagination>
    </div>



  </div>
</template>

<script>
import  Breadcrumb  from '@/views/home/adminheader/BreadCrumb.vue';
// import Memberfrom from '@/views/member/membergrade/Memberfrom.vue';
import Integral from '@/views/member/membergrade/Integral.vue';
import { membergrade, selectmembergrade } from '@/api/request';
export default {
  data() {
    return {
      input: '',
      newlist: [],
      list: [],
      multipleSelection: [],
      countsize: 30,
      page: 1,
      size: 10,
      cur: {},
      value:true,
      valuee:'',
      input:'',
      options: [{
        value: '选项1',
        label: '白金会员'
      }, {
        value: '选项2',
        label: '黄金会员'
      }, {
        value: '选项3',
        label: '金卡会员'
      }, {
        value: '选项4',
        label: '黑卡会员'
      }, {
        value: '选项5',
        label: '至尊会员'
      }],
    }
  },
  components: { Integral ,Breadcrumb},
  mounted() {
    this.init()
  },
  filters:{
  
    
  },
  methods: {
    init() {
      this.getdata()
    },
    change(row){
      // console.log(index);
      console.log(row);
  
    //  this.value = !this.value
    //  row.status = this.value
    },
    //获取所有数据
    getdata() {
      // 1、获取所有数据不需要参数
      membergrade().then(res => {
        // console.log(res);
        let { code, list } = res.data
        if (code === 0) {
          this.list = list.info
          this.countsize = list.count

          this.newlist = this.list.slice((this.page - 1) * this.size, this.page * this.size)
        }
      })
    },
    //查询按钮
    selectgradeamount() {
     
      console.log(this.valuee)
      //查询当前选择的内容
      selectmembergrade({ gradename: this.valuee }).then(res => {

        if (res.data.list !== undefined) {
          if (res.data.list.length > 0) {
            // console.log(res.data.list);
            this.newlist = res.data.list
          } else {
            this.newlist = []
          }
        } else {
          this.newlist = []
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //获取当前插入的信息内容
    recharge(index, row) {
      // console.log(index, row);
      //使用深拷贝，防止修改的时候使用一个数据
      this.cur = JSON.parse(JSON.stringify(row))
      // console.log(this.cur);

    },
    //获取当前修改的信息内容
    edit(index, row) {
      // console.log(index,row);
      //使用深拷贝，防止修改的时候使用一个数据
      this.cur = JSON.parse(JSON.stringify(row))

    },

    //2、获取当前点击分页的页数
    getcurrent(a) {
      this.page = a;
      // this.getdata();
      //  console.log(this.page);
      //  console.log(this.list);
      // 3、主要理解这代码
      this.newlist = this.list.slice((this.page - 1) * this.size, this.page * this.size)
      //  console.log(this.newlist);
      this.value = '';
      this.valuee = '';

      //   // console.log(a);
    },
    //点击重置按钮
    result() {
      // 清空
      this.value = ''
      this.valuee = ''
      // 回归第一页，size不需要动
      // 理解：size是用户根据自己的喜好设置的，一般不会代码里去改他的size
      this.page = 1
      // 查询数据
      // this.getdata()
      this.newlist = this.list.slice((this.page - 1) * this.size, this.page * this.size)
    },
    shuaxin() {
      this.getdata()
    },

  },
  filters: {
      change(val) {
        console.log(val);
        let result;
        if (val == 0) result = false
        if (val == 1) result = true
        return result
      }
    },


}
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