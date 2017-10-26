<template>
  <div class="foot-container">
    <div class="foot-content">
      <img class="foot-logo" src="../assets/logo_white.png"/>
      <template v-for="mn in menu">
        <template v-if="mn.children && mn.children.length">
          <ul class="menu-ul">
            <li class="menu-title">{{mn.title}}</li>
            <template v-for="chd in mn.children">
              <li class="menu-a" @click="handleSelect(chd.view)">{{chd.title}}</li>
            </template>
          </ul>
        </template>
      </template>
    </div>
    <p class="href-container">
      <a>网站链接</a>
      <span class="href-split">|</span>
      <a>网站链接</a>
      <span class="href-split">|</span>
      <a>网站链接</a>
      <span class="href-split">|</span>
      <a>网站链接</a>
    </p>
    <p class="copyright">免责声明 | 版权公告©201x-2017 扬子江航空货运控股有限责任公司及/或其关联公司及特许人。版权所有。</p>
  </div>
</template>
<script>
  import menu from '@/menu'
  export default {
    data (){
      return {
        menu: menu
      }
    },
    methods: {
        handleSelect (key){
          key && this.$router.push({name: key});
        }
    }
  }
</script>
<style scoped>
  .foot-container {
    width: 100%;
    background-color: #666666;
    padding: 20px 0;
  }

  .foot-content {
    display: table;
    margin: 0 auto;
  }

  .foot-logo {
    display: table-cell;
    vertical-align: top;
    padding-right: 30px;
  }

  .menu-ul {
    display: table-cell;
    vertical-align: top;
    margin: 0;
    padding: 0 30px;
    list-style-type: none;
    color: #ffffff;
  }

  .menu-title {
    border-bottom: 2px solid #ddd;
  }
  .menu-a{
    padding: 4px 0;
    cursor: pointer;
  }
  .menu-a:hover{
    color: #F7BA2A;
  }
  .href-container{
    text-align: center;
    border-top: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    padding: 20px 0;
    margin-top: 50px;
  }
  .href-container a{
    color: #dadada;
    cursor: pointer;
  }
  .href-container a:hover{
    color: #fcfcfc;
  }
  .href-split{
    color: #dadada;
    padding: 0 20px;
  }
  .copyright{
    margin-top: 30px;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
  }
</style>
