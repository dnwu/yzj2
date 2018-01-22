<template>
<div class="server-info">
  <div class="head">服务信息</div>
  <div class="body">
    <p class="place">
      <span v-for="cityName in cityList" @click="selected(cityName)" :class="{active:activeName === cityName}">{{cityName}}</span>
    </p>
    <div class="content">
      <!--始发港地面操作服务-->
      <div :class="{show:serviceStatus.service2}" class="box beginport">
        <div class="pic">
          <img src="../../../assets/detail_info_img2.png">
          <span>始发港地面操作服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">最晚交货时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前{{serviceData2.estimate}}小时</span></li>
            <li><span class="label">交货位置:</span><span>{{serviceData2.deliveryPosition}}</span></li>
            <li><span class="label">联系人:</span><span>{{serviceData2.userName}}</span></li>
            <li><span class="label">联系方式:</span><span>{{serviceData2.phone}}</span></li>
          </ul>
        </div>
      </div>
      <!--目的港地面操作服务-->
      <div :class="{show:serviceStatus.service5}" class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img3.png">
          <span>目的港地面操作服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">预计提货时间&nbsp;&nbsp;:</span><span>航班计划落地后{{serviceData5.estimate}}小时</span></li>
            <li><span class="label">提货位置:</span><span>{{serviceData5.deliveryPosition}}</span></li>
            <li><span class="label">联系人:</span><span>{{serviceData5.userName}}</span></li>
            <li><span class="label">联系方式:</span><span>{{serviceData5.phone}}</span></li>
          </ul>
        </div>
      </div>
      <!--上门取货服务-->
      <div :class="{show:serviceStatus.service1}" class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img4.png">
          <span>上门取货服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">预计取货时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前{{serviceData1.estimate}}小时</span></li>
            <li><span class="label">联系人:</span><span>{{serviceData1.userName}}</span></li>
            <li><span class="label">联系方式:</span><span>{{serviceData1.phone}}</span></li>
          </ul>
        </div>
      </div>
      <!--落地配服务-->
      <div :class="{show:serviceStatus.service4}" class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img5.png">
          <span>落地配服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">预计送达时间&nbsp;&nbsp;:</span><span>航班计划落地时间后{{serviceData4.estimate}}小时</span></li>
            <li><span class="label">联系人:</span><span>{{serviceData4.userName}}</span></li>
            <li><span class="label">联系方式:</span><span>{{serviceData4.phone}}</span></li>
          </ul>
        </div>
      </div>
      <div class="more">
        <div class="pic"><img src="../../../assets/detail_info_imgmore.png"></div>
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
      cityList: [],
      activeName: '',
      serviceStatus: {//服务是否选中
        service1: false,
        service2: false,
        service4: false,
        service5: false
      },
      serviceData1: {},
      serviceData2: {},
      serviceData4: {},
      serviceData5: {},
    }
  },
  created() {
    this.getCityList();
  },
  watch: {
    activeName (){
      if(this.activeName){
        this.getServiceInfoList();
      }
    },
  },
  methods:{
    getCityList (){
      this.axios.post("/web/v1/supplier/score/city",{
        "id": this.id,
        "token": this.token,
      }).then(data => {
        if(data.data.code === 1){
          let res = data.data.data;
          this.cityList = res;
          this.activeName = res[0];
          this.getServiceInfoList();
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      });
    },
    selected (cityName){
      this.activeName = cityName;
    },
    getServiceInfoList (){
      this.axios.post("/web/v1/supplier/score/list",{
        "id": this.id,
        "token": this.token,
        "cityName": this.activeName,
      }).then(data => {
        if(data.data.code === 1){
          let hnaSupplierScopes = data.data.hnaSupplierScopes;
          for(let i=0;i<hnaSupplierScopes.length;i++){
            switch (hnaSupplierScopes[i].productType){
              case 1:
              {
                this.serviceStatus.service1 = true;
                this.serviceData1 = hnaSupplierScopes[i];
                break
              }
              case 2:
              {
                this.serviceStatus.service2 = true;
                this.serviceData2 = hnaSupplierScopes[i];
                break
              }
              case 4:
              {
                this.serviceStatus.service4 = true;
                this.serviceData4 = hnaSupplierScopes[i];
                break
              }
              case 5:
              {
                this.serviceStatus.service5 = true;
                this.serviceData5 = hnaSupplierScopes[i];
                break
              }
              default: break;
            }
          }
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters(["id", "token"]),
  }
}
</script>
<style lang="scss" scoped>
  .server-info{
    .head{
      height: 61px;
      line-height: 61px;
      padding-left: 20px;
      color: #b3b3b3;
      font-size: 16px;
    }
    .body{
      color: #A7A7A7;
      padding-left: 30px;
      .place{
        height: 50px;
        margin: 0;
        span{
          display: inline-block;
          height: 50px;
          line-height: 50px;
          padding: 0px 5px;
          cursor: pointer;
        }
        .active{
          color: #FADE5B;
        }
      }
      .content{
        -moz-box-shadow:3px 3px 3px #CFCFCF;         /*firefox*/
        -webkit-box-shadow:3px 3px 3px #CFCFCF;      /*webkit*/
        box-shadow: 3px 3px 3px #CFCFCF;
        border-radius: 5px;
        border-top: 2px solid #DEDEDE;
        overflow: hidden;
        .box{
          box-sizing: border-box;
          display: none;
          width: 33.33%;
          height: 245px;
          float: left;
          border-right: 1px dashed #DFDFDF;
          border-bottom: 1px dashed #DFDFDF;
          .pic{
            position: relative;
            height: 90px;
            top: 0;
            left: 0;
            img{
              position: absolute;
              left: 50%;
              top: 15px;
              margin-left: -21px;
            }
            span{
              position: absolute;
              width: 100%;
              text-align: center;
              top: 70px;
            }
          }
          .text{
            text-align: center;
            ul{
              display: inline-block;
              padding: 0;
              li{
                text-align: left;
                padding: 5px 0px;
                .label{
                  display: inline-block;
                  width: 100px;
                  text-align: justify;
                  text-align-last: justify;
                  -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                  margin-right: 10px;
                }
              }
            }
          }
        }
        div.show{
          display: block;
        }
        .more{
          box-sizing: border-box;
          width: 33.33%;
          height: 245px;
          float: left;

          .pic{
            margin-top: 116px;
            height: 12px;
            text-align: center;
          }
        }
      }

    }
  }
</style>
