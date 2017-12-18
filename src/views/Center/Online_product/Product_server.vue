<template>
  <div class="product-server">
    <div class="server-nav">
      <span class="server-nav-title"><span class="title-text">基础服务</span><span class="title-line"></span></span>
      <div class="server-nav-select select-little">
        <img src="../../../assets/product1.png" class="detail-logo">
        <span class="nav-select-text">航空运输</span>
        <div class="nav-select-detail">
          <div class="detail-list1 detail-list"><span class="detail-name">航空运费</span><span class="detail-cost">{{airCost}}元/千克</span></div>
          <div class="detail-list2 detail-list"><span class="detail-name">燃油附加费</span><span class="detail-cost">{{fuelCost}}元/千克</span></div>
        </div>
        <div class="detail-btn-box"><span class="inner-right-btn">运价申请</span></div>
        <div class="detail-img">
          <product-select @increment="productListSelect"></product-select>
        </div>
      </div>
    </div>
    <div class="server-more">
      <span class="server-nav-title"><span class="title-text">更多服务</span><span class="title-line"></span></span>
      <div class="server-nav-select select-little">
        <div class="detail-logo"><img src="../../../assets/product2.png"></div>
        <span class="nav-select-text">始发港交货</span>
        <div class="nav-select-detail">
          <div class="detail-list1 detail-list"><span class="detail-name">出港处置费</span><span class="detail-cost">{{exportCost}}元/千克</span></div>
          <div class="detail-list2 detail-list"><span class="detail-name">出港制单费</span><span class="detail-cost">{{formCost}}元/千克</span></div>
        </div>
        <div class="detail-btn-box"></div>
        <div class="detail-img">
          <product-select @increment="productExportSelect"></product-select>
        </div>
      </div>
      <div class="server-nav-select select-little">
        <div class="detail-logo"><img src="../../../assets/product3.png"></div>
        <span class="nav-select-text">目的港提货</span>
        <div class="nav-select-detail">
          <div class="detail-list"><span class="detail-name">进港提货费</span><span class="detail-cost">{{productCost}}元/千克</span></div>
        </div>
        <div class="detail-btn-box"></div>
        <div class="detail-img">
          <product-select @increment="productPurpostSelect"></product-select>
        </div>
      </div>
      <div class="server-nav-select select-big">
        <div class="detail-logo"><img src="../../../assets/product4.png"></div>
        <span class="nav-select-text">上门取货</span>
        <div class="nav-select-detail">
          <div class="detail-list1 detail-list"><span class="detail-name">地面运输费</span><span class="detail-cost">{{landCost}}元/千克</span></div>
          <div class="detail-list2 detail-list"><span class="detail-name">最低收费</span><span class="detail-cost">{{minCost}}元/千克</span></div>
        </div>
        <div class="detail-btn-box">
          <div class="detail-address">
            <span class="address-info">深圳市/南山区</span>
            <span class="address-info">一般配送</span>
            <span class="address-little">实际落地时间在24:00之前的航班，次日到达</span>
          </div>
        </div>
        <div class="detail-img">
          <product-select @increment="productHomeSelect"></product-select>
        </div>
      </div>
      <div class="server-nav-select select-big">
        <div class="detail-logo"><img src="../../../assets/product5.png"></div>
        <span class="nav-select-text">落地配送</span>
        <div class="nav-select-detail">
          <div class="detail-list4 detail-list"><span class="detail-name">配送费</span><span class="detail-cost">{{dispatchCost}}元/千克</span></div>
          <div class="detail-list3 detail-list">1吨金杯车：小于1000千克/1.8*1.3*1.1/5立方米</div>
        </div>
        <div class="detail-btn-box">
          <div class="detail-address">
            <span class="address-info">深圳市/南山区</span>
            <span class="address-info">一般配送</span>
            <span class="address-little">
              <span class="address-btn btn-active" @click="btn1" ref="address-btn1">1吨金杯车</span>
              <span class="address-btn" @click="btn2" ref="address-btn2">2吨金杯车</span>
              <span class="address-btn" @click="btn3" ref="address-btn3">3吨金杯车</span>
            </span>
          </div>
        </div>
        <div class="detail-img">
          <product-select @increment="productDispatchSelect"></product-select>
        </div>
      </div>
      <span class="server-nav-title"><span class="title-text">增值服务</span><span class="title-line"></span></span>
      <div class="server-nav-select select-little">
        <div class="detail-logo"><img src="../../../assets/product6.png"></div>
        <span class="nav-select-text">报关报检</span>
        <div class="nav-select-detail">
          <div class="detail-list"><span class="detail-name">报关报检费</span><span class="detail-cost">{{insuranceCost}}元/单</span></div>
        </div>
        <div class="detail-btn-box"></div>
        <div class="detail-img">
          <product-select @increment="productSafeSelect"></product-select>
        </div>
      </div>
      <div class="server-nav-select select-little">
        <div class="detail-logo"><img src="../../../assets/product7.png"></div>
        <span class="nav-select-text">运输保险</span>
        <div class="nav-select-detail">
          <div class="detail-list"><span class="detail-name">保险费</span><span class="detail-cost">{{safeCost}}元/单</span></div>
        </div>
        <div class="detail-btn-box"></div>
        <div class="detail-img">
          <product-select @increment="productTrafficSelect"></product-select>
        </div>
      </div>
    </div>
    <div class="server-add"></div>
  </div>
