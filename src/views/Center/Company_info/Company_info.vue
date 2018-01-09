<template>
  <div class="company-info">
    <div class="is-flex header">
      <span class="info">企业信息</span>
      <span class="btn" @click="edit = true">完善企业信息</span>
      <span class="btn" @click="submit">企业注册申请</span>
    </div>
    <div class="main">
      <section class="card">
        <header class="is-flex card-head">公司基本信息</header>
        <main class="is-flex card-body">
          <ul class="card-left">
            <my-li ref="info1" :info="info1" :edit="edit" :width="widthLeft"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="info2" :info="info2" :edit="edit" :width="widthRight"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card card-two">
        <header class="is-flex card-head">公司税务登记证</header>
        <main class="is-flex card-body">
          <ul class="card-left info-justify-font">
            <my-li ref="tax1" :info="tax1" :edit="edit" :width="widthLeft"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="tax2" :info="tax2" :edit="edit" :width="widthRight"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card">
        <header class="is-flex card-head">开户银行许可证</header>
        <main class="is-flex card-body">
          <ul class="card-left">
            <my-li ref="paper1" :info="paper1" :edit="edit" :width="widthLeft"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="paper2"  :info="paper2" :edit="edit" :width="widthRight"></my-li>
          </ul>
        </main>
      </section class="card">
      <section class="card card-two">
        <header class="is-flex card-head">联系人信息</header>
        <main class="is-flex card-body">
          <ul class="card-left info-justify-font">
            <my-li ref="msg1" :info="msg1" :edit="edit" :width="widthLeft"></my-li>
          </ul>
          <ul class="card-right">
            <my-li ref="msg2" :info="msg2" :edit="edit" :width="widthRight"></my-li>
          </ul>
        </main>
      </section class="card">
    </div>
  </div>
</template>
<script>
import Li from "./li";
export default {
  components: { "my-li": Li },
  data() {
    return {
      edit: false,
      widthLeft: 300,
      widthRight: 280,
      pic: require("@/assets/reset_icon.png"),
      info1: {
        firmName: {
          name: "公司名称",
          value: "深圳云捷讯信息系统有限公司（已注册）"
        },
        number: {
          name: "营业执照号",
          value: "1283929389389EDCA"
        },
        people: {
          name: "法人代表",
          value: "讯沙紫"
        },
        id: {
          name: "身份证号码",
          value: "003920399203920392"
        },
        id_pic: {
          name: "身份证电子版",
          value: false
        },
        code: {
          name: "组织机构代码",
          value: "14384939399EJFJFJ"
        },
        time: {
          name: "组织机构代码证有效期 ",
          value: "2017-02-03 至 长期"
        },
        org_pic: {
          name: "组织机构代码证电子版",
          value: false
        }
      },
      info2: {
        place: {
          name: "营业执照所在地",
          value: "广东省深圳市宝安区"
        },
        address: {
          name: "详细地址",
          value: "粤海啥看的咳咳咳额三生三世"
        },
        time: {
          name: "营业期限",
          value: "2017-02-03 至 长期"
        },
        bankroll: {
          name: "注册资金",
          value: "2万"
        },
        range: {
          name: "经营范围",
          value: "系统集成，软件开发，系统集成，软件开发系统集成，软件开发系统集成，软件开发系统集成，软件开发系统集成，软件开发"
        },
        org_pic: {
          name: "营业执照电子版 ",
          value: false
        }
      },
      tax1: {
        num: {
          name: "纳税人识别号",
          value: "188382829ED3839"
        }
      },
      tax2: {
        book: {
          name: "税务登记证电子版",
          value: false
        },
        common: {
          name: "一般纳税人资格证电子版",
          value: false
        }
      },
      paper1: {
        bankNamw: {
          name: "银行开户名",
          value: "国有支付清算信息科技有限公司"
        },
        bankCode: {
          name: "开户银行支行名称",
          value: "1283929389389EDCA"
        },
        pic: {
          name: "银行开户许可证电子版 ",
          value: false
        }
      },
      paper2: {
        account: {
          name: "公司银行账户",
          value: "12393939392929340403029"
        },
        address: {
          name: "开户银行支行所在地",
          value: "广东省深圳市宝安区"
        }
      },
      msg1: {
        myName: {
          name: "联系人姓名",
          value: "筛子"
        }
      },
      msg2: {
        tel: {
          name: "联系人手机",
          value: "102930293029"
        },
        email: {
          name: "联系人邮箱",
          value: "2929393@11.com"
        }
      }
    };
  },
  methods: {
    submit() {
      this.edit = false;
      var arr = [
        "info1",
        "info2",
        "tax1",
        "tax2",
        "paper1",
        "paper2",
        "msg1",
        "msg2"
      ];
      for (var i = 0; i < arr.length; i++) {
        this.$refs[arr[i]].submitUpload();
      }
    }
  },
  mounted() {
    // obj: 需要设置数据的对象或者数组
    // dataJson: 可读取json数据，直接属性对应coding映射关系
    // objKey：对象中需要设置的值（其中，对象的name表示一对一映射关系）// 数组中的多对多映射关系的对象;
    function setMapped(obj, dataJson, objKey) {
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
          coding && dataJson[coding] && (obj[name][objKey] = dataJson[coding]);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin header {
  height: 61px;
  align-items: center;
  padding-left: 20px;
  color: #b3b3b3;
  h4 {
    font-weight: normal;
  }
}
.is-flex {
  display: flex;
}

ul {
  padding-left: 0;
}

.company-info {
  width: 90%;
  .el-icon-picture {
    vertical-align: middle;
  }
}
$orange: #fccf00;
.header {
  $bth-height: 12px;
  padding-right: 50px;
  @include header;
  align-items: center;
  justify-content: space-between;
  .info {
    flex: 1;
  }
  .btn {
    margin: 0 10px;
    padding: 4px 10px;
    line-height: $bth-height;
    background: $orange;
    border-radius: 3px;
    color: #feffe1;
    box-shadow: 2px 3px 10px 1px rgba(0, 0, 0, 0.1);
  }
}
$font-height: 18px;
@mixin font {
  text-align: justify;
  height: $font-height;
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

.main {
  $gap: 10px;
  padding: $gap;
  .card {
    $radius: 3px;
    margin-bottom: $gap*2;
    .card-head {
      align-items: center;
      padding-left: 10px;
      color: white;
      height: 30px;
      background: $orange;
      border-radius: $radius;
    }
    .card-body {
      justify-content: space-between;
      border-radius: $radius;
      box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.1);
      color: #888;
      font-size: $font-height - 3;
    }
    .card-left {
      margin-left: 20px;
    }

    .card-right {
      margin-right: 50px;
    }
  }
}

.info-justify-font {
  display: flex;
  align-items: center;
}
</style>
