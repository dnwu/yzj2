<template>
  <div class="integral">
    <header class="is-flex header">
      <h4>会员积分</h4>
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
          :data="filterTableDate"
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
            prop="integral"
            align="center"
            label="剩余积分"
            width="180"
          >
          </el-table-column>
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
      pageSize: 10,
      tableData: [
        /* {
          value: "2018-1-8 12:00:00",
          change: "+180",
          integral: "3360",
          people: "系统",
          note: "【订单完成】201709299392"
        } */
      ],
      total: 0
    };
  },
  computed: {
    ...mapGetters(["id", "token"]),
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
    }
  },
  methods: {
    changePage(page) {
      // 分页插件触发
      this.curPage = page;
      this.check();
    },
    fnLast() {
      // 最近天数触发
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
        .post("/app/v1/integral/getIntegrals", {
          id: this.id,
          token: this.token,
          pageIndex: this.curPage,
          recordTimeType: this.last,
          size: this.pageSize
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.total = res.data.data.total;
            this.tableData = this.createArrayFromJson(
              // 函数将传入的数组，对数组每一项对象进行键名的修改，根据json的键值对修改为对应键名
              res.data.data.integralDTOS,
              {
                changeIntegral: "change",
                changeTime: "value",
                changeType: "changeType",
                cumulaIntegral: "integral",
                remark: "note"
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.check();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/flex-pos.css";
@import "../../../common/scss/center/header.scss";

ul {
  padding-left: 0;
}
.is-flex {
  display: flex;
}
.btn {
  vertical-align: middle;
  border-radius: 2px;
  box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.1);
}
.card {
  box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
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
.integral {
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