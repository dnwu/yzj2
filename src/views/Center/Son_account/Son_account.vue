<template>
<div class="son_account">
  <header class="is-flex ali-center header">
    <h4>子账号管理</h4>
  </header>
  <section class="main">
    <div class="is-flex jst-around big-card">
      <div class="head-img"></div>
    </div>
    <div class="wrap">
      <div class="is-flex jst-between ali-center title">
        <span class="wide wide1"></span>
        <span class="wide wide2"></span>
        <span class="wide wide3"></span>
        <span class="wide wide4"></span>
        <span class="wide wide5"></span>
        <span class="wide wide6"></span>
        <span class="wide wide7"></span>
        <span class="wide wide8"></span>
      </div>
      <div class="contain">
        <ul>
          <li class="is-flex jst-between ali-center card">
            <span class="wide wide1"></span>
            <span class="wide wide2"></span>
            <span class="wide wide3"></span>
            <span class="wide wide4"></span>
            <span class="wide wide5"></span>
            <span class="wide wide6"></span>
            <span class="wide wide7"></span>
            <span class="wide wide8"></span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
/* flex */

.is-flex {
  display: flex;
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

.text-top {
  vertical-align: top;
}

.text-middle {
  vertical-align: middle;
}

.text-bottom {
  vertical-align: bottom;
}

/* 颜色类 */
</style>
<style lang="scss" scoped>
.green {
  background: green;
}

ul {
  padding-left: 0;
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

.son_account {
  .header {
    @include header;
  }
  .main {
    padding: 50px 30px 0;
    .big-card {
      padding: 50px 0;
      box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
    .head-img {
      width: 100px;
      height: 100px;
      background-image: url("../../../assets/head_img.png");
      background-size: cover;
    }
  }
}
</style>
