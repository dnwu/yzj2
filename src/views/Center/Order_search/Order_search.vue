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
          <el-button size="mini" type="danger" @click="searchList()">查询</el-button>
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
        <!-- 待支付 -->
        <div class="tbody" v-for="(item,index) in orderListData" :key="index">
          <div class="tbody-head">
            <div class="time">{{item.createTime}}</div>
            <div class="orderNum">订单号：{{item.orderNo}}</div>
            <div class="mainOrderNum">主运单号：{{item.orderGoodsDetail.actualNumber}}</div>
          </div>
          <div class="wrapper">
            <div class="goodsName">
              <p class="black">{{item.orderGoodsDetail.goodsName}}</p>
              <p class="gray">({{getGoodsType(item.orderGoodsDetail.goodsType)}})</p>
            </div>
            <div class="black address">
              {{item.airportStart}}——{{item.airportEnd}}
            </div>
            <div class="num">
              <p class="gray">预计：{{item.orderGoodsDetail.goodsNumber}}</p>
              <p class="black">实际：{{item.orderGoodsDetail.actualNumber}}</p>
            </div>
            <div class="weight">
              <p class="gray">预计：{{item.orderGoodsDetail.goodsWeight}}</p>
              <p class="black">实际：{{item.orderGoodsDetail.actualWeight}}</p>
            </div>
            <div class="needPayWeight">
              <p class="gray">预计：{{item.orderGoodsDetail.valuationWeight}}</p>
              <p class="black">实际：{{item.orderGoodsDetail.valuationWeight}}</p>
            </div>
            <!-- 待支付 -->
            <template v-if="item.orderStatus=='3'">
              <div class="status">
                <div class="red"><img src="../../../assets/needpay_icon.png" alt="">待支付</div>
                <div><el-button size="mini" type="danger" plain @click="pay(item.orderNo,1)">立即支付</el-button></div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="info">取消订单</el-button></div>
              </div>
            </template>
            <!-- 待补缴 -->
            <template v-if="item.orderStatus=='6'">
              <div class="status">
                <div class="red"><img src="../../../assets/needpay_icon.png" alt="">待补缴</div>
                <div><el-button size="mini" type="danger" plain @click="pay(item.orderNo,2)">立即支付</el-button></div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="info">取消订单</el-button></div>
              </div>
            </template>
            <!-- 代提交 -->
            <template v-if="item.orderStatus=='1'">
              <div class="status">
                <div class="gray"><img src="../../../assets/needpay_icon.png" alt="">待提交</div>
                <div><el-button size="mini" type="danger" plain>立即提交</el-button></div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="info">取消订单</el-button></div>
              </div>
            </template>
            <!-- 已支付 -->
            <template v-else-if="item.orderStatus=='4'">
              <div class="status">
                <div class="black"><img src="../../../assets/hadpay_icon.png" alt="">已支付</div>
                <div>总额¥1602</div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="info">取消订单</el-button></div>
              </div>
            </template>
            <!-- 运送中 -->
            <template v-else-if="item.orderStatus=='5'">
              <div class="status">
                <div class="orange"><img src="../../../assets/send_icon.png" alt="">运送中</div>
                <div>总额¥1602</div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="warning">确认收货</el-button></div>
              </div>
            </template>
            <!-- 待受理 -->
            <template v-else-if="item.orderStatus=='2'">
              <div class="status">
                <div class="black"><img src="../../../assets/willcare.png" alt="">待受理</div>
                <div>总额¥1602</div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
                <div><el-button size="mini" type="info">取消订单</el-button></div>
              </div>
            </template>
            <!-- 已完成 -->
            <template v-else-if="item.orderStatus=='7'">
              <div class="status">
                <div class="green"><img src="../../../assets/haddone.png" alt="">已完成</div>
                <div>总额¥1602</div>
              </div>
              <div class="operate">
                <div><span class="detail" @click="goDetail(item.orderNo,item.id)">详情</span><span>|</span><span class="track" @click="goTrack(item.orderNo,item.id)">跟踪</span></div>
              </div>
            </template>
          </div>
        </div>
        <!-- 已支付 -->
        <!-- <div class="tbody">
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
        </div> -->
        <!-- 运送中 -->
        <!-- <div class="tbody">
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
        </div> -->
        <!-- 待受理 -->
        <!-- <div class="tbody">
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
        </div> -->
        <!-- 已完成 -->
        <!-- <div class="tbody">
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
        </div> -->
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total='pageTotal'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import { mapGetters } from "vuex";
import pay from '@/api/pay'
export default {
  components: { VDistpicker },
  data() {
    return {
      orderNum: "",
      orderListData: [],
      pageTotal: 60,
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
          value: "-1",
          label: "全部"
        },
        {
          value: "3",
          label: "待支付"
        },
        {
          value: "4",
          label: "已支付"
        },
        {
          value: "5",
          label: "运送中"
        },
        {
          value: "6",
          label: "待补缴"
        },
        {
          value: "2",
          label: "待受理"
        },
        {
          value: "7",
          label: "已完成"
        }
      ],
      orderStatu: ""
    };
  },
  created() {
    this.getOrderList(1, 10);
  },
  methods: {
    pay(orderNo,status){
      pay(orderNo,status)
    },
    errorAlert(title) {
      this.$notify.error({
        title: '错误',
        message: title
      });
    },
    searchList(){
      this.getOrderList(1,10,this.orderStatu)
    },
    goDetail(orderNo, id) {
      this.$router.push({
        path: "/center/order_detail",
        query: { orderNo: orderNo, id: id }
      });
    },
    goTrack(orderNo, id) {
      this.$router.push({
        path: "/center/order_track",
        query: { orderNo: orderNo, id: id }
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
    getOrderList(pageindex, size,orderStatus) {
      this.orderListData = []
      // size为页面显示数据量 ; pageindex为第几页
      if (size == undefined) {
        var _size = 10;
      } else {
        var _size = size;
      }
      var _pageindex = pageindex;
      // console.log("size", _size);
      // console.log('pageIndex', _pageindex);
      this.axios
        .post("/app/v1/order/getOrderList", {
          id: this.id,
          orderStatus: orderStatus,
          pageIndex: _pageindex,
          size: _size,
          token: this.token
        })
        .then(data => {
          // console.log(data.data.data.total);
          if (data.data.code == 1) {
            this.pageTotal = data.data.data.total;
            var orderList = data.data.data.orderBaseDTOS;
            this.orderListData.push(...orderList);
            // console.log(this.orderListData);
          }
          if(data.data.code == 10001){
            this.errorAlert('登录已失效，请重新登录')
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getOrderList(val, 10);
    }
  },
  computed: {
    ...mapGetters(["token", "id"])
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
    .page {
      text-align: center;
      margin-bottom: 100px;
    }
  }
}
</style>


