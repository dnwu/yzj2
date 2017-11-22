<template>
  <div class="news">
    <h3>新闻中心</h3>
    <div class="title">今日要闻</div>
    <div class="content">
      <ul>
        <li @click="gotoDetail(1)">
          <span>金鹏航空携手谷歌开通重庆至芝加哥货运包机</span>
          <span>2017-10-19</span>
        </li>
        <li @click="gotoDetail(2)">
          <span>扬子江航空货运集团亮相第十二届深圳物博会 独特航空货运运营模式引关注</span>
          <span>2017-10-12</span>
        </li>
        <li @click="gotoDetail(3)">
          <span>海航货运为远在加拿大的国宝大熊猫运送鲜竹</span>
          <span>2017-09-28</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created(){
    this.$emit('sonPath',this.$route.fullPath)
  },
  methods:{
    gotoDetail(data,title){
      // console.log(data,title)
      this.$router.push({path:'/About/news/'+data})
    }
  }
};
</script>
<style lang="scss" scoped>
.news {
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
    // p{
    //   color: #474747;
    // }
    ul {
      list-style: none;
      li {
        display: flex;
        margin: 15px 0;
        &:hover {
          color: #EABF00;
          cursor: pointer;
        }
        span{
          &:first-child{
            width: 590px;
            padding-right: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:last-child{
            width: 100px;
          }
        }
      }
    }
  }
}
</style>

