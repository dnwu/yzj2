<template>
  <div class="supplier">
    <div class="center-head">
      <div class="left">
        <div class="logo">
          <img src="../../assets/login_logo.png" alt="">
        </div>
        <div class="title">
          <h3>{{title}}</h3>
          <span @click="goto(0,'/home')">返回官网首页</span>
        </div>
      </div>
      <div class="right">
        <p>欢迎您！<span class="username">{{username}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="logout" @click="logout">退出登录</span></p>
      </div>
    </div>
    <div class="center-main">
      <div class="nav">
        <div @click="goto(0,'/home')" class="nav-home">
          <span class="icon"><img src="../../assets/nav0.png" alt=""></span><span class="title">首页</span><span class="menu"><img src="../../assets/menu.png" alt=""></span>
        </div>
        <div class="nav-title">
          <ul >
            <li class="title">用户中心</li>
            <li @click="goto(0,'/supplier/account')" :class="activeIndex == '0'?'active':''"><span class="icon"><img :src="activeIndex == '0'?iconARR[0].active:iconARR[0].default" alt=""></span><span class="title">账号信息</span></li>
            <li @click.stop="goto(1,'/supplier/company_info')" :class="activeIndex == '1'?'active':''"><span class="icon"><img :src="activeIndex == '1'?iconARR[1].active:iconARR[1].default" alt=""></span><span class="title">企业信息</span></li>
            <li @click.stop="goto(2,'/supplier/server_info')" :class="activeIndex == '2'?'active':''"><span class="icon"><img :src="activeIndex == '2'?iconARR[2].active:iconARR[2].default" alt=""></span><span class="title">服务信息</span></li>
            <li @click.stop="goto(3,'/supplier/son_account')" :class="activeIndex == '3'?'active':''"><span class="icon"><img :src="activeIndex == '3'?iconARR[3].active:iconARR[3].default" alt=""></span><span class="title">子账号管理</span></li>
            <li class="title">订单管理</li>
            <li @click.stop="goto(4,'/supplier/order_taking')" :class="activeIndex == '4'?'active':''"><span class="icon"><img :src="activeIndex == '4'?iconARR[4].active:iconARR[4].default" alt=""></span><span class="title">接单管理</span></li>
            <li @click.stop="goto(5,'/supplier/booking_space')" :class="activeIndex == '5'?'active':''"><span class="icon"><img :src="activeIndex == '5'?iconARR[5].active:iconARR[5].default" alt=""></span><span class="title">订舱管理</span></li>
            <li @click.stop="goto(6,'/supplier/making_bill')" :class="activeIndex == '6'?'active':''"><span class="icon"><img :src="activeIndex == '6'?iconARR[6].active:iconARR[6].default" alt=""></span><span class="title">制单管理</span></li>
            <li class="title">产品管理</li>
            <li @click.stop="goto(7,'/supplier/air_plan')" :class="activeIndex == '7'?'active':''"><span class="icon"><img :src="activeIndex == '7'?iconARR[7].active:iconARR[7].default" alt=""></span><span class="title">航班计划维护</span></li>
            <li @click.stop="goto(8,'/supplier/plane_manage')" :class="activeIndex == '8'?'active':''"><span class="icon"><img :src="activeIndex == '8'?iconARR[8].active:iconARR[8].default" alt=""></span><span class="title">航班管理</span></li>
            <li @click.stop="goto(9,'/supplier/airlift')" :class="activeIndex == '9'?'active':''"><span class="icon"><img :src="activeIndex == '9'?iconARR[9].active:iconARR[9].default" alt=""></span><span class="title">空运产品管理</span></li>
            <li @click.stop="goto(10,'/supplier/land_transport')" :class="activeIndex == '10'?'active':''"><span class="icon"><img :src="activeIndex == '10'?iconARR[10].active:iconARR[10].default" alt=""></span><span class="title">陆运产品管理</span></li>
            <li @click.stop="goto(11,'/supplier/airport_operation')" :class="activeIndex == '11'?'active':''"><span class="icon"><img :src="activeIndex == '11'?iconARR[11].active:iconARR[11].default" alt=""></span><span class="title">机场操作产品管理</span></li>
            <li @click.stop="goto(12,'/supplier/value_add')" :class="activeIndex == '12'?'active':''"><span class="icon"><img :src="activeIndex == '12'?iconARR[12].active:iconARR[12].default" alt=""></span><span class="title">增值服务产品管理</span></li>
          </ul>
        </div>
      </div>
      <div class="contain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "供应商中心",
      fullPath: "/center/account",
      activeIndex: 0,
      iconARR: [
        {
          default: require("../../assets/nav1.png"),
          active: require("../../assets/nav1_1.png")
        },
        {
          default: require("../../assets/nav2.png"),
          active: require("../../assets/nav2_2.png")
        },
        {
          default: require("../../assets/nav14.png"),
          active: require("../../assets/nav14_14.png")
        },
        {
          default: require("../../assets/nav7.png"),
          active: require("../../assets/nav7_7.png")
        },
        {
          default: require("../../assets/nav15.png"),
          active: require("../../assets/nav15_15.png")
        },
        {
          default: require("../../assets/nav16.png"),
          active: require("../../assets/nav16_16.png")
        },
        {
          default: require("../../assets/nav17.png"),
          active: require("../../assets/nav17_17.png")
        },
        {
          default: require("../../assets/nav18.png"),
          active: require("../../assets/nav18_18.png")
        },
        {
          default: require("../../assets/nav18.png"),
          active: require("../../assets/nav18_18.png")
        },
        {
          default: require("../../assets/nav19.png"),
          active: require("../../assets/nav19_19.png")
        },
        {
          default: require("../../assets/nav20.png"),
          active: require("../../assets/nav20_20.png")
        },
        {
          default: require("../../assets/nav21.png"),
          active: require("../../assets/nav21_21.png")
        },
        {
          default: require("../../assets/nav21.png"),
          active: require("../../assets/nav21_21.png")
        }
      ]
    };
  },
  created() {
    // console.log(this.$route.fullPath);
    this.fullPath = this.$route.fullPath;
    this.initNav()
  },
  methods: {
    ...mapMutations({
      setUsertype: "SET_USERTYPE",
      setToken: "SET_TOKEN",
      setUsername: "SET_USERNAME",
      setId: "SET_ID"
    }),
    logout() {
      this.$cookie.delete("username");
      this.setUsername("");
      this.setUsertype("");
      this.setToken("");
      this.setId("");
      this.$router.push("/login");
    },
    initNav() {
      if (this.fullPath.includes("supplier/account")) {
        this.activeIndex = 0;
        this.title = "账号信息";
      } else if (this.fullPath.includes("ompany_info")) {
        this.activeIndex = 1;
        this.title = "企业信息";
      } else if (this.fullPath.includes("erver_info")) {
        this.activeIndex = 2;
        this.title = "服务信息";
      } else if (this.fullPath.includes("on_account")) {
        this.activeIndex = 3;
        this.title = "子账号管理";
      } else if (this.fullPath.includes("order_taking")) {
        this.activeIndex = 4;
        this.title = "接单管理";
      }else if(this.fullPath.includes("order_track")){
        this.activeIndex = 4;
        this.title = "订单跟踪";
      }else if(this.fullPath.includes("order_deal")){
        this.activeIndex = 4;
        this.title = "订单详情";
      }else if (this.fullPath.includes("ooking_space")) {
        this.activeIndex = 5;
        this.title = "订舱管理";
      } else if (this.fullPath.includes("aking_bill")) {
        this.activeIndex = 6;
        this.title = "制单管理";
      } else if (this.fullPath.includes("air_plan")) {
        this.activeIndex = 7;
        this.title = "航班计划维护";
      } else if (this.fullPath.includes("plane_manage")) {
        this.activeIndex = 8;
        this.title = "航班管理";
      } else if (this.fullPath.includes("irlift")) {
        this.activeIndex = 9;
        this.title = "空运产品管理";
      } else if (this.fullPath.includes("and_transport")) {
        this.activeIndex = 10;
        this.title = "陆运产品管理";
      } else if (this.fullPath.includes("irport_operation")) {
        this.activeIndex = 11;
        this.title = "机场操作产品管理";
      } else if (this.fullPath.includes("alue_add")) {
        this.activeIndex = 12;
        this.title = "增值服务产品管理";
      }
    },
    goto(index, path) {
      this.$router.push(path);
      this.activeIndex = index;
      if (index == 0) {
        this.title = "账号信息";
      } else if (index == 1) {
        this.title = "企业信息";
      } else if (index == 2) {
        this.title = "服务信息";
      } else if (index == 3) {
        this.title = "子账号管理";
      } else if (index == 4) {
        this.title = "接单管理";
      } else if (index == 5) {
        this.title = "订舱管理";
      } else if (index == 6) {
        this.title = "制单管理";
      } else if (index == 7) {
        this.title = "航班计划维护";
      } else if (index == 8) {
        this.title = "航班管理";
      } else if (index == 9) {
        this.title = "空运产品管理";
      } else if (index == 10) {
        this.title = "陆运产品管理";
      } else if (index == 11) {
        this.title = "机场操作产品管理";
      } else if (index == 12) {
        this.title = "增值服务产品管理";
      }
    }
  },
  computed: {
    ...mapGetters(["username"])
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        // console.log("newValue", newValue.fullPath);
        this.fullPath = newValue.fullPath
        this.initNav()
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.supplier {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  .center-head {
    width: 100%;
    height: 100px;
    background-color: #fccf00;
    display: flex;
    padding: 0 200px;
    box-sizing: border-box;
    z-index: 9;
    box-shadow: 0 0 10px gray;
    position: relative;
    &::after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #e7e7e7;
      position: absolute;
      bottom: -61px;
      left: 0;
    }
    .left {
      .logo {
        display: inline-block;
        height: 100px;
        margin-right: 20px;
        img {
          transform: translateY(14px);
        }
      }
      .title {
        display: inline-block;
        height: 100px;
        h3 {
          color: #fff;
          margin-left: 5px;
        }
        span {
          display: inline-block;
          background-color: #fff;
          height: 25px;
          line-height: 25px;
          padding: 0 10px;
          color: #fccf00;
          border-radius: 12px;
          cursor: pointer;
        }
      }
    }
    .right {
      flex: 1;
      p {
        margin: 0;
        line-height: 100px;
        text-align: right;
        color: #fff;
        .logout {
          cursor: pointer;
        }
      }
    }
  }
  .center-main {
    width: 1500px;
    margin: 0 auto;
    flex: 1;
    background-color: #f9f9f9;
    display: flex;
    position: relative;
    // padding: 0 200px;
    box-sizing: border-box;
    .nav {
      img:not(.menu) {
        width: 15px;
        height: 15px;
        vertical-align: middle;
      }

      position: absolute;
      width: 200px;
      height: 100%;
      background-color: #fff;
      box-shadow: 3px 3px 3px #c0c0c0;
      .nav-home {
        height: 60px;
        display: flex;
        line-height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid #ececec;
        cursor: pointer;
        .icon {
          width: 40px;
          text-align: center;
          img {
            vertical-align: text-bottom;
          }
        }
        .title {
          flex: 1;
          color: #4d4d4d;
        }
        .menu {
          width: 40px;
          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
      }
      .nav-title {
        ul {
          padding: 0 20px;
          color: #4d4d4d;
          li {
            display: flex;
            margin: 10px 0;
            cursor: pointer;
            &.title {
              transform: scale(0.8);
              font-size: 12px;
              cursor: auto;
            }
            &.active {
              span {
                color: red;
              }
            }
            .icon {
              width: 40px;
              text-align: center;
              img {
                vertical-align: text-bottom;
              }
            }
            .title {
              flex: 1;
              color: #4d4d4d;
            }
          }
        }
      }
    }
    .contain {
      padding-left: 200px;
      flex: 1;
      min-width: 1200px;
      box-sizing: border-box;
    }
  }
}
</style>
