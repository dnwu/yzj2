<template>
  <div class="address">
    <div class="head">
      <div class="search">
        <div class="title">地址簿</div>
        <div class="receive" :class="addressType=='receive'?'active':''" @click="toggleTableData('receive')">收</div>
        <div class="send" :class="addressType=='send'?'active':''" @click="toggleTableData('send')">发</div>
        <div class="input"><i class="el-icon-search"></i><el-input @keyup.native="filterName" v-model="searchkey" placeholder="收发货人"></el-input></div>
      </div>
      <!-- 添加地址信息模态框 -->
      <div class="add">
        <el-button type="warning" @click="newAddressModel = true">新增地址</el-button>
        <!-- 添加地址弹出窗 -->
        <el-dialog :visible.sync="newAddressModel">
          <div class="head"><img src="../../../assets/addAddress_icon.png" alt="">添加地址</div>
          <div class="main">
            <!-- <div class="box addressCode">
              <div class="title">地址编码</div>
              <div class="code">F1234</div>
            </div> -->
            <el-form :model="newAddressData" :rules="newAddress" ref="newAddress" class="newAddress">
              <div class="box addressType">
                <div class="title">地址类型</div>
                <div class="type">
                  <div class="receive" :class="newAddressData['type']=='receive'?'active':''" @click="newAddressData['type']='receive'">收</div>
                  <div class="send" :class="newAddressData['type']=='send'?'active':''"  @click="newAddressData['type']='send'">发</div>
                </div>
              </div>
              <div class="message">
                <div class="row">
                  <div class="name">
                    <div class="title">姓名</div>
                      <el-form-item prop="name">
                        <el-input v-model="newAddressData.name" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                  </div>
                  <div class="id">
                    <div class="title">身份证</div>
                    <el-input v-model="newAddressData.id" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div class="row">
                  <div class="phone">
                    <div class="title">手机号</div>
                    <el-form-item prop="phone">
                      <el-input v-model="newAddressData.phone" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </div>
                  <div class="cellPhone">
                    <div class="title">固定电话</div>
                    <el-input class="front" v-model="newAddressData.cellPhoneF" placeholder="区号"></el-input>
                    <el-input class="behind" v-model="newAddressData.cellPhoneB" placeholder="号码"></el-input>
                  </div>
                </div>
              </div>
              <div class="box address">
                <div class="title">所在区域</div>
                <v-distpicker @province='province' @city="city" @area="area" :province='newAddressData.province' :city='newAddressData.city' :area='newAddressData.area'></v-distpicker>
              </div>
              <div class="addressDetial">
                <div class="title">详细地址</div>
                <el-input v-model="newAddressData.addressDetial" placeholder="请输入内容"></el-input>
              </div>
              <div class="postalnum">
                <div class="title">邮政编码</div>
                <el-input v-model="newAddressData.postalnum" placeholder="请输入内容"></el-input>
              </div>
              <div class="saveSubmit"><el-button type="warning" @click="saveAddress('newAddress')">保存地址</el-button></div>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <!-- 修改地址信息模态框 -->
      <div class="reset">
        <!-- 添加地址弹出窗 -->
        <el-dialog :visible.sync="resetAddressModel">
          <div class="head"><img src="../../../assets/addAddress_icon.png" alt="">编辑地址</div>
          <div class="main">
            <!-- <div class="box addressCode">
              <div class="title">地址编码</div>
              <div class="code">F1234</div>
            </div> -->
            <el-form :model="resetAddressData" :rules="resetAddress" ref="resetAddress" class="resetAddress">
              <div class="box addressType">
                <div class="title">地址类型</div>
                <div class="type">
                  <div class="receive" :class="resetAddressData['type']=='receive'?'active':''" @click="resetAddressData['type']='receive'">收</div>
                  <div class="send" :class="resetAddressData['type']=='send'?'active':''"  @click="resetAddressData['type']='send'">发</div>
                </div>
              </div>
              <div class="message">
                <div class="row">
                  <div class="name">
                    <div class="title">姓名</div>
                      <el-form-item prop="name">
                        <el-input v-model="resetAddressData.name" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                  </div>
                  <div class="id">
                    <div class="title">身份证</div>
                    <el-input v-model="resetAddressData.id" placeholder="请输入身份证"></el-input>
                  </div>
                </div>
                <div class="row">
                  <div class="phone">
                    <div class="title">手机号</div>
                    <el-form-item prop="phone">
                      <el-input v-model="resetAddressData.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                  </div>
                  <div class="cellPhone reset-cellPhone">
                    <div class="title">固定电话</div>
                    <el-input class="front" v-model="resetAddressData.cellPhone" placeholder="固定电话"></el-input>
                    <!-- <el-input class="behind" v-model="resetAddressData.cellPhoneB" placeholder="号码"></el-input> -->
                  </div>
                </div>
              </div>
              <div class="box address reset-address">
                <div class="title">所在区域</div>
                <v-distpicker
                  v-show="resetAddressData.edit"
                  @province='resetProvince'
                  @city="resetCity"
                  @area="resetArea"
                  :province='resetAddressData.province'
                  :city='resetAddressData.city'
                  :area='resetAddressData.area'>
                </v-distpicker>
                <el-input :disabled="true" v-show="!resetAddressData.edit" v-model="resetAddressData.region" placeholder="请输入内容"></el-input>
                <div class="toggleEdit el-icon-edit" v-show="!resetAddressData.edit" @click="toggleEdit"></div>
              </div>
              <div class="addressDetial">
                <div class="title">详细地址</div>
                <el-input v-model="resetAddressData.addressDetial" placeholder="请输入详细地址"></el-input>
              </div>
              <div class="postalnum">
                <div class="title">邮政编码</div>
                <el-input v-model="resetAddressData.postalnum" placeholder="请输入邮政编码"></el-input>
              </div>
              <div class="saveSubmit"><el-button type="warning" @click="saveNewAddress('resetAddress')">确认修改地址</el-button></div>
            </el-form>
          </div>
        </el-dialog>
      </div>
      <div class="remove">
        <div class="select" v-show="editStatus">
          <el-button @click="toggle()" type="danger">选择</el-button>
        </div>
        <div class="cancelSelect" v-show="!editStatus">
          <el-button type="info" @click="removeAddress">删除</el-button>
          <el-button type="danger"  @click="toggle()">取消选择</el-button>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="head wrapper">
        <div class="addresstype">
          <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">
              地址类型<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="all">全部</el-dropdown-item>
              <el-dropdown-item command="receive">收</el-dropdown-item>
              <el-dropdown-item command="send">发</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div class="number">编号</div> -->
        <div class="name">姓名</div>
        <div class="phone">手机号码</div>
        <div class="cellPhone">固定电话</div>
        <div class="id">身份证号码</div>
        <div class="address">所在地区</div>
        <div class="addressDetial">详细地址</div>
        <div class="postalcode">邮政编码</div>
      </div>
      <!-- 删除地址模态框 -->
      <div class="removeAddressModel">
        <el-dialog width='500px' title="删除选中地址" :visible.sync="removeAddressModel">
          <p>是否删除选中的<span>{{removeAddressNo}}</span>条记录</p>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" size="mini" @click="removeAddressModel = false">取 消</el-button>
            <el-button type="warning" size="mini" @click="removeAddressSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div @click="selectItem(index)" class="body wrapper" v-for="(item,index) in newAddressList" :key='index'>
        <div class="addresstype">
          <img :src="getAddressTypeImg(item.type)" alt="">
        </div>
        <!-- <div class="number">{{item.number}}</div> -->
        <div class="name">{{item.contactName}}</div>
        <div class="phone">{{item.contactMobile}}</div>
        <div class="cellPhone">{{item.contactPhone}}</div>
        <div class="id">{{item.identityCard}}</div>
        <div class="address">{{item.region}}</div>
        <div class="addressDetial">{{item.detailAddress}}</div>
        <div class="postalcode">{{item.postCode}}<i v-show="editStatus" @click="editAddress(item)" class="el-icon-edit-outline"></i><i class="deleticon" v-show="!editStatus&&newAddressList[index].remove"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import { mapGetters } from "vuex";
