<template>
    <!-- 在会员查询点击新增弹出的页面 -->
    <div>
        <el-button type="text" @click="dialogVisible = true">配置</el-button>
        <el-dialog title="会员信息修改" :visible.sync="dialogVisible" width="800px">

            <el-form label-position="top" :model="formgrade">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="等级">
                            <el-select v-model="formgrade.grade" placeholder="请选择等级">
                                <el-option label="LV1" value="LV1"></el-option>
                                <el-option label="LV2" value="LV2"></el-option>
                                <el-option label="LV3" value="LV3"></el-option>
                                <el-option label="LV4" value="LV4"></el-option>
                                <el-option label="LV5" value="LV5"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="会员等级">
                            <el-select v-model="formgrade.gradename" placeholder="请选择会员等级">
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
                        <el-form-item label="成长值">
                            <el-input v-model="formgrade.growthvalue"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="升级礼包">
                            <el-select v-model="formgrade.upgrade" placeholder="请选择升级礼包">
                                <el-option label="10元优惠卷" value="10元优惠卷"></el-option>
                                <el-option label="50元优惠卷" value="50元优惠卷"></el-option>
                                <el-option label="100元优惠卷" value="100元优惠卷"></el-option>
                                <el-option label="150元优惠卷" value="150元优惠卷"></el-option>
                                <el-option label="200元优惠卷" value="200元优惠卷"></el-option>
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
import { editgrade } from '@/api/request'
export default {
    props: {
        formgrade: Object
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        edit() {
            console.log(this.formgrade);
            editgrade(this.formgrade).then(res => {
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