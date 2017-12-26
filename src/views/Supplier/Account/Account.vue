<template>
  <div class="account">

    <el-card class="box-card">
      <div class="card-one">
        <div class="ico">
          <img :src="firm.ico" alt="">
        </div>
        <div class="msg" style="display">
          <p v-text="firm.name"></p>
          <p>供应商编码：
            <span v-text="firm.num"></span>
          </p>
          <p>业务类型：
            <span v-text="firm.type"></span>
          </p>
        </div>
        <div class="menu">
          <span v-for="(item,index) in menus" :key="index"><!-- @click="toRouter(item.path)" -->
            <img :src="item.src" alt="">
            <p v-text="item.num"></p>
            <p v-text="item.intro"></p>
          </span>
        </div>
      </div>
    </el-card>

    <div class="card-two">
      <el-card>
        <div class="triangle">
          <span class="text">账号信息</span>
        </div>
        <div class="info">
          <p v-for="(item,key) of account">
            <span class="info-font" v-text="item.name"></span>
            <span class="colon">:</span>
            <span class="content" v-text="item.value" v-if="item.value"></span>
            <el-button type="info" v-if="item.alter">修改</el-button><!--  @click="alter(key)" -->
          </p>
        </div>
      </el-card>
      <el-card>
        <div class="triangle">
          <span class="text">基本信息</span>
        </div>
        <div class="server">
          <p>
            <span class="info-font">结算方式</span>
            <span class="colon">:</span>
            <span class="content" v-text="info.way"></span>
          </p>
          <p>
            <span class="info-font">服务范围</span>
            <span class="colon">:</span>
            <span class="ud-selectBox">
              <input :class="['ud-input']" v-model="infoOption"
                type="text" placeholder="请选择" readonly>
              <div class="contentBox">
                <ul>
                  <li v-for="item in info.range" v-text="item.label" @click="udItem(item.label)"></li>
                </ul>
              </div>
            </span>
          </p>
          <div class="pos">
            <h4>
              <span class="info-font">服务项</span>
            </h4>
            <div class="menu">
              <ul>
                <li v-for="(item,index) in infoOptions" v-if="checkIndexArray(item,servers,'intro') !== -1"> <!--  @click="toRouter(servers[checkIndexArray(item,servers,'intro')].path)" -->
                  <span class="note" v-text="String.fromCharCode(65+index)"></span>
                  <div class="wrap">
                    <img :src="servers[checkIndexArray(item,servers,'intro')].src" alt="">
                  </div>
                  <p v-text="servers[checkIndexArray(item,servers,'intro')].intro"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog title="会员信息修改" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label="'请输入新的'+account[dialogType].name">
          <el-input auto-complete="off" v-model="newMsg"></el-input>{{newMsg}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChange">取 消</el-button>
        <el-button type="primary" @click="dialogChange">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogType: "email",
      firm: {
        ico: require("../../../assets/head_img.png"),
        name: "海航速运（北京）优先责任公司",
        num: "YZJ271939392900101",
        type: "直营"
      },
      menus: [
        {
          coding: { num: "orderNum1" },
          src: require("@/assets/account_icon1.png"),
          num: 0,
          intro: "待接单",
          path: "/"
        },
        {
          coding: { num: "orderNum2" },
          src: require("@/assets/account_icon2.png"),
          num: 2,
          intro: "待收货",
          path: "/"
        },
        {
          coding: { num: "orderNum3" },
          src: require("@/assets/account_icon3.png"),
          num: 0,
          intro: "运输中",
          path: "/"
        },
        {
          coding: { num: "orderNum4" },
          src: require("@/assets/account_icon4.png"),
          num: 0,
          intro: "已完成",
          path: "/"
        }
      ],
      account: {
        supplierName: {
          name: "供应商简称",
          value: "HH00001"
        },
        account: {
          name: "账号",
          value: "YOYO2017"
        },
        password: {
          name: "密码",
          value: "",
          alter: true
        },
        phone: {
          name: "手机号",
          value: "13900000000",
          alter: true
        },
        email: {
          name: "邮箱",
          value: "123456@qq.com",
          alter: true
        },
        version: {
          name: "账户级别",
          value: "主账号"
        }
      },
      infoOption: "深圳市",
      info: {
        way: "月结",
        range: [
          {
            label: "深圳市",
            value: "001",
            options: ["航空运输服务", "始发港地面运输", "目的港地面运输", "上面取货", "落地配送"]
          },
          {
            label: "上海市",
            value: "002",
            options: ["航空运输服务", "上面取货"]
          },
          {
            label: "广州市",
            value: "002",
            options: ["目的港地面运输", "始发港地面运输"]
          },
          {
            label: "汕头市",
            value: "002",
            options: ["航空运输服务", "目的港地面运输", "上面取货"]
          },
          {
            label: "北京市",
            value: "002",
            options: ["目的港地面运输", "落地配送"]
          },
          {
            label: "肇庆市",
            value: "002",
            options: ["航空运输服务", "目的港地面运输", "上面取货", "落地配送"]
          },
          {
            label: "揭阳市",
            value: "002",
            options: ["目的港地面运输", "上面取货", "落地配送"]
          },
          {
            label: "重庆市",
            value: "002",
            options: ["目的港地面运输", "上面取货"]
          }
        ]
      },
      servers: [
        {
          src: require("@/assets/detail_info_img1.png"),
          intro: "航空运输服务"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img2.png"),
          intro: "始发港地面运输"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img3.png"),
          intro: "目的港地面运输"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img4.png"),
          intro: "上面取货"
          /* path: "/" */
        },
        {
          src: require("@/assets/detail_info_img5.png"),
          intro: "落地配送"
          /* path: "/" */
        }
      ],
      newMsg: ""
    };
  },
  methods: {
    toRouter(path) {
      this.$router.push(path);
    },
    alter(type) {
      this.dialogType = type;
      this.dialogFormVisible = true;
    },
    dialogChange() {
      this.dialogFormVisible = false;
    },
    checkIndexArray(info, arr, name) {
      for (var i = 0; i < arr.length; i++) {
        if (info == arr[i][name]) {
          return i;
        }
      }
      return -1;
    },
    udShow(arrName) {
      for (var i = 0; i < arrName.length; i++) {
        this[arrName[i]] = !this[arrName[i]];
      }
    },
    udItem(label) {
      this.infoOption = label;
    }
  },
  computed: {
    infoOptions() {
      var options,
        option = this.infoOption,
        len = this.info.range.length;
      for (var i = 0; i < len; i++) {
        var item = this.info.range[i];
        if (option == item.label) {
          options = item.options;
        }
      }
      return options;
    }
  },
  mounted() {
    function setData(obj, dataJson, objKey) {
      if (obj instanceof Array) {
        let arr = obj;
        for (let i = 0; i < arr.length; i++) {
          var coding = arr[i][objKey] || arr[i]["coding"];
          for (let name in coding) {
            arr[i][name] = dataJson[coding[name]];
          }
        }
      } else {
        for (let name in obj) {
          var coding = name;
          coding && (obj[name][objKey] = dataJson[coding]);
        }
      }
    }
    this.axios
      .post("/web/v1/supplier/info", {
        id: this.$store.state.id,
        token: this.$store.state.token
      })
      .then(res => {
        console.log(res);
        var data = res.data.data;
        this.firm.name = data.supplierFullName;
        // 订单数量数据设置
        setData(this.menus, data);
        // 账号信息设置
        setData(this.account, data, "value");

        var version = this.account.version;
        version.value = version.value == 1 ? "主账号" : "子账号";
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
@mixin font {
  font-size: 16px;
  font-weight: bold;
  text-align: justify;
  overflow: hidden;
  &::after {
    width: 100%;
    height: 0;
    margin: 0;
    display: inline-block;
    overflow: hidden;
    content: "";
  }
}

.account {
  $orange: #fccf00;
  margin-top: 61px + 30px;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  $dotted: 1px dotted #cfcfcf;
  @mixin card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card-one {
    @include card;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    .ico {
      border-radius: 100px;
      box-shadow: 0px 0px 0px 10px #f2f2f2;
      margin-bottom: 10px;
    }
    .msg {
      width: 300px;
      line-height: 30px;
    }
    .menu {
      width: 400px;
      padding-left: 100px;
      padding-top: 40px;
      padding-bottom: 14px;
      border-left: $dotted;
      span {
        display: inline-block;
        padding: 10px;
        cursor: pointer;
      }
      p {
        margin: 10px 0;
        text-align: center;
      }
    }
  }

  .card-two {
    @include card;
    margin-top: 40px;
    min-height: 407px;
    justify-content: space-between;
    .triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-top: 80px solid $orange;
      border-right: 80px solid transparent;
      .text {
        position: absolute;
        width: 100px;
        transform-origin: left top;
        transform: rotate(-45deg);
        top: -40px;
        color: white;
        font-size: 14px;
      }
    }

    $all-width: 1250px;
    $info-width: 700px;
    $paddingLeft: 60px;
    .info,
    .server {
      box-sizing: border-box;
      $padTB: 20px;
      padding-top: $padTB;
      .info-font {
        width: 90px;
        height: 20px;
        display: inline-block;
        @include font;
      }
      .content {
        display: inline-block;
        width: 180px;
        font-size: 16px;
        font-weight: bold;
      }
      .colon {
        margin: 0 15px;
      }
      .pos {
        margin-left: -$paddingLeft + 10;
        margin-top: 30px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: $info-width;
      height: 100%;
      /* 是否跟据父级进行拓展 */
      padding-left: 60px;
      padding-bottom: 15px;
      p {
        margin: 14px 0;
      }
    }

    .server {
      width: $all-width - $info-width;
      padding-left: $paddingLeft;
      box-sizing: border-box;
      padding-bottom: 0;
      h4 {
        text-align: center;
      }
      .menu {
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          position: relative;
          display: inline-block;
          text-align: center;
          padding: 10px;
          cursor: pointer;
          border-right: $dotted;
          border-bottom: $dotted;
          .wrap {
            height: 45px;
            width: 114px;
          }
          &:nth-child(4n) {
            border-right: 0;
          }
          &:last-child {
            border-right: 0;
          }
          /* &:nth-child(4n + 1):nth-last-child(-n + 4) {
              border-bottom: 0;
              ~li {
                border-bottom: 0;
              }
            } */
        }
      }
      .note {
        position: absolute;
        right: 5px;
        top: 0;
        color: #ccc;
      }
    }
  }
  .ud-selectBox {
    $gray: #a0a0a0;
    position: relative;
    display: inline-block;
    .ud-input {
      height: 25px;
      width: 50px;
      color: $gray;
      border: 1px solid $gray;
      padding: 0 5px;
      border-radius: 5px;
    }
    .contentBox {
      position: absolute;
      width: 80px*5;
      background: #fff;
      color: #3d85ff;
      font-weight: 14px;
      transform: translate(-40%);
      display: none;
    }
    &:hover {
      .ud-input {
        border-color: $orange;
      }
      .contentBox {
        display: block;
      }
    }
    ul {
      list-style: none;
      padding: 6px 30px;
      margin: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      box-shadow: 0px 3px 11px -3px rgba(0, 0, 0, 0.5);
    }
    li {
      display: inline-block;
      line-height: 34px;
      cursor: pointer;
      padding: 0 10px;
    }
  }
}
</style>
<style lang="scss">
$gray: #a0a0a0;
$orange: #fccf00;
.account {
  .el-card {
    padding-bottom: 0;
    border: 0;
    font-size: 15px;
    color: $gray;
    box-shadow: 0 8px 7px -5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 8px 7px -5px rgba(0, 0, 0, 0.2);
  }

  .el-button--info {
    color: #fff;
    background-color: $gray;
    border-color: $gray;
    width: 75px;
    padding: 1px;
  }

  .el-card__body {
    padding: 0;
    height: 100%;
  }

  .el-dialog {
    width: 30%;
  }
}
</style>
