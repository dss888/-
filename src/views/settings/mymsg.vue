<template>
    <div>
        <div class="box">
            <Breadcrumb></Breadcrumb>
            <div class="xiangqing">个人信息</div>
        </div>
        <div class="boxa">
            <div class="title_a">个人信息</div>
            <el-form ref="forma" :model="forma" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="forma.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="微信">
                    <el-input v-model="forma.wx" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="forma.tel" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="forma.qq" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="forma.email" placeholder="请输入"></el-input>
                </el-form-item>
               
            </el-form>
        </div>
        <div class="boxa">
            <div class="title_a">负责人信息</div>
            <el-form ref="formb" :model="formb" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="formb.uname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formb.password"  show-password :disabled="true"></el-input>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>
<script>
import Breadcrumb from "@/views/home/adminheader/BreadCrumb.vue";

export default {
    data() {
        return {
            imageUrl: '',
            forma: {
                name: "",
                wx: "",
                tel: "",
                qq: "",
                email: '',
           },
           formb: {
            uname: "16464864643",
            password: "5464646464",
        
           },
        };
    },
    components: { Breadcrumb },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }

};
</script>
  
<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100px;
    line-height: 50px;

    // border: 1px solid black;
    background-color: #fff;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 20px;

    .xiangqing {
        font-size: 20px;
        font-weight: 700;
        margin-top: 10px;
    }
}

.boxa {
   
    margin-top: 20px;
    background-color: #fff;

    .title_a {
        padding-left: 20px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
    }
}

.el-input {
    width: 500px;
}

.el-form {
    display: flex;
    flex-direction: column;
    margin-left: 300px;
    width: 580px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
    border: 1px dashed #d9d9d9;
}

.avatar {
    width: 130px;
    height: 130px;
    display: block;
}

::v-deep {
    .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: black;
    }

    .leftoption {
        padding-right: 20px;
    }
}
</style>