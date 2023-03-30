<template>
    <!-- 在会员查询点击新增弹出的页面 -->
    <div>
        <el-button type="text" @click="dialogVisible = true">去发货</el-button>
        <el-dialog title="商品发货" :visible.sync="dialogVisible" width="800px">

            <el-form label-position="top" :model="formorder">
                <div>订单编号：{{ formorder.orderid }}</div>
                <div>下单时间：{{ formorder.ordertime | formadate }}</div>
                <div>支付时间：{{ formorder.ordertime | formadate }}</div>
                <div>发货方式：
                    <el-radio v-model="radio" label="1">物流发货</el-radio>
                    <el-radio v-model="radio" label="2">无需物流</el-radio>
                </div>
                <el-form-item label="快递公司">
                    <el-select v-model="formorder.orderexpress" placeholder="请选择快递公司">
                        <el-option label="中通快递" value="中通快递"></el-option>
                        <el-option label="圆通快递" value="圆通快递"></el-option>
                        <el-option label="顺丰快递" value="顺丰快递"></el-option>
                        <el-option label="中国邮政快递" value="中国邮政快递"></el-option>
                        <el-option label="德邦物流" value="德邦物流"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input v-model="formorder.ordernumber"></el-input>
                </el-form-item>
              
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import { editorder } from '@/api/request'

export default {
    props: {
        formorder: Object
    },
    data() {
        return {
            dialogVisible: false,
            radio: '1',

        }
    },
    methods: {
        edit() {
            console.log(this.formorder);
            editorder(this.formorder).then(res => {
                console.log(res);
          
                if (res.data.code = 1) {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，发货成功',
                        type: 'success',
                        duration: 1000
                    });
                    // this.$router.go(0)
                    this.$emit('xiugai', true)
                } else {
                    this.$message({
                        showClose: true,
                        message: '抱歉，发货失败',
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