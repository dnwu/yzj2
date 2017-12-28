<template>
<div class="register1">
  <div class="head" ref="head">
    <p>会员注册</p>
    <div class="tologin">已有账号？<span @click="goto('/login')">请登录</span></div>
  </div>
  <div class="registerform">
    <el-form status-icon :model="registerForm" :rules="rules" ref="ruleForm1">
      <transition name="step1">
        <div v-show="show" class="left">
          <div class="input must name">
            <span>用户名</span>
            <el-form-item prop="name">
              <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <p>支持中文、字母、数字、"-"、"_"的组合，6-60个字符</p>
          </div>
          <div class="input must pass">
            <span>登录密码</span>
            <el-form-item prop="pass">
              <el-input type="password" v-model="registerForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <p>建议使用字母、数字和字符两种及以上的组合，8-20个字符</p>
          </div>
          <div class="input must repass">
            <span>确认密码</span>
            <el-form-item prop="repass">
              <el-input type="password" v-model="registerForm.repass" auto-complete="off"></el-input>
            </el-form-item>
            <p>再次输入密码</p>
          </div>
          <div class="input phone">
            <span>固定电话</span>
            <el-form-item prop="phone">
              <el-input v-model="registerForm.phone"></el-input>
            </el-form-item>
            <p>输入座机号码，格式为区号-座机号</p>
          </div>
          <div class="input must email">
            <span>电子邮箱</span>
            <el-form-item prop="email">
              <el-input type="mail" v-model="registerForm.email"></el-input>
            </el-form-item>
            <p>输入电子邮箱,格式为xxx@xxxx.xxx</p>
          </div>
          <div class="nextStep">
            <el-button type="info" @click="nextStep('ruleForm1')" round>下一步</el-button>
          </div>
        </div>
      </transition>
    </el-form>
    <el-form status-icon :model="registerForm" :rules="rules" ref="ruleForm2">
      <transition name="step2">
        <div v-show="!show" class="right">
          <div class="input must realname">
            <span>姓名</span>
            <el-form-item prop="realname">
              <el-input v-model="registerForm.realname"></el-input>
            </el-form-item>
            <p>请输入真实姓名</p>
          </div>
          <div class="input must id">
            <span>身份证</span>
            <el-form-item prop="id">
              <el-input v-model="registerForm.id"></el-input>
            </el-form-item>
            <p>请输入对应的身份证号码</p>
          </div>
          <div class="input must mobile">
            <span>手机号</span>
            <span class="preNum">+86</span>
            <el-form-item prop="mobile">
              <el-input v-model="registerForm.mobile"></el-input>
            </el-form-item>
            <p>请输入手机号</p>
          </div>
          <div class="input must testNum">
            <span>验证码</span>
            <el-form-item prop="testNum">
              <el-input v-model="registerForm.testNum"></el-input>
            </el-form-item>
            <div class="gettestnum">
              <el-button @click="getnum()" type="warning" round>获取验证码</el-button>
            </div>
            <div v-show='lasttimeshow' class="lasttime">
              <el-button type="info"  round>{{time}}s后重新获取</el-button>
            </div>
            <p>请输入短信验证码</p>
          </div>
          <div class="registerNow">
            <el-button type="warning" @click="register('ruleForm2')" round>立即注册</el-button>
          </div>
        </div>
      </transition>
    </el-form>
  </div>
