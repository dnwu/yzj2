<template>
  <div>
    <template v-if="username">
      <p>欢迎您！{{username}}</p>
    </template>
    <template v-else>
      <p><span class="link" @click.stop="handleClick('login')">会员登录</span><span class="split">|</span><span class="link" @click.stop="handleClick('register')">注册</span></p>
    </template>
  </div>
</template>
<script>
  import cookie from '@/util/cookie'
  export default {
    data(){
      return {
        username: cookie.getCookie("username")
      }
    },
    methods: {
        handleClick (path){
            this.$router.push({name: path});
        }
    }
  }
</script>
<style scoped>
  .split{
    padding: 0 15px;
    font-size: 16px;
  }
  .link{
    cursor: pointer;
    font-size: 15px;
    color: #48576a;
  }
  .link:hover{
    color: #F7BA2A;
  }
</style>
