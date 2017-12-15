<template>
  <div class="product-container li-product-write-container">
      <div class="product-container-left">
        <div class="container-left-selection">
          <div class="selection-inner">
            <div class="selection-inner-left">
              <div class="inner-left-list" id="left-list1">
                <div class="left-list-name">运输路线</div>
                <div class="left-list-selection" ref="list1"><v-distpicker only-province @selected="onBeginSelected" :placeholders="distholders"></v-distpicker></div>
                <div class="left-list-selection"><v-distpicker only-province @selected="onEndSelected" :placeholders="distholders"></v-distpicker></div>
              </div>
              <div class="inner-left-list"id="left-list2">
                <div class="left-list-name">航班起飞时间</div>
                <div class="left-list-selection selection-date">
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间" style="width:194px;">
                    </el-date-picker>
                  </div>
                </div>
                <div class="left-list-selection selection-date">
                  <div class="block"
                   <el-date-picker
                      v-model="value2"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </div>
                <div class="inner-left-list" id="product-type-selection" ref="list3">
                  <div class="left-list-name">货物重量</div>
                  <div class="left-list-selection"><el-input  v-model="liming" placeholder="请输入重量" class="left-input"></el-input><span class="left-list-weight">KG</span></div>
                  <div class="left-list-selection" id="left-list3">
                    <div class="left-list-type">货物类型</div>
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="selection-inner-right">
                <span class="inner-right-btn" @click="productSearch">查询</span>
              </div>
            </div>
          </div>
          <div class="container-left-detail">
            <div class="left-detail-inner" v-if="searchShow">
              <p-server :cost-detail="costList" @costProductList="costComputed" @costExportList="exportComputed" @costLandList="landComputed" @costHomeList="homeComputed" @costDispatchList="dispatchComputed" @costSafeList="safeComputed" @costTrafficList="trafficComputed"></p-server>
            </div>
          </div>
        </div>
        <div class="product-container-right">
          <div class="right-nav">费用合计</div>
          <div class="right-content">
            <div class="right-content-nav">
              <div class="right-content-cost" v-if="airSelect">
                <span class="cost-text">航空运费</span>
                <span class="cost-number">{{airLineCost}}元</span>
              </div>
              <div class="right-content-cost" v-if="airSelect">
                <span class="cost-text">燃油附加费</span>
                <span class="cost-number">{{fuelLineCost}}元</span>
              </div>
            </div>
            <div class="right-content-nav">
              <div class="right-content-cost" v-if="fuelSelect">
                <span class="cost-text">出港处置费</span>
                <span class="cost-number">{{exportLineCost}}元</span>
              </div>
              <div class="right-content-cost" v-if="fuelSelect">
                <span class="cost-text">出港制单费</span>
                <span class="cost-number">{{formLineCost}}元</span>
              </div>
            </div>
            <div class="right-content-nav">
              <div class="right-content-cost" v-if="landSelect">
                <span class="cost-text">目的港提货</span>
                <span class="cost-number">{{landLineCost}}元</span>
              </div>

            </div>
            <div class="right-content-nav">
              <div class="right-content-cost" v-if="homeSelect">
                <span class="cost-text">上门提货费</span>
                <span class="cost-number">{{homeLineCost}}元</span>
              </div>
              <div class="right-content-cost" v-if="dispatchSelect">
                <span class="cost-text">落地配送费</span>
                <span class="cost-number">{{dispatchLineCost}}元</span>
              </div>
            </div>
            <div class="right-content-free">
              <span class="cost-free">优惠</span>
              <span>
                <span class="cost-index">0</span>
                <span>元</span>
              </span>
            </div>
            <div class="right-content-total">
              <span class="total-nav">总费用</span>
              <span class="total-content">
                <span class="total-num">{{totalPrice}}</span>
                <span class="total-money">元</span>
              </span>
            </div>
          </div>
          <div class="confirm" @click="productConfirm">确认下单</div>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
  import VDistpicker from 'v-distpicker'
