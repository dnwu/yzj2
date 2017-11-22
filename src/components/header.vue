<template>
  <div class="header">
    <div ref="pic" class="pic"></div>
    <div class="title">
      <span ref="icon" class="icon"></span>
      <span>{{title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props:{
    picUrl:{
      // required:true,
      default:require('../assets/thead.png')
    },
    title:{
      // required:true,
      default:'title'
    },
    iconUrl:{
      // require:true,
      default:require('../assets/icon1.png')
    }
  },
  mounted () {
    this.$refs.pic.style.backgroundImage = 'url('+this.picUrl+')'
    // this.$refs.title.innerHTML = this.title
    this.$refs.icon.style.backgroundImage = 'url('+this.iconUrl+')'
  }
};
</script>
<style lang="scss" scoped>
.pic {
  height: 250px;
  // background: url('/static/img/thead.png');
  background-size: cover;
}
.title {
  height: 68px;
  background-color: #F1F1F1;
  border-bottom: 2px solid #B3B3B3;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 68px;
  .icon{
    display: inline-block;
    width: 20px;
    height: 20px;
    // background: url('/static/img/icon1.png') no-repeat center center;
    background-size: contain;
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
