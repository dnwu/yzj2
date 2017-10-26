<template>
  <div class="horizontal-news">
    <template v-if="!rightMod">
      <div class="horizontal-news-img-con">
        <img :src="imgSrc"/>
      </div>
      <div class="horizontal-news-text-con horizontal-news-text-con-right">
        <p class="horizontal-news-title right-border">{{title}}</p>
        <p class="horizontal-news-summary">{{summary}}</p>
        <p class="horizontal-news-split">一</p>
        <p class="horizontal-news-detail">详情 ></p>
      </div>
    </template>
    <template v-else>
      <div class="horizontal-news-text-con horizontal-news-text-con-left">
        <p class="horizontal-news-title left-border">{{title}}</p>
        <p class="horizontal-news-summary">{{summary}}</p>
        <p class="horizontal-news-split">一</p>
        <p class="horizontal-news-detail">详情 ></p>
      </div>
      <div class="horizontal-news-img-con">
        <img :src="imgSrc"/>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      rightMod: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '促销活动标题啦啦啦啦啦啦！'
      },
      summary: {
        type: String,
        default: '促销活动内容简介啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'
      },
      imgSrc: {
        type: String,
        default: require('../assets/promotion.png')
      }
    }
  }
</script>
<style scoped>
  .horizontal-news {
    width: 900px;
    height: 200px;
    margin: 20px 0;
    background-color: white;
  }

  .horizontal-news-img-con {
    display: table-cell;
    width: 360px;
  }

  .horizontal-news-img-con > img {
    width: 100%;
    height: 100%;
  }

  .horizontal-news-text-con {
    display: table-cell;
    width: 540px;
    padding: 20px 40px;
    max-height: 100%;
    vertical-align: top;
    overflow: scroll;
  }
  .horizontal-news-text-con-right{
    padding: 20px 0 20px 40px;
  }
  .horizontal-news-text-con-left{
    padding: 20px 40px 20px 0;
  }

  .horizontal-news-text-con > p {
    color: #939393;
    margin: 2px 0;
  }

  .horizontal-news-text-con > .horizontal-news-title {
    color: #333;
    font-size: 15px;
    margin: 2px 0;
    padding: 6px 0;
  }
  .horizontal-news-text-con-left > .horizontal-news-title{
    padding: 6px 0 6px 80px;
  }
  .right-border{
    display: block;
    border-right: 2px solid black;
  }
  .left-border{
    display: block;
    border-left: 2px solid black;
  }

  .horizontal-news-split {
    font-size: 14px;
  }

  .horizontal-news-summary, .horizontal-news-detail {
    font-size: 12px;
    padding: 5px 0;
    width: 70%;
  }
  .horizontal-news-text-con-left > .horizontal-news-summary,.horizontal-news-text-con-left> .horizontal-news-detail{
    width: auto;
    padding: 5px 80px;
  }
  .horizontal-news-text-con-left> .horizontal-news-split{
    padding: 0 80px;
  }
  .horizontal-news-detail {
    cursor: pointer;
  }

  .horizontal-news-detail:hover {
    color: #f5ca00;
  }
</style>
