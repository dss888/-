<template>
    <!-- 在会员查询点击新增弹出添加会员的页面 -->
    <div>
        <el-button type="primary" @click="dialogVisible = true">+新建</el-button>
        <el-dialog title="新增会员" :visible.sync="dialogVisible" width="800px">
            <el-form label-position="top" :model="formLabelAlign">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员姓名">
                            <el-input v-model="formLabelAlign.membername"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="付费会员">
                            <el-radio-group v-model="formLabelAlign.membership">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员手机号">
                            <el-input v-model="formLabelAlign.membertel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="会员等级">
                            <el-select v-model="formLabelAlign.grade" placeholder="请选择会员等级">
                                <el-option label="白金会员" value="白金会员"></el-option>
                                <el-option label="黄金会员" value="黄金会员"></el-option>
                                <el-option label="金卡会员" value="金卡会员"></el-option>
                                <el-option label="黑卡会员" value="黑卡会员"></el-option>
                                <el-option label="至尊会员" value="至尊会员"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员积分">
                            <el-input v-model="formLabelAlign.integral"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单次数">
                            <el-input v-model="formLabelAlign.numbertime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="卡内余额">
                            <el-input v-model="formLabelAlign.balance"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单金额">
                            <el-input v-model="formLabelAlign.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="上传头像">
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:5000/upload"
                        :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :headers="headers" v-model="formLabelAlign.image">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addname()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { addmember } from '@/api/request'
export default {
    data() {
        return {
            dialogVisible: false,
            formLabelAlign: {
                membername: '',
                membertel: '',
                grade: '',
                integral: '',
                numbertime: '',
                amount: '',
                membership: '',
                balance: '',
                image: '',
            },
            imageUrl: '',
            headers:{
                Authorization:"Bearer " + localStorage.getItem('token')
            }
        }
    },
    methods: {
        addname() {
            // console.log(this.formLabelAlign);
            this.dialogVisible = false;
            console.log(this.formLabelAlign);
            addmember(this.formLabelAlign).then(res => {
                let { code } = res.data;
                if (code == 1) {
                    this.$message({
                        message: '恭喜你，添加成功',
                        type: 'success',
                    });
                    this.$emit('xinzeng', true)
                    // this.$router.go(0)
                    // location.reload()

                } else {
                    this.$message({
                        message: '抱歉，添加失败',
                        type: 'error'
                    });
                    this.$emit('xinzeng', true)

                }
            })
        },
        handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.formLabelAlign.image = file.response.url
      console.log(file.response.url);
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
}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-input__inner {
        width: 200px;
    }

    .el-dialog__body {
        padding: 0 100px;
    }

    .el-form-item__content {
        //  padding-left: 10px;
        line-height: 10px;
    }

    .el-form-item {
        margin-bottom: 0;
    }

    .el-form-item__label {
        margin-top: 20px;
        line-height: 15px;
    }
    .avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width:100px;
  height: 100px;
  display: block;
}
</style>