<template>
<div class="booking-space">
  <div class="head">
    订舱管理
  </div>
  <div class="body">
    <div class="body-top">
      <div class="column1">
        <div class="start">
          <div class="key">始发港</div>
          <div class="value">
            <StartPortselect @startportvalue='startPortValue'></StartPortselect>
          </div>
        </div>
        <div class="plane-num">
          <div class="key">航班号</div>
          <div class="value">
            <el-input size="mini" v-model="searchData.planenum" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="column2">
        <div class="end">
          <div class="key">目的港</div>
          <div class="value">
            <EndPortselect @endportvalue='endportvalue'></EndPortselect>
          </div>
        </div>
        <div class="order-num">
          <div class="key">订单号</div>
          <div class="value">
            <el-input size="mini" v-model="searchData.ordernum" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="column3">
        <div class="time">
          <div class="key">航班日期</div>
          <div class="value">
            <el-date-picker
              v-model="searchData.time"
              type="date"
               size="mini"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="order-status">
          <div class="key">订舱状态</div>
          <div class="value">
            <el-select size="mini" v-model="searchData.orderstatus" placeholder="请选择">
              <el-option
                v-for="item in orderstatuses"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="column4">
        <el-button size="mini" type="danger">查询</el-button>
      </div>
    </div>
    <div class="body-main">
      <div class="thead wrapper">
        <div class="status">状态</div>
        <div class="plane-num">航班号</div>
        <div class="line">线路</div>
        <div class="plane-data">航班日期</div>
        <div class="plane-time">航班时刻</div>
        <div class="name">货物名称</div>
        <div class="num">件数</div>
        <div class="weight">重量(千克)</div>
        <div class="pay-weight">付费重量(千克)</div>
        <div class="operate">操作</div>
      </div>
      <EasyScrollbar>
        <div  id="wrapper" style="height: 600px;">
          <div v-if="orderListData.length==0?false:true">
            <!-- 未订舱 -->
            <div class="tbody" v-for="(item,index) in orderListData" :key="index" :class="item.bookingStatus == 2?'success':''">
              <div class="tbody-head">
                <!-- <div class="time">2017-09-09 12:00</div> -->
                <div class="orderNum" v-if="'orderNo' in item"><span>订单号：</span><span class="value">{{item.orderNo}}</span></div>
                <div class="mainOrderNum" v-if="'aviationNumber' in item"><span>主运单号：</span><span class="value">{{item.aviationNumber}}</span></div>
                <div class="examine"><span class="value">拆分</span></div>
              </div>
              <div class="wrapper">
                <!-- 未订舱 -->
                <div class="status" v-if="item.bookingStatus == 0">
                  <p>未订舱</p>
                </div>
                <!-- 已提交 -->
                <div class="status" v-if="item.bookingStatus == 1">
                  <p class="yellow">已提交</p>
                </div>
                <!-- 订舱成功 -->
                <div class="status" v-if="item.bookingStatus == 2">
                  <p class="green">订舱成功</p>
                </div>
                <!-- 订舱失败 -->
                <div class="status" v-if="item.bookingStatus == 3">
                  <p class="red">订舱失败</p>
                </div>
                <div class="plane-num">
                  <p>{{item.flightNumber}}</p>
                </div>
                <div class="line">
                  <p class="start">{{item.cityStart}}</p>
                  <p class="end">{{item.cityEnd}}</p>
                </div>
                <div class="plane-data">
                  <p>{{item.flightDate}}</p>
                </div>
                <div class="plane-time">
                  <p>{{item.departureTime}}-{{item.arrivalTime}}</p>
                </div>
                <div class="name">
                  <p>{{item.goodsName}}</p>
                </div>
                <div class="num">
                  <p>{{item.actualNumber}}</p>
                </div>
                <div class="weight">
                  <p>{{item.actualWeight}}</p>
                </div>
                <div class="pay-weight">
                  <p>{{item.actualCalcWeight}}</p>
                </div>
                <div class="operate">
                  <div class="icon el-icon-success"
                    @click="selectItem(item,item.id)"
                    :class="item.select?'active':''"
                    v-if="item.bookingStatus == 0 || item.bookingStatus == 3">
                  </div>
                </div>
              </div>
            </div>
            <!-- 已提交 -->
            <!-- <div class="tbody">
              <div class="tbody-head">
                <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
                <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
                <div class="examine"><span class="value">拆分</span></div>
              </div>
              <div class="wrapper">
                <div class="status">
                  <p class="yellow">已提交</p>
                </div>
                <div class="plane-num">
                  <p>HU7211</p>
                </div>
                <div class="line">
                  <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
                  <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
                </div>
                <div class="plane-data">
                  <p>2017-10-10</p>
                </div>
                <div class="plane-time">
                  <p>10:10-10:10</p>
                </div>
                <div class="name">
                  <p>服装</p>
                </div>
                <div class="num">
                  <p>20</p>
                </div>
                <div class="weight">
                  <p>2000</p>
                </div>
                <div class="pay-weight">
                  <p>2000</p>
                </div>
                <div class="operate">
                </div>
              </div>
            </div> -->
            <!-- 订舱成功 -->
            <!-- <div class="tbody success">
              <div class="tbody-head">
                <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
                <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
                <div class="examine"><span class="value">拆分</span></div>
              </div>
              <div class="wrapper">
                <div class="status">
                  <p class="green">订舱成功</p>
                </div>
                <div class="plane-num">
                  <p>HU7211</p>
                </div>
                <div class="line">
                  <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
                  <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
                </div>
                <div class="plane-data">
                  <p>2017-10-10</p>
                </div>
                <div class="plane-time">
                  <p>10:10-10:10</p>
                </div>
                <div class="name">
                  <p>服装</p>
                </div>
                <div class="num">
                  <p>20</p>
                </div>
                <div class="weight">
                  <p>2000</p>
                </div>
                <div class="pay-weight">
                  <p>2000</p>
                </div>
                <div class="operate">
                </div>
              </div>
            </div> -->
            <!-- 订舱失败 -->
            <!-- <div class="tbody">
              <div class="tbody-head">
                <div class="orderNum"><span>订单号：</span><span class="value">74459-4135465416</span></div>
                <div class="mainOrderNum"><span>主运单号：</span><span class="value">74459-4135465416</span></div>
                <div class="examine"><span class="value">拆分</span></div>
              </div>
              <div class="wrapper">
                <div class="status">
                  <p class="red">订舱失败</p>
                </div>
                <div class="plane-num">
                  <p>HU7211</p>
                </div>
                <div class="line">
                  <p class="start">北京阿萨德阿萨德艾迪(PEK)</p>
                  <p class="end">上海阿萨德阿萨德艾迪(PVG)</p>
                </div>
                <div class="plane-data">
                  <p>2017-10-10</p>
                </div>
                <div class="plane-time">
                  <p>10:10-10:10</p>
                </div>
                <div class="name">
                  <p>服装</p>
                </div>
                <div class="num">
                  <p>20</p>
                </div>
                <div class="weight">
                  <p>2000</p>
                </div>
                <div class="pay-weight">
                  <p>2000</p>
                </div>
                <div class="operate">
                  <div class="icon el-icon-success"></div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="page">
            <el-pagination
              @current-change='currentChange'
              background
              layout="prev, pager, next"
              :total="totalPage">
            </el-pagination>
          </div>
        </div>
      </EasyScrollbar>
    </div>
    <div class="body-form">
      <el-form :model="bodyformData" :rules="bodyform" ref="bodyform" class="bodyform">
        <div class="form-head"></div>
        <div class="form-content">
          <div class="left">
            <h3>订舱航班</h3>
            <div class="plane-num">
              <div class="key">航班号</div>
              <div class="value">
                <el-input size="mini" v-model="bodyformData.planenum" placeholder="请输入航班号"></el-input>
              </div>
            </div>
            <div class="plane-data">
              <div class="key">航班日期</div>
              <div class="value">
                <el-date-picker
                  v-model="bodyformData.data"
                  value-format="yyyy-MM-dd"
                  type="date"
                  size="mini"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="arrow el-icon-arrow-down"></div>
            </div>
            <div class="startPort">
              <div class="key">始发港</div>
              <div class="value">
                <StartPortselect @startportvalue='bodyFormStartportvalue' :placeholder='bodyformData.startPort'></StartPortselect>
              </div>
              <div class="arrow el-icon-arrow-down"></div>
            </div>
            <div class="endPort">
              <div class="key">目的港</div>
              <div class="value">
                <EndPortselect @endportvalue='bodyFormEndportvalue' :placeholder='bodyformData.endPort'></EndPortselect>
              </div>
              <div class="arrow el-icon-arrow-down"></div>
            </div>
            <div class="last-depot">
              <div class="key">剩余仓位</div>
              <div class="value">
                <el-input size="mini" v-model="bodyformData.lastDepot" placeholder="请输入剩余仓位(kg)"></el-input>
              </div>
            </div>
          </div>
          <div class="center">
            <h3>订舱信息</h3>
            <div class="main-order-num">
              <div class="key">主运单号</div>
              <div class="value">
                <el-form-item prop="mainOrderNumF">
                  <el-input size="mini" v-model="bodyformData.mainOrderNumF" placeholder="880"></el-input>
                </el-form-item>
              </div>
              <div class="line">|</div>
              <div class="value2">
                <el-form-item prop="mainOrderNumB">
                  <el-input size="mini" v-model="bodyformData.mainOrderNumB" placeholder="66886688"></el-input>
                </el-form-item>
              </div>
            </div>
            <div>
              <div class="key">重量</div>
              <div class="value"><el-input v-model="bodyformData.goodsWeight" size="mini" placeholder="请输入重量"></el-input></div>
              <div class="unit">KG</div>
            </div>
            <div>
              <div class="key">件数</div>
              <div class="value"><el-input v-model="bodyformData.goodsNum" size="mini" placeholder="请输入件数"></el-input></div>
              <div class="unit">件</div>
            </div>
            <div>
              <div class="key">体积</div>
              <div class="value"><el-input v-model="bodyformData.goodsVolumn" size="mini" placeholder="请输入体积"></el-input></div>
              <div class="unit">立方米</div>
            </div>
            <div>
              <div class="key">货物名称</div>
              <div class="value"><el-input v-model="bodyformData.goodsName" size="mini" placeholder="请输入货物名称"></el-input></div>
            </div>
            <div>
              <div class="key">货物代码</div>
              <div class="value"><el-input v-model="bodyformData.goodsCode" size="mini" placeholder="请输入货物代码"></el-input></div>
            </div>
            <div>
              <div class="key">代理人代码</div>
              <div class="value"><el-input v-model="bodyformData.agentCode" size="mini" placeholder="请输入代理人代码"></el-input></div>
            </div>
            <div>
              <div class="key">计费重量</div>
              <div class="yellow value"><el-input v-model="bodyformData.calcWeight" size="mini" placeholder="请输入计费重量"></el-input></div>
              <div class="unit">KG</div>
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="key">
                <p>货物尺寸</p>
                <p class="scale">(长*宽*高/件)</p>
                <p>单位：cm</p>
              </div>
              <div class="box">
                <!-- 增加尺寸模态框 -->
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
                <EasyScrollbar>
                  <div  id="wrapper">
                    <div class="box-inner">
                      <p v-for="(item,index) in bodyformData.goodsSize" :key="index">{{item}}</p>
                    </div>
                  </div>
                </EasyScrollbar>
              </div>
              <div class="add-btn" @click="addSizeDialogFormVisible = true"></div>
            </div>
            <div class="bottom">
              <div>
                <div class="key">备注</div>
                <div class="input"><el-input size="mini" v-model="bodyformData.remark" placeholder="请输入内容"></el-input></div>
              </div>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <el-button size="mini" type="danger" @click="submitOrderCabin('bodyform')">提交订舱</el-button>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import StartPortselect from "@/components/StartPortselect";
