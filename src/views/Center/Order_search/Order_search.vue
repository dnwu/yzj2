<template>
  <div class="order_search">
    <div class="head">
      <div class="title">订单查询</div>
      <div class="input">
        <span>订单号</span>
        <i class="el-icon-search"></i>
        <el-input v-model="orderNum" placeholder="请输入订单号"></el-input>
      </div>
    </div>
    <div class="main">
      <div class="main-head">
        <div class="addressinput">
          <span>收发地</span>
          <v-distpicker only-province></v-distpicker>
          <span class="line"></span>
          <v-distpicker only-province></v-distpicker>
        </div>
        <div class="goodsType">
          <span>货物类型</span>
          <div class="select">
            <el-select v-model="goodsType" placeholder="请选择">
              <el-option
                v-for="item in goodsTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="orderTime">
          <span>订单时间</span>
          <div class="block">
            <el-date-picker
              v-model="orderTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size='mini'
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </div>
        <div class="orderStatus">
          <span>订单状态</span>
          <div class="select">
            <el-select v-model="orderStatu" placeholder="请选择">
              <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search">
          <el-button size="mini" type="danger">查询</el-button>
        </div>
      </div>
      <div class="main-body">
        <div class="thead wrapper">
          <div class="goodsName">货物名称</div>
          <div class="address">收发地</div>
          <div class="num">件数</div>
          <div class="weight">重量(千克)</div>
          <div class="needPayWeight">计费重量(千克)</div>
          <div class="status">状态</div>
          <div class="operate">操作<el-button size="mini" type="warning">导出</el-button></div>
        </div>
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">2017-09-09 12:00</div>
            <div class="orderNum">订单号：135165465</div>
            <div class="mainOrderNum">主运单号：74459-4135465416</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">服装</p>
              <p class="gray">(普货)</p>
            </div>
            <div class="black address">
              北京(PEK)——上海(PVG)
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
            <div class="status">
              <div class="red"><img src="../../../assets/needpay_icon.png" alt="">待支付</div>
              <div><el-button size="mini" type="danger" plain>立即支付</el-button></div>
            </div>
            <div class="operate">
              <div><span class="detail">详情</span><span>|</span><span class="track">跟踪</span></div>
              <div><el-button size="mini" type="info">取消订单</el-button></div>
            </div>
          </div>
        </div>
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">2017-09-09 12:00</div>
            <div class="orderNum">订单号：135165465</div>
            <div class="mainOrderNum">主运单号：74459-4135465416</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">服装</p>
              <p class="gray">(普货)</p>
            </div>
            <div class="black address">
              北京(PEK)——上海(PVG)
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
            <div class="status">
              <div class="black"><img src="../../../assets/hadpay_icon.png" alt="">已支付</div>
              <div>总额¥1602</div>
            </div>
            <div class="operate">
              <div><span class="detail">详情</span><span>|</span><span class="track">跟踪</span></div>
              <div><el-button size="mini" type="info">取消订单</el-button></div>
            </div>
          </div>
        </div>
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">2017-09-09 12:00</div>
            <div class="orderNum">订单号：135165465</div>
            <div class="mainOrderNum">主运单号：74459-4135465416</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">服装</p>
              <p class="gray">(普货)</p>
            </div>
            <div class="black address">
              北京(PEK)——上海(PVG)
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
            <div class="status">
              <div class="orange"><img src="../../../assets/send_icon.png" alt="">运送中</div>
              <div>总额¥1602</div>
            </div>
            <div class="operate">
              <div><span class="detail">详情</span><span>|</span><span class="track">跟踪</span></div>
              <div><el-button size="mini" type="warning">确认收货</el-button></div>
            </div>
          </div>
        </div>
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">2017-09-09 12:00</div>
            <div class="orderNum">订单号：135165465</div>
            <div class="mainOrderNum">主运单号：74459-4135465416</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">服装</p>
              <p class="gray">(普货)</p>
            </div>
            <div class="black address">
              北京(PEK)——上海(PVG)
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
            <div class="status">
              <div class="black"><img src="../../../assets/willcare.png" alt="">待受理</div>
              <div>总额¥1602</div>
            </div>
            <div class="operate">
              <div><span class="detail">详情</span><span>|</span><span class="track">跟踪</span></div>
              <div><el-button size="mini" type="info">取消订单</el-button></div>
            </div>
          </div>
        </div>
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">2017-09-09 12:00</div>
            <div class="orderNum">订单号：135165465</div>
            <div class="mainOrderNum">主运单号：74459-4135465416</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">服装</p>
              <p class="gray">(普货)</p>
            </div>
            <div class="black address">
              北京(PEK)——上海(PVG)
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
            <div class="status">
              <div class="green"><img src="../../../assets/haddone.png" alt="">已完成</div>
              <div>总额¥1602</div>
            </div>
            <div class="operate">
              <div><span class="detail">详情</span><span>|</span><span class="track">跟踪</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      orderNum: "",
      goodsTypes: [
        {
          value: "选项1",
          label: "普货1"
        },
        {
          value: "选项2",
          label: "普货2"
        },
        {
          value: "选项3",
          label: "普货3"
        },
        {
          value: "选项4",
          label: "普货4"
        },
        {
          value: "选项5",
          label: "普货5"
        }
      ],
      goodsType: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderTime: "",
      orderStatus: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "待支付"
        },
        {
          value: "选项3",
          label: "已支付"
        },
        {
          value: "选项4",
          label: "运送中"
        },
        {
          value: "选项5",
          label: "待受理"
        },
        {
          value: "选项6",
          label: "已完成"
        }
      ],
      orderStatu: ""
    };
  }
};
</script>
<style lang="scss">
.order_search {
  .black {
    color: #111111;
    font-weight: 700;
  }
  .red {
    color: #f52731;
  }
  .gray {
    color: #adadad;
  }
  .orange {
    color: #fcce00;
  }
  .green {
    color: #8cc63e;
  }
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
        padding-left: 20px;
      }
      span {
        width: 100px;
        margin-right: 20px;
      }
      i {
        position: absolute;
        top: 24px;
        left: 100px;
        z-index: 99;
      }
    }
  }
  .main {
    .main-head {
      height: 50px;
      display: flex;
      line-height: 50px;
      position: relative;
      .addressinput {
        display: flex;
        margin-left: 30px;
        span:first-child {
          margin-right: 20px;
        }
        .line {
          position: absolute;
          top: 50%;
          left: 218px;
          z-index: 999;
          width: 10px;
          height: 1px;
          background-color: gray;
        }
        .address {
          select {
            height: 30px;
            background-color: #e6e6e6;
            border-radius: 0;
            -webkit-appearance: none;
            border: none;
            outline: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
        }
      }
      .goodsType {
        display: flex;
        margin-left: 10px;
        .select {
          margin-left: 5px;
          .el-select {
            input {
              height: 30px;
              width: 80px;
              padding: 0 20px 0 10px;
              border: none;
              background-color: #e6e6e6;
            }
          }
        }
      }
      .orderTime {
        display: flex;
        margin-left: 10px;
        .block {
          margin-left: 10px;
          .el-date-editor {
            background-color: #e6e6e6;
            input {
              background-color: #e6e6e6;
            }
          }
        }
      }
      .orderStatus {
        display: flex;
        margin-left: 10px;
        .select {
          margin-left: 5px;
          .el-select {
            input {
              height: 30px;
              width: 80px;
              padding: 0 20px 0 10px;
              border: none;
              background-color: #e6e6e6;
            }
          }
        }
      }
      .search {
        margin-left: 50px;
        button {
          width: 100px;
        }
      }
    }
    .main-body {
      padding: 30px;
      .wrapper {
        display: grid;
        grid-template-columns: 100px 250px repeat(5, 1fr);
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
      }
      .thead {
        margin-top: 20px;
        .operate {
          position: relative;
          button {
            position: absolute;
            top: -5px;
            right: 0;
            // transform: translateY(-5px);
          }
        }
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
          .status {
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
            }
          }
        }
      }
    }
  }
}
</style>


