<template>
  <div>
    <HeaderPic title="SPA及卡车联运网络产品"></HeaderPic>
    <div class="content">
      <h4>
        <span></span>产品介绍</h4>
      <p>金鹏网SPA网络覆盖全球110多个城市，提供空运+陆运更为丰富的空运网络覆盖。</p>
      <div class="table">
        <h5>SPA网络覆盖：</h5>
        <div class="head">
          <div class="column1">美洲（50个）</div>
          <div class="column2">欧洲（26个）</div>
          <div class="column3">亚洲（11个）</div>
          <div class="column4">澳洲（7个）</div>
          <div class="column5">中东非洲（18个）</div>
        </div>
        <div class="body">
          <div>
            <h6>北美:</h6>
            <p>亚特兰大、迈阿密、达拉斯、夏洛特、丹佛、奥兰多、菲尼克斯、底特律、奥斯汀、辛辛那提等</p>
            <h6>加拿大:</h6>
            <p>蒙特利尔、哈利法克斯、埃德蒙顿、温尼伯、渥太华</p>
            <h6>南美:</h6>
            <p>圣保罗、波哥大、布宜诺斯艾利斯、卡利、瓜亚吉尔、里约热内卢、圣地亚哥、墨西哥城、利马、麦德森、基多</p>
          </div>
          <div>
            <p>米兰、法兰克福、苏黎世、赫尔辛基、巴塞罗那、维也纳、威尼斯、里昂、伯明翰、哥本哈根、波尔图、汉堡、日内瓦、罗斯托夫、阿姆是他、布达佩斯、基辅、叶卡捷琳堡等。</p>
          </div>
          <div>
            <h6>东南亚:</h6>
            <p>达卡、胡志明市、德里、孟买、仰光、吉隆坡、新加坡、金奈、雅加达、海德拉巴</p>
            <h6>东亚:</h6>
            <p>仁川、釜山、冲绳、平壤、乌兰巴托、大阪、澳门、香港</p>
          </div>
          <div>
            <p>奥克兰、惠灵顿、黄金海岸、珀斯、布里斯班、基督城、堪培拉</p>
          </div>
          <div>
            <p>坎帕拉、达喀尔、卡拉奇、利雅得达曼、马斯科特、吉达、阿布扎比、迪拜、伊斯兰堡、阿比让</p>
          </div>
        </div>
      </div>
      <div class="table">
        <h5>卡车联运网络覆盖全球130多个城市：</h5>
        <div class="head">
          <div class="column1">美洲（42个）</div>
          <div class="column2">欧洲（50个）</div>
          <div class="column3">亚洲（34个）</div>
          <div class="column4">澳洲（6个）</div>
        </div>
        <div class="body">
          <div>
            <h6>美国:</h6>
            <p>哥伦布、奥斯汀、亚特兰大、孟菲斯、伯明翰、圣安东尼奥、底特律、亚特兰大、克利夫兰、达拉斯、休斯顿、波特兰、盐湖城、辛辛那提、丹佛、纽约、奥兰多。</p>
            <h6>加拿大:</h6>
            <p>渥太华、圣约翰斯、温尼伯、埃德蒙顿、蒙克顿、蒙特利尔</p>
          </div>
          <div>
            <p>莱比锡、法兰克福、奥斯陆、里昂、布达佩斯、纽伦堡、慕尼黑、汉堡、杜塞尔多夫、斯德哥尔摩、汉诺威、不来悔、鹿特丹、华沙、维也纳、威尼斯、哥本哈根、科隆、列日、日内瓦、赫尔辛基、格拉斯哥</p>
          </div>
          <div>
            <h6>北京转运:</h6>
            <p>天津、青岛、烟台、西安、大连、武汉、重庆、沈阳、杭州、长沙、合肥、南京、哈尔滨、济南、成都、石家庄、长春</p>
            <h6>青岛转运:</h6>
            <p>济南、沈阳、大连、天津、浦东、北京、郑州、杭州</p>
            <h6>台北:</h6>
            <p>高雄、台中、台南</p>
          </div>
          <div>
            <p>黄金海岸、堪培拉、悉尼、珀斯、阿德莱德、布里斯班。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderPic from "@/components/header";
export default {
  components: {
    HeaderPic
  }
}
</script>
<style lang="scss" scoped>

.content {
  width: 1000px;
  margin: 0 auto 200px;
  padding: 20px;
  color: #828282;
  >p {
    text-indent: 2em;
  }
  .table {
    padding: 30px 90px 0;
    .head {
      display: flex;
      height: 30px;
      div {
        flex: 1;
        line-height: 30px;
        text-align: center;
        border: 1px solid #B2B2B2;
        margin-left: -1px;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .body {
      display: flex;
      margin-top: -1px;
      div {
        border: 1px solid #B2B2B2;
        flex: 1;
        box-sizing: border-box;
        padding: 30px;
        margin-left: -1px;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>

