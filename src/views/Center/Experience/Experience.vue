<template>
  <div class="experience">
    <header class="is-flex header">
      <h4>会员经验</h4>
      <div class="is-flex wrap">
        <div class="opt">
          <input v-model="last" value="1" name="last" id="last7" type="radio">
          <label for="last7" @click="fnLast">最近7天</label>
        </div>
        <div class="opt">
          <input v-model="last" value="2" name="last" id="last30" type="radio">
          <label for="last30" @click="fnLast">最近30天</label>
        </div>
        <div class="opt">
          <input v-model="last" value="3" name="last" id="last365" type="radio">
          <label for="last365" @click="fnLast">最近1年</label>
        </div>
      </div>
      <span class="btn btn-export">导出</span>
    </header>
    <section class="main">
      <div class="content">
        <el-table
          :data="pageTableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="value"
            label="时间"
            align="center"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="change"
            label="变更"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="exp"
            align="center"
            label="剩余经验值"
            width="180"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="grade"
            align="center"
            label="会员等级"
          > -->
          </el-table-column>
          <el-table-column
            prop="people"
            align="center"
            label="操作人"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="note"
            align="center"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
            v-show="total"
            class="is-flex jst-center page-pos"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="curPage"
            @current-change="changePage"
          >
      </el-pagination>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      last: "3",
      curPage: 1,
      pageSize: 1,
      tableData: [
        /* {
          value: "2017-11-12 18:00:00",
          changeType: 1,
          change: "180",
          exp: "3360",
          grade: "3级",
          people: "系统",
          note: "【订单完成】201709299392"
        } */
      ],
      total: 0
    };
  },
  computed: {
    filterTableDate() {
      var arr = this.tableData.map((obj, index, arr) => {
        var sign = {
          1: "+",
          2: "-"
        };
        obj.people = "系统";
        obj.change = sign[obj.changeType] + obj.change;
        return obj;
      });
      return arr;
    },
    pageTableData() {
      var arr = this.filterTableDate;
      var cur = this.curPage,
        size = this.pageSize,
        start = (cur - 1) * size,
        end = start + size;
      return arr.slice(start, end);
    },
    ...mapGetters(["id", "token"])
  },
  methods: {
    changePage(page) {
      this.curPage = page;
      this.check();
    },
    fnLast() {
      this.curPage = 1;
      this.check();
    },
    createArrayFromJson(arr, json) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var obj = {};
        for (var name in json) {
          obj[json[name]] = arr[i][name];
        }
        newArr.push(obj);
      }
      return newArr;
    },
    check() {
      this.axios
        .post("/app/v1/member/getMemberExps", {
          id: this.id,
          token: this.token,
          pageIndex: this.curPage,
          recordTimeType: this.last,
          size: this.pageSize
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.data.total;
            this.tableData = this.createArrayFromJson(
              // 函数将传入的数组，对数组每一项对象进行键名的修改，根据json的键值对修改为对应键名
              res.data.data.memberExpDTOS,
              {
                changeExp: "change",
                changeTime: "value",
                changeType: "changeType",
                cumulaExp: "exp",
                remark: "note"
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    /* getTime(str) {
      var strDate = str.split(" ")[0].replace(/-/, "/");
      var date = new Date(strDate);
      return date.getTime();
    } */
  },
  mounted() {
    this.check();
  }
};
</script>
<style lang="scss" scoped>
ul {
  padding-left: 0;
}
.btn {
  vertical-align: middle;
  border-radius: 2px;
  box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.1);
}
.card {
  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
}
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
  justify-content: space-between;
  h4 {
    padding-right: 80px;
  }
  .wrap {
    width: 800px;
  }
  .opt {
    padding-right: 30px;
    input {
      display: none;
      &:checked + label {
        color: #fccf00;
      }
    }
  }
  .btn-export {
    margin-left: 40px;
    padding: 2px 30px;
    background: #f52831;
    color: white;
  }
}
.main {
  padding: 20px 30px;
  color: #b3b3b3;
}
.page-pos {
  margin-top: 10px;
}
</style>
<style lang="scss">
.experience {
  .el-table {
    th,
    td {
      border: 0;
    }
    td {
      box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
    }
  }
  .cell {
    text-align: center;
    color: #999999;
    font-weight: normal;
  }
  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    border-top: 1px solid #f0f0f0;
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

.jst-left {
  justify-content: left;
}

.jst-center {
  justify-content: center;
}

.jst-right {
  justify-content: right;
}

.ali-around {
  align-items: space-around;
}

.ali-between {
  align-items: space-between;
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

