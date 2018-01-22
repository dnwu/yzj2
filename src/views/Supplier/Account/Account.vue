<template>
  <div class="account">

    <el-card class="box-card">
      <div class="card-one">
        <div class="ico">
          <img :src="firm.ico" alt="">
        </div>
        <div class="msg" style="display">
          <p v-text="firm.name"></p>
          <p>供应商编码：
            <span v-text="firm.num"></span>
          </p>
          <p>业务类型：
            <span v-text="firm.type"></span>
          </p>
        </div>
        <div class="menu">
          <span @click="toRouter(item.path,item.typecode)" v-for="(item,index) in menus" :key="index">
            <img :src="item.src" alt="">
            <p v-text="item.num"></p>
            <p v-text="item.intro"></p>
          </span>
        </div>
      </div>
    </el-card>

    <div class="card-two">
      <el-card>
        <div class="triangle">
          <span class="text">账号信息</span>
        </div>
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
        <!-- 修改手机号弹出窗 -->
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
            </div>
          </el-dialog>
        </div>
        <!-- 修改邮箱弹出窗 -->
        <div class="changeEmailModel">
          <el-dialog width="800px" :visible.sync="changeEmailModel">
            <div slot="title">
              <span class="el-icon-edit"></span>
              <span>修改邮箱</span>
            </div>
            <el-form :model="resetEmailData" status-icon ref="resetEmail" label-width="100px" class="demo-ruleForm">
              <!-- <el-form-item label="原邮箱地址" prop="oldEmail"> -->
                <!-- <el-input v-model="resetEmailData.oldEmail" auto-complete="off"></el-input> -->
              <!-- </el-form-item> -->
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
        <div class="info">
          <p v-for="(item,key) of account">
            <span class="info-font" v-text="item.name"></span>
            <span class="colon">:</span>
            <span class="content" v-text="item.value" v-if="item.value"></span>
            <el-button type="info" @click="showModel(item.modelName)" v-if="item.alter">修改</el-button>
            <!--  @click="alter(key)" -->
          </p>
        </div>
      </el-card>
      <el-card>
        <div class="triangle">
          <span class="text">基本信息</span>
        </div>
        <div class="server">
          <p>
            <span class="info-font">结算方式</span>
            <span class="colon">:</span>
            <span class="content" v-text="info.way"></span>
          </p>
          <p>
            <span class="info-font">服务范围</span>
            <span class="colon">:</span>
            <span class="ud-selectBox">
              <input :class="['ud-input']" v-model="infoOption" type="text" placeholder="请选择" readonly>
              <div class="contentBox">
                <ul>
                  <li v-for="item in info.range" v-text="item.label" @click="udItem(item.label)"></li>
                </ul>
              </div>
            </span>
          </p>
          <div class="pos">
            <h4>
              <span class="info-font">服务项</span>
            </h4>
            <div class="menu">
              <ul>
                <li v-for="(item,index) in infoOptions" v-if="checkIndexArray(item,servers,'intro') !== -1">
                  <!--  @click="toRouter(servers[checkIndexArray(item,servers,'intro')].path)" -->
                  <span class="note" v-text="String.fromCharCode(65+index)"></span>
                  <div class="wrap">
                    <img :src="servers[checkIndexArray(item,servers,'intro')].src" alt="">
                  </div>
                  <p v-text="servers[checkIndexArray(item,servers,'intro')].intro"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-card>
    </div>


  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import getmd5 from "@/api/getmd5";
