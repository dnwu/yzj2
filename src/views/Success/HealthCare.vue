<template>
  <div>
    <div class="pic"></div>
    <div class="title">
      <span class="icon"></span>
      <span>定制化一体化解决方案</span>
    </div>
    <div class="content">
      <p>公司可为客户定制一体化解决方案，为科技产品和电子产品等高价值的运输提供一站式服务。</p>
      <div class="time">
        <span>2017年8月</span>
        <span>公司与英迈签署服务协议，为英迈定制电子产品的运输一体化服务方案。</span>
      </div>
      <div class="box">
        <img src="./22.png" alt="">
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
  background-image: url('/static/img/thead.png');
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
    background: url('/static/img/icon12.png') no-repeat center center;
    background-size: contain;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.content {
  width: 800px;
  margin: 30px auto 200px;
  padding: 40px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  p {
    text-indent: 2em;
  }
  .time {
    position: relative;
    padding-left: 20px;
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      padding: 2px;
      background-clip: content-box;
      background-color: #f3c300;
      border: 2px solid #f3c300;
      position: absolute;
      left: 0px;
      top: 1px;
    }
    span:first-child{
      color: #f3c300;
      margin-right: 10px;
    }
  }
  .box{
    border: 1px solid #f3c300;
    margin-top: 20px;
    img{
      width: 100%;
    }
  }
}
</style>

