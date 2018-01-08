<template>
  <div class="account">
    <div class="head">
      <div class="title">账号信息</div>
      <!-- <div class="sign"><span>每日签到</span></div> -->
    </div>
    <div class="main">
      <div class="main-top">
        <div class="base-info">
          <div class="head-img"><img src="../../../assets/head_img.png"></div>
          <div class="info">
            <p class="company-name">会员名称：<span>{{userInfo.fullName}}</span></p>
            <p class="account-type">会员类型：<span>{{userInfo.accountType}}</span></p>
            <div class="star" v-if="'level' in this.userInfo">
              <div class="key">会员级别：</div>
              <el-rate
                v-model='starNo'
                disabled
                :max='starNo'
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <div class="member">
              <div class="integral">会员积分：<span class="score" v-if="'integral' in userInfo">{{userInfo.integral}}</span></div>
              <div class="doings">
                <el-badge
                  :value='activity'
                  :max="10"
                  class="item">
                  <el-button size="small">我的活动</el-button>
                </el-badge>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-info">
          <div class="confirm">
            <el-badge :value="userInfo.waitSubmitOrders" class="item">
              <img src="../../../assets/account_icon1.png">
            </el-badge>
            <p>{{userInfo.waitSubmitOrders}}</p>
            <p>代提交</p>
          </div>
          <div class="pay">
            <el-badge :value="userInfo.waitPayOrders" class="item">
              <img src="../../../assets/account_icon2.png">
            </el-badge>
            <p>{{userInfo.waitPayOrders}}</p>
            <p>待支付</p>
          </div>
          <div class="received">
            <el-badge :value="userInfo.waitReceiveOrders" class="item">
              <img src="../../../assets/account_icon3.png">
            </el-badge>
            <p>{{ userInfo.waitReceiveOrders}}</p>
            <p>待收货</p>
          </div>
          <div class="done">
            <el-badge :value="userInfo.totalOrders" class="item">
              <img src="../../../assets/account_icon4.png">
            </el-badge>
            <p>{{userInfo.totalOrders}}</p>
            <p>全部</p>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="account-info">
          <div class="triangle">
            <p>账号信息</p>
          </div>
          <div class="account-coding">
            <span class="title">会员编码</span><span class="colon">:</span><span class="content"></span>
          </div>
          <div class="account">
            <span class="title">账号</span><span class="colon">:</span><span class="content">{{userInfo.account}}</span>
          </div>
          <div class="pass">
            <!-- 修改密码弹出窗 -->
            <div class="changePassModel">
              <el-dialog width="800px" :visible.sync="changePassModel">
                <div slot="title">
                  <span class="el-icon-edit"></span>
                  <span>修改密码</span>
                </div>
                <el-form :model="resetPasswordData" status-icon :rules="resetPasswordRules" ref="resetPassword" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="当前密码" prop="old_password">
                    <el-input type="password" v-model="resetPasswordData.old_password" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="new_password1">
                    <el-input type="password" v-model="resetPasswordData.new_password1" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="new_password2">
                    <el-input type="password" v-model="resetPasswordData.new_password2" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item class="btn">
                    <el-button type="warning" size="mini" @click="submit('resetPassword')">确认</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
              </el-dialog>
            </div>
            <span class="title">密码</span>
            <span class="colon">:</span>
            <div class="content">***********</div>
            <span class="btn"><el-button type="info" size='mini' @click="resetPasswordBtn(userInfo.id)">修改</el-button></span>
          </div>
          <div class="phonenum">
            <!-- 修改手机号模态框 -->
            <div class="changePhoneModel">
              <el-dialog width="800px" :close-on-click-modal='phoneCloseOnClickModal' :visible.sync="changePhoneModel">
                <div slot="title">
                  <span class="el-icon-edit"></span>
                  <span>修改手机号</span>
                </div>
                <el-form :model="resetPhoneData" status-icon ref="resetPhone" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="当前手机号" prop="oldPhone">
                    <el-input v-model="resetPhoneData.oldPhone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="新手机号" prop="newPhone">
                    <el-input v-model="resetPhoneData.newPhone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item class="code" label="验证码" prop="code">
                    <el-input v-model="resetPhoneData.code" auto-complete="off"></el-input>
                    <div class="sendCode">
                      <el-button @click="verificationPhone" :disabled='controlSendCodeBtn' type="success">发送验证码</el-button>
                    </div>
                    <div class="time" v-show="timeControl">({{time}}s)</div>
                  </el-form-item>
                  <el-form-item class="btn">
                    <el-button type="warning" size="mini" @click="submitPhone()">确认</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <!-- <el-button type="warning" size="mini" @click="changePassModel = false">确 定</el-button> -->
                </div>
              </el-dialog>
            </div>
            <span class="title">手机号</span><span class="colon">:</span><span class="content">{{userInfo.phone}}</span><span class="btn"><el-button @click="changePhoneModel=true" type="info" size='mini'>修改</el-button></span>
          </div>
          <div class="email">
            <!-- 修改邮箱模态框 -->
            <div class="changeEmailModel">
              <el-dialog width="800px" :visible.sync="changeEmailModel">
                <div slot="title">
                  <span class="el-icon-edit"></span>
                  <span>修改邮箱</span>
                </div>
                <el-form :model="resetEmailData" status-icon ref="resetEmail" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="原邮箱地址" prop="oldEmail">
                    <el-input v-model="resetEmailData.oldEmail" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="新邮箱地址" prop="newEmail">
                    <el-input type="email" v-model="resetEmailData.newEmail" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item class="btn">
                    <el-button type="warning" size="mini" @click="submitEmail()">确认</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
              </el-dialog>
            </div>
            <span class="title">邮箱</span><span class="colon">:</span><span class="content">{{userInfo.email}}</span><span class="btn"><el-button @click="changeEmailModelControl" type="info" size='mini'>修改</el-button></span>
          </div>
          <!-- <div class="account-type">
            <span class="title">账号类型</span><span class="colon">:</span><span class="content">{{userInfo.accountType}}</span>
          </div> -->
          <div class="account-level">
            <span class="title">账号级别</span><span class="colon">:</span><span class="content">{{userInfo.accountLevel}}</span>
          </div>
        </div>
        <div class="personal-info">
          <!-- 修改个人信息模态框 -->
          <div class="changePersonalInfoModel">
            <el-dialog width="800px" :visible.sync="changePersonalInfoModel">
                <div slot="title">
                  <span class="el-icon-edit"></span>
                  <span>修改个人信息</span>
                </div>
                <el-form :model="resetPersonalInfoData" status-icon ref="resetPersonalInfo" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="resetPersonalInfoData.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" prop="id">
                    <el-input v-model="resetPersonalInfoData.id" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="固定电话" prop="telephone">
                    <el-input v-model="resetPersonalInfoData.telephone" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="addressDetial">
                    <el-input v-model="resetPersonalInfoData.addressDetial" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item class="btn">
                    <el-button type="warning" size="mini" @click="submitPersonalInfo()">确认</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
              </el-dialog>
          </div>
          <div class="triangle">
            <p>个人信息</p>
          </div>
          <div class="name">
            <span class="title">姓名</span><span class="colon">:</span><span class="content">{{userInfo.fullName}}</span>
          </div>
          <div class="id">
            <span class="title">身份证号码</span><span class="colon">:</span><span class="content">{{userInfo.identityCard}}</span>
          </div>
          <div class="cellphone">
            <span class="title">固定电话</span><span class="colon">:</span><span class="content" v-if="'telephone' in userInfo">{{userInfo.telephone}}</span>
          </div>
          <div class="detial">
            <span class="title">详细地址</span><span class="colon">:</span><span class="content" v-if="'address' in userInfo">{{userInfo.address}}</span>
          </div>
          <div class="revise">
            <el-button
              @click="changePersonalInfoModelControl"
              type="info"
              size="mini">修改</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { logout } from "@/tools/logout";
