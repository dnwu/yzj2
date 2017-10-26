<template>
  <div>
    <div class="pic"></div>
    <div class="title">
      <span class="icon"></span>
      <span>航线资源</span>
    </div>
    <div class="content">
      <div class="box">
        <p>航空货运业务覆盖国内外270余个城市，国内外航线近1200条，拥有26架全货机，近700架客机的腹舱资源。</p>
        <p>拥有丰富的国际航线网络资源，以西安为全球货运航网中心枢纽点，选取全球主要机场作为关键枢纽，借助747/777大型全货机，打通全球主要骨干航线；借助737/767/330中小型全货机，开拓各区域航空货运支线网络；借助客机腹舱资源，全面延伸全球航空货运网络。最终形成以西安为全球航空货运中心，国际干线、区域支线、客机腹舱相结合，网、线、点相衔接，辐射中亚，覆盖“一带一路”相关国家和地区的全球航空货运航线网络。</p>
        <p>未来平台计划持续开通航线，完善航线网络。在以下三大划分区域内同时开通相应航线、逐步拓展全球网络，有步骤有计划地建立西安与国内外重要枢纽城市之间的航线网络：</p>
        <div>
          <p>一、欧、美、澳、非区域——主要大机型（747/777）为主，以阿姆斯特丹、迈阿密芝加哥等为关键枢纽，法兰克福、洛杉矶、悉尼等地为核心航点。</p>
        </div>
        <div>
          <p>二、中东、亚洲区域——主要以中机型（767/330）为主，以迪拜、伊斯坦布尔、香港等为关键枢纽，东京、新加坡、首尔、曼谷等地为核心航点。</p>
        </div>
        <div>
          <p>三、国内区域——主要以小机型（737）为主，以西安、上海为关键枢纽，北京、天津、成都等地为核心航点。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.pic {
  height: 250px;
  background-image: url('/static/img/thead.png');
  background-size: cover;
}

.title {
  height: 68px;
  background-color: #F1F1F1;
  border-bottom: 2px solid #B3B3B3;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 68px;
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/img/icon8.png') no-repeat center center;
    background-size: contain;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.content {
  width: 600px;
  margin: 30px auto 200px;
  padding: 40px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  .box{
    >p{
      text-indent: 2em;
      margin: 0;
      line-height: 30px;
    }
    >div{
      border: 2px solid #DABE1F;
      margin: 10px 0;
      padding: 20px;
      p{
        margin: 0;
        text-indent: 2em;
      }
    }
  }
}
</style>

