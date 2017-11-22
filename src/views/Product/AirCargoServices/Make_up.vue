<template>
  <div>
    <HeaderPic title="货物运输组合方案"></HeaderPic>
    <div class="content">
      <div class="line">
        <h4>产品路线</h4>
        <div class="detail">
          <p>欧洲=西安=澳洲国际大中转业务，西安最快转运时效一天，成功链接了欧洲澳洲两地业务，此条运输线路涉及普货、电商货、生鲜、邮件等多种货物类型运输需求。</p>
          <div>
            <span class="site">罗马<br/>巴黎</span>
            <span class="icon"></span>
            <span class="site">西安<br/>中转<br/>（1天）</span>
            <span class="icon"></span>
            <span class="site">悉尼<br/>墨尔</span>
          </div>
        </div>
      </div>
      <div class="method">
        <h4>运送方式</h4>
        <div class="detail">
          <p>通过“腹舱+货机”实现国内站点-西安-美洲、欧洲、澳洲等主要城市业务，最快转运时效一天，此条运输线路涉及除危险品外的主要出口货物运输需求。</p>
          <div>
            <span class="site">广州<br/>深圳</span>
            <span class="icon"></span>
            <span class="site">西安<br/>中转<br/>（1天）</span>
            <span class="icon"></span>
            <span class="site">芝加哥<br/>阿姆斯特丹</span>
          </div>
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
  }
};
</script>
<style lang="scss" scoped>

.content {
  width: 1000px;
  margin: 0 auto 200px;
  padding: 20px;
  color: #828282;
  display: flex;
  > div {
    flex: 1;
    border: 4px solid #f0c101;
    margin: 0 100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .detail {
      flex: 1;
    }
    > h4 {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      color: black;
    }
    > div {
      background-color: #f0c101;
      border-radius: 10px;
      color: #fff;
      padding: 10px;
      > p {
        text-indent: 2em;
      }
      > div {
        display: flex;
        span {
          font-size: 12px;
          flex: 1;
        }
        .site {
          display: inline-block;
          width: 35px;
          height: 66px;
          border: 1px solid #fff;
          border-radius: 6px;
          text-align: center;
          padding-top: 21px;
        }
        .icon {
          box-sizing: border-box;
          // padding: 21px 10px;
          background: url("../../../assets/small_plane.png") no-repeat center center;
          background-size: 20px 9px;
        }
      }
    }
  }
}
</style>

