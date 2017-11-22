<template>
  <div>
    <HeaderPic title='海航航线网络产品'></HeaderPic>
    <div class="content">
      <h4>
        <span></span>产品介绍</h4>
      <p>金鹏网整合海航集团不断拓展的货机及客机腹舱网络资源，为客户提供多样的运输线路选择方案。航线直达网络涉及美洲9个、欧洲12个、亚洲国际19个，澳洲3个，以及国内大部分城市网络。</p>
      <div class="table">
        <div class="head">
          <div class="column1">美洲（9个）</div>
          <div class="column2">欧洲（12个）</div>
          <div class="column3">亚洲（19个）</div>
          <div class="column4">澳洲（3个)</div>
        </div>
        <div class="body">
          <div>西雅图、圣何塞、洛杉矶、拉斯维加斯、波士顿、芝加哥、温哥华、多伦多、卡尔加里</div>
          <div>阿姆斯特丹、伦敦、曼彻斯特、巴黎、罗马、马德里、柏林、布鲁塞尔、布拉格、莫斯科、圣彼得堡、伊尔库茨克</div>
          <div>特拉维夫、台北、澳门、阿拉木图、曼谷、清迈、普吉、乌塔堡、万象、琅勃拉邦、河内、岘港、芽庄、金边、西哈努克、暹粒、仁川、东京、大阪、札幌、函馆</div>
          <div>奥克兰、墨尔本、悉尼</div>
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
  p {
    text-indent: 2em;
  }
  .table {
    padding: 50px 90px 0;
    .head {
      display: flex;
      height: 30px;
      div {
        flex: 1;
        line-height: 30px;
        text-align: center;
        border: 1px solid #b2b2b2;
        margin-left: -1px;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .body {
      display: flex;
      margin-top: -1px;
      div {
        border: 1px solid #b2b2b2;
        flex: 1;
        box-sizing: border-box;
        padding: 30px;
        margin-left: -1px;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>

