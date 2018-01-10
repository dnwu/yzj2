<template>
  <div class="bill_look">
    <header class="is-flex ali-center header">
      <h4>账单查看</h4>
    </header>
    <main>
      <section class="is-flex jst-between search">
        <div class="name-val">
          <span class="name number">订单号</span>
          <div class="val value">
            <el-autocomplete
              class="inline-input"
              v-model="number"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </div>
        <div class="name-val">
          <span class="name time">交易时间</span>
          <div class="val value">
            <el-date-picker class="val time" v-model="orderTime" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" size='mini' :picker-options="pickerOptions2">
            </el-date-picker>            
          </div>
        </div>
        <div class="name-val">
          <div class="btn btn-search">
            <i class="el-icon-search"></i>
            <span>查询</span>
          </div>          
        </div>
      </section>
      <section class="result">
        <header class="title is-flex ali-center jst-between">
          <div>
              <i class="el-icon-tickets"></i>
              <span>查询结果</span>   
          </div>
         <el-pagination
            layout="prev, pager, next"
            :total="tableData.length"
            :page-size="pageSize"
            :current-page="curPage"
            @current-change="changePage"
          >
          </el-pagination>
        </header>
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
              prop="cash"
              label="交易金额">
            </el-table-column>
            <el-table-column
             align="center"
              prop="state"
              label="订单状态">
            </el-table-column>
          </el-table>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {},
      number: "",
      orderTime: "",
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
          serial: "王小虎",
          value: "123",
          cash: "1",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待受理"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "2",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "成功"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "3",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待受理"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "4",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "成功"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "5",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待受理"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "6",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "成功"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "7",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待受理"
        },
        {
          date: "2016-05-02",
          serial: "王小虎",
          value: "123",
          cash: "8",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "成功"
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
      this.itme = item;
    },
    search() {
      if (this.number !== "") {
        this.tableData = [];
        this.tableData.push(item);
        this.curPage = 1;
      }
    }
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
@mixin header {
  height: 61px;
  align-items: center;
  padding-left: 20px;
  color: #b3b3b3;
  h4 {
    font-weight: normal;
  }
}

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
$yellow: #fccf00;
.title {
  margin-top: 20px;
  padding: 10px 40px;
  margin: 20px 40px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  color: $yellow;
  font-size: 16px;
}
.search {
  padding: 20px 120px;
  .btn-search {
    line-height: 2.3em;
    width: 10em;
    text-align: center;
    background: $yellow;
    color: white;
  }
}
.contain {
  padding: 20px 120px;
}
</style>
<style lang='scss'>
.bill_look {
  .el-input__inner {
    height: 40px;
  }
  .el-range-editor--mini.el-input__inner {
  }
}
</style>

<style lang="scss" scoped>
/* position */

.is-relative {
  position: relative;
}

.is-absolute {
  position: absolute;
}

.is-fixed {
  position: fixed;
}
/* flex */

.is-flex {
  display: flex;
}

.dir-row {
  flex-direction: row;
}

.dir-column {
  flex-direction: column;
}

.jst-around {
  justify-content: space-around;
}

.jst-between {
  justify-content: space-between;
}

.ali-left {
  align-items: left;
}

.ali-center {
  align-items: center;
}

.ali-right {
  align-items: right;
}
/* display */

.is-block {
  display: block;
}

.is-none {
  display: none;
}

.is-inline-block {
  display: inline-block;
}
/* text */

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-jst {
  text-align: justify;
}

.text-jst:after {
  content: "";
  display: inline-block;
  width: 100%;
  overflow: hidden;
  height: 0;
}

.text-top {
  vertical-align: text-top;
}

.text-middle {
  vertical-align: middle;
}

.text-bottom {
  vertical-align: text-bottom;
}
/* 颜色类 */
</style>
