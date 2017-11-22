<template>
  <div>
    <HeaderPic title="货站地面服务"></HeaderPic>
    <div class="content">
      <div class="head">
        <h3>产品介绍</h3>
        <p>
          <span></span>
          <span></span>金鹏网背靠全球500强海航集团，在全球物流领域进行大量的资源整合，在临空临港服务领域迅速布局全球网络。可提供航空地面服务及跨境电商综合服务等多项业务。</p>
      </div>
      <div class="box1">
        <h3>产品服务内容</h3>
        <div class="row row1">
          <div>
            <span>A.</span>国内、国际普通货物进出港操作</div>
          <div>
            <span>B.</span>国内、国际鲜活货物进出港操作</div>
        </div>
        <div class="row row2">
          <div>
            <span>C.</span>全货机包机货物进出港操作</div>
          <div>
            <span>D.</span>国际普货进出港操作</div>
        </div>
        <div class="row row3">
          <div>
            <span>E.</span>国际特殊货物进出港操作</div>
          <div>
            <span>F.</span>全货机机坪地面保障</div>
        </div>
        <div class="row row4">
          <div>
            <span>G.</span>国际空空转关货物操作</div>
          <div>
            <span>H.</span>国际空路转关货物进出港操作</div>
        </div>
      </div>
      <div class="box2">
        <h3>金鹏网旗下天津华宇货站资质一览表</h3>
        <div class="Thead">
          <div>资质种类</div>
          <div>备注</div>
        </div>
        <div class="row row1">
          <div>国际航协Cargo2000组织成员</div>
          <div>CARGO2000由国际航协设立，是国际航协和国际航空货运业认可的服务质量标准和管理体系。目前全球只有88家公司满足其标准</div>
        </div>
        <div class="row row2">
          <div>TAPA认证A级企业</div>
          <div>科技资产保障协会（简称TAPA）颁发的最高级别货物运输安全认证</div>
        </div>
        <div class="row row3">
          <div>安全生产标准化三级A类企业</div>
          <div>国家安全生产监督管理总局颁发行业最高安全标准</div>
        </div>
        <div class="row row4">
          <div>海关监管库</div>
          <div>国际航班普货进出口操作，快件库处理快件货物（KJ、D类、个人物品）</div>
        </div>
        <div class="row row5">
          <div>海关二级分拨库</div>
          <div>海关二级监管库，进行货物分拨业务</div>
        </div>
        <div class="row row6">
          <div>危险化学品经营许可证</div>
          <div>危化品仓储运输业务</div>
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
}
</script>
<style lang="scss" scoped>

.content {
  width: 800px;
  margin: 0 auto 200px;
  padding: 20px;
  color: #828282;
  display: flex;
  flex-direction: column;
  .head {
    border: 2px solid #F4C900;
    padding: 10px 10px;
    font-weight: 700;
    h3 {
      text-align: center;
      margin: 0;
      color: black;
    }
    p {
      text-indent: 2em;
      color: #474747;
      span {
        width: 3px;
        height: 12px;
        display: inline-block;
        background-color: #FBC210;
        margin: 0 1px;
      }
    }
  }
  .box1 {
    border: 2px solid #F4C900;
    margin-top: 30px;
    padding: 30px;
    h3 {
      text-align: center;
      margin: 0;
      color: black;
    }
    .row {
      display: flex;
      div {
        flex: 1;
        margin: 10px 10px;
        color: #fff;
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        padding-left: 30px;
        background-color: #F4C900;
        span {
          font-size: 20px;
          font-weight: 700;
          margin-right: 4px;
        }
      }
    }
  }
  .box2 {
    border: 2px solid #F4C900;
    margin-top: 30px;
    padding: 30px;
    h3 {
      text-align: center;
      margin: 0;
      color: black;
    }
    >div {
      display: flex;
      >div {
        flex: 1;
      }
    }
    .Thead {
      background-color: #F4C900;
      color: #fff;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      margin-top: 20px;
      div {
        text-align: center;
      }
    }
    .row {
      border-bottom: 1px solid #F4C900;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: black;
      div {
        padding-left: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

