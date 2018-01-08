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
        <span class="wide wide8"></span>
      </div>
      <div class="contain">
        <ul>
          <li class="is-flex jst-between ali-center card" v-for="(list,index) in lists">
            <span class="wide wide1">
              <div :class="['circle',color[list.state]]"></div>
            </span>
            <span class="wide wide2" v-text="list.account"></span>
            <span class="wide wide3" v-text="list.name"></span>
            <span class="wide wide4" v-text="list.tel"></span>
            <span class="wide wide5" v-text="list.email"></span>
            <span class="wide wide6" v-text="list.id"></span>
            <span class="wide wide7" v-text="list.time"></span>
            <span class="wide8 is-flex jst-around">
              <img src="../../../assets/anew_icon.png" alt="">
              <i class="el-icon-caret-right" v-show="!list.state" @click="cutState(index)"></i>
              <i class="el-icon-close" v-show="list.state" @click="cutState(index)"></i>
              <img src="../../../assets/delete_icon.png" alt="">
            </span>
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
    return {
      msg: {
        member: {
          name: "会员名称",
          value: "深圳云捷讯"
        },
        code: {
          name: "会员编码",
          value: "HH00001"
        },
        account: {
          name: "账号",
          value: "YOYO2017"
        }
      },
      info: {
        name: {
          name: "姓名",
          value: "王六"
        },
        tel: {
          name: "手机号",
          value: "17688772007"
        },
        emali: {
          name: "邮箱",
          value: "lcy888@aliyun.com"
        }
      },
      lists: [
        {
          state: true,
          account: "ske0001",
          name: "李大师",
          tel: "13528809121",
          email: "lcy888@aliyun.com",
          id: "lcy888@aliyun.com",
          time: "2017-05-05 12:00"
        }
      ],
      color: {
        true: "green",
        false: "yellow"
      }
    };
  },
  methods: {
    cutState(index) {
      this.lists[index].state = !this.lists[index].state;
    }
  }
};
</script>
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
    .linear-gradient {
      height: 3px;
      background: linear-gradient(
        45deg,
        yellow 0%,
        yellow 50%,
        red 50%,
        red 100%
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
    .title {
      padding: 20px 0;
    }
    .card {
      padding-bottom: 10px;
      box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
      .circle {
        margin: 0 auto;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .yellow {
        background: #fccf00;
      }
      .green {
        background: #7ac943;
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
      padding-right: 20px;
      width: 100px;
    }
  }
}
</style>
<style lang="scss" scoped>
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