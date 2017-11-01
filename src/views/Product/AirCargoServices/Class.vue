<template>
  <div>
    <div class="pic"></div>
    <div class="title">
      <span class="icon"></span>
      <span>种类特性产品</span>
    </div>
    <div class="content">
      <div class="box">
        <h2>生鲜类</h2>
        <div class="detail">
          <p>配合打造“飞尝鲜落地配”服务品牌，与京东建立全国性配送合作，利用京东全国七个一级配送仓（北京、上海、广州、西安、沈阳、成都、武汉）为中心向外辐射全国，建立形成生鲜次日达、隔日达通道；国际方面与冷链业务合作伙伴开展合作，从国际出口市场起始，建立如鲜花、水果、蔬菜等货物的运输保障合作方案，实现跨境冷链运输，并不断向终端客户拓展。</p>
        </div>
      </div>
      <div class="box">
        <h2>贵重物品</h2>
        <div class="detail">
          <p>对符合航空公司《货物运输手册》规定贵重物品种类货物，提供专项运输保障、全方位的监控服务，满足货物运输高时效、高安全需求的产品。</p>
        </div>
      </div>
      <div class="box">
        <h2>快件、邮件类</h2>
        <div class="detail">
          <p>通过建立专项合作，着重开发快件和邮件等高价值货物，提供优质的运输保障服务，将此部分货物稳定为固定产品，稳定航班基本收益。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.pic {
  height: 250px;
  background: url('/static/img/thead.png');
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
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/img/icon3.png') no-repeat center center;
    background-size: contain;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.content {
  width: 1000px;
  margin: 0 auto 200px;
  padding: 20px;
  color: #828282;
  display: flex;
  >div {
    flex: 1;
    margin: 0 30px;
    border: 4px solid #F0C101;
    padding: 10px;
    display: flex;
    flex-direction: column;
    h2 {
      text-align: center;
      font-size: 16px;
      color: black;
      font-weight: 700;
    }
    .detail {
      flex: 1;
      background-color: #F0C101;
      color: #fff;
      border-radius: 6px;
      padding: 6px 10px;
      text-indent: 2em;
    }
  }
}
</style>