import {logout} from '@/tools/logout'
export default {
  mixins:[logout],
  components: {
    VDistpicker
  },
  data() {
    return {
      newAddressData: {
        type: "receive",
        name: "",
        id: "",
        phone: "",
        cellPhoneF: "", // 区号
        cellPhoneB: "", // 号码
        province: "",
        city: "",
        area: "",
        addressDetial: "",
        postalnum: ""
      },
      newAddressModel: false,
      resetAddressData:{
        edit:false,
        region:'',
        type: "receive",
        name: "",
        id: "",
        addressId:'',
        phone: "",
        cellPhone: "", // 区号
        province: "",
        city: "",
        area: "",
        addressDetial: "",
        postalnum: ""
      },
      resetAddressModel:false,
      newAddress: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      resetAddress: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      searchkey: "",
      editStatus: true,
      addressTypeImg: {
        receive: require("../../../assets/type1.png"), // 收
        send: require("../../../assets/type2.png") // 发
      },
      // selectType: true,
      addressType: "all", //  all , send , receive
      sendAddressList: [],
      receiveAddressList: [],
      newAddressList:[],
      storeRemoveAddress: [], // 储存要删除地址的id和type
      removeAddressModel: false, // 删除地址模态框控制显示
      removeAddressNo: 0, //删除地址的个数
      counter: 0,         //计数器，计算删除地址成功的个数
    };
  },
  mounted() {
    this.getSendAddressList();
    this.getReceiveAddressList();

  },
  methods: {
    province(data) {
      this.newAddressData.province = data.value == '省'?'':data.value;
    },
    city(data) {
      this.newAddressData.city = data.value == '市'?'':data.value;
    },
    area(data) {
      this.newAddressData.area = data.value == '区'?'':data.value;
    },
    resetProvince(data){
      this.resetAddressData.province = data.value == '省'?'':data.value;
    },
    resetCity(data){
      this.resetAddressData.city = data.value == '市'?'':data.value;
    },
    resetArea(data){
      this.resetAddressData.area = data.value == '区'?'':data.value;
    },
    saveAddress(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.newAddressData.type == "send") {
            var addressType = 0;
          } else if (this.newAddressData.type == "receive") {
            var addressType = 1;
          }
          this.axios
            .post("/app/v1/address/addAddress", {
              addressId: 0,
              addressType: addressType,
              contactMobile: this.newAddressData.phone,
              contactName: this.newAddressData.name,
              contactPhone:
                this.newAddressData.cellPhoneF + this.newAddressData.cellPhoneB,
              detailAddress: this.newAddressData.addressDetial,
              id: this.id,
              identityCard: this.newAddressData.id,
              postCode: this.newAddressData.postalnum,
              region:
                this.newAddressData.province +
                this.newAddressData.city +
                this.newAddressData.area,
              token: this.token
            })
            .then(data => {
              if (data.data.code == 1) {
                this.newAddressList = []
                this.newAddressModel = false;
                this.getReceiveAddressList();
                this.getSendAddressList();
              }
              if (data.data.code == 10110) {
                this.this.$message({
                  message: "身份证格式错误",
                  type: "warning"
                });
              }
              if (data.data.code == 10101) {
                if (data.data.code == 10110) {
                  this.this.$message({
                    message: "手机号格式错误",
                    type: "warning"
                  });
                }
              }
              if (data.data.code == 10001) {
                this.$message.error("登录已失效，请重新登录");
                setTimeout(() => {
                  this.logout()
                }, 2000);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggleEdit(){
      this.resetAddressData.edit=!this.resetAddressData.edit
    },
    editAddress(item){
      this.resetAddressData.edit = false
      if(item.type == 0){
        this.resetAddressData.type = 'send'
      }else if(item.type == 1){
        this.resetAddressData.type = 'receive'
      }
      this.resetAddressData.name =item.contactName
      this.resetAddressData.id =item.identityCard
      this.resetAddressData.addressId =item.id
      this.resetAddressData.phone =item.contactMobile
      this.resetAddressData.cellPhone =item.contactPhone
      this.resetAddressData.region =item.region
      this.resetAddressData.addressDetial =item.detailAddress
      this.resetAddressData.postalnum =item.postCode
      this.resetAddressModel=true
    },
    saveNewAddress(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.resetAddressData.type == "send") {
            var addressType = 0;
          } else if (this.resetAddressData.type == "receive") {
            var addressType = 1;
          }
          if(this.resetAddressData.edit == false){
            var address = this.resetAddressData.region
          }else if(this.resetAddressData.edit == true){
            var address = this.resetAddressData.province +this.resetAddressData.city +this.resetAddressData.area
          }
          this.axios
            .post("/app/v1/address/updateAddress", {
              addressId: this.resetAddressData.addressId,
              addressType: addressType,
              contactMobile: this.resetAddressData.phone,
              contactName: this.resetAddressData.name,
              contactPhone:this.resetAddressData.cellPhone,
              detailAddress: this.resetAddressData.addressDetial,
              id: this.id,
              identityCard: this.resetAddressData.id,
              postCode: this.resetAddressData.postalnum,
              region:address,
              token: this.token
            })
            .then(data => {
              console.log(data);
              if (data.data.code == 1) {
                this.newAddressList = []
                this.resetAddressModel = false;
                this.getReceiveAddressList();
                this.getSendAddressList();
                // this.toggleTableData('all')
              }
              if (data.data.code == 10110) {
                this.this.$message({
                  message: "身份证格式错误",
                  type: "warning"
                });
              }
              if (data.data.code == 10101) {
                if (data.data.code == 10110) {
                  this.this.$message({
                    message: "手机号格式错误",
                    type: "warning"
                  });
                }
              }
              if (data.data.code == 10001) {
                this.$message.error("登录已失效，请重新登录");
                setTimeout(() => {
                  this.logout()
                }, 2000);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeAddress() {
      this.storeRemoveAddress = [];

      this.newAddressList.forEach(ele => {
        if (ele.remove == true) {
          this.storeRemoveAddress.push({
            addressId: ele.id,
            addressType: ele.type
          });
        }
      });
      this.removeAddressNo = this.storeRemoveAddress.length;
      if(this.removeAddressNo == 0){
        this.$message('您并没有选择要删除的地址！');
        return
      }
      this.removeAddressModel = true;
    },
    removeAddressSubmit() {

      this.storeRemoveAddress.forEach(ele => {
        this.axios
          .post("/app/v1/address/deleteAddress", {
            addressId: ele.addressId,
            addressType: ele.addressType,
            id: this.id,
            token: this.token
          })
          .then(data => {
            this.removeAddressModel = false;
            if (data.data.code == 10001) {
              this.$message.error("登录已失效，请重新登录");
              setTimeout(() => {
                this.logout()
              }, 2000);
            }
            if (data.data.code == 1) {
              this.counter++

            } else {
              this.editStatus = true;
              this.$message({
                message: "删除地址失败",
                type: "error"
              });
            }
          });
      });
    },
    getSendAddressList() {
      // this.newAddressList = []
      this.axios
        .post("/app/v1/address/queryAddress", {
          addressId: 0,
          addressType: 0,
          id: this.id,
          token: this.token
        })
        .then(data => {
          if (data.data.code == 1) {
            this.sendAddressList = data.data.data;
            let length = this.sendAddressList.senderList.length;
            for (let i = 0; i < length; i++) {
              this.$set(this.sendAddressList.senderList[i], "remove", false);
            }
            this.newAddressList.push(...this.sendAddressList.senderList)
          }
          if (data.data.code == 10001) {
            this.$message.error("登录已失效，请重新登录");
            setTimeout(() => {
              this.logout()
            }, 2000);
          }
        });
    },
    getReceiveAddressList() {
      // this.newAddressList = []
      this.axios
        .post("/app/v1/address/queryAddress", {
          addressId: 0,
          addressType: 1,
          id: this.id,
          token: this.token
        })
        .then(data => {
          if (data.data.code == 1) {
            this.receiveAddressList = data.data.data;
            let length = this.receiveAddressList.receiverList.length;
            for (let i = 0; i < length; i++) {
              this.$set(this.receiveAddressList.receiverList[i],"remove",false);
            }
            this.newAddressList.push(...this.receiveAddressList.receiverList)
          }
          if (data.data.code == 10001) {
            this.$message.error("登录已失效，请重新登录");
            setTimeout(() => {
              this.logout()
            }, 2000);
          }
        });
    },
    filterName(){
      // hh是标记，任意值都可以，作用是在toggleTableData函数中不是this.searchkey赋值为空
      this.toggleTableData(this.addressType,'hh')
      // var addressList = [...this.sendAddressList.senderList,...this.receiveAddressList.receiverList]
      var addressList = [...this.newAddressList]
      this.newAddressList = []
      addressList.forEach(ele=>{
        if(ele.contactName.indexOf(this.searchkey) != -1){
          this.newAddressList.push(ele)
        }
      })
    },
    toggle() {
      if (this.editStatus == false) {
        this.resetEditStatus()
      }
      this.editStatus = !this.editStatus;
    },
    resetEditStatus(){
      let length = this.newAddressList.length;
      for (let i = 0; i < length; i++) {
        this.newAddressList[i]["remove"] = false;
      }
    },
    handleCommand(command) {
      // this.$message("click on item " + command);
      this.editStatus = true
      this.resetEditStatus()
      this.addressType = command;
      this.toggleTableData(command)
    },
    getAddressTypeImg(type) {
      if (type == "1") {
        return this.addressTypeImg.receive;
      }
      if (type == "0") {
        return this.addressTypeImg.send;
      }
    },
    selectItem(index) {
      if (this.editStatus) {
        return;
      }
      this.newAddressList[index].remove = !this.newAddressList[index].remove;
    },
    toggleTableData(type,mark) {
      this.newAddressList = []
      this.editStatus = true
      this.resetEditStatus()
      if(mark == undefined){
        this.searchkey = ''
      }
      this.addressType = type
      if (this.addressType == "all") {
        if (
          "senderList" in this.sendAddressList &&
          "receiverList" in this.receiveAddressList
        ) {
          this.newAddressList.push(...[...this.sendAddressList.senderList,...this.receiveAddressList.receiverList])
        }
        // console.log(this.newAddressList);
      }
      if (this.addressType == "receive") {
        let newTableData = [];
        this.receiveAddressList.receiverList.forEach(element => {
          if (element.type == "1") {
            newTableData.push(element);
          }
        });
        this.newAddressList.push(...newTableData)
      }
      if (this.addressType == "send") {
        let newTableData = [];
        this.sendAddressList.senderList.forEach(element => {
          if (element.type == "0") {
            newTableData.push(element);
          }
        });
        this.newAddressList.push(...newTableData)
      }
    }
  },
  computed: {
    ...mapGetters(["id", "token"]),
  },
  watch: {
    counter:{
      handler(newValue, oldValue) {
　　　　console.log(newValue)
        if(newValue == this.removeAddressNo){
          this.counter = 0
          this.$message({
            message: `成功删除${this.removeAddressNo}条地址`,
            type: "success"
          });
          this.editStatus = true;
          this.newAddressList = []
          this.getSendAddressList();
          this.getReceiveAddressList();
          this.addressType = 'all'
        }
　　　},
　　　deep: true
    }
  }
};
</script>
<style lang="scss">
.address {
  .head {
    height: 61px;
    display: flex;
    .search {
      display: flex;
      flex: 1;
      line-height: 61px;
      align-items: center;
      .title {
        width: 100px;
        text-align: center;
        color: #b3b3b3;
      }
      .receive,.send{
        margin-right:20px;
        width: 25px;
        height: 25px;
        line-height: 26px;
        color: #fff;
        border-radius: 50%;
        background-color: #c0c0c0;
        padding-left: 6px;
        box-sizing: border-box;
        cursor: pointer;
        &.active{
          background-color: red;
        }
      }
      .input {
        flex: 1;
        display: flex;
        position: relative;
        i {
          position: absolute;
          top: 20px;
          left: 5px;
          font-size: 18px;
          z-index: 99;
        }
        .el-input__inner {
          height: 30px;
          padding-left: 26px;
        }
      }
    }
    .add,.reset {
      line-height: 61px;
      flex: 1;
      text-align: center;
      .el-button {
        width: 160px;
        padding: 8px 20px;
        box-shadow: 0 4px 4px #e0e0e0;
      }
      .el-dialog__wrapper {
        .el-dialog__header {
          padding: 0;
          .el-dialog__headerbtn {
            top: 6px;
          }
          .el-dialog__headerbtn .el-dialog__close {
            color: #fff;
            font-size: 30px;
          }
        }
        .el-dialog__body {
          padding: 0;
          .head {
            height: 40px;
            background-color: #fccf00;
            line-height: 40px;
            font-size: 20px;
            color: #fff;
            img {
              transform: translateY(5px);
              width: 30px;
              height: 30px;
              margin-left: 10px;
              margin-right: 10px;
            }
          }
          .main {
            padding: 20px;
            .box {
              display: flex;
              margin: 10px 0;
              .title {
                width: 100px;
                margin-right: 40px;
                text-align: justify;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 100%;
                  overflow: hidden;
                  height: 0;
                }
              }
            }
            // .addressCode {
            //   .code {
            //     color: #f52831;
            //     font-weight: 700;
            //     font-size: 16px;
            //   }
            // }
            .addressType {
              .type {
                flex: 1;
                display: flex;
                .receive,
                .send {
                  width: 40px;
                  height: 40px;
                  background-color: #e6e6e6;
                  border-radius: 50%;
                  line-height: 40px;
                  transform: translateY(-6px);
                  margin: 0 10px;
                  color: #fff;
                  cursor: pointer;
                }
                .receive.active,
                .send.active {
                  background-color: #f52831;
                }
              }
            }
            .message {
              .row {
                display: flex;
                .name,
                .id,
                .phone,
                .cellPhone {
                  flex: 1;
                  position: relative;
                  padding-right: 40px;
                  .el-input {
                    input {
                      border: none;
                      border-bottom: 1px solid #f0f0f0;
                      padding-left: 120px;
                    }
                  }
                  .title {
                    position: absolute;
                    top: 10px;
                    left: 0px;
                    z-index: 99;
                    width: 100px;
                    text-align-last: justify;
                  }
                  .el-form-item__error {
                    left: 120px;
                  }
                }
                .cellPhone {
                  display: flex;
                  .el-input {
                    width: 50%;
                  }
                  .front {
                    position: relative;
                    &::after {
                      content: "";
                      display: inline-block;
                      width: 1px;
                      height: 50%;
                      background-color: #e0e0e0;
                      position: absolute;
                      top: 10px;
                      right: 0;
                    }
                  }
                  .behind {
                    input {
                      padding-left: 20px;
                    }
                  }
                }
                // 地址编辑框中的reset-cellPhone
                .reset-cellPhone{
                  .front{
                    flex: 1;
                    &::after{
                      content:'';
                      display:none;
                    }
                  }
                }
              }
            }
            .box.address {
              width: 80%;
              border-bottom: 1px solid #e0e0e0;
              select {
                border: none;
                outline: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              }
              .title {
                transform: translateY(8px);
              }
            }
            // 地址编辑框中的reset-address
            .reset-address{
              .title{
                margin-right: 20px;
              }
              .el-input{
                flex: 1;
                input{
                  border: none;
                  background-color: #fff;
                  color: #5a5e66;
                }
              }
              .toggleEdit{
                width: 100px;
                font-size: 20px;
                line-height: 40px;
                cursor: pointer;
              }
            }
            .addressDetial,
            .postalnum {
              position: relative;
              .el-input {
                input {
                  border: none;
                  border-bottom: 1px solid #e0e0e0;
                  padding-left: 120px;
                }
              }
              .title {
                position: absolute;
                top: 10px;
                left: 0;
                z-index: 99;
                width: 100px;
                text-align: justify;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 100%;
                  overflow: hidden;
                  height: 0;
                }
              }
            }
            .saveSubmit {
              margin-top: 20px;
            }
          }
        }
      }
    }
    .remove {
      flex: 1;
      .select {
        line-height: 61px;
        text-align: right;
        .el-button {
          width: 100px;
          padding: 5px 20px;
          box-shadow: 0 4px 4px #e0e0e0;
        }
      }
      .cancelSelect {
        line-height: 61px;
        text-align: right;
        .el-button {
          width: 100px;
          padding: 5px 20px;
          box-shadow: 0 4px 4px #e0e0e0;
        }
      }
    }
  }
  .table {
    padding: 20px 30px 0 30px;
    .wrapper {
      // display: grid;
      // grid-template-columns: 80px 80px 80px repeat(5, 1fr);
      display: flex;
      .addresstype{
        width: 80px;
      }
      .name{
        width: 80px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .phone{
        width: 80px;
      }
      .cellPhone{
        width: 150px;
      }
      .id{
        width: 200px;
      }
      .address{
        width: 250px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .addressDetial{
        width: 250px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .postalcode{
        width: 150px;
      }
    }
    .head {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .removeAddressModel {
      .el-dialog {
        .el-dialog__header {
          background-color: #fccf00;
        }
        .el-dialog__body {
          padding: 10px 20px;
          p {
            text-align: center;
            color: #0b0b0b;
            font-size: 18px;
            span {
              color: #f52831;
              margin: 0 4px;
            }
          }
        }
      }
    }
    .body {
      background-color: #fff;
      margin-bottom: 10px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      .addresstype {
        img {
          transform: translateY(8px);
        }
      }
      i {
        margin-left: 20px;
        cursor: pointer;
      }
      .postalcode {
        position: relative;
        i {
          position: absolute;
        }
        .el-icon-edit-outline {
          top: 12px;
          right: 10px;
        }
        .deleticon {
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border: 10px solid #fccf00;
          border-color: #fccf00 #fccf00 transparent transparent;
        }
      }
    }
  }
}
</style>