import getmd5 from "@/api/getmd5";
export default {
  mixins: [logout],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resetPasswordData.new_password1 !== "") {
          this.$refs.resetPassword.validateField("new_password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPasswordData.new_password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePassModel: false,
      changePhoneModel: false,
      changeEmailModel: false,
      changePersonalInfoModel: false,
      controlSendCodeBtn: false, // 控制发送验证码按钮
      time: 60, // 验证码剩余时间
      timeControl: false, //控制时间的显示
      phoneCloseOnClickModal: true,
      activity: "",
      userInfo: {},
      resetPasswordData: {
        old_password: "",
        new_password1: "",
        new_password2: ""
      },
      resetPhoneData: {
        oldPhone: "",
        newPhone: "",
        code: ""
      },
      resetEmailData: {
        oldEmail: "",
        newEmail: ""
      },
      resetPersonalInfoData: {
        name: "",
        id: "",
        telephone: "",
        addressDetial: ""
      },
      resetPasswordRules: {
        new_password1: [{ validator: validatePass, trigger: "blur" }],
        new_password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUserInfo();
    // console.log(0.000001.div(0.0001));  // number.js浮点数精度问题
  },
  methods: {
    ...mapMutations({
      setUsertype: "SET_USERTYPE",
      setToken: "SET_TOKEN",
      setUsername: "SET_USERNAME",
      setId: "SET_ID"
    }),
    resetPasswordBtn(id) {
      // this.$router.push("/center/change_password");
      this.changePassModel = true;
    },
    getUserInfo() {
      this.axios
        .post("/app/v1/user/userInfo", {
          id: this.id,
          token: this.token
        })
        .then(data => {
          console.log(data);
          if (data.data.code == "1") {
            this.userInfo = data.data.data;
            this.resetEmailData.oldEmail = data.data.data.email;
            console.log(this.userInfo);
          } else if (data.data.code == 10001) {
            this.logout();
          }
        });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.axios
            .post("/app/v1/user/userModifyPassword", {
              id: this.id,
              newPassword: getmd5(this.resetPasswordData.new_password1),
              oldPassword: getmd5(this.resetPasswordData.old_password),
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 10104) {
                this.$message.error("密码格式错误,修改失败");
              }
              if (data.data.code == 10108) {
                this.$message.error("密码错误");
              }
              if (data.data.code == 1) {
                this.$message({
                  message: "恭喜你，密码修改成功,请重新登录",
                  type: "success"
                });
                setTimeout(() => {
                  this.$cookie.delete("username");
                  this.setUsername("");
                  this.setUsertype("");
                  this.setToken("");
                  this.setId("");
                  this.$router.push("/login");
                }, 3000);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitPhone() {
      this.axios
        .post("/app/v1/user/userModifyInfo", {
          address: "",
          id: this.id,
          identifyCard: "",
          info: this.resetPhoneData.newPhone,
          name: "",
          smsCode: this.resetPhoneData.code,
          telephone: "",
          token: this.token,
          type: 1
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 10103) {
            this.$message({
              message: "验证码错误",
              type: "warning"
            });
          }
          if (data.data.code == 1) {
            this.getUserInfo();
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
        });
    },
    changeEmailModelControl() {
      this.changeEmailModel = true;
      this.resetEmailData.newEmail = "";
    },
    submitEmail() {
      if (this.resetEmailData.newEmail == "") {
        this.$message({
          message: "邮箱不能为空",
          type: "warning"
        });
        return;
      }
      this.axios
        .post("/app/v1/user/userModifyInfo", {
          address: "",
          id: this.id,
          identifyCard: "",
          info: this.resetEmailData.newEmail,
          name: "",
          smsCode: "",
          telephone: "",
          token: this.token,
          type: 2
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 10109) {
            this.$message({
              message: "邮箱格式错误",
              type: "warning"
            });
          }
          if (data.data.code == 1) {
            this.getUserInfo();
            this.changeEmailModel = false;
            this.$message({
              message: "邮箱修改成功",
              type: "success"
            });
          }
        });
    },
    changePersonalInfoModelControl() {
      this.changePersonalInfoModel = true;
    },
    submitPersonalInfo() {
      if(this.resetPersonalInfoData.name == ''){
        this.$message({
          message: "姓名不能为空",
          type: "warning"
        });
        return
      }
      this.axios.post("/app/v1/user/userModifyInfo", {
        address: this.resetPersonalInfoData.addressDetial,
        id: this.id,
        identifyCard: this.resetPersonalInfoData.id,
        info: "1",
        name: this.resetPersonalInfoData.name,
        smsCode: "",
        telephone: this.resetPersonalInfoData.telephone,
        token: this.token,
        type: 3
      }).then(data=>{
        if(data.data.code == 10110){
          this.$message({
            message: "身份证格式错误",
            type: "warning"
          });
        }
        if(data.data.code == 1){
          this.changePersonalInfoModel = false
          this.getUserInfo()
        }
      });
    },
    verificationPhone() {
      this.axios
        .post("/app/v1/user/userValidateAccount", {
          phone: this.resetPhoneData.newPhone
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 10002) {
            this.$message({
              message: "手机号已存在",
              type: "warning"
            });
          }
          if (data.data.code == 10101) {
            this.controlSendCodeBtn = false;
            this.timeControl = false;
            this.phoneCloseOnClickModal = true;
            clearInterval(this.timer);
            this.$message({
              message: "手机格式错误",
              type: "warning"
            });
          }
          if (data.data.code == 1) {
            this.sendCode();
          }
        });
    },
    sendCode() {
      this.controlSendCodeBtn = true;
      this.timeControl = true;
      this.phoneCloseOnClickModal = false;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          this.controlSendCodeBtn = false;
          this.timeControl = false;
          this.phoneCloseOnClickModal = true;
          this.time = 60;
          clearInterval(this.timer);
        }
      }, 1000);
      this.axios
        .post("/app/v1/common/sendSms", {
          phone: this.resetPhoneData.oldPhone,
          smdType: "editphone"
        })
        .then(data => {
          console.log("21212", data);
        });
    }
  },
  computed: {
    ...mapGetters(["token", "id"]),
    starNo() {
      if ("level" in this.userInfo) {
        return parseInt(this.userInfo.level.level);
      }
    }
  }
};
</script>
<style lang="scss">
.account {
  .head {
    display: flex;
    > div {
      flex: 1;
      line-height: 61px;
    }
    .title {
      padding-left: 20px;
      color: #b3b3b3;
    }
    .sign {
      text-align: right;
      span {
        display: inline-block;
        border: 1px solid #f5363e;
        color: #f5363e;
        height: 20px;
        line-height: 20px;
        padding: 3px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .main {
    padding: 40px;
    .main-top {
      display: flex;
      background-color: #fff;
      box-shadow: 0 0 4px #e0e0e0;
      padding: 20px;
      height: 200px;
      .base-info {
        flex: 3;
        position: relative;
        display: flex;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 100%;
          border-left: 1px dashed #e0e0e0;
          position: absolute;
          right: 0;
          top: 0;
        }
        .head-img {
          width: 200px;
          text-align: center;
          img {
            margin-top: 50%;
            transform: translateY(-50%);
            border: 8px solid #f2f2f2;
            border-radius: 50%;
          }
        }
        .info {
          flex: 1;
          .company-name,
          .account-type {
            font-size: 16px;
            color: #999999;
            margin: 0;
            span {
              color: #888;
            }
          }
          .company-name {
            margin-top: 40px;
          }
          .star {
            margin: 20px 0;
            display: flex;
            .key {
              font-size: 16px;
              color: #999999;
            }
          }
          .member {
            display: flex;
            .integral {
              flex: 1;
              color: #999999;
              font-size: 16px;
              .score {
                color: #fccf00;
              }
            }
            .doings {
              flex: 1;
              .el-badge {
                box-shadow: 1px 4px 4px #e0e0e0;
                button {
                  color: #fff;
                  background-color: #fccf00;
                }
              }
            }
          }
        }
      }
      .goods-info {
        flex: 2;
        display: flex;
        > div {
          flex: 1;
          text-align: center;
          margin-top: 40px;
          color: #999999;
          img {
            cursor: pointer;
          }
          .el-badge__content.is-fixed {
            right: 20px;
            top: 4px;
          }
        }
      }
    }
    .main-bottom {
      display: flex;
      margin-top: 30px;
      .triangle {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border: 38px solid #fccf00;
        border-color: #fccf00 transparent transparent #fccf00;
        > p {
          width: 100px;
          transform: rotate(-45deg) translate(4px, -65px);
          color: #fff;
        }
      }
      .account-info {
        flex: 3;
        > div:not(".triangle") {
          display: flex;
        }
        > div {
          .content {
            width: 200px;
          }
        }
        .pass,
        .phonenum,
        .email {
          .changePassModel,
          .changePhoneModel,
          .changeEmailModel {
            .el-dialog {
              .el-dialog__header {
                background-color: #fccf00;
                div {
                  color: #fff;
                  font-size: 20px;
                }
              }
              .el-dialog__body {
                position: relative;
                .btn {
                  text-align: center;
                  transform: translateX(-60px);
                  button {
                    padding: 6px 60px;
                  }
                }
                .code {
                  .el-form-item__content {
                    display: flex;
                    .sendCode {
                      margin-left: 100px;
                      margin-right: 100px;
                    }
                  }
                }
                .time {
                  position: absolute;
                  right: 40px;
                  color: #67c23a;
                  text-align: left;
                }
              }
            }
          }
        }
      }
      .personal-info {
        flex: 2;
        margin-left: 20px;
        padding-top: 40px;
        .changePersonalInfoModel {
          .el-dialog {
            .el-dialog__header {
              background-color: #fccf00;
              div {
                color: #fff;
                font-size: 20px;
              }
            }
            .el-dialog__body {
              position: relative;
              .btn {
                text-align: center;
                transform: translateX(-60px);
                button {
                  padding: 6px 60px;
                }
              }
              .code {
                .el-form-item__content {
                  display: flex;
                  .sendCode {
                    margin-left: 100px;
                    margin-right: 100px;
                  }
                }
              }
              .time {
                position: absolute;
                right: 40px;
                color: #67c23a;
                text-align: left;
              }
            }
          }
        }
        .revise {
          display: flex;
          justify-content: flex-end;
          button {
            width: 66px;
            padding: 2px 15px;
            box-shadow: 0 5px 10px gray;
          }
        }
      }
      > div {
        position: relative;
        box-sizing: border-box;
        min-height: 200px;
        background-color: #fff;
        box-shadow: 0 0 4px #e0e0e0;
        padding: 20px 20px 20px 80px;
        color: #a0a0a0;
        > div:not(.triangle) {
          display: flex;
          .title {
            width: 100px;
            text-align: justify;
            &::after {
              content: "";
              display: inline-block;
              width: 100%;
              overflow: hidden;
              height: 0;
            }
          }
          .colon {
            margin: 0 10px;
            font-weight: 700;
          }
          .btn {
            margin-left: 20px;
            .el-button {
              box-shadow: 0 5px 10px gray;
              padding: 2px 16px;
            }
          }
        }
      }
    }
  }
}
</style>
