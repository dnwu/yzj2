<template>
  <div class="order_search">
    <div class="search_input">
      <div class="left">
        <div>
          <span>订单号</span>
          <el-input v-model="order_number" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>货物类型</span>
          <el-input v-model="order_class" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="middle">
        <div class="from-to">
          <div>始发港</div>
          <v-distpicker only-province></v-distpicker>
          <div>目的港</div>
          <v-distpicker only-province></v-distpicker>
        </div>
        <div class="time">
          <!-- <span>下单时间</span> -->
          <div>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="search_res">
      <div class="header"></div>
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
  components:{VDistpicker},
  data() {
    return {
      order_number:'',
      order_class:'',
      value6:''
    };
  }
};
</script>
<style lang="scss">
.order_search{
  padding:40px 10px;
  .search_input{
    display: flex;
    >div{
      flex: 1;
    }
    .left{
      >div{
        display: flex;
        margin: 5px 0;
        span{
          width: 70px;
          text-align: right;
          padding-right: 10px;
          line-height: 40px;
        }
        .el-input{
          flex: 1;
        }
      }
    }
    .middle{
      padding-left: 10px;
      .from-to{
        >div{
          display: inline-block;
          margin: 5px 0;
        }
        .address{
          width: 80px;
          select{
            width: 80px;
            padding: 0;
          }
        }
      }
      // .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
      //   width: 255px;
      // }
    }
  }
  .search_res{}
}
</style>
