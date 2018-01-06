<template>
  <div class="write-wrapper li-product-write">
    <div class="write-container">
      <div class="write-inner">
        <div class="write-content">
          <div class="content-pic"></div>
          <div class="list list1">
            <!-- <div class="list-text">订单编号:</div>
            <span class="list-num">464689648</span> -->
            <div class="write-back" @click="completeGo" style="cursor:pointer;">返回上一步</div>
          </div>
          <div class="list list2">
            <div class="list-text">运输服务:</div>
            <span class="list-land">{{getProductIndexData.searchData.startPort}}-{{getProductIndexData.searchData.endPort}}</span>
            <span class="list-land"> 货物类型：{{ goodsType }}</span>
            <span class="listTime">航班起飞时间：{{formatPlaneData}} {{getProductIndexData.searchData.planeTime[0]}}--{{getProductIndexData.searchData.planeTime[1]}}</span>
          </div>
          <div class="list list3">
            <div class="list-text">基础服务:</div>
            <span class="list-land" v-if="getProductIndexData.selectServer.baseServer"><span class="icon active el-icon-success"></span>航空运输</span>
          </div>
          <div class="list list4">
            <div class="list-text">更多服务:</div>
            <span class="list-land" v-if="getProductIndexData.selectServer.airportStart"><span class="icon active el-icon-success"></span>代交货</span>
            <span class="list-land" v-if="getProductIndexData.selectServer.airportEnd"><span class="icon active el-icon-success"></span>代提交</span>
            <span class=" list-land" v-if="getProductIndexData.selectServer.landStart"><span class="icon active el-icon-success"></span>上门取货</span>
            <span class="list-land" v-if="getProductIndexData.selectServer.landEnd"><span class="icon active el-icon-success"></span>落地配</span>
          </div>
          <div class="list list5">
            <div class="list-text" v-if="false">增值服务:</div>
            <span class="list-land" v-if="getProductIndexData.selectServer.customs"><span class="icon active el-icon-success"></span>报关报检</span>
            <span class="list-land" v-if="getProductIndexData.selectServer.insurance"><span class="icon active el-icon-success"></span>运输保险</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-title">收发地址</div>
      <div class="product-address">
        <!-- 发货地址列表模态框 -->
        <div class="sendAddressList">
          <el-dialog width="1200px" title="发货地址" :visible.sync="sendAddressListModel">
            <EasyScrollbar>
              <div id="wrapper" style="height: 500px;">
                <div style="background-color: #F9F9F9;text-align: center;">
                  <Addresslist  @getAddressItem='getAddressItem' address = 'send'></Addresslist>
                </div>
              </div>
            </EasyScrollbar>
            <div slot="footer" class="dialog-footer">
              <!-- <el-button @click="sendAddressListModel = false">取 消</el-button>
              <el-button type="primary" @click="sendAddressListModel = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>
        <el-form :model="sendAddressData" :rules="sendAddressRules" ref="sendAddress" label-width="100px" class="sendAddress">
          <div class="address-left">
            <div class="left-logo"></div>
            <div class="logo-text">发</div>
            <div class="left-nav">
              <img @click="sendAddressListModel=true" src="../../../assets/product17.png">
            </div>
            <div class="left-info">
              <div class="left-name">
                <span class="name-logo">*</span>
                <span class="name-nav">姓名</span>
                <span class="name-text">
                  <el-form-item prop="name">
                    <el-input size="mini" v-model="sendAddressData.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </span>
              </div>
              <div class="right-name">
                <span class="name-nav">身份证</span>
                <span class="name-text">
                  <el-form-item prop="id">
                    <el-input size="mini" v-model="sendAddressData.id" placeholder="请输入身份证"></el-input>
                  </el-form-item>
                </span>
              </div>
            </div>
            <div class="left-phone">
              <div class="left-name">
                <span class="name-logo">*</span>
                <span class="name-nav">手机号</span>
                <span class="name-text">
                  <el-form-item prop="mobile">
                    <el-input size="mini" v-model="sendAddressData.mobile" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </span>
              </div>
              <div class="right-name">
                <span class="name-nav">固定电话</span>
                <span class="name-text">
                  <el-form-item prop="tellPhone1">
                    <el-input class="left" size="mini" v-model="sendAddressData.tellPhone" placeholder="请输入固定电话"></el-input>
                  </el-form-item>
                  <!-- <el-form-item prop="tellPhone2">
                    <el-input class="right" size="mini" v-model="sendAddressData.tellPhone2" placeholder="88886666"></el-input>
                  </el-form-item> -->
                </span>
              </div>
            </div>
            <div class="left-area">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">所在区域</span>
                <span class="name-text">
                  <!-- <v-distpicker @province='sendProvince' @city='sendCity' @area='sendArea' :paceholder='sendPlaceholders'></v-distpicker> -->
                  <el-input size="mini" v-model="sendAddressData.addressT" placeholder="请输入地区"></el-input>
                </span>
              </div>
            </div>
            <div class="left-detail">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">详细地址</span>
                <span class="name-text"><el-input size="mini" v-model="sendAddressData.detailAddress" placeholder="请输入详细地址"></el-input></span>
              </div>
            </div>
            <div class="left-index">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">邮编</span>
                <span class="name-text"><el-input size="mini" v-model="sendAddressData.postal" placeholder="请输入邮编"></el-input></span>
              </div>
            </div>
            <div class="left-btn">
              <span class="btn-box box1" @click="addSendAddress('sendAddress')">添加地址簿</span>
              <span class="btn-box box2" @click="setDefaultSendAddress('sendAddress')">设为默认</span>
              <span class="btn-box box3" @click="resetSendAddressForm('sendAddress')">确定</span>
            </div>
          </div>
        </el-form>
        <div class="address-img">
          <img src="../../../assets/product2.png">
        </div>
        <!-- 收货地址列表模态框 -->
        <div class="receiveAddressList">
          <el-dialog width="1200px" top='66px' title="收货地址" :visible.sync="receiveAddressListModel">
            <EasyScrollbar>
              <div id="wrapper" style="height: 500px;">
                <div style="background-color: #F9F9F9;text-align: center;">
                  <Addresslist @getAddressItem='getAddressItem' address = 'receive'></Addresslist>
                </div>
              </div>
            </EasyScrollbar>
            <div slot="footer" class="dialog-footer">
              <!-- <el-button @click="receiveAddressListModel = false">取 消</el-button>
              <el-button type="primary" @click="receiveAddressListModel = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>
        <el-form :model="receiveAddressData" :rules="receiveAddressRules" ref="receiveAddress" label-width="100px" class="receiveAddress">
          <div class="address-right">
            <div class="left-logo"></div>
            <div class="logo-text">收</div>
            <div class="left-nav">
              <img @click="receiveAddressListModel=true" src="../../../assets/product17.png">
            </div>
            <div class="left-info">
              <div class="left-name">
                <span class="name-logo">*</span>
                <span class="name-nav">姓名</span>
                <span class="name-text">
                  <el-form-item prop="name">
                    <el-input size="mini" v-model="receiveAddressData.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </span>
              </div>
              <div class="right-name">
                <span class="name-nav">身份证</span>
                <span class="name-text">
                  <el-form-item prop="id">
                    <el-input size="mini" v-model="receiveAddressData.id" placeholder="请输入身份证"></el-input>
                  </el-form-item>
                </span>
              </div>
            </div>
            <div class="left-phone">
              <div class="left-name">
                <span class="name-logo">*</span>
                <span class="name-nav">手机号</span>
                <span class="name-text">
                  <el-form-item prop="mobile">
                    <el-input size="mini" v-model="receiveAddressData.mobile" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </span>
              </div>
              <div class="right-name">
                <span class="name-nav">固定电话</span>
                <span class="name-text">
                  <el-form-item prop="tellPhone1">
                    <el-input class="left" size="mini" v-model="receiveAddressData.tellPhone" placeholder="请输入固定电话"></el-input>
                  </el-form-item>
                </span>
              </div>
            </div>
            <div class="left-area">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">所在区域</span>
                <span class="name-text">
                  <!-- <v-distpicker @province='receiveProvince' @city='receiveCity' @area='receiveArea' :paceholder='receivePlaceholders'></v-distpicker> -->
                  <el-input size="mini" v-model="receiveAddressData.addressT" placeholder="请输入地区"></el-input>
                </span>
              </div>
            </div>
            <div class="left-detail">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">详细地址</span>
                <span class="name-text"><el-input size="mini" v-model="receiveAddressData.detailAddress" placeholder="请输入详细地址"></el-input></span>
              </div>
            </div>
            <div class="left-index">
              <div class="left-name">
                <span class="name-logo">&nbsp;</span>
                <span class="name-nav">邮编</span>
                <span class="name-text"><el-input size="mini" v-model="receiveAddressData.postal" placeholder="请输入邮编"></el-input></span>
              </div>
            </div>
            <div class="left-btn">
              <span class="btn-box box1" @click="addReceiveAddress('receiveAddress')">添加地址簿</span>
              <span class="btn-box box2" @click="setDefaultReceiveAddress('receiveAddress')">设为默认</span>
              <span class="btn-box box3" @click="resetReceiveAddressForm('receiveAddress')">确定</span>
            </div>
          </div>
        </el-form>
      </div>
    <div class="product-title">货物信息</div>
    <div class="product-information">
      <div class="info-left">
        <el-form :model="goodsInfo" :rules="goodsInfoRules" ref="goodsInfo" class="goodsInfo">
          <div class="info-list info-list1">
            <span class="name-logo">*</span>
            <span class="name-nav">货物重量</span>
            <span class="name-text">
              <el-form-item prop="weight">
                <el-input size="mini" v-model="goodsInfo.weight" placeholder="请输入货物重量"></el-input>
              </el-form-item>
            </span>
            <span class="name-num">千克</span>
          </div>
          <div class="info-list">
            <span class="name-logo">*</span>
            <span class="name-nav">货物件数</span>
            <span class="name-text">
              <el-form-item prop="num">
                <el-input size="mini" v-model="goodsInfo.num" placeholder="请输入货物件数"></el-input>
              </el-form-item>
            </span>
            <span class="name-num">件</span>
          </div>
          <div class="info-list">
            <span class="name-logo">*</span>
            <span class="name-nav">货物名称</span>
            <span class="name-text">
              <el-form-item prop="name">
                <el-input size="mini" v-model="goodsInfo.name" placeholder="请输入货物名称"></el-input>
              </el-form-item>
            </span>
          </div>
          <div class="info-list info-list4">
            <span class="name-logo">&nbsp;</span>
            <span class="name-nav">货物包装</span>
            <span class="name-text">
              <el-input size="mini" v-model="goodsInfo.pack" placeholder="请输入货物包装"></el-input>
            </span>
          </div>
        </el-form>
      </div>
      <div class="info-mid">
        <span class="mid-text">
          <div>货物尺寸</div>
          <div>(长*宽*高/件数)</div>
          <div>单位：cm</div>
        </span>
        <div class="mid-box">
          <!-- 增加货物尺寸模态框 -->
          <div class="addSize">
            <el-dialog width="520px" title="增加货物尺寸" :visible.sync="addSizeDialogFormVisible">
                <input type="number" v-model="addSizeDialogFormData.length" placeholder="长">
                <input type="number" v-model="addSizeDialogFormData.width" placeholder="宽">
                <input type="number" v-model="addSizeDialogFormData.height" placeholder="高">
                <input type="number" v-model="addSizeDialogFormData.num" placeholder="件数">
              <div slot="footer" class="dialog-footer">
                <el-button @click="addSizeDialogFormVisible = false">取 消</el-button>
                <el-button @click="addGoodsSize">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <EasyScrollbar>
            <div class="wrapper" id="wrapper">
              <div>
                <p v-for="(item,index) in goodsInfo.size" :key="index">{{item}}</p>
              </div>
            </div>
          </EasyScrollbar>

        </div>
        <img  @click="addSizeDialogFormVisible = true" src="../../../assets/product18.png">
      </div>
      <div class="info-right">
        <div class="info-list">
          <span class="name-nav">货物体积</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.bulk" placeholder="请输入货物体积"></el-input></span>
          <span class="name-num">立方米</span>
        </div>
        <div class="info-list">
          <span class="name-nav">计费重量</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.payWeight" placeholder="请输入计费重量"></el-input></span>
          <span class="name-num">千克</span>
        </div>
        <div class="info-list mark">
          <span class="name-nav">备注</span>
          <span class="value"><el-input size="mini" v-model="goodsInfo.mark" placeholder="请输入备注"></el-input></span>
        </div>
      </div>
    </div>
    <div class="product-title" v-if="false">活动信息</div>
    <div class="product-pre" v-if="false">
      <input type="text" v-model="inviteCode" name="" placeholder="推荐人邀请码">
      <span class="product-preindex" @click="verificationCode">验证</span>
    </div>
    <div class="product-title" v-if="false">发票信息</div>
    <div class="product-con" v-if="false">
      <div class="con-nav">
        <span class="icon el-icon-success" :class="invoiceServerInfo.notNeed?'active':''" ></span>不需要发票
        <!-- <span class="icon el-icon-success" :class="invoiceServerInfo.general?'active':''" @click="invoiceServerInfo.general = !invoiceServerInfo.general"></span>普票
        <span class="icon el-icon-success" :class="invoiceServerInfo.special?'active':''" @click="invoiceServerInfo.special = !invoiceServerInfo.special"></span>专票 -->
      </div>
      <div class="con-change">
        <!-- <span class="con-text">深圳市迅捷有限公司|3252365435234234</span>
        <span class="con-btn">修改</span> -->
      </div>
    </div>
    <div class="product-title">费用信息</div>
    <div class="product-cost">
      <div class="cost-content">
        <div class="cost-list" v-if="'airTransFee' in getProductIndexData.FeeInfo && getProductIndexData.FeeInfo.airTransFee != 0">
          <span class="cost-num">航空运费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.airTransFee}}</span>
        </div>
        <div class="cost-list" v-if="('airOilAnnexFee' in getProductIndexData.FeeInfo) && (getProductIndexData.FeeInfo.airOilAnnexFee != 0)">
          <span class="cost-num">燃油附加费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.airOilAnnexFee}}</span>
        </div>
        <div class="cost-list" v-if="'airportStartFee' in getProductIndexData.FeeInfo && getProductIndexData.FeeInfo.airportStartFee != 0">
          <span class="cost-num">始发港交货费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.airportStartFee}}</span>
        </div>
        <div class="cost-list" v-if="'airportEndFee' in getProductIndexData.FeeInfo && getProductIndexData.FeeInfo.airportEndFee != 0">
          <span class="cost-num">目的港提货费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.airportEndFee}}</span>
        </div>
        <div class="cost-list" v-if="'landStartGetGoodsFee' in getProductIndexData.FeeInfo && getProductIndexData.FeeInfo.landStartGetGoodsFee != 0">
          <span class="cost-num">上门提货费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.landStartGetGoodsFee}}</span>
        </div>
        <div class="cost-list" v-if="'landEndTranFee' in getProductIndexData.FeeInfo && getProductIndexData.FeeInfo.landEndTranFee != 0">
          <span class="cost-num">落地配送费</span>
          <span class="cost-line"></span>
          <span class="cost-item">¥{{getProductIndexData.FeeInfo.landEndTranFee}}</span>
        </div>
      </div>
      <div class="cost-sum">
        <span class="sum-text">合计</span>
        <span class="sum-num">¥{{getProductIndexData.FeeInfo.totalFee}}</span>
      </div>
    </div>
    <div class="product-complete">
      <div class="back-complete">
        <div class="goback" @click="completeGo">返回上一步</div>
        <div class="gokeep"><el-button size="mini" type="info" @click="saveOrder('goodsInfo')">保存订单</el-button></div>
      </div>
      <div class="cost-complete"><el-button size="mini" type="danger" @click="submitOrder('goodsInfo')">提交</el-button></div>
    </div>
  </div>
