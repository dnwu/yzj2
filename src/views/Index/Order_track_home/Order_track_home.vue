<template>
<div class="order_track_home">
  <div class="head">
    <div class="title">订单跟踪</div>
    <div class="input">
      <span>订单号</span>
      <i class="el-icon-search"></i>
      <el-input v-model="orderNo" placeholder="请输入订单号"></el-input>
      <el-button type="danger" @click="getOrderDetail" size="mini">查询</el-button>
    </div>
  </div>
  <div class="steps" v-if="'id' in orderDetailData">
    <el-steps :space="200" :active="orderStatus" finish-status="success">
      <el-step title="产品选择"></el-step>
      <el-step title="填写订单"></el-step>
      <el-step title="下单成功"></el-step>
      <el-step title="支付成功"></el-step>
      <el-step title="运输中"></el-step>
      <el-step title="订单完成"></el-step>
    </el-steps>
  </div>
  <div class="main" v-if="'id' in orderDetailData">
    <div class="main-top">
      <div class="linear"></div>
      <div class="content">
        <div class="left">
          <p>{{orderDetailData.createTime}}</p>
          <div class="box orderNum">
            <div class="title">订单编号:</div>
            <div class="detail">{{orderDetailData.orderNo}}</div>
          </div>
          <div class="box transLine">
            <div class="title">运输线路:</div>
            <div class="detail">{{orderDetailData.airportStart}}——{{orderDetailData.airportEnd}}</div>
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
              <div class="item" v-if="'airportStartAgent' in orderDetailData"><span class="get el-icon-circle-check"></span><span>代交货</span></div>
              <div class="item" v-if="'airportEndAgent' in orderDetailData"><span class="get el-icon-circle-check"></span><span>代提交</span></div>
              <div class="item" v-if="'pickUpAgent' in orderDetailData"><span class="get el-icon-circle-check"></span><span>上门取货</span></div>
              <div class="item" v-if="'deliveryAgent' in orderDetailData"><span class="get el-icon-circle-check"></span><span>落地配</span></div>
            </div>
          </div>
          <div class="box increaseserver" v-if="false">
            <div class="title">增值服务:</div>
            <div class="detail">
              <div class="item"><span class="get el-icon-circle-check"></span><span>报关报检</span></div>
              <div class="item"><span class="get el-icon-circle-check"></span><span>运输保险</span></div>
            </div>
          </div>
        </div>
        <div class="middle">
          <img src="../../../assets/send.png" alt="">
          <p>运送中</p>
        </div>
        <div class="right">
          <el-button type="danger" disabled @click="goto('/center/order_detail')">订单详情</el-button>
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
            <span class="detial">{{orderDetailData.orderGoodsDetail.goodsWeight}}</span>
            <span class="unit">千克</span>
          </div>
          <div class="box num">
            <span class="title">货物件数</span>
            <span class="detial">{{orderDetailData.orderGoodsDetail.goodsNumber}}</span>
            <span class="unit">件</span>
          </div>
          <div class="box size">
            <span class="title">货物体积</span>
            <span class="detial">{{orderDetailData.orderGoodsDetail.goodsVolume}}</span>
            <span class="unit">立方米</span>
          </div>
          <div class="box payWeight">
            <span class="title">计费重量</span>
            <span class="detial">{{orderDetailData.orderGoodsDetail.valuationWeight}}</span>
            <span class="unit">千克</span>
          </div>
          <div class="box type">
            <span class="title">货物类型</span>
            <span class="detial">{{getGoodsType(orderDetailData.orderGoodsDetail.goodsType)}}</span>
          </div>
          <div class="box name">
            <span class="title">货物名称</span>
            <span class="detial">{{orderDetailData.orderGoodsDetail.goodsName}}</span>
          </div>
        </div>
        <div class="content-right">
            <EasyScrollbar>
              <div class="box" id="wrapper">
                  <div class="oneday" v-for="(item,index) in orderDetailData.trackDTOS" :key="index">
                    <div class="data"></div>
                    <div class="time">
                      <div class="item"><span class="itme-time">{{item.time}}</span><span class="caption">【{{item.orderType}}】</span><span class="who">{{item.accountName}}</span></div>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      orderNo: "",
      orderDetailData: {},
    };
  },
  created() {
    console.log(this.$route.query.orderNo);
    if(this.$route.query.orderNo){
      this.orderNo = this.$route.query.orderNo
      this.getOrderDetail()
    }
  },
  methods: {
    goto(path) {
      this.$router.push({
        path: path,
        query: {
          orderNo: this.orderNo
        }
      });
    },
    getGoodsType(val) {
      var type = "普货";
      // (7-普货 8-冷链 9-重货 10-危险品
      if (val == "7") {
        type = "普货";
      } else if (val == "8") {
        type = "冷链";
      } else if (val == "9") {
        type = "重货";
      } else if (val == "10") {
        type = "危险品";
      }
      return type;
    },
    getOrderDetail() {
      this.axios
        .post("/app/v1/order/getOrderDetail", {
          id: this.id,
          orderNo: this.orderNo,
          token: this.token
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 1) {
            this.orderDetailData = data.data.data;
          } else {
            this.$message.error("获取订单详情失败，请重新获取");
            this.$router.go(-1);
          }
        });
    }
  },
  computed: {
    ...mapGetters(["id", "token"]),
    orderStatus() {
      if (this.orderDetailData.orderStatus == 4) {
        return 4;
      } else if (this.orderDetailData.orderStatus == 5) {
        return 5;
      } else if (this.orderDetailData.orderStatus == 7) {
        return 6;
      } else {
        return 3;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.order_track_home {
  min-height: 666px;
  background-color: #fff;
  width: 1200px;
  margin: 0 auto 50px;
  box-shadow: 0px 10px 10px #e0e0e0;
  .head {
    display: flex;
    height: 61px;
    line-height: 61px;
    color: #b4b4b4;
    .title {
      flex: 1;
      padding-left: 20px;
    }
    .input {
      width: 400px;
      display: flex;
      text-align: right;
      position: relative;
      input {
        padding-left: 25px;
      }
      span {
        width: 100px;
        margin-right: 20px;
      }
      i {
        position: absolute;
        top: 24px;
        left: 82px;
        z-index: 99;
      }
    }
    button {
      height: 26px;
      margin: 15px 0 0 20px;
    }
  }
  .steps {
    width: 1000px;
    margin: 0 auto;
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
        // display: grid;
        // grid-template-columns: 1fr 250px 250px;
        display: flex;
        .left {
          width: 620px;
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
          text-align: center;
          width: 250px;
          padding-top: 60px;
        }
        .right {
          width: 250px;
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
                  left: -58px;
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
                  left: -55px;
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
