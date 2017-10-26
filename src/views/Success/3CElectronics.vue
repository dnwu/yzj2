<template>
  <div>
    <div class="pic"></div>
    <div class="title">
      <span class="icon"></span>
      <span>定制化包机服务</span>
    </div>
    <div class="content">
      <h3>公司为客户提供各种特殊物品的定制化包机服务</h3>
      <div class="time-way">
        <div>
          <span>2007年11月6日</span>
          <span>承运旅美大熊猫“美生”回国。</span>
        </div>
        <div>
          <span>2009年6月16日</span>
          <span>完成三亚-大连3条大型鲨鱼运输任务，创造大型海洋活体动物民航运输新纪录。</span>
        </div>
        <div>
          <span>2012年1月7日</span>
          <span>执行四次芝加哥至国内货运航线，共承运种猪4000余头，实现零死亡。</span>
        </div>
        <div>
          <span>2013年12月2日</span>
          <span>执行卢森堡-西安-浦东包机共计3班，圆满完成西安三星项目临时包机运输任务。</span>
        </div>
        <div>
          <span>2015年3月23日</span>
          <span>完成“澳门-北京”文物包机航班;7月14日，顺利完成“上海-马累”外交包机航班。</span>
        </div>
        <div>
          <span>015年11月26日</span>
          <span>顺利完成赫尔辛基到哈尔滨的蓝狐包机航班。</span>
        </div>
        <div>
          <span>2016年3月27日</span>
          <span>完成阿姆斯特丹到西安的陆空联运跨境电商包机。</span>
        </div>
        <div>
          <span>2017年7月</span>
          <span>完成12班西雅图-天津樱桃包机。</span>
        </div>
        <div>
          <span>未来更多。。。</span>
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
    background: url('/static/img/icon11.png') no-repeat center center;
    background-size: contain;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.content {
  width: 800px;
  box-sizing: border-box;
  margin: 30px auto 200px;
  padding: 40px 100px;
  color: #828282;
  border: 1px solid #F1F1F1;
  box-shadow: 0 0 20px #F1F1F1;
  h3 {
    text-align: center;
  }
  .time-way {
    >div {
      position: relative;
      display: flex;
      padding: 25px 0 25px 50px;
      span {
        display: inline-block;
        // line-height: 50px;
        &:first-child {
          color: #f3c300;
          margin-right: 50px;
          width: 100px;
        }
        &:last-child{
          flex: 1;
        }
      }
      &::before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 100%;
        position: absolute;
        background-color: #F3C300;
        left: 0;
        top: 0;
      }
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        padding: 2px;
        background-clip: content-box;
        background-color: #f3c300;
        border: 2px solid #f3c300;
        position: absolute;
        left: -7px;
        top: 25px;
      }
    }
  }
}
</style>

