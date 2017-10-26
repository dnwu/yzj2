<template>
  <div>
    <div class="pic"></div>
    <div class="title">
      <span class="icon"></span>
      <span>机型资源</span>
    </div>
    <div class="content">
      <div class="box">
        <p>扬子江航空货运控股有限责任公司旗下拥有27架全货机，其中9架B747、13架B737，5架A330，拥有集团旗下近千架客机腹舱资源。</p>
        <div>
          <div class="left">
            <img src="./1.jpg" alt="">
          </div>
          <div class="right">
            <h3>飞机型号：波音737-300F</h3>
            <p>货载容积：30.2m³</p>
            <p>最大载重航程：2993公里</p>
            <p>最大燃油容量：20105升</p>
          </div>
        </div>
        <div>
          <div class="left">
            <img src="./2.jpg" alt="">
          </div>
          <div class="right">
            <h3>飞机型号：波音737-400F</h3>
            <p>货载容积：38.9m³</p>
            <p>最大载重航程：4204公里</p>
            <p>最大燃油容量：23170升</p>
          </div>
        </div>
        <div>
          <div class="left">
            <img src="./3.jpg" alt="">
          </div>
          <div class="right">
            <h3>飞机型号：波音747-400SF</h3>
            <p>货载容积：38.9m³</p>
            <p>最大载重航程：4204公里</p>
            <p>最大燃油容量：23170升</p>
          </div>
        </div>
        <div>
          <div class="left">
            <img src="./4.jpg" alt="">
          </div>
          <div class="right">
            <h3>飞机型号：波音747-400F</h3>
            <p>货载容积：38.9m³</p>
            <p>最大载重航程：4204公里</p>
            <p>最大燃油容量：23170升</p>
          </div>
        </div>
        <p>集团旗下客机资源</p>
        <p>27，B747:9，B737:13，A330:5，Belly ：700等</p>
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
    background: url('/static/img/icon9.png') no-repeat center center;
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
  .box {
    >p{
      text-indent: 2em;
    }
    >div {
      border: 2px solid #DABE1F;
      display: flex;
      padding: 15px;
      margin: 10px 0;
      border-radius: 10px;
      .left {
        flex: 1;
        img {
          width: 350px;
          height: 150px;
          border-radius: 10px;
        }
      }
      .right{
        flex: 1;
        h3{
          color: #DABE1F;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
      }
    }
  }
}
</style>