</template>

<script type="text/javascript">
  import productSelect from './product_select'
  export default {
    props: {
      costDetail: {
        type: Object,
        default: {}
      },
      airSelect: {
        type:Boolean,
        default: false
      },
      liming: {
        type: Number,
        default:0
      }
    },
    components: {
      productSelect
    },
    data () {
      return {
        checked: true,
        airCost: 0,
        fuelCost: 0,
        exportCost: 0,
        landCost: 0,
        minCost: 0,
        formCost: 0,
        productCost: 0,
        dispatchCost: 0,
        insuranceCost: 0,
        safeCost: 0
      }
    },
    methods: {
      productListSelect (bool) {
        this.$store.commit('airShow')
        this.$emit('costProductList', [this.airCost, this.fuelCost])
        this.$store.commit('list', bool)
      },
      productExportSelect (bool) {
        this.$store.commit('fuelShow')
        this.$emit('costExportList', [this.exportCost, this.formCost])
        this.$store.commit('export', bool)
      },
      productPurpostSelect (bool) {
        this.$store.commit('landShow')
        this.$emit('costLandList', this.productCost)
        this.$store.commit('land', bool)
      },
      productHomeSelect (bool) {
        this.$store.commit('homeShow')
        this.$emit('costHomeList', this.landCost)
        this.$store.commit('home', bool)
      },
      productDispatchSelect (bool) {
        this.$store.commit('dispatchShow')
        this.$emit('costDispatchList', this.dispatchCost)
        this.$store.commit('dispatch', bool)
      },
      productSafeSelect (bool) {
        this.$emit('costSafeList', this.insuranceCost)
        this.$store.commit('insurance', bool)
      },
      productTrafficSelect (bool) {
        this.$emit('costTrafficList', this.trafficCost)
        this.$store.commit('traffic', bool)
      },
      btn1 (e) {
        this.dispatchCost = this.costDetail.dispatch1
      },
      btn2 (e) {
        this.dispatchCost = this.costDetail.dispatch2
      },
      btn3 () {
        this.dispatchCost = this.costDetail.dispatch3
      }
    },
    mounted () {
      this.airCost = this.costDetail.air
      this.fuelCost = this.costDetail.fuel
      this.exportCost = this.costDetail.export
      this.landCost = this.costDetail.land
      this.minCost = this.costDetail.min
      this.formCost = this.costDetail.form
      this.productCost = this.costDetail.product
      this.dispatchCost = this.costDetail.dispatch1
      this.insuranceCost = this.costDetail.insurance
      this.safeCost = this.costDetail.safe

      this.$store.commit('airForm', this.costDetail.air)
      this.$store.commit('fuelForm', this.costDetail.fuel)
      this.$store.commit('exportForm', this.costDetail.export)
      this.$store.commit('landForm', this.costDetail.land)
      this.$store.commit('minForm', this.costDetail.min)
      this.$store.commit('formForm', this.costDetail.form)
      this.$store.commit('productForm', this.costDetail.product)
      this.$store.commit('dispatchForm', this.costDetail.dispatch1)
      this.$store.commit('insuranceForm', this.costDetail.insurance)
      this.$store.commit('safeForm', this.costDetail.safe)
      //this.$store.commit('airMount')
      //this.$store.commit('getWeight',this.$refs.Weight.querySelector('input').value)
      //this.$store.commit('getSum', parseInt(this.$store.getters.weight))
    }
  }
