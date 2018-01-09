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
      <img class="edit" src="../../../assets/son_modify.png" alt="">
    </div>
  </section>
</div>
</template>
<script>
export default {
  data() {
    return {
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
      }
    };
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