export default {
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
      dialogType: "email",
      changePassModel: false,
      resetPasswordData: {
        old_password: "",
        new_password1: "",
        new_password2: ""
      },
      resetPasswordRules: {
        new_password1: [{ validator: validatePass, trigger: "blur" }],
        new_password2: [{ validator: validatePass2, trigger: "blur" }]
      },
      changePhoneModel:false,
      time: 60, // 验证码剩余时间
      timeControl: false, //控制时间的显示
      phoneCloseOnClickModal: true,
      controlSendCodeBtn: false, // 控制发送验证码按钮
      resetPhoneData: {
        oldPhone: "",
        newPhone: "",
        code: ""
      },
      changeEmailModel:false,
      resetEmailData: {
        // oldEmail: "",
        newEmail: ""
      },
      firm: {
        ico: require("../../../assets/head_img.png"),
        name: "海航速运（北京）优先责任公司",
        num: "YZJ271939392900101",
        type: "直营"
      },
      menus: [
        {
          coding: {
            num: "orderNum1"
          },
          src: require("@/assets/account_icon1.png"),
          num: 0,
          intro: "待接单",
          path: "/supplier/order_taking",
          typecode:'2'
        },
        {
          coding: {
            num: "orderNum2"
          },
          src: require("@/assets/account_icon2.png"),
          num: 2,
          intro: "待收货",
          path: "/supplier/order_taking",
          typecode:'4'
        },
        {
          coding: {
            num: "orderNum3"
          },
          src: require("@/assets/account_icon3.png"),
          num: 0,
          intro: "运输中",
          path: "/supplier/order_taking",
          typecode:'5'
        },
        {
          coding: {
            num: "orderNum4"
          },
          src: require("@/assets/account_icon4.png"),
          num: 0,
          intro: "已完成",
          path: "/supplier/order_taking",
          typecode:'7'
        }
      ],
      account: {
        supplierName: {
          name: "供应商简称",
          value: "HH00001"
        },
        account: {
          name: "账号",
          value: "YOYO2017"
        },
        password: {
          name: "密码",
          value: "**********",
          alter: true,
          modelName: "changePassModel"
        },
        phone: {
          name: "手机号",
          value: "13900000000",
          alter: true,
          modelName: "changePhoneModel"
        },
        email: {
          name: "邮箱",
          value: "123456@qq.com",
          alter: true,
          modelName: "changeEmailModel"
        },
        version: {
          name: "账户级别",
          value: "主账号"
        }
      },
      infoOption: "深圳市",
      info: {
        way: "月结",
        range: [
          {
            label: "深圳市",
            value: "001",
            options: [
              "航空运输服务",
              "始发港地面运输",
              "目的港地面运输",
              "上面取货",
              "落地配送"
            ]
          },
          {
            label: "上海市",
            value: "002",
            options: ["航空运输服务", "上面取货"]
          },
          {
            label: "广州市",
            value: "002",
            options: ["目的港地面运输", "始发港地面运输"]
          },
          {
            label: "汕头市",
            value: "002",
            options: ["航空运输服务", "目的港地面运输", "上面取货"]
          },
          {
            label: "北京市",
            value: "002",
            options: ["目的港地面运输", "落地配送"]
          },
          {
            label: "肇庆市",
            value: "002",
            options: ["航空运输服务", "目的港地面运输", "上面取货", "落地配送"]
          },
          {
            label: "揭阳市",
            value: "002",
            options: ["目的港地面运输", "上面取货", "落地配送"]
          },
          {
            label: "重庆市",
            value: "002",
            options: ["目的港地面运输", "上面取货"]
          }
        ]
      },
      servers: [
        {
          src: require("@/assets/detail_info_img1.png"),
          intro: "航空运输服务"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img2.png"),
          intro: "始发港地面运输"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img3.png"),
          intro: "目的港地面运输"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img4.png"),
          intro: "上面取货"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img5.png"),
          intro: "落地配送"
          /* path: "/" */
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      setUsertype: "SET_USERTYPE",
      setToken: "SET_TOKEN",
      setUsername: "SET_USERNAME",
      setId: "SET_ID"
    }),
    toRouter(path,type) {
      console.log(path,type);
      // this.$router.push(path);
      this.$router.push({
        path:path,
        query:{
          type:type
        }
      })
    },
    alter(type) {
      this.dialogType = type;
      this.dialogFormVisible = true;
    },
    dialogChange() {
      this.dialogFormVisible = false;
    },
    checkIndexArray(info, arr, name) {
      for (var i = 0; i < arr.length; i++) {
        if (info == arr[i][name]) {
          return i;
        }
      }
      return -1;
    },
    udShow(arrName) {
      for (var i = 0; i < arrName.length; i++) {
        this[arrName[i]] = !this[arrName[i]];
      }
    },
    udItem(label) {
      this.infoOption = label;
    },
    showModel(modelname) {
      console.log(modelname);
      this[modelname] = true
    },
    submit(formName) {
      if(this.resetPasswordData.old_password == ''){
        this.$message({
          message: "原密码不能为空",
          type: "warning"
        });
        return;
      }
      this.$refs[formName].validate(valid => {
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
    verificationPhone() {
      if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.resetPhoneData.newPhone))){
        this.$message({
          message: "新手机格式错误",
          type: "warning"
        });
        return
      }
      if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.resetPhoneData.oldPhone))){
        this.$message({
          message: "当前手机格式错误",
          type: "warning"
        });
        return
      }
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
    },
    submitPhone() {
      if(this.resetPhoneData.code == ''){
        this.$message({
          message: "验证码不能为空",
          type: "warning"
        });
        return
      }
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
            this.changePhoneModel = false
          }
        });
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
            this.getSupplierInfo()
            this.changeEmailModel = false;
            this.resetEmailData.newEmail =''
            this.$message({
              message: "邮箱修改成功",
              type: "success"
            });
          }
        });
    },
    setMapped(obj, dataJson, objKey) {
      if (obj instanceof Array) {
        let arr = obj;
        for (let i = 0; i < arr.length; i++) {
          var coding = arr[i][objKey] || arr[i]["coding"];
          for (let name in coding) {
            arr[i][name] = dataJson[coding[name]];
          }
        }
      } else {
        for (let name in obj) {
          var coding = name;
          coding && dataJson[coding] && (obj[name][objKey] = dataJson[coding]);
        }
      }
    },
    getSupplierInfo(){
      this.axios
      .post("/web/v1/supplier/info", {
        id: this.$store.state.id,
        token: this.$store.state.token
      })
      .then(res => {
        console.log(res);
        var data = res.data.data;
        this.firm.name = data.supplierFullName;
        // 订单数量数据设置
        this.setMapped(this.menus, data);
        // 账号信息设置
        this.setMapped(this.account, data, "value");

        var version = this.account.version;
        version.value = version.value == 1 ? "主账号" : "子账号";
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters(['id','token']),
    infoOptions() {
      var options,
        option = this.infoOption,
        len = this.info.range.length;
      for (var i = 0; i < len; i++) {
        var item = this.info.range[i];
        if (option == item.label) {
          options = item.options;
        }
      }
      return options;
    }
  },
  mounted() {
    // obj: 需要设置数据的对象或者数组
    // dataJson: 可读取json数据，属性对应coding映射关系
    // objKey：对象中需要设置的值（其中，对象的name表示一对一映射关系）/数组中的多对多映射关系的对象
    // function setMapped(obj, dataJson, objKey) {
    //   if (obj instanceof Array) {
    //     let arr = obj;
    //     for (let i = 0; i < arr.length; i++) {
    //       var coding = arr[i][objKey] || arr[i]["coding"];
    //       for (let name in coding) {
    //         arr[i][name] = dataJson[coding[name]];
    //       }
    //     }
    //   } else {
    //     for (let name in obj) {
    //       var coding = name;
    //       coding && dataJson[coding] && (obj[name][objKey] = dataJson[coding]);
    //     }
    //   }
    // }
    this.getSupplierInfo()
  }
};
</script>
<style lang="scss">
@mixin font {
  font-size: 16px;
  // font-weight: bold;
  text-align: justify;
  overflow: hidden;
  &::after {
    width: 100%;
    height: 0;
    margin: 0;
    display: inline-block;
    overflow: hidden;
    content: "";
  }
}

.account {
  $orange: #fccf00;
  margin-top: 61px + 30px;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  $dotted: 1px dotted #cfcfcf;
  @mixin card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card-one {
    @include card;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    .ico {
      border-radius: 100px;
      box-shadow: 0px 0px 0px 10px #f2f2f2;
      margin-bottom: 10px;
    }
    .msg {
      width: 300px;
      line-height: 30px;
    }
    .menu {
      width: 400px;
      padding-left: 100px;
      padding-top: 40px;
      padding-bottom: 14px;
      border-left: $dotted;
      span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
      }
      p {
        margin: 10px 0;
        text-align: center;
      }
    }
  }

  .card-two {
    @include card;
    margin-top: 40px;
    min-height: 407px;
    justify-content: space-between;
    .triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-top: 80px solid $orange;
      border-right: 80px solid transparent;
      .text {
        position: absolute;
        width: 100px;
        transform-origin: left top;
        transform: rotate(-45deg);
        top: -40px;
        color: white;
        font-size: 14px;
      }
    }

    $all-width: 1250px;
    $info-width: 700px;
    $paddingLeft: 60px;

    .info,
    .server {
      box-sizing: border-box;
      $padTB: 20px;
      padding-top: $padTB;
      .info-font {
        width: 90px;
        height: 20px;
        display: inline-block;
        @include font;
      }
      .content {
        display: inline-block;
        min-width: 330px;
        font-size: 16px;
        // font-weight: bold;
      }
      .colon {
        margin: 0 15px;
      }
      .pos {
        margin-left: -$paddingLeft + 10;
        margin-top: 30px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      // justify-content: space-around;
      width: $info-width;
      height: 100%;
      /* 是否跟据父级进行拓展 */
      padding-left: 60px;
      padding-bottom: 15px;
      padding-top: 50px;
      p {
        margin: 8px 0;
        button{
          box-shadow: 4px 4px 4px #e0e0e0;
        }
      }
    }
    .server {
      width: $all-width - $info-width;
      padding-left: $paddingLeft;
      box-sizing: border-box;
      padding-bottom: 0;
      h4 {
        text-align: center;
      }
      .menu {
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          position: relative;
          display: inline-block;
          text-align: center;
          padding: 10px;
          cursor: pointer;
          border-right: $dotted;
          border-bottom: $dotted;
          font-size: 12px;
          .wrap {
            height: 45px;
            width: 114px;
          }
          &:nth-child(4n) {
            border-right: 0;
          }
          // &:last-child {
          //   border-right: 0;
          // }
          /* &:nth-child(4n + 1):nth-last-child(-n + 4) {
              border-bottom: 0;
              ~li {
                border-bottom: 0;
              }
            } */
        }
      }
      .note {
        position: absolute;
        right: 5px;
        top: 0;
        color: #ccc;
      }
    }
    // 模态框样式
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
  .ud-selectBox {
    $gray: #a0a0a0;
    position: relative;
    display: inline-block;
    .ud-input {
      height: 25px;
      width: 50px;
      color: $gray;
      border: 1px solid $gray;
      padding: 0 5px;
      border-radius: 5px;
    }
    .contentBox {
      position: absolute;
      width: 80px*5;
      background: #fff;
      color: #3d85ff;
      font-weight: 14px;
      transform: translate(-40%);
      display: none;
    }
    &:hover {
      .ud-input {
        border-color: $orange;
      }
      .contentBox {
        display: block;
      }
    }
    ul {
      list-style: none;
      padding: 6px 30px;
      margin: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      box-shadow: 0px 3px 11px -3px rgba(0, 0, 0, 0.5);
    }
    li {
      display: inline-block;
      line-height: 34px;
      cursor: pointer;
      padding: 0 10px;
    }
  }
}
</style>
<style lang="scss">
$gray: #a0a0a0;
$orange: #fccf00;
.account {
  .el-card {
    padding-bottom: 0;
    border: 0;
    font-size: 15px;
    color: $gray;
    box-shadow: 0 8px 7px -5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 8px 7px -5px rgba(0, 0, 0, 0.2);
  }

  .el-button--info {
    color: #fff;
    // background-color: $gray;
    // border-color: $gray;
    width: 75px;
    padding: 1px;
  }

  .el-card__body {
    padding: 0;
    height: 100%;
  }

  .el-dialog {
    width: 30%;
  }
}
</style>
