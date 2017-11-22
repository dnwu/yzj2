<template>
  <div>
    <HeaderPic title="货机包舱、包板产品"></HeaderPic>
    <div class="content">
      <div class="head">为客户制定个性化运输服务，在洲际、国内以及东南亚周边航线上提供临时国内国际包机、包板等业务。</div>
      <div class="box">
        <div class="left">
          <h3>747非定班包机</h3>
          <div class="detail">
            <p>除固定航线网络外，在航权、时刻、飞越可申请，运力可调配，操作可实施，运价可接受的范围增开临时包机航线。</p>
          </div>
        </div>
        <div class="right">
          <h3>737非定班包机</h3>
          <div class="detail">
            <p>除固定航线网络外，在航权、时刻、飞越可申请，运力可调配，操作可实施，运价可接受的范围增开临时包机航线。侧重亚洲地区的临时包机航线，关注除限定的危险平外的各类货物，特别是活体和生鲜产品。-30分钟）快速发货。</p>
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
    border: 2px solid #FBC210;
    text-align: center;
    padding: 10px 0;
    color: #FBC210;
    font-weight: 700;
  }
  .box {
    display: flex;
    padding-top: 40px;
    >div {
      border: 4px solid #FBC210;
      padding: 10px;
      display: flex;
      flex-direction: column;
      min-height: 300px;
      h3 {
        text-align: center;
        color: #4C4C4C;
        font-size: 20px;
        font-weight: 700;
      }
      .detail {
        flex: 1;
        background-color: #FBC210;
        border-radius: 6px;
        padding: 6px;
        color: #fff;
        text-indent: 2em;
      }
    }
    .left {
      margin-right: 50px;
      flex: 1;
    }
    .right {
      flex: 1;
      .detail {
        background-color: #FBC210;
      }
    }
  }
}
</style>

