<template>
  <div class="login-container">
    <div class="login-con">
      <div class="login-img"></div>
      <div class="login">
        <div class="login-body">
          <el-row>
            <el-col :span="12">
              <button type="button" class="login-user-type"
                      :class="userType === 'personal' ? 'login-user-type-active':''" @click.stop="userType='personal'">
                个人用户登录
              </button>
            </el-col>
            <el-col :span="12">
              <button type="button" class="login-user-type"
                      :class="userType === 'company' ? 'login-user-type-active':''" @click.stop="userType='company'">
                企业用户登录
              </button>
            </el-col>
          </el-row>
          <div class="login-form">
            <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
              <div class="username-con">
                <i class="username-icon"></i>
                <el-form-item prop="username">
                  <el-input v-model="form.username" placeholder="请输入用户名/手机号码/邮箱" borderRadius="0px" paddingLeft="50px" height="42px"></el-input>
                </el-form-item>
              </div>
              <div class="password-con">
                <i class="password-icon"></i>
                <el-form-item prop="password">
                  <el-input type="password" v-model="form.password" @keyup.enter.native="submitForm('form')" placeholder="请输入密码" borderRadius="0px" paddingLeft="50px" height="42px" auto-complete="off"></el-input>
                </el-form-item>
              </div>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="两周内自动登录" prop="autoLogin">
                    <el-switch on-text="" off-text="" v-model="form.autoLogin"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <a class="forget-pw">忘记密码？</a>
                </el-col>
              </el-row>
              <el-form-item>
                <button type="button" @click="submitForm('form')" class="login-btn">登录</button>
              </el-form-item>
              <a class="register" @click.stop="goPage('register')">没有账号？免费注册</a>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElFormItem,
      ElInput,
      ElForm
    },
    data (){
      return {
        userType: 'personal',
        form: {
          username: '',
          password: '',
          autoLogin: false
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名/手机号码/邮箱', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('login!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goPage (path){
        this.$router.push({name: path});
      }
    }
  }
</script>
<style>
  .login-container {
    display: block;
    width: 100%;
    background-color: #f9f9f9;
  }

  .login-con {
    display: table;
    margin: auto;
    padding: 80px 0;
  }

  .login-img {
    display: table-cell;
    vertical-align: top;
    width: 360px;
    height: 420px;
    background-size: 100% 100%;
    background-image: url("../../assets/login.png");
  }

  .login {
    display: table-cell;
    width: 380px;
    height: 420px;
    padding-left: 150px;
  }

  .login-body {
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 0 3px #bdbdbd;
    -webkit-box-shadow: 0 0 3px #bdbdbd;
    -moz-box-shadow: 0 0 3px #bdbdbd;
  }

  .login-user-type {
    width: 100%;
    border: none;
    text-align: center;
    background-color: #f9f9f9;
    font-size: 16px;
    border-bottom: 5px solid #f9f9f9;
    padding: 10px 6px;
    cursor: pointer;
    color: #939393;
  }

  .login-user-type-active {
    background-color: white;
    border-bottom-color: #f4c900;
    -moz-border-bottom-colors: #f4c900;
    color: #333;
  }
  .login-form{
    padding: 0 30px;
  }
  .username-con{
    position: relative;
    margin: 50px 0 30px;
  }
  /* 用户名密码框重置 */
  input.el-input__inner{
    padding-left: 40px;
  }
  .password-con{
    position: relative;
  }
  .username-icon,.password-icon{
    display: block;
    position: absolute;
    width: 18px;
    height: 21px;
    z-index: 10;
    margin-left: 10px;
    margin-top: 8px;
    background-size: 100% 100%;
  }
  .username-icon{
    background-image: url("../../assets/username.png");
  }
  .password-icon{
    background-image: url("../../assets/password.png");
  }
  .forget-pw{
    text-align: right;
    color: #20a0ff;
    display: block;
    padding: 10px 0;
    cursor: pointer;
  }
  .forget-pw:hover{
    color: #1467a3;
  }
  .login-btn{
    display: block;
    width: 100%;
    text-align: center;
    color: white;
    background-color: #58b957;
    padding: 10px 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .login-btn:hover{
    background-color: #42d885;
  }
  .register{
    display: block;
    text-align: right;
    color: #989898;
    font-size: 12px;
    cursor: pointer;
  }
  .register:hover{
    color: #666666;
  }
</style>
