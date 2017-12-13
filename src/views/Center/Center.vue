<template>
  <div class="center">
    <div class="center-head">
      <div class="left">
        <div class="logo">
          <img src="../../assets/login_logo.png" alt="">
        </div>
        <div class="title">
          <h3>用户中心</h3>
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
            <li @click="goto(0,'/center/account')" :class="activeIndex == '0'?'active':''"><span class="icon"><img :src="activeIndex == '0'?iconARR[0].active:iconARR[0].default" alt=""></span><span class="title">账号信息</span></li>
            <li @click.stop="goto(1,'/center/company_info')" :class="activeIndex == '1'?'active':''"><span class="icon"><img :src="activeIndex == '1'?iconARR[1].active:iconARR[1].default" alt=""></span><span class="title">企业信息</span></li>
            <li @click.stop="goto(2,'/center/doings')" :class="activeIndex == '2'?'active':''"><span class="icon"><img :src="activeIndex == '2'?iconARR[2].active:iconARR[2].default" alt=""></span><span class="title">我的活动</span></li>
            <li @click.stop="goto(3,'/center/experience')" :class="activeIndex == '3'?'active':''"><span class="icon"><img :src="activeIndex == '3'?iconARR[3].active:iconARR[3].default" alt=""></span><span class="title">会员经验</span></li>
            <li @click.stop="goto(4,'/center/integral')" :class="activeIndex == '4'?'active':''"><span class="icon"><img :src="activeIndex == '4'?iconARR[4].active:iconARR[4].default" alt=""></span><span class="title">会员积分</span></li>
            <li @click.stop="goto(5,'/center/address')" :class="activeIndex == '5'?'active':''"><span class="icon"><img :src="activeIndex == '5'?iconARR[5].active:iconARR[5].default" alt=""></span><span class="title">地址簿</span></li>
            <li @click.stop="goto(6,'/center/son_account')" :class="activeIndex == '6'?'active':''"><span class="icon"><img :src="activeIndex == '6'?iconARR[6].active:iconARR[6].default" alt=""></span><span class="title">子账号管理</span></li>
            <li class="title">马上下单</li>
            <li @click.stop="goto(7,'/center/online_product')" :class="activeIndex == '7'?'active':''"><span class="icon"><img :src="activeIndex == '7'?iconARR[7].active:iconARR[7].default" alt=""></span><span class="title">网上下单</span></li>
            <li @click.stop="goto(8,'/center/client_product')" :class="activeIndex == '8'?'active':''"><span class="icon"><img :src="activeIndex == '8'?iconARR[8].active:iconARR[8].default" alt=""></span><span class="title">客户端下单</span></li>
            <li class="title">订单管理</li>
            <li @click.stop="goto(9,'/center/order_search')" :class="activeIndex == '9'?'active':''"><span class="icon"><img :src="activeIndex == '9'?iconARR[9].active:iconARR[9].default" alt=""></span><span class="title">订单查询</span></li>
            <li @click.stop="goto(10,'/center/order_track')" :class="activeIndex == '10'?'active':''"><span class="icon"><img :src="activeIndex == '10'?iconARR[10].active:iconARR[10].default" alt=""></span><span class="title">订单跟踪</span></li>
            <li class="title">我的财务</li>
            <li @click.stop="goto(11,'/center/ticket_info_egis')" :class="activeIndex == '11'?'active':''"><span class="icon"><img :src="activeIndex == '11'?iconARR[11].active:iconARR[11].default" alt=""></span><span class="title">开票信息维护</span></li>
            <li @click.stop="goto(12,'/center/bill_look')" :class="activeIndex == '12'?'active':''"><span class="icon"><img :src="activeIndex == '12'?iconARR[12].active:iconARR[12].default" alt=""></span><span class="title">账单查看</span></li>
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
import {mapGetters,mapMutations} from 'vuex'
export default {
  data() {
    return {
      fullPath: "/center/account",
      activeIndex:0,
      iconARR:[{default:require('../../assets/nav1.png'),active:require('../../assets/nav1_1.png')},
              {default:require('../../assets/nav2.png'),active:require('../../assets/nav2_2.png')},
              {default:require('../../assets/nav3.png'),active:require('../../assets/nav3_3.png')},
              {default:require('../../assets/nav4.png'),active:require('../../assets/nav4_4.png')},
              {default:require('../../assets/nav5.png'),active:require('../../assets/nav5_5.png')},
              {default:require('../../assets/nav6.png'),active:require('../../assets/nav6_6.png')},
              {default:require('../../assets/nav7.png'),active:require('../../assets/nav7_7.png')},
              {default:require('../../assets/nav8.png'),active:require('../../assets/nav8_8.png')},
              {default:require('../../assets/nav9.png'),active:require('../../assets/nav9_9.png')},
              {default:require('../../assets/nav10.png'),active:require('../../assets/nav10_10.png')},
              {default:require('../../assets/nav11.png'),active:require('../../assets/nav11_11.png')},
              {default:require('../../assets/nav12.png'),active:require('../../assets/nav12_12.png')},
              {default:require('../../assets/nav13.png'),active:require('../../assets/nav13_13.png')},
      ]
    };
  },
  created() {
    this.fullPath = this.$route.fullPath;
    console.log(this.fullPath);
    switch(this.fullPath){
      case '/center/account':
      this.activeIndex = 0
      break;
      case '/center/company_info':
      this.activeIndex = 1
      break;
      case '/center/doings':
      this.activeIndex = 2
      break;
      case '/center/experience':
      this.activeIndex = 3
      break;
      case '/center/integral':
      this.activeIndex = 4
      break;
      case '/center/address':
      this.activeIndex = 5
      break;
      case '/center/son_account':
      this.activeIndex = 6
      break;
      case '/center/online_product':
      this.activeIndex = 7
      break;
      case '/center/client_product':
      this.activeIndex = 8
      break;
      case '/center/order_search':
      this.activeIndex = 9
      break;
      case '/center/order_track':
      this.activeIndex = 10
      break;
      case '/center/ticket_info_egis':
      this.activeIndex = 11
      break;
      case '/center/bill_look':
      this.activeIndex = 12
      break;

    }
  },
  methods: {
    ...mapMutations({
      'setUsertype':'SET_USERTYPE',
      'setToken':'SET_TOKEN',
      'setUsername':'SET_USERNAME',
      'setId':'SET_ID'
    }),
    goto(index,path){
      this.$router.push(path)
      this.activeIndex = index
    },
    logout(){
      this.$cookie.delete('username')
      this.setUsername('')
      this.setUsertype('')
      this.setToken('')
      this.setId('')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters([
      'username',
    ])
  }
};
</script>
<style lang="scss" scoped>
.center {
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
    &::after{
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #E7E7E7;
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
            &.active{
              span{
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
