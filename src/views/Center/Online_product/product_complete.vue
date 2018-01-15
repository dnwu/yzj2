<template>
  <div class="product-complete">
    <p class="title green">您好！订单已提交成功！</p>
    <p class="line1 ">平台正在受理你的订单，预计<span class="red">30分钟</span>内完成</p>
    <p class="line2 ">系统将在{{time}}秒后自动跳转，或者您可以</p>
    <div class="btn">
      <el-button size="mini" type="success" @click="continueOrder">继续下单</el-button>
      <el-button size="mini" type="warning" @click="examineOrder">查看订单</el-button>
    </div>
    <p class="prompt">温馨提示：工作日8:00-17:30为营业时间（部分地区以当地营业部为准），非工作时间订单受理可能会稍有延迟，请耐心等待。</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        time:10
      }
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
  }
</script>
<style lang="scss" scoped>
.product-complete{
  .green{
    color: green;
  }
  .red{
    color: #C5010B;
  }
  margin-left: 100px;
  margin-top: 60px;
  height: 200px;
  width: 1000px;
  background-color: #fff;
  border-radius: 30px;
  p{
    text-align: center;
    color: #4C4C4C;
  }
  .title{
    font-size: 20px;
    font-weight: 700;
  }
  .btn{
    text-align: center;
  }
  .prompt{
    color: #a0a0a0;
    transform: translateY(40px);
  }
}
</style>

