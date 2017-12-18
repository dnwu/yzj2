<template>
<div class="order-taking">
  <div class="head">
    接单管理
  </div>
  <div class="body">
    <div class="body-top">
      <div class="input-top">
        <div class="box order-num">
          <div class="key">订单号</div>
          <div class="value">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="orderNum">
            </el-input>
          </div>
        </div>
        <div class="box start-port">
          <div class="key">始发港</div>
          <div class="value">
            <el-select v-model="startPort" clearable placeholder="请选择">
              <el-option
                v-for="item in startPortData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box end-port">
          <div class="key">目的港</div>
          <div class="value">
            <el-select v-model="endPort" clearable placeholder="请选择">
              <el-option
                v-for="item in endPortData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search-botton"><el-button type="danger">查询</el-button></div>
      </div>
      <div class="input-bottom">
        <div class="box goods-type">
          <div class="key">货物类型</div>
          <div class="value">
            <el-select v-model="goodsType" clearable placeholder="请选择">
              <el-option
                v-for="item in goodsTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box order-status">
          <div class="key">订单状态</div>
          <div class="value">
            <el-select v-model="orderStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in orderStatusData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box order-time">
          <div class="key">订单时间</div>
          <div class="value">
            <el-date-picker
              v-model="orderTime"
              type="daterange"
              size="mini"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="export"><el-button type="warning">导出</el-button></div>
      </div>
    </div>
    <div class="body-main">
      <div class="thead wrapper">
        <div class="goodsName">货物名称</div>
        <div class="address">收发地</div>
        <div class="num">件数</div>
        <div class="weight">重量(千克)</div>
        <div class="needPayWeight">计费重量(千克)</div>
        <div class="server">产品服务</div>
        <div class="status">状态</div>
        <div class="operate">操作</div>
      </div>
      <!-- 已支付 -->
      <div class="tbody">
        <div class="tbody-head">
          <div class="time">2017-09-09 12:00</div>
          <div class="orderNum">订单号：135165465</div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span @click="examine">查看</span></div>
        </div>
        <div class="wrapper">
          <div class="goodsName">
            <p class="black">服装</p>
            <p class="gray">(普货)</p>
          </div>
          <div class="black address">
            <p class="start">北京(PEK)</p>
            <p class="end">上海(PVG)</p>
            <!-- 北京(PEK)——上海(PVG) -->
          </div>
          <div class="num">
            <p class="gray">预计：20</p>
            <p class="black">实际：20</p>
          </div>
          <div class="weight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="needPayWeight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="server">
            <p>A/B/C/D/E/F/G</p>
          </div>
          <div class="status hadpay">
            <div class="black"><img :src="listIcon['hadpay']" alt="">已支付</div>
            <div>总额¥1602</div>
          </div>
          <div class="operate">
            <div><el-button @click="dealwith(11)" size="mini" type="danger">处理订单</el-button></div>
          </div>
        </div>
      </div>
      <!-- 待支付 -->
      <div class="tbody">
        <div class="tbody-head">
          <div class="time">2017-09-09 12:00</div>
          <div class="orderNum">订单号：135165465</div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span>查看</span></div>
        </div>
        <div class="wrapper">
          <div class="goodsName">
            <p class="black">服装</p>
            <p class="gray">(普货)</p>
          </div>
          <div class="black address">
            <p class="start">北京(PEK)</p>
            <p class="end">上海(PVG)</p>
            <!-- 北京(PEK)——上海(PVG) -->
          </div>
          <div class="num">
            <p class="gray">预计：20</p>
            <p class="black">实际：20</p>
          </div>
          <div class="weight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="needPayWeight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="server">
            <p>A/B/C/D/E/F/G</p>
          </div>
          <div class="status needpay">
            <div class="black"><img :src="listIcon['needpay']" alt="">待支付</div>
          </div>
          <div class="operate">
            <div><el-button size="mini" type="danger">处理订单</el-button></div>
          </div>
        </div>
      </div>
      <!-- 运送中 -->
      <div class="tbody">
        <div class="tbody-head">
          <div class="time">2017-09-09 12:00</div>
          <div class="orderNum">订单号：135165465</div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span>查看</span></div>
        </div>
        <div class="wrapper">
          <div class="goodsName">
            <p class="black">服装</p>
            <p class="gray">(普货)</p>
          </div>
          <div class="black address">
            <p class="start">北京(PEK)</p>
            <p class="end">上海(PVG)</p>
            <!-- 北京(PEK)——上海(PVG) -->
          </div>
          <div class="num">
            <p class="gray">预计：20</p>
            <p class="black">实际：20</p>
          </div>
          <div class="weight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="needPayWeight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="server">
            <p>A/B/C/D/E/F/G</p>
          </div>
          <div class="status send">
            <div class="black"><img :src="listIcon['send']" alt="">运送中</div>
            <div>总额¥1602</div>
          </div>
          <div class="operate">
            <div><el-button size="mini" type="danger">处理订单</el-button></div>
          </div>
        </div>
      </div>
      <!-- 待受理 -->
      <div class="tbody">
        <div class="tbody-head">
          <div class="time">2017-09-09 12:00</div>
          <div class="orderNum">订单号：135165465</div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span>查看</span></div>
        </div>
        <div class="wrapper">
          <div class="goodsName">
            <p class="black">服装</p>
            <p class="gray">(普货)</p>
          </div>
          <div class="black address">
            <p class="start">北京(PEK)</p>
            <p class="end">上海(PVG)</p>
            <!-- 北京(PEK)——上海(PVG) -->
          </div>
          <div class="num">
            <p class="gray">预计：20</p>
            <p class="black">实际：20</p>
          </div>
          <div class="weight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="needPayWeight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="server">
            <p>A/B/C/D/E/F/G</p>
          </div>
          <div class="status willcare">
            <div class="black"><img :src="listIcon['willcare']" alt="">待受理</div>
            <div>总额¥1602</div>
          </div>
          <div class="operate">
            <div><el-button size="mini" type="danger">处理订单</el-button></div>
          </div>
        </div>
      </div>
      <!-- 已完成 -->
      <div class="tbody">
        <div class="tbody-head">
          <div class="time">2017-09-09 12:00</div>
          <div class="orderNum">订单号：135165465</div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span>查看</span></div>
        </div>
        <div class="wrapper">
          <div class="goodsName">
            <p class="black">服装</p>
            <p class="gray">(普货)</p>
          </div>
          <div class="black address">
            <p class="start">北京(PEK)</p>
            <p class="end">上海(PVG)</p>
            <!-- 北京(PEK)——上海(PVG) -->
          </div>
          <div class="num">
            <p class="gray">预计：20</p>
            <p class="black">实际：20</p>
          </div>
          <div class="weight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="needPayWeight">
            <p class="gray">预计：2000</p>
            <p class="black">实际：2000</p>
          </div>
          <div class="server">
            <p>A/B/C/D/E/F/G</p>
          </div>
          <div class="status haddone">
            <div class="black"><img :src="listIcon['haddone']">已完成</div>
            <div>总额¥1602</div>
          </div>
          <div class="operate">
            <div><el-button size="mini" type="info">处理订单</el-button></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看订单的模态框 -->
    <el-dialog title="主运单查看" top="40px" width="1200px" :visible.sync="dialogFormVisible">
      <div class="box main-info">
        <div class="top">
          <div class="order">
            <div class="key">主运单号:</div>
            <div class="value">800-1861646416</div>
          </div>
          <div class="plane-num">
            <div class="key">航班号:</div>
            <div class="value">HU2030</div>
          </div>
          <div class="plane-time">
            <div class="key">航班日期:</div>
            <div class="value">2017-11-12</div>
          </div>
          <div class="name">
            <div class="key">承运人:</div>
            <div class="value">HU</div>
          </div>
        </div>
        <div class="mid">
          <div class="start">
            <div class="key">出发站:</div>
            <div class="value">PEK</div>
          </div>
          <div class="end">
            <div class="key">目的站:</div>
            <div class="value">PVG</div>
          </div>
        </div>
        <div class="bottom">
          <div class="proxy">
            <div class="key">开单代理:</div>
            <div class="value">海航速运</div>
          </div>
        </div>
      </div>
      <div class="box address-info">
        <div class="address">
          <div class="center-icon">
            <img :src="listIcon['planeIcon']" alt="">
          </div>
          <div class="left">
            <div class="icon">发</div>
            <div class="box name-id">
              <div class="key">姓名</div>
              <div class="value">陈悠悠</div>
              <div class="key">身份证</div>
              <div class="value">186431351654646644654</div>
            </div>
            <div class="box phone-cellphone">
              <div class="key">手机号</div>
              <div class="value">17655556666</div>
              <div class="key">固定电话</div>
              <div class="value">200-54646541</div>
            </div>
            <div class="box address-detial">
              <div class="key">详细地址</div>
              <div class="value">北京市朝阳区爱国路20号</div>
            </div>
            <div class="box postal">
              <div class="key">邮政编码</div>
              <div class="value">518100</div>
            </div>
          </div>
          <div class="right">
            <div class="icon">收</div>
            <div class="box name-id">
              <div class="key">姓名</div>
              <div class="value">陈悠悠</div>
              <div class="key">身份证</div>
              <div class="value">186431351654646644654</div>
            </div>
            <div class="box phone-cellphone">
              <div class="key">手机号</div>
              <div class="value">17655556666</div>
              <div class="key">固定电话</div>
              <div class="value">200-54646541</div>
            </div>
            <div class="box address-detial">
              <div class="key">详细地址</div>
              <div class="value">北京市朝阳区爱国路20号</div>
            </div>
            <div class="box postal">
              <div class="key">邮政编码</div>
              <div class="value">518100</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box goods-info">
        <div class="item1">
          <div>
            <div class="key">件数</div>
            <div class="value">10</div>
            <div class="unit">件</div>
          </div>
          <div>
            <div class="key">SLAC件数</div>
            <div class="value">10</div>
            <div class="unit">件</div>
          </div>
          <div>
            <div class="key">重量</div>
            <div class="value">10</div>
            <div class="unit">件</div>
          </div>
        </div>
        <div class="item2">
          <div>
            <div class="key">计费重量</div>
            <div class="value">1000</div>
            <div class="unit">KG</div>
          </div>
          <div style="visibility:hidden">
            <div class="key">占位</div>
            <div class="value">占位</div>
            <div class="unit">占位</div>
          </div>
          <div>
            <div class="key">体积</div>
            <div class="value">2</div>
            <div class="unit">立方米</div>
          </div>
        </div>
        <div class="item3">
          <div class="key">货物尺寸</div>
          <EasyScrollbar>
            <div id="wrapper" class="box">
              <div>
                <p>100*100*10/5</p>
                <p>100*100*10/5</p>
                <p>100*100*10/5</p>
                <p>100*100*10/5</p>
                <p>100*100*10/5</p>
                <p>11</p>
              </div>
            </div>
          </EasyScrollbar>
        </div>
        <div class="item4">
          <div>
            <div class="key">处理代码</div>
            <div class="value">普货</div>
          </div>
          <div>
            <div class="key">包装</div>
            <div class="value">纸箱</div>
          </div>
          <div>
            <div class="key">货物名称</div>
            <div class="value">服装</div>
          </div>
        </div>
      </div>
      <div class="box price-info">
        <div class="price-top">
          <div class="left">
            <div>
              <div class="key">航空运价</div>
              <div class="value">10</div>
              <div class="unit">元/KG</div>
            </div>
            <div>
              <div class="key">燃油附加</div>
              <div class="value">0.2</div>
              <div class="unit">元/KG</div>
            </div>
            <div>
              <div class="key">其他费用</div>
              <div class="value">1000</div>
              <div class="unit">元</div>
            </div>
            <div>
              <div class="key">航空运费</div>
              <div class="value">1000</div>
              <div class="unit">元</div>
            </div>
          </div>
          <div class="right">
            <div class="key">备注</div>
            <div class="value"></div>
          </div>
        </div>
        <div class="price-bottom">
          <div>
            <div class="key">币种</div>
            <div class="value">CNY</div>
          </div>
          <div>
            <div class="key">制单时间</div>
            <div class="value">2017-10-10 10:10:10</div>
          </div>
          <div>
            <div class="key">制单人</div>
            <div class="value">林丹英</div>
          </div>
          <div>
            <div class="key">制单营业点</div>
            <div class="value">金鹏网</div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      listIcon: {
        hadpay: require("../../../assets/hadpay_icon.png"),
        needpay: require("../../../assets/needpay_icon.png"),
        send: require("../../../assets/send_icon.png"),
        willcare: require("../../../assets/willcare.png"),
        haddone: require("../../../assets/haddone.png"),
        planeIcon: require("../../../assets/plane_icon.png")
      },
      orderNum: "",
      startPortData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      startPort: "",
      endPortData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      endPort: "",
      goodsTypeData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      goodsType: "",
      orderStatusData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      orderStatus: "",
      orderTime: []
    };
  },
  methods:{
    examine(){
      this.dialogFormVisible = true
    },
    dealwith(data){
      console.log(data);
      this.$router.push('/supplier/order_deal')
    }
  }
};
</script>
<style lang="scss">
.order-taking {
  .head {
    height: 61px;
    line-height: 61px;
    padding-left: 20px;
    color: #b3b3b3;
    font-size: 16px;
  }
  .body {
    .body-top {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-top: 10px;
      border-bottom: 1px solid #ececec;
      .input-top,
      .input-bottom {
        margin: 10px 0px;
        .box {
          line-height: 30px;
          display: flex;
          color: #4c4c4c;
          margin-right: 20px;
          .key {
            margin-right: 10px;
          }
          .value {
            .el-input {
              input {
                height: 28px;
                background-color: #e6e6e6;
              }
              i {
                line-height: 30px;
              }
            }
            .el-date-editor {
              background-color: #e6e6e6;
              input {
                background-color: #e6e6e6;
              }
            }
          }
        }
      }
      .input-top {
        display: flex;
        .search-botton {
          flex: 1;
          text-align: right;
          button {
            padding: 6px 20px;
            box-shadow: 3px 3px 4px #e0e0e0;
          }
        }
      }
      .input-bottom {
        display: flex;
        .export {
          flex: 1;
          text-align: right;
          button {
            padding: 6px 20px;
            box-shadow: 3px 3px 4px #e0e0e0;
          }
        }
      }
    }
    .body-main {
      padding: 30px;
      .wrapper {
        display: grid;
        grid-template-columns: 100px 250px repeat(6, 1fr);
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
      }
      .tbody {
        margin-top: 10px;
        box-shadow: 4px 4px 4px #e0e0e0;
        background-color: #fff;
        .tbody-head {
          display: flex;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px dashed #efefef;
          color: #9f9f9f;
          > div {
            margin-left: 30px;
          }
          .mainOrderNum {
            .value {
              color: #40b4e5;
            }
          }
          .examine {
            flex: 1;
            text-align: right;
            cursor: pointer;
            margin-right: 30px;
            span {
              &:hover {
                color: gray;
              }
            }
          }
        }
        .wrapper {
          height: 100px;
          // text-align: center;
          justify-items: center;
          align-items: center;
          // grid-gap: 10px;
          > div {
            // border-right: 1px dashed #efefef;
            &:last-child {
              border: none;
            }
          }
          .address {
            position: relative;
            .start {
              &::before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: -20px;
                width: 1px;
                height: 50%;
                background-color: #9c9c9c;
              }
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: -20px;
                width: 10px;
                height: 1px;
                background-color: #9c9c9c;
              }
            }
            .end {
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                bottom: 20px;
                left: -20px;
                width: 10px;
                height: 1px;
                background-color: #9c9c9c;
              }
            }
          }
          .status {
            &.needpay {
              color: #f5323a;
            }
            &.send {
              color: #fcd831;
            }
            &.haddone {
              color: #8cc63f;
            }
            img {
              transform: translateY(2px);
            }
            button {
              margin-top: 8px;
              background-color: #fff;
              color: #fa5555;
              padding: 4px 10px;
              &:hover {
                color: #fa5555;
              }
            }
          }
          .operate {
            span {
              cursor: pointer;
              margin: 0 4px;
            }
            .detail:hover,
            .track:hover {
              color: black;
            }
            button {
              margin-top: 8px;
              padding: 4px 10px;
              box-shadow: 4px 4px 4px #e0e0e0;
            }
          }
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog__header {
        background-color: #fccf00;
        .el-dialog__title {
          color: #fff;
          font-weight: 700;
        }
      }
      .el-dialog__body {
        .box {
          margin: 10px 0;
        }
        .main-info {
          // min-height: 100px;
          box-shadow: 0px 0px 4px #e0e0e0;
          padding: 10px;
          .top,
          .mid,
          .bottom {
            display: flex;
            margin: 10px 0;
            .key {
              color: #9b9b9b;
              margin-right: 20px;
            }
            .value {
              color: #b5b5b5;
            }
          }
          .top {
            .order,
            .plane-num,
            .plane-time,
            .name {
              flex: 1;
              display: flex;
              padding: 0 10px;
              .key {
                color: #9b9b9b;
                margin-right: 10px;
              }
            }
            .order {
              .value {
                color: #f52b34;
                font-weight: 500;
              }
            }
          }
          .mid {
            .start,
            .end {
              display: flex;
              margin: 0 10px;
            }
            .end {
              margin-left: 100px;
              position: relative;
              &::before {
                content: "";
                display: inline-block;
                width: 100%;
                height: 1px;
                background-color: #e0e0e0;
                position: absolute;
                top: 50%;
                left: -98px;
              }
            }
          }
          .bottom {
            .proxy {
              display: flex;
              margin: 0 10px;
            }
          }
        }
        .address-info {
          padding: 0 10px;
          box-shadow: 0px 0px 4px #e0e0e0;
          .address {
            display: flex;
            height: 200px;
            margin-top: 20px;
            background-color: #fff;
            position: relative;
            line-height: 20px;
            .center-icon {
              position: absolute;
              right: 56%;
              top: 50%;
              transform: translate(120%, -40%);
            }
            .left {
              // 中间的斜线
              &::before {
                position: absolute;
                content: "";
                right: 60px;
                top: 0;
                width: 1px;
                height: 53%;
                background-color: #e6e6e6;
                transform-origin: 0px 0px;
                transform: rotate(-18deg);
              }
              &::after {
                position: absolute;
                content: "";
                right: 60px;
                bottom: 0;
                width: 1px;
                height: 53%;
                background-color: #e6e6e6;
                transform-origin: center bottom;
                transform: rotate(18deg);
              }
              .icon {
                background-color: #ffda44;
              }
            }
            .right {
              .icon {
                background-color: #f4292f;
              }
            }
            .left,
            .right {
              flex: 1;
              position: relative;
              // 右下角icon
              .icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                // background-color: #f4292f;
                position: absolute;
                bottom: 0;
                right: 50px;
                text-align: center;
                line-height: 30px;
                color: #fff;
                margin: 0 10px 10px 0;
              }
              .box {
                display: flex;
                .key {
                  width: 60px;
                  text-align: justify;
                  color: #999;
                  &::after {
                    content: "";
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    height: 0;
                  }
                }
                .value {
                  width: 160px;
                  margin-left: 20px;
                  color: #4d4d4d;
                }
              }
              .name-id,
              .phone-cellphone {
                .value {
                  width: 160px;
                }
              }
            }
          }
        }
        .goods-info {
          box-shadow: 0px 0px 4px #e0e0e0;
          display: flex;
          padding: 10px 20px;
          .item1,
          .item2,
          .item4 {
            flex: 1;
            > div {
              display: flex;
              margin: 10px 0;
              .key {
                width: 70px;
                text-align-last: justify;
              }
              .value {
                width: 70px;
                text-align: center;
              }
              .unit{
                width: 50px;
                text-align: center;
              }
            }
          }
          .item3 {
            flex: 1;
            display: flex;
            .easy-scrollbar {
              border: 1px solid #b3b3b3;
              height: 100px;
            }
            .key {
              line-height: 100px;
              transform: translateX(-20px);
            }
            .box {
              width: 200px;
              height: 100px;
              margin: 0;
              padding: 10px;
              box-sizing: border-box;
            }
          }
        }
        .price-info {
          min-height: 100px;
          box-shadow: 0px 0px 4px #e0e0e0;
          padding: 10px;
          .price-top {
            display: flex;
            padding-bottom: 10px;
            border-bottom: 1px dotted #e0e0e0;
            .left {
              > div {
                display: flex;
                .key {
                  width: 80px;
                  text-align-last: justify;
                }
                .value {
                  width: 80px;
                  text-align: center;
                }
                .unit {
                  width: 50px;
                  text-align: center;
                }
              }
            }
            .right {
              flex: 1;
              margin-left: 60px;
              display: flex;
              align-items: flex-end;
              .key {
                width: 80px;
                text-align-last: justify;
              }
              .value {
                flex: 1;
                border-bottom: 1px solid #e0e0e0;
              }
            }
          }
          .price-bottom{
            display: flex;
            margin-top: 10px;
            >div{
              flex: 1;
              display: flex;
              .key{
                color: #9F9F9F;
                width: 80px;
                text-align-last: justify;
                margin-right: 20px;
              }
              .value{
                color: #808080;
              }
            }
          }
        }
      }
      .dialog-footer{
        text-align: center;
        button{
          padding: 6px 80px;
        }
      }
    }
  }
}
</style>
