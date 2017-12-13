<template>
  <div class="write-wrapper">
    <div class="write-container">
      <div class="write-inner">
        <div class="write-back" @click="back" style="cursor:pointer;">返回上一步</div>
        <div class="write-content">
          <div class="content-pic"></div>
          <div class="list list1">
            <div class="list-text">订单编号:</div><span class="list-num">{{listIndex}}</span>
          </div>
          <div class="list list2">
            <div class="list-text">运输服务:</div><span class="list-land">{{startAddress}}-{{endAddress}}</span><span class="list-land"> 货物类型：{{listType}}</span><span class="listTime">航班起飞时间：{{listStart}}&nbsp;&nbsp;─&nbsp;&nbsp;{{listEnd}}</span>
          </div>
          <div class="list list3">
            <div class="list-text">基础服务:</div><span class="list-land"><product-select class="product-select"></product-select>  航空运输</span>
          </div>
          <div class="list list4">
            <div class="list-text">更多服务:</div><span class="list-land"><product-select class="product-select"></product-select>  代交货</span><span class="list-land"><product-select class="product-select"></product-select>代提交</span><span class=" list-land"><product-select class="product-select"></product-select>上门取货</span><span class="list-land"><product-select  class="product-select"></product-select>落地配</span>
          </div>
          <div class="list list5">
            <div class="list-text">增值服务:</div><span class="list-land"><product-select class="product-select"></product-select>  报关报检</span><span class="list-land"><product-select class="product-select"></product-select>运输保险</span>
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
            <span class="name-text">{{userName}}</span>
          </div>
          <div class="right-name">
            <span class="name-nav">身份证</span>
            <span class="name-text">{{userId}}</span>
          </div>
        </div>
        <div class="left-phone">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">手机号</span>
            <span class="name-text">13670247822</span>
          </div>
          <div class="right-name">
            <span class="name-nav">固定电话</span>
            <span class="name-text">020  88668888</span>
          </div>
        </div>
        <div class="left-area">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">所在区域</span>
            <span class="name-text"><v-distpicker :placeholders="placeholders"></v-distpicker></span>
          </div>
        </div>
        <div class="left-detail">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">详细地址</span>
            <span class="name-text">东门大街100号</span>
          </div>
        </div>
        <div class="left-index">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">邮编</span>
            <span class="name-text">400000</span>
          </div>
        </div>
        <div class="left-btn">
          <span class="btn-box box1">添加地址簿</span>
          <span class="btn-box box2">设为默认</span>
          <span class="btn-box box3">确定</span>
        </div>
      </div>
      <div class=""address-img>
        <img src="../../../assets/product2.png">
      </div>
      <div class="address-right">
        <div class="left-logo"></div>
        <div class="logo-text">发</div>
        <div class="left-nav">
          <img src="../../../assets/product17.png">
        </div>
        <div class="left-info">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">姓名</span>
            <span class="name-text">{{userName}}</span>
          </div>
          <div class="right-name">
            <span class="name-nav">身份证</span>
            <span class="name-text">{{userId}}</span>
          </div>
        </div>
        <div class="left-phone">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">手机号</span>
            <span class="name-text">13670247822</span>
          </div>
          <div class="right-name">
            <span class="name-nav">固定电话</span>
            <span class="name-text">020  88668888</span>
          </div>
        </div>
        <div class="left-area">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">所在区域</span>
            <span class="name-text"><v-distpicker :placeholders="placeholders"></v-distpicker></span>
          </div>
        </div>
        <div class="left-detail">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">详细地址</span>
            <span class="name-text">东门大街100号</span>
          </div>
        </div>
        <div class="left-index">
          <div class="left-name">
            <span class="name-logo">*</span>
            <span class="name-nav">邮编</span>
            <span class="name-text">400000</span>
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
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物重量</span>
          <span class="name-text">{{userWeight}}</span>
          <span class="name-num">千克</span>
        </div>
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物件数</span>
          <span class="name-text">{{userNum}}</span>
          <span class="name-num">件</span>
        </div>
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物名称</span>
          <span class="name-text">服装</span>
        </div>
        <div class="info-list">
          <span class="name-logo">*</span>
          <span class="name-nav">货物包装</span>
          <span class="name-text">纸箱</span>
        </div>
      </div>
      <div class="info-mid">
        <span class="mid-text">
          <div>货物尺寸</div>
          <div>(长*宽*高/件数)</div>
          <div>单位：cm</div>
        </span>
        <span class="mid-box">
          <p>100*15*10/5</p>
          <p>100*15*10/5</p>
          <p>100*15*10/5</p>
          <p>100*15*10/5</p>
        </span>
        <img src="../../../assets/product18.png">
      </div>
      <div class="info-right">
        <div class="info-list">
          <span class="name-nav">货物体积</span>
          <span class="name-text">50</span>
          <span class="name-num">立方米</span>
        </div>
        <div class="info-list">
          <span class="name-nav">计费重量</span>
          <span class="name-text">1000</span>
          <span class="name-num">千克</span>
        </div>
        <div class="info-list">
          <span class="name-nav">备注</span>
        </div>
      </div>
    </div>
    <div class="product-title">活动信息</div>
    <div class="product-pre">
      <input type="" name="" placeholder="邀请码">
      <span class="product-preindex">验证</span>
    </div>
    <div class="product-title">发票信息</div>
    <div class="product-con">
      <div class="con-nav">
        <product-select class="con-select"></product-select>不需要发票<product-select class="con-select"></product-select>普票<product-select class="con-select"></product-select>专票
      </div>
      <div class="con-change">
        <span class="con-text">深圳市迅捷有限公司|3252365435234234</span>
        <span class="con-btn">更改</span>
      </div>
    </div>
    <div class="product-title">费用信息</div>
    <div class="product-cost">
      <div class="cost-content">
      <div class="cost-list">
        <span class="cost-num">航空运费</span>
        <span class="cost-item">{{airIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">燃油附加费费</span>
        <span class="cost-item">{{fuelIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">出港处置费</span>
        <span class="cost-item">{{exportIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">出港制单费</span>
        <span class="cost-item">{{formIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">运岗提货费</span>
        <span class="cost-item">{{landIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">上门提货费</span>
        <span class="cost-item">{{homeIndex}}</span>
      </div>
      <div class="cost-list">
        <span class="cost-num">派送费</span>
        <span class="cost-item">{{dispatchIndex}}</span>
      </div>
      </div>
      <div class="cost-sum">
        <span class="sum-text">合计</span>
        <span class="sum-num">{{sumIndex}}</span>
      </div>
    </div>
    <div class="product-complete" style="height:70px;width:100%;display:flex;align-items:center;
    justify-content:space-between;">
      <div class="back-complete">
        <div class="goback" @click="completeGo">返回上一步</div>
        <div class="gokeep">保存订单</div>
      </div>
      <div class="cost-compete" @click="confirm" style="text-align:center;line-height:30px;margin-right:50px;height:30px;width:180px;background:red;color:#fff;border-radius:5px;cursor:pointer;">提交</div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import productSelect from './product_select'
  import VDistpicker from 'v-distpicker'

  export default{
    components: {
      productSelect,
      VDistpicker
    },
    methods: {
      completeGo () {
        this.$store.commit('minIndex')
        this.$router.push('/center/Online_product')
      },
      back(){
        this.$store.commit('minIndex')
        this.$router.push('/center/Online_product')
      },
      confirm(){
        this.$store.commit('getIndex')
        this.$router.push('/center/Online_product/complete')
      }
    },
    data() {
      return {
        placeholders: {
          province: '------- 省 --------',
          city: '--- 市 ---',
          area: '--- 区 ---',
        },
        listIndex: 2017121206254354232,
        userName:'陈悠悠',
        userId: 421003199906031110,
        userNum: 10
      }
    },
    computed:{
      startAddress (){
        return this.$store.getters.startLand
      },
      endAddress() {
        return this.$store.getters.endLand
      },
      listType() {
        return this.$store.getters.productType
      },
      listStart () {
        return this.$store.getters.startDate
      },
      listEnd() {
        return this.$store.getters.endDate
      },
      userWeight(){
        return this.$store.getters.weight
      },
      airIndex(){
        return this.$store.getters.airCost *this.$store.getters.weight
      },
      fuelIndex() {
        return this.$store.getters.fuelCost *this.$store.getters.weight
      },
      exportIndex(){
        return this.$store.getters.exportCost *this.$store.getters.weight
      },
      formIndex(){
        return this.$store.getters.formCost *this.$store.getters.weight
      },
      landIndex(){
        return this.$store.getters.landCost *this.$store.getters.weight
      },
      homeIndex(){
        return this.$store.getters.productCost*this.$store.getters.weight
      },
      dispatchIndex(){
        return this.$store.getters.dispatchCost*this.$store.getters.weight
      },
      sumIndex(){
        return this.$store.getters.sum
      }
    },
    mounted () {
      this.$router.push({ path: '/center/online_product/write', query: { page: 1 }})
      let num = location.href.split('?')[1].split('=')[1]
      this.$store.commit('goIndex',num)
    }
  }
</script>

<style lang="scss" scoped>
  .write-wrapper {
    width:1100px;
    .write-container {
      height:200px;
      width:1100px;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      padding:20px 0;
      .write-inner{
        background:#fff;
        box-shadow:0, 0, 15px, #ccc;
        -webkit-box-shadow:0, 0, 15px, #ccc;
        border:1px solid #fff;
        width:1060px;
        .write-back {
        height:30px;
        display: flex;
        align-items: center;
        justify-content:flex-end;
        margin-right:10px;
      }
      .write-content {
        position:relative;
        background:#fff;
        box-shadow:0 0 15px #ccc;
        height:170px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size:14px;
        .content-pic {
          position:absolute;
          width:100%;
          height:5px;
          top:-5px;
          left:0;
          background:linear-gradient(10deg,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow,red,yellow);
        }
        .list{
          height:26px;
          display:flex;
          flex-direction:row;
          .list-text {
            width:80px;
            display:flex;
            justify-content:center;
            align-items:center;
          }
          .list-num {
            width:190px;
            display:flex;
            justify-content:flex-start;
            align-items:center;
            color:rgba(246,66,75,1)
          }
          .list-land {
            width:190px;
            display:flex;
            justify-content:flex-start;
            align-items:center;
            .product-select {
              transform: scale(.4);
              cursor:pointer;
            }
          }
          .listTime {
            width:500px;
            display:flex;
            justify-content:flex-start;
            align-items:center;
          }
        }
      }
      }
    }
    .product-title {
      height:30px;
      font-size:20px;
      width:100%;
      padding:10px 0 10px 20px;
      color:#000;
    }
    .product-address {
      width:100%;
      height:300px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      .address-left {
        background:#fff;
        box-shadow:0 0 15px #ccc;
        margin-left:20px;
        height:100%;width:490px;
        position:relative;
        display:flex;
        flex-direction:column;

        .left-logo{
          position:absolute;
          width:0;
          height:0;
          border-top: 50px solid rgba(255,219,66,1);
          border-right: 50px solid transparent;
        }
        .logo-text{
          color:#fff;
          font-size:20px;
          position:absolute;
          top:3px;
          left:5px;
        }
        .left-nav {
          height:36px;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          img{
            height:25px;
            margin-right:10px;
          }
        }
        .left-info {
          height:36px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          .left-name{
            height:100%;
            width:180px;
            margin-left:20px;
            display:flex;
            flex-direction:row;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              width:80px;
              margin-left:20px;
            }
          }
          .right-name{
            height:100%;
            width:220px;
            margin-right:20px;
            color:rgba(255,220,68,1);
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px solid rgba(255,220,68,.3);
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }

          }
        }
        .left-phone {
          height:36px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          .left-name{
            height:100%;
            width:180px;
            margin-left:20px;
            display:flex;
            flex-direction:row;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
                flex:1;
                text-indent:10px;
            }
          }
          .right-name{
            height:100%;
            width:220px;
            margin-right:20px;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              text-indent:10px;
            }
          }
        }
        .left-area {
          height:38px;
          margin-top:20px;
          
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:470px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              transform:scale(.8)
            }
          }
        }
        .left-detail{
          height:38px;
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:450px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              margin-left:20px;
            }
          }
        }
        .left-index{
          height:38px;
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:450px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              margin-left:20px;
            }
          }
        }
        .left-btn{
          height:38px;
          width:450px;
          margin:auto;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          .btn-box{
            margin-right:10px;
            color:#fff;
            border-radius:3px;
            height:26px;
            display:flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
          }
          .box1{
            background:rgba(139,200,63,1);
            width:100px;
          }
          .box2{
            background:rgba(139,200,63,1);
            width:80px;
          }
          .box3{
            background:rgba(252,207,0,1);
            width:80px;
          }

        }
      }
      .address-right {
        background:#fff;
        box-shadow:0 0 15px #ccc;
        height:100%;
        width:490px;
        height:100%;width:490px;
        border:1px solid #ccc;
        position:relative;
        display:flex;
        flex-direction:column;
        margin-right:20px;
        .left-logo{
          position:absolute;
          width:0;
          height:0;
          border-top: 50px solid rgba(247,40,50,1);
          border-right: 50px solid transparent;
        }
        .logo-text{
          color:#fff;
          font-size:20px;
          position:absolute;
          top:3px;
          left:5px;
        }
        .left-nav {
          height:36px;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          img{
            height:25px;
            margin-right:10px;
          }
        }
        .left-info {
          height:36px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          .left-name{
            height:100%;
            width:180px;
            margin-left:20px;
            display:flex;
            flex-direction:row;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              width:80px;
              margin-left:20px;
            }
          }
          .right-name{
            height:100%;
            width:220px;
            margin-right:20px;
            color:rgba(255,220,68,1);
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px solid rgba(255,220,68,.3);
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }

          }
        }
        .left-phone {
          height:36px;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
          .left-name{
            height:100%;
            width:180px;
            margin-left:20px;
            display:flex;
            flex-direction:row;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
                flex:1;
                text-indent:10px;
            }
          }
          .right-name{
            height:100%;
            width:220px;
            margin-right:20px;
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              text-indent:10px;
            }
          }
        }
        .left-area {
          height:38px;
          margin-top:20px;
          
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:470px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              transform:scale(.8)
            }
          }
        }
        .left-detail{
          height:38px;
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:450px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              margin-left:20px;
            }
          }
        }
        .left-index{
          height:38px;
          .left-name{
            display:flex;
            flex-direction:row;
            align-items:center;
            width:450px;
            height:100%;
            margin-left:20px;
            margin-right:20px;
            border-bottom:1px solid rgba(0,0,0,.1);
            .name-logo{
              color:rgba(252,29,26,1);
              display:flex;
              align-items:center;
            }
            .name-nav{
              width:64px;
              display:inline-block;
              text-align-last:justify;
            }
            .name-text{
              flex:1;
              margin-left:20px;
            }
          }
        }
        .left-btn{
          height:38px;
          width:450px;
          margin:auto;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          .btn-box{
            margin-right:10px;
            color:#fff;
            border-radius:3px;
            height:26px;
            display:flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
          }
          .box1{
            background:rgba(139,200,63,1);
            width:100px;
          }
          .box2{
            background:rgba(139,200,63,1);
            width:80px;
          }
          .box3{
            background:rgba(252,207,0,1);
            width:80px;
          }

        }
      }
      .address-img {
        flex:1;
      
      }
    }
    .product-information{
      background:#fff;
      box-shadow:0 0 15px #ccc;
      margin:0 20px 0 20px;
      height:200px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      .info-left{
        width:260px;
        height:180px;
        margin-left:20px;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        .info-list{
          height:30px;
          width:220px;
          display:flex;
          align-items:center;
          .name-logo{
            color:red;
            width:10px;
          }
          .name-nav{
            width:80px;
            display:inline-block;
            text-align-last:justify;
          }
          .name-text{
            width:90px;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#000;
          }
        }
      }
      .info-mid{
        width:360px;
        height:180px;
        display:flex;
        flex-direction:row;
        align-items:center;
        .mid-text{
          width:120px;
          height:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
        }
        .mid-box{
          background:#fff;
          border:1px solid #ccc;
          height:150px;
          width:140px;
        }
        img{
          margin-left:20px;
          cursor:pointer;
        }
      }
      .info-right{
        width:260px;
        height:180px;
        margin-right:20px;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        .info-list{
          height:30px;
          width:220px;
          display:flex;
          align-items:center;
          .name-logo{
            color:red;
            width:10px;
          }
          .name-nav{
            width:80px;
            display:inline-block;
            text-align-last:justify;
          }
          .name-text{
            width:90px;
            display:flex;
            justify-content:center;
            align-items:center;
            color:#000;
          }
        }

      }
    }
    .product-pre{
      background:#fff;
      box-shadow:0 0 15px #ccc;
      margin:0 20px 0 20px;
      height:100px;
      display:flex;
      flex-direction:row;
      align-items:center;
      input{
        margin-left:40px;
      }
      .product-preindex{
        margin-left:470px;
        width:120px;
        height:30px;
        border-radius:3px;
        background:rgba(252,207,0,1);
        color:#fff;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
      }
    }
    .product-con{
      background:#fff;
      box-shadow:0 0 15px #ccc;
      margin:0 20px 0 20px;
      height:160px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-around;
      .con-nav{
        height:60px;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-start;
        width:100%;
        border-bottom:1px solid #ccc;
        .con-select{
          transform:scale(.6);
          margin-left:40px;
          cursor:pointer;
        }
      }
      .con-change{
        height:100px;
        width:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        .con-text{
          margin-left:40px;
        }
        .con-btn{
          width:130px;
          height:30px;
          display:flex;
          justify-content:center;
          align-items:center;
          background:rgba(2252,207,0,2);
          color:#fff;
          border-radius:3px;
          cursor:pointer;
          margin-left:380px;
        }
      }
    }
    .product-cost{
      background:#fff;
      box-shadow:0 0 15px #ccc;
      margin:0 20px 0 20px;
      height:300px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
      .cost-content{
        margin-top:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
        border-bottom:1px solid #ccc;
        height:200px;
        width:100%;
        .cost-list{
          width:80%;
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
        }
      }
      .cost-sum{
        display:flex;
        flex-direction:row;
        align-items:center;
        width:100%;
        height:80px;
        justify-content:flex-end;
        .sum-text{
          width:70px;
          display:inline-block;
          text-align-last:justify;
        }
        .sum-num{
          color:rgba(252,207,0,1);
          margin-right:70px;
          margin-left:30px;
        }
      }
    }
    
  }
  .back-complete{
    margin-left:40px;
    display:flex;
    height:100%;
    width:200px;
    align-items:center;
    justify-content:space-between;
    .gokeep {
      width:80px;
      height:24px;
      display:flex;
      justify-content:center;
      align-items:center;
      background:rgba(160,160,160,1);
      color:#fff;
      cursor:pointer;
    }
    .goback {
      cursor:pointer;
    }
  }
</style>
