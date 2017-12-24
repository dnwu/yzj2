<template>
<div class="booking-space">
  <div class="head">
    订舱管理
  </div>
  <div class="body">
    <div class="body-top">
      <div class="column1">
        <div class="start">
          <div class="key">始发港</div>
          <div class="value">
            <!--<el-select size="mini" v-model="searchData.start" placeholder="请选择">
              <el-option
                v-for="item in starts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <StartPortselect @startportvalue='startPortValue'></StartPortselect>
          </div>
        </div>
        <div class="plane-num">
          <div class="key">航班号</div>
          <div class="value">
            <el-input size="mini" v-model="searchData.planenum" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="column2">
        <div class="end">
          <div class="key">目的港</div>
          <div class="value">
            <!--<el-select size="mini" v-model="searchData.end" placeholder="请选择">
              <el-option
                v-for="item in ends"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <EndPortselect></EndPortselect>
          </div>
        </div>
        <div class="order-num">
          <div class="key">订单号</div>
          <div class="value">
            <el-input size="mini" v-model="searchData.ordernum" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="column3">
        <div class="time">
          <div class="key">航班日期</div>
          <div class="value">
            <el-date-picker
              v-model="searchData.time"
              type="date"
               size="mini"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="order-status">
          <div class="key">订舱状态</div>
          <div class="value">
            <el-select size="mini" v-model="searchData.orderstatus" placeholder="请选择">
              <el-option
                v-for="item in orderstatuses"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="column4">
        <el-button size="mini" type="danger">查询</el-button>
      </div>
    </div>
    <div class="body-main">
      <div class="thead wrapper">
        <div class="status">状态</div>
        <div class="plane-num">航班号</div>
        <div class="line">线路</div>
        <div class="plane-data">航班日期</div>
        <div class="plane-time">航班时刻</div>
        <div class="name">货物名称</div>
        <div class="num">件数</div>
        <div class="weight">重量(千克)</div>
        <div class="pay-weight">付费重量(千克)</div>
        <div class="operate">操作</div>
      </div>
      <!-- 未订舱 -->
      <div class="tbody">
        <div class="tbody-head">
          <!-- <div class="time">2017-09-09 12:00</div> -->
          <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
          <!-- <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div> -->
          <div class="examine"><span class="value">拆分</span></div>
        </div>
        <div class="wrapper">
          <div class="status">
            <p>未订舱</p>
          </div>
          <div class="plane-num">
            <p>HU7211</p>
          </div>
          <div class="line">
            <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
            <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
          </div>
          <div class="plane-data">
            <p>2017-10-10</p>
          </div>
          <div class="plane-time">
            <p>10:10-10:10</p>
          </div>
          <div class="name">
            <p>服装</p>
          </div>
          <div class="num">
            <p>20</p>
          </div>
          <div class="weight">
            <p>2000</p>
          </div>
          <div class="pay-weight">
            <p>2000</p>
          </div>
          <div class="operate">
            <div class="icon el-icon-success"></div>
          </div>
        </div>
      </div>
      <!-- 已提交 -->
      <div class="tbody">
        <div class="tbody-head">
          <!-- <div class="time">2017-09-09 12:00</div> -->
          <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span class="value">拆分</span></div>
        </div>
        <div class="wrapper">
          <div class="status">
            <p class="yellow">已提交</p>
          </div>
          <div class="plane-num">
            <p>HU7211</p>
          </div>
          <div class="line">
            <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
            <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
          </div>
          <div class="plane-data">
            <p>2017-10-10</p>
          </div>
          <div class="plane-time">
            <p>10:10-10:10</p>
          </div>
          <div class="name">
            <p>服装</p>
          </div>
          <div class="num">
            <p>20</p>
          </div>
          <div class="weight">
            <p>2000</p>
          </div>
          <div class="pay-weight">
            <p>2000</p>
          </div>
          <div class="operate">
            <!-- <div class="icon el-icon-success"></div> -->
          </div>
        </div>
      </div>
      <!-- 订舱成功 -->
      <div class="tbody success">
        <div class="tbody-head">
          <!-- <div class="time">2017-09-09 12:00</div> -->
          <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span class="value">拆分</span></div>
        </div>
        <div class="wrapper">
          <div class="status">
            <p class="green">订舱成功</p>
          </div>
          <div class="plane-num">
            <p>HU7211</p>
          </div>
          <div class="line">
            <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
            <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
          </div>
          <div class="plane-data">
            <p>2017-10-10</p>
          </div>
          <div class="plane-time">
            <p>10:10-10:10</p>
          </div>
          <div class="name">
            <p>服装</p>
          </div>
          <div class="num">
            <p>20</p>
          </div>
          <div class="weight">
            <p>2000</p>
          </div>
          <div class="pay-weight">
            <p>2000</p>
          </div>
          <div class="operate">
            <!-- <div class="icon el-icon-success"></div> -->
          </div>
        </div>
      </div>
      <!-- 订舱失败 -->
      <div class="tbody">
        <div class="tbody-head">
          <!-- <div class="time">2017-09-09 12:00</div> -->
          <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
          <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
          <div class="examine"><span class="value">拆分</span></div>
        </div>
        <div class="wrapper">
          <div class="status">
            <p class="red">订舱失败</p>
          </div>
          <div class="plane-num">
            <p>HU7211</p>
          </div>
          <div class="line">
            <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
            <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
          </div>
          <div class="plane-data">
            <p>2017-10-10</p>
          </div>
          <div class="plane-time">
            <p>10:10-10:10</p>
          </div>
          <div class="name">
            <p>服装</p>
          </div>
          <div class="num">
            <p>20</p>
          </div>
          <div class="weight">
            <p>2000</p>
          </div>
          <div class="pay-weight">
            <p>2000</p>
          </div>
          <div class="operate">
            <div class="icon el-icon-success"></div>
          </div>
        </div>
      </div>
      <!-- 未订舱 -->
      <div class="tbody">
        <div class="tbody-head">
          <!-- <div class="time">2017-09-09 12:00</div> -->
          <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
          <!-- <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div> -->
          <div class="examine"><span class="value">拆分</span></div>
        </div>
        <div class="wrapper">
          <div class="status">
            <p>未订舱</p>
          </div>
          <div class="plane-num">
            <p>HU7211</p>
          </div>
          <div class="line">
            <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
            <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
          </div>
          <div class="plane-data">
            <p>2017-10-10</p>
          </div>
          <div class="plane-time">
            <p>10:10-10:10</p>
          </div>
          <div class="name">
            <p>服装</p>
          </div>
          <div class="num">
            <p>20</p>
          </div>
          <div class="weight">
            <p>2000</p>
          </div>
          <div class="pay-weight">
            <p>2000</p>
          </div>
          <div class="operate">
            <div class="icon active el-icon-success"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-form">
      <div class="form-head"></div>
      <div class="form-content">
        <div class="left">
          <h3>订舱航班</h3>
          <div class="plane-num">
            <div class="key">航班号</div>
            <div class="value">
              <el-input size="mini" v-model="bodyformData.planenum" placeholder="请输入航班号"></el-input>
            </div>
          </div>
          <div class="plane-data">
            <div class="key">航班日期</div>
            <div class="value">
              <el-date-picker
                v-model="bodyformData.data"
                type="date"
                size="mini"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="arrow el-icon-arrow-down"></div>
          </div>
          <div>
            <div class="key">始发港</div>
            <div class="value">北京(PEK)</div>
          </div>
          <div>
            <div class="key">目的港</div>
            <div class="value">上海(PVG)</div>
          </div>
          <div>
            <div class="key">剩余仓位</div>
            <div class="value">1000KG</div>
          </div>
        </div>
        <div class="center">
          <h3>订舱信息</h3>
          <div class="main-order-num">
            <div class="key">主运单号</div>
            <div class="value">
              <el-input size="mini" placeholder="880"></el-input>
            </div>
            <div class="line">|</div>
            <div class="value2">
              <el-input size="mini" placeholder="6688668866"></el-input>
            </div>
          </div>
          <div>
            <div class="key">重量</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
            <div class="unit">KG</div>
          </div>
          <div>
            <div class="key">件数</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
            <div class="unit">件</div>
          </div>
          <div>
            <div class="key">体积</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
            <div class="unit">立方米</div>
          </div>
          <div>
            <div class="key">货物名称</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
          </div>
          <div>
            <div class="key">货物代码</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
          </div>
          <div>
            <div class="key">代理人代码</div>
            <div class="value"><el-input size="mini" placeholder="6688668866"></el-input></div>
          </div>
          <div>
            <div class="key">计费重量</div>
            <div class="yellow value"><el-input size="mini" placeholder="6688668866"></el-input></div>
            <div class="unit">KG</div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="key">
              <p>货物尺寸</p>
              <p class="scale">(长*宽*高/件)</p>
              <p>单位：cm</p>
            </div>
            <div class="box">
              <EasyScrollbar>
                <div  id="wrapper">
                  <div class="box-inner">
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                    <p>100*100*10/5</p>
                  </div>
                </div>
              </EasyScrollbar>
            </div>
            <div class="add-btn"></div>
          </div>
          <div class="bottom">
            <div>
              <div class="key">备注</div>
              <div class="input"><el-input size="mini" v-model="remark" placeholder="请输入内容"></el-input></div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn">
        <el-button size="mini" type="danger">提交订舱</el-button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import StartPortselect from "@/components/StartPortselect";
  import EndPortselect from "@/components/EndPortselect";

  export default {
    components: {
      StartPortselect,
      EndPortselect,
    },
    data() {
    return {
      searchData: {
        start: "",
        planenum: "",
        end: "",
        ordernum: "",
        time: "",
        orderstatus: ""
      },
      bodyformData: {
        planenum: "",
        data: ""
      },
      remark: "",
      starts: [
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
      ends: [
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
      orderstatuses: [
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
      ]
    };
  },
    created() {
      this.getOrderList();
    },
    methods: {
      getOrderList() {
        this.axios.get("",{
            params: {}
        }).then(data => {
          console.log(data.data);
        });
      },
      startPortValue (data){
        console.log(data)
      },
    },
};
</script>
<style lang="scss">
.booking-space {
  .red {
    color: #f6484f;
  }
  .green {
    color: #7eca49 !important;
  }
  .yellow {
    color: #fccf00 !important;
  }
  .scale {
    transform: scale(0.8);
  }
  .head {
    height: 61px;
    color: #cccccc;
    line-height: 61px;
    padding-left: 20px;
  }
  .body {
    .body-top {
      display: flex;
      padding-left: 20px;
      border-bottom: 1px solid #f0f0f0;
      > div {
        flex: 1;
        height: 100px;
        > div {
          margin-top: 10px;
          display: flex;
          .key {
            line-height: 28px;
            margin-right: 10px;
            color: #505050;
          }
          .value {
            .el-select {
              width: 180px;
              .el-input__inner {
                background-color: #e6e6e6;
                border: none;
              }
              .el-input__suffix {
                display: none;
              }
            }
            .el-input {
              width: 180px;
              input {
                border: none;
                background-color: #e6e6e6;
              }
            }
          }
        }
      }
      .column4 {
        text-align: center;
        button {
          transform: translateY(30px);
          padding: 6px 40px;
          box-shadow: 4px 4px 4px #e0e0e0;
        }
      }
    }
    .body-main {
      padding: 30px;
      .wrapper {
        display: grid;
        grid-template-columns: 100px 100px 250px repeat(7, 1fr);
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
      }
      .thead {
        margin-bottom: 20px;
      }
      .tbody {
        margin-top: 2px;
        box-shadow: 4px 4px 4px #e0e0e0;
        background-color: #fff;
        &.success {
          background-color: #f7f7f7;
        }
        .tbody-head {
          display: flex;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px dashed #efefef;
          color: #9f9f9f;
          > div {
            margin-left: 30px;
          }
          .mainOrderNum,
          .orderNum,
          .examine {
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
          height: 80px;
          justify-items: center;
          align-items: center;
          .line {
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
          .operate {
            .icon {
              font-size: 30px;
              cursor: pointer;
              &.active {
                color: #8cc63f;
              }
            }
          }
        }
      }
    }
    .body-form {
      padding: 0 30px 30px 30px;
      background-color: #fff;
      background-clip: content-box;
      margin-bottom: 300px;
      .form-head {
        height: 4px;
        background: linear-gradient(
          45deg,
          yellow 0,
          yellow,
          50%,
          red 50%,
          red 100%
        );
        background-size: 40px 4px;
      }
      .form-content {
        display: flex;
        padding-bottom: 20px;
        border: 1px dotted #e0e0e0;
        .left {
          width: 350px;
          padding-left: 20px;
          border-right: 1px solid #e0e0e0;
          padding-right: 20px;
          h3 {
            color: #4f4f4f;
          }
          > div {
            display: flex;
            line-height: 20px;
            margin: 10px 0;
            .key {
              color: #999999;
              width: 80px;
              text-align-last: justify;
              margin-right: 20px;
            }
            .value {
              color: #808080;
            }
          }
          .plane-num,
          .plane-data {
            border-bottom: 1px solid #e0e0e0;
            position: relative;
            .value {
              .el-input {
                width: 180px;
                input {
                  border: none;
                  padding: 0 15px;
                }
                .el-input__prefix,
                .el-input__suffix {
                  display: none;
                }
              }
            }
            .arrow {
              position: absolute;
              top: 6px;
              right: 100px;
            }
          }
        }
        .center {
          width: 350px;
          padding: 0 40px;
          box-sizing: border-box;
          h3 {
            color: #4f4f4f;
          }
          > div {
            display: flex;
            margin: 15px 0;
            border-bottom: 1px solid #e0e0e0;
            .key {
              color: #a8a8a8;
              width: 80px;
              text-align-last: justify;
              margin-right: 10px;
            }
            .value {
              color: #5e5e5e;
              width: 80px;
              text-align: center;
              .el-input {
                input {
                  padding: 0;
                  border: none;
                  transform: translateY(-4px);
                  margin-left: 4px;
                }
              }
            }
            .unit {
              color: #a8a8a8;
              width: 80px;
              text-align: center;
            }
          }
          .main-order-num {
            position: relative;
            .line {
              position: absolute;
              top: 5px;
              left: 160px;
            }
            .value,
            .value2 {
              .el-input {
                input {
                  border: none;
                }
              }
            }
            .value {
              .el-input {
                width: 50px;
                input {
                  padding: 0;
                }
              }
            }
            .value2 {
              .el-input {
                width: 100px;
                input {
                  padding: 0;
                }
              }
            }
          }
        }
        .right {
          position: relative;
          .top {
            display: flex;
            padding-top: 40px;
            .key {
              width: 100px;
              color: #a5a5a5;
              text-align: center;
              padding-top: 70px;
              p {
                margin: 0;
              }
            }
            .box {
              width: 200px;
              height: 200px;
              border: 1px solid #b8b8b8;
              padding-left: 20px;
              box-sizing: border-box;
              #wrapper{
                height: 185px;
                .box-inner{
                  padding-bottom: 20px;
                }
              }
            }
            .add-btn {
              margin: 85px 0 0 50px;
              width: 30px;
              height: 30px;
              background-color: #fccf00;
              position: relative;
              cursor: pointer;
              &::before {
                content: "";
                position: absolute;
                width: 2px;
                height: 20px;
                background-color: #fff;
                top: 5px;
                left: 14px;
              }
              &::after {
                content: "";
                position: absolute;
                width: 2px;
                height: 20px;
                background-color: #fff;
                top: 5px;
                left: 14px;
                transform: rotate(90deg);
              }
            }
          }
          .bottom {
            position: absolute;
            bottom: 0;
            margin: 15px 0;
            > div {
              display: flex;
              .key {
                line-height: 28px;
              }
              .input {
                .el-input {
                  margin-left: 20px;
                  input {
                    border: none;
                    border-bottom: 1px solid #e0e0e0;
                    border-radius: 0;
                    padding: 0;
                  }
                }
              }
            }
          }
        }
      }
      .submit-btn {
        text-align: center;
        margin: 20px 0;
        button{
          padding: 7px 100px;
          box-shadow: 4px 4px 4px #e0e0e0;
        }
      }
    }
  }
}
</style>
