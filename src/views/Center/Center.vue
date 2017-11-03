<template>
  <div class="center">
    <el-row class="tac">
      <el-col>
        <el-menu default-active="2"  class="el-menu-vertical-demo" :default-active="fullPath" :router="true" @select="select"  @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/center/account">账号信息</el-menu-item>
              <el-menu-item index="/center/personal">个人信息</el-menu-item>
              <el-menu-item index="/center/company_info">企业信息</el-menu-item>
              <el-menu-item index="/center/address">地址簿</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>马上下单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/center/online_product">网上下单</el-menu-item>
              <el-menu-item index="/center/jinpeng_client">金鹏客户端</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/center/order_search">订单查询</el-menu-item>
              <el-menu-item index="/center/order_track">订单追踪</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/center/my_finance">
            <i class="el-icon-date"></i>
            <span slot="title">我的财务</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="center-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullPath:'/center/account'
    }
  },
  created () {
    this.fullPath = this.$route.fullPath
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(key, keyPath) {
      console.log(key, keyPath)
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  padding-top: 66px;
  min-height: 800px;
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  .tac{
    width: 200px;
    ul{
      box-shadow: 0 0 10px #e0e0e0;
      width: 200px;
    }
  }
  .center-main{
    flex: 1;
    background-color: #fff;
    margin-left: 60px;
    margin-bottom: 60px;
    box-shadow: 0 0 10px #e0e0e0;
  }
}
</style>
