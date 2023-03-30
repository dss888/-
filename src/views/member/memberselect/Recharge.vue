<template>
    <!-- 在会员查询点击新增弹出的页面 -->
    <div>
        
        <el-button   type="text" @click="dialogVisible = true">充值</el-button>
        <el-dialog title="储值卡充值" :visible.sync="dialogVisible" width="400px">
            <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                <el-form-item label="当前余额">
                    <el-input v-model="formLabelAlign.balance" ></el-input>
                </el-form-item>
                <el-form-item label="充值余额">
                    <el-input v-model="num"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="recharge()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import {upmember} from '@/api/request'
export default {
    props: {
        formLabelAlign: Object
    },
    data() {
        return {
            dialogVisible: false,
          num:'',
    
        }
    },
    methods: {
        recharge(){
            this.dialogVisible = false;
            console.log(this.formLabelAlign.balance);
            this.formLabelAlign.balance  = +this.formLabelAlign.balance + +this.num;
            upmember(this.formLabelAlign).then(res=>{
              if(res.data.code == 1){
                this.$message({
                        message: '恭喜你，修改成功',
                        type: 'success',
                    });
                // this.$router.go(0)
                this.$emit('chongzhi',true)

              }else{
                this.$message({
                        message: '抱歉，修改失败',
                        type: 'error'
                    });
            // this.$router.go(0)
            this.$emit('chongzhi',true)


              }  
            
        })

        }
    },
    created(){
    //    
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