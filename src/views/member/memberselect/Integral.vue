<template>
    <!-- 在会员查询点击新增弹出的页面 -->
    <div>
        <el-button type="text" @click="dialogVisible = true">修改</el-button>
        <el-dialog title="会员信息修改" :visible.sync="dialogVisible" width="800px">

            <el-form label-position="top" :model="formLabelAlign">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员姓名">
                            <el-input v-model="formLabelAlign.membername"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="会员手机号">
                            <el-input v-model="formLabelAlign.membertel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="付费会员">
                            <el-radio-group v-model="formLabelAlign.membership">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
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
                        <el-form-item label="下单金额">
                            <el-input v-model="formLabelAlign.amount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="卡内余额">
                            <el-input v-model="formLabelAlign.balance"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import { editmember } from '@/api/request'
export default {
    props: {
        formLabelAlign: Object
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        edit() {
            editmember(this.formLabelAlign).then(res => {
                if (res.data.code = 1) {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，修改成功',
                        type: 'success',
                        duration: 1000
                    });
                    // this.$router.go(0)
                    this.$emit('xiugai',true)
                } else {
                    this.$message({
                        showClose: true,
                        message: '抱歉，修改失败',
                        type: 'error',
                        duration: 1000
                    });
                    // this.$router.go(0)
                    this.$emit('xiugai',true)

                }
            })

            this.dialogVisible = false;
        }
    },
    watch: {

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

        line-height: 10px;
    }

    .el-form-item {
        height: 30%;
        margin-bottom: 0;
    }

    .el-form-item__label {
        margin-top: 20px;
        line-height: 15px;
    }


}
</style>