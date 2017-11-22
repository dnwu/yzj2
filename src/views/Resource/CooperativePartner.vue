<template>
  <div>
    <HeaderPic title="合作伙伴"></HeaderPic>
    <div class="content">
      <p>扬子江航空货运控股有限责任公司合作伙伴</p>
      <div>
        <img src="./partner.png" alt="">
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
  margin: 30px auto 200px;
  padding: 40px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  p{
    text-align: center;
    font-size: 18px;
    line-height: 30px;
    font-weight: 700;
  }
  >div{
    img{
      width: 100%;
    }
  }
}
</style>

