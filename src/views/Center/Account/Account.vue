<template>
  <div class="account">
    <div class="head">
      <div class="title">账号信息</div>
      <div class="sign"><span>每日签到</span></div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="base-info">
          <div class="head-img"><img src="../../../assets/head_img.png"></div>
          <div class="info">
            <p class="company-name">公司名称 {{userInfo.fullName}}</p>
            <div class="star">
              <el-rate
                v-model='starNum'
                disabled
                :max='starNum'
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
            <div class="member">
              <div class="integral">会员积分：<span class="score" v-if="'level' in userInfo">{{userInfo.level.experience}}</span></div>
              <div class="doings">
                <el-badge
                  :value='activity'
                  :max="10"
                  class="item">
                  <el-button size="small">我的活动</el-button>
                </el-badge>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-info">
          <div class="confirm">
            <el-badge :value="userInfo.waitSubmitOrders " class="item">
              <img src="../../../assets/account_icon1.png">
            </el-badge>
            <p>{{ userInfo.waitSubmitOrders   }}</p>
            <p>代提交</p>
          </div>
          <div class="pay">
            <el-badge :value="userInfo.waitPayOrders" class="item">
              <img src="../../../assets/account_icon2.png">
            </el-badge>
            <p>{{userInfo.waitPayOrders }}</p>
            <p>待支付</p>
          </div>
          <div class="received">
            <el-badge :value="userInfo.waitReceiveOrders" class="item">
              <img src="../../../assets/account_icon3.png">
            </el-badge>
            <p>{{ userInfo.waitReceiveOrders }}</p>
            <p>待收货</p>
          </div>
          <div class="done">
            <el-badge :value="userInfo.totalOrders" class="item">
              <img src="../../../assets/account_icon4.png">
            </el-badge>
            <p>{{userInfo.totalOrders}}</p>
            <p>全部</p>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="account-info">
          <div class="triangle">
            <p>账号信息</p>
          </div>
          <div class="account-coding">
            <span class="title">会员编码</span><span class="colon">:</span><span class="content">无</span>
          </div>
          <div class="account">
            <span class="title">会员账号</span><span class="colon">:</span><span class="content">{{userInfo.account}}</span>
          </div>
          <div class="pass">
            <span class="title">会员密码</span><span class="colon">:</span><span class="btn"><el-button type="info" size='mini' @click="resetPassword(userInfo.id)">修改</el-button></span>
          </div>
          <div class="phonenum">
            <span class="title">手机号</span><span class="colon">:</span><span class="content">{{userInfo.phone}}</span><span class="btn"><el-button type="info" size='mini'>修改</el-button></span>
          </div>
          <div class="email">
            <span class="title">邮箱</span><span class="colon">:</span><span class="content">{{userInfo.email}}</span><span class="btn"><el-button type="info" size='mini'>修改</el-button></span>
          </div>
          <div class="account-type">
            <span class="title">账号类型</span><span class="colon">:</span><span class="content">{{userInfo.accountType}}</span>
          </div>
          <div class="account-level">
            <span class="title">账号级别</span><span class="colon">:</span><span class="content">{{userInfo.accountLevel}}</span>
          </div>
        </div>
        <div class="personal-info">
          <div class="triangle">
            <p>个人信息</p>
          </div>
          <div class="name">
            <span class="title">会员姓名</span><span class="colon">:</span><span class="content">{{userInfo.fullName}}</span>
          </div>
          <div class="id">
            <span class="title">身份证号码</span><span class="colon">:</span><span class="content">{{userInfo.identityCard}}</span>
          </div>
          <div class="cellphone">
            <span class="title">固定电话</span><span class="colon">:</span><span class="content">{{userInfo.telephone}}</span>
          </div>
          <div class="detial">
            <span class="title">详细地址</span><span class="colon">:</span><span class="content">无</span>
          </div>
          <div class="revise">
            <el-button
              type="info"
              size="mini">修改</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      starNum: 3, //等级
      score: 3450,
      confirmNum: 2,
      payNum: 3,
      activity: 0, // 活动
      receivedNum: 4,
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    resetPassword(id) {
      this.$router.push("/center/change_password");
    },
    getUserInfo() {
      this.axios
        .post("/app/v1/user/userInfo", {
          id: this.id,
          token: this.token
        })
        .then(data => {
          console.log(data.data.data);
          if (data.data.code == "1") {
            this.userInfo = data.data.data;
          }
        });
    }
  },
  computed: {
    ...mapGetters(["token", "id"])
  }
};
</script>
<style lang="scss">
.account {
  .head {
    display: flex;
    > div {
      flex: 1;
      line-height: 61px;
    }
    .title {
      padding-left: 20px;
      color: #b3b3b3;
    }
    .sign {
      text-align: right;
      span {
        display: inline-block;
        border: 1px solid #f5363e;
        color: #f5363e;
        height: 20px;
        line-height: 20px;
        padding: 3px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .main {
    padding: 40px;
    .main-top {
      display: flex;
      background-color: #fff;
      box-shadow: 0 0 4px #e0e0e0;
      padding: 20px;
      height: 200px;
      .base-info {
        flex: 3;
        position: relative;
        display: flex;
        &::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 100%;
          border-left: 1px dashed #e0e0e0;
          position: absolute;
          right: 0;
          top: 0;
        }
        .head-img {
          width: 200px;
          text-align: center;
          img {
            margin-top: 50%;
            transform: translateY(-50%);
            border: 8px solid #f2f2f2;
            border-radius: 50%;
          }
        }
        .info {
          flex: 1;
          .company-name {
            font-size: 16px;
            color: #999999;
          }
          .star {
            margin: 40px 0;
          }
          .member {
            display: flex;
            .integral {
              flex: 1;
              color: #999999;
              font-size: 16px;
              .score {
                color: #fccf00;
              }
            }
            .doings {
              flex: 1;
              .el-badge {
                box-shadow: 1px 4px 4px #e0e0e0;
                button {
                  color: #fff;
                  background-color: #fccf00;
                }
              }
            }
          }
        }
      }
      .goods-info {
        flex: 2;
        display: flex;
        > div {
          flex: 1;
          text-align: center;
          margin-top: 40px;
          color: #999999;
          img {
            cursor: pointer;
          }
          .el-badge__content.is-fixed {
            right: 20px;
            top: 4px;
          }
        }
      }
    }
    .main-bottom {
      display: flex;
      margin-top: 30px;
      .triangle {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border: 38px solid #fccf00;
        border-color: #fccf00 transparent transparent #fccf00;
        > p {
          width: 100px;
          transform: rotate(-45deg) translate(4px, -65px);
          color: #fff;
        }
      }
      .account-info {
        flex: 3;
      }
      .personal-info {
        flex: 2;
        margin-left: 20px;
        padding-top: 40px;
        .revise {
          display: flex;
          justify-content: flex-end;
          button {
            width: 66px;
            padding: 2px 15px;
            box-shadow: 0 5px 10px gray;
          }
        }
      }
      > div {
        position: relative;
        box-sizing: border-box;
        min-height: 200px;
        background-color: #fff;
        box-shadow: 0 0 4px #e0e0e0;
        padding: 20px 20px 20px 80px;
        color: #a0a0a0;
        > div:not(.triangle) {
          display: flex;
          .title {
            width: 100px;
            text-align: justify;
            &::after {
              content: "";
              display: inline-block;
              width: 100%;
              overflow: hidden;
              height: 0;
            }
          }
          .colon {
            margin: 0 10px;
            font-weight: 700;
          }
          .btn {
            margin-left: 20px;
            .el-button {
              box-shadow: 0 5px 10px gray;
              padding: 2px 16px;
            }
          }
        }
      }
    }
  }
}
</style>
