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
            <img src="../../../assets/son_add.png" alt="" @click="dialogVisible = true">
          </span>
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
              <span class="wide8 is-flex jst-between">
                <img src="../../../assets/son_modify.png" alt="">
                <img src="../../../assets/son_state_1.png" alt="" v-show="!list.state" @click="cutState(index)">
                <img src="../../../assets/son_stop.png" alt="" v-show="list.state" @click="cutState(index)">
                <img src="../../../assets/son_delete.png" alt="">
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div v-show="dialogVisible" class="dialog">
      <header class="dialog-header is-flex jst-between ali-center">
        <div class="dialog-title">
          <i class="el-icon-plus"></i> 添加子账号
        </div>
        <i class="el-icon-close" @click="dialogVisible = false"></i>
      </header>
      <main class="content">
        <ul>
          <li class="wrap is-flex jst-between" v-for="(item,index) in dialogs">
            <div :class="['left' ,'is-flex',{'choose':choose[index*2-1]},{'no-border':!item.left.name}]" @click="fnChoose(index*2-1)">
              <span class="name text-jst" v-text="item.left.name" v-show="item.left.name"></span>
              <input class="value" type="text" :placeholder="item.left.placeholder" v-show="item.left.placeholder">
            </div>
            <div :class="['right' ,'is-flex',{'choose':choose[index*2]}]" @click="fnChoose(index*2)">
              <span class="name text-jst" v-text="item.right.name"></span>
              <input class="tip" type="text" :placeholder="item.right.tip">
              <input :class="['value',{'tel-wide':item.right.tip}]" type="text" :placeholder="item.right.placeholder">
            </div>
          </li>
        </ul>
      </main>
      <footer>
        <div class="btn-add">立即添加</div>
      </footer>
    </div>
    
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
      },
      dialogVisible: false,
      choose: [],
      dialogs: [
        {
          left: {},
          right: {
            name: "姓名",
            value: "",
            placeholder: "请输入姓名"
          }
        },
        {
          left: {
            name: "用户名",
            value: "",
            placeholder: "请输入用户名"
          },
          right: {
            name: "身份证",
            value: "",
            placeholder: "请输入身份证"
          }
        },
        {
          left: {
            name: "登陆密码",
            value: "",
            placeholder: "请输入登陆密码"
          },
          right: {
            name: "手机好",
            value: "",
            placeholder: "请输入手机好",
            tip: "+86"
          }
        },
        {
          left: {
            name: "确认密码",
            value: "",
            placeholder: "确认密码"
          },
          right: {
            name: "固定电话",
            value: "",
            placeholder: "请输入手机好",
            tip: "0755"
          }
        },
        {
          left: {},
          right: {
            name: "电子邮箱",
            value: "",
            placeholder: "请输入电子邮箱"
          }
        }
      ]
    };
  },
  methods: {
    cutState(index) {
      this.lists[index].state = !this.lists[index].state;
    },
    handleClose(done) {
      done();
    },
    fnChoose(index) {
      this.choose[index] = false;
      for (var i = -1; i < this.choose.length; i++) {
        this.choose[i] = false;
      }
      this.$set(this.choose, index, "choose");
    }
  },
  conputed: {}
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
      padding-bottom: 10px;
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
    }
  }
  .dialog {
    position: fixed;
    padding-bottom: 40px;
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
    }
    .content {
      padding: 40px;
    }
    .wrap {
      input {
        height: 17px;
        border: 0;
      }
      .name {
        display: inline-block;
        width: 80px;
        padding-right: 30px;
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