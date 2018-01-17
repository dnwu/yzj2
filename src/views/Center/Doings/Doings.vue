<template>
  <div class="doings">
    <div class="is-flex header">
      <div class="left">我的活动</div>
      <div class="is-flex right">
        <span class="key">申请编号</span>
        <span class="is-flex opt opt-search">
          <i class="el-icon-search"></i>
          <el-input class="inline-input" v-model="orderNo" placeholder="请输入内容"></el-input>
          <!-- <el-autocomplete
            class="inline-input"
            v-model="input"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete> -->
        </span>
      </div>
    </div>
    <div class="is-flex choose">
      <span class="key key-choose-name">运输路线</span>
      <span class="opt opt-place is-flex">
        <StartPortselect @startportvalue='startportvalue'></StartPortselect>
        <span class="show-line"></span>
        <EndPortselect @endportvalue='endportvalue'></EndPortselect>
      </span>
      <span class="key key-choose-name">申请日期</span>
      <span class="opt opt-time">
        <el-date-picker
          v-model="orderTime"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期"
          size='mini'
          value-format='yyyy-MM-dd'
          :picker-options="pickerOptions2">
        </el-date-picker>
      </span>
      <span class="key key-choose-name">申请状态</span>
      <span class="opt opt-state">
        <el-select v-model="orderStatu" placeholder="全部">
          <el-option v-for="item in orderStatus" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span class="btn btn-check" @click="handleCheck">查询</span>
    </div>
    <div class="wrap">
      <div class="is-flex title">
        <span class="wide wide1">申请状态</span>
        <span class="wide wide2">运输路线</span>
        <span class="wide wide3">航班日起飞时间</span>
        <span class="wide wide4">申请运价
          <br>（元/千克）</span>
        <span class="wide wide5">原始运价
          <br>（元/千克）</span>
        <span class="wide wide6">重量
          <br>（千克）</span>
        <span class="wide wide7">货物类型</span>
        <span class="wide wide8">操作</span>
      </div>
      <ul>
        <li class="card" v-for="order in orders" :key="order.id">
          <div class="is-flex tip">
            <span class="name">申请编号：</span>
            <span class="value" v-text="order.applyNo"></span>
            <span class="name">申请日期：</span>
            <span class="value" v-text="formatDate(order.applyDate)"></span>
          </div>
          <div class="is-flex contain">
            <span :class="['wide','wide1','state',orderStatus[order.applyStatus+1].color]" v-text="orderStatus[order.applyStatus+1].name"></span>
            <span class="wide wide2 line" v-text="order.cityStart + '—— ' + order.cityEnd"></span>
            <span class="wide wide3 time" v-text="order.flightTime"></span>
            <span class="wide wide4 apply yellow" v-text="order.applyAmount"></span>
            <span class="wide wide5 original" v-text="order.originalAmount"></span>
            <span class="wide wide6 weight" v-text="order.goodsWeight"></span>
            <span class="wide wide7 type" v-text="order.goodsTypeName"></span>
            <span class="wide wide8 control">
              <img src="../../../assets/doings_control.png" alt="" v-if="order.applyStatus == 1">
            </span>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination
      v-show="total"
      class="is-flex jst-center page-pos"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="1"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import StartPortselect from "@/components/StartPortselect";
import EndPortselect from "@/components/EndPortselect";

import { mapGetters } from "vuex";

