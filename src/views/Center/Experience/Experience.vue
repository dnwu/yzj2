<template>
  <div class="experience">
    <header class="is-flex header">
      <h4>会员经验</h4>
      <div class="is-flex wrap">
        <div class="opt">
          <input name="last" id="last7" type="radio" checked>
          <label for="last7">最近7天</label>
        </div>
        <div class="opt">
          <input name="last" id="last30" type="radio">
          <label for="last30">最近30天</label>
        </div>
        <div class="opt">
          <input name="last" id="last360" type="radio">
          <label for="last360">最近1年</label>
        </div>
      </div>
      <span class="btn btn-export">导出</span>
    </header>
    <section class="main">
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            prop="date"
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
          >
          </el-table-column>
          <el-table-column
            prop="grade"
            align="center"
            label="会员等级"
          >
          </el-table-column>
          <el-table-column
            prop="people"
            align="center"
            label="操作人"
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
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2017-11-11 12:00:00",
          change: "+180",
          exp: "3360",
          grade: "3级",
          people: "系统",
          note: "【订单完成】201709299392"
        },
        {
          date: "2017-11-12 12:00:00",
          change: "+180",
          exp: "3360",
          grade: "3级",
          people: "系统",
          note: "【订单完成】201709299392"
        },
        {
          date: "2017-11-12 18:00:00",
          change: "+180",
          exp: "3360",
          grade: "3级",
          people: "系统",
          note: "【订单完成】201709299392"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
<style lang="scss" scoped>
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

