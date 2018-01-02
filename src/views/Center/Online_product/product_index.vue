<template>
  <div class="m-product-container m-li-product-write-container">
    <div class="product-container-left">
      <div class="container-left-selection">
        <div class="selection-inner">
          <div class="selection-inner-left">
            <div class="inner-left-list" id="left-list1">
              <div class="left-list-name">运输路线</div>
              <div class="left-list-selection dist-list1">
                <StartPortselect @startportvalue = 'startportvalue'></StartPortselect>
              </div>
              <div class="dist-range">─</div>
              <div class="left-list-selection dist-list2">
                <EndPortselect @endportvalue = 'endportvalue'></EndPortselect>
              </div>
            </div>
            <div class="inner-left-list" id="left-list2">
              <div class="left-list-name">航班起飞时间</div>
              <div class="left-list-selection selection-date">
                <div class="block">
                  <el-date-picker
                    size="mini"
                    v-model="searchData.planeData"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-time-picker
                    value-format="HH:mm"
                    format="HH:mm"
                    size="mini"
                    is-range
                    v-model="searchData.planeTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
            </div>
            <div class="inner-left-list" id="product-type-selection" ref="list3">
                <div class="left-list-name">货物重量</div>
                <div class="left-list-selection"><el-input  v-model="searchData.goodsWeight" placeholder="请输入重量" class="left-input"></el-input><span class="left-list-weight">KG</span></div>
                <div class="left-list-selection" id="left-list3">
                  <div class="left-list-type">货物类型</div>
                  <el-select v-model="searchData.goodsType" placeholder="请选择">
                    <el-option
                      v-for="item in goodsTypesList"
                      :key="item.id"
                      :label="item.dataName"
                      :value="item.id">
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
          <div class="product-server">
            <div class="server-nav">
              <span class="server-nav-title"><span class="title-text">基础服务</span><span class="title-line"></span></span>
              <div class="server-nav-select select-little" v-if="'airfreightDTO' in productSearchResult">
                <img src="../../../assets/product1.png" class="detail-logo">
                <span class="nav-select-text">航空运输</span>
                <div class="nav-select-detail">
                  <div class="detail-list1 detail-list"><span class="detail-name">航空运费</span><span class="detail-cost">{{productSearchResult.airfreightDTO.airfreightCharge}}元/千克</span></div>
                  <div class="detail-list2 detail-list"><span class="detail-name">燃油附加费</span><span class="detail-cost">{{productSearchResult.airfreightDTO.fuelCharge}}元/千克</span></div>
                </div>
                <!-- 运价申请模态框 -->

                <div class="detail-btn-box"><span class="inner-right-btn">运价申请</span></div>
                <div class="detail-img active el-icon-success" :class="selectServer.baseServer?'active':''">
                </div>
              </div>
            </div>
            <div class="server-more">
              <span class="server-nav-title"><span class="title-text">更多服务</span><span class="title-line"></span></span>
              <!-- 始发港交货 -->
              <div class="server-nav-select select-little" v-if="'airportStart' in productSearchResult">
                <div class="detail-logo"><img src="../../../assets/product2.png"></div>
                <span class="nav-select-text">{{productSearchResult.airportStart.name}}</span>
                <div class="nav-select-detail">
                  <div class="detail-list1 detail-list" v-for="(item,index) in productSearchResult.airportStart.priceDTOS" :key="index">
                    <template v-if="item.priceType == 11">
                      <span class="detail-name">{{item.name}}</span>
                      <span class="detail-cost">{{item.price}}元/千克</span>
                    </template>
                    <template v-if="item.priceType == 12">
                      <span class="detail-name">{{item.name}}</span>
                      <span class="detail-cost">{{item.price}}元/单</span>
                    </template>
                  </div>
                  <!-- <div class="detail-list2 detail-list">
                    <span class="detail-name">{{productSearchResult.airportStart.priceDTOS[1].name}}</span>
                    <span class="detail-cost">{{productSearchResult.airportStart.priceDTOS[1].price}}元/千克</span>
                  </div> -->
                </div>
                <div class="detail-btn-box"></div>
                <div class="detail-img el-icon-success" @click="toggleSelect('airportStart')" :class="selectServer.airportStart?'active':''">
                </div>
              </div>
              <!-- 目的港提货 -->
              <div class="server-nav-select select-little" v-if="'airportEnd' in productSearchResult">
                <div class="detail-logo"><img src="../../../assets/product3.png"></div>
                <span class="nav-select-text">{{productSearchResult.airportEnd.name}}</span>
                <div class="nav-select-detail">
                  <div class="detail-list" v-for="(item,index) in productSearchResult.airportEnd.priceDTOS" :key="index">
                    <template v-if="item.priceType == 11">
                      <span class="detail-name">{{item.name}}</span>
                      <span class="detail-cost">{{item.price}}元/千克</span>
                    </template>
                    <template v-if="item.priceType == 12">
                      <span class="detail-name">{{item.name}}</span>
                      <span class="detail-cost">{{item.price}}元/单</span>
                    </template>
                  </div>
                </div>
                <div class="detail-btn-box"></div>
                <div class="detail-img el-icon-success" @click="toggleSelect('airportEnd')" :class="selectServer.airportEnd?'active':''">
                </div>
              </div>
              <!-- 上门取货 -->
              <div class="server-nav-select select-big" v-if="'landStart' in productSearchResult">
                <div class="detail-logo"><img src="../../../assets/product4.png"></div>
                <span class="nav-select-text">上门取货</span>
                <div class="nav-select-detail">
                  <template v-if="selectServer.landStartGeneral">
                    <div class="detail-list1 detail-list"><span class="detail-name">地面运输费</span><span class="detail-cost">{{selectServer.landStartPrice.price}}元/千克</span></div>
                    <div class="detail-list2 detail-list"><span class="detail-name">最低收费</span><span class="detail-cost">{{selectServer.landStartPrice.minPrice}}元/单</span></div>
                  </template>
                  <template v-if="!selectServer.landStartGeneral">
                    <div class="detail-list4 detail-list"><span class="detail-name">配送费</span><span class="detail-cost">{{getLandStartCarPrice}}元/辆</span></div>
                    <div class="detail-list3 detail-list">1吨金杯车：小于1000千克/1.8*1.3*1.1/5立方米</div>
                  </template>
                </div>
                <div class="detail-btn-box">
                  <div class="detail-address">
                    <span class="address-info">
                      <el-select @change="landStartLevel1Change" v-model="landStartLevel1" placeholder="请选择地区">
                        <el-option
                          v-for="item in landStartLevel1Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                    <span class="address-info">
                      <el-select @change="landStartLevel2Change" v-model="landStartLevel2" placeholder="请选择服务">
                        <el-option
                          v-for="item in landStartLevel2Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                    <span class="address-little" v-if="landStartLevel3ProductType2">实际落地时间在24:00之前的航班，次日到达</span>
                    <span class="address-little" v-if="landStartLevel3ProductType1">
                      <span class="address-btn" @click="toggleLandStartServer('landStart1Ton')" :class="selectServer.landStart1Ton?'btn-active':''">1吨金杯车</span>
                      <span class="address-btn" @click="toggleLandStartServer('landStart2Ton')" :class="selectServer.landStart2Ton?'btn-active':''">2吨厢式货车</span>
                      <span class="address-btn" @click="toggleLandStartServer('landStart3Ton')" :class="selectServer.landStart3Ton?'btn-active':''">3吨厢式货车</span>
                    </span>
                  </div>
                </div>
                <div class="detail-img el-icon-success" @click="toggleSelect('landStart')" :class="selectServer.landStart?'active':''">
                </div>
              </div>
              <!-- 落地配送 -->
              <div class="server-nav-select select-big" v-if="'landEnd' in productSearchResult">
                <div class="detail-logo"><img src="../../../assets/product5.png"></div>
                <span class="nav-select-text">落地配送</span>
                <div class="nav-select-detail">
                  <template v-if="selectServer.landEndGeneral">
                    <div class="detail-list1 detail-list"><span class="detail-name">地面运输费</span><span class="detail-cost">{{selectServer.landEndPrice.price}}元/千克</span></div>
                    <div class="detail-list2 detail-list"><span class="detail-name">最低收费</span><span class="detail-cost">{{selectServer.landEndPrice.minPrice}}元/单</span></div>
                  </template>
                  <template v-if="!selectServer.landEndGeneral">
                    <div class="detail-list4 detail-list"><span class="detail-name">配送费</span><span class="detail-cost">{{getLandEndCarPrice}}元/辆</span></div>
                    <div class="detail-list3 detail-list">1吨金杯车：小于1000千克/1.8*1.3*1.1/5立方米</div>
                  </template>
                </div>
                <div class="detail-btn-box">
                  <div class="detail-address">
                    <span class="address-info">
                      <el-select  @change="landEndLevel1Change" v-model="landEndLevel1" placeholder="请选择地区">
                        <el-option
                          v-for="item in landEndLevel1Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                    <span class="address-info">
                      <el-select  @change="landEndLevel2Change" v-model="landEndLevel2" placeholder="请选择服务">
                        <el-option
                          v-for="item in landEndLevel2Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                    <span class="address-little" v-if="landEndLevel3ProductType2">实际落地时间在24:00之前的航班，次日到达</span>
                    <span class="address-little" v-if="landEndLevel3ProductType1">
                      <span class="address-btn" @click="toggleLandEndServer('landEnd1Ton')" :class="selectServer.landEnd1Ton?'btn-active':''">1吨金杯车</span>
                      <span class="address-btn" @click="toggleLandEndServer('landEnd2Ton')" :class="selectServer.landEnd2Ton?'btn-active':''">2吨厢式货车</span>
                      <span class="address-btn" @click="toggleLandEndServer('landEnd3Ton')" :class="selectServer.landEnd3Ton?'btn-active':''">3吨厢式货车</span>
                    </span>
                  </div>
                </div>
                <div class="detail-img el-icon-success" @click="toggleSelect('landEnd')" :class="selectServer.landEnd?'active':''">
                </div>
              </div>
              <!-- 增值服务 -->
              <template v-if="ControlIncreaseInValueServer">
                <span class="server-nav-title"><span class="title-text">增值服务</span><span class="title-line"></span></span>
                <div class="server-nav-select select-little">
                  <div class="detail-logo"><img src="../../../assets/product6.png"></div>
                  <span class="nav-select-text">报关报检</span>
                  <div class="nav-select-detail">
                    <div class="detail-list"><span class="detail-name">报关报检费</span><span class="detail-cost">0元/单</span></div>
                  </div>
                  <div class="detail-btn-box"></div>
                  <div class="detail-img el-icon-success" @click="toggleSelect('customs')" :class="selectServer.customs?'active':''">
                  </div>
                </div>
                <div class="server-nav-select select-little">
                  <div class="detail-logo"><img src="../../../assets/product7.png"></div>
                  <span class="nav-select-text">运输保险</span>
                  <div class="nav-select-detail">
                    <div class="detail-list"><span class="detail-name">保险费</span><span class="detail-cost">0元/单</span></div>
                  </div>
                  <div class="detail-btn-box"></div>
                  <div class="detail-img el-icon-success" @click="toggleSelect('insurance')" :class="selectServer.insurance?'active':''">
                  </div>
                </div>
              </template>
            </div>
            <div class="server-add"></div>
          </div>
        </div>
        <div class="left-detail-none" v-if="searchNone">
          <div class="none-text">还没有查到任何产品服务</div>
        </div>
      </div>
    </div>
    <div class="product-container-right">
      <div class="right-nav">费用合计</div>
      <div class="right-content">
        <div class="right-content-nav box1">
          <div class="right-content-cost" v-if="airTransFee != 0">
            <span class="cost-text">航空运费</span>
            <span class="cost-number">{{airTransFee}}元</span>
          </div>
          <div class="right-content-cost" v-if="airOilAnnexFee != 0">
            <span class="cost-text">燃油附加费</span>
            <span class="cost-number">{{airOilAnnexFee}}元</span>
          </div>

        </div>
        <div class="right-content-nav" v-if="selectServer.airportStart && airportStartFee != 0">
          <div class="right-content-cost">
            <span class="cost-text">始发港交货</span>
            <span class="cost-number">{{airportStartFee}}元</span>
          </div>
        </div>
        <div class="right-content-nav" v-if="selectServer.airportEnd && airportEndFee != 0">
          <div class="right-content-cost">
            <span class="cost-text">目的港提货</span>
            <span class="cost-number">{{airportEndFee}}元</span>
          </div>
        </div>
        <div class="right-content-nav" v-if="selectServer.landStart && landStartGetGoodsFee != 0">
          <div class="right-content-cost">
            <span class="cost-text">上门取货</span>
            <span class="cost-number">{{landStartGetGoodsFee}}元</span>
          </div>
        </div>
        <div class="right-content-nav" v-if="selectServer.landEnd && landEndTranFee != 0">
          <div class="right-content-cost">
            <span class="cost-text">落地配送</span>
            <span class="cost-number">{{landEndTranFee}}元</span>
          </div>
        </div>
        <!-- <div class="right-content-nav" v-if="selectServer.airportStart">
          <div class="right-content-cost">
            <span class="cost-text">出港服务费</span>
            <span class="cost-number">{{landStartServerFee}}元</span>
          </div>
          <div class="right-content-cost">
            <span class="cost-text">制单代理费</span>
            <span class="cost-number">{{landStartMakeBillFee}}元</span>
          </div>
        </div>
        <div class="right-content-nav" v-if="selectServer.airportEnd">
          <div class="right-content-cost">
            <span class="cost-text">进港提货费</span>
            <span class="cost-number">{{landEndGetGoodsFee}}元</span>
          </div>

        </div>
        <div class="right-content-nav">
          <div class="right-content-cost" v-if="selectServer.landStart">
            <span class="cost-text">上门提货费</span>
            <span class="cost-number">{{landStartGetGoodsFee}}元</span>
          </div>
          <div class="right-content-cost" v-if="selectServer.landEnd">
            <span class="cost-text">落地配送费</span>
            <span class="cost-number">{{landEndTranFee}}元</span>
          </div>
        </div> -->
        <div class="right-content-free" v-if="false">
          <span class="cost-free cost-text">优惠</span>
          <span class="cost-number">
            <span class="cost-index">0</span>
            <span>元</span>
          </span>
        </div>
        <div class="right-content-total">
          <span class="total-nav">总费用</span>
          <span class="total-content">
            <span class="total-num">{{totalFee}}</span>
            <span class="total-money">元</span>
          </span>
        </div>
      </div>
      <div class="wave"></div>
      <div class="confirm" @click="productConfirm">下一步</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import StartPortselect from "@/components/StartPortselect";
