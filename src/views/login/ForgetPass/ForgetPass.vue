<template>
<div class="forget-pass">
  <div class="step1">
    <div class="key">输入手机号</div>
    <div class="phone"><el-input v-model="phone" auto-complete="off"></el-input></div>
    <div class="code"><el-button size="mini" :disabled='controlBtn' @click="validatePhone" type="warning">发送验证码</el-button></div>
    <div class="time" v-show="controltime">({{time}}s)</div>
  </div>
  <template v-if="controlPass">
    <div class="step2">
      <div class="key">输入验证码</div>
      <div class="newpass"><el-input v-model="code" type="password" auto-complete="off"></el-input></div>
    </div>
    <div class="step2">
      <div class="key">输入新密码</div>
      <div class="newpass"><el-input v-model="newpass" type="password" auto-complete="off"></el-input></div>
    </div>
    <div class="step3">
      <el-button type="success" @click="submit">确定</el-button>
    </div>
  </template>
</div>
</template>
<script>
import getmd5 from "@/api/getmd5";
import { logout } from "@/tools/logout";
export default {
  mixins: [logout],
  data() {
    return {
      controlBtn: false,
      time: 60,
      controltime: false,
      controlPass: false,
      phone: "",
      newpass: "",
      code:''
    };
  },
  methods: {
    validatePhone() {
      this.axios
        .post("/app/v1/user/userValidateAccount", {
          phone: this.phone
        })
        .then(data => {
          if (data.data.code == 10101) {
            this.$message({
              message: "手机格式错误",
              type: "warning"
            });
          }
          if (data.data.code == 10002) {
            this.controlBtn = true;
            this.controltime = true;
            this.sendcode();
            this.controlPass = true;
          }
          if (data.data.code == 1) {
            this.$message({
              message: "手机号不存在",
              type: "warning"
            });
          }
        });
    },
    sendcode() {
      this.timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.controlBtn = false;
          this.controltime = false;
          this.time = 60;
        }
      }, 1000);
      this.axios
        .post("/app/v1/common/sendSms", {
          phone: this.phone,
          smdType: "findpwd"
        })
        .then(data => {});
    },
    submit() {
      if(this.code == ''){
        this.$message({
          message: "验证码不能为空",
          type: "warning"
        });
        return
      }
      if(this.newpass == ''){
        this.$message({
          message: "请输入新密码",
          type: "warning"
        });
        return
      }
      this.axios.post("/app/v1/user/userFindPassword", {
        newPassword: getmd5(this.newpass),
        phone: this.phone,
        smsCode: this.code
      }).then(data=>{
        console.log(data);
        if(data.data.code ==10103){
          this.$message({
            message: "验证码错误",
            type: "warning"
          });
        }
        if(data.data.code ==1 ){
          this.$message({
            message: "密码修改成功，请重新登录",
            type: "success"
          });
          setTimeout(()=>{
            this.logout()
          },2000)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.forget-pass {
  margin-left: 0px;
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 100px;
  .step1 {
    display: flex;
    margin-bottom: 60px;
    .key {
      line-height: 40px;
      margin-right: 10px;
    }
    .code {
      margin-left: 50px;
      margin-top: 5px;
    }
    .time {
      margin-left: 50px;
      line-height: 40px;
      color: #67c23a;
    }
  }
  .step2 {
    display: flex;
    margin: 10px 0;
    .key {
      line-height: 40px;
      margin-right: 10px;
    }
  }
  .step3 {
    button {
      margin: 40px 0 0 120px;
    }
  }
}
</style>
