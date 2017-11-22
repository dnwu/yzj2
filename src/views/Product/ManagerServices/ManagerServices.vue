<template>
  <div>
    <HeaderPic title="代理人服务"></HeaderPic>
    <div class="content">
      <div class="box box1">
        <h3>产品介绍</h3>
        <div class="des des1">
          <p>金鹏网可提供国内、际航空货运代理、空港配送、公路运输、城际配送于一体的综合货运代理服务。</p>
          <div>国内、国际航空货运代理</div>
          <div>空港配送</div>
          <div>公路运输</div>
          <div>城际配送</div>
        </div>
      </div>
      <div class="box box2">
        <h3>个性化服务</h3>
        <div class="des des2">
          <p>通过整合空运、陆运等物流资源，凭借网络业务、操作优势，向市场推出一系列个性化服务，如空路联运、大型机械设备运输、冷藏冷冻储运、限时速递等服务。</p>
          <div>
            <h4>整合</h4>
            <div>
              <span>空运<br/>陆运</span>
              <span class="add"></span>
              <span>网络业务<br/>操作优势</span>
              <span class="equal"></span>
              <span>个性化服务</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box box3">
        <h3>按需定制</h3>
        <div class="des des3">
          <p>根据客户实际需求，运用专业的信息与行业优势，为客户“量身定做”个性化、专业化的物流解决方案。</p>
          <div>
            <div class="top">
              <span>专业信息</span>
              <span class="add"></span>
              <span>行业优势</span>
            </div>
            <div class="mid">个性化物流解决方案</div>
            <div class="bot">专业化物流解决方案</div>
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
  .box {
    flex: 1;
    border: 2px solid #F1C500;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    color: #fff;
    h3 {
      color: black;
      text-align: center;
      font-weight: 700;
    }
    .des {
      flex: 1;
      background-color: #F1C500;
      border-radius: 4px;
      padding: 10px;
      p {
        text-indent: 2em;
      }
    }
    .des1 {
      div {
        border: 2px solid #fff;
        margin: 10px 0;
        border-radius: 4px;
        text-align: center;
        font-weight: 700;
        line-height: 24px;
      }
    }
    .des2 {
      >div {
        border: 2px solid #fff;
        border-radius: 4px;
        padding: 10px;
        h4 {
          text-align: center;
          margin: 0 0 5px 0;
        }
        >div {
          display: flex;
          flex-wrap: nowrap;
          font-size: 12px;
          span {
            display: inline-block;
            border: 2px solid #fff;
            border-radius: 4px;
            padding: 5px;
            text-align: center;
          }
          .add {
            position: relative;
            width: 20px;
            border: none;
            &::before {
              content: '';
              position: absolute;
              left: 50%;
              top: 40%;
              display: inline-block;
              width: 2px;
              height: 10px;
              background-color: #fff;
            }
            &::after {
              content: '';
              position: absolute;
              left: 50%;
              top: 40%;
              display: inline-block;
              width: 2px;
              height: 10px;
              background-color: #fff;
              transform: rotate(90deg)
            }
          }
          .equal {
            position: relative;
            width: 20px;
            border: none;
            &::before {
              content: '';
              display: inline-block;
              width: 10px;
              height: 2px;
              background-color: #fff;
              position: absolute;
              left: 30%;
              top: 40%;
            }
            &::after {
              content: '';
              display: inline-block;
              width: 10px;
              height: 2px;
              background-color: #fff;
              position: absolute;
              left: 30%;
              top: 50%;
            }
          }
        }
      }
    }
    .des3 {
      >div {
        padding: 10px;
        border: 2px solid #fff;
        border-radius: 4px;
        .top {
          margin: 10px 0;
          text-align: center;
          span.add {
            position: relative;
            &::before {
              content: '';
              display: inline-block;
              width: 4px;
              height: 10px;
              background-color: #fff;
              transform: translate(2px)
            }
            &::after {
              content: '';
              display: inline-block;
              width: 4px;
              height: 10px;
              background-color: #fff;
              transform: rotate(90deg) translateY(2px);
            }
          }
        }
        .mid {
          border: 2px solid #fff;
          border-radius: 4px;
          margin: 10px 0;
          text-align: center;
        }
        .bot {
          border: 2px solid #fff;
          border-radius: 4px;
          margin: 10px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>

