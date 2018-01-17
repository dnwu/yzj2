<template>
  <div class="son_account">
    <header class="is-flex ali-center header">
      <h4>子账号管理</h4>
    </header>
    <section class="main">
      <div class="linear-gradient"></div>
      <div class="is-flex jst-between big-card">
        <div class="head-img"></div>
        <div class="account-msg is-flex dir-column">
          <div class="card-wrap is-flex" v-for="item in msg">
            <span class="msg name text-jst" v-text="item.name"></span>
            <span class="dot">:</span>
            <span class="value" v-text="item.value"></span>
          </div>
        </div>
        <div class="account-info is-flex dir-column">
          <div class="card-wrap is-flex" v-for="item in info">
            <span class="msg name text-jst" v-text="item.name"></span>
            <span class="dot">:</span>
            <span class="value" v-text="item.value"></span>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="is-flex jst-between ali-center title">
          <span class="wide wide1"></span>
          <span class="wide wide2">用户名</span>
          <span class="wide wide3">姓名</span>
          <span class="wide wide4">手机号</span>
          <span class="wide wide5">邮箱</span>
          <span class="wide wide6">身份证</span>
          <span class="wide wide7">创建时间</span>
          <span class="wide wide8">
            <img class="btn" src="../../../assets/son_add.png" alt="" @click="dialogVisible = true">
          </span>
        </div>
        <div class="contain">
          <ul>
            <li class="is-flex jst-between ali-center card" v-for="(list,index) in listsFilters">
              <span class="wide wide1">
                <div :class="['circle',color[list.accountStatus]]"></div>
              </span>
              <span class="wide wide2" v-text="list.account"></span>
              <span class="wide wide3" v-text="list.fullName"></span>
              <span class="wide wide4" v-text="list.phone"></span>
              <span class="wide wide5" v-text="list.email"></span>
              <span class="wide wide6" v-text="list.identityCard"></span>
              <span class="wide wide7" v-text="list.createtime"></span>
              <span class="wide8 is-flex jst-right">
                <!-- <img class="btn" src="../../../assets/son_modify.png" alt=""> -->
                <img class="btn" src="../../../assets/son_state_1.png" alt="" v-show="list.accountStatus == 2 " @click="changeStatus(list.id,list.accountStatus)">
                <img class="btn" src="../../../assets/son_stop.png" alt="" v-show="list.accountStatus == 1 " @click="changeStatus(list.id,list.accountStatus)">
                <img class="btn" src="../../../assets/son_delete.png" alt="" @click="delAccount(list.id)">
              </span>
            </li>
          </ul>
          <el-pagination class="is-flex jst-center" layout="prev, pager, next" :total="total" :page-size="size" :current-page="pageIndex"
            @current-change="changePage">
          </el-pagination>
        </div>
      </div>
    </section>

    <!-- <div v-show="dialogVisible" class="dialog">
      <header class="dialog-header is-flex jst-between ali-center">
        <div class="dialog-title">
          <i class="el-icon-plus"></i> 添加子账号
        </div>
        <i class="btn el-icon-close" @click="dialogVisible = false"></i>
      </header>
      <main class="content">
        <el-form :model="addAccountInfo" :rules="rules" ref="ruleForm">
          <ul>
            <li class="row is-flex jst-between">
              <div class="is-flex ali-center left no-border"></div>
              <div :class="['is-flex','ali-center','right',choose[1]]">
                <span class="name text-jst">姓名</span>
                <el-form-item prop="fullName">
                  <el-input v-model="addAccountInfo.fullName" @focus="fnChoose(1)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div :class="['is-flex','ali-center','left',choose[2]]">
                <span class="name text-jst">用户名</span>
                <el-form-item prop="account">
                  <el-input v-model="addAccountInfo.account" @focus="fnChoose(2)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[3]]">
                <span class="name text-jst">身份证</span>
                <el-form-item prop="identityCard">
                  <el-input v-model="addAccountInfo.identityCard" @focus="fnChoose(3)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div :class="['is-flex','ali-center','left',choose[4]]">
                <span class="name text-jst">登陆密码</span>
                <el-form-item prop="password">
                  <el-input type="password" v-model="addAccountInfo.password" @focus="fnChoose(4)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[5]]">
                <span class="name text-jst">手机号</span>
                <el-form-item prop="phone">
                  <el-input v-model="addAccountInfo.phone" @focus="fnChoose(5)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div  :class="['is-flex','ali-center','left',choose[6]]">
                <span class="name text-jst">确认密码</span>
                <el-form-item prop="secondPassword">
                  <el-input type="password" v-model="addAccountInfo.secondPassword" @focus="fnChoose(6)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[7]]">
                <span class="name text-jst">固定电话</span>
                <el-form-item prop="telephone">
                  <el-input v-model="addAccountInfo.telephone" @focus="fnChoose(7)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div class="is-flex ali-center left no-border"></div>
              <div :class="['is-flex','ali-center','right',choose[9]]">
                <span class="name text-jst">电子邮箱</span>
                <el-form-item prop="email">
                  <el-input v-model="addAccountInfo.email" @focus="fnChoose(9)"></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
        </el-form>
      </main>
      <footer>
        <div class="btn btn-add" @click="submitForm('ruleForm')">立即添加</div>
      </footer>
    </div> -->


    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <span slot="title" class="dialog-header">
        <i class="el-icon-plus"></i> 添加子账号
      </span>
      <main class="content">
        <el-form :model="addAccountInfo" :rules="rules" ref="ruleForm">
          <ul>
            <li class="row is-flex jst-between">
              <div class="is-flex ali-center left no-border"></div>
              <div :class="['is-flex','ali-center','right',choose[1]]">
                <span class="name text-jst">姓名</span>
                <el-form-item prop="fullName">
                  <el-input v-model="addAccountInfo.fullName" @focus="fnChoose(1)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div :class="['is-flex','ali-center','left',choose[2]]">
                <span class="name text-jst">用户名</span>
                <el-form-item prop="account">
                  <el-input v-model="addAccountInfo.account" @focus="fnChoose(2)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[3]]">
                <span class="name text-jst">身份证</span>
                <el-form-item prop="identityCard">
                  <el-input v-model="addAccountInfo.identityCard" @focus="fnChoose(3)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div :class="['is-flex','ali-center','left',choose[4]]">
                <span class="name text-jst">登陆密码</span>
                <el-form-item prop="password">
                  <el-input type="password" v-model="addAccountInfo.password" @focus="fnChoose(4)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[5]]">
                <span class="name text-jst">手机号</span>
                <el-form-item prop="phone">
                  <el-input v-model="addAccountInfo.phone" @focus="fnChoose(5)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div  :class="['is-flex','ali-center','left',choose[6]]">
                <span class="name text-jst">确认密码</span>
                <el-form-item prop="secondPassword">
                  <el-input type="password" v-model="addAccountInfo.secondPassword" @focus="fnChoose(6)"></el-input>
                </el-form-item>
              </div>
              <div :class="['is-flex','ali-center','right',choose[7]]">
                <span class="name text-jst">固定电话</span>
                <el-form-item prop="telephone">
                  <el-input v-model="addAccountInfo.telephone" @focus="fnChoose(7)"></el-input>
                </el-form-item>
              </div>
            </li>
            <li class="row is-flex jst-between">
              <div class="is-flex ali-center left no-border"></div>
              <div :class="['is-flex','ali-center','right',choose[9]]">
                <span class="name text-jst">电子邮箱</span>
                <el-form-item prop="email">
                  <el-input v-model="addAccountInfo.email" @focus="fnChoose(9)"></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
        </el-form>
      </main>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn btn-add" type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addAccountInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        fullName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          /* { min: 6, max: 60, message: '长度在 6 到 60 个字符之间', trigger: 'blur' } */
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          /* { min: 6, max: 20, message: '长度在 6 到 20 个字母数字组成', trigger: 'blur' } */
        ],
        secondPassword: [{ validator: validatePass, trigger: "blur" }],
        identityCard: [
          { required: false, message: "请输入真实身份证号", trigger: "blur" }
        ],
        phone: [{ required: false, message: "请输入手机号", trigger: "blur" }],
        telephone: [
          { required: false, message: "请输入固定电话", trigger: "blur" }
          /* { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" } */
        ],
        email: [{ required: false, message: "请输入邮箱", trigger: "blur" }]
      },
      msg: {
        memberName: {
          name: "会员名称",
          value: "深圳云捷讯"
        },
        memberNo: {
          name: "会员编码",
          value: "HH00001"
        },
        account: {
          name: "账号",
          value: "YOYO2017"
        }
      },
      info: {
        fullName: {
          name: "姓名",
          value: "王六"
        },
        phone: {
          name: "手机号",
          value: "17688772007"
        },
        email: {
          name: "邮箱",
          value: "lcy888@aliyun.com"
        }
      },
      lists: [
        /* {
           accountStatus: 0,
          account: "ske0001",
          fullName: "李大师",
          phone: "13528809121",
          email: "lcy888@aliyun.com",
          id: "lcy888@aliyun.com",
          createtime: "2017-05-05 12:00" 
        }*/
      ],
      color: {
        1: "green",
        2: "yellow"
      },
      dialogVisible: false,
      choose: [],
      addAccountInfo: {
        //新增子帐号信息
        fullName: "", // 姓名
        password: "", // 密码
        secondPassword: "", // 确认密码
        account: "", // 账号
        identityCard: "", // 身份证
        phone: "", // 手机号
        telephone: "", // 固定电话
        email: "" // 电子邮件
      },
      pageIndex: 1,
      size: 10,
      total: 0
    };
  },
  methods: {
    changePage(page) {
      // 分页切换赋值
      this.pageIndex = page;
    },
    fnChoose(index) {
      // 子账号添加，输入框选中时添加样式
      this.choose[index] = false;
      for (var i = -1; i < this.choose.length; i++) {
        this.choose[i] = false;
      }
      this.$set(this.choose, index, "choose");
    },
    getUserInfo() {
      // 获取用户信息
      var params = {
        id: this.id,
        token: this.token
      };
      var arr = ["msg", "info"];
      this.axios
        .post("/app/v1/user/userInfo", params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            var data = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              for (var name in this[arr[i]]) {
                this[arr[i]][name].value =
                  data[name] || data.level[name] || undefined;
              }
            }
          } else {
            this.$message({
              message: `获取会员信息失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    getAccountList() {
      // 获取子账号列表
      var params = {
        id: this.id,
        token: this.token,
        pageIndex: this.pageIndex,
        size: this.size
      };
      this.axios
        .post("/app/v1/subaccount/list", params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.total = res.data.total;
            var arr = res.data.hnaAccounts;
            this.lists = arr;
          } else {
            this.$message({
              message: `获取子账号失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addAccount();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addAccount() {
      // 添加子账号
      var params = {
        account: this.addAccountInfo.account,
        email: this.addAccountInfo.email,
        fullName: this.addAccountInfo.fullName,
        id: this.id,
        identityCard: this.addAccountInfo.identityCard,
        password: this.addAccountInfo.password,
        phone: this.addAccountInfo.phone,
        // subAccountId: 0, // 子帐号ID，修改时传入，新增时不传入参数,
        telephone: this.addAccountInfo.telephone,
        token: this.token
      };
      console.log(params);
      this.axios
        .post("/app/v1/subaccount/save", params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.dialogVisible = false;
            this.getAccountList();
            this.$message({
              message: "子账号保存成功",
              type: "success"
            });
          } else {
            this.$message({
              message: `子账号保存失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    changeStatus(accountId, status) {
      // 切花子账号启用或停用状态
      status = status == 2 ? 1 : 2;
      var params = {
        id: this.id,
        status: status,
        subAccountId: accountId,
        token: this.token
      };

      this.axios
        .post("/app/v1/subaccount/acstatus", params)
        .then(res => {
          if (res.data.code == 1) {
            this.getAccountList();
          } else {
            this.$message({
              message: `子账号状态修改失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    delAccount(accountId) {
      // 删除子账号
      var params = {
        id: this.id,
        recordId: accountId,
        token: this.token
      };
      this.axios
        .post("/app/v1/subaccount/del", params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.getAccountList();
          } else {
            this.$message({
              message: `子账号删除失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["id", "token"]),
    listsFilters() {
      // 过滤账户为3的用户，此为删除用户
      return this.lists.filter(item => {
        if (item.accountStatus == 3) {
          return false;
        }
        return true;
      });
    }
    /* fullName() {
      return this.dialogs[0].right.value; // 姓名
    },
    account() {
      return this.dialogs[1].left.value; // 用户名
    },
    identityCard() {
      return this.dialogs[1].right.value; // 身份证
    },
    password() {
      return this.dialogs[2].left.value; // 密码
    },
    phone() {
      return this.dialogs[2].right.value; // 手机号
    },
    telephone() {
      return this.dialogs[3].right.value; // 固定电话
    },
    email() {
      return this.dialogs[4].right.value; // 电子邮箱
    } */
  },
  mounted() {
    this.getUserInfo();
    this.getAccountList();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";
.green {
  background: green;
}

ul {
  padding-left: 0;
}

.son_account {
  color: $gray;
  .header {
    @include header;
  }
  .main {
    padding: 50px 30px 0;
    .linear-gradient {
      height: 3px;
      background: linear-gradient(
        45deg,
        $yellow 0%,
        $yellow 50%,
        $red 50%,
        $red 100%
      );
      background-size: 40px 3px;
    }
    .big-card {
      padding: 20px 200px 20px 150px;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
      .head-img {
        width: 100px;
        height: 100px;
        background-image: url("../../../assets/head_img.png");
        background-size: cover;
      }
      .msg {
        width: 80px;
        display: inline-block;
      }
      .account-msg {
        min-width: 180px;
      }
      .account-info {
        min-width: 350px;
      }
      .dot {
        margin: 0 20px 0 15px;
      }
    }
  }
  .wrap {
    padding-right: 20px;
    .title {
      padding: 20px 0;
      .add {
        display: inline-block;
        text-align: center;
        width: 20px;
        line-height: 20px;
        background: $yellow;
        color: white;
      }
    }
    .card {
      padding: 10px 0;
      box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
      .circle {
        margin: 0 auto;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .yellow {
        background: $yellow;
      }
      .green {
        background: $green;
      }
    }
    .wide {
      display: inline-block;
      text-align: center;
    }
    .wide1 {
      padding-left: 20px;
      width: 20px;
    }
    .wide2 {
      width: 100px;
    }
    .wide3 {
      width: 160px;
    }
    .wide4 {
      width: 160px;
    }
    .wide5 {
      width: 150px;
    }
    .wide6 {
      width: 180px;
    }
    .wide7 {
      width: 180px;
    }
    .wide8 {
      text-align: right;
      width: 80px;
      img {
        margin-right: 20px;
      }
    }
  }
  .dialog {
    .dialog-header {
      /* background: $yellow;
      padding: 10px 20px;
      color: white; */
    }
    .content {
      padding: 0 40px;
    }
    .row {
      .name {
        display: inline-block;
        width: 80px;
        height: 18px;
        padding-right: 10px;
      }
      .left,
      .right {
        border-bottom: 1px solid $gray;
        margin-bottom: 35px;
      }
      .no-border {
        border-bottom: 0;
      }
      .left {
        width: 400px;
      }
      .right {
        width: 400px;
      }
      .tip {
        width: 40px;
        margin-right: 5px;
      }
      .tel-wide {
        width: 125px;
      }
      .choose {
        border-color: $yellow;
        .name {
          color: $yellow;
        }
        .el-input .el-input__inner {
          color: $yellow !important;
          background: red;
        }
        input::-webkit-input-placeholder {
          color: $yellow;
        }
      }
    }
    .btn-add {
      width: 150px;
      height: 20px;
      margin: 0 auto;
      color: white;
      background: $yellow;
      text-align: center;
      box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
<style lang="scss">
.son_account {
  .dialog {
    .el-input__inner {
      vertical-align: middle;
      border: 0;
      height: 30px;
    }
    .choose {
      .el-input .el-input__inner {
        color: #fccf00;
      }
    }
    .el-form-item {
      margin-bottom: 0;
      width: 100%;
    }

    .el-dialog__header {
      background: #fccf00;
      padding: 10px 20px;
      color: white;
      font-size: 18px;
      .el-dialog__headerbtn .el-dialog__close {
        color: white;
      }
    }
    .el-dialog__footer {
      text-align: center;
      .el-button {
        margin: 0 auto;
        box-sizing: content-box;
        padding: 3px 20px;
      }
      .el-button--primary {
        border: 0;
      }
    }
  }
}
</style>
