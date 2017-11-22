<template>
  <div>
    <HeaderPic title="航空公司"></HeaderPic>
    <div class="content">
      <p>金鹏航空股份有限公司、海航货运有限公司（拥有海航集团旗下全部客机腹舱运力资源）、天津华宇股份有限公司、海航速运（北京）有限责任公司、香港货运航空有限公司、MYCARGO航空货运有限公司、长安货航（筹）、天津货航（筹）等</p>
      <div class="box">
        <div>
          <img src="./jinpeng.jpg" alt="">
          <p>金鹏航空股份有限公司</p>
        </div>
        <div>
          <img src="./haihanghuoyun.jpg" alt="">
          <p>海航货运有限公司</p>
        </div>
        <div>
          <img src="./tianjin.jpg" alt="">
          <p>天津华宇股份有限公司</p>
        </div>
        <div>
          <img src="./haihang.jpg" alt="">
          <p>海航速运（北京）有限公司</p>
        </div>
        <div>
          <img src="./cargo.jpg" alt="">
          <p>香港货运航空有限公司</p>
        </div>
        <div>
          <img src="./yzj.jpg" alt="">
          <p>MYCARGO航空货运有限公司</p>
        </div>
        <div>
          <img src="./haihang.jpg" alt="">
          <p>长安货航（筹）</p>
        </div>
        <div>
          <img src="./haihang.jpg" alt="">
          <p>天津货航（筹）</p>
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
  width: 1000px;
  margin: 30px auto 200px;
  padding: 40px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  p {
    font-size: 16px;

    text-indent: 2em;
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    >div {
      display: inline-block;
      width: 300px;
      text-align: center;
      margin: 10px 0;
      img {
        width: 200px;
      }
      p {
        text-align: center;
        margin: 0;
        font-size: 16px;
      }
    }
  }
}
</style>

