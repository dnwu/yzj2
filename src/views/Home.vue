<template>
  <div>
    <div class="header-pic">
      <el-carousel :height="headImgHeight" :interval="5000">
        <el-carousel-item v-for="item in headPic" :key="item">
          <img class="carousel-img" :src="item"/>
        </el-carousel-item>
      </el-carousel>
      <div class="search-input">
        <el-input placeholder="请输入订单号进行查询" icon="search" v-model="search" :on-icon-click="searchOrder"></el-input>
        <button class="search-btn" type="button">马上查单</button>
      </div>
    </div>
    <div class="service-container">
      <div class="service-link">
        <div class="service-con" @click.stop="goPage('service/deliver')">
          <span class="service-icon icon-order"></span>
          <p class="service-title">我要下单</p>
        </div>
        <div class="service-con" @click.stop="goPage('service/order')">
          <span class="service-icon icon-order-search"></span>
          <p class="service-title">订单查询</p>
        </div>
        <div class="service-con" @click.stop="goPage('service/price')">
          <span class="service-icon icon-price-search"></span>
          <p class="service-title">运价时效查询</p>
        </div>
        <div class="service-con" @click.stop="goPage('service/range')">
          <span class="service-icon icon-round-search"></span>
          <p class="service-title">运输范围查询</p>
        </div>
        <div class="service-con" @click.stop="goPage('service/standard')">
          <span class="service-icon icon-standard-search"></span>
          <p class="service-title">运输标准查询</p>
        </div>
        <div class="service-con" @click.stop="goPage('service/more')">
          <span class="service-icon icon-online-help"></span>
          <p class="service-title">在线客服</p>
        </div>
      </div>
    </div>
    <div class="product-container">
      <p class="product-con-title-zh">产品服务展示</p>
      <p class="product-con-title-en">PRODUCT SERVICES EXHIBITION</p>
      <el-carousel :interval="4000" indicator-position="outside" type="card" height="350px">
        <el-carousel-item v-for="item in productPic" :key="item.src">
          <div class="product-con" @click.stop="goPage(item.view)">
            <img class="product-img" :src="item.src"/>
            <p class="product-title">{{item.title}}</p>
            <p class="product-link">查看详情</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="success-container">
      <p class="success-con-title-zh">成功案例介绍</p>
      <p class="success-con-title-en">SUCCESSFUL CASE INTRODUCTION</p>
      <div class="success-cl">
        <p class="con-check-all" @click.stop="goPage('success/3CElectronics')">查看全部 ></p>
        <div class="success-cu" @click.stop="goPage('success/3CElectronics')">
          <span class="success-icon icon-3C-elec"></span>
          <p class="success-title">定制化包机服务</p>
        </div>
        <div class="success-cu" @click.stop="goPage('success/healthCare')">
          <span class="success-icon icon-health-care"></span>
          <p class="success-title">定制化一体化服务方案</p>
        </div>
        <div class="success-cu" @click.stop="goPage('success/freshProduce')">
          <span class="success-icon icon-fresh"></span>
          <p class="success-title">跨境电商综合物流服务</p>
        </div>
        <!-- <div class="success-cu" @click.stop="goPage('success/FMCG')">
          <span class="success-icon icon-fmcg"></span>
          <p class="success-title">快消行业</p>
        </div> -->
      </div>
    </div>
    <div class="news-container">
      <p class="product-con-title-zh">新闻资讯</p>
      <p class="product-con-title-en">NEWS INFORMATION</p>
      <div class="news-con">
        <p class="con-check-all" @click="gotoNews">查看全部 ></p>
        <vertical-news :date='newsData[0].time' :title='newsData[0].title' :summary='newsData[0].contentSTR' :id="newsData[0].id" :imgSrc="newImageUrl[0].url"></vertical-news>
        <vertical-news :date='newsData[1].time' :title='newsData[1].title' :summary='newsData[1].contentSTR' :id="newsData[1].id" :imgSrc="newImageUrl[1].url"></vertical-news>
        <vertical-news :date='newsData[2].time' :title='newsData[2].title' :summary='newsData[2].contentSTR' :id="newsData[2].id" :imgSrc="newImageUrl[2].url"></vertical-news>
      </div>
    </div>
    <!-- <div class="promotion-container">
      <p class="product-con-title-zh">促销活动资讯</p>
      <p class="product-con-title-en">SALES PROMOTION</p>
      <div class="promotion-con">
        <p class="con-check-all">查看全部 ></p>
        <horizontal-news></horizontal-news>
        <horizontal-news :rightMod="true"></horizontal-news>
      </div>
    </div> -->
  </div>
