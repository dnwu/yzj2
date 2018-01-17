<template>
  <div class="company-info">
    <div class="is-flex header">
      <span class="info">企业信息</span>
      <span class="btn btn-apply" v-if="isApply == false" v-show="!edit" @click="edit = true">完善企业信息</span>
      <span class="btn btn-apply" v-if="isApply == false" v-show="edit" @click="saveInfo">保存</span>
      <span :class="['btn','btn-apply',{'is-no-apply':isApply===1}]" v-if="isApply !== 2 && isApply !== 3" @click="submit">企业注册申请</span>
    </div>
    <div class="main">
      <section class="card">
        <header class="is-flex card-head">公司基本信息</header>
        <main class="is-flex card-body">
          <ul class="card-left">
            <my-li ref="info1" :info="info1" :edit="edit" :width="widthLeft" @fileChange="fileChange"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="info2" :info="info2" :edit="edit" :width="widthRight" @fileChange="fileChange"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card card-two">
        <header class="is-flex card-head">公司税务登记证</header>
        <main class="is-flex card-body">
          <ul class="card-left info-justify-font">
            <my-li ref="tax1" :info="tax1" :edit="edit" :width="widthLeft" @fileChange="fileChange"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="tax2" :info="tax2" :edit="edit" :width="widthRight" @fileChange="fileChange"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card">
        <header class="is-flex card-head">开户银行许可证</header>
        <main class="is-flex card-body">
          <ul class="card-left">
            <my-li ref="paper1" :info="paper1" :edit="edit" :width="widthLeft" @fileChange="fileChange"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="paper2" :info="paper2" :edit="edit" :width="widthRight" @fileChange="fileChange"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card card-two">
        <header class="is-flex card-head">联系人信息</header>
        <main class="is-flex card-body">
          <ul class="card-left info-justify-font">
            <my-li ref="msg1" :info="msg1" :edit="edit" :width="widthLeft" @fileChange="fileChange"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="msg2" :info="msg2" :edit="edit" :width="widthRight" @fileChange="fileChange"></my-li>
          </ul>
        </main>
      </section class="card">
    </div>
  </div>
