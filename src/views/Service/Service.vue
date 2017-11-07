<template>
  <div>
    <HeaderPic title='服务支持'></HeaderPic>
    <div class="service">
      <el-row class="tac">
        <el-col>
          <el-menu default-active="2"  class="el-menu-vertical-demo" :default-active="fullPath" :router="true" @select="select"  @open="handleOpen" @close="handleClose">
            <el-menu-item index="/service/deliver">
              <i class="el-icon-service"></i>
              <span slot="title">我要发货</span>
            </el-menu-item>
            <el-menu-item index="/service/order">
              <i class="el-icon-document"></i>
              <span slot="title">订单查询</span>
            </el-menu-item>
            <el-menu-item index="/service/price">
              <i class="el-icon-date"></i>
              <span slot="title">运价时效查询</span>
            </el-menu-item>
            <el-menu-item index="/service/range">
              <i class="el-icon-location-outline"></i>
              <span slot="title">运输范围查询</span>
            </el-menu-item>
            <el-menu-item index="/service/standard">
              <i class="el-icon-tickets"></i>
              <span slot="title">运输标准查询</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div class="service-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPic from "@/components/header";
export default {
  components: {
    HeaderPic
  },
  data() {
    return {
      fullPath: "/center/account"
    };
  },
  created() {
    this.fullPath = this.$route.fullPath;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(key, keyPath) {
      console.log('select',key, keyPath);
      if(key == '/service/deliver') {
        window.location.href = 'http://119.23.163.129:8080/front/order/add_first'
       }
       if(key == '/service/order'){
         window.location.href = 'http://119.23.163.129:8080/front/order/order_list_my'
       }
       if(key == '/service/price'){
         window.location.href = 'http://119.23.163.129:8080/front/product'
       }
    }
  }
};
</script>
<style lang="scss" scoped>
.service {
  padding-top: 66px;
  min-height: 800px;
  width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  .tac {
    width: 200px;
    ul {
      box-shadow: 0 0 10px #e0e0e0;
      width: 200px;
    }
  }
  .service-main {
    flex: 1;
    background-color: #fff;
    margin-left: 60px;
    margin-bottom: 60px;
    box-shadow: 0 0 10px #e0e0e0;
  }
}
</style>