</template>

<script type="text/javascript">
// import productSelect from "./product_select";
// import VDistpicker from "v-distpicker";
import { mapGetters } from "vuex";
import Addresslist from '@/components/Addresslist'
import {logout} from '@/tools/logout'
export default {
  mixins:[logout],
  components: {
    // productSelect,
    // VDistpicker,
    Addresslist
  },
  data() {
    return {
      getProductIndexData: {}, // 获取上一步传过来的数据
      goodsTypesList: {},
      goodsType: "",
      addSizeDialogFormVisible: false,
      sendAddressListModel:false,  // 地址列表模态框
      receiveAddressListModel:false,  // 地址列表模态框
      invoiceServerInfo: {
        notNeed: true, // 不需要
        general: false, // 普通
        special: false //  专票
      },
      addSizeDialogFormData: {
        length: "",
        width: "",
        height: "",
        num: ""
      },
      sendAddressData: {
        addressid:'',
        name: "",
        id: "",
        mobile: "",
        tellPhone: "",
        addressT:"",
        detailAddress: "",
        postal: ""
      },
      sendAddressRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // id: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        // tellPhone1: [{ required: true, message: "请输入区号", trigger: "blur" }],
        // tellPhone2: [{ required: true, message: "请输入座机号", trigger: "blur" }]
      },
      receiveAddressRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // id: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        // tellPhone1: [{ required: true, message: "请输入区号", trigger: "blur" }],
        // tellPhone2: [{ required: true, message: "请输入座机号", trigger: "blur" }]
      },
      goodsInfoRules: {
        weight: [{ required: true, message: "请输入货物重量", trigger: "blur" }],
        num: [{ required: true, message: "请输入货物件数", trigger: "blur" }],
        name: [{ required: true, message: "请输入货物名称", trigger: "blur" }]
      },
      receiveAddressData: {
        addressid:'',
        name: "",
        id: "",
        mobile: "",
        tellPhone: "",
        addressT:"",
        detailAddress: "",
        postal: ""
      },
      goodsInfo: {
        weight: "",
        num: "",
        name: "",
        pack: "",
        size: [],
        bulk: "",
        payWeight: "",
        remark: ""
      },
      inviteCode: "",
    };
  },
  created() {
    this.getProductIndexData = JSON.parse(
      window.localStorage.getItem("productIndex")
    );
    if (!this.getProductIndexData) {
      this.$router.push("/center/Online_product");
    }
    this.getGoodsTypeList();
    this.defaultSendAddress()
    this.defaultReceiveAddress()
  },
  destroyed() {
    window.localStorage.removeItem("productIndex");
    // console.log('刷新出发了吗');
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
    promptsuccess(title) {
      this.$message({
        message: title,
        type: "success"
      });
    },
    promptwarning(title) {
      this.$message({
        message: title,
        type: "warning"
      });
    },
    getAddressItem(item,type){
      console.log('zhelide ',item,type);
      if(type == 'send'){
        this.sendAddressData.addressid = item.id
        this.sendAddressData.name = item.contactName
        this.sendAddressData.id = item.identityCard
        this.sendAddressData.mobile = item.contactMobile
        this.sendAddressData.tellPhone = item.contactPhone
        this.sendAddressData.addressT = item.region
        this.sendAddressData.detailAddress = item.detailAddress
        this.sendAddressData.postal = item.postCode

        // 影藏模态框
        this.sendAddressListModel = false
      }else if(type == 'receive'){
        this.receiveAddressData.addressid = item.id
        this.receiveAddressData.name = item.contactName
        this.receiveAddressData.id = item.identityCard
        this.receiveAddressData.mobile = item.contactMobile
        this.receiveAddressData.tellPhone = item.contactPhone
        this.receiveAddressData.addressT = item.region
        this.receiveAddressData.detailAddress = item.detailAddress
        this.receiveAddressData.postal = item.postCode

        // 影藏模态框
        this.receiveAddressListModel = false
      }
    },
    getGoodsTypeList() {
      this.goodsTypesList = {};
      var newObj = {};
      this.axios
        .post("/app/v1/common/queryDict", { dataType: 2 })
        .then(data => {
          // console.log(data.data.data.detailDTOS);
          var TypesList = data.data.data.detailDTOS;
          TypesList.forEach(ele => {
            newObj[ele["id"]] = ele["dataName"];
          });
          Object.assign(this.goodsTypesList, newObj);
          this.getGoodsType();
        });
    },
    getGoodsType() {
      var index = this.getProductIndexData.searchData.goodsType;
      this.goodsType = this.goodsTypesList[index];
    },
    addGoodsSize() {
      console.log(typeof this.addSizeDialogFormData.length);
      if (
        !this.addSizeDialogFormData.length ||
        !this.addSizeDialogFormData.width ||
        !this.addSizeDialogFormData.height ||
        !this.addSizeDialogFormData.num
      ) {
        return;
      }
      var str =
        this.addSizeDialogFormData.length +
        "*" +
        this.addSizeDialogFormData.width +
        "*" +
        this.addSizeDialogFormData.height +
        "/" +
        this.addSizeDialogFormData.num;
      this.goodsInfo.size.push(str);
      this.addSizeDialogFormVisible = false;
    },
    verificationCode() {
      // inviteCode
      if (this.inviteCode) {
        this.axios
          .post("/app/v1/common/validateInviteCode", {
            inviteCode: this.inviteCode
          })
          .then(data => {
            if (data.data.code == 1) {
              console.log(data);
            } else {
              this.prompt("邀请码不存在");
            }
          });
      }
    },
    resetSendAddressForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/updateAddress", {
              addressId: this.sendAddressData.addressid,
              addressType: 0, // 发货地址
              contactMobile: this.sendAddressData.mobile,
              contactName: this.sendAddressData.name,
              contactPhone:this.sendAddressData.tellPhone,
              detailAddress: this.sendAddressData.detailAddress,
              id: this.id,
              identityCard: this.sendAddressData.id,
              postCode: this.sendAddressData.postal,
              region:this.sendAddressData.addressT,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.sendAddressData.addressid = data.data.data.id;
                this.promptsuccess("地址更新成功");
              } else {
                this.promptwarning("地址更新失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetReceiveAddressForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/updateAddress", {
              addressId: this.receiveAddressData.addressid,
              addressType: 1, // 收货地址
              contactMobile: this.receiveAddressData.mobile,
              contactName: this.receiveAddressData.name,
              contactPhone:this.receiveAddressData.tellPhone,
              detailAddress: this.receiveAddressData.detailAddress,
              id: this.id,
              identityCard: this.receiveAddressData.id,
              postCode: this.receiveAddressData.postal,
              region:this.receiveAddressData.addressT,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.receiveAddressData.addressid = data.data.data.id;
                this.promptsuccess("地址更新成功");
              } else {
                this.promptwarning("地址更新失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addSendAddress(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/addAddress", {
              addressId: 0,
              addressType: 0, // 发货地址
              contactMobile: this.sendAddressData.mobile,
              contactName: this.sendAddressData.name,
              contactPhone:this.sendAddressData.tellPhone,
              detailAddress: this.sendAddressData.detailAddress,
              id: this.id,
              identityCard: this.sendAddressData.id,
              postCode: this.sendAddressData.postal,
              region:this.sendAddressData.addressT,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.sendAddressData.addressid = data.data.data.id;
                this.promptsuccess("地址添加成功");
              } else {
                this.promptwarning("地址添加失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addReceiveAddress(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/addAddress", {
              addressId: 0,
              addressType: 1, // 收货地址
              contactMobile: this.sendAddressData.mobile,
              contactName: this.sendAddressData.name,
              contactPhone:this.sendAddressData.tellPhone,
              detailAddress: this.sendAddressData.detailAddress,
              id: this.id,
              identityCard: this.sendAddressData.id,
              postCode: this.sendAddressData.postal,
              region:this.sendAddressData.addressT,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.sendAddressData.addressid = data.data.data.id;
                this.promptsuccess("地址添加成功");
              } else {
                this.promptwarning("地址添加失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setDefaultSendAddress(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/defaultAddress", {
              addressId: this.sendAddressData.addressid,
              addressType: 0, // 发货地址
              detailAddress: this.sendAddressData.detailAddress,
              id: this.id,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.promptsuccess("设置默认地址成功");
              } else {
                this.promptwarning("设置默认地址成功");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setDefaultReceiveAddress(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/app/v1/address/defaultAddress", {
              addressId: this.receiveAddressData.addressid,
              addressType: 1, // 收货地址
              id: this.id,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.promptsuccess("设置默认地址成功");
              } else {
                this.promptwarning("设置默认地址成功");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    defaultSendAddress() {
      this.axios
        .post("/app/v1/address/queryAddress", {
          addressId: 0,
          addressType: 0,
          id: this.id,
          token: this.token
        })
        .then(data => {
          // console.log(data.data.data.senderList);
          var sendList = data.data.data.senderList
          sendList.forEach(ele=>{
            if(ele.asDefault == 1){
              this.sendAddressData.addressid = ele.id
              this.sendAddressData.name = ele.contactName
              this.sendAddressData.id = ele.identityCard
              this.sendAddressData.mobile = ele.contactMobile
              this.sendAddressData.tellPhone = ele.contactPhone
              this.sendAddressData.addressT = ele.region
              this.sendAddressData.detailAddress = ele.detailAddress
              this.sendAddressData.postal = ele.postCode
            }
          })
        });
    },
    defaultReceiveAddress() {
      this.axios
        .post("/app/v1/address/queryAddress", {
          addressId: 0,
          addressType: 1,
          id: this.id,
          token: this.token
        })
        .then(data => {
          // console.log(data.data.data.receiverList);
          var receiveList = data.data.data.receiverList
          receiveList.forEach(ele=>{
            if(ele.asDefault == 1){
              this.receiveAddressData.addressid = ele.id
              this.receiveAddressData.name = ele.contactName
              this.receiveAddressData.id = ele.identityCard
              this.receiveAddressData.mobile = ele.contactMobile
              this.receiveAddressData.tellPhone = ele.contactPhone
              this.receiveAddressData.addressT = ele.region
              this.receiveAddressData.detailAddress = ele.detailAddress
              this.receiveAddressData.postal = ele.postCode
            }
          })
        });
    },
    saveOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("saveOrder!");
          if (this.receiveAddressData.addressid == "" || this.sendAddressData.addressid == "") {
            this.prompt("请输入地址，点击确定");
            return;
          }
          this.axios
            .post("/app/v1/order/saveOrder", {
              agentCode: "",
              airfreightProductId: this.getProductIndexData.selectServer
                .airfreightProductId,
              airportProductIds: this.getProductIndexData.selectServer
                .airportProductIds,
              aviationNo: "",
              delegateOrderId: "",
              flightRecordId: this.getProductIndexData.selectServer
                .flightRecordId,
              goodsName: this.goodsInfo.name,
              goodsNumber: this.goodsInfo.num,
              goodsPackage: this.goodsInfo.pack,
              goodsSize: this.goodsInfo.size.join(),
              goodsVolume: this.goodsInfo.bulk,
              goodsWeight: this.goodsInfo.weight,
              id: this.id,
              incrementProductIds: [],
              inviteCode: this.inviteCode,
              invoiceType: 0,
              landCarriageProductIds: this.getProductIndexData.selectServer
                .landCarriageProductIds,
              opt: 0, // 保存
              orderNo: "",
              receiverAddressId: this.receiveAddressData.addressid,
              remark: this.goodsInfo.remark,
              senderAddressId: this.sendAddressData.addressid,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.promptsuccess("订单保存成功！");
              }
              if (data.data.code == 10203) {
                this.promptwarning("货物尺寸格式错误");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitOrder(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submitOrder!");
          if (this.receiveAddressData.addressid == "" || this.sendAddressData.addressid == "") {
            this.prompt("请输入地址，点击确定");
            return;
          }
          this.axios
            .post("/app/v1/order/saveOrder", {
              agentCode: "",
              airfreightProductId: this.getProductIndexData.selectServer
                .airfreightProductId,
              airportProductIds: this.getProductIndexData.selectServer
                .airportProductIds,
              aviationNo: "",
              delegateOrderId: "",
              flightRecordId: this.getProductIndexData.selectServer
                .flightRecordId,
              goodsName: this.goodsInfo.name,
              goodsNumber: this.goodsInfo.num,
              goodsPackage: this.goodsInfo.pack,
              goodsSize: this.goodsInfo.size.join(),
              goodsVolume: this.goodsInfo.bulk,
              goodsWeight: this.goodsInfo.weight,
              id: this.id,
              incrementProductIds: [],
              inviteCode: this.inviteCode,
              invoiceType: 0,
              landCarriageProductIds: this.getProductIndexData.selectServer
                .landCarriageProductIds,
              opt: 1, //提交
              orderNo: "",
              receiverAddressId: this.receiveAddressData.addressid,
              remark: this.goodsInfo.remark,
              senderAddressId: this.sendAddressData.addressid,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 10203) {
                this.promptwarning("货物尺寸格式错误");
              }
              if (data.data.code == 10212) {
                this.prompt("供应商信息维护错误,请重新下单");
                setTimeout(() => {
                  this.$router.push("/center/online_product");
                }, 2000);
              }
              if (data.data.code == 1) {
                this.promptsuccess("下单成功");
                setTimeout(() => {
                  this.$router.push("/center/online_product/complete");
                }, 1000);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    completeGo() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters(["id", "token"]),
    formatPlaneData() {
      if ("searchData" in this.getProductIndexData) {
        var newDate = new Date(this.getProductIndexData.searchData.planeData);
        var year = newDate.getFullYear();
        var month =
          newDate.getMonth() + 1 < 10
            ? `0${newDate.getMonth() + 1}`
            : newDate.getMonth() + 1;
        var date =
          newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        return `${year}-${month}-${date}`;
      }
    }
  }
};
</script>

<style lang="scss">
.write-wrapper {
  color: rgba(153, 153, 153, 1);
  width: 1100px;
  .write-container {
    height: 200px;
    width: 1100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    .write-inner {
      background: #fff;
      box-shadow: 0, 0, 15px, #ccc;
      -webkit-box-shadow: 0, 0, 15px, #ccc;
      border: 1px solid #fff;
      width: 1060px;

      .write-content {
        position: relative;
        background: #fff;
        box-shadow: 0 5px 15px #ccc;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
        .content-pic {
          position: absolute;
          width: 100%;
          height: 5px;
          top: -5px;
          left: 0;
          background: linear-gradient(
            45deg,
            red 0%,
            red 50%,
            yellow 50%,
            yellow 100%
          );
          background-size: 6% 5px;
        }
        .list1 {
          margin-top: 20px;
          .write-back {
            height: 30px;
            display: flex;
            align-items: flex-start;
            margin-right: 10px;
            justify-content: flex-end;
            flex: 1;
          }
        }
        .list5 {
          margin-bottom: 10px;
        }
        .list {
          height: 26px;
          display: flex;
          flex-direction: row;
          .list-text {
            width: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
          }
          .list-num {
            width: 190px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: rgba(246, 66, 75, 1);
          }
          .list-land {
            width: 190px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .icon {
              margin-right: 4px;
              &.active {
                color: #8cc63f;
              }
            }
            .product-select {
              transform: scale(0.4);
              cursor: pointer;
            }
          }
          .listTime {
            width: 500px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
  }
  .product-title {
    height: 30px;
    font-size: 18px;
    width: 100%;
    padding: 10px 0 10px 20px;
    color: rgba(93, 93, 93, 1);
    line-height: 30px;
  }
  .product-address {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    // 地址列表的模态框样式
    .sendAddressList,
    .receiveAddressList{
      .el-dialog{
        .el-dialog__header{
          background-color: #fccf00;
          .el-dialog__title{
            color: #fff;
          }
        }
      }
    }
    .address-left {
      background: #fff;
      box-shadow: 0 0 15px #ccc;
      margin-left: 20px;
      height: 100%;
      width: 490px;
      position: relative;
      display: flex;
      flex-direction: column;
      // 公共样式
      .name-nav {
        margin-right: 10px;
      }
      .name-text {
        .el-form-item {
          margin: 0;
          .el-form-item__content {
            margin: 0 !important;
            .el-form-item__error {
              z-index: 999;
              width: 100px;
              top: 61%;
            }
            .el-input {
              input {
                padding: 0;
              }
            }
          }
        }
      }
      .left-logo {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 50px solid rgba(255, 219, 66, 1);
        border-right: 50px solid transparent;
      }
      .logo-text {
        color: #fff;
        font-size: 20px;
        position: absolute;
        top: 3px;
        left: 5px;
      }
      .left-nav {
        height: 36px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          cursor: pointer;
          height: 25px;
          margin-right: 10px;
        }
      }
      .left-info {
        height: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left-name {
          height: 100%;
          width: 180px;
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            width: 80px;
            margin-left: 10px;
            input {
              padding: 0;
            }
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          // color: rgba(255, 220, 68, 1);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
        }
      }
      .left-phone {
        height: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left-name {
          height: 100%;
          width: 180px;
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid rgba(93, 93, 93, 0.1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            text-indent: 10px;
            input {
              padding: 0;
            }
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            display: flex;
            .left {
              flex: 1;
              input {
                padding: 0;
                padding-right: 5px;
                border-radius: 0;
              }
            }
          }
        }
      }
      .left-area {
        height: 38px;
        margin-top: 20px;
        .left-name {
          border-bottom: 1px solid rgba(93, 93, 93, 0.1);
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 470px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            // transform: scale(0.8);
            transform: translateY(2px);
            overflow: hidden;
            .address {
              display: flex;
              width: 380px;
              select {
                text-align: center;
                padding: 0;
              }
            }
          }
        }
      }
      .left-detail {
        height: 38px;
        .left-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 450px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
          }
        }
      }
      .left-index {
        height: 38px;
        .left-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 450px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          border-bottom: 1px solid rgba(93, 93, 93, 0.1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
          }
        }
      }
      .left-btn {
        height: 38px;
        width: 450px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn-box {
          margin-right: 10px;
          color: #fff;
          border-radius: 3px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .box1 {
          background: rgba(139, 200, 63, 1);
          width: 100px;
        }
        .box2 {
          background: rgba(139, 200, 63, 1);
          width: 80px;
        }
        .box3 {
          background: rgba(252, 207, 0, 1);
          width: 80px;
        }
      }
    }
    .address-right {
      background: #fff;
      box-shadow: 0 0 15px #ccc;
      height: 100%;
      width: 490px;
      height: 100%;
      width: 490px;
      border: 1px solid #ccc;
      position: relative;
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      .name-nav {
        margin-right: 10px;
      }
      .name-text {
        .el-form-item {
          margin: 0;
          .el-form-item__content {
            margin: 0 !important;
            .el-form-item__error {
              z-index: 999;
              width: 100px;
              top: 61%;
            }
            .el-input {
              input {
                padding: 0;
              }
            }
          }
        }
      }
      .left-logo {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 50px solid rgba(247, 40, 50, 1);
        border-right: 50px solid transparent;
      }
      .logo-text {
        color: #fff;
        font-size: 20px;
        position: absolute;
        top: 3px;
        left: 5px;
      }
      .left-nav {
        height: 36px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          cursor: pointer;
          height: 25px;
          margin-right: 10px;
        }
      }
      .left-info {
        height: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left-name {
          height: 100%;
          width: 180px;
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            width: 80px;
            margin-left: 10px;
            input {
              padding: 0;
            }
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
        }
      }
      .left-phone {
        height: 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .left-name {
          height: 100%;
          width: 180px;
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            text-indent: 10px;
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            display: flex;
            .left {
              flex: 1;
              input {
                padding: 0;
                border-radius: 0;
              }
            }
          }
        }
      }
      .left-area {
        height: 38px;
        margin-top: 20px;
        .left-name {
          border-bottom: 1px solid rgba(93, 93, 93, 0.1);
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 470px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
            // transform: scale(0.8);
            transform: translateY(2px);
            overflow: hidden;
            .address {
              display: flex;
              width: 380px;
              select {
                text-align: center;
                padding: 0;
              }
            }
          }
        }
      }
      .left-detail {
        height: 38px;
        .left-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 450px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          border-bottom: 1px solid rgba(244, 244, 244, 1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
          }
        }
      }
      .left-index {
        height: 38px;
        .left-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 450px;
          height: 100%;
          margin-left: 20px;
          margin-right: 20px;
          border-bottom: 1px solid rgba(93, 93, 93, 0.1);
          .name-logo {
            color: rgba(252, 29, 26, 1);
            margin-top: 6px;
            margin-right: 5px;
          }
          .name-nav {
            width: 64px;
            display: inline-block;
            text-align-last: justify;
          }
          .name-text {
            flex: 1;
          }
        }
      }
      .left-btn {
        height: 38px;
        width: 450px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn-box {
          margin-right: 10px;
          color: #fff;
          border-radius: 3px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .box1 {
          background: rgba(139, 200, 63, 1);
          width: 100px;
        }
        .box2 {
          background: rgba(139, 200, 63, 1);
          width: 80px;
        }
        .box3 {
          background: rgba(252, 207, 0, 1);
          width: 80px;
        }
      }
    }
    .address-img {
      text-align: center;
      flex: 1;
    }
  }
  .product-information {
    background: #fff;
    box-shadow: 0 0 15px #ccc;
    margin: 0 20px 0 20px;
    height: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .info-left {
      width: 300px;
      height: 180px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .info-list1 {
        margin-top: 18px;
      }
      .info-list4 {
        margin-bottom: 18px;
      }
      .info-list {
        height: 30px;
        width: 260px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(244, 244, 244, 1);
        .name-logo {
          color: red;
          width: 10px;
          margin-top: 6px;
          margin-right: 5px;
        }
        .name-nav {
          width: 80px;
          display: inline-block;
          text-align-last: justify;
        }
        .name-text {
          width: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(93, 93, 93, 1);
          .el-form-item {
            margin: 0;
            .el-form-item__content {
              .el-form-item__error {
                z-index: 99;
                left: 15px;
                top: 66%;
              }
            }
          }
        }
      }
    }
    .info-mid {
      width: 320px;
      height: 180px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .mid-text {
        width: 120px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .mid-box {
        background: #fff;
        border: 1px solid #ccc;
        height: 150px;
        width: 140px;
        padding-left: 16px;
        .wrapper {
          height: 135px;
        }
        .addSize {
          .el-dialog__wrapper {
            .el-dialog__header {
              background-color: #fccf00;
              .el-dialog__title {
                color: #fff;
              }
            }
            .el-dialog__body {
              display: flex;
              input {
                width: 25%;
                border-right: 1px solid #e0e0e0;
                border-bottom: 1px solid #e0e0e0;
                margin-right: 10px;
                -moz-appearance: textfield;
                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }
          }
        }
      }
      img {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .info-right {
      width: 300px;
      height: 100px;
      margin-top: -40px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .info-list {
        height: 30px;
        width: 260px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(244, 244, 244, 1);
        .name-logo {
          color: red;
          width: 10px;
          margin-top: 6px;
          margin-right: 5px;
        }
        .name-nav {
          width: 80px;
          display: inline-block;
          text-align-last: justify;
        }
        .name-text {
          width: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(93, 93, 93, 1);
        }
      }
      .mark {
        display: flex;
      }
    }
  }
  .product-pre {
    background: #fff;
    box-shadow: 0 0 15px #ccc;
    margin: 0 20px 0 20px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
      margin-left: 40px;
      border: none;
      height: 40px;
      border-bottom: 1px solid rgba(244, 244, 244, 1) !important;
    }
    .product-preindex {
      margin-left: 460px;
      width: 130px;
      height: 30px;
      border-radius: 3px;
      background: rgba(252, 207, 0, 1);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 5px 5px 5px rgba(244, 244, 244, 1);
    }
    .product-preindex:hover {
      background: rgba(252, 207, 0, 0.8);
    }
  }
  .product-con {
    background: #fff;
    box-shadow: 0 0 15px #ccc;
    margin: 0 20px 0 20px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .con-nav {
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid rgba(244, 244, 244, 1);
      width: 100%;
      .icon {
        margin: 0 10px;
        cursor: pointer;
        &.active {
          color: #8cc63f;
        }
      }
      .con-select {
        transform: scale(0.6);
        margin-left: 40px;
        cursor: pointer;
      }
    }
    .con-change {
      height: 100px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .con-text {
        margin-left: 40px;
        color: rgba(93, 93, 93, 1);
      }
      .con-btn {
        width: 130px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(252, 207, 0, 1);
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 380px;
        box-shadow: 5px 5px 5px rgba(244, 244, 244, 1);
      }
      .con-btn:hover {
        background: rgba(252, 207, 0, 0.8);
      }
    }
  }
  .product-cost {
    background: #fff;
    box-shadow: 0 0 15px #ccc;
    margin: 0 20px 0 20px;
    height: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cost-content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid rgba(244, 244, 244, 1);
      height: 240px;
      width: 100%;
      .cost-list {
        margin: 10px 0;
        width: 88%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .cost-item {
          color: rgba(93, 93, 93, 1);
          margin-right: 30px;
        }
        .cost-num {
          width: 90px;
          text-align-last: justify;
        }
        .cost-line {
          width: 745px;
          border-bottom: 1px dotted #e0e0e0;
        }
      }
    }
    .cost-sum {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 80px;
      justify-content: flex-end;
      .sum-text {
        width: 70px;
        display: inline-block;
        text-align-last: justify;
      }
      .sum-num {
        color: rgba(252, 207, 0, 1);
        margin-right: 70px;
        margin-left: 30px;
        font-size: 18px;
      }
    }
  }
  .product-complete {
    margin-bottom: 200px;
    display: flex;
    padding-top: 30px;
    .back-complete {
      margin-left: 40px;
      flex: 1;
      display: flex;
      height: 100%;
      .goback {
        cursor: pointer;
      }
      .gokeep {
        margin-left: 40px;
        box-shadow: 4px 4px 4px #e0e0e0;
        button {
          padding: 6px 30px;
        }
      }
    }
    .cost-complete {
      flex: 1;
      text-align: right;
      padding-right: 100px;
      button {
        padding: 6px 80px;
        box-shadow: 4px 4px 4px #e0e0e0;
      }
    }
  }
}
</style>
<style lang="scss">
.li-product-write {
  select,
  input {
    border: none;
    outline: none;
  }
}
</style>
