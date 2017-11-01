<template>
  <div>
    <div class="pic">
      <!-- <img src="./thead.png" alt=""> -->
    </div>
    <div class="title">
      <span class="icon"></span>
      <span>货物服务性产品</span>
    </div>
    <div class="content">
      <div class="head">通过为客户提供便捷的货物运输服务，提高货物的附加值，从而增加产品收益。</div>
      <div class="box">
        <div class="left">
          <h3>临近航班订舱产品</h3>
          <div class="detail">
            <p>预留适当航班舱位，对于临近航班起飞的货物提供运输保障服务，满足此部分着急货物运输需求，提升产品价值。</p>
          </div>
        </div>
        <div class="right">
          <h3>发货、中转、提货服务型产品</h3>
          <div class="detail">
            <div>
              <h4>发货快速通道服务产品</h4>
              <p>为海口鲜活农产品等客户开放绿色出港通道，提供安检专用通道，实现延迟截载（10-30分钟）快速发货。</p>
            </div>
            <div>
              <h4>预约提货快速通道服务产品</h4>
              <p>为高时效客户提供的“预约提货快速通道”服务，在目前提取时限（航班到达2小时后）的基础上，针对预约提货的客户推出限时提货（80-100分钟）时效产品。</p>
            </div>
            <div>
              <h4>外航国际快件转运国内服务产品</h4>
              <p>对进口国际快件货物，清关后，通过舱位优先保障、全程最优运力组合设计，为其提供优质的国内转运服务。	</p>
            </div>
          </div>
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
    background: url('/static/img/icon4.png') no-repeat center center;
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
  flex-direction: column;
  .head{
    border: 2px solid #FBC210;
    text-align: center;
    padding:10px 0;
    color: #FBC210;
    font-weight: 700;
  }
  .box{
    display: flex;
    padding-top: 40px;
    >div{
      border: 4px solid #FBC210;
      padding: 10px;
      display: flex;
      flex-direction: column;
      h3{
        text-align: center;
        color: #4C4C4C;
        font-size: 20px;
        font-weight: 700;
      }
      .detail{
        flex: 1;
        background-color: #FBC210;
        border-radius: 6px;
        padding: 6px;
        color: #fff;
        text-indent: 2em;
      }
    }
    .left{
      margin-right: 50px;
      flex: 1;
    }
    .right{
      flex: 2;
      .detail{
        display: flex;
        background-color: #fff;
        >div{
          flex: 1;
          background-color: #FBC210;
          margin: 0 4px;
          border-radius: 6px;
          padding: 10px;
          h4{
            text-indent: 0;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>

