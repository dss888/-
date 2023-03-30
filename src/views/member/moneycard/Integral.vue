<template>
    <!-- 在会员查询点击新增弹出的页面 -->
    <div>
        <el-button type="text" @click="dialogVisible = true">编辑</el-button>
        <el-dialog title="会员信息修改" :visible.sync="dialogVisible" width="800px">

            <el-form label-position="top" :model="formcard">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="卡名称">
                            <el-select v-model="formcard.cardname" placeholder="请选择卡名称">
                                <el-option label="LV1省钱卡" value="LV1省钱卡"></el-option>
                                <el-option label="LV2省钱卡" value="LV2省钱卡"></el-option>
                                <el-option label="LV3省钱卡" value="LV3省钱卡"></el-option>
                                <el-option label="LV4省钱卡" value="LV4省钱卡"></el-option>
                                <el-option label="LV5省钱卡" value="LV5省钱卡"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="卡售价（元）">
                            <el-select v-model="formcard.cardprice" placeholder="请选择卡售价">
                                <el-option label="58" value="58"></el-option>
                                <el-option label="48" value="48"></el-option>
                                <el-option label="38" value="38"></el-option>
                                <el-option label="28" value="28"></el-option>
                                <el-option label="18" value="18"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="续费价">
                            <el-select v-model="formcard.renewal" placeholder="请选择续费价">
                                <el-option label="25" value="25"></el-option>
                                <el-option label="20" value="20"></el-option>
                                <el-option label="15" value="15"></el-option>
                                <el-option label="10" value="10"></el-option>
                                <el-option label="5" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="等级权益">
                            <el-select v-model="formcard.gradeequity" placeholder="请选择等级权益礼包">
                                <el-option label="每日最多可领1张优惠卷" value="每日最多可领1张优惠卷"></el-option>
                                <el-option label="每日最多可领2张优惠卷" value="每日最多可领2张优惠卷"></el-option>
                                <el-option label="每日最多可领3张优惠卷" value="每日最多可领3张优惠卷"></el-option>
                                <el-option label="每日最多可领4张优惠卷" value="每日最多可领4张优惠卷"></el-option>
                                <el-option label="每日最多可领5张优惠卷" value="每日最多可领5张优惠卷"></el-option>
                            </el-select>
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
import { editcard } from '@/api/request'
export default {
    props: {
        formcard: Object
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        edit() {
            console.log(this.formcard);
            editcard(this.formcard).then(res => {
                console.log(res);
                if (res.data.code = 1) {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，修改成功',
                        type: 'success',
                        duration: 1000
                    });
                    // this.$router.go(0)
                    this.$emit('xiugai', true)
                } else {
                    this.$message({
                        showClose: true,
                        message: '抱歉，修改失败',
                        type: 'error',
                        duration: 1000
                    });
                    // this.$router.go(0)
                    this.$emit('xiugai', true)

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