<template>
<div class="success">
  <div class="img">
    <img src="../../../assets/success.png" alt="">
  </div>
  <div class="word">
    <p>恭喜你！注册成功</p>
  </div>
  <div class="time">
    <p><span>{{time}}s</span>后自动前往登录页面</p>
  </div>
  <div>
    <el-button @click="goto('/login')" type="warning" round>立即前往</el-button>
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
  created() {
    this.lastTime();
  },
  methods: {
    lastTime() {
      var timer = null;
      clearInterval(timer);
      timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(timer);
          this.$router.push('/login')
        }
      }, 1000);
    },
    goto(path){
      this.$router.push(path)
    }
  }
};
</script>
<style lang="scss" scoped>
.success {
  text-align: center;
  color: #b2b2b2;
  .word {
    font-size: 30px;
    font-weight: 700;
  }
  .time {
    font-size: 16px;
  }
  button {
    width: 200px;
  }
}
</style>
