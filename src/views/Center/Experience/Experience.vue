<template>
  <div class="experience">
    <header class="is-flex header">
      <h4>会员经验</h4>
      <div class="is-flex wrap">
        <div class="opt">
          <input v-model="last" value="1" name="last" id="last7" type="radio">
          <label class="btn" for="last7">最近7天</label>
        </div>
        <div class="opt">
          <input v-model="last" value="2" name="last" id="last30" type="radio">
          <label class="btn" for="last30">最近30天</label>
        </div>
        <div class="opt">
          <input v-model="last" value="3" name="last" id="last365" type="radio">
          <label class="btn" for="last365">最近1年</label>
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
            prop="exp"
            align="center"
            label="累计经验值"
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
      last: "1",
      curPage: 1,
      pageSize: 10,
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
      // 数据渲染前对数据进行相应格式化
      // 修改变更经验的符号
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
    ...mapGetters(["id", "token"])
  },
  watch: {
    last: function(last) {
      // 切换最近天数并重置当前页
      this.curPage = 1;
      this.check();
    }
  },
  methods: {
    changePage(page) {
      // 分页触发，重新请求
      this.curPage = page;
      this.check();
    },
    createArrayFromJson(arr, json) {
      if (arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
          var obj = {};
          for (var name in json) {
            obj[json[name]] = arr[i][name];
          }
          newArr.push(obj);
        }
        return newArr;
      }
      return [];
    },
    check() {
      // 获取会员经验信息
      this.axios
        .post("/app/v1/member/getMemberExps", {
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
              res.data.data.memberExpDTOS,
              {
                changeExp: "change",
                changeTime: "value",
                changeType: "changeType",
                cumulaExp: "exp",
                remark: "note"
              }
            );
          } else {
            this.$message({
              message: `获取会员经验失败(${res.data.msg})`,
              type: "warning"
            });
          }
        })
        .catch(err => {
          this.$message.error("发生未知错误，请刷新网页或稍后尝试");
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
@import "../../../common/css/base.css";
@import "../../../common/scss/center/index.scss";

ul {
  padding-left: 0;
}
.btn-export {
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
        color: $yellow;
      }
    }
  }
  .btn-export {
    margin-left: 40px;
    padding: 2px 30px;
    background: $red;
    color: white;
  }
}
.main {
  padding: 20px 30px;
  color: $gray;
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