<template>
  <div class="vertical-news">
    <p class="vertical-news-day">{{date.substring(5)}}</p>
    <p class="vertical-news-year">{{date.split('-')[0]}}</p>
    <p class="vertical-news-split">一</p>
    <p class="vertical-news-title">{{title}}</p>
    <p class="vertical-news-summary">{{summary}}</p>
    <p class="vertical-news-split">一</p>
    <p class="vertical-news-detail">详情 ></p>
    <img class="vertical-news-img" :src="imgSrc"/>
  </div>
</template>
<script>
  export default {
    props: {
      date: {
        type: String,
        default: '2017-08-15'
      },
      title: {
        type: String,
        default: '新闻标题啦啦啦啦啦啦啦啦！'
      },
      summary: {
        type: String,
        default: '新闻内容新闻内容啦啦啦啦啦啦啦啦啦新闻内容新闻内容啦啦啦啦啦啦啦啦啦新闻内容新闻内容啦啦啦啦啦啦啦啦啦'
      },
      imgSrc: {
        type: String,
        default: require('../assets/news.png')
      }
    }
  }
</script>
<style scoped>
  .vertical-news {
    display: table-cell;
    width: 300px;
    padding: 10px;
  }

  .vertical-news > p {
    color: #939393;
    margin: 2px 0;
  }

  .vertical-news-day {
    font-size: 25px;
  }

  .vertical-news-year {
    font-size: 12px;
    font-weight: bold;
  }

  .vertical-news >.vertical-news-title {
    color: #333;
    font-size: 15px;
    margin: 2px 0 10px;
  }

  .vertical-news-img {
    width: 100%;
    height: 220px;
  }
  .vertical-news-split{
    font-size: 14px;
  }
  .vertical-news-summary,.vertical-news-detail{
    font-size: 12px;
  }
  .vertical-news-detail{
    cursor: pointer;
  }
  .vertical-news-detail:hover{
    color: #f5ca00;
  }
  .vertical-news-img{
    margin-top: 15px;
  }
</style>