</script>

<style lang="scss" scoped>
.product-server {
  background:#fff;
  padding:0 15px;
}
  .server-nav-title {
    width:100%;
    height: 50px;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items: center;
    .title-text {
      width:110px;
      text-indent:30px;
    }
    .title-line {
      flex:1;
      border:1px solid rgba(0,0,0,.1);
      border-bottom:none;
      margin-right:30px;
    }
  }
  .select-little {
    height: 80px;
    position:relative;
  }
  .select-big {
    height: 130px;
  }
  .server-nav-select {
      flex:1;
      display:flex;
      flex-direction:row;
      justify-content: space-around;
      align-items:center;
      box-shadow:0 1px 4px rgba(0,0,0,.1);
      margin:5px 0;
      .detail-logo {
        width:70px;
        display:flex;
        justify-content:center;
      }
      .nav-select-text {
        width:80px;
        display:inline-block;
        text-align-last:justify;
      }
      .nav-select-detail {
        display:flex;
        width:190px;
        flex-direction:column;
        height:100%;
        justify-content: space-around;
        -webkit-text-size-adjust: none;
        .detail-list1 {
          margin-bottom: -25px;
        }
        .detail-list3 {
          width:300px;
          transform:scale(0.8);
          margin-left:-70px;
        }
        .detail-list4 {
          margin-bottom: -55px;
        }
        .detail-list {
          display: flex;
          .detail-name {
            width:80px;
            display:inline-block;
            text-align-last: justify;
          }
          .detail-cost {
            color: rgba(252,207,0,1);
            margin-left:10px;
          }
        }
      }
      .detail-btn-box {
        width:190px;
        .detail-address {
          height:110px;
          width:100%;
          display: flex;
          flex-direction:column;
          justify-content:space-around;
          align-items: center;
          -webkit-text-size-adjust: none;
          .address-little {
            width:300px;
            transform:scale(0.8);
            text-indent:20px;
            display:flex;
            justify-content:space-around;
            .address-btn {
              padding:2px 12px 2px 0px;
              height:20px;
              color:rgba(252,207,0,1);
              border:1px solid rgba(252,207,0,1);
              border-radius:3px;
              cursor:pointer;
              display:inline-block;

            }
            .btn-active {
              background: rgba(252,207,0,1);
              color: #fff;
            }
          }
        }
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
          box-shadow:0px 3px 4px rgba(0,0,0,.1)
        }
        .inner-right-btn:hover{
          background:rgba(252,207,0,.8)
        }
      }
      .detail-img {
        margin-right:20px;
        cursor:pointer;
      }
    }
  .server-nav {
    width:100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    .server-nav-title {
      width:100%;
      height: 50px;
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      align-items: center;
      .title-text {
        width:110px;
        text-indent:30px;
      }
      .title-line {
        flex:1;
        border:1px solid rgba(0,0,0,.1);
        border-bottom:none;
        margin-right:30px;
      }
    }
  }
  .server-more {
    width:100%;
    display: flex;
    flex-direction: column;
  }
</style>
