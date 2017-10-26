<template>
  <div class="product-view">
    <img class="head-img" :src="headImgSrc"/>
    <div class="view-container">
      <p class="product-name">{{productName}}</p>
      <p class="title">服务范围</p>
      <p class="value">{{serviceScope}}</p>
      <p class="title">收费规则</p>
      <p class="info">{{chargingRules}}</p>
      <p class="title">业务范围</p>
      <p class="info">{{businessScope}}</p>
      <p class="title">注意事项</p>
      <template v-for="(item,index) in warning">
        <p class="info">{{(index + 1) + '.' + item}}</p>
      </template>
      <p class="title">联系方式</p>
      <p class="info">电话：{{contact.tel}}</p>
      <p class="info">邮箱：{{contact.email}}</p>
      <p class="info">地址：{{contact.addr}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      headImgSrc: {
        type: String,
        default: require('../assets/thead.png')
      },
      productName: {
        type: String,
        default: '产品名称'
      },
      serviceScope: {
        type: String,
        default: '文字内容很多字文字内容很多字文字内容很多字文字内容很多字'
      },
      chargingRules: {
        type: String,
        default: '规则规则'
      },
      businessScope: {
        type: String,
        default: '业务范围业务范围'
      },
      warning: {
        type: Array,
        default: () => {
          return ["注意事项", "注意事项", "注意事项"]
        }
      },
      contact: {
        type: Object,
        default: () => {
          return {
            tel: 'xxxxxxxxxx',
            email: 'xxxxxxxxx',
            addr: 'xxxxxxxx,xxxxx,xxxx,xxx'
          }
        }
      }
    }
  }
</script>
<style scoped>
  .product-view{
    width: 100%;
    padding-bottom: 100px;
  }
  .head-img{
    width: 100%;
    height: auto;
  }
  .view-container{
    width: 900px;
    margin: 20px auto;
  }
  .product-name{
    font-size: 25px;
    font-weight: bold;
    color: #808080;
    padding: 8px 0;
    border-bottom: 2px solid #cbcbcb;
  }
  .title{
    font-size: 20px;
    color: #a3a3a3;
    margin: 30px 0 10px;
  }
  .value{
    font-size: 14px;
    color: #808080;
    text-indent: 28px;
  }
  .info{
    font-size: 14px;
    color: #808080;
  }
</style>
