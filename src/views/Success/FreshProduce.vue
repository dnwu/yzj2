<template>
  <div>
    <HeaderPic title="跨境电商综合物流服务"></HeaderPic>
    <div class="content">
      <p>公司旗下天津华宇股份有限公司为跨境电商企业提供仓储、分拣包装、运输、通关、配送等物流服务，亚马逊等知名电商平台已入驻。</p>
      <div class="box">
        <div>
          <div>
            <img src="./pic1.jpg" alt="">
            <p>跨境电商综合物流服务</p>
          </div>
          <div>
            <img src="./pic2.jpg" alt="">
            <p>检验检疫办公大厅</p>
          </div>
        </div>
        <div>
          <div>
            <img src="./pic3.jpg" alt="">
            <p>出口监管仓</p>
          </div>
          <div>
            <img src="./pic4.jpg" alt="">
            <p>保税业务仓</p>
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
  margin: 30px auto 200px;
  padding: 40px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  p {
    text-indent: 2em;
  }
  .box {
    >div {
      display: flex;
      >div {
        flex: 1;
        padding: 20px;
        font-size: 0;
        img {
          width: 100%;
        }
        p {
          // display: inline-block;
          margin: 0;
          // width: 100%;
          // height: 40px;
          text-indent: 0;
          background-color: #F1C500;
          text-align: center;
          color: #fff;
          font-size: 20px;
          line-height: 40px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>

