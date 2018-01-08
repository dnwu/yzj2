<template>
<div class="son-account">
  <div class="head">子账号管理</div>
  <div class="body">
    <div class="company-admin">
      <ul class="top-line">
        <li v-for="list in 40"></li>
      </ul>
      <div class="content">
        <div class="left"><img src="../../../assets/head_img.png" alt=""></div>
        <div class="center">
          <p><span class="label">供应商名称&nbsp;&nbsp;:</span><span>深圳云捷讯</span></p>
          <p></p>
          <p><span class="label">用户名:</span><span>YOYO2017</span></p>
        </div>
        <div class="right">
          <p><span class="label">姓名:</span><span>王六</span></p>
          <p><span class="label">手机号&nbsp;:</span><span>18859674554</span></p>
          <p><span class="label">邮箱:</span><span>569847667@qq.com</span></p>
        </div>
      </div>
    </div>
    <ul class="son-list">
      <li>
        <span>状态</span>
        <span>用户名</span>
        <span>姓名</span>
        <span>手机号</span>
        <span>邮箱</span>
        <span>身份证</span>
        <span>创建时间</span>
        <span></span>
        <span></span>
        <span><img class="add" src="../../../assets/son_add.png"></span>
      </li>
      <li>
        <span><i class="circle-yellow"></i></span>
        <span>ske0001</span>
        <span>李大师</span>
        <span>13528896541</span>
        <span>13528896541@qq.com</span>
        <span>612501188006053613</span>
        <span>2018-01-06 12:53</span>
        <span><img src="../../../assets/son_modify.png"></span>
        <span><img src="../../../assets/son_state_1.png"></span>
        <span><img src="../../../assets/son_delete.png"></span>
      </li>
      <li>
        <span><i class="circle-yellow circle-green"></i></span>
        <span>ske0001</span>
        <span>李大师</span>
        <span>13528896541</span>
        <span>13528896541@qq.com</span>
        <span>612501188006053613</span>
        <span>2018-01-06 12:53</span>
        <span><img src="../../../assets/son_modify.png"></span>
        <span><img src="../../../assets/son_state_1.png"></span>
        <span><img src="../../../assets/son_delete.png"></span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .son-account{
    .head{
      height: 61px;
      line-height: 61px;
      padding-left: 20px;
      color: #b3b3b3;
      font-size: 16px;
    }
    .body{
      color: #A7A7A7;
      padding-top: 20px;
      padding-left: 20px;
      .company-admin{
        -moz-box-shadow:0 2px 2px #CFCFCF;         /*firefox*/
        -webkit-box-shadow:0 2px 2px #CFCFCF;      /*webkit*/
        box-shadow: 0 2px 2px #CFCFCF;
        .top-line{
          height: 4px;
          overflow-y: hidden;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          li:nth-child(2n){
            float: left;
            height: 4px;
            width: 40px;
            /* Safari 5.1 - 6.0 */
            background: -webkit-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* Opera 11.1 - 12.0 */
            background: -o-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* Firefox 3.6 - 15 */
            background: -moz-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* 标准的语法 */
            background: linear-gradient(30deg, #fedb43 50%, #f52731 50%);
          }
          li:nth-child(2n-1){
            float: left;
            height: 4px;
            width: 40px;
            /* Safari 5.1 - 6.0 */
            background: -webkit-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* Opera 11.1 - 12.0 */
            background: -o-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* Firefox 3.6 - 15 */
            background: -moz-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* 标准的语法 */
            background: linear-gradient(30deg, #f52731 50%, #fedb43 50%);
          }
        }
        .content{
          font-size: 16px;
          overflow: hidden;
          padding: 10px 20px;
          .left{
            float: left;
            margin: 0px 100px;
            img{
              display: inline-block;
              width: 97px;
              height: 97px;
              margin-top: 3px;
            }
          }
          .center{
            float: left;
            margin-right: 100px;
            p{
              height: 21px;
              margin: 10px 0px;
              .label{
                display: inline-block;
                margin-right: 20px;
                width: 120px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
              }
            }
          }
          .right{
            float: left;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                margin-right: 20px;
                width: 80px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
              }
            }
          }
        }
      }
      .son-list{
        padding: 0;
        padding-top: 10px;
        margin: 0;
        li{
          height: 40px;
          box-sizing: border-box;
          span{
            float: left;
            height: 40px;
            line-height: 40px;
            text-align: center;
            .circle-yellow{
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 10px;
              background-color: #FCCF00;
            }
            i.circle-green{
              background-color: #7AC943;
            }
            img{
              margin-top: 14px;
              cursor: pointer;
            }
            .add{
              margin-top: 8px;
            }
          }
          span:nth-child(1){width: 5%}
          span:nth-child(2){width: 10%}
          span:nth-child(3){width: 10%}
          span:nth-child(4){width: 15%}
          span:nth-child(5){width: 15%}
          span:nth-child(6){width: 15%}
          span:nth-child(7){width: 15%}
          span:nth-child(8){width: 5%}
          span:nth-child(9){width: 5%}
          span:nth-child(10){width: 5%}
        }
        li:not(:first-child){
          border-bottom: 1px solid #EBEBEB;
        }
      }
    }
  }
</style>
