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
            <input v-model="keyword" placeholder="请输入订单号"></input>   
          </div>
          <div class="is-flex ali-center">
            <span class="name keyword">流水号</span>
            <el-input v-model="keyword" placeholder="请输入流水号"></el-input>
          </div>
          <div class="btn btn-check">查询</div>
        </div>
        <div class="is-flex ali-center row import">
          <div class="btn btn-import">导出</div>
        </div>
      </section>
      <section class="result">
        <div class="contain">
          <el-table
            :data="pageTableData"
            style="width: 100%">
            <el-table-column
              align="center"
              prop="date"
              label="交易时间"
              width="150">
            </el-table-column>
            <el-table-column
             align="center"
              prop="serial"
              label="流水号"
              width="150">
            </el-table-column>
            <el-table-column
            align="center"
              prop="value"
              label="订单号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="num"
              label="会员编号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="account"
              label="账号">
            </el-table-column>
            <el-table-column
            align="center"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
             align="center"
              prop="cash"
              label="交易金额">
            </el-table-column>
            <el-table-column
             align="center"
              prop="pay"
              label="支付方式">
            </el-table-column>
          </el-table>
          <el-pagination
            class="is-flex jst-center"
            layout="prev, pager, next"
            :total="tableData.length"
            :page-size="pageSize"
            :current-page="curPage"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {}, // 当前选中的对象
      keyword: "", // 关键字
      orderTime: "", // 订单时间范围
      orderNumber: "", // 订单号
      serialNumber: "", // 流水号
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
      pageSize: 6,
      curPage: 1,
      tableData: [
        {
          date: "2016-05-02",
          serial: "1440624203",
          value: "11224445632",
          num: "0658",
          account: "10613190",
          name: "王小虎",
          cash: "998",
          pay: "现金"
        },
        {
          date: "2016-05-02",
          serial: "1440624203",
          value: "11224445632",
          num: "0658",
          account: "10613190",
          name: "王小虎",
          cash: "998",
          pay: "现金"
        },
        {
          date: "2016-05-02",
          serial: "1440624203",
          value: "11224445632",
          num: "0658",
          account: "10613190",
          name: "王小虎",
          cash: "998",
          pay: "现金"
        }
      ]
    };
  },
  methods: {
    changePage(page) {
      this.curPage = page;
    },
    querySearch(queryString, cb) {
      var data = this.pageTableData;
      var results = queryString
        ? data.filter(this.createFilter(queryString))
        : data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return itme => {
        return (
          itme.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      /* this.itme = item; */
    }
    /* search() {
      if (this.number !== "") {
        this.tableData = [];
        this.tableData.push(item);
        this.curPage = 1;
      }
    } */
  },
  computed: {
    pageTableData() {
      var data = this.tableData,
        cur = this.curPage,
        size = this.pageSize,
        start = (cur - 1) * size,
        end = start + size;
      return this.tableData.slice(start, end);
    }
  }
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