import EndPortselect from "@/components/EndPortselect";
import { mapGetters } from "vuex";
export default {
  components: {
    StartPortselect,
    EndPortselect
  },
  data() {
    return {
      addSizeDialogFormVisible: false,
      searchData: {
        start: "",
        planenum: "",
        end: "",
        ordernum: "",
        time: "",
        orderstatus: ""
      },
      totalPage: 0,
      orderListData: [],
      bodyformData: {
        planenum: "",
        data: "",
        lastDepot: "", // 剩余仓位
        startPort: "",
        endPort: "",
        goodsSize: [],
        mainOrderNumF: "",
        mainOrderNumB: "",
        goodsWeight: "",
        goodsNum: "",
        goodsVolumn: "",
        goodsName: "",
        goodsCode: "",
        agentCode: "",
        calcWeight: "",
        remark: ""
      },
      bodyform:{
        mainOrderNumF:[
          { required: true, message: '主运单号前缀', trigger: 'blur' },
          { min: 3, max: 3, message: '长度是 3 个字符', trigger: 'blur' }
        ],
        mainOrderNumB:[
          { required: true, message: '主运单号', trigger: 'blur' },
          { min: 8, max: 8, message: '长度是 8 个字符', trigger: 'blur' }
        ],
      },
      addSizeDialogFormData: {
        length: "",
        width: "",
        height: "",
        num: ""
      },
      orderstatuses: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "未订舱"
        },
        {
          value: "1",
          label: "申请中"
        },
        {
          value: "2",
          label: "订舱成功"
        },
        {
          value: "3",
          label: "拒绝订舱"
        }
      ],
      storeSelectItem: [] //储存被选中的订单信息
    };
  },
  created() {
    this.getOrderList(1, this.searchData.orderstatus);
  },
  methods: {
    startPortValue(val) {
      this.searchData.start = val;
    },
    endportvalue(val) {
      this.searchData.end = val;
    },
    bodyFormStartportvalue(val) {
      this.bodyformData.startPort = val;
    },
    bodyFormEndportvalue(val) {
      this.bodyformData.endPort = val;
    },
    currentChange(val) {
      this.getOrderList(val, this.searchData.orderstatus);

      // 当改变页数的时候，重置
      this.storeSelectItem = [];
      this.initFormData(this.storeSelectItem);
    },
    addGoodsSize() {
      console.log(typeof this.addSizeDialogFormData.length);
      if (
        !this.addSizeDialogFormData.length ||
        !this.addSizeDialogFormData.width ||
        !this.addSizeDialogFormData.height ||
        !this.addSizeDialogFormData.num
      ) {
        return;
      }
      var str =
        this.addSizeDialogFormData.length +
        "*" +
        this.addSizeDialogFormData.width +
        "*" +
        this.addSizeDialogFormData.height +
        "/" +
        this.addSizeDialogFormData.num;
      this.bodyformData.goodsSize.push(str);
      this.addSizeDialogFormVisible = false;
    },
    selectItem(item, id) {
      // 如果已经选择了带有主运单号的订单， 不可以在选择其他的订单
      // 如果订单中有主运单号 ， 当点击这个订单的时候 ，取消其它的选择
      if ("aviationNumber" in item) {
        this.storeSelectItem = [];
        this.orderListData.forEach(ele => {
          if (item == ele) {
          } else {
            ele.select = false;
          }
        });
        item.select = !item.select;
        if (item.select) {
          this.storeSelectItem.push({
            id: id,
            item: item
          });
        }
        // console.log(this.storeSelectItem);
        this.initFormData(this.storeSelectItem);
      }
      // 不带主运单号的订单
      if (!("aviationNumber" in item)) {
        var limit = true;
        this.orderListData.forEach(ele => {
          if ("aviationNumber" in ele && ele.select) {
            limit = false;
          }
        });
        if (limit) {
          item.select = !item.select;
          if (item.select) {
            this.storeSelectItem.push({
              id: id,
              item: item
            });
          } else {
            this.storeSelectItem.forEach((ele, index) => {
              if (ele.id == id) {
                this.storeSelectItem.splice(index, 1);
              }
            });
          }
        }
        // console.log(this.storeSelectItem);
        this.initFormData(this.storeSelectItem);
      }
    },
    initFormData(item) {
      //把选中的订单信息中的第一个item赋值给订舱信息
      if (item.length == 0) {
        this.bodyformData.startPort = "";
        this.bodyformData.endPort = "";
      } else {
        this.bodyformData.startPort = item[0].item.cityStart;
        this.bodyformData.endPort = item[0].item.cityEnd;
      }
    },
    getOrderList(pageIndex, orderstatus) {
      this.orderListData = [];
      if (orderstatus == undefined) {
        var _orderstatus = -1;
      } else if (orderstatus == "") {
        var _orderstatus = -1;
      } else {
        var _orderstatus = orderstatus;
      }
      this.axios
        .post("/web/v1/supplier/booking/list", {
          bookingStatus: _orderstatus,
          cityEnd: this.searchData.end,
          cityStart: this.searchData.start,
          flightDate: this.searchData.time,
          flightNo: this.searchData.planenum,
          id: this.id,
          orderNo: this.searchData.ordernum,
          pageIndex: pageIndex,
          size: 10,
          token: this.token
        })
        .then(data => {
          if (data.data.code == 1) {
            this.totalPage = data.data.total;
            this.orderListData.push(...data.data.data);
            // this.$set(item, "remove", false);
            this.orderListData.forEach(ele => {
              this.$set(ele, "select", false);
            });
            // console.log(this.orderListData);
          } else {
            this.$message.error("获取订舱列表失败,请重新获取。。");
          }
        });
    },
    submitOrderCabin(formName) {
      console.log(this.bodyformData.data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var orderids = ''
          this.storeSelectItem.forEach(ele=>{
            orderids = orderids + ele.item.id + ','
          })
          orderids = orderids.substring(0,orderids.length-1)
          this.axios.post("/web/v1/supplier/booking/save", {
            agentCode: this.bodyformData.agentCode,
            dep: this.bodyformData.startPort,
            dest: this.bodyformData.endPort,
            flightDate1: this.bodyformData.data,
            flightNo1: this.bodyformData.planenum,
            goods: this.bodyformData.goodsName,
            goodsCodo: this.bodyformData.goodsCode,
            goodsSize: this.bodyformData.goodsSize.toString(),
            goodsVolumn: this.bodyformData.goodsVolumn,
            id: this.id,
            no: this.bodyformData.mainOrderNumB,
            orderIds: orderids,
            pc: this.bodyformData.goodsNum,
            prefix: this.bodyformData.mainOrderNumF,
            remark: this.bodyformData.remark,
            token: this.token,
            weight: this.bodyformData.goodsWeight
          }).then(data=>{
            if(data.data.code == 1){
              this.$message({
                message: '恭喜你，订舱成功',
                type: 'success'
              });
            }else{
              this.$message.error('订舱失败');
            }
            console.log(data);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["id", "token"])
  }
};
</script>
<style lang="scss">
.booking-space {
  .red {
    color: #f6484f;
  }
  .green {
    color: #7eca49 !important;
  }
  .yellow {
    color: #fccf00 !important;
  }
  .scale {
    transform: scale(0.8);
  }
  .head {
    height: 61px;
    color: #cccccc;
    line-height: 61px;
    padding-left: 20px;
  }
  .body {
    .body-top {
      display: flex;
      padding-left: 20px;
      border-bottom: 1px solid #f0f0f0;
      > div {
        flex: 1;
        height: 100px;
        > div {
          margin-top: 10px;
          display: flex;
          .key {
            line-height: 28px;
            margin-right: 10px;
            color: #505050;
          }
          .value {
            .el-select {
              width: 180px;
              .el-input__inner {
                background-color: #e6e6e6;
                border: none;
              }
              .el-input__suffix {
                display: none;
              }
            }
            .el-input {
              width: 180px;
              input {
                border: none;
                background-color: #e6e6e6;
              }
            }
          }
        }
      }
      .column4 {
        text-align: center;
        button {
          transform: translateY(30px);
          padding: 6px 40px;
          box-shadow: 4px 4px 4px #e0e0e0;
        }
      }
    }
    .body-main {
      padding: 30px;
      .wrapper {
        display: grid;
        grid-template-columns: 100px 100px 250px repeat(7, 1fr);
        padding-left: 10px;
        color: #9f9f9f;
        text-align: center;
      }
      .thead {
        margin-bottom: 20px;
      }
      .easy-scrollbar {
        box-shadow: 0 0 10px #a0a0a0;
      }
      .tbody {
        margin-top: 2px;
        box-shadow: 4px 4px 4px #e0e0e0;
        background-color: #fff;
        &.success {
          background-color: #f7f7f7;
        }
        .tbody-head {
          display: flex;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px dashed #efefef;
          color: #9f9f9f;
          > div {
            margin-left: 30px;
          }
          .mainOrderNum,
          .orderNum,
          .examine {
            .value {
              color: #40b4e5;
            }
          }
          .examine {
            flex: 1;
            text-align: right;
            margin-right: 30px;
            span {
              cursor: pointer;
              &:hover {
                color: gray;
              }
            }
          }
        }
        .wrapper {
          // height: 80px;
          justify-items: center;
          align-items: center;
          .line {
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
          .operate {
            .icon {
              font-size: 30px;
              cursor: pointer;
              &.active {
                color: #8cc63f;
              }
            }
          }
        }
      }
      .page {
        text-align: center;
        margin: 60px 0 30px 0;
      }
    }
    .body-form {
      padding: 0 30px 30px 30px;
      background-color: #fff;
      background-clip: content-box;
      margin-bottom: 300px;
      .form-head {
        height: 4px;
        background: linear-gradient(
          45deg,
          yellow 0,
          yellow,
          50%,
          red 50%,
          red 100%
        );
        background-size: 40px 4px;
      }
      .form-content {
        display: flex;
        padding-bottom: 20px;
        border: 1px dotted #e0e0e0;
        .left {
          width: 350px;
          padding-left: 20px;
          border-right: 1px solid #e0e0e0;
          padding-right: 20px;
          h3 {
            color: #4f4f4f;
          }
          > div {
            display: flex;
            line-height: 20px;
            margin: 10px 0;
            .key {
              color: #999999;
              width: 80px;
              text-align-last: justify;
              margin-right: 20px;
            }
            .value {
              color: #808080;
            }
          }
          .plane-num,
          .plane-data,
          .last-depot,
          .startPort,
          .endPort {
            border-bottom: 1px solid #e0e0e0;
            position: relative;
            .value {
              .el-input {
                width: 180px;
                input {
                  border: none;
                  padding: 0 15px;
                }
                .el-input__prefix,
                .el-input__suffix {
                  display: none;
                }
              }
            }
            .arrow {
              position: absolute;
              top: 6px;
              right: 100px;
            }
          }
        }
        .center {
          width: 350px;
          padding: 0 40px;
          box-sizing: border-box;
          h3 {
            color: #4f4f4f;
          }
          > div {
            display: flex;
            margin: 15px 0;
            border-bottom: 1px solid #e0e0e0;
            .key {
              color: #a8a8a8;
              width: 80px;
              text-align-last: justify;
              margin-right: 10px;
            }
            .value {
              color: #5e5e5e;
              width: 100px;
              text-align: center;
              .el-input {
                input {
                  padding: 0;
                  border: none;
                  transform: translateY(-4px);
                  margin-left: 4px;
                }
              }
            }
            .unit {
              color: #a8a8a8;
              width: 80px;
              text-align: center;
            }
          }
          .main-order-num {
            position: relative;
            height: 28px;
            .line {
              position: absolute;
              top: 5px;
              left: 160px;
            }
            .value,
            .value2 {
              .el-input {
                input {
                  border: none;
                  transform: translateY(-10px);
                }
              }
              .el-form-item__error{
                z-index: 999;
                top:45%;
              }
            }
            .value {
              .el-input {
                width: 50px;
                input {
                  padding: 0;

                }
              }
            }
            .value2 {
              .el-input {
                width: 100px;
                input {
                  padding: 0;
                }
              }
            }
          }
        }
        .right {
          position: relative;
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
                  border-right: 1px solid #e0e0e0;
                  border-bottom: 1px solid #e0e0e0;
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
          .top {
            display: flex;
            padding-top: 40px;
            .key {
              width: 100px;
              color: #a5a5a5;
              text-align: center;
              padding-top: 70px;
              p {
                margin: 0;
              }
            }
            .box {
              width: 200px;
              height: 200px;
              border: 1px solid #b8b8b8;
              padding-left: 20px;
              box-sizing: border-box;
              #wrapper {
                height: 185px;
                .box-inner {
                  padding-bottom: 20px;
                }
              }
            }
            .add-btn {
              margin: 85px 0 0 50px;
              width: 30px;
              height: 30px;
              background-color: #fccf00;
              position: relative;
              cursor: pointer;
              &::before {
                content: "";
                position: absolute;
                width: 2px;
                height: 20px;
                background-color: #fff;
                top: 5px;
                left: 14px;
              }
              &::after {
                content: "";
                position: absolute;
                width: 2px;
                height: 20px;
                background-color: #fff;
                top: 5px;
                left: 14px;
                transform: rotate(90deg);
              }
            }
          }
          .bottom {
            position: absolute;
            bottom: 0;
            margin: 15px 0;
            > div {
              display: flex;
              .key {
                line-height: 28px;
              }
              .input {
                .el-input {
                  margin-left: 20px;
                  input {
                    border: none;
                    border-bottom: 1px solid #e0e0e0;
                    border-radius: 0;
                    padding: 0;
                  }
                }
              }
            }
          }
        }
      }
      .submit-btn {
        text-align: center;
        margin: 20px 0;
        button {
          padding: 7px 100px;
          box-shadow: 4px 4px 4px #e0e0e0;
        }
      }
    }
  }
}
</style>
