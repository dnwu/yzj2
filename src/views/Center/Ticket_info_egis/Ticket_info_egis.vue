<template>
<div class="ticket_info_egis">
  <header class="is-flex ali-center header">
    <h4>开票信息维护</h4>
  </header>
  <section class="main is-flex">
    <div class="card is-relative">
      <div class="is-flex row">
        <span class="text-jst name">企业名称:</span>
        <span class="value" v-text="info.name"></span>
        <span class="text-jst name">开户行:</span>
        <span class="value" v-text="info.bank"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">纳税人识别号:</span>
        <span class="value" v-text="info.taxNum"></span>
        <span class="text-jst name">开户行账号:</span>
        <span class="value" v-text="info.account"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">注册地址:</span>
        <span class="value" v-text="info.address"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">联系电话:</span>
        <span class="value" v-text="info.tel"></span>
      </div>
      <div class="is-flex row"></div>
      <div class="is-flex row">
        <span class="text-jst name">开票人:</span>
        <span class="value" v-text="info.taxPayer"></span>
        <span class="text-jst name">开票人电话:</span>
        <span class="value" v-text="info.payerTel"></span>
      </div>
      <div class="is-flex row">
        <span class="text-jst name">开票人地址:</span>
        <span class="value" v-text="info.payerAdress"></span>
      </div>
      <div class="border border-left"></div>
      <div class="border border-right"></div>
      <img class="edit" src="../../../assets/son_modify.png"  @click="dialogVisible = true" alt="">
    </div>
  </section>

  <div v-show="dialogVisible" class="dialog">
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
            <input class="value text-middle" v-model="edit.name"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">纳税人识别号:</span>
            <input class="value" v-model="edit.taxNum"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">注册地址:</span>
            <input class="value" v-model="edit.address"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">联系电话:</span>
            <input class="value" v-model="edit.tel"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开户行:</span>
            <input class="value" v-model="edit.bank"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开户行账号:</span>
            <input class="value" v-model="edit.account"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人:</span>
            <input class="value" v-model="edit.taxPayer"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人电话:</span>
            <input class="value" v-model="edit.payerTel"></input>
          </div>
          <div class="is-flex row">
            <span class="text-jst name">开票人地址:</span>
            <input class="value" v-model="edit.payerAdress"></input>
          </div>
        </div>
      </main>
      <footer>
        <div class="btn-save">保存</div>
      </footer>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      info: {
        name: "深圳运捷讯信息系统有限公司",
        bank: "中国建设银行",
        taxNum: "914421235836327",
        account: "12321334435455453",
        address: "深圳市福田区深南中路求是大厦1122",
        tel: "0755-66668888",
        taxPayer: "刘某人",
        payerTel: "13628809128",
        payerAdress: "北京市朝阳区建国路"
      },
      edit: {}
    };
  },
  methods: {},
  mounted() {
    for (var name in this.info) {
      this.edit[name] = this.info[name];
    }
  }
};
</script>
<style lang="scss" scoped>
.border {
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  background-size: 10px 10px;
}
.border-right {
  right: 0;
  background-image: linear-gradient(
      -45deg,
      #e2e2e2 50%,
      transparent 50%,
      transparent
    ),
    linear-gradient(45deg, transparent 50%, #e2e2e2 50%);
}
.border-left {
  left: 0;
  background-image: linear-gradient(
      45deg,
      #f2f2f2 25%,
      transparent 25%,
      transparent
    ),
    linear-gradient(-45deg, transparent 75%, #f2f2f2 75%);
}
@mixin header {
  height: 61px;
  align-items: center;
  padding-left: 20px;
  color: #b3b3b3;
  h4 {
    font-weight: normal;
  }
}
.header {
  @include header;
}
.main {
  color: #999999;
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
$yellow: #fccf00;
.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  background: white;
  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
  .dialog-header {
    background: $yellow;
    padding: 10px 20px;
    color: white;
    font-size: 18px;
  }
  .contain {
    color: #999999;
    margin-left: 370px;
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
      color: #999999;
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
<style lang="scss" scoped>
.is-relative {
  position: relative;
}
/* flex */

.is-flex {
  display: flex;
}

.dir-row {
  flex-direction: row;
}

.dir-column {
  flex-direction: column;
}

.jst-around {
  justify-content: space-around;
}

.jst-between {
  justify-content: space-between;
}

.ali-left {
  align-items: left;
}
.ali-center {
  align-items: center;
}
.ali-right {
  align-items: right;
}

/* display */

.is-block {
  display: block;
}

.is-none {
  display: none;
}

.is-inline-block {
  display: inline-block;
}

/* text */

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-jst {
  text-align: justify;
}

.text-jst:after {
  content: "";
  display: inline-block;
  width: 100%;
  overflow: hidden;
  height: 0;
}

.text-top {
  vertical-align: text-top;
}

.text-middle {
  vertical-align: middle;
}

.text-bottom {
  vertical-align: text-bottom;
}

/* 颜色类 */
</style>
