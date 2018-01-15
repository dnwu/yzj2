<template>
<div class="product-pay-complete">
  <p class="title green">您好！订单“201010102536”已支付成功！</p>
  <p class="line2 ">系统将在{{time}}秒后自动跳转，或者您可以</p>
  <div class="btn">
    <el-button size="mini" type="success" @click="continueOrder">继续下单</el-button>
    <el-button size="mini" type="warning" @click="examineOrder">查看订单</el-button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      time: 10
    };
  },
  created(){
    this.timer = setInterval(()=>{
      this.time--
      if(this.time < 0){
        clearInterval(this.timer)
        this.$router.push({
          path: "/center/online_product/index",
          query: {
            step: 1
          }
        });
      }
    },1000)
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods:{
    continueOrder(){
      this.$router.push({
        path: "/center/online_product/index",
        query: {
          step: 1
        }
      });
    },
    examineOrder(){
      this.$router.push({
        path: "/center/order_search",
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.product-pay-complete {
  .green {
    color: green;
  }
  .red {
    color: #c5010b;
  }
  margin-left: 100px;
  margin-top: 60px;
  height: 200px;
  width: 1000px;
  background-color: #fff;
  border-radius: 30px;
  p {
    text-align: center;
    color: #4c4c4c;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .btn {
    text-align: center;
  }
}
</style>
