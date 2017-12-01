<template>
  <div class="index">
    <div class="menu-container">
      <div class="menu-body">
        <img class="logo" src="../../assets/logo.png"/>
        <emenu></emenu>
        <div class="lg"><access></access></div>
      </div>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import Emenu from '@/views/menu'
  import Access from '@/views/login/Access'
  import Foot from '@/views/foot'
  import {mapMutations} from 'vuex'
  export default {
    name: 'app',
    components:{Emenu,Access,Foot},
    created () {
      let username = this.$cookie.get('username')
      this.setcookie(username)
    },
    methods:{
      ...mapMutations({
        setcookie:'SET_USERNAME'
      })
    }
  }
</script>

<style scoped>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .menu-container{
    padding: 15px 0;
  }
  .menu-body{
    display: table;
    margin: 0 auto;
  }
  .logo{
    display: table-cell;
    vertical-align: middle;
    margin-right: 35px;
  }
  .lg{
    display: table-cell;
    vertical-align: middle;
    padding-left: 70px;
  }
</style>
<style>
  .el-menu{
    background-color: white !important;
    display: table-cell;
    vertical-align: middle;
  }
  .main-container{
    background-color: #f9f9f9;
  }
  .el-menu--horizontal .el-submenu>.el-menu{
    /* display: flex; */

  }
  .el-menu--horizontal{
    border-bottom:none;
    font-weight:550;
  }
</style>
