<template>
<div class="login">
  <div class="form">
    <div class="login-head">
      <img src="../../../assets/login_img.png" alt="">
    </div>
    <div class="login-body">
      <el-row>
        <el-col :span="12">
          <div class="button personal" :class="type == 'personal'?'active':''" @click="type='personal'">
            <img src="../../../assets/login1.png" alt=""><span>会员登录</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="button company" :class="type == 'company'?'active':''" @click="type='company'">
            <img src="../../../assets/login2.png" alt=""><span>供应商登录</span>
          </div>
        </el-col>
      </el-row>
      <el-form>
        <el-input v-model="Form.name"></el-input>
        <el-input type="password" v-model="Form.pass" auto-complete="off"></el-input>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      type:'personal',
      Form:{
        name:'',
        pass:''
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  box-sizing: border-box;
  background-image: url("../../../assets/login_bg.png");
  background-clip: content-box;
  background-size: cover;
  .form {
    width: 350px;
    height: 110%;
    float: right;
    box-shadow: 0 0 40px #d0d0d0;
    background-color: #fff;
    transform: translateY(-10px);
    .login-head {
      text-align: center;
      margin: 10px 0;
    }
    .login-body{
      .button{
        height: 40px;
        background-color: #f9f9f9;
        line-height: 40px;
        text-align: center;
        color: #5E5E5E;
        font-weight: 700;
        &.active{
          position: relative;
          background-color: #fff;
          box-shadow: 0 0 10px #c0c0c0;
          color: #ccc;
          border-bottom: 1px solid #F4C901;
        }
        img{
          width: 25px;
          height: 25px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
