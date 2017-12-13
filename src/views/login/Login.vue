<template>
<div class="loginindex">
  <div class="head">
    <div class="center">
      <img @click="goto('/home')" src="../../assets/login_logo.png" alt="">
      <span>欢迎登录</span>
    </div>
  </div>
  <div class="main center">
    <router-view></router-view>
  </div>
  <div class="foot">
    <div class="center">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>人才招聘</li>
        <li>商家入驻</li>
        <li>广告服务</li>
        <li>友情链接</li>
        <li>网址链接</li>
      </ul>
      <p>免责声明&nbsp;|&nbsp;版权公告&copy;201×-2017扬子江航空货运控股有限责任公司及/或其关联公司及特许人。版权所有</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  width: 1200px;
  margin: 0 auto;
}
.loginindex {
  height: 100%;
  .head {
    height: 100px;
    background-color: #fccf00;
    margin-bottom: -100px;
    position: relative;
    z-index: 9;
    img {
      vertical-align: middle;
      transform: translateY(-12%);
      cursor: pointer;
    }
    span {
      line-height: 100px;
      height: 100px;
      display: inline-block;
      font-size: 30px;
      color: #fff;
      font-weight: 500;
      margin-left: 30px;
    }
  }
  .main {
    background-color: #fff;
    min-height: 100%;
    padding: 200px 100px;
    box-sizing: border-box;
  }
  .foot {
    height: 100px;
    margin-top: -100px;
    .center {
      display: table;
      ul {
        display: flex;
        list-style: none;
        li {
          flex: 1;
          text-align: center;
          position: relative;
          color: #e0e0e0;
          &::before {
            content: "";
            display: inline-block;
            width: 2px;
            height: 100%;
            position: absolute;
            left: 0;
            background-color: #e0e0e0;
          }
          &:first-child::before {
            display: none;
          }
        }
      }
      p {
        text-align: center;
        color: #e0e0e0;
      }
    }
  }
}
</style>
