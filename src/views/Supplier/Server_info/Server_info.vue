<template>
<div class="server-info">
  <div class="head">服务信息</div>
  <div class="body">
    <p class="place">
      <span class="active">北京（PEK）</span>
      <span>上海（PVG）</span>
      <span>深圳（SZX）</span>
    </p>
    <div class="content">
      <!--始发港地面操作服务-->
      <div class="box beginport">
        <div class="pic">
          <img src="../../../assets/detail_info_img2.png">
          <span>始发港地面操作服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">最晚交货时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前4小时</span></li>
            <li><span class="label">交货位置:</span><span>北京市朝阳区爱国路21号</span></li>
            <li><span class="label">联系人:</span><span>沙皮</span></li>
            <li><span class="label">联系方式:</span><span>13528839393</span></li>
          </ul>
        </div>
      </div>
      <!--目的港地面操作服务-->
      <div class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img3.png">
          <span>目的港地面操作服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">最晚交货时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前4小时</span></li>
            <li><span class="label">交货位置:</span><span>北京市朝阳区爱国路21号</span></li>
            <li><span class="label">联系人:</span><span>沙皮</span></li>
            <li><span class="label">联系方式:</span><span>13528839393</span></li>
          </ul>
        </div>
      </div>
      <!--上门取货服务-->
      <div class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img4.png">
          <span>上门取货服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">最晚交货时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前4小时</span></li>
            <li><span class="label">交货位置:</span><span>北京市朝阳区爱国路21号</span></li>
            <li><span class="label">联系人:</span><span>沙皮</span></li>
            <li><span class="label">联系方式:</span><span>13528839393</span></li>
          </ul>
        </div>
      </div>
      <!--落地配服务-->
      <div class="box endport">
        <div class="pic">
          <img src="../../../assets/detail_info_img5.png">
          <span>落地配服务</span>
        </div>
        <div class="text">
          <ul>
            <li><span class="label">预计送达时间&nbsp;&nbsp;:</span><span>航班计划起飞时间前4小时</span></li>
            <li><span class="label">联系人:</span><span>沙皮</span></li>
            <li><span class="label">联系方式:</span><span>13528839393</span></li>
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
export default {
  data () {
    return {
    }
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
