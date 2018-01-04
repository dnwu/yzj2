<template>
  <div class="address-list">
    <div class="head">
      <div class="search">
        <div class="title">地址簿</div>
        <div class="receive active" @click="toggleTableData('receive')">{{address=='receive'?'收':'发'}}</div>
        <!-- <div class="send" :class="address=='send'?'active':''" @click="toggleTableData('send')">发</div> -->
        <div class="input"><i class="el-icon-search"></i><el-input @keyup.native="filterName" v-model="searchkey" placeholder="名字"></el-input></div>
      </div>
    </div>
    <div class="table">
      <div class="head wrapper">
        <div class="name">姓名</div>
        <div class="phone">手机号码</div>
        <div class="cellPhone">固定电话</div>
        <div class="id">身份证号码</div>
        <div class="address">所在地区</div>
        <div class="addressDetial">详细地址</div>
        <div class="postalcode">邮政编码</div>
      </div>
      <div @click="selectItem(item,address)" class="body wrapper" v-for="(item,index) in transAddressList" :key='index'>
        <div class="name">{{item.contactName}}</div>
        <div class="phone">{{item.contactMobile}}</div>
        <div class="cellPhone">{{item.contactPhone}}</div>
        <div class="id">{{item.identityCard}}</div>
        <div class="address">{{item.region}}</div>
        <div class="addressDetial">{{item.detailAddress}}</div>
        <div class="postalcode">{{item.postCode}}</div>
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
      searchkey: "",
      // editStatus: true,
      // selectType: true,
      // addressType: "all", //  all , send , receive
      addressList:[],
      transAddressList:[]
    };
  },
  props: {
    address:{
      type: String,
      required: true
    }
  },
  mounted() {
    this.getAddressList()
  },
  methods: {
    getAddressList(){
      this.addressList = []
      if(this.address == 'receive'){
        var addressType = 1
      }else if(this.address == 'send'){
        var addressType = 0
      }
      this.axios
        .post("/app/v1/address/queryAddress", {
          addressId: 0,
          addressType: addressType,
          id: this.id,
          token: this.token
        })
        .then(data => {
          if (data.data.code == 1) {
            if(this.address == 'receive'){
              this.addressList.push(...data.data.data.receiverList)
            }else if(this.address == 'send'){
              this.addressList.push(...data.data.data.senderList)
            }
            this.transAddressList = [...this.addressList]
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
      var addressList = [...this.addressList]
      this.transAddressList = []
      addressList.forEach(ele=>{
        if(ele.contactName.indexOf(this.searchkey) != -1){
          this.transAddressList.push(ele)
        }
      })
    },
    getAddressTypeImg(type) {
      if (type == "1") {
        return this.addressTypeImg.receive;
      }
      if (type == "0") {
        return this.addressTypeImg.send;
      }
    },
    selectItem(item,type) {
      this.$emit('getAddressItem',item,type)
    },
  },
  computed: {
    ...mapGetters(["id", "token"]),
  }
};
</script>
<style lang="scss">
.address-list {
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
      .receive{
        margin-right:20px;
        width: 25px;
        height: 25px;
        line-height: 26px;
        color: #fff;
        border-radius: 50%;
        background-color: #c0c0c0;
        padding-left: 2px;
        box-sizing: border-box;
        cursor: pointer;
        &.active{
          background-color: red;
        }
      }
      .input {
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
  }
  .table {
    padding: 20px 30px 30px 30px;
    .wrapper {
      display: flex;
      .name{
        width: 80px;
      }
      .phone{
        width: 100px;
      }
      .cellPhone{
        width: 100px;
      }
      .id{
        width: 150px;
      }
      .address{
        width: 300px;
      }
      .addressDetial{
        width: 300px;
      }
      .postalcode{
        flex: 1;
      }
    }
    .head {
      height: 40px;
      line-height: 40px;
      text-align: center;
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
