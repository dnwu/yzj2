
const state = {
  airSelect: false,     // 是否选中航空运费
  fuelSelect: false,    // 是否选中始发港交货
  landSelect: false,    // 是否选中目的港提货
  homeSelect: false,    // 是否选中上门取货
  dispatchSelect: false,// 是否选中落地配送
  weightNum:0,          // 用户输入货物重量
  airCost: 0,           // 航空运费单价
  fuelCost: 0,          // 燃油附加费
  exportCost: 0,        // 出港处置费
  landCost: 0,          // 出港制单费
  minCost: 0,           // 最低收费
  formCost: 0,          // 进港提货费
  productCost: 0,       // 配送费
  dispatchCost: 0,      // 地面运输费
  insuranceCost: 0,     // 报关报检
  safeCost: 0,          // 运输保险
  sum:0,                // 订单总价
  nowIndex:0,           // 订单步骤进度
  productType:1,        // 货物类型
  startDate: '',        // 航班起飞开始时间
  endDate: '',          // 航班落地时间
  startLand: '',        // 运输路线起始地点
  endLand: '',          // 运输终点
  username : '123', // 用户名
  token:'11',   // token
  id:'',        // 用户id
  usertype:''   // 用户类型，会员登录或者供应商登录
}
export default state
