<template>
  <div class="online_product">
    <div class="product-header">
      <span class="product-header-logo">网上下单</span>
      <div class="product-header-inner">
        <el-steps :space="200" :active="step" finish-status="success">
          <el-step title="产品选择"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="下单成功"></el-step>
          <el-step title="支付成功"></el-step>
          <el-step title="运输中"></el-step>
          <el-step title="订单完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="container-wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      step:1
    }
  },
  created () {
    this.step = parseInt(this.$route.query.step)
  },
  watch:{
    $route(to,from){
      this.step = parseInt(to.query.step)
    }
  }
}
</script>
<style lang="scss" scoped>
  .online_product {
    color: rgba(197,197,197,1);
    display:flex;
    flex-direction:column;
    height:100%;
    .product-header {
      width:100%;
      height:60px;
      display:flex;
      flex-direction:row;
      .product-header-logo {
        height:100%;
        width:100px;
        display: flex;
        justify-content:center;
        align-items: center;
      }
      .product-header-inner {
        // display:flex;
        padding: 5px 20px 0 20px;
        align-items:center;
        flex:1;
      }
    }
    .container-wrapper {
      width:100%;
      display:flex;
      flex-direction:row;
      .product-container-left {
        width:900px;
        display:flex;
        flex-direction:column;
        .container-left-selection {
          height:200px;
          width:100%;
          display:flex;
          justify-content:center;
          align-items:flex-end;
          .selection-inner {
            box-shadow: 0 0 5px #ccc;
            width:860px;
            height:150px;
            display:flex;
            flex-direction:row;
            .selection-inner-left {
              width: 600px;
              height:100%;
              display:flex;
              flex-direction:column;
              justify-content: space-around;
              .inner-left-list {
                display:flex;
                flex-direction:row;
                justify-content:space-around;
                align-items:center;
                .left-list-name {
                  width:112px;
                  letter-spacing: 14px;
                }
                .left-list-name1 {
                  width:112px;
                  letter-spacing:3px;
                  margin-left:14px;
                }

              }
              #product-type-selection {
                .left-list-name {
                  margin-left:10px;
                }
                .left-list-selection {
                  width:104px;
                }
                .left-list-weight {
                  margin-left:-20px;
                }
                .left-list-selection:nth-child(2) {
                  margin-left:20px;
                }
              }
            }
            .selection-inner-right {
              flex:1;
              display:flex;
              .inner-right-btn {
                width:100px;
                height:30px;
                background: rgba(252,207,0,1);
                color:#fff;
                display:flex;
                justify-content:center;
                align-items:center;
                cursor:pointer;
                border-radius:3px;
                margin-top:100px;
                margin-left:130px;
              }
            }
          }
        }
        .container-left-detail {
          flex:1;
          width: 100%;
          display:flex;
          justify-content:center;
          .left-detail-inner {
            width:860px;
            margin-top:10px;
            box-shadow: 0 0 5px #ccc;
          }
        }
      }

    }
  }
</style>