import PServer from './Product_server'
// @on-change="chooseSelection(index)" :class="{index <= nowIndex?active:normal}"
export default {
  components: {
    VDistpicker,
    PServer
  },
  computed: {
    beginTime () {
      let y = this.value1.getFullYear()
      let m = this.value1.getMonth() + 1
      let d = this.value1.getDate()
      let h = this.value1.getHours()
      let f = this.value1.getMinutes()
      if(m < 10) m = '0'+m
      if(d < 10) d = '0'+d
      if(h < 10) h = '0'+h
      if(f < 10) f = '0'+f
      return y+'-'+m+'-'+d+' '+h+':'+f
    },
    landTime () {
      let y = this.value2.getFullYear()
      let m = this.value2.getMonth() + 1
      let d = this.value2.getDate()
      let h = this.value2.getHours()
      let f = this.value2.getMinutes()
      if(m < 10) m = '0'+m
      if(d < 10) d = '0'+d
      if(h < 10) h = '0'+h
      if(f < 10) f = '0'+f
      return y+'-'+m+'-'+d+' '+h+':'+f
    },
    airSelect () {
      return this.$store.getters.airSelect
    },
    fuelSelect () {
      return this.$store.getters.fuelSelect
    },
    landSelect () {
      return this.$store.getters.landSelect
    },
    homeSelect () {
      return this.$store.getters.homeSelect
    },
    dispatchSelect () {
      return this.$store.getters.dispatchSelect
    },
    weight () {
        return 1
    },
    airLineCost () {
      if (!this.airFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.airCost
    },
    fuelLineCost () {
      if (!this.fuelFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.fuelCost
    },
    exportLineCost () {
      if (!this.exportFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.exportCost
    },
    formLineCost () {
      if (!this.formFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.formCost
    },
    landLineCost () {
      if (!this.landFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.productCost
    },
    homeLineCost () {
      if (!this.homeFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.landCost
    },
    dispatchLineCost () {
      if (!this.dispatchFormCost) return 0
      return this.$store.getters.weight * this.$store.getters.dispatchCost
    },
    safeLineCost () {
      if (!this.safeFormCost) return 0
      return this.$store.getters.insuranceCost
    },
    trafficLineCost () {
      if (!this.trafficFormCost) return 0
      return this.$store.getters.safeCost
    },
    totalPrice () {
      return this.$store.getters.sum
    }
  },
  data () {
    return {
      liming: '',
      li:'',
      airFormCost:'',
      searchShow:false,
      costList: {},
      complete:{
        default: true
      },
      nowIndex: 0,
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
          default:require('../../../assets/product13.png')
        },
        {
          active:require('../../../assets/productlist2.png'),
          default:require('../../../assets/product13.png')
        },
        {
          active:require('../../../assets/productlist3.png'),
          default:require('../../../assets/product13.png')
        },
        {
          active:require('../../../assets/productlist4.png'),
          default:require('../../../assets/product13.png')
        },
        {
          active:require('../../../assets/productlist5.png'),
          default:require('../../../assets/product13.png')
        },
        {
          active:require('../../../assets/productlist6.png'),
          default:require('../../../assets/product13.png')
        }
      ],
      options: [
        {
          value: '选项一',
          label: '普货'
        },
        {
          value: '选项二',
          label: '特殊货物'
        }
      ],
      value: '',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      origin: '',
      destination: '',
      startTime: '',
      endTime: '',
      productWeight: '',
      distholders: {
        province: '------- 省 --------'
      }
    }
  },
  methods: {
    onBeginSelected(data) {
      this.$store.commit('startLand', data.province.value)
    },
    onEndSelected (data){
      this.$store.commit('endLand', data.province.value)
    },
    costComputed (data) {
      this.airFormCost = data[0],
      this.fuelFormCost = data[1]
    },
    exportComputed (data) {
      this.exportFormCost = data[0]
      this.formFormCost = data[1]
    },
    landComputed (data) {
      this.landFormCost = data
    },
    homeComputed (data) {
      this.homeFormCost = data
    },
    dispatchComputed (data) {
      this.dispatchFormCost = data
    },
    safeComputed (data) {
      this.safeFormCost = data
    },
    trafficComputed (data) {
      this.trafficFormCost = data
    },
    productSearch () {
      this.searchShow = true
      this.costList = {
        air: 4.5,
        fuel: 0.2,
        export: 3,
        form: 10,
        product: 2,
        dispatch1: 300,
        dispatch2: 500,
        dispatch3: 1000,
        land: 2,
        min: 50,
        insurance: 1000,
        safe: 1
      }
      this.$store.commit('getWeight',this.liming)
    },
    productConfirm () {
      if (this.beginTime != undefined && this.endTime != undefined) {
        this.$store.commit('getIndex')
        this.$store.commit('type', this.value)
        this.$store.commit('startTime', this.beginTime)
        this.$store.commit('endTime', this.landTime)
        this.$router.push('/center/Online_product/write')
      } else {
        console.log(this.beginTime&&this.landTime)
      }
    }
  },
  mounted () {
    this.$router.push({ path: '/center/online_product', query: { page: 0 }})
    let num = location.href.split('?')[1].split('=')[1]
    this.$store.commit('goIndex',num)
    this.searchShow = false

  }
}
</script>

<style lang="scss" scoped>
.product-container {
      color:rgba(153,153,153,1);
      flex:1;
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
            background:#fff;
            box-shadow: 0 0 15px #ccc;
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
              #left-list1{
                width:600px;
                .left-list-selection {
                  width:180px;
                  transform:scale(.9);
                }
              }
              #left-list2 {
                .left-list-selection {
                  width:180px;
                }
              }
              *{
                border:none!important;
              }
              .inner-left-list:nth-child(1) {
                margin-top:10px;
              }
              .inner-left-list:nth-child(3) {
                margin-bottom:10px;
              }
              .inner-left-list {
                display:flex;
                flex-direction:row;
                justify-content:space-between;
                align-items:center;
                .left-list-name {
                  width:104px;
                  display:inline-block;
                  text-align-last:justify;
                  margin-left:30px;
                  font-size:15px;
                }
              }
              #product-type-selection {
                display:felx;
                flex-direction:row;
                justify-content:space-between;
                align-items:center;
                width:600px;
                .left-list-name {
                  width:104px;
                  display:inline-block;
                  text-align-last:justify;
                  margin-left:30px;
                }
                .left-list-selection {
                  width:104px;
                  display:flex;
                  flex-direction:row;
                  align-items:center;
                  justify-content:center;
                  .left-input {
                    width:100px;
                    margin-left:-30px;
                  }
                  .left-list-weight {
                  }
                }
                #left-list3 {
                  width:200px;
                  display:flex;
                  flex-direction:row;
                  align-items:center;
                  justify-content:center;
                  .left-list-type{
                    width:130px;
                    margin-left:30px;
                  }
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
                box-shadow:3px 3px 5px rgba(0,0,0,.1);
              }
              .inner-right-btn:hover {
                background:rgba(252,207,0,.8)
              }
            }
          }
        }
        .container-left-detail {
          flex:1;
          width: 100%;
          display:flex;
          justify-content:center;
          margin-bottom: 100px;
          .left-detail-inner {
            background:#fff;
            width:860px;
            margin-top:10px;
            box-shadow: 0 0 15px #ccc;
          }
        }
      }

    }
    .product-container-right {
      background:#fff;
      box-shadow: 0 0 15px #ccc;
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
            display:flex;
            justify-content:space-between;
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
        border-radius:3px;
      }
      .confirm:hover{
        background:rgba(245,39,39,.9);
      }
    }
</style>
<style lang='scss'>
  .li-product-write-container {
    .left-list-selection {
      *{
        border:none;
      }
      *:focus{
        border:none;
      }
      select{
        border:none;
        option {
          border:none;
        }
      }
      select:focus{
        border:none;
      }
      input {
        border:none;
      }
    }
    #left-list1{
      width:600px;
      .left-list-selection {
        width:180px;
        transform:scale(.9);
        select{
          margin-left: -30px;
          width:170px;
          text-indent: 40px;
        }
      }
    }
    input,select,button,textarea{
      outline: none;
    }
  }

</style>
