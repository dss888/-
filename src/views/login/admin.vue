<template>
    <div class="warp">
        <div class="content">

            <div class="title">柒尾会员管理系统</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm page">
                <el-form-item label="用户名:" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
// import { asyncroutes} from '@/router/index'
import { userLogin } from "@/api/request.js"
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                //输入框输入的内容正则校验
                if (/^\w{3,8}$/.test(value)) {
                    callback()

                };
                callback(new Error("请输入3-6位的数字、字母、下划线"));
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                //输入框输入的内容正则校验
                if (/^\w{3,8}$/.test(value)) {
                    callback();

                }
                callback(new Error("请输入3-6位的数字、字母、下划线"));
            }
        };
        return {
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [{ validator: validatePass, trigger: "blur" }],
                password: [{ validator: validatePass2, trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //获取当前输入框输入的值
                    //   console.log(this.ruleForm);
                    //获取从服务器post请求到的数据信息
                    let res = await userLogin(this.ruleForm)
                    console.log(res);
                    //获取到res下的code和token信息，并进行判断
                    let { code, token,navdata } = res.data;
                    if (code == 200) {
                        //存储token信息
                        localStorage.setItem('token', token)
                        // localStorage.setItem('navdata', JSON.stringify(navdata))
                        // this.$store.commit('getnavdata',navdata)
                        //登陆正确就提示信息
                        this.$message({
                            message: '登录成功，欢迎您！',
                            type: 'success'
                        });
                        // asyncroutes()
                        //路由鉴权完成以后跳转到首页
                        this.$router.push('/home')
                    } else {
                        //登陆错误就提示错误信息
                        this.$message.error('登陆失败，请输入正确的用户名或密码！');
                        //输入框输入内容输入错误就清空输入框
                        this.$refs[formName].resetFields();

                    }

                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style scoped lang="scss">
body,
html,
#app {

    height: 100%;
}

.warp {
    // width: 100%;
    // height: 100%;
    width: 100vw;
    height: 100vh;
    background-color: cadetblue;
    background-image: url('@/assets/img/loginbeijing.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.title {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-bottom: 10px;
    color: midnightblue;
    font-weight: 700;
    font-size: 23px;

}

.content {

    width: 380px;
    height: 260px;
    position: absolute;
    top: calc(50% - 140px);
    right: 40px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);

    .page {
        position: absolute;
    }

    .btn {
        margin-left: 30px;

    }
}</style>