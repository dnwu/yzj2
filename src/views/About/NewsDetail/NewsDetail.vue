<template>
<div class="newsDetail">
  <h3>新闻中心</h3>
  <div class="title">{{title}}</div>
  <div class="content" v-html="content">
  </div>
</div>
</template>
<script>
import newsData from '@/data/news.json'
export default {
  data () {
    return {
      title:'',
      content:''
    }
  },
  created(){
    // console.log(this.$route.params.id)
    // console.log(newsData)
    const id = this.$route.params.id
    // this.title = newsData[this.$route.params.id-1][this.$route.params.id].title
    // this.content = newsData[this.$route.params.id-1][this.$route.params.id].contentHTML
    newsData.forEach((val,index) => {
      if(val.id == id){
        this.title = val.title
        this.content = val.contentHTML
      }
    })
    // console.log(this.content)
  }
}
</script>
<style lang="scss">
.newsDetail {
  padding: 30px;
  .title {
    height: 40px;
    background-color: #f1f5ff;
    position: relative;
    line-height: 40px;
    padding-left: 20px;
    font-weight: 700;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      background-color: #edc201;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .content {
    p{
      color: #474747;
      text-indent: 2em;
      line-height: 30px;
    }

  }
}
</style>
