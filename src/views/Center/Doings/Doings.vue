<template>
  <div class="doings">
    <div class="is-flex header">
      <div class="left">我的活动</div>
      <div class="is-flex right">
        <span class="key">申请编号</span>
        <span class="is-flex opt opt-search">
          <i class="el-icon-search"></i>
          <el-input v-model="input" placeholder=""></el-input>
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
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size='mini'
          :picker-options="pickerOptions2">
        </el-date-picker>
      </span>
      <span class="key key-choose-name">订单状态</span>
      <span class="opt opt-state">
        <el-select v-model="orderStatu" placeholder="全部">
          <el-option
            v-for="item in orderStatus"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </span>
      <span class="btn btn-check">查询</span>
    </div>
    <div class="wrap">
      <div class="is-flex title">
        <span class="wide wide1">申请状态</span>
        <span class="wide wide2">运输路线</span>
        <span class="wide wide3">航班日起飞时间</span>
        <span class="wide wide4">申请运价<br>（元/千克）</span>
        <span class="wide wide5">原始运价<br>（元/千克）</span>
        <span class="wide wide6">重量<br>（千克）</span>
        <span class="wide wide7">货物类型</span>
        <span class="wide wide8">操作</span>
      </div>
      <ul>
        <li class="card" v-for="order in orders">
          <div class="is-flex tip">
            <span class="name">申请编号：</span>
            <span class="value" v-text="order.code"></span>
            <span class="name">申请日期：</span>
            <span class="value" v-text="order.date"></span>
          </div>
          <div class="is-flex contain">
            <span :class="['wide','wide1','state','yellow',{green:allow(order.state)}]" v-text="order.state"></span>
            <span class="wide wide2 line" v-text="order.line"></span>
            <span class="wide wide3 time" v-text="order.time"></span>
            <span class="wide wide4 apply yellow" v-text="order.apply"></span>
            <span class="wide wide5 original" v-text="order.original"></span>
            <span class="wide wide6 weight" v-text="order.weight"></span>
            <span class="wide wide7 type" v-text="order.type"></span>
            <span class="wide wide8 control">
              <img :src="pic" alt="" v-if="allow(order.state)">
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import StartPortselect from "@/components/StartPortselect";
import EndPortselect from "@/components/EndPortselect";

export default {
  components: { StartPortselect, EndPortselect },
  data() {
    return {
      pic: require("@/assets/reset_icon.png"),
      input: "", // 搜索输入框
      startPort: "", // 始发港
      endPort: "", // 目的港
      orderTime: [], // [ "2018-01-10T16:00:00.000Z", "2018-02-05T16:00:00.000Z" ],
      orderStatu: "全部", // 订单状态
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
      orderStatus: [
        {
          name: "全部"
        },
        {
          name: "待审核"
        },
        {
          name: "已通过"
        }
      ],
      orders: [
        {
          code: "SQ20173828372",
          date: "2017-11-12",
          state: "待审核",
          line: "北京（PEK） 上海(PVG)",
          time: "2017-11-12 10:00 - 12:00",
          apply: 3.5,
          original: 4.5,
          weight: 2000,
          type: "普货",
          control: true
        },
        {
          code: "SQ20173828372",
          date: "2017-11-12",
          state: "已通过",
          line: "北京（PEK） 上海(PVG)",
          time: "2017-11-12 10:00 - 12:00",
          apply: 3.5,
          original: 4.5,
          weight: 2000,
          type: "普货",
          control: true
        }
      ]
    };
  },
  methods: {
    allow(state) {
      return state == "已通过" ? true : false;
    },
    startportvalue(val) {
      console.log(val);
    },
    endportvalue(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
// 默认样式
.doings {
  color: #999999;
  width: 90%;
}
ul {
  padding-left: 0;
}
// 全局样式
.is-flex {
  display: flex;
}
.yellow {
  color: #fccf00;
}
.green {
  color: #7ac943;
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
  background-color: #c0c4cc;
}
//局部样式
.header {
  height: 61px;
  padding: 0 20px;
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
    background: #f52831;
    color: white;
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
    width: 200px;
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
    .el-input__inner {
      width: 59px;
      height: 25px;
      padding-right: 0;
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

