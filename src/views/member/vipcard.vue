<template>
    <div class="HeaderBox">
        <!-- 面包屑导航 -->
        <div class="box">
        <Breadcrumb></Breadcrumb>
        <div class="xiangqing">
        省钱卡
        </div>
      </div>
        <div class="FenGeKuan"></div>
        <main>
            <div class="just" v-if="ishow">
                <div class="left" style="opacity: 1;">
                    <p>会员卡名称
                        <span>{{cardname}}</span>
                    </p>
                    <p>背景色
                        <span><el-color-picker disabled v-model="color" show-alpha size="small">
                            </el-color-picker></span>
                    </p>
                    <p>开卡条件
                        <span>{{fufei}}元</span>
                    </p>
                    <p>有效期
                        <span>{{ youxiaoqi }}</span>
                    </p>
                    <p>续卡提醒
                        <span>{{xukatixing}}</span>
                    </p>
                    <p>会员权益
                        <span> 成长加速 </span><br>
                        <span style="margin-left: 78px;">{{ vipquanyi[1] }}</span><br>
                        <span style="margin-left: 78px; ">{{ vipquanyi[2] }}</span><br>
                        <span style="margin-left: 78px; ">{{ vipquanyi[3] }}</span><br>
                    </p><br>
                    <el-button class="button" type="text" size="small " @click="ishow = false">编辑会员卡信息</el-button>
                </div>
                <div class="right">
                    <el-col :span="8">
                        <el-card shadow="hover" class="box" :style="{ backgroundColor: this.color }">
                            <div>
                                <span :style="{ color: this.color }"
                                    style="width: 40px; height: 40px; text-align: center;line-height: 40px;background-color: #fff;border-radius: 2px;font-size: 18px;">VIP</span>
                                &nbsp;
                                <span style="font-size: 20px; font-weight: 700; color: #fff;">超级会员</span>
                            </div>
                            <br>
                            <br>
                            <div><span style="color: #fff;">有效期至：{{ nian }}年{{ yue }}月{{ ri }}号到期</span></div>
                            <br>
                            <div style="color: #fff;"><span>预计为您节省：<span style="font-size: 22px;">888</span>元/年</span></div>

                        </el-card>
                        <br>
                        <div style="text-align: center; width: 350px; opacity: .5;">会员卡预览</div>
                    </el-col>
                </div>
            </div>
            <div class="just" v-if=!ishow>
                <div class="left" style="opacity: 1;">
                    <p>会员卡名称
                        <span><el-input v-model="cardname" style="width: 200px;" size="small"></el-input></span>
                    </p>
                    <p>背景色
                        <span><el-color-picker v-model="color" show-alpha size="small">
                            </el-color-picker></span>
                    </p>
                    <div style="margin-left: 20px;">开卡条件
                        <p> <span><el-checkbox v-model="checked.fufei">付费</el-checkbox></span><span><el-input
                                    style="width: 200px;" size="small" placeholder="请输入" v-model="fufei">
                                    <template slot="append">元</template>
                                </el-input></span></p>
                        <p> <span><el-checkbox v-model="checked.chongzhi">充值</el-checkbox></span><span><el-input
                                    style="width: 200px;" size="small" placeholder="请输入" v-model="chongzhi">
                                    <template slot="append">元</template>
                                </el-input></span></p>
                    </div>
                    <div style="margin-left: 20px;">有效日期
                        <span><el-radio v-model="radio" label="1">永久有效</el-radio></span>
                        <br><br>
                        <span style="display: flex; margin-left: 69px;">
                            <span>
                                <el-radio v-model="radio" label="2">自获得之日起</el-radio>
                            </span>
                            <span style="margin-top: -5px;margin-left: 5px;">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-select size="small" style="width: 150px;" v-model="form.region"
                                        placeholder="请选择有效期">
                                        <el-option label="今天" value="1"></el-option>
                                        <el-option label="最近15天" value="2"></el-option>
                                        <el-option label="最近30天" value="3"></el-option>
                                        <el-option label="最近45天" value="4"></el-option>
                                        <el-option label="最近90天" value="5"></el-option>
                                    </el-select><span style="margin-left: 5px;opacity: .7;">有效</span>
                                </el-form>
                            </span>

                        </span>
                    </div>
                    <br>
                    <div style="margin-left: 20px;">续卡提醒
                        <span><el-radio v-model="radio2" label="1">不提醒</el-radio></span>
                        <br><br>
                        <span style="display: flex; margin-left: 69px;">
                            <span>
                                <el-radio v-model="radio2" label="2">距离到期前</el-radio>
                            </span>
                            <span style="margin-top: -5px;margin-left:20px;">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-select size="small" style="width: 150px;" v-model="form.region2"
                                        placeholder="请选择有效期">
                                        <el-option label="今天" value="1"></el-option>
                                        <el-option label="最近15天" value="2"></el-option>
                                        <el-option label="最近30天" value="3"></el-option>
                                        <el-option label="最近45天" value="4"></el-option>
                                        <el-option label="最近90天" value="5"></el-option>
                                    </el-select><span style="margin-left: 5px;opacity: .7;">提醒</span>
                                </el-form>
                            </span>

                        </span>
                    </div>
                    <p>会员权益
                        <span> <el-checkbox v-model="checked.Vip1"></el-checkbox>&nbsp;&nbsp;成长加速
                        </span><br>
                        <span style="margin-left: 78px;">
                            <el-checkbox v-model="checked.Vip2"></el-checkbox>&nbsp;&nbsp;商品折扣</span><br>
                        <span style="margin-left: 78px; ">
                            <el-checkbox v-model="checked.Vip3"></el-checkbox>&nbsp;&nbsp;积分翻倍</span><br>
                        <span style="margin-left: 78px; ">
                            <el-checkbox v-model="checked.Vip4"></el-checkbox>&nbsp;&nbsp;送优惠券</span><br>
                        <span style="margin-left: 78px; ">
                            <el-button type="text" style="font-size: 16px;">配置会员权益</el-button>
                        </span><br>
                    </p><br><br>
                    <div>
                        <el-button class="button" type="text" size="small " style="width: 60px;" @click="adddata">提交</el-button>
                        <el-button size="small " style="width: 60px;" @click="ishow = true">返回</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-col :span="8">
                        <el-card shadow="hover" class="box" :style="{ backgroundColor: this.color }">
                            <div>
                                <span :style="{ color: this.color }" style="width: 40px; height: 40px; text-align: center;
                                            line-height: 40px;
                                            background-color: #fff;border-radius: 2px;font-size: 18px;">VIP</span>
                                &nbsp;
                                <span style="font-size: 20px; font-weight: 700; color: #fff;">超级会员</span>
                            </div>
                            <br>
                            <br>
                            <div><span style="color: #fff;">有效期至：{{ nian }}年{{ yue }}月{{ ri }}号到期</span></div>
                            <br>
                            <div style="color: #fff;"><span>预计为您节省：<span style="font-size: 22px;">888</span>元/年</span></div>

                        </el-card>
                        <br>
                        <div style="text-align: center; width: 350px; opacity: .5;">会员卡预览</div>
                    </el-col>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
 import  Breadcrumb  from '@/views/home/adminheader/BreadCrumb.vue';
