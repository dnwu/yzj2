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
export default {
  data() {
    return {
      controlBtn: false,
      time: 60,
      controltime: false,
      controlPass: false,
      phone: "",
      newpass: ""
    };
  },
  methods: {
    validatePhone() {
      console.log("11");
      this.axios
        .post("/app/v1/user/userValidateAccount", {
          phone: this.phone
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 10101) {
            this.$message({
              message: "手机格式错误",
              type: "warning"
            });
          }
          if (data.data.code == 10002) {
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
      this.axios.post("/app/v1/common/sendSms", {
        phone: this.phone,
        smdType: 'findpwd'
      });
    },
    submit() {
      console.log("222");
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
    margin-bottom: 100px;
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
