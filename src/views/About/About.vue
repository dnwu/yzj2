<template>
<div>
  <HeaderPic title='关于我们'></HeaderPic>
  <div class="about">
    <el-row class="tac">
        <el-col>
          <el-menu default-active="2"  class="el-menu-vertical-demo" :default-active="fullPath" :router="true" @select="select"  @open="handleOpen" @close="handleClose">
            <el-menu-item index="/about/company">
              <i class="el-icon-service"></i>
              <span slot="title">关于集团</span>
            </el-menu-item>
            <el-menu-item index="/about/news">
              <i class="el-icon-document"></i>
              <span slot="title">新闻中心</span>
            </el-menu-item>
            <el-menu-item index="/about/member">
              <i class="el-icon-date"></i>
              <span slot="title">会员权益</span>
            </el-menu-item>
            <el-menu-item index="/about/join">
              <i class="el-icon-location-outline"></i>
              <span slot="title">人才招聘</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div class="service-main">
        <router-view @sonPath="getPath"></router-view>
      </div>
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
    // console.log('2123123',this.fullPath)
  },
  methods: {
    getPath(path) {
      this.fullPath = path;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    select(key, keyPath) {
      // console.log('about',key, keyPath);
      // if (key == "/about/company") {
      //   window.location.href = "http://yzj.sibat.cn/yzj/";
      // }
      // if (key == "/about/member" || key == "/about/join") {
      //   this.$router.push({path:'/about/news'});
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.about {
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