</template>
<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import VerticalNews from '@/components/VerticalNews';
  import HorizontalNews from '@/components/HorizontalNews';
  import newsData from '@/data/news.json';
  export default {
    components: {ElInput,VerticalNews,HorizontalNews},
    data (){
      return {
        headPic: [require('../assets/plan_pic2.png'), require('../assets/plan_pic.png')],
        headImgHeight: this.getHeadImgHeight(),
        search: '',
        productPic: [{title:"航空货运服务",src:require('../assets/product_pic.jpg'),view:'product/airCargoServices'},
          {title:"货站地面服务",src:require('../assets/product_pic2.jpg'),view:'product/entrepotServices'},
          {title:"代理人服务",src:require('../assets/product_pic3.jpg'),view:'product/managerServices'},
          {title:"金融服务",src:require('../assets/product_pic4.jpg'),view:'product/financeServices'},
          {title:"智慧口岸",src:require('../assets/product_pic5.jpg'),view:'product/smartServices'}],
        newsData:newsData,
        newImageUrl:[{url:require('../assets/news1.jpg')},{url:require('../assets/news2.jpg')},{url:require('../assets/news3.jpg')}]
      }
    },
    methods: {
      getHeadImgHeight (){
        let width = document.body.clientWidth;
        return width / 1920 * 650 + 'px';
      },
      searchOrder (){
          console.log(this.search)
      },
      goPage (path){
        this.$router.push({name: path});
      },
      gotoNews(){
        this.$router.push('/about/news')
      }
    },
    mounted (){
      let $this = this;
      window.onresize = function () {
        $this.headImgHeight = $this.getHeadImgHeight();
      }
    },
    beforeDestroy (){
        window.onresize = null;
    }
  }
