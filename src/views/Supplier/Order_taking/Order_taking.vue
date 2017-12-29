<template>
<div class="order-taking">
  <div class="head">
    接单管理
  </div>
  <div class="body">
    <div class="body-top">
      <div class="input-top">
        <div class="box order-num">
          <div class="key">订单号</div>
          <div class="value">
            <el-input
              placeholder="请输入内容"
              :clearable = true
              prefix-icon="el-icon-search"
              v-model="orderNum">
            </el-input>
          </div>
        </div>
        <div class="box start-port">
          <div class="key">始发港</div>
          <div class="value">
            <!--<el-select v-model="startPort" clearable placeholder="请选择">
              <el-option
                v-for="item in startPortData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <StartPortselect @startportvalue='startPortValue'></StartPortselect>
          </div>
        </div>
        <div class="box end-port">
          <div class="key">目的港</div>
          <div class="value">
            <!--<el-select v-model="endPort" clearable placeholder="请选择">
              <el-option
                v-for="item in endPortData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <EndPortselect @endportvalue='endPortValue'></EndPortselect>
          </div>
        </div>
        <div class="search-botton"><el-button @click="queryOrder" type="danger">查询</el-button></div>
      </div>
      <div class="input-bottom">
        <div class="box goods-type">
          <div class="key">货物类型</div>
          <div class="value">
            <el-select v-model="goodsType" clearable placeholder="请选择">
              <el-option
                v-for="item in goodsTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box order-status">
          <div class="key">订单状态</div>
          <div class="value">
            <el-select v-model="orderStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in orderStatusData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box order-time">
          <div class="key">订单时间</div>
          <div class="value">
            <el-date-picker
              v-model="orderTime"
              type="daterange"
              size="mini"
              value-format = "yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="export"><el-button type="warning">导出</el-button></div>
      </div>
    </div>
    <div class="body-main">
      <div class="thead wrapper">
        <div class="goodsName">货物名称</div>
        <div class="address">收发地</div>
        <div class="num">件数</div>
        <div class="weight">重量(千克)</div>
        <div class="needPayWeight">计费重量(千克)</div>
        <div class="server">产品服务</div>
        <div class="status">状态</div>
        <div class="operate">操作</div>
      </div>
      <div v-if="orderList.length" >
        <div v-for="list in orderList" class="tbody">
          <!-- 待受理 -->
          <div v-if="list.orderStatus === 2">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status willcare">
                <div class="black"><img :src="listIcon['willcare']" alt="">待受理</div>
                <div>总额¥{{list.amount}}</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)"  size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 待支付 -->
          <div v-else-if="list.orderStatus === 3">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status needpay">
                <div class="black"><img :src="listIcon['needpay']" alt="">待支付</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 已支付 -->
          <div v-else-if="list.orderStatus === 4">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status hadpay">
                <div class="black"><img :src="listIcon['hadpay']" alt="">已支付</div>
                <div>总额¥{{list.amount}}</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 运送中 -->
          <div v-else-if="list.orderStatus === 5">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status send">
                <div class="black"><img :src="listIcon['send']" alt="">运送中</div>
                <div>总额¥{{list.amount}}</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 待补缴 -->
          <div v-else-if="list.orderStatus === 6">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status willcare">
                <div class="black"><img :src="listIcon['willcare']" alt="">待补缴</div>
                <div>总额¥{{list.amount}}</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 已完成 -->
          <div v-else-if="list.orderStatus === 7">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status haddone">
                <div class="black"><img :src="listIcon['haddone']">已完成</div>
                <div>总额¥{{list.amount}}</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="info">处理订单</el-button></div>
              </div>
            </div>
          </div>
          <!-- 已取消 -->
          <div v-else-if="list.orderStatus === 8">
            <div class="tbody-head">
              <div class="time">{{dateTransform(list.createDate)}}</div>
              <div class="mainOrderNum">订单号：{{list.orderNo}}</div>
              <div class="orderNum"><span>主运单号：</span><span @click="examine(list.orderNo,list.id)" class="value">{{list.aviationNumber}}</span></div>
              <div class="examine"><span @click="viewOrder(list.orderNo,list.orderStatus)">查看</span></div>
            </div>
            <div class="wrapper">
              <div class="goodsName">
                <p class="black">{{list.goodsName}}</p>
                <p class="gray">({{list.goodsTypeName}})</p>
              </div>
              <div class="black address">
                <p class="start">{{list.cityStart}}</p>
                <p class="end">{{list.cityEnd }}</p>
                <!-- 北京(PEK)——上海(PVG) -->
              </div>
              <div class="num">
                <p class="gray">预计：{{list.goodsNumber}}</p>
                <p class="black">实际：{{list.actualNumber}}</p>
              </div>
              <div class="weight">
                <p class="gray">预计：{{list.goodsWeight}}</p>
                <p class="black">实际：{{list.actualWeight}}</p>
              </div>
              <div class="needPayWeight">
                <p class="gray">预计：{{list.actualWeight}}</p>
                <p class="black">实际：{{list.actualCalcWeight}}</p>
              </div>
              <div class="server">
                <p>{{list.productCode}}</p>
              </div>
              <div class="status needpay">
                <div class="black"><img :src="listIcon['needpay']" alt="">已取消</div>
              </div>
              <div class="operate">
                <div><el-button @click="dealwith(list.orderNo,list.id)" size="mini" type="danger">处理订单</el-button></div>
              </div>
            </div>
          </div>
        </div>
        <div class="block pagination">
          <el-pagination
            layout="prev, pager, next"
            :page-size = 10
            @current-change = "flipList"
            :total="pageTotal">
          </el-pagination>
        </div>
      </div>
      <div v-else>
        <p style="text-align: center;margin-top: 50px">没有找到相关订单信息</p>
      </div>
    </div>
    <!-- 查看订单的模态框 -->
    <el-dialog title="主运单查看" top="40px" width="1200px" :visible.sync="dialogFormVisible">
      <div class="box main-info">
        <div class="top">
          <div class="order">
            <div class="key">主运单号:</div>
            <div class="value">{{hnaOrder.aviationNumber}}</div>
          </div>
          <div class="plane-num">
            <div class="key">航班号:</div>
            <div class="value">{{hnaOrder.flightNo}}</div>
          </div>
          <div class="plane-time">
            <div class="key">航班日期:</div>
            <div class="value">{{hnaOrder.flightDate}}</div>
          </div>
          <div class="name">
            <div class="key">承运人:</div>
            <div class="value"></div>
          </div>
        </div>
        <div class="mid">
          <div class="start">
            <div class="key">出发站:</div>
            <div class="value">{{hnaOrder.airportStart}}</div>
          </div>
          <div class="end">
            <div class="key">目的站:</div>
            <div class="value">{{hnaOrder.airportEnd}}</div>
          </div>
        </div>
        <div class="bottom">
          <div class="proxy">
            <div class="key">开单代理:</div>
            <div class="value"></div>
          </div>
        </div>
      </div>
      <div class="box address-info">
        <div class="address">
          <div class="center-icon">
            <img :src="listIcon['planeIcon']" alt="">
          </div>
          <div class="left">
            <div class="icon">发</div>
            <div class="box name-id">
              <div class="key">姓名</div>
              <div class="value">{{senderAddress.contactName}}</div>
              <div class="key">身份证</div>
              <div class="value">{{senderAddress.identityCard}}</div>
            </div>
            <div class="box phone-cellphone">
              <div class="key">手机号</div>
              <div class="value">{{senderAddress.contactMobile}}</div>
              <div class="key">固定电话</div>
              <div class="value">{{senderAddress.contactPhone}}</div>
            </div>
            <div class="box address-detial">
              <div class="key">详细地址</div>
              <div class="value">{{senderAddress.detailAddress}}</div>
            </div>
            <div class="box postal">
              <div class="key">邮政编码</div>
              <div class="value">{{senderAddress.postCode}}</div>
            </div>
          </div>
          <div class="right">
            <div class="icon">收</div>
            <div class="box name-id">
              <div class="key">姓名</div>
              <div class="value">{{receiverAddress.contactName }}</div>
              <div class="key">身份证</div>
              <div class="value">{{receiverAddress.identityCard}}</div>
            </div>
            <div class="box phone-cellphone">
              <div class="key">手机号</div>
              <div class="value">{{receiverAddress.contactMobile}}</div>
              <div class="key">固定电话</div>
              <div class="value">{{receiverAddress.contactPhone}}</div>
            </div>
            <div class="box address-detial">
              <div class="key">详细地址</div>
              <div class="value">{{receiverAddress.detailAddress}}</div>
            </div>
            <div class="box postal">
              <div class="key">邮政编码</div>
              <div class="value">{{receiverAddress.postCode}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box goods-info">
        <div class="item1">
          <div>
            <div class="key">件数</div>
            <div class="value">{{orderGoodsDetail.goodsNumber}}</div>
            <div class="unit">件</div>
          </div>
          <div>
            <div class="key">SLAC件数</div>
            <div class="value"></div>
            <div class="unit">件</div>
          </div>
          <div>
            <div class="key">重量</div>
            <div class="value">{{orderGoodsDetail.goodsWeight}}</div>
            <div class="unit">件</div>
          </div>
        </div>
        <div class="item2">
          <div>
            <div class="key">计费重量</div>
            <div class="value">{{orderGoodsDetail.valuationWeight}}</div>
            <div class="unit">KG</div>
          </div>
          <div style="visibility:hidden">
            <div class="key">占位</div>
            <div class="value">占位</div>
            <div class="unit">占位</div>
          </div>
          <div>
            <div class="key">体积</div>
            <div class="value">{{orderGoodsDetail.goodsVolume}}</div>
            <div class="unit">立方米</div>
          </div>
        </div>
        <div class="item3">
          <div class="key">货物尺寸</div>
          <EasyScrollbar>
            <div id="wrapper" class="box">
              <div>
                <p v-for="list in goodsSizeList">{{list}}</p>
              </div>
            </div>
          </EasyScrollbar>
        </div>
        <div class="item4">
          <div>
            <div class="key">处理代码</div>
            <div class="value">{{orderGoodsDetail.goodsTypeName}}</div>
          </div>
          <div>
            <div class="key">包装</div>
            <div class="value">{{orderGoodsDetail.goodsPackage}}</div>
          </div>
          <div>
            <div class="key">货物名称</div>
            <div class="value">{{orderGoodsDetail.goodsName}}</div>
          </div>
        </div>
      </div>
      <div class="box price-info">
        <div class="price-top">
          <div class="left">
            <div>
              <div class="key">航空运价</div>
              <div class="value">10</div>
              <div class="unit">元/KG</div>
            </div>
            <div>
              <div class="key">燃油附加</div>
              <div class="value">0.2</div>
              <div class="unit">元/KG</div>
            </div>
            <div>
              <div class="key">其他费用</div>
              <div class="value">1000</div>
              <div class="unit">元</div>
            </div>
            <div>
              <div class="key">航空运费</div>
              <div class="value">1000</div>
              <div class="unit">元</div>
            </div>
          </div>
          <div class="right">
            <div class="key">备注</div>
            <div class="value"></div>
          </div>
        </div>
        <div class="price-bottom">
          <div>
            <div class="key">币种</div>
            <div class="value">CNY</div>
          </div>
          <div>
            <div class="key">制单时间</div>
            <div class="value"></div>
          </div>
          <div>
            <div class="key">制单人</div>
            <div class="value"></div>
          </div>
          <div>
            <div class="key">制单营业点</div>
            <div class="value"></div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>
<script>
  import StartPortselect from "@/components/StartPortselect";
  import EndPortselect from "@/components/EndPortselect";
  import { logout } from "@/tools/logout";
  import { mapGetters } from "vuex";
export default {
  mixins: [logout],
  components: {
    StartPortselect,
    EndPortselect,
  },
  data() {
    return {
      dialogFormVisible: false,
      listIcon: {
        hadpay: require("../../../assets/hadpay_icon.png"),
        needpay: require("../../../assets/needpay_icon.png"),
        send: require("../../../assets/send_icon.png"),
        willcare: require("../../../assets/willcare.png"),
        haddone: require("../../../assets/haddone.png"),
        planeIcon: require("../../../assets/plane_icon.png")
      },
      orderNum: "",
      startPortData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      startPort: "",
      endPortData: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      endPort: "",
      goodsTypeData: [
        {
          value: 7,
          label: "普货"
        },
        {
          value: 8,
          label: "冷链"
        },
        {
          value: 9,
          label: "重货"
        },
        {
          value: 10,
          label: "危险品"
        },
      ],
      goodsType: "",
      orderStatusData: [
        {
          value: 2,
          label: "待受理"
        },
        {
          value: 3,
          label: "待支付"
        },
        {
          value: 4,
          label: "已支付"
        },
        {
          value: 5,
          label: "运送中"
        },
        {
          value: 6,
          label: "待补缴"
        },
        {
          value: 7,
          label: "已完成"
        },
        {
          value: 8,
          label: "已取消"
        },
      ],
      orderStatus: "",
      orderTime: [],
      startAddress:'',
      endAddress:'',
      pageTotal: 0,
      orderList: [],
      hnaOrder: {},
      senderAddress: {}, //发货人信息
      receiverAddress: {}, //收货人信息
      orderGoodsDetail: {}, //货物信息
      goodsSizeList: [], //货物尺寸
    };
  },
  created() {
    this.getOrderList(1);
  },
  methods:{
    getOrderList(page) {
      let goodsType = this.goodsType || -1;
      let orderStatus = this.orderStatus || -1;
      this.axios.post("/web/v1/supplier/order/orderList",{
          "cityEnd": this.endAddress,
          "cityStart": this.startAddress,
          "endTime": this.orderTime[0],
          "goodType": goodsType,
          "id": parseInt(this.id),
          "orderNo": this.orderNum,
          "orderStatus": orderStatus,
          "pageIndex": page,
          "size": 10,
          "startTime": this.orderTime[1],
          "token": this.token
      }).then(data => {
          if(data.data.code === 1){
            this.orderList = data.data.data;
            this.pageTotal = data.data.total;
          }else if(data.data.code === -1){
            this.$notify.error({
              title: '错误',
              message: '登录失效，请重新登录！'
            });
            this.logout();
          }else{
            console.log(data.data.msg);
            this.$notify.error({
              title: '错误',
              message: '错误，请重试！'
            });
          }
      }).catch(function(err){
        this.$notify.error({
          title: '错误',
          message: '错误，请重试！'
        });
      });
    },
    dateTransform(time){
      let newTime = new Date(time);
      let year = newTime.getFullYear();
      let month = (newTime.getMonth() + 1)<10?'0'+(newTime.getMonth() + 1):(newTime.getMonth() + 1);
      let date = newTime.getDate()<10?'0'+newTime.getDate():newTime.getDate();
      let hour = newTime.getHours()<10?'0'+newTime.getHours():newTime.getHours();
      let minutes = newTime.getMinutes()<10?'0'+newTime.getMinutes():newTime.getMinutes();
      return year+'-'+month+'-'+date+' '+hour+':'+minutes
    },
    queryOrder (){
        this.getOrderList(1);
    },
    flipList (page){
      this.getOrderList(page)
    },
    startPortValue (value){
        this.startAddress = value
    },
    endPortValue (value){
      this.endAddress = value
    },
    examine(no,id){
      this.dialogFormVisible = true;
      this.axios.post("/app/v1/order/getOrderDetail",{
        "id": this.id,
        "orderId": id,
        "orderNo": no,
        "token": this.token,
      }).then(data => {
        if(data.data.code === 1){
          let res = data.data.data;
          this.hnaOrder = res;
          this.senderAddress = res.senderAddress||{};
          this.receiverAddress = res.receiverAddress||{};
          if(res.orderGoodsDetail){
            let goodsTypeName = '';
            switch (parseInt(res.orderGoodsDetail.goodsType)){
              case 7: goodsTypeName = '普货'; break;
              case 8: goodsTypeName = '冷链'; break;
              case 9: goodsTypeName = '重货'; break;
              case 10: goodsTypeName = '危险品'; break;
            }
            res.orderGoodsDetail.goodsTypeName = goodsTypeName;
            this.orderGoodsDetail = res.orderGoodsDetail;
            if(res.orderGoodsDetail.goodsSize){
              this.goodsSizeList = res.orderGoodsDetail.goodsSize.split(',');
            }
          }
        }else if(data.data.code === -1){
          this.$notify.error({
            title: '错误',
            message: '登录失效，请重新登录！'
          });
          this.logout();
        }else{
          this.$notify.error({
            title: '错误',
            message: '错误，请重试！'
          });
        }
      }).catch(function(err){
        this.$notify.error({
          title: '错误',
          message: '错误，请重试！'
        });
      });
    },
    dealwith (no,id){
      this.$router.push({ path: '/supplier/order_deal', query: { orderNo: no,orderId: id}})

    },
    viewOrder (no,status){
      this.$router.push({path:'/supplier/order_track',query:{orderNo: no,orderStatus: status}})
    }
  },
  computed: {
    ...mapGetters(["id", "token"])
  }
};
</script>
<style lang="scss">
.order-taking {
  .head {
    height: 61px;
    line-height: 61px;
    padding-left: 20px;
    color: #b3b3b3;
    font-size: 16px;
  }
  .body {
    .body-top {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-top: 10px;
      border-bottom: 1px solid #ececec;
      .input-top,
      .input-bottom {
        margin: 10px 0px;
        .box {
          line-height: 30px;
          display: flex;
          color: #4c4c4c;
          margin-right: 20px;
          .key {
            margin-right: 10px;
          }
          .value {
            .el-input {
              input {
                height: 28px;
                background-color: #e6e6e6;
              }
              i {
                line-height: 30px;
              }
            }
            .el-date-editor {
              background-color: #e6e6e6;
              input {
                background-color: #e6e6e6;
              }
            }
          }
        }
      }
      .input-top {
        display: flex;
        .search-botton {
          flex: 1;
          text-align: right;
          button {
            padding: 6px 20px;
            box-shadow: 3px 3px 4px #e0e0e0;
          }
        }
      }
      .input-bottom {
        display: flex;
        .export {
          flex: 1;
          text-align: right;
          button {
            padding: 6px 20px;
            box-shadow: 3px 3px 4px #e0e0e0;
          }
        }
      }
    }
    .body-main {
      padding: 30px;
      .wrapper {
        display: grid;
        grid-template-columns: 100px 250px repeat(6, 1fr);
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
      }
      .tbody {
        margin-top: 10px;
        box-shadow: 4px 4px 4px #e0e0e0;
        background-color: #fff;
        .tbody-head {
          display: flex;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px dashed #efefef;
          color: #9f9f9f;
          > div {
            margin-left: 30px;
          }
          .orderNum {
            .value {
              color: #40b4e5;
            }
            .value:hover{
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .examine {
            flex: 1;
            text-align: right;
            cursor: pointer;
            margin-right: 30px;
            span {
              &:hover {
                color: gray;
              }
            }
          }
        }
        .wrapper {
          //height: 100px;
          // text-align: center;
          justify-items: center;
          align-items: center;
          // grid-gap: 10px;
          > div {
            // border-right: 1px dashed #efefef;
            &:last-child {
              border: none;
            }
          }
          .address {
            position: relative;
            .start {
              &::before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: -20px;
                width: 1px;
                height: 50%;
                background-color: #9c9c9c;
              }
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                top: 20px;
                left: -20px;
                width: 10px;
                height: 1px;
                background-color: #9c9c9c;
              }
            }
            .end {
              &::after {
                content: "";
                display: inline-block;
                position: absolute;
                bottom: 20px;
                left: -20px;
                width: 10px;
                height: 1px;
                background-color: #9c9c9c;
              }
            }
          }
          .status {
            &.needpay {
              color: #f5323a;
            }
            &.send {
              color: #fcd831;
            }
            &.haddone {
              color: #8cc63f;
            }
            img {
              transform: translateY(2px);
            }
            button {
              margin-top: 8px;
              background-color: #fff;
              color: #fa5555;
              padding: 4px 10px;
              &:hover {
                color: #fa5555;
              }
            }
          }
          .operate {
            span {
              cursor: pointer;
              margin: 0 4px;
            }
            .detail:hover,
            .track:hover {
              color: black;
            }
            button {
              margin-top: 8px;
              padding: 4px 10px;
              box-shadow: 4px 4px 4px #e0e0e0;
            }
          }
        }
      }
      .pagination{
        text-align: center;
        margin-top: 20px;
      }
    }
    .el-dialog__wrapper {
      .el-dialog__header {
        background-color: #fccf00;
        .el-dialog__title {
          color: #fff;
          font-weight: 700;
        }
      }
      .el-dialog__body {
        .box {
          margin: 10px 0;
        }
        .main-info {
          // min-height: 100px;
          box-shadow: 0px 0px 4px #e0e0e0;
          padding: 10px;
          .top,
          .mid,
          .bottom {
            display: flex;
            margin: 10px 0;
            .key {
              color: #9b9b9b;
              margin-right: 20px;
            }
            .value {
              color: #b5b5b5;
            }
          }
          .top {
            .order,
            .plane-num,
            .plane-time,
            .name {
              flex: 1;
              display: flex;
              padding: 0 10px;
              .key {
                color: #9b9b9b;
                margin-right: 10px;
              }
            }
            .order {
              .value {
                color: #f52b34;
                font-weight: 500;
              }
            }
          }
          .mid {
            .start,
            .end {
              display: flex;
              margin: 0 10px;
            }
            .end {
              margin-left: 100px;
              position: relative;
              &::before {
                content: "";
                display: inline-block;
                width: 100%;
                height: 1px;
                background-color: #e0e0e0;
                position: absolute;
                top: 50%;
                left: -98px;
              }
            }
          }
          .bottom {
            .proxy {
              display: flex;
              margin: 0 10px;
            }
          }
        }
        .address-info {
          padding: 0 10px;
          box-shadow: 0px 0px 4px #e0e0e0;
          .address {
            display: flex;
            height: 200px;
            margin-top: 20px;
            background-color: #fff;
            position: relative;
            line-height: 20px;
            .center-icon {
              position: absolute;
              right: 56%;
              top: 50%;
              transform: translate(120%, -40%);
            }
            .left {
              // 中间的斜线
              &::before {
                position: absolute;
                content: "";
                right: 60px;
                top: 0;
                width: 1px;
                height: 53%;
                background-color: #e6e6e6;
                transform-origin: 0px 0px;
                transform: rotate(-18deg);
              }
              &::after {
                position: absolute;
                content: "";
                right: 60px;
                bottom: 0;
                width: 1px;
                height: 53%;
                background-color: #e6e6e6;
                transform-origin: center bottom;
                transform: rotate(18deg);
              }
              .icon {
                background-color: #ffda44;
              }
            }
            .right {
              .icon {
                background-color: #f4292f;
              }
            }
            .left,
            .right {
              flex: 1;
              position: relative;
              // 右下角icon
              .icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                // background-color: #f4292f;
                position: absolute;
                bottom: 0;
                right: 50px;
                text-align: center;
                line-height: 30px;
                color: #fff;
                margin: 0 10px 10px 0;
              }
              .box {
                display: flex;
                .key {
                  width: 60px;
                  text-align: justify;
                  color: #999;
                  &::after {
                    content: "";
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    height: 0;
                  }
                }
                .value {
                  width: 160px;
                  margin-left: 20px;
                  color: #4d4d4d;
                }
              }
              .name-id,
              .phone-cellphone {
                .value {
                  width: 160px;
                }
              }
            }
          }
        }
        .goods-info {
          box-shadow: 0px 0px 4px #e0e0e0;
          display: flex;
          padding: 10px 20px;
          .item1,
          .item2,
          .item4 {
            flex: 1;
            > div {
              display: flex;
              margin: 10px 0;
              .key {
                width: 70px;
                text-align-last: justify;
              }
              .value {
                width: 70px;
                text-align: center;
              }
              .unit{
                width: 50px;
                text-align: center;
              }
            }
          }
          .item3 {
            flex: 1;
            display: flex;
            .easy-scrollbar {
              border: 1px solid #b3b3b3;
              height: 100px;
            }
            .key {
              line-height: 100px;
              transform: translateX(-20px);
            }
            .box {
              width: 200px;
              height: 100px;
              margin: 0;
              padding: 10px;
              box-sizing: border-box;
            }
          }
        }
        .price-info {
          min-height: 100px;
          box-shadow: 0px 0px 4px #e0e0e0;
          padding: 10px;
          .price-top {
            display: flex;
            padding-bottom: 10px;
            border-bottom: 1px dotted #e0e0e0;
            .left {
              > div {
                display: flex;
                .key {
                  width: 80px;
                  text-align-last: justify;
                }
                .value {
                  width: 80px;
                  text-align: center;
                }
                .unit {
                  width: 50px;
                  text-align: center;
                }
              }
            }
            .right {
              flex: 1;
              margin-left: 60px;
              display: flex;
              align-items: flex-end;
              .key {
                width: 80px;
                text-align-last: justify;
              }
              .value {
                flex: 1;
                border-bottom: 1px solid #e0e0e0;
              }
            }
          }
          .price-bottom{
            display: flex;
            margin-top: 10px;
            >div{
              flex: 1;
              display: flex;
              .key{
                color: #9F9F9F;
                width: 80px;
                text-align-last: justify;
                margin-right: 20px;
              }
              .value{
                color: #808080;
              }
            }
          }
        }
      }
      .dialog-footer{
        text-align: center;
        button{
          padding: 6px 80px;
        }
      }
    }
  }
}
</style>