export default {
  components: {
    StartPortselect,
    EndPortselect
  },
  data() {
    return {
      orderNo: "", // 搜索输入框
      startPort: "", // 始发港
      endPort: "", // 目的港
      orderTime: [], // [ "2018-01-10T16:00:00.000Z", "2018-02-05T16:00:00.000Z" ], // 起始地点
      orderStatu: -1, // 订单状态 // 0待审核 1已通过 2已拒绝
      // 以下为选项数据
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
      orders: [
        /* {
          accountId: 83,
          accountName: "罗国鸿",
          accountNo: "HH10011",
          applyAmount: 3.5,
          applyDate: "Jan 10, 2018 3:56:47 PM",
          applyNo: "SQ2017111004",
          applyStatus: 0,
          cityEnd: "上海（PVG）",
          cityStart: "北京（PEK）",
          couponCode: "czrmKg",
          docNo: "DDD111",
          examineId: 1,
          examineTime: "Jan 10, 2018 4:50:21 PM",
          flightTime: "在 2018-01-10 20点 至 24点 间",
          goodsType: 8,
          goodsTypeName: "冷链",
          goodsWeight: "1000",
          id: 4,
          originalAmount: 4.5
        } */
      ],
      orderStatus: [
        {
          color: "#000",
          name: "全部",
          value: -1
        },
        {
          color: "yellow",
          name: "待审核",
          value: 0
        },
        {
          color: "green",
          name: "已通过",
          value: 1
        },
        {
          color: "red",
          name: "已拒绝",
          value: 2
        }
      ],
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.check(1);
  },
  methods: {
    changePage(page) {
      // 分页按钮触发，从新请求当前数据
      this.check(page);
    },
    handleCheck() {
      this.check(1);
    },
    startportvalue(val) {
      this.startPort = val;
    },
    endportvalue(val) {
      this.endPort = val;
    },
    check(pageNo) {
      // console.log(this.orderStatu);
      var parms = {
        applyStatus: this.orderStatu,
        cityEnd: this.endPort,
        cityStart: this.startPort,
        endTime: this.orderTime[1],
        id: this.id,
        orderNo: this.orderNo,
        pageIndex: pageNo,
        size: this.pageSize,
        startTime: this.orderTime[0],
        token: this.token
      };
      console.log(parms);
      this.axios
        .post("/app/v1/bargaining/getBargainingList", parms)
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data.length !== 0) {
              this.total = res.data.total;
              this.orders = res.data.data;
            }
            if (res.data.data.length == 0) {
              this.$message({
                message: "暂无相关信息",
                type: "success"
              });
            }
          } else {
            this.$message({
              message: `查询失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
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
    ...mapGetters(["token", "id"])
    /* pageTableData() {
      var arr = this.orders;
      var cur = this.curPage,
        size = this.pageSize,
        start = (cur - 1) * size,
        end = start + size;
      return arr.slice(start, end);
    } */
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";

.doings {
  color: $gray;
  width: 90%;
}

ul {
  padding-left: 0;
} // 全局样式
.is-flex {
  display: flex;
}

.yellow {
  color: $yellow;
}

.green {
  color: $green;
}

.red {
  color: $red;
}

.key {
  // 加重字体格式
  color: #4c4c4c;
  font-size: 12px;
}

.opt {
  // 选择框样式
  background: #e5e5e5;
  vertical-align: middle;
  border-radius: 2px;
}

.btn {
  vertical-align: middle;
  border-radius: 2px;
}

.card {
  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
}

.show-line {
  position: relative;
  top: 46%;
  width: 15px;
  height: 1px;
  background-color: $gray;
} //局部样式
.header {
  @include header;
  justify-content: space-between;
  align-items: center;
  .right {
    align-items: center;
  }
  .opt-search {
    margin-left: 10px;
    padding: 1px 5px;
    align-items: center;
    width: 200px;
    height: 20px;
  }
}

.choose {
  height: 45px;
  justify-content: center;
  align-items: center;
  $opt-height: 25px;
  .opt-place {
    justify-content: space-around;
    min-width: 200px;
    height: $opt-height;
  }
  .opt-time {
    min-width: 200px;
    height: $opt-height;
  }
  .opt-state {
    min-width: 70px;
    height: $opt-height;
  }
  .key-choose-name {
    margin-right: 10px;
    margin-left: 30px;
  }
  .btn-check {
    margin-left: 40px;
    padding: 0 30px;
    line-height: $opt-height;
    background: $red;
    color: white;
    box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.1);
    &:active {
      background-color: #f55757;
    }
  }
}

.wrap {
  padding: 25px 30px 0;
  .title {
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .card {
    margin-bottom: 5px;
    .tip {
      padding: 10px 0;
      border-bottom: 1px dotted #f1f1f1;
      font-size: 12px;
      line-height: 10px;
      .name {
        margin-left: 20px;
      }
      .value {
        color: #29abe2;
      }
    }
  }
  .contain {
    justify-content: space-between;
    padding: 15px 0;
  }
  .wide {
    // 对表格的表头和内容进行统一控制
    display: inline-block;
    text-align: center;
  }
  .wide1 {
    width: 120px;
  }
  .wide2 {
    width: 300px;
    flex: 1;
  }
  .wide3 {
    width: 200px;
  }
  .wide4 {
    width: 80px;
  }
  .wide5 {
    width: 80px;
  }
  .wide6 {
    width: 60px;
  }
  .wide7 {
    width: 80px;
  }
  .wide8 {
    width: 80px;
  }
}
</style>
<style lang='scss'>
.doings {
  .header {
    .el-input input {
      border: none;
      border-radius: 0;
      background-color: #e6e6e6;
      height: 20px;
    }
  }
  .choose {
    .el-select {
      .el-input {
        input {
          border: none;
          border-radius: 0;
          background-color: #e6e6e6;
        }
        .el-input__suffix {
          display: none;
          .el-input__suffix-inner {
            width: 100px;
          }
        }
      }
    }
    .opt-place {
      .el-input__inner {
        width: 170px;
        height: 25px;
        padding-right: 0;
      }
    }
    .opt-time {
      .el-input__inner {
        height: 25px;
        padding-right: 0;
      }
    }
    .opt-state {
      .el-input__inner {
        width: 70px;
        height: 25px;
        padding-right: 0;
      }
    }
    .el-date-editor {
      width: 260px;
      background-color: #e6e6e6;
      .el-range__close-icon {
        position: absolute;
        top: 0;
        right: 0;
      }
      input {
        background-color: #e6e6e6;
      }
    }
  }
}
</style>


