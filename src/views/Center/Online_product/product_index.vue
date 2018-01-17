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
                  <div class="detail-list2 detail-list" v-if="productSearchResult.airfreightDTO.fuelCharge != 0"><span class="detail-name">燃油附加费</span><span class="detail-cost">{{productSearchResult.airfreightDTO.fuelCharge}}元/千克</span></div>
                </div>
                <!-- 运价申请模态框 -->
                <div class="trans-price-apply-model">
                  <el-dialog top='200px' width='800px' :visible.sync="transPriceApplyModel">
                    <div slot="title"><span class="el-icon-service"></span>运价申请</div>
                    <div class="body">
                      <div class="top">
                        <div v-if="false">
                          <div class="key">申请编号：</div>
                          <div class="value red">SQ986878584828</div>
                        </div>
                        <div>
                          <div class="key">会员名称：</div>
                          <div class="value">{{userInfo.fullName}}</div>
                        </div>
                        <div>
                          <div class="key" v-if="'level' in userInfo">会员编号：</div>
                          <div class="value">{{userInfo.level.memberNo}}</div>
                        </div>
                        <div>
                          <div class="key">运输路线：</div>
                          <div class="value">{{searchData.startPort}}-{{searchData.endPort}}</div>
                        </div>
                        <div>
                          <div class="key">货物重量：</div>
                          <div class="value">{{searchData.goodsWeight}}千克</div>
                        </div>
                        <div>
                          <div class="key">货物类型：</div>
                          <div class="value">{{transGoodsType}}</div>
                        </div>
                        <div>
                          <div class="key">起飞时间：</div>
                          <div class="value">{{formatPlaneData}} {{searchData.planeTime[0]}}-{{searchData.planeTime[1]}}</div>
                        </div>
                      </div>
                      <div class="bottom">
                        <div class="key">申请运价</div>
                        <div class="value"><el-input size="mini" v-model="applyPrice" placeholder="请输入理想运价"></el-input></div>
                        <div class="unit">元/千克</div>
                      </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                      <el-button type="warning" size="mini" @click="applyPriceBtn">立即申请</el-button>
                    </div>
                  </el-dialog>
                </div>
                <div class="detail-btn-box"><span @click="priceApply" class="inner-right-btn">运价申请</span></div>
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
                    <div class="detail-list1 detail-list"><span class="detail-name">地面运输费</span><span class="detail-cost">{{selectServer.saveLandStartServerData.price}}元/千克</span></div>
                    <div class="detail-list2 detail-list"><span class="detail-name">最低收费</span><span class="detail-cost">{{selectServer.saveLandStartServerData.minPrice}}元/单</span></div>
                  </template>
                  <template v-if="!selectServer.landStartGeneral">
                    <div class="detail-list4 detail-list"><span class="detail-name">配送费</span><span class="detail-cost">{{selectServer.saveLandStartServerData.price}}元/辆</span></div>
                    <div class="detail-list3 detail-list">1吨金杯车：小于1000千克/1.8*1.3*1.1/5立方米</div>
                  </template>
                </div>
                <div class="detail-btn-box">
                  <div class="detail-address">
                    <div class="address-info">
                      <el-select @visible-change='(toggle)=>landStartLevel1Change(toggle)' v-model="landStartLevel1" placeholder="请选择地区">
                        <el-option
                          v-for="item in landStartLevel1Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="address-info">
                      <el-select @visible-change='(toggle)=>landStartLevel2Change(toggle)' v-model="landStartLevel2" placeholder="请选择服务">
                        <el-option
                          v-for="item in landStartLevel2Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <!-- <span class="address-little" v-if="landStartLevel3ProductType2">实际落地时间在24:00之前的航班，次日到达</span> -->
                    <div class="address-little" v-if="landStartLevel3ProductType1">
                      <div v-for="(item,index) in selectServer.saveLandStartCarType"
                           :key="index" class="address-btn"
                           @click="toggleLandStartServer(item,index)"
                           :class="selectServer.landStartIndex == index?'btn-active':''">
                           {{item.name}}
                      </div>
                      <!-- <div class="address-btn" @click="toggleLandStartServer('landStart2Ton')" :class="selectServer.landStart2Ton?'btn-active':''">2吨厢式货车</div>
                      <div class="address-btn" @click="toggleLandStartServer('landStart3Ton')" :class="selectServer.landStart3Ton?'btn-active':''">3吨厢式货车</div> -->
                    </div>
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
                    <div class="detail-list1 detail-list"><span class="detail-name">地面运输费</span><span class="detail-cost">{{selectServer.saveLandEndServerData.price}}元/千克</span></div>
                    <div class="detail-list2 detail-list"><span class="detail-name">最低收费</span><span class="detail-cost">{{selectServer.saveLandEndServerData.minPrice}}元/单</span></div>
                  </template>
                  <template v-if="!selectServer.landEndGeneral">
                    <div class="detail-list4 detail-list"><span class="detail-name">配送费</span><span class="detail-cost">{{selectServer.saveLandEndServerData.price}}元/辆</span></div>
                    <div class="detail-list3 detail-list">1吨金杯车：小于1000千克/1.8*1.3*1.1/5立方米</div>
                  </template>
                </div>
                <div class="detail-btn-box">
                  <div class="detail-address">
                    <div class="address-info">
                      <el-select @visible-change='(toggle)=>landEndLevel1Change(toggle)' v-model="landEndLevel1" placeholder="请选择地区">
                        <el-option
                          v-for="item in landEndLevel1Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="address-info">
                      <el-select @visible-change='(toggle)=>landEndLevel2Change(toggle)' v-model="landEndLevel2" placeholder="请选择服务">
                        <el-option
                          v-for="item in landEndLevel2Data"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <!-- <span class="address-little" v-if="landEndLevel3ProductType2">实际落地时间在24:00之前的航班，次日到达</span> -->
                    <div class="address-little" v-if="landEndLevel3ProductType1">
                      <div class="address-btn"
                           v-for="(item,index) in selectServer.saveLandEndCarType"
                           :key="index"
                           @click="toggleLandEndServer(item,index)"
                           :class="selectServer.landEndIndex == index?'btn-active':''">{{item.name}}</div>
                      <!-- <div class="address-btn" @click="toggleLandEndServer('landEnd2Ton')" :class="selectServer.landEnd2Ton?'btn-active':''">2吨厢式货车</div>
                      <div class="address-btn" @click="toggleLandEndServer('landEnd3Ton')" :class="selectServer.landEnd3Ton?'btn-active':''">3吨厢式货车</div> -->
                    </div>
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
          <div class="none-text">
            <div class="pic"><img src="../../../assets/product20.png" alt=""></div>
            <div class="word">还没有查到任何产品服务......</div>
            </div>
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
          <div class="right-content-cost" v-for="(item,index) in this.selectServer.saveAirportFee.airportStart.priceDTOS" :key="index">
            <span class="cost-text">{{item.name}}</span>
            <span class="cost-number">{{item.priceType=='11'?
                                      (parseFloat(item.price).mul(searchData.goodsWeight)>item.minPrice?parseFloat(item.price).mul(searchData.goodsWeight):item.minPrice):
                                      (item.price)}}元
            </span>
          </div>
        </div>
        <div class="right-content-nav" v-if="selectServer.airportEnd && airportEndFee != 0">
          <div class="right-content-cost" v-for="(item,index) in this.selectServer.saveAirportFee.airportEnd.priceDTOS" :key="index">
            <span class="cost-text">{{item.name}}</span>
            <span class="cost-number">{{item.priceType=='11'?
                                      (parseFloat(item.price).mul(searchData.goodsWeight)>item.minPrice?parseFloat(item.price).mul(searchData.goodsWeight):item.minPrice):
                                      (item.price)}}元
            </span>
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
import { mapGetters } from "vuex";
// import productSelect from "./product_select";
export default {
  components: {
    // PServer,
    StartPortselect,
    EndPortselect
    // productSelect
  },
  data() {
    return {
      userInfo: {},
      // 运价申请
      applyPrice: "",
      transPriceApplyModel: false,
      searchData: {
        // 搜索条件
        startPort: "",
        endPort: "",
        planeData: new Date(),
        planeTime: ["00:00", "23:59"],
        goodsWeight: "",
        goodsType: 7
      },
      transGoodsType: "普货",   // 用于申请运价框
      //  选择的服务
      judgeTopage:true,//只选择基础服务，就会跳转到带有航空主运单号的和代理人代码的页面，还选择的其他服务 ，就会跳转到不带有航空主运单号的和代理人代码的页面，这个是控制跳转到那个页面的开关
      selectServer: {
        baseServer: true, // 基础服务
        airportStart: false, // 始发港交货
        airportEnd: false, // 目的港提货
        landStart: false, // 上门取货
        landEnd: false, //落地送货
        customs: false, // 报关报检
        insurance: false, // 运输保险
        airfreightProductId: 0, // 航空运输产品ID
        airportProductIds: [], // 始发，目的港提货服务ID
        landCarriageProductIds: [], //上门取货，落地配送 路面运输产品ID列表,
        flightRecordId: "",
        landStartGeneral: false, // 上门取货服务类一般服务
        landStart1Ton: false, // 上门取货服务类一吨金杯车
        landStart2Ton: false, // 上门取货服务类2吨厢式车
        landStart3Ton: false, // 上门取货服务类3吨厢式车
        landStartIndex: "0", // 标记添加class - acitve,默认第一个被选中
        landStartPrice: {
          // 上门取货服务费
          price: "", // 价格
          minPrice: "", //最低价格
          car1DonPrice: "", // 上门取货专车费
          car2DonPrice: "", // 上门取货专车费
          car3DonPrice: "" // 上门取货专车费
        },
        landEndGeneral: false, // 落地配送服务类一般服务
        landEnd1Ton: false, // 落地配送服务类一吨金杯车
        landEnd2Ton: false, // 落地配送服务类2吨厢式车
        landEnd3Ton: false, // 落地配送服务类3吨厢式车
        landEndIndex: "0", // 标记添加class - acitve，默认第一个被选中
        landEndPrice: {
          // 落地配送上门取货服务费
          price: "", // 落地配送价格
          minPrice: "", //落地配送最低价格
          car1DonPrice: "", // 落地配送上门取货专车费
          car2DonPrice: "", // 落地配送上门取货专车费
          car3DonPrice: "" // 落地配送上门取货专车费
        },
        saveAirportFee: {}, //储存始发港目的港服务内容以及收费
        saveBaseServerData: {}, //储存基础服务内容以及收费情况
        saveLandStartServerData: {}, //储存选择上门取货的服务内容
        saveLandEndServerData: {}, //储存选择落地配送的服务内容
        saveLandStartCarType: [], // 储存选择二级标签专车服务后，专车类型的list
        saveLandEndCarType: [] // 储存选择二级标签专车服务后，专车类型的list
      },
      landStartLevel1: "", // 上门取货一级选择value，为index
      landEndLevel1: "", // 落地配送一级选择value,为index
      landStartLevel2Data: [], // 上门取货二级选择data
      landStartLevel2: "", // 上门取货二级选择value，为productType
      landEndLevel2: "", // 落地配送二级选择value，为productType
      landEndLevel2Data: [], // 落地配送二级选择data
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

      controlLandStartServer: false, //控制上门取货服务是否可以勾选，当选择服务后才可以勾选
      controlLandEndServer: false, //控制落地配送服务是否可以勾选，当选择服务后才可以勾选
      controlSubimt: false, // 控制提交按钮的提交
      ControlIncreaseInValueServer: false // 控制增值服务隐藏
    };
  },
  created() {
    this.getGoodsTypeList();
    this.getAccountInfo();
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
    priceApply() {
      this.transPriceApplyModel = true;
    },
    applyPriceBtn() {
      if(this.applyPrice == ''){
        this.$message({
          message: '申请的运价不能为空',
          type: 'warning'
        });
        return
      }
      this.axios.post("/app/v1/bargaining/saveBargaining", {
        applyAmount: parseFloat(this.applyPrice),
        applyNo: "",
        arrivalTime: this.searchData.planeTime[1],
        cityEnd: this.searchData.endPort,
        cityStart: this.searchData.startPort,
        departureTime: this.searchData.planeTime[0],
        flightTime: this.formatPlaneData,
        goodsType: this.searchData.goodsType,
        goodsWeight: this.searchData.goodsWeight,
        id: this.id,
        originalAmount: this.productSearchResult.airfreightDTO.airfreightCharge,
        token: this.token
      }).then(data=>{
        console.log(data,'运价申请');
        if(data.status == 200){
          this.transPriceApplyModel = false;
        }
      });
    },
    getAccountInfo() {
      this.axios
        .post("/app/v1/user/userInfo", {
          id: this.id,
          token: this.token
        })
        .then(data => {
          console.log(data);
          if (data.data.code == 1) {
            this.userInfo = data.data.data;
          }
        });
    },
    landStartLevel1Change(onoff) {
      if (onoff == false) {
        // 每次点击一级选择的时候重置服务的是否勾选，然后重置controlLandStartServer
        this.controlLandStartServer = false;
        this.selectServer.landStart = false;
        this.setlandStartLevel2Data(this.landStartLevel1);
        // this.setlandStartLevel2Placeholder(this.landStartLevel1);
        this.landStartLevel2 = "";
        this.landStartLevel3ProductType1 = false;
        this.landStartLevel3ProductType2 = false;
        this.saveStartLandCarriageSales = this.productSearchResult.landStart.landCarriageSales[
          this.landStartLevel1
        ];
        // 每次变化的时候。重置服务项为false
        this.selectServer.landStartGeneral = false;
        this.selectServer.landStart1Ton = false;
        this.selectServer.landStart2Ton = false;
        this.selectServer.landStart3Ton = false;
        // console.log(this.saveStartLandCarriageSales);
        // 把储存的选择数据也清空
        this.selectServer.saveLandStartServerData = {};
      }
    },
    landStartLevel2Change(onoff) {
      if (onoff == false) {
        if (this.landStartLevel2 == 1) {
          // 专车配送
          this.landStartLevel3ProductType1 = true;
          this.landStartLevel3ProductType2 = false;
          this.selectServer.landStartGeneral = false;
          this.selectServer.landStart1Ton = true;
          this.selectServer.landStartIndex = "0";
          this.getLandStartCarType(this.saveStartLandCarriageSales);
          this.initLandStartCarPrice(this.saveStartLandCarriageSales);
        } else if (this.landStartLevel2 == 2) {
          // 一般配送
          this.landStartLevel3ProductType1 = false;
          this.landStartLevel3ProductType2 = true;
          this.selectServer.landStartGeneral = true;
          this.selectServer.landStart1Ton = false;
          this.selectServer.landStart2Ton = false;
          this.selectServer.landStart3Ton = false;
          // 调用设置储存服务项的函数
          this.setLandStartGeneralServerData(
            this.saveStartLandCarriageSales,
            this.landStartLevel2
          );
        }
        // 选择二级后，默认勾选服务,然后重置controlLandStartServer
        this.controlLandStartServer = true;
        this.selectServer.landStart = true;

        // console.log(this.selectServer.saveLandStartCarType);
        // console.log(this.saveStartLandCarriageSales,this.landStartLevel2);
      }
    },
    landEndLevel1Change(onoff) {
      if (onoff == false) {
        // 每次点击一级选择的时候重置服务的是否勾选，然后重置controlLandStartServer
        this.controlLandEndServer = false;
        this.selectServer.landEnd = false;
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
        this.selectServer.landEndGeneral = false;
        this.selectServer.landEnd1Ton = false;
        this.selectServer.landEnd2Ton = false;
        this.selectServer.landEnd3Ton = false;
        // 把储存的选择数据也清空
        this.selectServer.saveLandEndServerData = {};
      }
    },
    landEndLevel2Change(onoff) {
      if (onoff == false) {
        // console.log("landEndLevel2Change", this.landEndLevel2);
        if (this.landEndLevel2 == 1) {
          // 专车配送
          this.landEndLevel3ProductType1 = true;
          this.landEndLevel3ProductType2 = false;
          this.selectServer.landEndGeneral = false;
          this.selectServer.landEnd1Ton = true;
          this.selectServer.landEndIndex = "0";
          this.getLandEndCarType(this.saveEndLandCarriageSales);
          this.initLandEndCarPrice(this.saveEndLandCarriageSales);
        } else if (this.landEndLevel2 == 2) {
          // 一般配送
          this.landEndLevel3ProductType1 = false;
          this.landEndLevel3ProductType2 = true;
          this.selectServer.landEndGeneral = true;
          this.selectServer.landEnd1Ton = false;
          this.selectServer.landEnd2Ton = false;
          this.selectServer.landEnd3Ton = false;
          // 调用设置储存服务项的函数
          this.setLandEndGeneralServerData(
            this.saveEndLandCarriageSales,
            this.landEndLevel2
          );
        }
        // 选择二级后，默认勾选服务,然后重置controlLandEndServer
        this.controlLandEndServer = true;
        this.selectServer.landEnd = true;

        // console.log(this.landEndLevel2,this.saveEndLandCarriageSales,this.landEndLevel2);
        // console.log(this.selectServer.saveLandEndCarType);
      }
    },
    getLandStartCarType(data) {
      var serverList = data.landProductTypeDTOS;
      serverList.forEach(ele => {
        if (ele.productType == 1) {
          this.selectServer.saveLandStartCarType = ele.list;
        }
      });
    },
    getLandEndCarType(data) {
      var serverList = data.landProductTypeDTOS;
      serverList.forEach(ele => {
        if (ele.productType == 1) {
          this.selectServer.saveLandEndCarType = ele.list;
        }
      });
    },
    // 当二级标签变化的时候，初始化专车配送的价格，也就是this.selectServer.saveLandStartServerData
    initLandStartCarPrice(item) {
      // console.log(item);
      var serverList = item.landProductTypeDTOS;
      serverList.forEach(ele => {
        if (ele.productType == 1) {
          this.selectServer.saveLandStartServerData = ele.list[0];
        }
      });
    },
    // 当二级标签变化的时候，初始化专车配送的价格，也就是this.selectServer.saveLandStartServerData
    initLandEndCarPrice(item) {
      var serverList = item.landProductTypeDTOS;
      serverList.forEach(ele => {
        if (ele.productType == 1) {
          this.selectServer.saveLandEndServerData = ele.list[0];
        }
      });
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
    toggleLandStartServer(item, index) {
      this.selectServer.landStartIndex = index;
      this.selectServer.saveLandStartServerData = item;
    },
    toggleLandEndServer(item, index) {
      this.selectServer.landEndIndex = index;
      // 如果是专车配送的时候，把一般配送的收费细节存在this.selectServer.saveLandStartServerData
      this.selectServer.saveLandEndServerData = item;
    },
    toggleSelect(type) {
      if (type == "airportStart") {
        this.selectServer[type] = !this.selectServer[type];
        if (this.selectServer.airportStart) {
          this.selectServer.saveAirportFee.airportStart = this.productSearchResult.airportStart;
        } else {
          delete this.selectServer.saveAirportFee.airportStart;
        }
      }
      if (type == "airportEnd") {
        this.selectServer[type] = !this.selectServer[type];
        if (this.selectServer.airportEnd) {
          this.selectServer.saveAirportFee.airportEnd = this.productSearchResult.airportEnd;
        } else {
          delete this.selectServer.saveAirportFee.airportEnd;
        }
      }
      if (type == "landStart") {
        if (!this.controlLandStartServer) {
          return;
        }
        this.selectServer[type] = !this.selectServer[type];
      }
      if (type == "landEnd") {
        if (!this.controlLandEndServer) {
          return;
        }
        this.selectServer[type] = !this.selectServer[type];
      }
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
      // 搜索前，重置所有的服务项
      this.selectServer.airportStart = false;
      this.selectServer.airportEnd = false;
      this.selectServer.landStart = false;
      this.selectServer.landEnd = false;
      this.selectServer.customs = false;
      this.selectServer.insurance = false;
      this.landStartLevel2Data = [];
      this.landStartLevel2 = "";
      this.landEndLevel2 = "";
      this.landEndLevel2Data = [];
      this.selectServer.landStartGeneral = false;
      this.selectServer.landEndGeneral = false;
      (this.landStartLevel3ProductType1 = false),
        (this.landStartLevel3ProductType2 = false),
        (this.landEndLevel3ProductType1 = false),
        (this.landEndLevel3ProductType2 = false),
        (this.controlLandEndServer = false);
      this.controlLandStartServer = false;
      this.selectServer.landEndIndex = "0";
      this.selectServer.landStartIndex = "0";
      (this.saveAirportFee = {}), //储存始发港目的港服务内容以及收费
        (this.saveBaseServerData = {}), //储存基础服务内容以及收费情况
        (this.selectServer.saveLandStartServerData = {}), //储存选择上门取货的服务内容
        (this.selectServer.saveLandEndServerData = {}), //储存选择落地配送的服务内容
        (this.saveLandStartCarType = []), // 储存选择二级标签专车服务后，专车类型的list
        (this.saveLandEndCarType = []), // 储存选择二级标签专车服务后，专车类型的list
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
            // console.log(data.data.data);
            this.productSearchResult = {};
            if (data.data.code == 1) {
              // 储存航空货运ID
              this.selectServer.flightRecordId = data.data.data.flightRecordId;
              // 储存基础服务的收费内容
              this.selectServer.saveBaseServerData =
                data.data.data.airfreightDTO;
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
      this.judgeTopage = true
      this.selectServer.airportProductIds = [];
      this.selectServer.landCarriageProductIds = [];
      // 这里提交前判断所选择的服务，然后把id复制给data里边的对应项，然后把data储存在浏览器中
      // 判断是否有航空运输服务
      this.selectServer.airfreightProductId = this.productSearchResult.airfreightDTO.id;
      // 判断是否有始发港交货
      if (this.selectServer.airportStart) {
        this.judgeTopage = false
        // this.airportProductIds
        let idArr = this.productSearchResult.airportStart.priceDTOS;
        idArr.forEach(ele => {
          this.selectServer.airportProductIds.push(ele.id);
        });
      }
      // 判断是否有目的港提货
      if (this.selectServer.airportEnd) {
        this.judgeTopage = false
        let idArr = this.productSearchResult.airportEnd.priceDTOS;
        idArr.forEach(ele => {
          this.selectServer.airportProductIds.push(ele.id);
        });
      }
      // 判断是否上门取货服务
      if (this.selectServer.landStart) {
        this.judgeTopage = false
        let idArr = this.productSearchResult.landStart.landCarriageSales[
          this.landStartLevel1
        ].landProductTypeDTOS;
        // 上门取货服务中的具体服务
        // console.log(this.selectServer.saveLandStartServerData);
        let data = this.selectServer.saveLandStartServerData;
        this.selectServer.landCarriageProductIds.push({
          priceId: data.id,
          productId: data.productId
        });
      }
      // 判断是否落地配送
      if (this.selectServer.landEnd) {
        this.judgeTopage = false
        let idArr = this.productSearchResult.landEnd.landCarriageSales[
          this.landEndLevel1
        ].landProductTypeDTOS;
        //  落地配送服务中的具体服务
        let data = this.selectServer.saveLandEndServerData;
        this.selectServer.landCarriageProductIds.push({
          priceId: data.id,
          productId: data.productId
        });
        // console.log(this.selectServer.saveLandEndServerData);
      }

      // 收集数据， 传到下一步
      var transObj = {
        searchData: this.searchData,
        selectServer: this.selectServer,
        FeeInfo: {
          airTransFee: this.airTransFee,
          airOilAnnexFee: this.airOilAnnexFee,
          airportStartFee: this.airportStartFee,
          airportEndFee: this.airportEndFee,
          landStartGetGoodsFee: this.landStartGetGoodsFee,
          landEndTranFee: this.landEndTranFee,
          totalFee: this.totalFee
        }
      };
      window.localStorage.setItem("productIndex", JSON.stringify(transObj));
      if (this.controlSubimt) {
        if(this.judgeTopage){
          this.$router.push({
            path: "/center/online_product/write_base",
            query: {
              step: 2
            }
          });
        }else{
          this.$router.push({
            path: "/center/Online_product/write",
            query: {
              step: 2
            }
          });
        }

      }

      // console.log(1, this.selectServer);
    },
    setLandStartGeneralServerData(obj, serverType) {
      // 获取对象中的landProductTypeDTOS
      var landProductTypeDTOS = obj.landProductTypeDTOS;
      landProductTypeDTOS.forEach((ele, index) => {
        // console.log('ele',ele.productType);
        if (serverType == 2) {
          if (ele.productType == 2) {
            let priceList = ele.list[0];
            this.selectServer.landStartPrice.price = priceList.price;
            this.selectServer.landStartPrice.minPrice = priceList.minPrice;

            // 如果是一般配送的话，把一般配送的收费细节存在this.selectServer.saveLandStartServerData
            this.selectServer.saveLandStartServerData = priceList;
          }
        }
      });
    },
    setLandEndGeneralServerData(obj, serverType) {
      // 获取对象中的landProductTypeDTOS

      var landProductTypeDTOS = obj.landProductTypeDTOS;
      landProductTypeDTOS.forEach((ele, index) => {
        // console.log('ele',ele.productType);
        if (serverType == 2) {
          if (ele.productType == 2) {
            let priceList = ele.list[0];
            this.selectServer.landEndPrice.price = priceList.price;
            this.selectServer.landEndPrice.minPrice = priceList.minPrice;

            // 如果是一般配送的话，把一般配送的收费细节存在this.selectServer.saveLandEndServerData中
            this.selectServer.saveLandEndServerData = priceList;
          }
        }
      });
    }

    // 这两个函数的主要作用是在选择不同专车服务的时候，设置saveLandStartServerData，saveLandEndServerData
    // setSaveLandStartServerData(type){
    //   var landProductTypeDTOS = this.saveStartLandCarriageSales.landProductTypeDTOS
    //   landProductTypeDTOS.forEach(ele=>{
    //     if(ele.productType==1){
    //       let priceList = ele.list;
    //       priceList.forEach(e=>{
    //         if(e.name == type){
    //           // 如果是一般配送的时候，把一般配送的收费细节存在this.selectServer.saveLandStartServerData
    //           this.selectServer.saveLandStartServerData = e
    //         }
    //       })
    //     }
    //   })
    // },
    // setSaveLandEndServerData(type){
    //   var landProductTypeDTOS = this.saveEndLandCarriageSales.landProductTypeDTOS
    //   landProductTypeDTOS.forEach(ele=>{
    //     if(ele.productType==1){
    //       let priceList = ele.list;
    //       priceList.forEach(e=>{
    //         if(e.name == type){
    //           // 如果是专车配送的时候，把一般配送的收费细节存在this.selectServer.saveLandStartServerData
    //           this.selectServer.saveLandEndServerData = e
    //         }
    //       })
    //     }
    //   })
    // }
  },
  computed: {
    ...mapGetters(["id", "token"]),
    formatPlaneData() {
      var newDate = this.searchData.planeData;
      var year = newDate.getFullYear();
      var month =
        newDate.getMonth() + 1 < 10
          ? `0${newDate.getMonth() + 1}`
          : newDate.getMonth() + 1;
      var date =
        newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
      return `${year}-${month}-${date}`;
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

    // 计算右侧费用
    // 航空运费
    airTransFee() {
      if (this.getResultSuccess) {
        let totalUnivalent = this.productSearchResult.airfreightDTO
          .airfreightCharge;
        let minAirfreightCharge = this.productSearchResult.airfreightDTO
          .minAirfreightCharge;
        let totalWeight = parseFloat(this.searchData.goodsWeight);
        if (parseFloat(totalUnivalent).mul(totalWeight) > minAirfreightCharge) {
          return parseFloat(totalUnivalent).mul(totalWeight);
        } else {
          return minAirfreightCharge;
        }
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
          let totalWeight = parseFloat(this.searchData.goodsWeight);
          let arr = [];
          let fixPay = 0;
          priceDTOS.forEach(ele => {
            if (ele.priceType == 12) {
              fixPay = fixPay.add(parseFloat(ele.price));
            } else if (ele.priceType == 11) {
              if (ele.minPrice < parseFloat(ele.price).mul(totalWeight)) {
                arr.push(parseFloat(ele.price).mul(totalWeight));
              } else {
                arr.push(ele.minPrice);
              }
            }
          });
          for (let i = 0; i < arr.length; i++) {
            totalUnivalent = totalUnivalent.add(parseFloat(arr[i]));
          }
          return parseFloat(totalUnivalent).add(parseFloat(fixPay));
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
          let fixPay = 0;
          priceDTOS.forEach(ele => {
            if (ele.priceType == 12) {
              fixPay = fixPay.add(parseFloat(ele.price));
            } else if (ele.priceType == 11) {
              if (ele.minPrice < parseFloat(ele.price).mul(totalWeight)) {
                arr.push(parseFloat(ele.price).mul(totalWeight));
              } else {
                arr.push(ele.minPrice);
              }
            }
          });
          for (let i = 0; i < arr.length; i++) {
            totalUnivalent = totalUnivalent.add(parseFloat(arr[i]));
          }
          return parseFloat(totalUnivalent).add(parseFloat(fixPay));
        }
      } else {
        return 0;
      }
    },

    // 上门提货费
    landStartGetGoodsFee() {
      if (this.getResultSuccess) {
        if (this.selectServer.landStart) {
          var totalWeight = parseFloat(this.searchData.goodsWeight);
          var item = this.selectServer.saveLandStartServerData;
          if (item.priceType == 11) {
            return totalWeight.mul(item.price) > item.minPrice
              ? totalWeight.mul(item.price)
              : item.minPrice;
          } else if (item.priceType == 12) {
            return item.price;
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
          var totalWeight = parseFloat(this.searchData.goodsWeight);
          var item = this.selectServer.saveLandEndServerData;
          if (item.priceType == 11) {
            return totalWeight.mul(item.price) > item.minPrice
              ? totalWeight.mul(item.price)
              : item.minPrice;
          } else if (item.priceType == 12) {
            return item.price;
          }
        }
      } else {
        return 0;
      }
    },
    // 总费用
    totalFee() {
      // console.log(this.airTransFee,this.airOilAnnexFee,this.landStartServerFee,this.landStartMakeBillFee,this.landEndGetGoodsFee,this.landStartGetGoodsFee,this.landEndTranFee);
      var airTransFee =
        this.airTransFee == undefined ? 0 : parseFloat(this.airTransFee);
      var airOilAnnexFee =
        this.airOilAnnexFee == undefined ? 0 : parseFloat(this.airOilAnnexFee);
      var airportStartFee =
        this.airportStartFee == undefined
          ? 0
          : parseFloat(this.airportStartFee);
      var airportEndFee =
        this.airportEndFee == undefined ? 0 : parseFloat(this.airportEndFee);

      var landStartGetGoodsFee =
        this.landStartGetGoodsFee == undefined
          ? 0
          : parseFloat(this.landStartGetGoodsFee);
      var landEndTranFee =
        this.landEndTranFee == undefined ? 0 : parseFloat(this.landEndTranFee);
      return airTransFee
        .add(airOilAnnexFee)
        .add(airportStartFee)
        .add(airportEndFee)
        .add(landStartGetGoodsFee)
        .add(landEndTranFee);
    }
  },
  watch: {
    searchData: {
      handler(newValue, oldValue) {
        this.goodsTypesList.forEach(ele => {
          if (ele.id == this.searchData.goodsType) {
            this.transGoodsType = ele.dataName;
          }
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.m-product-container {
  .red {
    color: #f52c35;
    font-weight: 700;
  }
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
              z-index: 100;
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
                // margin-bottom: -55px;
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
                // height: 110px;
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
                  flex-wrap: wrap;
                  .address-btn {
                    padding: 2px 12px 2px 0px;
                    margin: 4px 0;
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
              .trans-price-apply-model {
                .el-dialog__header {
                  background-color: #fcd832;
                  color: #fff;
                  font-size: 18px;
                  font-weight: 600;
                }
                .el-dialog__body {
                  .body {
                    .top {
                      border-bottom: 1px dotted #e0e0e0;
                      padding-bottom: 30px;
                      > div {
                        color: #9f9f9f;
                        display: flex;
                        width: 400px;
                        margin: 10px auto;
                        padding-left: 90px;
                        .key {
                          margin-right: 20px;
                        }
                      }
                    }
                    .bottom {
                      color: #9f9f9f;
                      display: flex;
                      width: 400px;
                      margin: 30px auto 0;
                      padding-left: 90px;
                      .key,
                      .value,
                      .unit {
                        border-bottom: 1px solid #e0e0e0;
                      }
                      .value {
                        .el-input {
                          input {
                            border: none;
                          }
                        }
                      }
                    }
                  }
                }
                .el-dialog__footer {
                  text-align: center;
                  button {
                    padding: 7px 60px;
                  }
                }
              }
            }
          }
          .server-more {
            width: 100%;
            display: flex;
            flex-direction: column;
            .select-big {
              // height: 130px;
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
        // background: #fff;
        width: 860px;
        margin-top: 10px;
        // box-shadow: 0 0 15px #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        text-align: center;
        .word{
          font-size: 16px;
          color: #e0e0e0;
        }
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
        &.box1 {
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
        .cost-number {
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
          color: #fcd832;
        }
      }
    }
    .wave {
      position: absolute;
      z-index: 99;
      bottom: 0px;
      left: 0;
      width: 300px;
      height: 15px;
      background-image: -webkit-gradient(
          linear,
          50% 0,
          0 100%,
          from(transparent),
          color-stop(0.5, transparent),
          color-stop(0.5, #e0e0e0),
          to(#e0e0e0)
        ),
        -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(0.5, transparent), color-stop(0.5, #e0e0e0), to(#e0e0e0));
      background-size: 20px 10px;
      background-repeat: repeat-x;
      background-position: 0 100%;
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