</div>
</template>
<script>
import getmd5 from "@/api/getmd5";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(value.length);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.Pass !== "") {
          // this.$refs.ruleForm.validateField('pass');
          if (value.length < 3 || value.length > 20) {
            callback(new Error("长度在 3 到 20 个字符"));
          }
        }
        callback();
      }
    };
    var validaterepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: true,
      time: 60,
      timer: null,
      lasttimeshow: false,
      registerForm: {
        name: "",
        pass: "",
        repass: "",
        phone: "",
        email: "",
        realname: "",
        id: "",
        mobile: "",
        testNum: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 60, message: "长度在 3 到 60 个字符", trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        repass: [{ validator: validaterepass, trigger: "blur" }],
        phone: [
          { required: false, message: "请输入固定电话", trigger: "blur" },
          { min: 3, max: 60, message: "请输入合适正确的座机号", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { min: 3, max: 60, message: "长度在 3 到 60 个字符", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur,change" }
        ],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        id: [{ required: true, message: "请输入对应的身份证号码", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        testNum: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    prompt(title) {
      this.$notify.error({
        title: "错误",
        message: title,
        duration: 2000
      });
    },
    getnum() {
      // console.log(this.timer,this.registerForm.mobile);
      if (this.timer) {
        return false;
      }
      if(this.registerForm.mobile == ''){
        this.prompt('手机号不能为空')
        return false
      }
      this.lasttimeshow = true;
      // clearInterval(timer);
      this.timer = setInterval(() => {
        this.time--;
        if (this.time < 0) {
          this.lasttimeshow = false;
          this.time = 60;
          clearInterval(this.timer);
        }
      }, 1000);
      this.axios.post("/app/v1/common/sendSms", {
        phone: this.registerForm.mobile,
        smdType: "personal_reg"
      }).then(data=>{
        // console.log(data);
      });
    },
    nextStep(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.show = false;
          this.$refs.head.classList.add("step2");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goto(path) {
      this.$router.push(path);
    },
    register(formName) {
      // console.log(this.registerForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/user/userRegister", {
              email: this.registerForm.email,       //邮件
              identityCard: this.registerForm.id,   //身份证
              userName: this.registerForm.name,    //用户名
              password: getmd5(this.registerForm.pass),    // 密码
              phone: this.registerForm.mobile,    // 手机号
              smsCode: this.registerForm.testNum,   // 验证码
              telephone: this.registerForm.phone,   //固定电话
              name: this.registerForm.realname    // 姓名
            })
            .then(data => {
              // console.log(data);
              if(data.data.code == '1'){
                this.$router.push("/login/success");
              }else{
                this.$router.push("/login/error");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.register1 {
  box-shadow: 0px 0px 8px #a0a0a0;
  height: 680px;
  overflow: hidden;
  position: relative;
  .step1-enter-active,
  .step1-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .step1-enter,
  .step1-leave-to {
    transform: translateX(-150%);
  }
  .step2-enter-active,
  .step2-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .step2-enter,
  .step2-leave-to {
    transform: translateX(150%);
  }
  .left,
  .right {
    position: absolute;
    width: 60%;
  }
  .head {
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 4px #b0b0b0;
    &::after {
      content: "";
      display: inline-block;
      width: 50%;
      height: 4px;
      background-color: #f4c900;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    &.step2::after {
      width: 100%;
    }
    p {
      color: black;
      font-weight: 700;
      font-size: 18px;
    }
    .tologin {
      position: absolute;
      top: 0;
      right: 10px;
      color: #9a9a9a;
      span {
        color: #3b9ef9;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
.registerform {
  width: 600px;
  margin-top: 30px;
  margin: 30px auto;
  padding-bottom: 10px;
  .el-form-item {
    margin: 0;
  }
  .must::after {
    content: "*";
    position: absolute;
    top: 20px;
    right: -20px;
    color: red;
  }
  .el-input__icon {
    position: absolute;
    right: 0;
  }
  .input {
    border-bottom: 1px solid #c0c0c0;
    margin: 40px 0;
    position: relative;
    .el-input__inner {
      border: none;
      padding-left: 150px;
    }
    span {
      position: absolute;
      top: 10px;
      left: 0;
      color: #a0a0a0;
      letter-spacing: 8px;
      z-index: 99;
    }
    p {
      position: absolute;
      bottom: -35px;
      right: 0;
      color: #cbcbcb;
      font-size: 12px;
    }
  }
  .phone {
    margin-top: 110px;
  }
  .nextStep,
  .registerNow {
    margin: 50px 0;
    display: flex;
    justify-content: flex-end;
    button {
      width: 300px;
    }
  }
  .mobile {
    margin-top: 110px;
    .el-input__inner {
      padding-left: 200px;
    }
    .preNum {
      letter-spacing: 0px;
      left: 130px;
    }
  }
  .testNum {
    .gettestnum {
      position: absolute;
      right: 0;
      top: 5px;
      z-index: 99;
      height: 10px;
      button {
        width: 150px;
        height: 32px;
        span {
          color: #fff;
          width: 100%;
          text-align: center;
          // transform: translateY(-3px);
        }
      }
    }
  }
  .lasttime {
    position: absolute;
    right: -150px;
    top: 6px;
    button {
      width: 120px;
      span {
        width: 100%;
        letter-spacing: 0;
        text-align: center;
        color: #fff;
        transform: translateY(-3px);
      }
    }
  }
}
</style>

