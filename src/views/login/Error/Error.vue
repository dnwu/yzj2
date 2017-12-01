<template>
<div class="error">
  <div class="img">
    <img src="../../../assets/error.png" alt="">
  </div>
  <div class="word">
    <p>抱歉，服务器繁忙！</p>
  </div>
  <div class="little">
    <p>程序员正在火速修复，请稍后再试</p>
  </div>
  <div>
    <el-button @click="goto('/login/register1')" type="warning" round>返回</el-button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    goto(path){
      this.$router.push(path)
    }
  }
};
</script>
<style lang="scss" scoped>
.error{
  text-align: center;
  color: #b2b2b2;
  .word {
    font-size: 30px;
    font-weight: 700;
  }
  .little{
    font-size: 16px;
  }
  button{
    width: 200px;
  }
}
</style>
