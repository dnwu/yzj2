/**
 * Created by tuki on 2017/9/27.
 */
export default [
  {
    title: "首页",
    view: "home",
  },
  {
    title: "产品服务",
    view: "product",
    next: true,
    children: [
      {
        title: "航空货运服务",
        view: "product/airCargoServices",
        children: [
          {
            // title: "国内快递运输",
            // view: "product/airCargoServices/domestic",
            title: "海航航线网络产品",
            view: "product/airCargoServices/haihang",
          },
          {
            // title: "国际快递运输",
            // view: "product/airCargoServices/international",
            title: "SPA及卡车联运网络产品",
            view: "product/airCargoServices/spa_truck",
          },
          {
            // title: "普货运输",
            // view: "product/airCargoServices/normal",
            title: "货物运输组合方案",
            view: "product/airCargoServices/make_up",
          },
          {
            // title: "重货运输",
            // view: "product/airCargoServices/heavy",
            title: "种类特性产品",
            view: "product/airCargoServices/class",
          },
          {
            // title: "重货运输",
            // view: "product/airCargoServices/codeChain",
            title: "货物服务性产品",
            view: "product/airCargoServices/goods_server",
          },
          {
            // title: "危险品运输",
            // view: "product/airCargoServices/danger",
            title: "货机包舱、包板产品",
            view: "product/airCargoServices/contract",
          },
        ]
      },
      {
        title: "货站地面服务",
        view: "product/entrepotServices",
      },
      {
        title: "代理人服务",
        view: "product/managerServices",
      },
      {
        title: "金融服务",
        view: "product/financeServices",
      },
      {
        title: "智慧口岸",
        view: "product/smartServices",
      },
    ]
  },
  {
    title: "供应链资源",
    view: "resource",
    children: [
      {
        title: "航空公司",
        view: "resource/airCompany",
      },
      {
        title: "航线资源",
        view: "resource/airwayResource",
      },
      {
        title: "机型资源",
        view: "resource/airModelResource",
      },
      {
        title: "货站资源",
        view: "resource/entrepotResource",
      },
      {
        title: "合作伙伴",
        view: "resource/cooperativePartner",
      },
    ]
  },
  {
    title: "成功案例",
    view: "success",
    children: [
      {
        title: "定制化包机服务",
        view: "success/3CElectronics",
      },
      {
        title: "定制化一体化解决方案",
        view: "success/healthCare",
      },
      {
        title: "跨境电商综合物流服务",
        view: "success/freshProduce",
      },
      // {
      //   title: "快消行业",
      //   view: "success/FMCG",
      // },
    ]
  },
  {
    title: "服务支持",
    view: "service",
    // children: [
    //   {
    //     title: "我要发货",
    //     view: "service/deliver",
    //   },
    //   {
    //     title: "订单查询",
    //     view: "service/order",
    //   },
    //   {
    //     title: "运价时效查询",
    //     view: "service/price",
    //   },
    //   {
    //     title: "运输范围查询",
    //     view: "service/range",
    //   },
    //   {
    //     title: "运输标准查询",
    //     view: "service/standard",
    //   },
    //   {
    //     title: "更多标准查询",
    //     view: "service/more",
    //   },
    // ]
  },
  // {
  //   title: "促销活动",
  //   view: "promotion",
  // },
  {
    title: "关于我们",
    view: "about",
    // children: [
    //   {
    //     title: "关于扬子江货运集团",
    //     view: "about/company",
    //   },
    //   {
    //     title: "新闻中心",
    //     view: "about/news",
    //   },
    //   {
    //     title: "会员权益",
    //     view: "about/member",
    //   },
    //   {
    //     title: "人才招聘",
    //     view: "about/join",
    //   },
    // ]
  },
]