</script>
<style scoped>
  .header-pic {
    position: relative;
  }

  .carousel-img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .search-input{
    display: block;
    width: 300px;
    background-color: white;
    padding: 25px;
    position: absolute;
    bottom: 30px;
    left: 25%;
    z-index: 100;
  }
  .search-btn{
    background-color: #f4c900;
    padding: 8px 25px;
    text-align: center;
    color: #ffffff;
    border-radius: 3px;
    border: none;
    font-size: 16px;
    display: block;
    margin: 15px auto 0;
    cursor: pointer;
  }
  .service-container{
    width: 100%;
    border-top: 5px solid #cccccc;
  }
  .service-link{
    display: table;
    margin: -5px auto 0;
  }
  .service-con{
    display: table-cell;
    /*padding: 25px 48px;*/
    border-top: 5px solid transparent;
    cursor: pointer;
    width: 150px;
    height: 145px;
  }
  .service-icon{
    display: block;
    margin: 28px auto 0;
    width: 50px;
    height: 60px;
    background-size: 100% 100%;
  }
  .service-title{
    margin: 5px 0;
    text-align: center;
    color: #666666;
  }
  .service-con:hover{
    border-top-color: #f4c900;
    background-color: #eeeeee;
  }
  .service-con:hover > .service-title{
    color: #f4c900;
  }
  .icon-order{
    background-image: url("../assets/order.png");
  }
  .service-con:hover > .icon-order{
    background-image: url("../assets/order_hover.png");
  }
  .icon-order-search{
    background-image: url("../assets/order_search.png");
  }
  .service-con:hover > .icon-order-search{
    background-image: url("../assets/order_search_hover.png");
  }
  .icon-price-search{
    width: 56px;
    height: 56px;
    background-image: url("../assets/price_search.png");
  }
  .service-con:hover > .icon-price-search{
    background-image: url("../assets/price_search_hover.png");
  }
  .icon-round-search{
    width: 56px;
    height: 56px;
    background-image: url("../assets/round_search.png");
  }
  .service-con:hover > .icon-round-search{
    background-image: url("../assets/round_search_hover.png");
  }
  .icon-standard-search{
    width: 70px;
    height: 56px;
    background-image: url("../assets/standard_search.png");
  }
  .service-con:hover > .icon-standard-search{
    background-image: url("../assets/standard_search_hover.png");
  }
  .icon-online-help{
    width: 70px;
    height: 56px;
    background-image: url("../assets/online_help.png");
  }
  .service-con:hover > .icon-online-help{
    background-image: url("../assets/online_help_hover.png");
  }

  .product-container{
    width: 900px;
    margin: 30px auto 100px;
  }
  .product-con-title-zh{
    margin: 0;
    text-align: center;
    font-size: 25px;
    color: #f5ca00;
  }
  .product-con-title-en{
    margin: 10px 0;
    text-align: center;
    font-size: 13px;
    color: #f5ca00;
  }
  .product-con{
    box-sizing: border-box;
    border: 5px solid #dfdfdf;
    width: 100%;
    height: 100%;
    background-color: #dfdfdf;
  }
  .is-active > .product-con{
    background-color: #414447;
    border-color: #faad17;
    color: white;
  }
  .product-img{
    width: 100%;
    height: 77%;
  }
  .product-title{
    margin: 0;
    padding: 5px 25px;
    font-size: 18px;
  }
  .product-link{
    margin: 0;
    padding: 5px 25px;
    font-size: 12px;
  }
  .product-link:hover{
    color: #faad17;
  }
  .success-container{
    width: 100%;
    padding: 70px 0;
    background-size: 100% 100%;
    background-image: url("../assets/success_bg.png");
  }
  .success-con-title-zh{
    margin: 0;
    text-align: center;
    font-size: 25px;
    color: #f5ca00;
  }
  .success-con-title-en{
    margin: 10px 0;
    text-align: center;
    font-size: 13px;
    color: #c9920f;
  }
  .success-cl{
    position: relative;
    display: table;
    margin: auto;
  }
  .success-cu{
    display: table-cell;
    cursor: pointer;
    width: 200px;
    height: 200px;
    padding: 20px;
  }
  .success-icon{
    display: block;
    margin: 10px auto 0;
    width: 150px;
    height: 150px;
    background-size: 100% 100%;
  }
  .success-title{
    margin: 15px 0 0;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
  }
  .success-cu:hover > .success-title{
    color: #f5ca00;
  }
  .icon-3C-elec{
    background-image: url("../assets/3C_elec.png");
  }
  .success-cu:hover > .icon-3C-elec{
    background-image: url("../assets/3C_elec_hover.png");
  }
  .icon-health-care{
    background-image: url("../assets/health_care.png");
  }
  .success-cu:hover > .icon-health-care{
    background-image: url("../assets/health_care_hover.png");
  }
  .icon-fresh{
    background-image: url("../assets/fresh.png");
  }
  .success-cu:hover > .icon-fresh{
    background-image: url("../assets/fresh_hover.png");
  }
  .icon-fmcg{
    background-image: url("../assets/fmcg.png");
  }
  .success-cu:hover > .icon-fmcg{
    background-image: url("../assets/fmcg_hover.png");
  }
  .news-container{
    margin: 50px auto;
  }
  .news-con{
    position: relative;
    display: table;
    margin: auto;
  }
  .con-check-all{
    position: absolute;
    right: 20px;
    top: -40px;
    color: #939393;
    cursor: pointer;
  }
  .success-cl > .con-check-all{
    color: #fff;
  }
  .con-check-all:hover{
    color: #f5ca00;
  }
  .promotion-container{
    margin: 50px auto;
    padding: 50px 0;
    background-color: #f4f4f4;
  }
  .promotion-con{
    position: relative;
    display: table;
    margin: auto;
  }
</style>
<style>
  .header-pic > .el-carousel > .el-carousel__container > .el-carousel__arrow {
    width: 70px;
    height: 70px;
    border-radius: 0;
    background-color: #F7BA2A;
    font-size: 20px;
  }

  .header-pic > .el-carousel > .el-carousel__container > .el-carousel__arrow--left {
    left: 0;
  }

  .header-pic > .el-carousel > .el-carousel__container > .el-carousel__arrow--right {
    right: 0;
  }
  .search-input > .el-input > .el-input__inner{
    border-radius: 0;
  }
  .search-input > .el-input > .el-icon-search{
    font-size: 20px;
  }
</style>

