<template>
  <div class="s-order-track">
    <div class="head">
      <div class="title">
        <el-breadcrumb separator=">>>">
          <el-breadcrumb-item :to="{ path: '/supplier/order_taking' }">接单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单跟踪</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="steps">
        <el-steps :space="200" :active="menuStatus" finish-status="success">
          <el-step title="产品选择"></el-step>
          <el-step title="填写订单"></el-step>
          <el-step title="下单成功"></el-step>
          <el-step title="支付成功"></el-step>
          <el-step title="运输中"></el-step>
          <el-step title="订单完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <div class="linear"></div>
        <div class="content">
          <div class="left">
            <p>{{dateTransform(hnaOrder.createDate)}}</p>
            <div class="box orderNum">
              <div class="title">订单编号:</div>
              <div class="detail">{{hnaOrder.orderNo}}</div>
            </div>
            <div class="box transLine">
              <div class="title">运输线路:</div>
              <div class="detail">{{hnaOrder.cityStart}}——{{hnaOrder.cityEnd}}</div>
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
                <div class="item"><span class="get el-icon-circle-check"></span><span>运输保险</span></div>
              </div>
            </div>-->
          </div>
          <div class="middle">
            <img src="../../../assets/send.png" alt="">
            <p>{{statusName}}</p>
          </div>
          <div class="right">
            <el-button type="danger" @click="jumpDeal">订单详情</el-button>
          </div>
        </div>
      </div>
      <div class="main-bottom">
        <div class="triangle">
            <p>跟踪信息</p>
        </div>
        <div class="content">
          <div class="content-left">
            <div class="box weight">
              <span class="title">货物重量</span>
              <span class="detial">{{hnaOrder.goodsWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box num">
              <span class="title">货物件数</span>
              <span class="detial">{{hnaOrder.goodsNumber}}</span>
              <span class="unit">件</span>
            </div>
            <div class="box size">
              <span class="title">货物体积</span>
              <span class="detial">{{hnaOrder.goodsVolume }}</span>
              <span class="unit">立方米</span>
            </div>
            <div class="box payWeight">
              <span class="title">计费重量</span>
              <span class="detial">{{hnaOrder.actualWeight}}</span>
              <span class="unit">千克</span>
            </div>
            <div class="box type">
              <span class="title">货物类型</span>
              <span class="detial">{{hnaOrder.goodsTypeName}}</span>
            </div>
            <div class="box name">
              <span class="title">货物名称</span>
              <span class="detial">{{hnaOrder.goodsName }}</span>
            </div>
          </div>
          <div class="content-right">
            <!-- 新增状态模态框 -->
            <div class="statusModel">
              <el-dialog title="跟踪状态补充" :visible.sync="dialogFormVisible">
                <div class="model-box">
                  <div class="name">
                    <div class="key">状态名称：</div>
                    <div class="value">
                      <el-select v-model="statusname" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="data">
                    <div class="key">状态日期：</div>
                    <div class="value">
                      <el-date-picker
                        v-model="statusdata"
                        type="date"
                        :editable = false
                        :clearable=false
                        value-format = "yyyy-MM-dd"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <div class="arrow el-icon-arrow-down"></div>
                  </div>
                  <div class="time">
                    <div class="key">状态时间：</div>
                    <div class="value">
                      <el-time-picker
                        v-model="statustime"
                        value-format = "HH:mm:ss"
                        :editable = false
                        :clearable=false
                        placeholder="选择时间">
                      </el-time-picker>
                    </div>
                    <div class="arrow el-icon-arrow-down"></div>
                  </div>
                  <div class="button">
                    <div class="sure">
                      <el-button @click="reset" type="warning">确认调整</el-button>
                    </div>
                    <div @click="dialogFormVisible=false" class="cancle">取消</div>
                  </div>
                </div>
              </el-dialog>
            </div>
            <div class="addstatus">
              <div class="add" @click="addInfo"></div>
              <div class="word">新增状态</div>
            </div>
            <EasyScrollbar>
              <div class="box" id="wrapper">
                  <div v-for="(list,index) in trackListData" class="oneday">
                    <div class="data">{{trackListDate[index]}}</div>
                    <div class="time">
                      <div v-for="data in list" class="item">
                        <span class="itme-time">{{data.hour}}</span>
                        <span class="caption">{{data.orderType}}</span>
                        <span class="who">{{data.fullName}}</span>
                        <span class="reset"><img src="../../../assets/anew_icon.png" alt="" @click="modifyInfo(data.id,data.orderType,data.date,data.hour)"></span>
                        <span class="delete"><img src="../../../assets/delete_icon.png" alt="" @click="deleteInfo(data.id)"></span>
                      </div>
                    </div>
                  </div>
              </div>
            </EasyScrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      options: [
        {
          value: "订单提交",
          label: "订单提交"
        },
        {
          value: "受理订单",
          label: "受理订单"
        },
        {
          value: "支付订单",
          label: "支付订单"
        },
        {
          value: "货物复核",
          label: "货物复核"
        },
        {
          value: "补缴费用",
          label: "补缴费用"
        },
        {
          value: "完成订单",
          label: "完成订单"
        },
        {
          value: "接受货物",
          label: "接受货物"
        },
        {
          value: "到达始发港",
          label: "到达始发港"
        },
        {
          value: "出港收运",
          label: "出港收运"
        },
        {
          value: "正式舱单",
          label: "正式舱单"
        },
        {
          value: "货物离港",
          label: "货物离港"
        },
        {
          value: "货物到达",
          label: "货物到达"
        },
        {
          value: "货物提取",
          label: "货物提取"
        },
        {
          value: "到达目的港",
          label: "到达目的港"
        },
        {
          value: "开始派送",
          label: "开始派送"
        },
        {
          value: "派送完成",
          label: "派送完成"
        }
      ],
      statusname: "",
      statusdata: "",
      statustime: "",
      infoId: '',
      orderNo: "",
      orderStatus: "", //订单状态
      statusName: "", //状态名
      menuStatus: -1,  //顶部导航状态
      hnaOrder: {},
      serviceStatus: {//服务是否选中
        serviceB: false,
        serviceC: false,
        serviceD: false,
        serviceE: false
      },
      trackListDate: [],
      trackListData:[],
      orderId: '',
    };
  },
  created() {
    this.orderStatus = this.$route.query.orderStatus;
    this.orderNo = this.$route.query.orderNo;
    this.loadOrderTrack();
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    loadOrderTrack (){
      this.axios.post("/web/v1/supplier/order/track",{
        "id": this.id,
        "status": this.orderStatus,
        "orderNo": this.orderNo,
        "token": this.token,
      }).then(data => {
        if(data.data.code === 1){
          let res =data.data;
          let statusName = "";
          let menuStatus = 3;
          this.hnaOrder = res.hnaOrder;
          this.orderId = res.hnaOrder.id;
          switch (res.hnaOrder.orderStatus){
            case 2:
              statusName = '待受理';
              menuStatus = 3;
              break;
            case 3:
              statusName = '待支付';
              menuStatus = 3;
              break;
            case 4:
              statusName = '已支付';
              menuStatus = 4;
              break;
            case 5:
              statusName = '运送中';
              menuStatus = 5;
              break;
            case 6:
              statusName = '待补缴';
              menuStatus = 5;
              break;
            case 7:
              statusName = '已完成';
              menuStatus = 6;
              break;
            case 8:
              statusName = '已取消';
              menuStatus = -1;
              break;
            case 9:
              statusName = '已拒绝';
              menuStatus = -1;
              break;
          }
          this.statusName = statusName;
          this.menuStatus = menuStatus;
          if(res.hnaOrder.productCode){
            let serviceList = [];
            serviceList = res.hnaOrder.productCode.split('/');
            for(let i=0;i<serviceList.length;i++){
              switch (serviceList[i]){
                case 'B': this.serviceStatus.serviceB = true; break;
                case 'C': this.serviceStatus.serviceC = true; break;
                case 'D': this.serviceStatus.serviceD = true; break;
                case 'E': this.serviceStatus.serviceE = true; break;
              }
            }
          }
          if(res.trackList.length){
            let obj={};
            for(let i=0;i<res.trackList.length;i++){
              let time = this.dateTransform(res.trackList[i].createTime).split(' ');
              res.trackList[i].date = time[0];
              res.trackList[i].hour = time[1];
              if(obj[time[0]]){
                obj[time[0]].push(res.trackList[i]);
              }else{
                obj[time[0]]=[];
                obj[time[0]].push(res.trackList[i]);
              }
            }
            let arr1 = [];
            let arr2 = [];
            for(let k in obj){
              arr1.push(k);
              arr2.push(obj[k]);
            }
            this.trackListDate=arr1;
            this.trackListData=arr2;
          }
        }else if(data.data.code === -1&&data.data.msg === "登录超时"){
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
      })
    },
    modifyInfo (id,type,date,hour){
      this.statusname = '';
      this.statusdata = '';
      this. statustime = '';
      this.infoId = '';
      this.dialogFormVisible = true;
      this.statusname = type;
      this.statusdata = date;
      this. statustime = hour;
      this.infoId = id;
    },
    addInfo (){
      this.statusname = '';
      this.statusdata = '';
      this. statustime = '';
      this.infoId = '';
      this.dialogFormVisible = true;
      let time = this.dateTransform(new Date()).split(' ');
      this.statusdata = time[0];
      this. statustime = time[1];
    },
    reset (){
      if(!this.statusname || !this.statusdata || !this. statustime){
        this.$message({
          showClose: true,
          message: '填写有误，请填写好重新提交！',
          type: 'error',
        });
        return
      }
      if(this.infoId!==""){
        this.axios.post("/web/v1/supplier/order/trackEdit",{
          "id": this.id,
          "orderNo": this.orderNo,
          "token": this.token,
          "createTime": this.statusdata+' '+this. statustime,
          "orderType": this.statusname,
          "trackId": this.infoId,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.loadOrderTrack();
          }else if(data.data.code === -1&&data.data.msg === "登录超时"){
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
        })
      }else{
        this.axios.post("/web/v1/supplier/order/trackEdit",{
          "id": this.id,
          "orderNo": this.orderNo,
          "token": this.token,
          "createTime": this.statusdata+' '+this. statustime,
          "orderType": this.statusname,
        }).then(data => {
          if(data.data.code === 1&&data.data.msg === "操作成功"){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.loadOrderTrack();
          }else if(data.data.code === -1&&data.data.msg === "登录超时"){
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
        })
      }
    },
    deleteInfo (id){
      this.$confirm('此操作将删除该条跟踪状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/web/v1/supplier/order/trackDel",{
          "id": this.id,
          "token": this.token,
          "recordId": id,
        }).then(data => {
          if(data.data.code === 1&&data.data.msg === "操作成功"){
            this.$notify({
              title: '成功',
              message: '删除成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.loadOrderTrack();
          }else if(data.data.code === -1&&data.data.msg === "登录超时"){
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
        })
      }).catch(() => {
      });
    },
    jumpDeal (){
      this.$router.push({ path: '/supplier/order_deal', query: { orderNo: this.orderNo,orderId: this.orderId}})
    },
    dateTransform(time){
      let newTime = new Date(time);
      let year = newTime.getFullYear();
      let month = (newTime.getMonth() + 1)<10?'0'+(newTime.getMonth() + 1):(newTime.getMonth() + 1);
      let date = newTime.getDate()<10?'0'+newTime.getDate():newTime.getDate();
      let hour = newTime.getHours()<10?'0'+newTime.getHours():newTime.getHours();
      let minutes = newTime.getMinutes()<10?'0'+newTime.getMinutes():newTime.getMinutes();
      let seconds = newTime.getSeconds()<10?'0'+newTime.getSeconds():newTime.getSeconds();
      return year+'-'+month+'-'+date+' '+hour+':'+minutes+':'+seconds
    },
  },
  computed: {
    ...mapGetters(["id", "token"])
  }
};
</script>
<style lang="scss">
.s-order-track {
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
    .steps {
      flex: 1;
      padding-left: 30px;
      padding-top: 6px;
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
          padding-top: 60px;
        }
        .right {
          width: 100%;
          text-align: center;
          padding-top: 80px;
          button {
            padding: 4px 20px;
            box-shadow: 4px 4px 6px #e0e0e0;
          }
        }
      }
    }
    .main-bottom {
      margin-top: 20px;
      box-shadow: 4px 4px 4px #e0e0e0;
      background-color: #fff;
      position: relative;
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
      .content {
        display: flex;
        .content-left {
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
        .content-right {
          position: relative;
          flex: 1;
          padding: 40px;
          height: 200px;
          color: #b3b3b3;
          .statusModel {
            .el-dialog__wrapper {
              .el-dialog {
                .el-dialog__header {
                  background-color: #fccf00;
                  .el-dialog__title {
                    color: #fff;
                  }
                }
                .el-dialog__body {
                  .model-box {
                    width: 320px;
                    height: 200px;
                    margin: 0 auto;

                    .name,
                    .data,
                    .time {
                      display: flex;
                      position: relative;
                      border-bottom: 1px solid #e0e0e0;
                      .key {
                        width: 100px;
                        text-align-last: justify;
                        line-height: 40px;
                      }
                      .value {
                        input {
                          border: none;
                          padding: 0 15px;
                        }
                        .el-input__prefix {
                          display: none;
                        }
                      }
                      .arrow {
                        position: absolute;
                        top: 16px;
                        right: 32px;
                      }
                    }
                    .button{
                      display: flex;
                      margin-top: 20px;
                      .sure{
                        margin-right: 20px;
                        button{
                          padding: 6px 80px;
                          box-shadow: 4px 4px 4px #e0e0e0;
                        }
                      }
                      .cancle{
                        cursor: pointer;
                        color: #B4B4B4;
                      }
                    }
                  }
                }
              }
            }
          }
          .addstatus {
            position: absolute;
            right: 100px;
            top: 120px;
            z-index: 99;
            .add {
              cursor: pointer;
              margin: 0 auto;
              width: 30px;
              height: 30px;
              background-color: #fccf00;
              position: relative;
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
            .word {
              font-size: 12px;
            }
          }
          .box {
            width: 100%;
            height: 200px;
          }
          .oneday {
            &:first-child {
              .time {
                .item:first-child::before {
                  background-color: #fccf00;
                }
              }
            }
            margin-left: 70px;
            display: flex;
            .data {
              position: relative;
            }
            .time {
              margin-left: 40px;
              .item {
                line-height: 20px;
                position: relative;
                &::before {
                  content: "";
                  position: absolute;
                  top: 6px;
                  left: -174px;
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: #b3b3b3;
                  background-color: #e6e6e6;
                  z-index: 99;
                }
                &::after {
                  content: "";
                  position: absolute;
                  left: -171px;
                  top: 0;
                  height: 100%;
                  width: 2px;
                  background-color: #e6e6e6;
                }
                display: flex;
                span {
                  margin: 0px 10px 20px;
                }
                .reset{
                  cursor: pointer;
                }
                .delete{
                  cursor: pointer;
                  transform: translateY(2px);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
