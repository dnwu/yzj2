<template>
  <div class="change_password">
    <el-form :model="resetPasswordData" status-icon :rules="resetPassword" ref="resetPassword" label-width="100px" class="demo-ruleForm">
      <el-form-item label="当前密码" prop="old_password">
        <el-input type="password" v-model="resetPasswordData.old_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password1">
        <el-input type="password" v-model="resetPasswordData.new_password1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="new_password2">
        <el-input type="password" v-model="resetPasswordData.new_password2" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <p><span>当前密码:</span><el-input placeholder="请输入当前密码"></el-input></p>
    <p><span>新密码:</span><el-input placeholder="请输入新密码"></el-input></p>
    <p><span>确认新密码:</span><el-input placeholder="请确认新密码"></el-input></p>
    <el-button type="primary" @click="submit">确认</el-button>
    <el-button @click="cancle">取消</el-button> -->
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import getmd5 from '@/api/getmd5'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.resetPasswordData.new_password1 !== '') {
          this.$refs.resetPassword.validateField('new_password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPasswordData.new_password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      resetPasswordData:{
        old_password: null,
        new_password1: null,
        new_password2: null
      },
      resetPassword: {
        new_password1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations({
      'setUsertype':'SET_USERTYPE',
      'setToken':'SET_TOKEN',
      'setUsername':'SET_USERNAME',
      'setId':'SET_ID'
    }),
    submit() {
      this.axios.post("/app/v1/user/userModifyPassword", {
        id: this.id,
        newPassword: getmd5(this.resetPasswordData.new_password1),
        oldPassword: getmd5(this.resetPasswordData.old_password),
        token: this.token
      }).then(data=>{
        console.log(data);
        if(data.data.code == 10104){
          this.$message.error("密码格式错误,修改失败");
        }
        if(data.data.code == 10108){
          this.$message.error("密码错误");
        }
        if(data.data.code == 1){
          this.$message({
            message: '恭喜你，密码修改成功,请重新登录',
            type: 'success'
          });
          setTimeout(() => {
            this.$cookie.delete('username')
            this.setUsername('')
            this.setUsertype('')
            this.setToken('')
            this.setId('')
            this.$router.push('/login')
          }, 3000);
        }
      });
    },
    cancle() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token'
    ])
  }
};
</script>
<style lang="scss">
.change_password {
  width: 400px;
  margin: 160px auto;
  .el-input {
    margin: 10px 0;
  }
}
</style>
