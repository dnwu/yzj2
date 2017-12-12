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
      <el-form :model="Form" ref="loginForm" :rules="rules">
        <div ref="userinput" class="input username">
          <img class="icon" :src="typeinput=='username'?iconRes[0].focus:iconRes[0].blur" alt="">
          <el-form-item label="" prop="username">
            <el-input @focus="setclass('username')" @blur="removeclass('username')" placeholder="请输入用户名" v-model="Form.username"></el-input>
          </el-form-item>
        </div>
        <div ref="passinput" class="input password">
          <img class="icon" :src="typeinput=='password'?iconRes[1].focus:iconRes[1].blur" alt="">
          <el-form-item label="" prop="password">
            <el-input @focus="setclass('password')" @blur="removeclass('password')" type="password" placeholder="请输入密码" v-model="Form.password" auto-complete="off"></el-input>
          </el-form-item>
          <span class="forgetpass">忘记密码？</span>
        </div>
        <div class="autoLogin">
          <el-form-item label="">
            <el-checkbox-group v-model="Form.resource">
              <el-checkbox  label="两周内免登陆"></el-checkbox >
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="submit">
          <el-form-item>
            <el-button type="warning" @click="onSubmit('loginForm')">登录</el-button>
          </el-form-item>
        </div>
        <div @click="goto('/login/register')" class="toRegister">
          立即注册
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      type: "personal",
      typeinput: "",
      Form: {
        username: "",
        password: "",
        resource: ""
      },
      iconRes: [
        {
          focus: require("../../../assets/username1.png"),
          blur: require("../../../assets/username.png")
        },
        {
          focus: require("../../../assets/password1.png"),
          blur: require("../../../assets/password.png")
        }
      ],
      rules: {
        username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    onSubmit(loginForm) {
      this.$refs[loginForm].validate((valid) => {
          if (valid) {
            console.log(valid);
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    setclass(e) {
      if (e == "username") {
        this.typeinput = "username";
        this.$refs.userinput.style.borderColor = "#FDDA3E";
      }
      if (e == "password") {
        this.typeinput = "password";
        this.$refs.passinput.style.borderColor = "#FDDA3E";
      }
    },
    removeclass(e) {
      this.typeinput = "";
      this.$refs.userinput.style.borderColor = "#c6c6c6";
      this.$refs.passinput.style.borderColor = "#c6c6c6";
    }
  }
};
</script>
<style lang="scss">
.login {
  height: 520px;
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
    .login-body {
      .button {
        height: 40px;
        background-color: #f9f9f9;
        line-height: 40px;
        text-align: center;
        color: #5e5e5e;
        font-weight: 700;
        cursor: pointer;
        &.active {
          position: relative;
          background-color: #fff;
          box-shadow: 0 0 10px #c0c0c0;
          color: #ccc;
          border-bottom: 1px solid #f4c901;
        }
        img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      .el-form {
        margin-top: 40px;
        padding: 0 20px;
        .input {
          position: relative;
          margin: 40px 0;
          padding: 0 20px;
          border-bottom: 1px solid #c6c6c6;
          .el-input {
            .el-input__inner {
              border: none;
              border-radius: 0;
            }
          }
          .icon {
            position: absolute;
            top: 10px;
            left: 0;
            z-index: 99;
          }
          .forgetpass {
            position: absolute;
            top: 10px;
            right: 0;
            color: #2b99fa;
            cursor: pointer;
          }
          .el-form-item {
            margin: 0;
          }
        }
        .autoLogin {
          .el-checkbox__inner {
            border-radius: 50%;
          }
          .el-checkbox__label {
            color: #b3b3b3;
          }
        }
        .submit {
          .el-button--warning {
            width: 100%;
            border-radius: 20px;
          }
        }
        .toRegister {
          text-align: right;
          font-size: 14px;
          color: #bcbcbc;
          cursor: pointer;
          &::before {
            content: "";
            display: inline-block;
            width: 24px;
            height: 10px;
            background-image: url("../../../assets/register_icon.png");
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>

