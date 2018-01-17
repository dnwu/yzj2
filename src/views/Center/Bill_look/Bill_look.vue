<template>
  <div class="bill_look">
    <header class="is-flex ali-center header">
      <h4>账单查看</h4>
    </header>
    <main>
      <section class="search">
        <div class="is-flex  ali-center row">
          <div class="is-flex ali-center">
            <span class="name time">交易时间</span>
            <el-date-picker v-model="orderTime" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" size='mini' :picker-options="pickerOptions2">
            </el-date-picker>       
          </div>
          <div class="is-flex ali-center">
            <span class="name keyword">关键字</span>
            <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
          </div>
        </div>
        <div class="is-flex  ali-center row">
          <div class="is-flex ali-center order">
            <span class="name time">订单号</span>
            <input v-model="orderNo" placeholder="请输入订单号"></input>   
          </div>
          <div class="is-flex ali-center">
            <span class="name keyword">流水号</span>
            <el-input v-model="orderLog" placeholder="请输入流水号"></el-input>
          </div>
          <div class="btn btn-check" @click="handleCheck">查询</div>
        </div>
        <div class="is-flex ali-center row import">
          <div class="btn btn-import">导出</div>
        </div>
      </section>
      <section class="result">
        <div class="contain">
          <el-table
            :data="filterTableData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="payTime"
              label="交易时间"
              width="150">
            </el-table-column>
            <el-table-column
             align="center"
              prop="orderLog"
              label="流水号"
              width="150">
            </el-table-column>
            <el-table-column
            align="center"
              prop="orderNo"
              label="订单号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="memberNo"
              label="会员编号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="account"
              label="账号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="fullName"
              label="姓名">
            </el-table-column>
            <el-table-column
             align="center"
              prop="orderAmt"
              label="交易金额">
            </el-table-column>
            <el-table-column
             align="center"
              prop="payType"
              label="支付方式">
            </el-table-column>
          </el-table>
          <el-pagination
            class="is-flex jst-center"
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :current-page="pageIndex"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      /* item: {}, */ // 当前选中的对象
      keyword: "", // 关键字
      orderTime: [], // 订单时间范围 // [ "2017-02-04T16:00:00.000Z", "2018-02-09T16:00:00.000Z" ]
      orderNo: "", // 订单号
      orderLog: "", // 流水号
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
      tableData: [
        /* {
          payTime: "2016-05-02", //  支付时间
          orderLog: "1440624203", // 流水号
          orderNo: "11224445632", // 订单编号
          memberNo: "0658", //  会员编号
          account: "10613190",
          fullName: "王小虎", // 姓名
          orderAmt: "998", // 支付金额
          payType: 1 // 支付类型 1：订单支付 2：订单补缴 3：订单退款,
        } */
      ],
      size: 10,
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    changePage(page) {
      this.pageIndex = page;
      this.getBillList();
    },
    handleCheck() {
      this.pageIndex = 1;
      this.getBillList();
    },
    getBillList() {
      var params = {
        endTime: this.orderTime[1],
        id: this.id,
        keyword: this.keyword,
        orderLog: this.orderLog,
        orderNo: this.orderNo,
        pageIndex: 1,
        size: 10,
        startTime: this.orderTime[0],
        token: this.token
      };
      console.log(params);
      this.axios
        .post("/app/v1/bill/list", params)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.total = res.data.total;
            this.tableData = res.data.bills;
          } else {
            this.$message({
              message: `账单列表获取失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
          console.log(err);
        });
    },
    formatDate(strTime) {
      // 将传入的字符传时间格式化成 xxxx-xx-xx
      var date = new Date(strTime);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    }
  },
  computed: {
    ...mapGetters(["id", "token"]),
    filterTableData() {
      return this.tableData.filter(item => {
        item.payTime = this.formatDate(item.payTime);
        var type = {
          1: "订单支付",
          2: "订单补缴",
          3: "订单退款"
        };
        item.payType = type[item.payType];
        return true;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";

.header {
  @include header;
}

.name-val {
  display: flex;
  align-items: center;
  .name {
    margin-right: 10px;
  }
  .val {
  }
}
.title {
  margin-top: 20px;
  padding: 10px 40px;
  margin: 20px 40px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  color: $yellow;
  font-size: 16px;
}
.search {
  color: $gray;
  margin: 10px 0px;
  .name {
    width: 100px;
    text-align: right;
    margin-right: 20px;
    color: #000;
    font-size: 12px;
  }
  .order input {
    padding: 4px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    &::-webkit-input-placeholder {
      color: #c0c4cc;
    }
    background-color: #e6e6e6;
  }
  .row {
    position: relative;
    width: 1300px;
    margin-bottom: 5px;
    height: 25px;
    padding: 5px;
  }
  .btn-check {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0 40px 0 0;
    padding: 3px 30px;
    color: white;
    background: $red;
    box-shadow: 2px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .btn-import {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0 40px 0 0;
    padding: 3px 30px;
    color: white;
    background: $yellow;
    box-shadow: 2px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .import {
    border-top: 1px solid #e5e5e5;
  }
}
.contain {
  padding: 20px 20px;
}
</style>
<style lang='scss'>
.bill_look {
  .el-input__inner {
    height: 25px;
    background-color: #e6e6e6;
  }
  .el-range-editor--mini.el-input__inner {
    background-color: #e6e6e6;
  }
  .el-range-editor--mini .el-range-input {
    font-size: 12px;
    background-color: #e6e6e6;
  }
}
</style>