<template>
  <div class="write-wrapper li-product-write">
    <div class="write-container">
      <div class="write-inner">
        <div class="write-content">
          <div class="content-pic"></div>
          <div class="list list1">
            <div class="list-text">订单编号:</div>
            <span class="list-num">464689648</span>
            <div class="write-back" @click="back" style="cursor:pointer;">返回上一步</div>
          </div>
          <div class="list list2">
            <div class="list-text">运输服务:</div>
            <span class="list-land">北京-上海</span>
            <span class="list-land"> 货物类型：普货</span>
            <span class="listTime">航班起飞时间：201-10:10 10:10&nbsp;&nbsp;─&nbsp;&nbsp;201-10:10 10:10</span>
          </div>
          <div class="list list3">
            <div class="list-text">基础服务:</div>
            <span class="list-land"><product-select class="product-select"></product-select>航空运输</span>
          </div>
          <div class="list list4">
            <div class="list-text">更多服务:</div>
            <span class="list-land"><product-select @increment='crement' class="product-select"></product-select>代交货</span>
            <span class="list-land"><product-select class="product-select"></product-select>代提交</span>
            <span class=" list-land"><product-select class="product-select"></product-select>上门取货</span>
            <span class="list-land"><product-select  class="product-select"></product-select>落地配</span>
          </div>
          <div class="list list5">
            <div class="list-text">增值服务:</div>
            <span class="list-land"><product-select class="product-select"></product-select>报关报检</span>
            <span class="list-land"><product-select class="product-select"></product-select>运输保险</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-title">收发地址</div>
    <div class="product-address">
      <div class="address-left">
        <div class="left-logo"></div>
        <div class="logo-text">发</div>
        <div class="left-nav">
          <img src="../../../assets/product17.png">
        </div>
        <div class="left-info">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">姓名</span>
            <span class="name-text"><el-input size="mini" v-model="sendAddressData.name" placeholder="请输入姓名"></el-input></span>
          </div>
          <div class="right-name">
            <span class="name-nav">身份证</span>
            <span class="name-text"><el-input size="mini" v-model="sendAddressData.id" placeholder="请输入身份证"></el-input></span>
          </div>
        </div>
        <div class="left-phone">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">手机号</span>
            <span class="name-text"><el-input size="mini" v-model="sendAddressData.mobile" placeholder="请输入手机号"></el-input></span>
          </div>
          <div class="right-name">
            <span class="name-nav">固定电话</span>
            <span class="name-text">
              <el-input class="left" size="mini" v-model="sendAddressData.tellPhone1" placeholder="888"></el-input>
              <el-input class="right" size="mini" v-model="sendAddressData.tellPhone2" placeholder="88886666"></el-input>
            </span>
          </div>
        </div>
        <div class="left-area">
          <div class="left-name">
            <span class="name-logo">&nbsp;</span>
            <span class="name-nav">所在区域</span>
            <span class="name-text"><v-distpicker  :province="sendAddressData.address.province" :city="sendAddressData.address.city" :area="sendAddressData.address.area"></v-distpicker></span>
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
            <span class="name-logo">*</span>
            <span class="name-nav">邮编</span>
            <span class="name-text"><el-input size="mini" v-model="sendAddressData.postal" placeholder="请输入邮编"></el-input></span>
          </div>
        </div>
        <div class="left-btn">
          <span class="btn-box box1">添加地址簿</span>
          <span class="btn-box box2">设为默认</span>
          <span class="btn-box box3">确定</span>
        </div>
      </div>
      <div class="address-img">
        <img src="../../../assets/product2.png">
      </div>
      <div class="address-right">
        <div class="left-logo"></div>
        <div class="logo-text">收</div>
        <div class="left-nav">
          <img src="../../../assets/product17.png">
        </div>
        <div class="left-info">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">姓名</span>
            <span class="name-text"><el-input size="mini" v-model="receiveAddressData.name" placeholder="请输入姓名"></el-input></span>
          </div>
          <div class="right-name">
            <span class="name-nav">身份证</span>
            <span class="name-text"><el-input size="mini" v-model="receiveAddressData.id" placeholder="请输入身份证"></el-input></span>
          </div>
        </div>
        <div class="left-phone">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">手机号</span>
            <span class="name-text"><el-input size="mini" v-model="receiveAddressData.mobile" placeholder="请输入手机号"></el-input></span>
          </div>
          <div class="right-name">
            <span class="name-nav">固定电话</span>
            <span class="name-text">
              <el-input class="left" size="mini" v-model="receiveAddressData.tellPhone1" placeholder="888"></el-input>
              <el-input class="right" size="mini" v-model="receiveAddressData.tellPhone2" placeholder="88886666"></el-input>
            </span>
          </div>
        </div>
        <div class="left-area">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">所在区域</span>
            <span class="name-text"><v-distpicker :province="receiveAddressData.address.province" :city="receiveAddressData.address.city" :area="receiveAddressData.address.area"></v-distpicker></span>
          </div>
        </div>
        <div class="left-detail">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">详细地址</span>
            <span class="name-text"><el-input size="mini" v-model="receiveAddressData.detailAddress" placeholder="请输入详细地址"></el-input></span>
          </div>
        </div>
        <div class="left-index">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">邮编</span>
            <span class="name-text"><el-input size="mini" v-model="receiveAddressData.postal" placeholder="请输入邮编"></el-input></span>
          </div>
        </div>
        <div class="left-btn">
          <span class="btn-box box1">添加地址簿</span>
          <span class="btn-box box2">设为默认</span>
          <span class="btn-box box3">确定</span>
        </div>
      </div>
    </div>
    <div class="product-title">货物信息</div>
    <div class="product-information">
      <div class="info-left">
        <div class="info-list info-list1">
          <span class="name-logo">*</span>
          <span class="name-nav">货物重量</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.weight" placeholder="请输入货物重量"></el-input></span>
          <span class="name-num">千克</span>
        </div>
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物件数</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.num" placeholder="请输入货物件数"></el-input></span>
          <span class="name-num">件</span>
        </div>
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物名称</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.name" placeholder="请输入货物名称"></el-input></span>
        </div>
        <div class="info-list info-list4">
          <span class="name-logo">*</span>
          <span class="name-nav">货物包装</span>
          <span class="name-text"><el-input size="mini" v-model="goodsInfo.pack" placeholder="请输入货物包装"></el-input></span>
        </div>
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
    <div class="product-title">活动信息</div>
    <div class="product-pre">
      <input type="" name="" placeholder="推荐人邀请码">
      <span class="product-preindex">验证</span>
    </div>
    <div class="product-title">发票信息</div>
    <div class="product-con">
      <div class="con-nav">
        <product-select class="con-select"></product-select>不需要发票<product-select class="con-select"></product-select>普票<product-select class="con-select"></product-select>专票
      </div>
      <div class="con-change">
        <span class="con-text">深圳市迅捷有限公司|3252365435234234</span>
        <span class="con-btn">修改</span>
      </div>
    </div>
    <div class="product-title">费用信息</div>
    <div class="product-cost">
      <div class="cost-content">
      <div class="cost-list cost-list1">
        <span class="cost-num">航空运费</span>
        <span class="cost-line"></span>
        <span class="cost-item">312</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">燃油附加费</span>
        <span class="cost-line"></span>
        <span class="cost-item">22</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">出港处置费</span>
        <span class="cost-line"></span>
        <span class="cost-item">33</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">出港制单费</span>
        <span class="cost-line"></span>
        <span class="cost-item">44</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">运岗提货费</span>
        <span class="cost-line"></span>
        <span class="cost-item">55</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">上门提货费</span>
        <span class="cost-line"></span>
        <span class="cost-item">66</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">派送费</span>
        <span class="cost-line"></span>
        <span class="cost-item">77</span>
      </div>
      </div>
      <div class="cost-sum">
        <span class="sum-text">合计</span>
        <span class="sum-num">88</span>
      </div>
    </div>
    <div class="product-complete">
      <div class="back-complete">
        <div class="goback" @click="completeGo">返回上一步</div>
        <div class="gokeep"><el-button size="mini" type="info">保存订单</el-button></div>
      </div>
      <div class="cost-complete" @click="confirm"><el-button size="mini" type="danger">提交</el-button></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import productSelect from "./product_select";
