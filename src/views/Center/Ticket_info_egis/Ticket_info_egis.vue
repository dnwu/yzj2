<template>
<div class="ticket_info_egis">
  <header class="is-flex ali-center header">
    <h4>开票信息维护</h4>
  </header>
  <section class="main is-flex">
    <div class="card is-relative">
      <div class="is-flex row">
        <span class="text-jst name">企业名称:</span>
        <span class="value" v-text="info.companyName"></span>
        <span class="text-jst name">开户行:</span>
        <span class="value" v-text="info.bankName"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">纳税人识别号:</span>
        <span class="value" v-text="info.taxpayerNo"></span>
        <span class="text-jst name">开户行账号:</span>
        <span class="value" v-text="info.bankCard"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">注册地址:</span>
        <span class="value" v-text="info.registerAddress"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">联系电话:</span>
        <span class="value" v-text="info.telephone"></span>
      </div>
      <div class="is-flex row"></div>
      <div class="is-flex row">
        <span class="text-jst name">开票人:</span>
        <span class="value" v-text="info.issuerName"></span>
        <span class="text-jst name">开票人电话:</span>
        <span class="value" v-text="info.issuerMobile"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">开票人地址:</span>
        <span class="value" v-text="info.issuerAddress"></span>
      </div>
      <div class="border border-left"></div>
      <div class="border border-right"></div>
      <img class="edit" src="../../../assets/son_modify.png"  @click="dialogVisible = true" alt="">
    </div>
  </section>

  <!-- <div v-show="dialogVisible" class="dialog">
      <header class="dialog-header is-flex jst-between ali-center">
        <div class="dialog-title">
          <img class="text-middle" src="../../../assets/ticket_info_modify.png" alt="">
          <span>开票信息修改</span>
        </div>
        <i class="el-icon-close" @click="dialogVisible = false"></i>
      </header>
      <main class="contain">
        <div class="is-flex dir-column">
          <div class="is-flex row">
            <span class="text-jst name">企业名称:</span>
            <input class="value text-middle" v-model="edit.companyName"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">纳税人识别号:</span>
            <input class="value" v-model="edit.taxpayerNo"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">注册地址:</span>
            <input class="value" v-model="edit.registerAddress"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">联系电话:</span>
            <input class="value" v-model="edit.telephone"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开户行:</span>
            <input class="value" v-model="edit.bankName"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开户行账号:</span>
            <input class="value" v-model="edit.bankCard"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人:</span>
            <input class="value" v-model="edit.issuerName"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人电话:</span>
            <input class="value" v-model="edit.issuerMobile"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人地址:</span>
            <input class="value" v-model="edit.issuerAddress"></input>
          </div>
        </div>
      </main>
      <footer>
        <div class="btn btn-save" @click="save">保存</div>
      </footer>
  </div> -->


  <el-dialog
    class="dialog"
    :visible.sync="dialogVisible"
    width="1000px"
  >
    <span slot="title" class="dialog-header">
      <img class="text-middle" src="../../../assets/ticket_info_modify.png" alt="">
      <span>开票信息修改</span>
    </span>
    <main class="contain">
      <div class="is-flex dir-column">
        <div class="is-flex row">
          <span class="text-jst name">企业名称:</span>
          <input class="value text-middle" v-model="edit.companyName"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">纳税人识别号:</span>
          <input class="value" v-model="edit.taxpayerNo"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">注册地址:</span>
          <input class="value" v-model="edit.registerAddress"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">联系电话:</span>
          <input class="value" v-model="edit.telephone"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">开户行:</span>
          <input class="value" v-model="edit.bankName"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">开户行账号:</span>
          <input class="value" v-model="edit.bankCard"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">开票人:</span>
          <input class="value" v-model="edit.issuerName"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">开票人电话:</span>
          <input class="value" v-model="edit.issuerMobile"></input>
        </div>
        <div class="is-flex row">
          <span class="text-jst name">开票人地址:</span>
          <input class="value" v-model="edit.issuerAddress"></input>
        </div>
      </div>
    </main>
    <span slot="footer" class="dialog-footer">
      <el-button class="btn btn-save" type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      info: {
        /* companyName: "深圳运捷讯信息系统有限公司",
        bankName: "中国建设银行",
        taxpayerNo: "914421235836327",
        bankCard: "12321334435455453",
        registerAddress: "深圳市福田区深南中路求是大厦1122",
        telephone: "0755-66668888",
        issuerName: "刘某人",
        issuerMobile: "13628809128",
        issuerAddress: "北京市朝阳区建国路" */
      },
      edit: {}
    };
  },
  methods: {
    createArrayFromJson(arr, json) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var obj = {};
        for (var name in json) {
          obj[json[name]] = arr[i][name];
        }
        newArr.push(obj);
      }
      return newArr;
    },
    save() {
      this.axios
        .post("/app/v1/invoice/saveInvoice", this.edit)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.check();
            this.dialogVisible = false;
          } else {
            this.$message({
              message: `开票信息保存失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    check() {
      this.axios
        .post("/app/v1/invoice/getInvoice", {
          id: this.id,
          token: this.token
        })
        .then(res => {
          if (res.data.code == 1) {
            this.info = res.data.data || {};
            for (var name in this.info) {
              this.edit[name] = this.info[name];
            }
            this.edit.id = this.id;
            this.edit.token = this.token;
          } else {
            this.$message({
              message: `开票信息查询失败(${res.data.msg})`,
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
    ...mapGetters(["token", "id"])
  },
  mounted() {
    this.check();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";
.border {
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  background-size: 10px 10px;
}
$colorRight: #e2e2e2;
$colorLeft: #f2f2f2;
.border-right {
  right: 0;
  background-image: linear-gradient(
      -45deg,
      $colorRight 50%,
      transparent 50%,
      transparent
    ),
    linear-gradient(45deg, transparent 50%, $colorRight 50%);
}
.border-left {
  left: 0;
  background-image: linear-gradient(
      45deg,
      $colorLeft 25%,
      transparent 25%,
      transparent
    ),
    linear-gradient(-45deg, transparent 75%, $colorLeft 75%);
}
.header {
  @include header;
}
.main {
  color: $gray;
  padding: 10px 50px 0;
  .card {
    box-shadow: 3px 0px 8px 1px rgba(0, 0, 0, 0.1);
    padding: 40px 0 20px 80px;
    .edit {
      position: absolute;
      top: 10px;
      right: 30px;
    }
  }
  .row {
    height: 25px;
    .name {
      width: 90px;
      margin-right: 50px;
    }
    .value {
      width: 400px;
    }
  }
}
.dialog {
  /* position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  background: white;
  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1); */
  /* .dialog-header {
    background: $yellow;
    padding: 10px 20px;
    color: white;
    font-size: 18px;
  } */
  .contain {
    color: $gray;
    margin-left: 330px;
    .row {
      margin-top: 20px;
      height: 20px;
    }
    .name {
      width: 90px;
      margin-right: 50px;
    }
    .value {
      width: 280px;
      border: 0;
    }
    input {
      color: $gray;
    }
  }
  .btn-save {
    padding: 2px 0;
    width: 180px;
    height: 20px;
    margin: 40px auto;
    color: white;
    background: $yellow;
    text-align: center;
    box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>
<style lang="scss">
.ticket_info_egis {
  .dialog {
    .el-input__inner {
      vertical-align: middle;
      border: 0;
      height: 30px;
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
