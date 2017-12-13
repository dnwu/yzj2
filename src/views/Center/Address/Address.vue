<template>
  <div class="address">
    <div class="head">
      <div class="search">
        <div class="title">地址簿</div>
        <div class="input"><i class="el-icon-search"></i><el-input v-model="searchkey" placeholder="请输入内容"></el-input></div>
      </div>
      <div class="add">
        <el-button type="warning" @click="dialogTableVisible = true">新增地址</el-button>
        <!-- 添加地址弹出窗 -->
        <el-dialog :visible.sync="dialogTableVisible">
          <div class="head"><img src="../../../assets/addAddress_icon.png" alt="">添加地址</div>
          <div class="main">
            <div class="box addressCode">
              <div class="title">地址编码</div>
              <div class="code">F1234</div>
            </div>
            <div class="box addressType">
              <div class="title">地址类型</div>
              <div class="type">
                <div class="receive" :class="newAddressData['type']=='receive'?'active':''" @click="newAddressData['type']='receive'">收</div>
                <div class="send" :class="newAddressData['type']=='send'?'active':''"  @click="newAddressData['type']='send'">发</div>
              </div>
            </div>
            <div class="message">
              <el-row>
                <el-col :span="12">
                  <div class="name">
                    <div class="title">姓名</div>
                    <el-input v-model="newAddressData['name']" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="id">
                    <div class="title">身份证</div>
                    <el-input v-model="newAddressData['id']" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="phone">
                    <div class="title">手机号</div>
                    <el-input v-model="newAddressData['phone']" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="cellPhone">
                    <div class="title">固定电话</div>
                    <el-input class="front" v-model="newAddressData['cellPhoneF']" placeholder="区号"></el-input>
                    <el-input class="behind" v-model="newAddressData['cellPhoneB']" placeholder="号码"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="box address">
              <div class="title">所在区域</div>
              <v-distpicker :province="newAddressData.address.province" :city="newAddressData.address.city" :area="newAddressData.address.area" @selected="onSelected"></v-distpicker>
            </div>
            <div class="addressDetial">
              <div class="title">详细地址</div>
              <el-input v-model="newAddressData['addressDetial']" placeholder="请输入内容"></el-input>
            </div>
            <div class="postalnum">
              <div class="title">邮政编码</div>
              <el-input v-model="newAddressData['postalnum']" placeholder="请输入内容"></el-input>
            </div>
            <div class="saveSubmit"><el-button type="warning">保存地址</el-button></div>
          </div>
        </el-dialog>
      </div>
      <div class="remove">
        <div class="select" v-show="selectType">
          <el-button @click="toggle()" type="danger">选择</el-button>
        </div>
        <div class="cancelSelect" v-show="!selectType">
          <el-button type="info">删除</el-button>
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
        <div class="number">编号</div>
        <div class="name">姓名</div>
        <div class="phone">手机号码</div>
        <div class="cellPhone">固定电话</div>
        <div class="id">身份证号码</div>
        <div class="address">所在地区</div>
        <div class="addressDetial">纤细地址</div>
        <div class="postalcode">邮政编码</div>
      </div>
      <div @click="selectItem(index)" class="body wrapper" v-for="(item,index) in toggleTableData" :key='index'>
        <div class="addresstype">
          <img :src="getAddressTypeImg(item.type)" alt="">
        </div>
        <div class="number">{{item.number}}</div>
        <div class="name">{{item.name}}</div>
        <div class="phone">{{item.phone}}</div>
        <div class="cellPhone">{{item.cellPhone}}</div>
        <div class="id">{{item.id}}</div>
        <div class="address">{{item.address}}</div>
        <div class="addressDetial">{{item.addressDetial}}</div>
        <div class="postalcode">{{item.postalcode}}<i v-show="editStatus" class="el-icon-edit-outline"></i><i class="deleticon" v-show="!editStatus&&tableData[index].remove"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      newAddressData:{
        type:'receive',
        name:'',
        id:'',
        phone:'',
        cellPhoneF:'', // 区号
        cellPhoneB:'', // 号码
        address:{ province: '广东省', city: '广州市', area: '海珠区' },
        addressDetial:'',
        postalnum:''
      },
      dialogTableVisible: false,
      searchkey: "",
      editStatus: true,
      addressTypeImg: {
        receive: require("../../../assets/type1.png"), // 收
        send: require("../../../assets/type2.png") // 发
      },
      selectType: true,
      addressType: "all", //  all , send , receive
      tableData: [
        {
          remove: false,
          type: "receive",
          number: "F001",
          name: "李雷雷",
          phone: "18299099009",
          cellPhone: "010-88886666",
          id: "1234567890123456",
          address: "北京市-顺义区",
          addressDetial: "顺高路北法信段2号",
          postalcode: "100043"
        },
        {
          remove: false,
          type: "receive",
          number: "F001",
          name: "李雷雷",
          phone: "18299099009",
          cellPhone: "010-88886666",
          id: "1234567890123456",
          address: "北京市-顺义区",
          addressDetial: "顺高路北法信段2号",
          postalcode: "100043"
        },
        {
          remove: false,
          type: "send",
          number: "F001",
          name: "李雷雷",
          phone: "18299099009",
          cellPhone: "010-88886666",
          id: "1234567890123456",
          address: "北京市-顺义区",
          addressDetial: "顺高路北法信段2号",
          postalcode: "100043"
        },
        {
          remove: false,
          type: "send",
          number: "F001",
          name: "李雷雷",
          phone: "18299099009",
          cellPhone: "010-88886666",
          id: "1234567890123456",
          address: "北京市-顺义区",
          addressDetial: "顺高路北法信段2号",
          postalcode: "100043"
        }
      ]
    };
  },
  mounted() {
    let length = this.tableData.length;
    for (let i = 0; i < length; i++) {
      // this.removeItems.push(false);
      this.$set(this.tableData, "remove", false);
    }
  },
  methods: {
    onSelected(data) {
      console.log(data);
    },
    toggle() {
      let length = this.tableData.length;
      if (this.editStatus == false) {
        for (let i = 0; i < length; i++) {
          this.tableData[i]["remove"] = false;
        }
      }
      this.selectType = !this.selectType;
      this.editStatus = !this.editStatus;
    },
    handleCommand(command) {
      // this.$message("click on item " + command);
      this.addressType = command;
    },
    getAddressTypeImg(type) {
      if (type == "receive") {
        return this.addressTypeImg.receive;
      }
      if (type == "send") {
        return this.addressTypeImg.send;
      }
    },
    selectItem(index) {
      if (this.editStatus) {
        return;
      }
      this.tableData[index].remove = !this.tableData[index].remove;
    }
  },
  computed: {
    toggleTableData() {
      if (this.addressType == "all") {
        return this.tableData;
      }
      if (this.addressType == "receive") {
        let newTableData = [];
        this.tableData.forEach(element => {
          if (element.type == "receive") {
            newTableData.push(element);
          }
        });
        return newTableData;
      }
      if (this.addressType == "send") {
        let newTableData = [];
        this.tableData.forEach(element => {
          if (element.type == "send") {
            newTableData.push(element);
          }
        });
        return newTableData;
      }
    }
  }
  // watch:{
  //   removeItems:{
  //     handler: function (newVal) {
  //       console.log('123123',newVal)
  //     },
  //     deep: true
  //   }
  // }
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
      .title {
        width: 100px;
        text-align: center;
        color: #b3b3b3;
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
    .add {
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
            .addressCode {
              .code {
                color: #f52831;
                font-weight: 700;
                font-size: 16px;
              }
            }
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
                  background-color:#F52831;
                }
              }
            }
            .message {
              .name,
              .id,
              .phone,
              .cellPhone {
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
      display: grid;
      grid-template-columns: 80px 80px 80px 80px repeat(5, 1fr);
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