import EndPortselect from "@/components/EndPortselect";
import productSelect from "./product_select";
export default {
  components: {
    // PServer,
    StartPortselect,
    EndPortselect,
    productSelect
  },
  data() {
    return {
      searchData: {
        // 搜索条件
        startPort: "",
        endPort: "",
        planeData: new Date(),
        planeTime: ['00:00','23:59'],
        goodsWeight: "",
        goodsType: 7
      },
      //  选择的服务
      selectServer: {
        baseServer:true,    // 基础服务
        airportStart: false, // 始发港交货
        airportEnd: false, // 目的港提货
        landStart: false, // 上门取货
        landEnd: false, //落地送货
        customs: false, // 报关报检
        insurance: false, // 运输保险
        airfreightProductId: 0, // 航空运输产品ID
        airportProductIds:[], // 始发，目的港提货服务ID
        landCarriageProductIds:[], //上门取货，落地配送 路面运输产品ID列表,
        flightRecordId:'',
        landStartGeneral: false, // 上门取货服务类一般服务
        landStartPrice: {
          // 上门取货服务费
          price: "", // 价格
          minPrice: "", //最低价格
          car1DonPrice: "", // 上门取货专车费
          car2DonPrice: "", // 上门取货专车费
          car3DonPrice: "" // 上门取货专车费
        },
        landStart1Ton: false, // 上门取货服务类一吨金杯车
        landStart2Ton: false, // 上门取货服务类2吨厢式车
        landStart3Ton: false, // 上门取货服务类3吨厢式车
        landEndGeneral: false, // 落地配送服务类一般服务
        landEndPrice: {
          // 落地配送上门取货服务费
          price: "", // 落地配送价格
          minPrice: "", //落地配送最低价格
          car1DonPrice: "", // 落地配送上门取货专车费
          car2DonPrice: "", // 落地配送上门取货专车费
          car3DonPrice: "" // 落地配送上门取货专车费
        },
        landEnd1Ton: false, // 落地配送服务类一吨金杯车
        landEnd2Ton: false, // 落地配送服务类2吨厢式车
        landEnd3Ton: false // 落地配送服务类3吨厢式车
      },
      landStartLevel1: "", // 上门取货一级选择value
      landEndLevel1: "", // 落地配送一级选择value
      landStartLevel2Data: [], // 上门取货二级选择data
      landStartLevel2: "", // 上门取货二级选择value
      landEndLevel2Data: [], // 落地配送二级选择data
      landEndLevel2: "", // 落地配送二级选择value
      // 控制配送type(一般配送，专车配送)Type1位专车配送 Type2为一般配送
      landStartLevel3ProductType1: false,
      landStartLevel3ProductType2: false,
      landEndLevel3ProductType1: false,
      landEndLevel3ProductType2: false,
      // landStartLevel2Placeholder: "",
      // landEndLevel2Placeholder: "",
      goodsTypesList: [],
      productSearchResult: {},
      getResultSuccess: false, // 获取productSearchResult成功，重置为true
      searchShow: false,
      searchNone: false,
      saveStartLandCarriageSales: {}, // 储存一级选择时候变化后的选择的地区对象,计算价格
      saveEndLandCarriageSales: {}, // 储存一级选择时候变化后的选择的地区对象，计算价格
      controlSubimt: false, // 控制提交按钮的提交
      ControlIncreaseInValueServer: false // 控制增值服务隐藏
    };
  },
  created() {
    this.getGoodsTypeList();

  },
  methods: {
    // 弹出窗
    prompt(title) {
      this.$notify.error({
        title: "错误",
        message: title,
        duration: 2000
      });
    },
    landStartLevel1Change() {
      this.setlandStartLevel2Data(this.landStartLevel1);
      // this.setlandStartLevel2Placeholder(this.landStartLevel1);
      this.landStartLevel2 = "";
      this.landStartLevel3ProductType1 = false;
      this.landStartLevel3ProductType2 = false;
      this.saveStartLandCarriageSales = this.productSearchResult.landStart.landCarriageSales[
        this.landStartLevel1
      ];
      // 每次变化的时候。重置服务项为false
      this.landStartGeneral = false
      this.landStart1Ton = false
      this.landStart2Ton = false
      this.landStart3Ton = false
      // console.log(this.saveStartLandCarriageSales);
    },
    landStartLevel2Change() {
      // console.log("landStartLevel2Change", this.landStartLevel2);
      if (this.landStartLevel2 == 1) {
        // 专车配送
        this.landStartLevel3ProductType1 = true;
        this.landStartLevel3ProductType2 = false;
        this.selectServer.landStartGeneral = false;
      } else if (this.landStartLevel2 == 2) {
        // 一般配送
        this.landStartLevel3ProductType1 = false;
        this.landStartLevel3ProductType2 = true;
        this.selectServer.landStartGeneral = true;
      }
      // 调用计算价格的函数
      this.getLandStartPrice(
        this.saveStartLandCarriageSales,
        this.landStartLevel2
      );
      // console.log(this.selectServer.landStartPrice,this.landStartLevel2);
    },
    landEndLevel1Change() {
      this.setlandEndLevel2Data(this.landEndLevel1);
      // this.setlandEndLevel2Placeholder(this.landEndLevel1);
      this.landEndLevel2 = "";
      this.landEndLevel3ProductType1 = false;
      this.landEndLevel3ProductType2 = false;
      this.saveEndLandCarriageSales = this.productSearchResult.landEnd.landCarriageSales[
        this.landEndLevel1
      ];
      // console.log(this.saveEndLandCarriageSales);
      // 每次变化的时候。重置服务项为false
      this.landEndGeneral = false
      this.landEnd1Ton = false
      this.landEnd2Ton = false
      this.landEnd3Ton = false
    },
    landEndLevel2Change() {
      // console.log("landEndLevel2Change", this.landEndLevel2);
      if (this.landEndLevel2 == 1) {
        // 专车配送
        this.landEndLevel3ProductType1 = true;
        this.landEndLevel3ProductType2 = false;
        this.selectServer.landEndGeneral = false;
      } else if (this.landEndLevel2 == 2) {
        // 一般配送
        this.landEndLevel3ProductType1 = false;
        this.landEndLevel3ProductType2 = true;
        this.selectServer.landEndGeneral = true;
      }
      // 调用计算价格的函数
      this.getLandEndPrice(this.saveEndLandCarriageSales, this.landEndLevel2);
      // console.log(this.selectServer.landEndPrice,this.landEndLevel2);
    },
    setlandStartLevel2Data(index) {
      this.landStartLevel2Data = [];
      var resultArr = this.productSearchResult.landStart.landCarriageSales[
        index
      ].landProductTypeDTOS;
      resultArr.forEach((ele, index) => {
        if (ele.productType == 1) {
          this.landStartLevel2Data.push({
            value: ele.productType,
            label: "专车配送"
          });
        } else if (ele.productType == 2) {
          this.landStartLevel2Data.push({
            value: ele.productType,
            label: "一般配送"
          });
        }
      });
    },
    setlandEndLevel2Data(index) {
      this.landEndLevel2Data = [];
      var resultArr = this.productSearchResult.landEnd.landCarriageSales[index]
        .landProductTypeDTOS;
      resultArr.forEach((ele, index) => {
        if (ele.productType == 1) {
          this.landEndLevel2Data.push({
            value: ele.productType,
            label: "专车配送"
          });
        } else if (ele.productType == 2) {
          this.landEndLevel2Data.push({
            value: ele.productType,
            label: "一般配送"
          });
        }
      });
    },
    toggleLandStartServer(type) {
      var arr = [
        "landStartGeneral",
        "landStart1Ton",
        "landStart2Ton",
        "landStart3Ton"
      ];
      for (var i = 0; i < arr.length; i++) {
        this.selectServer[arr[i]] = false;
      }
      this.selectServer[type] = true;
    },
    toggleLandEndServer(type) {
      var arr = ["landEndGeneral", "landEnd1Ton", "landEnd2Ton", "landEnd3Ton"];
      for (var i = 0; i < arr.length; i++) {
        this.selectServer[arr[i]] = false;
      }
      this.selectServer[type] = true;
    },
    toggleSelect(type) {
      this.selectServer[type] = !this.selectServer[type];
    },
    startportvalue(data) {
      this.searchData.startPort = data;
    },
    endportvalue(data) {
      this.searchData.endPort = data;
    },
    getGoodsTypeList() {
      this.goodsTypesList = [];
      this.axios
        .post("/app/v1/common/queryDict", { dataType: 2 })
        .then(data => {
          // console.log(data.data.data.detailDTOS);
          this.goodsTypesList = data.data.data.detailDTOS;
        });
    },
    productSearch() {
      // console.log(this.searchData);
      this.axios
        .post("/app/v1/product/queryProduct", {
          airportEnd: this.searchData.endPort,
          airportStart: this.searchData.startPort,
          flightDate: this.formatPlaneData,
          goodsType: this.searchData.goodsType,
          hourEnd: this.searchData.planeTime[1],
          hourStart: this.searchData.planeTime[0],
          weight: this.searchData.goodsWeight
        })
        .then(data => {
          console.log(data);
          this.productSearchResult = {};
          if (data.data.code == 1) {
            this.selectServer.flightRecordId = data.data.data.flightRecordId
            Object.assign(this.productSearchResult, data.data.data);
            // this.productSearchResult =  data.data.data
            this.getResultSuccess = true;
            this.searchNone = false;
            this.searchShow = true;
            // 这里初始化一下二级选择项
            if (this.productSearchResult.landStart) {
              this.setlandStartLevel2Data(0);
            }
            if (this.productSearchResult.landEnd) {
              this.setlandEndLevel2Data(0);
            }
            // 查询成功 ， 就可以提交
            this.controlSubimt = true;
          } else {
            // console.log(data);
            this.prompt(data.data.msg);
            this.getResultSuccess = false;
            this.searchShow = false;
            this.searchNone = true;
          }
        })
        .catch(data => {
          // console.log('失败',data);
          this.prompt("请求失败");
          if (data.status) {
            this.getResultSuccess = false;
            this.searchShow = false;
            this.searchNone = true;
          }
        });
    },
    productConfirm() {
      // 点击前重置
      this.selectServer.airportProductIds = []
      this.selectServer.landCarriageProductIds = []
      // 这里提交前判断所选择的服务，然后把id复制给data里边的对应项，然后把data储存在浏览器中
      // 判断是否有航空运输服务
      this.selectServer.airfreightProductId = this.productSearchResult.airfreightDTO.id;
      // 判断是否有始发港交货
      if (this.selectServer.airportStart) {
        // this.airportProductIds
        let idArr = this.productSearchResult.airportStart.priceDTOS;
        idArr.forEach(ele => {
          this.selectServer.airportProductIds.push(ele.id);
        });
      }
      // 判断是否有目的港提货
      if (this.selectServer.airportEnd) {
        let idArr = this.productSearchResult.airportEnd.priceDTOS;
        idArr.forEach(ele => {
          this.selectServer.airportProductIds.push(ele.id);
        });
      }
      // 判断是否上门取货服务
      if (this.selectServer.landStart) {
        let idArr = this.productSearchResult.landStart.landCarriageSales[this.landStartLevel1].landProductTypeDTOS;
        // 上门取货服务中的具体服务
        // 一般配送
        if (this.selectServer.landStartGeneral) {
          idArr.forEach(ele => {
            if (ele.productType == 2) {
              this.selectServer.landCarriageProductIds.push({
                priceId: ele.list[0].id,
                productId: ele.id
              });
            }
          });
        }
        // 1吨金杯车
        if (this.selectServer.landStart1Ton) {
          // let idArr = this.productSearchResult.landStart.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "1吨金杯车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
        // 2吨厢式货车
        if (this.selectServer.landStart2Ton) {
          // let idArr = this.productSearchResult.landStart.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "2吨厢式货车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
        // 3吨厢式货车
        if (this.selectServer.landStart3Ton) {
          // let idArr = this.productSearchResult.landStart.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "3吨厢式货车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
      }
      // 判断是否落地配送
      if (this.selectServer.landEnd) {
        let idArr = this.productSearchResult.landEnd.landCarriageSales[this.landEndLevel1].landProductTypeDTOS;
        //  落地配送服务中的具体服务
        // 一般配送
        if (this.selectServer.landEndGeneral) {
          idArr.forEach(ele => {
            if (ele.productType == 2) {
              this.selectServer.landCarriageProductIds.push({
                priceId: ele.list[0].id,
                productId: ele.id
              });
            }
          });
        }
        // 1吨金杯车
        if (this.selectServer.landEnd1Ton) {
          // let idArr = this.productSearchResult.landEnd.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "1吨金杯车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
        // 2吨厢式货车
        if (this.selectServer.landEnd2Ton) {
          // let idArr = this.productSearchResult.landEnd.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "2吨厢式货车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
        // 3吨厢式货车
        if (this.selectServer.landEnd3Ton) {
          // let idArr = this.productSearchResult.landEnd.landCarriageSales.landProductTypeDTOS;
          let newObj = {};
          idArr.forEach(ele => {
            if (ele.productType == 1) {
              newObj["productId"] = ele.id;
              ele.list.forEach(e => {
                if (e.name == "3吨厢式货车") {
                  newObj["priceId"] = e.id;
                }
              });
            }
          });
          this.selectServer.landCarriageProductIds.push(newObj);
        }
      }

      // 收集数据， 传到下一步
      var transObj = {
        searchData:this.searchData,
        selectServer:this.selectServer,
        FeeInfo:{
          airTransFee:this.airTransFee,
          airOilAnnexFee:this.airOilAnnexFee,
          airportStartFee:this.airportStartFee,
          airportEndFee:this.airportEndFee,
          landStartGetGoodsFee:this.landStartGetGoodsFee,
          landEndTranFee:this.landEndTranFee,
          totalFee:this.totalFee
        }
      }
      window.localStorage.setItem('productIndex',JSON.stringify(transObj))
      if(this.controlSubimt){
        this.$router.push({
          path: "/center/Online_product/write",
          query: {
            step: 2
          }
        });
      }
      // console.log(1, this.selectServer.airfreightProductId);
      // console.log(2, this.selectServer.airportProductIds);
      // console.log(3, this.selectServer.landCarriageProductIds);
    },
    getLandStartPrice(obj, serverType) {
      // 获取对象中的landProductTypeDTOS
      var landProductTypeDTOS = obj.landProductTypeDTOS;
      landProductTypeDTOS.forEach((ele, index) => {
        // console.log('ele',ele.productType);
        if (serverType == 1) {
          if (ele.productType == 1) {
            let priceList = ele.list;
            priceList.forEach(e => {
              if (e.name == "1吨金杯车") {
                this.selectServer.landStartPrice.car1DonPrice = e.price;
              } else if (e.name == "2吨厢式货车") {
                this.selectServer.landStartPrice.car2DonPrice = e.price;
              } else if (e.name == "3吨厢式货车") {
                this.selectServer.landStartPrice.car3DonPrice = e.price;
              }
            });
          }
        } else if (serverType == 2) {
          if (ele.productType == 2) {
            let priceList = ele.list[0];
            this.selectServer.landStartPrice.price = priceList.price;
            this.selectServer.landStartPrice.minPrice = priceList.minPrice;
          }
        }
      });
    },
    getLandEndPrice(obj, serverType) {
      // 获取对象中的landProductTypeDTOS
      var landProductTypeDTOS = obj.landProductTypeDTOS;
      landProductTypeDTOS.forEach((ele, index) => {
        // console.log('ele',ele.productType);
        if (serverType == 1) {
          if (ele.productType == 1) {
            let priceList = ele.list;
            priceList.forEach(e => {
              if (e.name == "1吨金杯车") {
                this.selectServer.landEndPrice.car1DonPrice = e.price;
              } else if (e.name == "2吨厢式货车") {
                this.selectServer.landEndPrice.car2DonPrice = e.price;
              } else if (e.name == "3吨厢式货车") {
                this.selectServer.landEndPrice.car3DonPrice = e.price;
              }
            });
          }
        } else if (serverType == 2) {
          if (ele.productType == 2) {
            let priceList = ele.list[0];
            this.selectServer.landEndPrice.price = priceList.price;
            this.selectServer.landEndPrice.minPrice = priceList.minPrice;
          }
        }
      });
    }
  },
  computed: {
    formatPlaneData(){
      var newDate = this.searchData.planeData
      var year = newDate.getFullYear()
      var month = (newDate.getMonth()+1)<10?`0${newDate.getMonth()+1}`:newDate.getMonth()+1
      var date = newDate.getDate()<10?`0${newDate.getDate()}`:newDate.getDate()
      return `${year}-${month}-${date}`
    },
    landStartLevel1Data() {
      var arr = [];
      var resultArr = this.productSearchResult.landStart.landCarriageSales;
      resultArr.forEach((ele, index) => {
        arr.push({
          value: index,
          label: ele.city + "/" + ele.cityArea
        });
      });
      return arr;
    },
    landEndLevel1Data() {
      var arr = [];
      var resultArr = this.productSearchResult.landEnd.landCarriageSales;
      resultArr.forEach((ele, index) => {
        arr.push({
          value: index,
          label: ele.city + "/" + ele.cityArea
        });
      });
      return arr;
    },
    // 计算配送费的显示价格
    getLandStartCarPrice() {
      if (this.selectServer.landStart1Ton) {
        return this.selectServer.landStartPrice.car1DonPrice;
      } else if (this.selectServer.landStart2Ton) {
        return this.selectServer.landStartPrice.car2DonPrice;
      } else if (this.selectServer.landStart3Ton) {
        return this.selectServer.landStartPrice.car3DonPrice;
      }
    },
    getLandEndCarPrice() {
      if (this.selectServer.landEnd1Ton) {
        return this.selectServer.landEndPrice.car1DonPrice;
      } else if (this.selectServer.landEnd2Ton) {
        return this.selectServer.landEndPrice.car2DonPrice;
      } else if (this.selectServer.landEnd3Ton) {
        return this.selectServer.landEndPrice.car3DonPrice;
      }
    },

    // 计算右侧费用
    // 航空运费
    airTransFee() {
      if (this.getResultSuccess) {
        let totalUnivalent = this.productSearchResult.airfreightDTO.airfreightCharge;
        let totalWeight = parseFloat(this.searchData.goodsWeight);
        return parseFloat(totalUnivalent).mul(totalWeight);
      } else {
        return 0;
      }
    },
    // 燃油附加费
    airOilAnnexFee() {
      if (this.getResultSuccess) {
        let totalUnivalent = this.productSearchResult.airfreightDTO.fuelCharge;
        let totalWeight = parseFloat(this.searchData.goodsWeight);
        return parseFloat(totalUnivalent).mul(totalWeight);
      } else {
        return 0;
      }
    },

    // 始发港交货费
    // 这里要用number.js里边的封装的函数 。精确浮点数
    airportStartFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.airportStart) {
          let priceDTOS = this.productSearchResult.airportStart.priceDTOS;
          let totalUnivalent = 0;
          let totalWeight =parseFloat(this.searchData.goodsWeight);
          let arr = [];
          let fixPay = 0
          priceDTOS.forEach(ele => {
            if(ele.priceType == 12){
              fixPay = fixPay.add(parseFloat(ele.price))
            }else if(ele.priceType == 11){
              if (ele.minPrice < parseFloat(ele.price).mul(totalWeight)) {
                arr.push(parseFloat(ele.price).mul(totalWeight));
              } else {
                arr.push(ele.minPrice);
              }
            }
          });
          for (let i = 0; i < arr.length; i++) {
            totalUnivalent =totalUnivalent.add(parseFloat(arr[i]));
          }
          return parseFloat(totalUnivalent).add(parseFloat(fixPay))
        }
      } else {
        return 0;
      }
    },
    // 目的港提货费
    // 这里要用number.js里边的封装的函数 。精确浮点数
    airportEndFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.airportEnd) {
          let priceDTOS = this.productSearchResult.airportEnd.priceDTOS;
          let totalUnivalent = 0;
          let totalWeight = parseFloat(this.searchData.goodsWeight);
          let arr = [];
          let fixPay = 0
          priceDTOS.forEach(ele => {
            if(ele.priceType == 12){
              fixPay = fixPay.add(parseFloat(ele.price))
            }else if(ele.priceType == 11){
              if (ele.minPrice < parseFloat(ele.price).mul(totalWeight)) {
                arr.push(parseFloat(ele.price).mul(totalWeight));
              } else {
                arr.push(ele.minPrice);
              }
            }
          });
          for (let i = 0; i < arr.length; i++) {
            totalUnivalent =totalUnivalent.add(parseFloat(arr[i]));
          }
          return parseFloat(totalUnivalent).add(parseFloat(fixPay))
        }
      } else {
        return 0;
      }
    },

    /*landStartServerFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.airportStart) {
          let priceDTOS = this.productSearchResult.airportStart.priceDTOS;
          let totalUnivalent = null;
          priceDTOS.forEach(ele => {
            if (ele.priceType == 11) {
              totalUnivalent = ele.price;
            }
          });
          let totalWeight = this.searchData.goodsWeight;
          return totalUnivalent * totalWeight;
        }
      } else {
        return 0;
      }
    },
    // 制单代理费
    landStartMakeBillFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.airportStart) {
          let priceDTOS = this.productSearchResult.airportStart.priceDTOS;
          let totalUnivalent = null;
          priceDTOS.forEach(ele => {
            if (ele.priceType == 12) {
              totalUnivalent = ele.price;
            }
          });
          let totalWeight = this.searchData.goodsWeight;
          return totalUnivalent * totalWeight;
        }
      } else {
        return 0;
      }
    },
    // 进港提货费
    landEndGetGoodsFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.airportEnd) {
          let priceDTOS = this.productSearchResult.airportEnd.priceDTOS;
          let totalUnivalent = null;
          priceDTOS.forEach(ele => {
            if (ele.priceType == 11) {
              totalUnivalent = ele.price;
            }
          });
          let totalWeight = this.searchData.goodsWeight;
          return totalUnivalent * totalWeight;
        }
      } else {
        return 0;
      }
    },*/
    // 上门提货费
    landStartGetGoodsFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.landStart) {
          var totalWeight = this.searchData.goodsWeight;
          var minPrice = this.selectServer.landStartPrice.minPrice;
          var totalFee = null;
          if (this.selectServer.landStartGeneral) {
            var priceDTOS = this.selectServer.landStartPrice.price;
            totalFee = totalWeight * priceDTOS;
            if (totalFee > minPrice) {
              return totalFee;
            } else {
              return minPrice;
            }
          } else if (this.selectServer.landStart1Ton) {
            return this.selectServer.landStartPrice.car1DonPrice;
          } else if (this.selectServer.landStart2Ton) {
            return this.selectServer.landStartPrice.car2DonPrice;
          } else if (this.selectServer.landStart3Ton) {
            return this.selectServer.landStartPrice.car3DonPrice;
          }
        }
      } else {
        return 0;
      }
    },
    // 落地配送费
    landEndTranFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.landEnd) {
          var totalWeight = this.searchData.goodsWeight;
          var minPrice = this.selectServer.landEndPrice.minPrice;
          var totalFee = null;
          if (this.selectServer.landEndGeneral) {
            var priceDTOS = this.selectServer.landEndPrice.price;
            totalFee = totalWeight * priceDTOS;
            if (totalFee > minPrice) {
              return totalFee;
            } else {
              return minPrice;
            }
          } else if (this.selectServer.landEnd1Ton) {
            return this.selectServer.landEndPrice.car1DonPrice;
          } else if (this.selectServer.landEnd2Ton) {
            return this.selectServer.landEndPrice.car2DonPrice;
          } else if (this.selectServer.landEnd3Ton) {
            return this.selectServer.landEndPrice.car3DonPrice;
          }
        }
      } else {
        return 0;
      }
    },
    // 总费用
    totalFee() {
      // console.log(this.airTransFee,this.airOilAnnexFee,this.landStartServerFee,this.landStartMakeBillFee,this.landEndGetGoodsFee,this.landStartGetGoodsFee,this.landEndTranFee);
      var airTransFee = this.airTransFee == undefined ? 0 : parseFloat(this.airTransFee);
      var airOilAnnexFee =this.airOilAnnexFee == undefined ? 0 : parseFloat(this.airOilAnnexFee);
      var airportStartFee =this.airportStartFee == undefined? 0: parseFloat(this.airportStartFee);
      var airportEndFee =this.airportEndFee == undefined? 0: parseFloat(this.airportEndFee);

      var landStartGetGoodsFee =this.landStartGetGoodsFee == undefined? 0: parseFloat(this.landStartGetGoodsFee);
      var landEndTranFee = this.landEndTranFee == undefined ? 0 : parseFloat(this.landEndTranFee);
      return (
        airTransFee +
        airOilAnnexFee +
        airportStartFee +
        airportEndFee +
        landStartGetGoodsFee +
        landEndTranFee
      );
    }
  }
};
</script>

