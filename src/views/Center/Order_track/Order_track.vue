<template>
  <div class="order-track">
    <div class="head">
      <div class="title">
        <el-breadcrumb separator=">>>">
          <el-breadcrumb-item :to="{ path: '/center/order_search' }">订单查询</el-breadcrumb-item>
          <el-breadcrumb-item>订单跟踪</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="steps">
        <el-steps :space="200" :active="4" finish-status="success">
          <el-step title="产品选择"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="下单成功"></el-step>
          <el-step title="支付成功"></el-step>
          <el-step title="运输中"></el-step>
          <el-step title="订单完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="linear"></div>
        <div class="content">
          <div class="left">
            <p>2017-10-10 10:10:10</p>
            <div class="box orderNum">
              <div class="title">订单编号:</div>
              <div class="detail">46464646464164</div>
            </div>
            <div class="box transLine">
              <div class="title">运输线路:</div>
              <div class="detail">北京(PEK)——上海(PVG)</div>
            </div>
            <div class="box baseserve">
              <div class="title">基础服务:</div>
              <div class="detail">
                <div class="item"><span class="get el-icon-circle-check"></span><span>航空运输</span></div>
              </div>
            </div>
            <div class="box moreserver">
              <div class="title">更多服务:</div>
              <div class="detail">
                <div class="item"><span class="get el-icon-circle-check"></span><span>代交货</span></div>
                <div class="item"><span class="get el-icon-circle-check"></span><span>代提交</span></div>
                <div class="item"><span class="get el-icon-circle-check"></span><span>上门取货</span></div>
                <div class="item not"><span class="get el-icon-circle-check"></span><span>落地配</span></div>
              </div>
            </div>
            <div class="box increaseserver">
              <div class="title">增值服务:</div>
              <div class="detail">
                <div class="item"><span class="get el-icon-circle-check"></span><span>报关报检</span></div>
                <div class="item not"><span class="get el-icon-circle-check"></span><span>运输保险</span></div>
              </div>
            </div>
          </div>
          <div class="middle">
            <img src="../../../assets/send.png" alt="">
            <p>运送中</p>
          </div>
          <div class="right">
            <el-button type="danger" @click="goto('/center/order_detail')">订单详情</el-button>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="triangle">
            <p>跟踪信息</p>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="box weight">
              <span class="title">货物重量</span>
              <span class="detial">1000</span>
              <span class="unit">千克</span>
            </div>
            <div class="box num">
              <span class="title">货物件数</span>
              <span class="detial">10</span>
              <span class="unit">件</span>
            </div>
            <div class="box size">
              <span class="title">货物体积</span>
              <span class="detial">0.50</span>
              <span class="unit">立方米</span>
            </div>
            <div class="box payWeight">
              <span class="title">计费重量</span>
              <span class="detial">1000.00</span>
              <span class="unit">千克</span>
            </div>
            <div class="box type">
              <span class="title">货物类型</span>
              <span class="detial">普货</span>
            </div>
            <div class="box name">
              <span class="title">货物名称</span>
              <span class="detial">服装</span>
            </div>
          </div>
          <div class="content-right">
              <EasyScrollbar>
                <div class="box" id="wrapper">
                    <div class="oneday">
                      <div class="data">2017-10-10</div>
                      <div class="time">
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                      </div>
                    </div>
                    <div class="oneday">
                      <div class="data">2017-10-10</div>
                      <div class="time">
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                      </div>
                    </div>
                    <div class="oneday">
                      <div class="data">2017-10-10</div>
                      <div class="time">
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                        <div class="item"><span class="itme-time">15:48:22</span><span class="caption">【出港收运】</span><span class="who">陈丽</span></div>
                      </div>
                    </div>
                </div>
              </EasyScrollbar>
          </div>
        </div>
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
.order-track {
  .head {
    height: 61px;
    display: flex;
    .title {
      margin-left: 30px;
      line-height: 61px;
      display: grid;
      grid-template-columns: 1fr;
      // justify-items: center;
      align-items: center;
    }
    .steps {
      flex: 1;
      padding-left: 30px;
      padding-top: 6px;
    }
  }
  .main {
    padding: 20px;
    .main-top {
      background-color: #fff;
      box-shadow: 3px 3px 3px #e0e0e0;
      .linear {
        height: 4px;
        background: linear-gradient(30deg, #fedb43 50%, #f52731 50%);
        background-size: 50px 4px;
      }
      .content {
        padding: 0 20px;
        color: #a0a0a0;
        display: grid;
        grid-template-columns: 1fr 250px 250px;
        .left {
          .box {
            display: flex;
            margin: 10px 0;
            .title {
              font-weight: 700;
            }
            .detail {
              margin-left: 20px;
            }
          }
          .orderNum {
            .detail {
              color: #f42630;
              font-weight: 700;
              line-height: 20px;
            }
          }
          .baseserve,
          .moreserver,
          .increaseserver {
            .detail {
              display: flex;
              .item {
                margin: 0 20px;
                .get {
                  color: #8cc43f;
                  margin: 0 10px;
                }
                &.not {
                  .get {
                    color: #e6e6e6;
                  }
                }
              }
            }
          }
        }
        .middle {
          color: #fed001;
          width: 100%;
          text-align: center;
          padding-top: 60px;
        }
        .right {
          width: 100%;
          text-align: center;
          padding-top: 80px;
          button {
            padding: 4px 20px;
            box-shadow: 4px 4px 6px #e0e0e0;
          }
        }
      }
    }
    .main-bottom {
      margin-top: 20px;
      box-shadow: 4px 4px 4px #e0e0e0;
      background-color: #fff;
      position: relative;
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
      .content {
        display: flex;
        .content-left {
          width: 300px;
          color: #9a9a9a;
          padding: 20px 0 20px 80px;
          border-right: 1px dashed #e0e0e0;
          .box {
            display: flex;
            margin: 10px 0;
          }
          .detial {
            width: 100px;
            color: #4e4e4e;
            text-align: center;
            font-weight: 700;
          }
          .unit {
            width: 80px;
            text-align: center;
          }
        }
        .content-right {
          flex: 1;
          padding: 40px;
          // overflow: auto;
          height: 200px;
          color: #b3b3b3;
          .box {
            width: 100%;
            height: 200px;
          }
          .oneday {
            &:first-child {
              .time {
                .item:first-child::before {
                  background-color: #fccf00;
                }
              }
            }
            margin-left: 70px;
            display: flex;
            .data {
              position: relative;
            }
            .time {
              margin-left: 40px;
              .item {
                position: relative;
                &::before {
                  content: "";
                  position: absolute;
                  top: 6px;
                  left: -174px;
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: #b3b3b3;
                  background-color: #e6e6e6;
                  z-index: 99;
                }
                &::after {
                  content: "";
                  position: absolute;
                  left: -171px;
                  top: 0;
                  height: 100%;
                  width: 2px;
                  background-color: #e6e6e6;
                }
                display: flex;
                span {
                  margin: 0px 10px 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
