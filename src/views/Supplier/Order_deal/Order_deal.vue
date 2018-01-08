<template>
  <div class="order-deal">
    <div class="head">
      <div class="title">
        <el-breadcrumb separator=">>>">
          <el-breadcrumb-item :to="{ path: '/supplier/order_taking' }">接单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="linear"></div>
        <div class="main-top-title">
          <div class="time">{{hnaOrder.createTime}}</div>
          <div class="btn"><span class="refuse">拒绝订单</span></div>
        </div>
        <div class="content">
          <div class="left">
            <div class="box orderNum">
              <div class="title">订单编号:</div>
              <div class="detail">{{hnaOrder.orderNo}}</div>
            </div>
            <div class="box transLine">
              <div class="title">运输线路:</div>
              <div class="detail">{{hnaOrder.airportStart}}——{{hnaOrder.airportEnd}}</div>
            </div>
            <div class="box baseserve">
              <div class="title">基础服务:</div>
              <div class="detail">
                <div class="item"><span class="get el-icon-circle-check"></span><span>航空运输</span></div>
              </div>
            </div>
            <div class="box moreserver">
              <div class="title">更多服务:</div>
              <div class="detail">
                <div class="item" :class="{not:!serviceStatus.serviceB}"><span class="get el-icon-circle-check"></span><span>始发港交货</span></div>
                <div class="item" :class="{not:!serviceStatus.serviceC}"><span class="get el-icon-circle-check"></span><span>目的港提货</span></div>
                <div class="item" :class="{not:!serviceStatus.serviceD}"><span class="get el-icon-circle-check"></span><span>上门取货</span></div>
                <div class="item" :class="{not:!serviceStatus.serviceE}"><span class="get el-icon-circle-check"></span><span>落地配</span></div>
              </div>
            </div>
            <!--<div class="box increaseserver">
              <div class="title">增值服务:</div>
              <div class="detail">
                <div class="item"><span class="get el-icon-circle-check"></span><span>报关报检</span></div>
                <div class="item not"><span class="get el-icon-circle-check"></span><span>运输保险</span></div>
              </div>
            </div>-->
          </div>
          <div class="middle">
            <img src="../../../assets/send.png" alt="">
            <p>{{hnaOrder.statusName}}</p>
          </div>
          <div class="right">
            <el-button type="danger" @click="viewOrder">订单跟踪</el-button>
          </div>
        </div>
      </div>
      <div class="server-info">
        <div class="triangle">
            <p>服务信息</p>
        </div>
        <div class="box airtrans">
          <!-- 航空运输服务信息调整模态框 -->
          <el-dialog width="951px" title="服务信息调整" :visible.sync="serverInfoModel.airtrans">
            <p><span>产品类型：</span><span class="type">航空运输服务</span></p>
            <div class="model-main">
              <div class="left">
                <div class="item flightNumber">
                  <span class="key">预定航班：</span><span class="value">{{hnaOrder.flightNo}}</span>
                </div>
                <div class="item flightData">
                  <span class="key">航班时间：</span><span class="value">{{hnaOrder.flightDate}}</span>
                </div>
                <div class="item flighttime">
                  <span class="key">航班时刻：</span><span class="value">{{hnaOrder.starHour}}-{{hnaOrder.endHour}}</span>
                </div>
                <div class="item transNum">
                  <span class="key">运单号码：</span><span class="value">{{hnaOrder.aviationNumber}}</span>
                </div>
              </div>
              <div class="middle">
                <img src="../../../assets/arrow_icon.png" alt="">
              </div>
              <div class="right">
                <div class="item flightNumber">
                  <div class="key">预定航班：</div>
                  <div class="value">
                    <input v-model="flightNo" type="text" placeholder="请输入航班号">
                  </div>
                </div>
                <div class="item flightData">
                  <div class="key">航班时间：</div>
                  <div class="value">
                    <el-date-picker
                      size="mini"
                      v-model="flightDate"
                      type="date"
                      :editable = false
                      value-format = "yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                  <div class="arrow el-icon-arrow-down"></div>
                </div>
                <div class="item flighttime">
                  <div class="key">航班时刻：</div>
                  <div class="value">
                    <el-time-picker
                      size="mini"
                      is-range
                      v-model="flighttime"
                      :editable = false
                      format = "HH:mm"
                      value-format = "HH:mm"
                      range-separator="--"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                    </el-time-picker>
                  </div>
                  <div class="arrow el-icon-arrow-down"></div>
                </div>
                <div class="item transNum">
                  <div class="key">运单号码：</div>
                  <div class="value">
                    <input v-model="transNum" type="text" placeholder="请输入运单号">
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="serverInfoModel.airtrans = false">取 消</span>
              <el-button size="mini" class="sure" type="warning" @click="modifyServiceInfo">确 定</el-button>
            </div>
          </el-dialog>
          <div class="reset"><img :class="{hide:!statusAdmin.serviceAdjustment}" @click="serverInfoModel.airtrans = true" src="../../../assets/reset_icon.png"></div>
          <div class="img"><img src="../../../assets/detail_info_img1.png" alt=""></div>
          <div class="title">航空运输服务</div>
          <div class="content">
            <div class="item flightNumber">
              <span>预定航班：</span><span>{{hnaOrder.flightNo}}</span>
            </div>
            <div class="item flightData">
              <span>航班时间：</span><span>{{hnaOrder.flightDate}}</span>
            </div>
            <div class="item flighttime">
              <span>航班时刻：</span><span>{{hnaOrder.starHour}}-{{hnaOrder.endHour}}</span>
            </div>
            <div class="item transNum">
              <span>运单号码：</span><span>{{hnaOrder.aviationNumber}}</span>
            </div>
          </div>
        </div>
        <div v-if="serviceStatus.serviceB" class="box beginport">
          <!-- 始发港地面操作服务信息调整模态框 -->
          <el-dialog title="始发港地面操作服务" :visible.sync="serverInfoModel.beginport">
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <div class="reset"><img :class="{hide:!statusAdmin.serviceAdjustment}" src="../../../assets/reset_icon.png"></div>
          <div class="img"><img src="../../../assets/detail_info_img2.png" alt=""></div>
          <div class="title">始发港地面操作服务</div>
          <div class="content">
            <div class="item flightNumber">
              <span>最晚交货时间：</span><span>{{airportStartAgent.arrivalTime}}</span>
            </div>
            <div class="item flightData">
              <span>货运代理：</span><span>{{airportStartAgent.agentCompany}}</span>
            </div>
            <div class="item flighttime">
              <span>交货位置：</span><span>{{airportStartAgent.deliveryAddress}}</span>
            </div>
            <div class="item flightData">
              <span>联系人：</span><span>{{airportStartAgent.agentContactName}}</span>
            </div>
            <div class="item transNum">
              <span>联系方式：</span><span>{{airportStartAgent.agentContactPhone}}</span>
            </div>
          </div>
        </div>
        <div v-if="serviceStatus.serviceC" class="box endport">
          <!-- 目的港地面操作服务信息调整模态框 -->
          <el-dialog title="目的港地面操作服务" :visible.sync="serverInfoModel.endport">

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <div class="reset"><img :class="{hide:!statusAdmin.serviceAdjustment}" src="../../../assets/reset_icon.png"></div>
          <div class="img"><img src="../../../assets/detail_info_img3.png" alt=""></div>
          <div class="title">目的港地面操作服务</div>
          <div class="content">
            <div class="item flightNumber">
              <span>预计取货时间：</span><span>{{airportEndAgent.arrivalTime}}</span>
            </div>
            <div class="item flightData">
              <span>货运代理：</span><span>{{airportEndAgent.agentCompany}}</span>
            </div>
            <div class="item flighttime">
              <span>提货位置：</span><span>{{airportEndAgent.deliveryAddress}}</span>
            </div>
            <div class="item flightData">
              <span>联系人：</span><span>{{airportEndAgent.agentContactName}}</span>
            </div>
            <div class="item transNum">
              <span>联系方式：</span><span>{{airportEndAgent.agentContactPhone}}</span>
            </div>
          </div>
        </div>
        <div v-if="serviceStatus.serviceD" class="box pickup">
          <!-- 上门取货服务信息调整模态框 -->
          <el-dialog title="上门取货服务" :visible.sync="serverInfoModel.pickup">

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <div class="reset"><img :class="{hide:!statusAdmin.serviceAdjustment}" src="../../../assets/reset_icon.png"></div>
          <div class="img"><img src="../../../assets/detail_info_img4.png" alt=""></div>
          <div class="title">上门取货服务</div>
          <div class="content">
            <div class="item flightNumber">
              <span>预计取货时间：</span><span>{{pickUpAgent.arrivalTime}}</span>
            </div>
            <div class="item flightData">
              <span>货运代理：</span><span>{{pickUpAgent.agentCompany}}</span>
            </div>
            <div class="item flighttime">
              <span>运输方式：</span><span></span>
            </div>
            <div class="item transNum">
              <span>运输车辆：</span><span></span>
            </div>
            <div class="item transNum">
              <span>取货位置：</span><span>{{pickUpAgent.deliveryAddress}}</span>
            </div>
            <div class="item transNum">
              <span>联系方式:</span><span>{{pickUpAgent.agentContactPhone}}</span>
            </div>
          </div>
        </div>
        <div v-if="serviceStatus.serviceE" class="box landing">
          <!-- 落地配服务信息调整模态框 -->
          <el-dialog title="落地配服务" :visible.sync="serverInfoModel.landing">

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <div class="reset"><img :class="{hide:!statusAdmin.serviceAdjustment}" src="../../../assets/reset_icon.png"></div>
          <div class="img"><img src="../../../assets/detail_info_img5.png" alt=""></div>
          <div class="title">落地配服务</div>
          <div class="content">
            <div class="item flightNumber">
              <span>预计取货时间：</span><span>{{deliveryAgent.arrivalTime}}</span>
            </div>
            <div class="item flightData">
              <span>货运代理：</span><span>{{deliveryAgent.agentCompany}}</span>
            </div>
            <div class="item flighttime">
              <span>运输方式：</span><span></span>
            </div>
            <div class="item transNum">
              <span>运输车辆：</span><span></span>
            </div>
            <div class="item transNum">
              <span>取货位置：</span><span>{{deliveryAgent.deliveryAddress}}</span>
            </div>
            <div class="item transNum">
              <span>联系方式:</span><span>{{deliveryAgent.agentContactPhone}}</span>
            </div>
          </div>
        </div>
        <div class="box more">
          <div>
            <img src="../../../assets/detail_info_imgmore.png" alt="">
          </div>
        </div>
      </div>
      <div class="address">
        <div class="center-icon">
          <img src="../../../assets/plane_icon.png" alt="">
        </div>
        <div class="triangle">
            <p>收发地址</p>
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
            <div class="value">{{receiverAddress.contactName}}</div>
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
      <div class="goodsInfo">
        <div class="triangle">
            <p>货物信息</p>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="box weight">
              <span class="title">货物重量</span>
              <span class="detial">{{orderGoodsDetail.goodsWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box num">
              <span class="title">货物件数</span>
              <span class="detial">{{orderGoodsDetail.goodsNumber}}</span>
              <span class="unit">件</span>
            </div>
            <div class="box size">
              <span class="title">货物体积</span>
              <span class="detial">{{orderGoodsDetail.goodsVolume}}</span>
              <span class="unit">立方米</span>
            </div>
            <div class="box payWeight">
              <span class="title">计费重量</span>
              <span class="detial">{{orderGoodsDetail.valuationWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box type">
              <span class="title">货物类型</span>
              <span class="detial">{{orderGoodsDetail.goodsTypeName}}</span>
            </div>
            <div class="box name">
              <span class="title">货物名称</span>
              <span class="detial">{{orderGoodsDetail.goodsName}}</span>
            </div>
          </div>
          <div class="content-middle">
            <div class="box weight">
              <span class="title">实际重量</span>
              <span class="detial">{{orderGoodsDetail.actualWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box num">
              <span class="title">实际件数</span>
              <span class="detial">{{orderGoodsDetail.actualNumber}}</span>
              <span class="unit">件</span>
            </div>
            <div class="box size">
              <span class="title">实际体积</span>
              <span class="detial">{{orderGoodsDetail.actualVolume}}</span>
              <span class="unit">立方米</span>
            </div>
            <div class="box payWeight">
              <span class="title">实际计费重量</span>
              <span class="detial">{{orderGoodsDetail.reviewWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box pack">
              <span class="title">货物包装</span>
              <span class="detial">{{orderGoodsDetail.goodsPackage}}</span>
            </div>
          </div>
          <div class="content-right">
            <div class="title">
              <p>货物尺寸</p>
              <p>(长*宽*高/件数)</p>
              <p>单位：cm</p>
            </div>
            <div class="val">
              <EasyScrollbar>
                <div class="box" id="wrapper">
                  <div>
                    <p v-for="list in goodsSizeList">{{list}}</p>
                  </div>
                </div>
              </EasyScrollbar>
            </div>
            <div class="reInspect">
              <el-button :class="{hide:!statusAdmin.toReview}" @click="reviewOfGoods=true" size="mini" type="warning">货物复核</el-button>
            </div>
            <!--货物复核模态框-->
            <div class="reviewOfGoods-model">
              <el-dialog width="1150px" title="货物信息复核" :visible.sync="reviewOfGoods">
                <div class="content">
                  <div class="title">
                    <p>货物尺寸</p>
                    <p>(长*宽*高/件数)</p>
                    <p>单位：cm</p>
                  </div>
                  <div class="val">
                    <EasyScrollbar>
                      <div class="box">
                        <div>
                          <p v-for="(list,index) in actualGoodsSizeList">
                            <span>{{list}}</span><img @click="actualGoodsSizeList.splice(index,1)" src="../../../assets/minus_sign_delete.png">
                          </p>
                        </div>
                      </div>
                    </EasyScrollbar>
                  </div>
                  <div class="center-btn">
                    <button @click="addSizeDialogFormVisible=true" class="add"></button>
                    <p>
                      <button @click="calculationWeight" class="calculation"></button>
                      <span>计算</span>
                    </p>

                  </div>
                  <div class="original">
                    <p>
                      <span class="title">货物重量：</span>
                      <span class="detial">{{orderGoodsDetail.goodsWeight}}</span>
                      <span class="unit">千克</span></p>
                    <p>
                      <span class="title">货物件数：</span>
                      <span class="detial">{{orderGoodsDetail.goodsNumber}}</span>
                      <span class="unit">件</span>
                    </p>
                    <p>
                      <span class="title">货物体积：</span>
                      <span class="detial">{{orderGoodsDetail.goodsVolume}}</span>
                      <span class="unit">立方米</span>
                    </p>
                  </div>
                  <div class="actual">
                    <p>
                      <span class="title">实际重量：</span>
                      <input @focusout="calculationWeight" v-model="actualGoodsSize.weight" class="detial" type="number" placeholder="输入重量">
                      <span class="unit">千克</span></p>
                    <p>
                      <span class="title">实际件数：</span>
                      <input v-model="actualGoodsSize.num" class="detial" type="number" placeholder="输入件数">
                      <span class="unit">件</span>
                    </p>
                    <p>
                      <span class="title">实际体积：</span>
                      <input @focusout="calculationWeight" v-model="actualGoodsSize.volume" class="detial" type="number" placeholder="输入体积">
                      <span class="unit">立方米</span>
                    </p>
                  </div>
                </div>
                <div class="actualWeight">
                  <p>
                    <span class="title">实际计费重量</span>
                    <span class="detial">{{actualWeight}}</span>
                    <span class="unit">千克</span>
                  </p>
                </div>
                <div slot="footer" class="dialog-footer">
                  <span class="cancel" @click="reviewOfGoods = false">取 消</span>
                  <el-button @click="reviewOfGoodsData" size="mini" class="sure" type="warning">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="addSize">
              <el-dialog width="520px" title="增加货物尺寸" :visible.sync="addSizeDialogFormVisible">
                <input type="number" v-model="addSizeDialogFormData.length" placeholder="长">
                <input type="number" v-model="addSizeDialogFormData.width" placeholder="宽">
                <input type="number" v-model="addSizeDialogFormData.height" placeholder="高">
                <input type="number" v-model="addSizeDialogFormData.num" placeholder="件数">
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addSizeDialogFormVisible = false">取 消</el-button>
                  <el-button @click="addGoodsSize">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
      <div class="fee-info">
        <div class="triangle">
            <p>费用信息</p>
        </div>
        <div class="fee-top">
          <div class="box left">
            <h3>固定费用</h3>
            <div v-for="list in productPriceList">
              <div class="key">{{list.remark}}</div>
              <div class="value">¥{{list.price}}</div>
            </div>
            <div class="total">
              <div class="key">合计</div>
              <div class="value">¥{{hnaOrder.amount}}</div>
            </div>
          </div>
          <div class="box center">
            <div class="costAdd-model">
              <el-dialog width="800px" title="费用补充" :visible.sync="costAdd">
                <div class="content">
                  <p class="yellow">
                    <span class="title">状态名称：</span>
                    <el-select size="small" v-model="goodsType" placeholder="请选择">
                      <el-option
                        v-for="item in options2"
                        :key="item.dataSort"
                        :label="item.dataName"
                        :value="item.dataSort"
                        :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </p>
                  <p>
                    <span class="title">金额：</span>
                    <input v-model="costAddData.money" class="num" type="number" step="0.01">
                    <span class="unit">元</span>
                  </p>
                  <p>
                    <span class="title">费用备注：</span>
                    <input v-model="costAddData.Remarks" type="text">
                  </p>
                </div>
                <div slot="footer" class="dialog-footer">
                  <span class="cancel" @click="costAdd = false">取 消</span>
                  <el-button @click="getCostAdd" size="mini" class="sure" type="warning">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="costPay-model">
              <el-dialog width="800px" title="费用补缴" :visible.sync="costPay">
                <div class="content">
                  <p>
                    <span class="title">订单总额：</span>
                    <span class="detail">{{hnaOrder.amount||'0.00'}}</span>
                    <span class="unit">元</span>
                  </p>
                  <p>
                    <span class="title">已付金额：</span>
                    <span class="detail">{{hnaOrder.paidAmount||'0.00'}}</span>
                    <span class="unit">元</span>
                  </p>
                  <p class="yellow">
                    <span class="title">待付金额：</span>
                    <span class="detail">{{hnaOrder.needMakeUpAmount||'0.00'}}</span>
                    <span class="unit">元</span>
                  </p>
                </div>
                <p class="costPay-Msg">确认费用无误，提交后将无法撤销或修改</p>
                <div slot="footer" class="dialog-footer">
                  <span class="cancel" @click="costPay = false">取 消</span>
                  <el-button @click="getCostPay" size="mini" class="sure" type="warning">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <h3>临时费用</h3>
            <div class="btn-add">
              <el-button @click="costAdd = true" :class="{hide:!statusAdmin.temporaryCost}" size="mini" type="warning">费用补充</el-button>
            </div>
            <div class="btn-pay">
              <el-button @click="costPay = true" :class="{hide:!statusAdmin.temporaryCost}" size="mini" type="warning">执行补缴</el-button>
            </div>
          </div>
          <div class="box right">
            <h3>发票信息</h3>
            <div>
              <div class="key">企业名称：</div>
              <div class="value">{{invoiceDTO.companyName}}</div>
            </div>
            <div>
              <div class="key">纳税人识别号：</div>
              <div class="value">{{invoiceDTO.taxpayerNo}}</div>
            </div>
            <div>
              <div class="key">注册地址：</div>
              <div class="value">{{invoiceDTO.registerAddress}}</div>
            </div>
            <div>
              <div class="key">联系电话：</div>
              <div class="value">{{invoiceDTO.telephone}}</div>
            </div>
            <div>
              <div class="key">开户行：</div>
              <div class="value">{{invoiceDTO.bankName}}</div>
            </div>
            <div>
              <div class="key">开户行账号：</div>
              <div class="value">{{invoiceDTO.bankCard}}</div>
            </div>
            <div>
              <div class="key">开票人：</div>
              <div class="value">{{invoiceDTO.issuerName}}</div>
            </div>
            <div>
              <div class="key">开票人电话：</div>
              <div class="value">{{invoiceDTO.issuerMobile}}</div>
            </div>
            <div>
              <div class="key">开票人地址：</div>
              <div class="value">{{invoiceDTO.issuerAddress}}</div>
            </div>

          </div>
        </div>
        <div class="fee-mid">
          <div class="had">
            <span class="title">已支付</span>
            <span class="value">¥{{hnaOrder.paidAmount||'0.00'}}</span>
          </div>
          <div class="need">
            <span class="title">待支付</span>
            <span class="value">¥{{hnaOrder.needMakeUpAmount||'0.00'}}</span>
          </div>
        </div>
        <div v-if="statusAdmin.tradingFlow"  class="fee-bot">
          <div v-for="list in payDTOS" class="box">
            <div>
              <div>
                <span class="key">系统交易流水号：</span>
                <span class="value">{{list.payNo}}</span>
              </div>
              <div>
                <span class="key">交易时间：</span>
                <span class="value">{{list.payTime }}</span>
              </div>
            </div>
            <div>
              <div>
                <span class="key">交易金额：</span>
                <span class="value">¥{{list.payAmount}}</span>
              </div>
              <div>
                <span class="key">支付渠道：</span>
                <span class="value">新生支付</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btn">
        <div :class="{hide:!statusAdmin.submitOrder}" class="btn-refuse"><el-button @click="refuseOrder(9)" size="mini" type="info">拒绝订单</el-button></div>
        <div :class="{hide:!statusAdmin.submitOrder}" class="btn-accept"><el-button @click="acceptOrder(3)" size="mini" type="danger">接受订单</el-button></div>
        <div :class="{hide:!statusAdmin.completeOrder}" class="btn-accept"><el-button @click="acceptOrder(7)" size="mini" type="danger">完成订单</el-button></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { logout } from "@/tools/logout";
export default {
  mixins: [logout],
  data() {
    return {
      options2: [],
      goodsType: '',
      serverInfoModel: {
        airtrans: false,
        beginport: false,
        endport: false,
        pickup: false,
        landing: false,
      },
      addSizeDialogFormVisible: false, //货物符合模态框状态
      addSizeDialogFormData: {}, //复核输入模态框
      costAdd: false, //费用补充模态框
      costAddData: {}, //费用补充数据
      costPay: false, //费用补缴
      hnaOrder: {},
      senderAddress: {}, //发货人信息
      receiverAddress: {}, //收货人信息
      orderGoodsDetail: {}, //货物信息
      goodsSizeList: [], //货物尺寸表
      productPriceList: [], //价格信息
      invoiceDTO: {}, //发票信息
      payDTOS: [], //交易流水
      airportStartAgent: {}, //始发港服务代理商信息 B
      airportEndAgent: {}, //目的地港服务代理商信息 C
      pickUpAgent: {}, //上门取货服务代理商信息 D
      deliveryAgent: {}, //送货上门服务代理商信息 E
      serviceStatus: {//服务是否选中
        serviceB: false,
        serviceC: false,
        serviceD: false,
        serviceE: false
      },
      statusAdmin: { //不同状态改变不同显示
        serviceAdjustment: true, //服务调整功能
        toReview: false, //货物复核
        temporaryCost: false, //临时费用功能
        tradingFlow: false, //交易流水
        completeOrder: false, //完成订单按钮
        submitOrder: true, //提交，取消订单按钮
      },
      reviewOfGoods: false,
      actualGoodsSizeList: [], //复核货物尺寸表
      actualGoodsSize: {},
      actualWeight: '0.00',
      orderId: "",
      orderNo: "",
      orderStatus: "",

      flightNo: '',
      flightDate: '',
      flighttime: '',
      transNum: ''
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.orderNo = this.$route.query.orderNo;
    this.getOrderDetail()
    this.axios.post("/app/v1/common/queryDict",{
      "dataType": 4
    }).then(data => {
      if(data.data.code === 1){
        if(data.data.data.detailDTOS.length){
          this.options2 = data.data.data.detailDTOS;
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      }
    });
  },
  watch: {
    orderStatus (){
      this.getOrderDetail()
    },
    actualGoodsSizeList (){
      let volume = 0;
      if(this.actualGoodsSizeList.length){
        for(let i=0;i<this.actualGoodsSizeList.length;i++){
          let size = this.actualGoodsSizeList[i].split('*');
          let long = parseInt(size[0]);
          let width = parseInt(size[1]);
          let height = parseInt(size[2].split('/')[0]);
          let num = parseInt(size[2].split('/')[1]);
          volume += (long*width*height*num)
        }
        volume = volume/1000000
      }else{
        volume  = 0;
      }
      this.actualGoodsSize.volume = volume.toFixed(2);
    },
    reviewOfGoods (){
      this.actualGoodsSizeList = [];
      this.actualGoodsSize ={};
      this.actualWeight = '0.00';
    }
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    getOrderDetail () {
      this.axios.post("/app/v1/order/getOrderDetail",{
        "id": this.id,
        "orderId": this.orderId,
        "orderNo": this.orderNo,
        "token": this.token,
      }).then(data => {
        if(data.data.code === 1){
          let res = data.data.data;
          let statusNmae = '';
          this.flightNo = res.flightNo;
          this.flightDate = res.flightDate;
          this.transNum = res.aviationNumber;
          this.flighttime = [res.starHour,res.endHour];
          switch (res.orderStatus){
            case 2:
                statusNmae = '待受理';
                this.statusAdmin = {
                  serviceAdjustment: false,
                  toReview: false,
                  temporaryCost: false,
                  tradingFlow: false,
                  completeOrder: false,
                  submitOrder: true,
                };
                break;
            case 3:
                statusNmae = '待支付';
                this.statusAdmin = {
                  serviceAdjustment: false,
                  toReview: false,
                  temporaryCost: false,
                  tradingFlow: false,
                  completeOrder: true,
                  submitOrder: false,
                };
                break;
            case 4:
                statusNmae = '已支付';
                this.statusAdmin = {
                  serviceAdjustment: true,
                  toReview: true,
                  temporaryCost: true,
                  tradingFlow: true,
                  completeOrder: true,
                  submitOrder: false,
                };
                break;
            case 5:
                statusNmae = '运送中';
                this.statusAdmin = {
                  serviceAdjustment: true,
                  toReview: false,
                  temporaryCost: true,
                  tradingFlow: true,
                  completeOrder: true,
                  submitOrder: false,
                };
                break;
            case 6:
                statusNmae = '待补缴';
                this.statusAdmin = {
                  serviceAdjustment: true,
                  toReview: false,
                  temporaryCost: false,
                  tradingFlow: true,
                  completeOrder: false,
                  submitOrder: false,
                };
                break;
            case 7:
                statusNmae = '已完成';
                this.statusAdmin = {
                  serviceAdjustment: false,
                  toReview: false,
                  temporaryCost: false,
                  tradingFlow: true,
                  completeOrder: false,
                  submitOrder: false,
                };
                break;
            case 8:
                statusNmae = '已取消';
                this.statusAdmin = {
                  serviceAdjustment: false,
                  toReview: false,
                  temporaryCost: false,
                  tradingFlow: false,
                  completeOrder: false,
                  submitOrder: false,
                };
                break;
            case 9:
              statusNmae = '已拒绝';
              this.statusAdmin = {
                serviceAdjustment: false,
                toReview: false,
                temporaryCost: false,
                tradingFlow: false,
                completeOrder: false,
                submitOrder: false,
              };
              break;
          }
          res.statusName = statusNmae;
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
          this.productPriceList = res.productPriceList||[];
          this.invoiceDTO = res.invoiceDTO||{};
          this.payDTOS = res.payDTOS||[];
          this.airportStartAgent = res.airportStartAgent||{};
          this.deliveryAgent = res.deliveryAgent||{};
          this.pickUpAgent = res.pickUpAgent||{};
          this.airportEndAgent = res.airportEndAgent||{};

          if(res.productCode){
            let serviceList = [];
            serviceList = res.productCode.split('/');
            for(let i=0;i<serviceList.length;i++){
                switch (serviceList[i]){
                  case 'B': this.serviceStatus.serviceB = true; break;
                  case 'C': this.serviceStatus.serviceC = true; break;
                  case 'D': this.serviceStatus.serviceD = true; break;
                  case 'E': this.serviceStatus.serviceE = true; break;
                }
            }
          }
        }else if(data.data.code === 10001){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout();
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      });
    },
    acceptOrder (status){
      this.axios.post("/web/v1/supplier/order/accepting",{
        "id": this.id,
        "status": status,
        "orderNo": this.orderNo,
        "token": this.token,
      }).then(data => {
        if(data.data.code === 1){
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
          this.getOrderDetail();
        }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout()
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      })
    },
    refuseOrder(status) {
      this.$confirm('此操作将拒绝该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/web/v1/supplier/order/accepting",{
          "id": this.id,
          "status": status,
          "orderNo": this.orderNo,
          "token": this.token,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getOrderDetail();
          }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
            this.$notify.error({
              title: '错误',
              message: '登录已失效，请重新登录！'
            });
            this.logout()
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        })
      })
    },
    modifyServiceInfo (){ //修改服务信息的确定按钮
      if(!this.flightNo || !this.flightDate || !this.flighttime[0] || !this.flighttime[1]) {
        this.$notify.error({
          title: '错误',
          message: '填写不正确，请重新填写!'
        });
        return
      }
      this.axios.post("/web/v1/supplier/order/infoSupplement",{
        "id": this.id,
        "orderNo": this.orderNo,
        "token": this.token,
        "flightDate": this.flightDate,
        "departureTime": this.flighttime[0],
        "arrivalTime": this.flighttime[1],
        "flightNumber": this.flightNo,
        "aviationNumber": this.transNum,
      }).then(data => {
        if(data.data.code === 1){
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
          this.getOrderDetail();
          this.serverInfoModel.airtrans = false;
        }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout()
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      });
    },
    calculationWeight (){
      let chargWeight = this.actualGoodsSize.volume*167;
      if(parseInt(this.actualGoodsSize.weight)>chargWeight){
        this.actualWeight = parseInt(this.actualGoodsSize.weight).toFixed(2);
      }else{
        this.actualWeight = chargWeight.toFixed(2);
      }
    },
    reviewOfGoodsData (){
      if(!this.actualGoodsSizeList.length || !this.actualGoodsSize.weight) {
        this.$notify.error({
          title: '错误',
          message: '填写不正确，请重新填写!'
        });
        return
      }
      let goodsSize = '';
      for(let i=0;i<this.actualGoodsSizeList.length;i++){
        goodsSize += this.actualGoodsSizeList[i]+',';
      }
      this.axios.post("/web/v1/supplier/order/reviewSave",{
        "id": this.id,
        "orderNo": this.orderNo,
        "token": this.token,
        "actualCalcWeight": this.actualWeight,
        "actualNumber": this.actualGoodsSize.num,
        "actualVolume": this.actualGoodsSize.volume,
        "actualWeight": this.actualGoodsSize.weight,
        "goodsSize": goodsSize
      }).then(data => {
        if(data.data.code === 1){
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
          this.getOrderDetail();
          this.reviewOfGoods = false;
        }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout()
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      })
    },
    getCostPay (){
      this.axios.post("/web/v1/supplier/order/executivePay",{
        "id": this.id,
        "orderNo": this.orderNo,
        "token": this.token,
        status: 6
      }).then(data => {
        if(data.data.code === 1){
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
          this.getOrderDetail();
          this.costPay = false;
        }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout()
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      })
    },
    getCostAdd (){
      if(!this.costAddData.money || !this.goodsType){
        this.$notify.error({
          title: '错误',
          message: '填写不正确，请重新填写!'
        });
        return
      }
      this.axios.post("/web/v1/supplier/order/costSave",{
        "id": this.id,
        "orderNo": this.orderNo,
        "token": this.token,
        "amount": this.costAddData.money,
        "remarks": this.costAddData.Remarks,
        "costType": this.goodsType,
      }).then(data => {
        if(data.data.code === 1){
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
          this.getOrderDetail();
          this.costAdd = false;
        }else if(data.data.code === -1&&data.data.msg === "登陆超时"){
          this.$notify.error({
            title: '错误',
            message: '登录已失效，请重新登录！'
          });
          this.logout()
        }else{
          this.$notify.error({
            title: '错误',
            message: data.data.msg
          });
        }
      })
    },
    addGoodsSize() {
      if (
        this.addSizeDialogFormData.length &&
        this.addSizeDialogFormData.width &&
        this.addSizeDialogFormData.height &&
        this.addSizeDialogFormData.num &&
        this.addSizeDialogFormData.length !=0 &&
        this.addSizeDialogFormData.width !=0 &&
        this.addSizeDialogFormData.num !=0
      ) {
        let str =
          this.addSizeDialogFormData.length +
          "*" +
          this.addSizeDialogFormData.width +
          "*" +
          this.addSizeDialogFormData.height +
          "/" +
          this.addSizeDialogFormData.num;
        this.actualGoodsSizeList.push(str);
        this.addSizeDialogFormData = {};
        this.addSizeDialogFormVisible = false;
      }else{
        this.$message({
          showClose: true,
          message: '填写有误,请重新填写',
          type: 'error',
        });
      }
    },
    viewOrder (){
      this.$router.push({path:'/supplier/order_track',query:{orderNo: this.orderNo,orderStatus: this.orderStatus}})
    },
    dateTransform(time){
      let newTime = new Date(time);
      let year = newTime.getFullYear();
      let month = (newTime.getMonth() + 1)<10?'0'+(newTime.getMonth() + 1):(newTime.getMonth() + 1);
      let date = newTime.getDate()<10?'0'+newTime.getDate():newTime.getDate();
      let hour = newTime.getHours()<10?'0'+newTime.getHours():newTime.getHours();
      let minutes = newTime.getMinutes()<10?'0'+newTime.getMinutes():newTime.getMinutes();
      return year+'-'+month+'-'+date+' '+hour+':'+minutes
    }
  },
  computed: {
    ...mapGetters(["id", "token"])
  }
};
</script>
<style lang="scss">
.order-deal {
  // 左上角的三角
  .triangle {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 38px solid #fccf00;
    border-color: #fccf00 transparent transparent #fccf00;
    > p {
      width: 100px;
      transform: rotate(-45deg) translate(4px, -65px);
      color: #fff;
    }
  }
  .head {
    height: 61px;
    display: flex;
    .title {
      margin-left: 30px;
      line-height: 61px;
      display: grid;
      grid-template-columns: 1fr;
      // justify-items: center;
      align-items: center;
    }
  }
  .main {
    padding: 20px;
    .main-top {
      background-color: #fff;
      box-shadow: 3px 3px 3px #e0e0e0;
      .linear {
        height: 4px;
        background: linear-gradient(30deg, #fedb43 50%, #f52731 50%);
        background-size: 50px 4px;
      }
      .main-top-title {
        margin-top: 10px;
        display: flex;
        color: #a0a0a0;
        line-height: 20px;
        padding-left: 20px;
        .time {
          flex: 1;
        }
        .btn {
          width: 200px;
          text-align: right;
          .refuse {
            cursor: pointer;
            margin: 10px;
            &:hover {
              color: black;
            }
          }
        }
      }
      .content {
        padding: 0 20px;
        color: #a0a0a0;
        display: grid;
        grid-template-columns: 1fr 250px 250px;
        .left {
          .box {
            display: flex;
            margin: 10px 0;
            .title {
              font-weight: 700;
            }
            .detail {
              margin-left: 20px;
            }
          }
          .orderNum {
            .detail {
              color: #f42630;
              font-weight: 700;
              line-height: 20px;
            }
          }
          .baseserve,
          .moreserver,
          .increaseserver {
            .detail {
              display: flex;
              .item {
                margin: 0 20px;
                .get {
                  color: #8cc43f;
                  margin: 0 10px;
                }
                &.not {
                  .get {
                    color: #e6e6e6;
                  }
                }
              }
            }
          }
        }
        .middle {
          color: #fed001;
          width: 100%;
          text-align: center;
          padding-top: 30px;
        }
        .right {
          width: 100%;
          text-align: center;
          padding-top: 50px;
          button {
            padding: 4px 20px;
            box-shadow: 4px 4px 6px #e0e0e0;
          }
        }
      }
    }
    .server-info {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 4px 4px 4px #e0e0e0;

      .box {
        height: 340px;
        border-right: 1px dashed #e0e0e0;
        border-bottom: 1px dashed #e0e0e0;
        position: relative;
        .el-dialog {
          .el-dialog__header {
            background-color: #fccf00;
            .el-dialog__title {
              color: #fff;
            }
          }
          .el-dialog__body {
            padding: 0;
            p {
              text-align: center;
              margin: 10px 0;
              .type {
                color: #f65057;
              }
            }
            .model-main {
              display: flex;
              // padding: 0 100px;
              .left {
                // flex: 1;
                width: 360px;
                box-sizing: border-box;
                padding-left: 100px;
                .item {
                  display: flex;
                  margin: 20px 0;
                  color: #9f9f9f;
                  .key {
                    width: 100px;
                    text-align-last: justify;
                  }
                }
              }
              .middle {
                width: 200px;
                text-align: center;
                img {
                  transform: translateY(20px);
                }
              }
              .right {
                // flex: 1;
                padding-left: 50px;
                .item {
                  margin: 20px 0;
                  display: flex;
                  border-bottom: 1px solid #e0e0e0;
                  .key {
                    width: 100px;
                    color: #9f9f9f;
                    text-align-last: justify;
                  }
                }
                .flightNumber {
                  input {
                    border: none;
                    outline: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                  }
                }
                .flightData {
                  .arrow {
                    line-height: 28px;
                  }
                  .value {
                    .el-date-editor {
                      width: 130px;
                      input {
                        border: none;
                      }
                      .el-input__prefix,
                      .el-input__suffix {
                        display: none;
                      }
                    }
                  }
                }
                .flighttime {
                  .arrow {
                    line-height: 28px;
                  }
                  .el-date-editor {
                    width: 200px;
                    border: none;
                  }
                  .el-input__icon,
                  .el-input__icon {
                    // visibility: hidden;
                    display: none;
                  }
                }
                .transNum {
                  input {
                    border: none;
                    outline: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                  }
                }
              }
            }
          }
          .el-dialog__footer {
            .dialog-footer {
              text-align: center;
              position: relative;
              .sure {
                padding: 6px 80px;
              }
              .cancel {
                cursor: pointer;
                position: absolute;
                line-height: 26px;
                right: 300px;
                color: #b4b4b4;
              }
            }
          }
        }
        .reset {
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 10px;
          .hide{
            display: none;
          }
        }
        &:nth-of-type(4n) {
          border-right: none;
        }
        &:nth-of-type(n + 5) {
          border-bottom: none;
        }
        .img {
          height: 44px;
        }
        .img,
        .title {
          text-align: center;
          margin: 20px 0;
          font-weight: 700;
        }
        .content {
          margin-top: 20px;
          color: #999;
          padding-left: 60px;
          .item {
            display: flex;

            span:first-child {
              width: 100px;
              text-align: justify;
              &::after {
                content: "";
                display: inline-block;
                width: 100%;
                overflow: hidden;
                height: 0;
              }
            }
            span:last-child {
              margin-left: 20px;
            }
          }
        }
      }
      .more {
        border-right: none;
        > div {
          width: 100%;
          // height: 100%;
          text-align: center;
          // margin-top: 50%;
          transform: translateY(150px);
        }
      }
    }
    .address {
      display: flex;
      height: 200px;
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 4px 4px 4px #e0e0e0;
      position: relative;
      line-height: 20px;

      .center-icon {
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(120%, -40%);
      }
      .left {
        // 中间的斜线
        &::before {
          position: absolute;
          content: "";
          right: 0;
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
          right: 0;
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
        padding-left: 80px;
        padding-top: 20px;
        position: relative;
        // 右下角icon
        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          // background-color: #f4292f;
          position: absolute;
          bottom: 0;
          right: 0;
          text-align: center;
          line-height: 30px;
          color: #fff;
          margin: 0 10px 10px 0;
        }
        .box {
          display: flex;
          .key {
            width: 80px;
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
            margin-left: 20px;
            color: #4d4d4d;
          }
        }
        .name-id,
        .phone-cellphone {
          .value {
            width: 150px;
          }
        }
      }
    }
    .goodsInfo {
      margin-top: 20px;
      box-shadow: 4px 4px 4px #e0e0e0;
      background-color: #fff;
      position: relative;
      .content {
        display: flex;
        .content-left,
        .content-middle {
          width: 300px;
          color: #9a9a9a;
          padding: 20px 0 20px 80px;
          border-right: 1px dashed #e0e0e0;
          .box {
            display: flex;
            margin: 10px 0;
          }
          .detial {
            width: 100px;
            color: #4e4e4e;
            text-align: center;
            font-weight: 700;
          }
          .unit {
            width: 80px;
            text-align: center;
          }
        }
        .content-middle {
          .box {
            .title {
              width: 100px;
              height: 20px;
              text-align: justify;
              &::after {
                content: "";
                display: inline-block;
                width: 100%;
                overflow: hidden;
                height: 0;
              }
            }
            .detial {
              color: #ffdb44;
            }
          }
          .pack {
            margin-top: 40px;
          }
        }
        .content-right {
          flex: 1;
          display: flex;
          .title {
            padding-top: 50px;
            width: 140px;
            vertical-align: middle;
            text-align: center;
            color: #989898;
          }
          .reviewOfGoods-model{
            .el-dialog {
              .el-dialog__header {
                background-color: #fccf00;
                .el-dialog__title {
                  color: #fff;
                }
              }
              .el-dialog__body {
                padding: 0;
                .content{
                  padding-top: 20px;
                  .title {
                    padding-top: 30px;
                  }
                  .box {
                    height: 115px;
                  }
                  .val {
                    width: 200px;
                    height: 120px;
                    overflow: hidden;
                    margin-top: 15px;
                    border: 1px solid #989898;
                    padding: 0 0 0 10px;
                    p {
                      height: 24px;
                      width: 100%;
                      line-height: 24px;
                      margin: 5px 0px;
                      text-align: left;
                      span{
                        display: inline-block;
                        margin-right: 10px;
                      }
                      img{
                        cursor: pointer;
                        display: inline-block;
                      }
                    }
                  }
                  .center-btn{
                    width: 260px;
                    .add{
                      float: left;
                      width: 30px;
                      height: 30px;
                      border: 0;
                      margin-top: 57px;
                      margin-left: 30px;
                      margin-right: 80px;
                      cursor: pointer;
                      background-color: #E6A23C;
                      background-image: url("../../../assets/addgoods.png");
                    }
                    .add:hover{
                      background-color: #FCCF00;
                    }
                    p{
                      float: left;
                      width: 45px;
                      margin-top: 45px;
                      .calculation{
                        width: 41px;
                        height: 42px;
                        border: 0;
                        cursor: pointer;
                        background-color: #E6A23C;
                        background-image: url("../../../assets/calculation.png");
                      }
                      .calculation:hover{
                        background-color: #FCCF00;
                      }
                      span{
                        font-size: 12px;
                        color: #989898;
                      }
                    }

                  }
                  .original{
                    margin-right: 30px;
                    p{
                      text-align: left;
                      span {
                        display: inline-block;
                        padding: 0;
                        color: #989898;
                      }
                      .title{
                        width: 80px;
                      }
                      .detial{
                        width: 100px;
                        text-align: center;
                      }
                      .unit {
                        width: 50px;
                        text-align: center;
                      }
                    }
                  }
                  .actual{
                    p{
                      text-align: left;
                      span {
                        display: inline-block;
                        padding: 0;
                        color: #606266;
                      }
                      .title{
                        width: 80px;
                      }
                      .detial{
                        width: 100px;
                        color: #ffdb44;
                        height: 25px;
                        border: 1px solid #989898;
                        border-radius: 3px;
                        text-align: center;
                      }
                      .unit {
                        width: 50px;
                        text-align: center;
                      }
                    }
                  }
                }
                .actualWeight{
                  p{
                    margin-left: 680px;
                    width: 300px;
                    margin-top: 0;
                    margin-bottom: 30px;
                    span{
                      display: inline-block;
                      padding: 0;
                    }
                    .title{
                      width: 90px;
                    }
                    .detial {
                      width: 100px;
                      color: #ffdb44;
                      text-align: center;
                    }
                    .unit {
                      width: 40px;
                      text-align: center;
                      color: #989898;
                    }
                  }
                }
                p {
                  text-align: center;
                  margin: 10px 0;
                  .type {
                    color: #f65057;
                  }
                }
                .model-main {
                  display: flex;
                  // padding: 0 100px;
                  .left {
                    // flex: 1;
                    width: 360px;
                    box-sizing: border-box;
                    padding-left: 100px;
                    .item {
                      display: flex;
                      margin: 20px 0;
                      color: #9f9f9f;
                      .key {
                        width: 100px;
                        text-align-last: justify;
                      }
                    }
                  }
                  .middle {
                    width: 200px;
                    text-align: center;
                    img {
                      transform: translateY(20px);
                    }
                  }
                  .right {
                    // flex: 1;
                    padding-left: 50px;
                    .item {
                      margin: 20px 0;
                      display: flex;
                      border-bottom: 1px solid #e0e0e0;
                      .key {
                        width: 100px;
                        color: #9f9f9f;
                        text-align-last: justify;
                      }
                    }
                    .flightNumber {
                      input {
                        border: none;
                        outline: none;
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                      }
                    }
                    .flightData {
                      .arrow {
                        line-height: 28px;
                      }
                      .value {
                        .el-date-editor {
                          width: 130px;
                          input {
                            border: none;
                          }
                          .el-input__prefix,
                          .el-input__suffix {
                            display: none;
                          }
                        }
                      }
                    }
                    .flighttime {
                      .arrow {
                        line-height: 28px;
                      }
                      .el-date-editor {
                        width: 200px;
                        border: none;
                      }
                      .el-input__icon,
                      .el-input__icon {
                        // visibility: hidden;
                        display: none;
                      }
                    }
                    .transNum {
                      input {
                        border: none;
                        outline: none;
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                      }
                    }
                  }
                }
              }
              .el-dialog__footer {
                .dialog-footer {
                  text-align: center;
                  position: relative;
                  .sure {
                    padding: 6px 80px;
                  }
                  .cancel {
                    cursor: pointer;
                    position: absolute;
                    line-height: 26px;
                    right: 380px;
                    color: #b4b4b4;
                  }
                }
              }
            }
          }
          .addSize {
            .el-dialog__wrapper {
              .el-dialog__header {
                background-color: #fccf00;
                .el-dialog__title {
                  color: #fff;
                }
              }
              .el-dialog__body {
                display: flex;
                input {
                  width: 25%;
                  height: 25px;
                  border: 1px solid #e0e0e0;
                  padding-left: 3px;
                  margin-right: 10px;
                  -moz-appearance: textfield;
                  &::-webkit-inner-spin-button,
                  &::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }
                }
              }
            }
          }
          .box {
            height: 200px;
          }
          .val {
            width: 200px;
            height: 200px;
            overflow: hidden;
            margin-top: 15px;
            border: 1px solid #989898;
            padding: 0 0 0 10px;
          }
          .reInspect {
            button {
              margin: 90px 0 0 20px;
              box-shadow: 4px 4px 4px #e0e0e0;
            }
            .hide{
              display: none;
            }
          }
        }
      }
    }
    .fee-info {
      position: relative;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      box-shadow: 4px 4px 4px #e0e0e0;
      .fee-top {
        border: 1px dotted #e4e4e4;
        display: flex;
        padding-top: 20px;
        .box {
          line-height: 18px;
          > div {
            display: flex;
            .key {
              width: 100px;
              text-align: justify;
              margin-right: 20px;
              color: #989898;
              &::after {
                content: "";
                display: inline-block;
                width: 100%;
                overflow: hidden;
                height: 0;
              }
            }
            .value {
              color: #4d4d4d;
              font-weight: 700;
            }
          }
        }
        .left {
          flex: 2;
          padding-left: 60px;
          box-sizing: border-box;
          border-right: 1px dotted #e4e4e4;
          .total {
            margin-top: 30px;
          }
        }
        .center {
          flex: 2;
          border-right: 1px dotted #e4e4e4;
          padding-left: 20px;
          position: relative;
          .costAdd-model{
            .el-dialog {
              .el-dialog__header {
                background-color: #fccf00;
                .el-dialog__title {
                  color: #fff;
                }
              }
              .el-dialog__body {
                .content{
                  margin: 0px auto;
                  width: 254px;
                  p{
                    span{
                      color: #989898;
                    }
                    .title{
                      width: 80px;
                      display: inline-block;
                      text-align-last: justify;
                    }
                    .num{
                      width: 142px;
                      height: 30px;
                    }
                    input{
                      width:170px;
                      height: 30px;
                      border: 0;
                    }
                  }
                  .yellow{
                    border-bottom: 1px solid #fccf00;
                    span{
                      color: #fccf00;
                    }
                    input{
                      color: #fccf00;
                    }
                  }
                }
              }
              .el-dialog__footer {
                .dialog-footer {
                  text-align: center;
                  position: relative;
                  .sure {
                    padding: 6px 80px;
                  }
                  .cancel {
                    cursor: pointer;
                    position: absolute;
                    line-height: 26px;
                    right: 240px;
                    color: #b4b4b4;
                  }
                }
              }
            }
          }
          .costPay-model{
            .el-dialog {
              .el-dialog__header {
                background-color: #fccf00;
                .el-dialog__title {
                  color: #fff;
                }
              }
              .el-dialog__body {
                padding-bottom: 10px;
                .content{
                  margin: 0px auto;
                  width: 260px;
                  p{
                    span{
                      color: #989898;
                    }
                    .title{
                      width: 80px;
                      display: inline-block;
                      text-align-last: justify;
                    }
                    .detail{
                      width: 150px;
                      display: inline-block;
                      text-align: center;
                    }
                  }
                  .yellow{
                    span{
                      color: #fccf00;
                    }
                  }
                }
                .costPay-Msg{
                  text-align: center;
                  color: red;
                  font-size: 12px;
                  margin-bottom: 0;
                  margin-top: 30px;
                }
              }
              .el-dialog__footer {
                .dialog-footer {
                  text-align: center;
                  position: relative;
                  .sure {
                    padding: 6px 80px;
                  }
                  .cancel {
                    cursor: pointer;
                    position: absolute;
                    line-height: 26px;
                    right: 240px;
                    color: #b4b4b4;
                  }
                }
              }
            }
          }
          .btn-add,
          .btn-pay {
            position: absolute;
            right: 10px;
            button {
              box-shadow: 4px 4px 4px #e0e0e0;
            }
          }
          .btn-add {
            bottom: 50px;
            .hide{
              display: none;
            }
          }
          .btn-pay {
            bottom: 10px;
            .hide{
              display: none;
            }
          }
        }
        .right {
          flex: 3;
          padding-left: 20px;
        }
      }
      .fee-mid {
        height: 100px;
        border-bottom: 8px dotted #e4e4e4;
        position: relative;
        text-align: right;
        .had {
          display: flex;
          margin-top: 20px;
          .title {
            flex: 1;
            font-size: 28px;
            color: #999999;
          }
          .value {
            width: 200px;
            font-size: 24px;
            text-align: left;
            margin-left: 20px;
            color: #fcd000;
            line-height: 37px;
          }
        }
        .need {
          display: flex;
          .title {
            flex: 1;
            font-size: 16px;
            color: #999999;
          }
          .value {
            width: 200px;
            text-align: left;
            margin-left: 20px;
            font-size: 16px;
            line-height: 21px;
            color: #999999;
          }
        }
        &::before {
          content: "";
          position: absolute;
          bottom: -19px;
          left: -15px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f7f7f7;
          box-shadow: -4px 0px 4px #e0e0e0 inset;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: -19px;
          right: -15px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f7f7f7;
          box-shadow: 4px 0px 4px #e0e0e0 inset;
        }
      }
      .fee-bot {
        .box {
          display: flex;
          &:first-child {
            border-bottom: 1px dotted #e0e0e0;
          }
          > div {
            flex: 1;
            padding: 40px 0 20px 40px;
            > div {
              display: flex;
              .key {
                width: 150px;
                text-align: justify;
                color: #999999;
                &::after {
                  content: "";
                  display: inline-block;
                  width: 100%;
                  overflow: hidden;
                  height: 0;
                }
              }
              .value {
                color: #121212;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
    .submit-btn {
      margin: 20px 0 200px 0;
      display: flex;
      justify-content: flex-end;
      .hide{
        display: none;
      }
      .btn-accept,
      .btn-refuse {
        box-shadow: 4px 4px 4px #e0e0e0;
      }
      .btn-accept {
        margin-left: 20px;
        button {
          padding: 7px 80px;
        }
      }
    }
  }
}
</style>