<style lang="scss">
.m-product-container {
  color: rgba(153, 153, 153, 1);
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  .product-container-left {
    width: 900px;
    display: flex;
    flex-direction: column;
    .container-left-selection {
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .selection-inner {
        background: #fff;
        box-shadow: 0 0 15px #ccc;
        width: 860px;
        height: 150px;
        display: flex;
        flex-direction: row;
        .selection-inner-left {
          width: 700px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          #left-list1 {
            margin-top: 10px;
            position: relative;
            width: 700px;
            .left-list-selection {
              width: 250px;
              // transform: scale(0.9);
              margin-left: -20px;
              .el-select {
                width: 250px;
                input {
                  padding: 0;
                }
              }
            }
            .dist-range {
              width: 30px;
              position: absolute;
              top: 14px;
              left: 429px;
              z-index: 10000;
            }
            .dist-list1 {
              margin-left: -70px;
            }
            .dist-list2 {
              margin-left: -100px;
            }
          }
          #left-list2 {
            width: 600px;
            .left-list-selection {
              width: 410px;
              .block {
                display: flex;
                .el-date-editor {
                  .el-input__icon {
                    display: none;
                  }
                }
              }
            }
          }
          // *{
          //   border:none!important;
          // }
          .inner-left-list {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            box-shadow: -1px 1px 1px rgba(222, 222, 222, 0.5);
            .left-list-name {
              width: 104px;
              display: inline-block;
              text-align-last: justify;
              margin-left: 30px;
              font-size: 15px;
            }
          }
          #product-type-selection {
            margin-bottom: 10px;
            display: felx;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 600px;
            .left-list-name {
              width: 104px;
              display: inline-block;
              text-align-last: justify;
              margin-left: 30px;
            }
            .left-list-selection {
              width: 104px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              .left-input {
                width: 100px;
                margin-left: -30px;
              }
              .left-list-weight {
              }
            }
            #left-list3 {
              width: 200px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              .left-list-type {
                width: 130px;
                margin-left: 30px;
              }
            }
          }
        }
        .selection-inner-right {
          flex: 1;
          display: flex;
          .inner-right-btn {
            width: 100px;
            height: 30px;
            background: rgba(252, 207, 0, 1);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 3px;
            margin-top: 100px;
            margin-left: 10px;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
          }
          .inner-right-btn:hover {
            background: rgba(252, 207, 0, 0.8);
          }
        }
      }
    }
    .container-left-detail {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 100px;
      .left-detail-inner {
        background: #fff;
        width: 860px;
        margin-top: 10px;
        box-shadow: 0 0 15px #ccc;

        .product-server {
          background: #fff;
          padding: 10px 15px;
          .server-nav-title {
            width: 100%;
            // height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .title-text {
              width: 110px;
              text-indent: 30px;
            }
            .title-line {
              flex: 1;
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-bottom: none;
              margin-right: 30px;
            }
          }

          .server-nav-select {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
            margin: 5px 0;
            padding-bottom: 10px;
            .detail-logo {
              width: 70px;
              display: flex;
              justify-content: center;
            }
            .nav-select-text {
              width: 80px;
              display: inline-block;
              text-align-last: justify;
            }
            .nav-select-detail {
              display: flex;
              width: 190px;
              flex-direction: column;
              height: 100%;
              justify-content: space-around;
              -webkit-text-size-adjust: none;
              .detail-list1 {
                // margin-bottom: -25px;
              }
              .detail-list3 {
                width: 300px;
                transform: scale(0.8);
                margin-left: -70px;
              }
              .detail-list4 {
                margin-bottom: -55px;
              }
              .detail-list {
                display: flex;
                .detail-name {
                  width: 80px;
                  display: inline-block;
                  text-align-last: justify;
                }
                .detail-cost {
                  color: rgba(252, 207, 0, 1);
                  margin-left: 10px;
                }
              }
            }
            .detail-btn-box {
              width: 190px;
              .detail-address {
                height: 110px;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                -webkit-text-size-adjust: none;
                .address-little {
                  width: 350px;
                  transform: scale(0.8);
                  text-indent: 20px;
                  display: flex;
                  justify-content: space-around;
                  .address-btn {
                    padding: 2px 12px 2px 0px;
                    height: 20px;
                    color: rgba(252, 207, 0, 1);
                    border: 1px solid rgba(252, 207, 0, 1);
                    border-radius: 3px;
                    cursor: pointer;
                    display: inline-block;
                  }
                  .btn-active {
                    background: rgba(252, 207, 0, 1);
                    color: #fff;
                  }
                }
              }
              .inner-right-btn {
                width: 100px;
                height: 30px;
                background: rgba(252, 207, 0, 1);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: 3px;
                box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
              }
              .inner-right-btn:hover {
                background: rgba(252, 207, 0, 0.8);
              }
            }
            .detail-img {
              font-size: 30px;
              margin-right: 20px;
              cursor: pointer;
              &.active {
                color: #8cc63f;
              }
            }
          }
          .server-nav {
            width: 100%;
            height: 130px;
            display: flex;
            flex-direction: column;
            .select-little {
              height: 80px;
              position: relative;
            }
          }
          .server-more {
            width: 100%;
            display: flex;
            flex-direction: column;
            .select-big {
              height: 130px;
              .detail-address {
                .address-info {
                  .el-select {
                    .el-input {
                      border-bottom: 1px solid #e0e0e0;
                      input {
                        border: none;
                      }
                    }
                  }
                }
              }
            }
            .select-little {
              height: 80px;
              position: relative;
            }
          }
        }
      }
      .left-detail-none {
        background: #fff;
        width: 860px;
        margin-top: 10px;
        box-shadow: 0 0 15px #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    }
  }
  .product-container-right {
    background: #fff;
    box-shadow: 0 0 15px #ccc;
    position: relative;
    margin-top: 50px;
    padding: 0 40px;
    height: 500px;
    width: 220px;
    .right-nav {
      height: 50px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right-content {
      // min-height: 310px;
      .right-content-nav {
        // height: 60px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        &.box1{
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 20px;
        }
        .right-content-cost {
          margin: 6px 0;
          width: 200px;
          display: flex;
          justify-content: space-between;
          .cost-text {
            width: 80px;
            text-align-last: justify;
          }
        }
      }
      .right-content-free {
        height: 70px;
        display: flex;
        // justify-content: space-around;
        align-items: center;
        .cost-free {
          width: 80px;
          margin-left: 10px;
          display: inline-block;
          text-align-last: justify;
        }
        .cost-number{
          flex: 1;
          text-align: right;
          padding-right: 10px;
        }
      }
      .right-content-total {
        height: 40px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        border-top: 1px dotted #e0e0e0;
        font-size: 16px;
        font-weight: 700;
        .total-nav {
          width: 80px;
          margin-left: 30px;
          display: inline-block;
          text-align-last: justify;
        }
        .total-content {
          width: 80px;
          color: #FCD832;
        }
      }
    }
    .wave{
      position: absolute;
      bottom: -15px;
      left:0;
      width: 300px;
      height: 15px;
      background: linear-gradient(45deg,#F9F9F9 0%,#F9F9F9 50%,#fff 50%,#fff 100%);
      background-size: 15px 15px;
    }
    .confirm {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: -70px;
      left: 0;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      background: rgba(245, 39, 39, 1);
      color: #fff;
      cursor: pointer;
      border-radius: 3px;
      &:hover {
        background: rgba(245, 39, 39, 0.9);
      }
    }
  }
}
</style>
<style lang='scss'>
.m-li-product-write-container {
  .left-list-selection {
    * {
      border: none;
    }
    *:focus {
      border: none;
    }
    select {
      border: none;
      option {
        border: none;
      }
    }
    select:focus {
      border: none;
    }
    input {
      border: none;
    }
  }
  #left-list1 {
    width: 600px;
    .left-list-selection {
      width: 180px;
      // transform: scale(0.9);
      select {
        margin-left: -30px;
        width: 170px;
        text-indent: 40px;
      }
    }
  }
  input,
  select,
  button,
  textarea {
    outline: none;
  }
}
</style>