import VDistpicker from "v-distpicker";

export default {
  components: {
    productSelect,
    VDistpicker
  },
  data() {
    return {
      addSizeDialogFormVisible:false,
      addSizeDialogFormData:{
        length:'',
        width:'',
        height:'',
        num:''
      },
      sendAddressData:{
        name:'',
        id:'',
        mobile:'',
        tellPhone1:'',
        tellPhone2:'',
        address:{
          province: '省',
          city: '市',
          area: '区'
        },
        detailAddress:'',
        postal:''

      },
      receiveAddressData:{
        name:'',
        id:'',
        mobile:'',
        tellPhone1:'',
        tellPhone2:'',
        address:{
          province: '省',
          city: '市',
          area: '区'
        },
        detailAddress:'',
        postal:''

      },
      goodsInfo:{
        weight:'',
        num:'',
        name:'',
        pack:'',
        size:[
          '100*15*10/5',
        ],
        bulk:'',
        payWeight:'',
        mark:''
      }
    };
  },
  methods: {
    addGoodsSize(){
      console.log(typeof this.addSizeDialogFormData.length);
      if(!this.addSizeDialogFormData.length || !this.addSizeDialogFormData.width || !this.addSizeDialogFormData.height || !this.addSizeDialogFormData.num){
        return
      }
      var str = this.addSizeDialogFormData.length +'*'+ this.addSizeDialogFormData.width +'*'+ this.addSizeDialogFormData.height +'/'+ this.addSizeDialogFormData.num
      this.goodsInfo.size.push(str)
      this.addSizeDialogFormVisible = false
    },
    crement(data) {
      console.log(data);
    },
    completeGo() {
      this.$router.push("/center/Online_product");
    },
    back() {
      // this.$store.commit("minIndex");
      // this.$router.push("/center/Online_product");
    },
    confirm() {
      // this.$store.commit("getIndex");
      // this.$router.push("/center/Online_product/complete");
    }
  },

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
    .address-left {
      background: #fff;
      box-shadow: 0 0 15px #ccc;
      margin-left: 20px;
      height: 100%;
      width: 490px;
      position: relative;
      display: flex;
      flex-direction: column;
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
            margin-left: 20px;

            input{
              padding: 0;
            }
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          color: rgba(255, 220, 68, 1);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 220, 68, 0.3);
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
            input{
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
            text-indent: 10px;
            display: flex;
            .left{
              width: 45px;
              input{
                padding: 0;
                padding-right: 5px;
                border-right: 1px solid #e0e0e0;
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
          border-bottom: 1px solid #e0e0e0;
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
            transform: translateY(-2px);
            overflow: hidden;
            .address{
              display: flex;
              width: 380px;
              select{
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
            margin-left: 20px;
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
          border-bottom: 1px solid (244, 244, 244, 1);
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
            margin-left: 20px;
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
            margin-left: 20px;
            input{
              padding: 0;
            }
          }
        }
        .right-name {
          height: 100%;
          width: 220px;
          margin-right: 20px;
          color: rgba(255, 220, 68, 1);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 220, 68, 0.3);
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
            text-indent: 10px;
            display: flex;
            .left{
              width: 50px;
              input{
                padding: 0;
                border-radius: 0;
                border-right: 1px solid #e0e0e0;
              }
            }
          }
        }
      }
      .left-area {
        height: 38px;
        margin-top: 20px;
        .left-name {
          border-bottom: 1px solid #e0e0e0;
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
            transform: translateY(-2px);
            overflow: hidden;
            .address{
              display: flex;
              width: 380px;
              select{
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
            margin-left: 20px;
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
            margin-left: 20px;
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
        .wrapper{
          height: 135px;
        }
        .addSize{
          .el-dialog__wrapper{
            .el-dialog__header{
              background-color: #FCCF00;
              .el-dialog__title{
                color: #fff;
              }
            }
            .el-dialog__body{
              display: flex;
              input{
                width: 25%;
                border-right: 1px solid #e0e0e0;
                border-bottom: 1px solid #e0e0e0;
                margin-right: 10px;
                -moz-appearance:textfield;
                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button{
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
      .mark{
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
    justify-content: space-between;
    .cost-content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid rgba(244, 244, 244, 1);
      height: 240px;
      width: 100%;
      .cost-list1 {
        margin-top: 20px;
      }
      .cost-list {
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
        button{
          padding: 6px 30px;
        }
      }
    }
    .cost-complete{
      flex: 1;
      text-align: right;
      padding-right: 100px;
      button{
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
