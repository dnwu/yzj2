<template>
<div class="company-info">
  <div class="head">企业信息</div>
  <div class="body">
    <div class="Basic-information">
      <p class="title"><img src="../../../assets/company_info_1.png"><span>公司基本信息</span></p>
      <div class="content">
        <div class="left">
          <p>
            <span class="key label">公司名称:</span>
            <span>深圳云捷讯信息系统有限公司（已注册）</span>
          </p>
          <p>
            <span class="key label">营业执照号&nbsp;:</span>
            <span>1283929389EDCA</span>
          </p>
          <p>
            <span class="key label">法人代表:</span>
            <span>讯沙紫</span>
          </p>
          <p>
            <span class="key label">身份证号码&nbsp;:</span>
            <span>003920399203920392</span>
          </p>
          <p>
            <span class="key label">身份证电子版&nbsp;&nbsp;:</span>
            <span></span>
          </p>
          <p>
            <span class="key label">组织机构代码&nbsp;&nbsp;:</span>
            <span>143849399EJFFFJ</span>
          </p>
          <p>
            <span class="label">组织机构代码证有效期&nbsp;&nbsp;:</span>
            <span>2017-02-03 至 长期</span>
          </p>
          <p>
            <span class="label">组织机构代码证电子版&nbsp;&nbsp;:</span>
            <span></span>
          </p>
        </div>
        <div class="right">
          <p>
            <span class="label">营业执照所在地&nbsp;&nbsp;&nbsp;:</span>
            <span>广东省深圳市宝安区</span>
          </p>
          <p>
            <span class="label">详细地址:</span>
            <span>宝安大道33号</span>
          </p>
          <p>
            <span class="label">营业期限:</span>
            <span>2017-02-03 至 长期</span>
          </p>
          <p>
            <span class="label">注册资金:</span>
            <span>2000万</span>
          </p>
          <p>
            <span class="key label">经营范围:</span>
            <span class="value">系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成，系统集成</span>
          </p>
          <p>
            <span class="label">营业执照电子版&nbsp;&nbsp;&nbsp;:</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
    <div class="tax-certificate">
      <p class="title"><img src="../../../assets/company_info_2.png"><span>公司税务登记证</span></p>
      <div class="content">
        <div class="left">
          <p>
            <span class="label">纳税人识别号&nbsp;&nbsp;:</span>
            <span>188382829ED3839</span>
          </p>
        </div>
        <div class="right">
          <p>
            <span class="key label">税务登记证电子版&nbsp;:</span>
            <span></span>
          </p>
          <p>
            <span class="label">一般纳税人资格证电子版&nbsp;:</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
    <div class="bank-licence">
      <p class="title"><img src="../../../assets/company_info_3.png"><span>开户银行许可证</span></p>
      <div class="content">
        <div class="left">
          <p>
            <span class="label">银行开户名&nbsp;&nbsp;:</span>
            <span>国有支付清算信息科技有限公司</span>
          </p>
          <p>
            <span class="label">开户银行支行名称&nbsp;&nbsp;:</span>
            <span>123345662355SDF</span>
          </p>
          <p>
            <span class="label">银行开户许可证电子版&nbsp;&nbsp;:</span>
            <span></span>
          </p>
        </div>
        <div class="right">
          <p>
            <span class="key label">公司银行账户&nbsp;:</span>
            <span>11256465514613DST</span>
          </p>
          <p>
            <span class="label">开户银行支行所在地&nbsp;:</span>
            <span>广东省深圳市宝安区</span>
          </p>
        </div>
      </div>
    </div>
    <div class="contact-information">
      <p class="title"><img src="../../../assets/company_info_4.png"><span>联系人信息</span></p>
      <div class="content">
        <div class="left">
          <p>
            <span class="label">联系人姓名 :</span>
            <span>小诸葛</span>
          </p>
        </div>
        <div class="right">
          <p>
            <span class="label">联系人手机:</span>
            <span>13489894545</span>
          </p>
          <p>
            <span class="label">联系人邮箱:</span>
            <span>1234567@qq.com</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
  data () {
    return {
    }
  },
  created (){
    this.getCompanyInfo();
  },
  methods: {
    getCompanyInfo (){
      this.axios.post("/web/v1/supplier/enterprise/info",{
        "id": this.id,
        "token": this.token,
      }).then(data => {
          console.log(data);
      });
    }
  },
  computed: {
    ...mapGetters(["id", "token"]),
  }
}
</script>
<style lang="scss" scoped>
  .company-info{
    .head{
      height: 61px;
      line-height: 61px;
      padding-left: 20px;
      color: #b3b3b3;
      font-size: 16px;
    }
    .body{
      color: #A7A7A7;
      padding-left: 10px;
      .Basic-information{
        margin: 10px 0px;
        .title{
          height: 32px;
          color: #fff;
          background-color: #FCCF00;
          margin: 0;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-left: 10px;
          img{
            float: left;
            margin-top: 4px;
            margin-right: 12px;
          }
          span{
            float: left;
            height: 32px;
            line-height: 32px;
          }
        }
        .content{
          border-left: 1px solid #DFDFDF;
          border-right: 1px solid #DFDFDF;
          -moz-box-shadow:0 2px 12px 0 #CFCFCF;         /*firefox*/
          -webkit-box-shadow:0 2px 12px 0 #CFCFCF;      /*webkit*/
          box-shadow: 0 2px 12px 0 #CFCFCF;
          padding: 10px 0px;
          overflow: hidden;
          .left{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 10px 0px 30px;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                width: 160px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
              }
              span.key{
                padding-left: 60px;
                width: 100px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
              }
            }
          }
          .right{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 30px 0px 10px;
            p{
              margin: 10px 0px;
              overflow: hidden;
              .label{
                display: inline-block;
                width: 120px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
                margin-left: 50px;
              }
              .key{
                float: left;
              }
              .value{
                float: left;
                width: calc(100% - 180px);
                width: -moz-calc(100% - 180px);
                width: -webkit-calc(100% - 180px);
              }
            }
          }
        }
      }
      .tax-certificate{
        margin-bottom: 10px;
        .title{
          height: 32px;
          line-height: 32px;
          color: #fff;
          background-color: #FCCF00;
          margin: 0;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-left: 10px;
          img{
            float: left;
            margin-top: 4px;
            margin-right: 12px;
          }
          span{
            float: left;
            height: 32px;
            line-height: 32px;
          }
        }
        .content{
          border-left: 1px solid #DFDFDF;
          border-right: 1px solid #DFDFDF;
          -moz-box-shadow:0 2px 12px 0 #CFCFCF;         /*firefox*/
          -webkit-box-shadow:0 2px 12px 0 #CFCFCF;      /*webkit*/
          box-shadow: 0 2px 12px 0 #CFCFCF;
          padding: 10px 0px;
          overflow: hidden;
          .left{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 10px 0px 30px;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                width: 160px;
                text-align: right;
                margin-right: 10px;
              }
            }
          }
          .right{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 30px 0px 10px;
            p{
              margin: 10px 0px;
              overflow: hidden;
              .label{
                display: inline-block;
                width: 170px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
              }
              .key{
                margin-left: 50px;
                width: 120px;
              }
            }
          }
        }
      }
      .bank-licence{
        margin-bottom: 10px;
        .title{
          height: 32px;
          line-height: 32px;
          color: #fff;
          background-color: #FCCF00;
          margin: 0;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-left: 10px;
          img{
            float: left;
            margin-top: 4px;
            margin-right: 12px;
          }
          span{
            float: left;
            height: 32px;
            line-height: 32px;
          }
        }
        .content{
          border-left: 1px solid #DFDFDF;
          border-right: 1px solid #DFDFDF;
          -moz-box-shadow:0 2px 12px 0 #CFCFCF;         /*firefox*/
          -webkit-box-shadow:0 2px 12px 0 #CFCFCF;      /*webkit*/
          box-shadow: 0 2px 12px 0 #CFCFCF;
          padding: 10px 0px;
          overflow: hidden;
          .left{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 10px 0px 30px;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                width: 160px;
                text-align: right;
                margin-right: 10px;
              }
            }
          }
          .right{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 30px 0px 10px;
            p{
              margin: 10px 0px;
              overflow: hidden;
              .label{
                display: inline-block;
                width: 170px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
              }
              .key{
                margin-left: 50px;
                width: 120px;
              }
            }
          }
        }
      }
      .contact-information{
        .title{
          height: 32px;
          line-height: 32px;
          color: #fff;
          background-color: #FCCF00;
          margin: 0;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding-left: 10px;
          img{
            float: left;
            margin-top: 4px;
            margin-right: 12px;
          }
          span{
            float: left;
            height: 32px;
            line-height: 32px;
          }
        }
        .content{
          border-left: 1px solid #DFDFDF;
          border-right: 1px solid #DFDFDF;
          -moz-box-shadow:0 2px 12px 0 #CFCFCF;         /*firefox*/
          -webkit-box-shadow:0 2px 12px 0 #CFCFCF;      /*webkit*/
          box-shadow: 0 2px 12px 0 #CFCFCF;
          padding: 10px 0px;
          overflow: hidden;
          .left{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 10px 0px 30px;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                width: 100px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
                margin-left: 60px;
              }
            }
          }
          .right{
            box-sizing: border-box;
            float: left;
            width: 50%;
            padding: 0px 30px 0px 10px;
            p{
              margin: 10px 0px;
              overflow: hidden;
              .label{
                display: inline-block;
                width: 120px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                margin-right: 10px;
                margin-left: 50px;
              }
            }
          }
        }
      }
    }

  }
</style>
