<template>
  <div class="making-bill">
    <div class="head">
      制单管理
    </div>
    <div class="body">
      <div class="body-top">
        <div class="row">
          <div class="start-port">
            <div class="key">始发港</div>
            <div class="value">
              <el-select size="mini" v-model="startport" placeholder="请选择">
                <el-option
                  v-for="item in startports"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="end-port">
            <div class="key">目的港</div>
            <div class="value">
              <el-select size="mini" v-model="endport" placeholder="请选择">
                <el-option
                  v-for="item in endports"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="start-time">
            <div class="key">起飞时间</div>
            <div class="value">
              <el-date-picker
                size="mini"
                v-model="starttime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="main-order-num">
            <div class="key">主单号</div>
            <div class="value"><el-input size="mini" v-model="mainOrderNum1" placeholder="请输入内容"></el-input></div>
            <div class="value2"><el-input size="mini"  v-model="mainOrderNum2" placeholder="请输入内容"></el-input></div>
          </div>
          <div class="plane-num">
            <div class="key">航班号</div>
            <div class="value"><el-input size="mini" v-model="planeNum" placeholder="请输入内容"></el-input></div>
          </div>
          <div class="order-num">
            <div class="key">订单号</div>
            <div class="value"><el-input size="mini" v-model="orderNum" placeholder="请输入内容"></el-input></div>
          </div>
          <div class="order-status">
            <div class="key">运单状态</div>
            <div class="value">
              <el-select size="mini" v-model="orderstatus" placeholder="请选择">
                <el-option
                  v-for="item in orderstatuses"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="btn">
            <el-button size="mini" type="danger">查询</el-button>
          </div>
        </div>
      </div>
      <div class="body-main">
        <!-- 制单处理模态框 -->
        <div class="make-bill-model">
          <el-dialog top="20px" width="1000px" title="制单处理" :visible.sync="dialogFormVisible">
            <div class="main-info">
              <div class="linear-gradient"></div>
              <div class="row">
                <div class="main-order-num">
                  <div class="key">主运单号</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.mainorderNum1" placeholder="888"></el-input></div>
                  <div class="value2"><el-input size="mini" v-model="makeBillModelData.mainorderNum2" placeholder="88886666"></el-input></div>
                </div>
                <div class="plane-num">
                  <div class="key">航班号</div>
                  <div class="value">
                    <el-select size="mini" v-model="makeBillModelData.planeNum" placeholder="请选择">
                      <el-option
                        v-for="item in makeBillModelData.planeNums"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="plane-data">
                  <div class="key">航班日期</div>
                  <div class="value">
                    <el-date-picker
                      size="mini"
                      v-model="makeBillModelData.planeData"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="start-port">
                  <div class="key">出发站</div>
                  <div class="value">
                    <el-input size="mini" v-model="makeBillModelData.startPort" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="end-port">
                  <div class="key">目的站</div>
                  <div class="value">
                    <el-input size="mini" v-model="makeBillModelData.endPort" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="proxy-company">
                  <div class="key">开单代理</div>
                  <div class="value">
                    <el-input size="mini" v-model="makeBillModelData.proxyCompany" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="proxy">
                  <div class="key">承运人</div>
                  <div class="value">
                    <el-input size="mini" v-model="makeBillModelData.proxy" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="address-info">
              <div class="send">
                <div class="icon"><span>发</span></div>
                <div>
                  <div class="key">姓名</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.sendName" placeholder="请输入姓名"></el-input></div>
                </div>
                <div>
                  <div class="key">国家代码</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.sendCountryCode" placeholder="请输入国家代码"></el-input></div>
                </div>
                <div>
                  <div class="key">所在区域</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.sendAddress" placeholder="请输入所在区域"></el-input></div>
                </div>
                <div>
                  <div class="key">详细地址</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.sendDetailAddress" placeholder="请输入详细地址"></el-input></div>
                </div>
                <div>
                  <div class="key">邮政编码</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.sendPostal" placeholder="请输入邮政编码"></el-input></div>
                </div>
              </div>
              <div class="receive">
                <div class="icon"><span>收</span></div>
                <div>
                  <div class="key">姓名</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.receiveName" placeholder="请输入姓名"></el-input></div>
                </div>
                <div>
                  <div class="key">国家代码</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.receiveCountryCode" placeholder="请输入国家代码"></el-input></div>
                </div>
                <div>
                  <div class="key">所在区域</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.receiveAddress" placeholder="请输入所在区域"></el-input></div>
                </div>
                <div>
                  <div class="key">详细地址</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.receiveDetailAddress" placeholder="请输入详细地址"></el-input></div>
                </div>
                <div>
                  <div class="key">邮政编码</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.receivePostal" placeholder="请输入邮政编码"></el-input></div>
                </div>
              </div>
            </div>
            <div class="goods-info">
              <div class="box box1">
                <div class="num">
                  <div class="key">件数</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsNum"  placeholder="10"></el-input></div>
                  <div class="unit">件</div>
                </div>
                <div class="SLAC-num">
                  <div class="key">SLAC件数</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsSLACNum" placeholder="10"></el-input></div>
                  <div class="unit">件</div>
                </div>
                <div class="weight">
                  <div class="key">重量</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsWeight" placeholder="10"></el-input></div>
                  <div class="unit">KG</div>
                </div>
              </div>
              <div class="box box2">
                <div class="pay-weight">
                  <div class="key">计费重量</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsPayWeight" placeholder="10"></el-input></div>
                  <div class="unit">KG</div>
                </div>
                <div class="hold">
                  <div class="key">占位</div>
                  <div class="value">占位</div>
                  <div class="unit">占位</div>
                </div>
                <div class="size">
                  <div class="key">体积</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsSize" placeholder="10"></el-input></div>
                  <div class="unit">立方米</div>
                </div>
              </div>
              <div class="box box3">
                <div class="key">货物尺寸</div>
                <div class="list">
                  <EasyScrollbar>
                    <div class="wrapper" id="wrapper" style="height: 80px;">
                      <div>
                        <p>1</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>100*100*10/5</p>
                        <p>2</p>
                      </div>
                    </div>
                  </EasyScrollbar>
                </div>
                <div class="add-btn"></div>
              </div>
              <div class="box box4">
                <div class="dealCode">
                  <div class="key">处理代码</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsDealCode" placeholder="10"></el-input></div>
                  <div class="unit"></div>
                </div>
                <div class="pack">
                  <div class="key">包装</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsPack" placeholder="10"></el-input></div>
                  <div class="unit"></div>
                </div>
                <div class="goods-name">
                  <div class="key">货物名称</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.goodsName" placeholder="10"></el-input></div>
                  <div class="unit"></div>
                </div>
              </div>
            </div>
            <div class="pay-info">
              <div class="pay-info-top">
                <div class="left">
                  <div class="currencyType">
                    <div class="key">币种</div>
                    <div class="value">
                      <el-select size="mini" v-model="makeBillModelData.currencyType" placeholder="请选择币种">
                        <el-option
                          v-for="item in makeBillModelData.currencyTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="unit"></div>
                  </div>
                  <div>
                    <div class="key">航空运价</div>
                    <div class="value"><el-input size="mini" v-model="makeBillModelData.unitPrice" placeholder="请输入航空运价"></el-input></div>
                    <div class="unit">元/KG</div>
                  </div>
                  <div>
                    <div class="key">燃油附加</div>
                    <div class="value"><el-input size="mini" v-model="makeBillModelData.additional" placeholder="请输入燃油附加"></el-input></div>
                    <div class="unit">元/KG</div>
                  </div>
                  <div>
                    <div class="key">其他费用</div>
                    <div class="value"><el-input size="mini" v-model="makeBillModelData.otherpay" placeholder="请输入其他费用"></el-input></div>
                    <div class="unit">元</div>
                  </div>
                  <div>
                    <div class="key">航空运费</div>
                    <div class="value"><el-input size="mini" v-model="makeBillModelData.allPrice" placeholder="请输入航空运费"></el-input></div>
                    <div class="unit">元</div>
                  </div>
                </div>
                <div class="right">
                  <div class="key">备注</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.remark" placeholder="备注"></el-input></div>
                </div>
              </div>
              <div class="pay-info-bottom">
                <div class="makeBillTime">
                  <div class="key">制单时间</div>
                  <div class="value">2017-10-10 10:10</div>
                </div>
                <div class="makeBillName">
                  <div class="key">制单人</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.makeBillName" placeholder="请输入制单人"></el-input></div>
                </div>
                <div class="makeBillpoint">
                  <div class="key">制单营业点</div>
                  <div class="value"><el-input size="mini" v-model="makeBillModelData.makeBillpoint" placeholder="请输入制单营业点"></el-input></div>
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button size="mini" type="warning">保存</el-button>
              <el-button size="mini" type="danger">提交</el-button>
            </div>
          </el-dialog>
        </div>



        <div class="thead wrapper">
          <div class="status">状态</div>
          <div class="line">线路</div>
          <div class="line-time">航班时刻</div>
          <div class="main-order-num">主单号</div>
          <div class="goodsName">货物名称</div>
          <div class="num">件数</div>
          <div class="weight">重量(千克)</div>
          <div class="needPayWeight">计费重量(千克)</div>
          <div class="size">体积(立方米)</div>
          <div class="operate">操作</div>
        </div>
        <!-- 未保存 -->
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">航班日期：2017-09-09 12:00</div>
            <div class="plane-num">HU7211</div>
          </div>
          <div class="wrapper">
            <div class="status red">
              <div class="icon el-icon-edit-outline"></div>
              <div>未保存</div>
            </div>
            <div class="line">
              <p class="start">北京嘚嘚的复发(PEK)</p>
              <p class="end">上海嘚嘚的复发(PVG)</p>
              <!-- 北京(PEK)——上海(PVG) -->
            </div>
            <div class="line-time">
              <p>10:10-10:10</p>
            </div>
            <div class="main-order-num">
              <p>15641646464</p>
            </div>
            <div class="goodsName">
              <p>服装</p>
              <p>(普货)</p>
            </div>
            <div class="num">
              <p>20</p>
            </div>
            <div class="weight">
              <p>2000</p>
            </div>
            <div class="needPayWeight">
              <p>2000</p>
            </div>
            <div class="size">
              <p>2</p>
            </div>
            <div class="operate">
              <div class="el-icon-edit"></div>
            </div>
          </div>
        </div>
        <!-- 已保存 -->
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">航班日期：2017-09-09 12:00</div>
            <div class="plane-num">HU7211</div>
          </div>
          <div class="wrapper">
            <div class="status yellow">
              <div class="icon el-icon-document"></div>
              <div>已保存</div>
            </div>
            <div class="line">
              <p class="start">北京嘚嘚的复发(PEK)</p>
              <p class="end">上海嘚嘚的复发(PVG)</p>
              <!-- 北京(PEK)——上海(PVG) -->
            </div>
            <div class="line-time">
              <p>10:10-10:10</p>
            </div>
            <div class="main-order-num">
              <p>15641646464</p>
            </div>
            <div class="goodsName">
              <p>服装</p>
              <p>(普货)</p>
            </div>
            <div class="num">
              <p>20</p>
            </div>
            <div class="weight">
              <p>2000</p>
            </div>
            <div class="needPayWeight">
              <p>2000</p>
            </div>
            <div class="size">
              <p>2</p>
            </div>
            <div class="operate">
              <div class="el-icon-edit"></div>
            </div>
          </div>
        </div>
        <!-- 已发送 -->
        <div class="tbody">
          <div class="tbody-head">
            <div class="time">航班日期：2017-09-09 12:00</div>
            <div class="plane-num">HU7211</div>
          </div>
          <div class="wrapper">
            <div class="status green">
              <div class="icon el-icon-message"></div>
              <div>已发送</div>
            </div>
            <div class="line">
              <p class="start">北京嘚嘚的复发(PEK)</p>
              <p class="end">上海嘚嘚的复发(PVG)</p>
              <!-- 北京(PEK)——上海(PVG) -->
            </div>
            <div class="line-time">
              <p>10:10-10:10</p>
            </div>
            <div class="main-order-num">
              <p>15641646464</p>
            </div>
            <div class="goodsName">
              <p>服装</p>
              <p>(普货)</p>
            </div>
            <div class="num">
              <p>20</p>
            </div>
            <div class="weight">
              <p>2000</p>
            </div>
            <div class="needPayWeight">
              <p>2000</p>
            </div>
            <div class="size">
              <p>2</p>
            </div>
            <div class="operate">
              <div class="el-icon-edit"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      makeBillModelData: {
        mainorderNum1: "",
        mainorderNum2: "",
        planeNum: "",
        planeNums: [
          {
            value: "选项1",
            label: "HU2030"
          },
          {
            value: "选项2",
            label: "HU2030"
          },
          {
            value: "选项3",
            label: "HU2030"
          },
          {
            value: "选项4",
            label: "HU2030"
          },
          {
            value: "选项5",
            label: "HU2030"
          }
        ],
        planeData: "",
        startPort: "",
        endPort: "",
        proxyCompany: "",
        proxy: "",
        sendName: "",
        sendCountryCode: "",
        sendAddress: "",
        sendDetailAddress: "",
        sendPostal: "",
        receiveName: "",
        receiveCountryCode: "",
        receiveAddress: "",
        receiveDetailAddress: "",
        receivePostal: "",
        goodsNum: "",
        goodsSLACNum: "",
        goodsWeight: "",
        goodsPayWeight: "",
        goodsSize: "",
        goodsDealCode: "",
        goodsPack: "",
        goodsName: "",
        currencyType: "",
        currencyTypes: [
          {
            value: "选项1",
            label: "CNY"
          },
          {
            value: "选项2",
            label: "CNY"
          },
          {
            value: "选项3",
            label: "CNY"
          },
          {
            value: "选项4",
            label: "CNY"
          },
          {
            value: "选项5",
            label: "CNY"
          }
        ],
        unitPrice: "",
        additional: "",
        otherpay: "",
        allPrice: "",
        remark: "",
        makeBillName: "",
        makeBillpoint: ""
      },
      dialogFormVisible: true,
      startports: [
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
      startport: "",
      endports: [
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
      endport: "",
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
      ],
      orderstatus: "",
      mainOrderNum1: "",
      mainOrderNum2: "",
      planeNum: "",
      orderNum: "",
      starttime: ""
    };
  }
};
</script>
<style lang="scss">
.making-bill {
  .red {
    color: #f5323b;
  }
  .yellow {
    color: #fcd210;
  }
  .green {
    color: #98cc54;
  }
  .head {
    height: 61px;
    padding-left: 20px;
    line-height: 61px;
    color: #d4d4d4;
  }
  .body {
    .body-top {
      border-bottom: 1px solid #e9e9e9;
      padding-bottom: 10px;
      .row {
        padding-left: 20px;
        margin: 10px 0;
        line-height: 28px;
        display: flex;
        > div {
          margin-right: 20px;
          display: flex;
          .key {
            margin-right: 10px;
            color: #595959;
          }
          .value,
          .value2 {
            .el-input {
              input {
                background-color: #e6e6e6;
                border: none;
                border-radius: 0;
              }
            }
          }
        }
        .main-order-num {
          .value {
            .el-input {
              width: 100px;
            }
          }
          .value2 {
            .el-input {
              input {
                border-left: 1px solid #d0d0d0;
              }
            }
          }
        }
        .order-status {
          .el-input {
            width: 100px;
          }
        }
        .btn {
          flex: 1;
          justify-content: flex-end;
          button {
            box-shadow: 4px 4px 4px #e0e0e0;
            padding: 4px 30px;
          }
        }
      }
    }
    .body-main {
      padding: 30px;
      .wrapper {
        // display: grid;
        // grid-template-columns: 100px 250px 100px 200px repeat(6, 1fr);
        display: flex;
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
        .status,.line-time{
          width: 100px;
        }
        .line{
          width: 250px;
        }
        .main-order-num,.goodsName,.num,.weight,.needPayWeight,.size,.operate{
          width: 96px;
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
          .line {
            position: relative;
            .start {
              &::before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: 40px;
                width: 1px;
                height: 50%;
                background-color: #9c9c9c;
              }
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: 40px;
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
                left: 40px;
                width: 10px;
                height: 1px;
                background-color: #9c9c9c;
              }
            }
          }
          .status {
            .icon {
              font-size: 25px;
            }
          }
          .operate {
            font-size: 25px;
            cursor: pointer;
          }
        }
      }
      .make-bill-model {
        .el-dialog {
          .el-dialog__header {
            background-color: #fccf00;
            .el-dialog__title {
              color: #fff;
            }
          }
          .el-dialog__body {
            padding: 20px;
            .main-info {
              box-shadow: 0 0 6px rgb(202, 202, 202);
              padding-bottom: 20px;
              .linear-gradient {
                height: 3px;
                margin-bottom: 10px;
                background: linear-gradient(
                  45deg,
                  yellow 0%,
                  yellow 50%,
                  red 50%,
                  red 100%
                );
                background-size: 40px 3px;
              }
              .row {
                padding: 5px 20px;
                display: flex;
                > div {
                  line-height: 28px;
                  display: flex;
                  border-bottom: 1px solid #e0e0e0;
                  margin: 0 20px;
                  .key {
                    color: #a6a6a6;
                  }
                  .value,
                  .value2 {
                    .el-input {
                      input {
                        border: none;
                      }
                    }
                  }
                }
                .main-order-num {
                  .value {
                    width: 80px;
                  }
                  .value2 {
                    border-left: 1px solid #e0e0e0;
                  }
                }
                .plane-num {
                  .value {
                    width: 100px;
                    input {
                      padding: 10px;
                    }
                  }
                }
                .plane-data {
                  .value {
                    .el-input {
                      width: 120px;
                    }
                  }
                }
              }
            }
            .address-info {
              display: flex;
              .send,
              .receive {
                flex: 1;
                box-shadow: 0 0 4px #a0a0a0;
                margin-top: 20px;
                position: relative;
                padding: 20px;
                > div {
                  display: flex;
                  border-bottom: 1px solid #e0e0e0;
                  margin-bottom: 5px;
                  .key {
                    width: 80px;
                    color: #a1a1a1;
                    text-align-last: justify;
                  }
                  .value {
                    .el-input {
                      input {
                        border: none;
                      }
                    }
                  }
                }
                .icon {
                  color: #fff;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 0;
                  height: 0;
                  border: 20px solid yellow;
                  border-color: yellow;
                  span {
                    position: relative;
                    transform: translate(-15px, -18px);
                    z-index: 99;
                  }
                }
              }
              .send {
                margin-right: 10px;
                .icon {
                  border-color: #ffdb43 transparent transparent #ffdb43;
                }
              }
              .receive {
                margin-left: 10px;
                .icon {
                  border-color: #f52831 transparent transparent #f52831;
                }
              }
            }
            .goods-info {
              display: flex;
              margin-top: 20px;
              padding: 10px;
              box-shadow: 0 0 4px #a0a0a0;
              .box {
                flex: 1;
                .hold {
                  visibility: hidden;
                }
                > div {
                  display: flex;
                }
                .key,
                .unit {
                  color: #a1a1a1;
                }
              }
              .box1,
              .box2,
              .box4 {
                padding: 0 10px;
                > div {
                  border-bottom: 1px solid #e0e0e0;
                }
                .key {
                  width: 70px;
                  text-align-last: justify;
                }
                .value {
                  padding-left: 10px;
                  .el-input {
                    width: 80px;
                    input {
                      text-align: center;
                      padding: 0;
                      border: none;
                    }
                  }
                }
                .unit {
                  width: 50px;
                  text-align: center;
                }
              }
              .box3 {
                display: flex;
                .key {
                  line-height: 80px;
                  text-align: center;
                }
                .list {
                  width: 130px;
                  height: 80px;
                  border: 1px solid #a0a0a0;
                  .wrapper {
                    height: 80px;
                    width: 120px;
                    p {
                      margin: 0;
                    }
                  }
                }
                .add-btn {
                  width: 20px;
                  height: 20px;
                  background-color: #fccf00;
                  position: relative;
                  transform: translate(10px, 30px);
                  cursor: pointer;
                  &::before,
                  &::after {
                    content: "";
                    position: absolute;
                    width: 2px;
                    height: 14px;
                    background-color: #fff;
                    top: 3px;
                    left: 9px;
                  }
                  &::after {
                    transform: rotate(90deg);
                  }
                }
              }
              .box4 {
                margin-left: 20px;
              }
            }
            .pay-info {
              margin-top: 20px;
              box-shadow: 0 0 4px #a0a0a0;
              padding: 30px 30px 20px 30px;
              .key,.unit {
                color: #a1a1a1;
              }
              .pay-info-top {
                display: flex;
                padding-bottom: 20px;
                border-bottom: 1px dotted #e0e0e0;
                .left {
                  width: 300px;
                  padding-right: 40px;
                  > div {
                    display: flex;
                    border-bottom: 1px solid #e0e0e0;
                    .key {
                      width: 65px;
                      text-align-last: justify;
                    }
                    .value {
                      .el-input {
                        width: 100px;
                        input {
                          border: none;
                          padding: 0;
                          text-align: center;
                        }
                      }
                    }
                    .unit {
                      width: 80px;
                      text-align: center;
                    }
                  }
                  .currencyType {
                    .value {
                      .el-input {
                        width: 160px;
                        input {
                          border: none;
                          padding-left: 12px;
                          text-align: left;
                        }
                      }
                    }
                  }
                }
                .right {
                  flex: 1;
                  display: flex;
                  align-items: flex-end;
                  .value {
                    .el-input {
                      width: 500px;
                      input {
                        border: none;
                        border-radius: 0;
                        border-bottom: 1px solid #e0e0e0;
                        margin-left: 20px;
                      }
                    }
                  }
                }
              }
              .pay-info-bottom {
                margin-top: 20px;
                display: flex;
                > div {
                  display: flex;
                }
                .makeBillTime {
                  width: 300px;
                  .key{
                    margin-right: 10px;
                  }
                }
                .makeBillName,
                .makeBillpoint {
                  margin: 0 20px;
                  border-bottom: 1px solid #e0e0e0;
                  .value {
                    .el-input {
                      input {
                        border: none;
                      }
                    }
                  }
                }
              }
            }
            .btn {
              padding-top: 20px;
              text-align: center;
              button{
                padding: 7px 60px;
                box-shadow: 4px 4px 4px #e0e0e0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