</template>
<script>
import Li from "./li";
import { mapGetters } from "vuex";
export default {
  components: {
    "my-li": Li
  },
  data() {
    return {
      isApply: false, // 认证状态 1：待认证 2：通过 3：拒绝,
      edit: false, // 是否可以编辑状态
      widthLeft: 300, // 企业信息左栏宽度控制（提供给Li组件使用，进行统一修改）
      widthRight: 280, // 企业信息右栏宽度控制（提供给Li组件使用，进行统一修改）
      // 下面数据均为企业信息内容
      info1: {
        enterpriseName: {
          name: "公司名称",
          value: ""
        },
        enterpriseLicenseImgs: {
          name: "营业执照号",
          value: ""
        },
        legalName: {
          name: "法人代表",
          value: ""
        },
        identityCard: {
          name: "身份证号码",
          value: ""
        },
        identityCardImgFile: {
          /* ------------------------------------------------------ */
          name: "身份证电子版",
          value: "",
          file: true
        },
        organizationCode: {
          name: "组织机构代码",
          value: ""
        },
        codeCertificate: {
          name: "组织机构代码证有效期 ",
          value: ""
        },
        electronicVersionFile: {
          /* ------------------------------------------------------ */
          name: "组织机构代码证电子版",
          value: "",
          file: true
        }
      },
      info2: {
        businessLocation: {
          name: "营业执照所在地",
          value: ""
        },
        detailAddress: {
          name: "详细地址",
          value: ""
        },
        businessTerm: {
          name: "营业期限",
          value: ""
        },
        registeredCapital: {
          name: "注册资金",
          value: ""
        },
        businessScope: {
          name: "经营范围",
          value: ""
        },
        licenseElectronicFile: {
          /* ------------------------------------------------------ */
          name: "营业执照电子版",
          value: "",
          file: true
        }
      },
      tax1: {
        taxpayerNumber: {
          name: "纳税人识别号",
          value: ""
        }
      },
      tax2: {
        taxCertificateFile: {
          /* ------------------------------------------------------ */
          name: "税务登记证电子版",
          value: "",
          file: true
        },
        taxpayerCertificateFile: {
          /* ------------------------------------------------------ */
          name: "一般纳税人资格证电子版",
          value: "",
          file: true
        }
      },
      paper1: {
        bankAccountName: {
          name: "银行开户名",
          value: ""
        },
        bankBranch: {
          name: "开户银行支行名称",
          value: ""
        },
        bankLicenseFile: {
          /* ------------------------------------------------------ */
          name: "银行开户许可证电子版",
          value: "",
          file: true
        }
      },
      paper2: {
        corporateBankAccount: {
          name: "公司银行账户",
          value: ""
        },
        branchAddress: {
          name: "开户银行支行所在地",
          value: ""
        }
      },
      msg1: {
        contactName: {
          name: "联系人姓名",
          value: ""
        }
      },
      msg2: {
        contactPohone: {
          name: "联系人手机",
          value: ""
        },
        contactEmail: {
          name: "联系人邮箱",
          value: ""
        }
      },
      arr: [
        "info1",
        "info2",
        "tax1",
        "tax2",
        "paper1",
        "paper2",
        "msg1",
        "msg2"
      ],
      param: {
        // 发送请求所需要的参数，后续会将上面的多个不同对象的绑定数据进行汇总，li.vue的文件上传将直接修改此对象
        accountId: 0,
        bankAccountName: "string",
        bankBranch: "string",
        bankLicense: "string",
        bankLicenseFile: "file",
        branchAddress: "string",
        businessLocation: "string",
        businessScope: "string",
        businessTerm: "string",
        codeCertificate: "string",
        contactEmail: "string",
        contactName: "string",
        contactPohone: "string",
        corporateBankAccount: "string",
        detailAddress: "string",
        electronicVersion: "string",
        electronicVersionFile: "file",
        enterpriseLicenseCode: "string",
        enterpriseLicenseImgs: "string",
        enterpriseName: "string",
        id: 0,
        identityCard: "string",
        identityCardImg: "string",
        identityCardImgFile: "file",
        legalName: "string",
        licenseElectronic: "string",
        licenseElectronicFile: "file",
        organizationCode: "string",
        registeredCapital: "string",
        remarks: "string",
        taxCertificate: "string",
        taxCertificateFile: "file",
        taxpayerCertificate: "string",
        taxpayerCertificateFile: "file",
        taxpayerNumber: "string",
        token: "string"
      }
    };
  },
  methods: {
    fileChange(name, file) {
      // 该方法由子组件进行调用（用于传递文件数据），将对param对象中的对应文件对象进行赋值操作
      this.param[name] = file;
    },
    submit() {
      // 企业注册申请，提示权限
      // 判断用户申请状态，避免按钮重复请求
      if (this.isApply != 1) {
        this.$confirm("请务必保证企业信息填写正确性和完整性，<br>申请后将不能再次修改", "提示", {
          confirmButtonText: "继续申请",
          cancelButtonText: "再次检查",
          type: "warning",
          dangerouslyUseHTMLString: true
        })
          .then(() => {
            this.apply();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消企业申请"
            });
          });
      }
    },
    apply() {
      // 企业注册申请
      this.axios
        .post("/app/v1/enterprise/apply", {
          id: this.id,
          token: this.token
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: "企业申请替提交成功，请耐心等待",
              type: "success"
            });
            this.edit = false;
          } else {
            this.$message({
              message: `企业申请替提交失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    getAuthStatus() {
      // 进入页面查询用户当前权限状态 // 控制按钮的可执行状态
      this.axios
        .post("/app/v1/user/userInfo", {
          id: this.id,
          token: this.token
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            var status = res.data.data.authStatus;
            this.isApply = status || false;
          } else {
            this.$message({
              message: `用户状态获取失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    showInfo() {
      // 获取企业信息
      this.axios
        .post("/app/v1/enterprise/info", {
          id: this.id,
          token: this.token
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            if (res.data.hnaEnterprise) {
              var data = res.data.hnaEnterprise;
              var arr = this.arr;
              console.log(data);
              for (var i = 0; i < arr.length; i++) {
                for (var name in this[arr[i]]) {
                  if (data[name]) {
                    this[arr[i]][name].value = data[name];
                  }
                }
              }
            } else {
              this.$message({
                message: "请完善企业信息",
                type: "success"
              });
            }
          } else {
            this.$message({
              message: `企业信息获取失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    saveInfo() {
      // 保存企业信息
      var arr = this.arr;

      for (var i = 0; i < arr.length; i++) {
        // 数据绑定用了多个对象进行数据绑定和渲染，通过循环汇总所有参数
        for (var name in this[arr[i]]) {
          if (this.param[name] && !this.param[name].uid) {
            // 更具当前对象是否具有uid属性判断是否是文件对象，是的话则不处理该对象，文件对象的赋值直接有li.vue通过触发父组件的onChang方法直接对参数对象进行修改
            var obj = this[arr[i]][name];
            this.param[name] = obj.value || "";
          }
        }
      }

      // 赋值所需权限参数
      this.param.id = this.id;
      /* this.param.accountId = this.infoId; */
      this.param.token = this.token;
      /* this.param.enterpriseLicenseCode = this.code; */

      // 暂时不传文件对象，直接删除，需要文件，直接注释即可；
      delete this.param.bankLicenseFile;
      delete this.param.electronicVersionFile;
      delete this.param.identityCardImgFile;
      delete this.param.licenseElectronicFile;
      delete this.param.taxCertificateFile;
      delete this.param.taxpayerCertificateFile;

      console.log(this.param);

      this.axios
        .post("/app/v1/enterprise/save", this.param)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.edit = false;
          } else {
            this.$message({
              message: `保存失败(${res.data.msg})`,
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
    ...mapGetters(["id", "token"])
  },
  mounted() {
    this.showInfo();
    this.getAuthStatus();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";
.is-flex {
  display: flex;
}

ul {
  padding-left: 0;
}

.company-info {
  width: 90%;
  .el-icon-picture {
    vertical-align: middle;
  }
}

$orange: #fccf00;
.header {
  $bth-height: 12px;
  padding-right: 50px;
  @include header;
  align-items: center;
  justify-content: space-between;
  .info {
    flex: 1;
  }
  .btn-apply {
    width: 100px;
    margin: 0 10px;
    padding: 4px 10px;
    line-height: $bth-height;
    background: $orange;
    border-radius: 3px;
    color: #feffe1;
    box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.1);
  }
}

$font-height: 18px;
@mixin font {
  text-align: justify;
  height: $font-height;
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

.main {
  $gap: 10px;
  padding: $gap;
  .card {
    $radius: 3px;
    margin-bottom: $gap*2;
    .card-head {
      align-items: center;
      padding-left: 10px;
      color: white;
      height: 30px;
      background: $orange;
      border-radius: $radius;
    }
    .card-body {
      justify-content: space-between;
      border-radius: $radius;
      box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.1);
      color: #888;
      font-size: $font-height - 3;
    }
    .card-left {
      margin-left: 20px;
    }

    .card-right {
      margin-right: 50px;
    }
  }
}

.info-justify-font {
  display: flex;
  align-items: center;
}

.is-no-apply {
  cursor: not-allowed;
}
</style>
