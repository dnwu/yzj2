<template>
  <li class="my-el-menu-item-group">
    <div class="my-el-menu-item-group__title">
      <el-menu-item :index="index">{{title}}</el-menu-item>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    props: {
      title: {
        type: String
      },
      index: {
          type: String
      }
    },

  }
</script>
<style scoped>
  .my-el-menu-item-group{
    display: inline-block;
    vertical-align: top;
    padding: 8px 15px;
  }
  .my-el-menu-item-group__title{
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }
  .my-el-menu-item-group ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
