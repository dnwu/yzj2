<template>
  <div class="online_product">
    <div class="product-header">
      <span class="product-header-logo">网上下单</span>
      <div class="product-header-inner">
        <ul>
          <li v-for="(item, index) in chooselist" :key="index">
            <div class="choose-list-left">
              <div class="left-img-wrapper">
                <div class="left-img-inner">
                  <img :src="(index >= nowIndex)?imgarr[index].active:imgarr[index].default" v-if="index <= nowIndex">
                </div>
              </div>
              <div class="left-step-wrapper"><span class="left-step">{{ item.name }}</span></div>
            </div>
            <div class="choose-list-right" v-if="index<=4">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  computed : {
    nowIndex () {
      return this.$store.getters.nowIndex
    }
  },
  //methods: {
  //  trumpIndex (index) {
  //    this.$store.commit('goIndex', index)
  //    switch(index) {
  //      case 0: this.$router.push('/center/online_product')
  //              break;
  //      case 1: this.$router.push('/center/online_product/write')
  //              break;
  //      case 2: this.$router.push('/center/online_product/complete')
  //              break;
  //    }
  //  }
  //},
  data () {
    return {
      pp:3,
      complete:{
        default: true
      },
      input: '',
      chooselist:[
        {name: '产品选择'},
        {name: '填写订单'},
        {name: '下单成功'},
        {name: '支付成功'},
        {name: '运输中'},
        {name: '订单完成'}
      ],
      imgarr:[
        {
          active:require('../../../assets/productlist1.png'),
          default:require('../../../assets/product15.png'),
          path: '/center/online_product'
        },
        {
          active:require('../../../assets/productlist2.png'),
          default:require('../../../assets/product15.png'),
          path: '/center/online_product/write'
        },
        {
          active:require('../../../assets/productlist3.png'),
          default:require('../../../assets/product15.png'),
          path:'/center/online_product/complete'
        },
        {
          active:require('../../../assets/productlist4.png'),
          default:require('../../../assets/product15.png')
        },
        {
          active:require('../../../assets/productlist5.png'),
          default:require('../../../assets/product15.png')
        },
        {
          active:require('../../../assets/productlist6.png'),
          default:require('../../../assets/product15.png')
        }
      ],
      value: ''
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
        display:flex;
        align-items:center;
        flex:1;
        >ul {
          height:100%;
          width:100%;
          display:flex;
          display:flex;
          flex-direction:row;
          >li {
            height: 100%;
            width:150px;
            font-size:12px;
            display:flex;
            align-items:center;
            .choose-list-left {
              cursor: pointer;
              width:50px;
              height:90%;
              display:flex;
              flex-direction:column;
              >.left-img-wrapper {
                display:flex;
                justify-content:center;
                height:28px;
                .left-img-inner {
                  border:1px solid rgba(252,207,0,1);
                  border-radius:12px;
                  height:24px;
                  width:24px;
                  margin-top:4px;
                  img {
                    width:27px;
                    height:27px;
                    transform: translate(-1px,-1px);
                  }
                }
              }
              >.left-step-wrapper {
                flex:1;
                display:flex;
                justify-content:center;
                align-items:center;
                .left-step {
                  display:flex;
                  justify-content:center;
                }
              }
            }
            .choose-list-right {
              border:0.5px solid rgba(197,197,197,.5);
              border-bottom:none;
              flex:1;
              margin-top:-19px;
            }
          }
        }
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
    .product-container-right {
      box-shadow: 0 0 5px #ccc;
      position:relative;
      margin-top:50px;
      height:500px;
      width:300px;
      .right-nav {
        height:50px;
        font-size:18px;
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .right-content {
        height:310px;
        .right-content-nav {
          height:60px;
          margin-top:10px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-around;
          .right-content-cost {
            width:200px;
            width:86%;
            display:flex;
            justify-content:space-around;
            .cost-text {
              width:80px;
              text-align-last:justify;
            }
          }
        }
        .right-content-free {
          height:70px;
          display:flex;
          justify-content:space-around;
          align-items:center;
          .cost-free {
            width:80px;
            margin-left:10px;
            display:inline-block;
            text-align-last:justify;
          }
        }
        .right-content-total {
          height:40px;
          display:flex;
          align-items:center;
          flex-direction:row;
          justify-content:space-around;
          .total-nav {
            width:80px;
            margin-left:30px;
            display:inline-block;
            text-align-last:justify;
          }
          .total-content {
            width:80px;
            color:rgba(215,215,50,1)
          }
        }
      }
      .confirm {
        position:absolute;
        width:100%;
        height:40px;
        bottom: -70px;
        text-align:center;
        line-height:40px;
        font-size:20px;
        background:rgba(245,39,39,1);
        color:#fff;
        cursor:pointer;
      }
    }
  }
</style>