export default {
    data() {
        return {
            color: 'rgba(255, 174, 0, 1)',
            cardname: '超级会员',
            fufei: '1200',
            chongzhi: '',
            youxiaoqi:'永久有效',
            xukatixing: '不提醒',
            radio: '1',
            radio2:'1',
            region: '',
            region2: '',
            vipquanyi:[],
            date: '',
            nian: '',
            yue: '',
            ri: '',
            ishow: true,
            form: {
                region: '',

            },
            checked:{
                fufei:false,
                chongzhi:false,
                Vip1:false,
                Vip2:false,
                Vip3:false,
                Vip4:false,
            }
        }
    },
    mounted() {

    },
    created() {
        let date = new Date();
        this.nian = date.getFullYear() + 1
        this.yue = date.getMonth() + 1
        this.ri = date.getDate()
    },
    methods: {
        adddata(){
            // 会员卡名字
            this.cardname = this.cardname;
            // 开卡条件
            if(this.checked.fufei === true || this.checked.chongzhi  === true){
                this.fufei =  this.fufei
                // console.log(this.checked.fufei);
            } 
            // 有效期
            if(this.radio == 1){
                this.youxiaoqi = '永久有效'
            }else{
                if(this.form.region == 1)this.youxiaoqi = '自获得之日起今天有效'
                if(this.form.region == 2)this.youxiaoqi = '自获得之日起最近15天有效'
                if(this.form.region == 3)this.youxiaoqi = '自获得之日起最近30天有效'
                if(this.form.region == 4)this.youxiaoqi = '自获得之日起最近45天有效'
                if(this.form.region == 5)this.youxiaoqi = '自获得之日起最近90天有效'   
            }
            // 续卡提醒
            if(this.radio2 == 1){
                this.xukatixing = '不提醒'
            }else{
                if(this.form.region == 1)this.xukatixing = '距离到期前7天有效'
                if(this.form.region == 2)this.xukatixing = '距离到期前最近15天有效'
                if(this.form.region == 3)this.xukatixing = '距离到期前最近30天有效'
                if(this.form.region == 4)this.xukatixing = '距离到期前最近45天有效'
                if(this.form.region == 5)this.xukatixing = '距离到期前最近90天有效'   
            }
            // 会员权益
                if(this.checked.Vip1) this.vipquanyi.push('成长加速')
                if(this.checked.Vip2) this.vipquanyi.push('商品折扣')
                if(this.checked.Vip3) this.vipquanyi.push('积分翻倍')
                if(this.checked.Vip4) this.vipquanyi.push('送优惠券')
                setTimeout(() =>{
                    this.ishow = true
                    this.$message.success('提交成功')
                },1000)            
        }
    },
    components: {
        Breadcrumb
    }

};
</script>

<style lang="scss" scoped>
::v-deep {
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
    }
  }
.HeaderBox {
 

    .FenGeKuan {
        background-color: #f0f2f5;
        margin: 0 auto;
        height: 20px;
    }

    main {
      
        background-color: #fff;
        .just {
            display: flex;

            .left {
                flex: 6;
                padding: 30px;

                p {
                    margin: 20px;
                    height: 30px;
                    line-height: 30px;

                    span {
                        margin-left: 10px;
                        color: #7d7c7c;
                    }
                }

                .button {
                    background-color: #1890ff;
                    color: #fff;
                    margin-left: 98px;
                    margin-top: 80px;
                }
            }

            .right {
                padding: 30px;
                flex: 5;

                .box {
                    width: 350px;
                    height: 200px;
                    border-radius: 20px;
                }
            }
        }
    }


}
</style>

