<template>
  <div class="airplan">
    <div class="head">航班计划维护</div>
    <div class="body">
      <div class="query">
        <div class="row">
          <div class="box start-port">
            <div style="padding-left: 14px" class="label">始发港</div>
            <div class="value">
              <el-select size="mini" filterable v-model="startPort" placeholder="始发港">
                <el-option
                  v-for="item in portList"
                  :key="item.id"
                  :label="item.cnName+'（'+item.airportCode+'）'"
                  :value="item.cnName+'（'+item.airportCode+'）'">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box end-port">
            <div class="label">目的港</div>
            <div class="value">
              <el-select size="mini" filterable v-model="endPort" placeholder="目的港">
                <el-option
                  v-for="item in portList"
                  :key="item.id"
                  :label="item.cnName+'（'+item.airportCode+'）'"
                  :value="item.cnName+'（'+item.airportCode+'）'">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="box business-type">
            <div class="label">资源类型</div>
            <div class="value">
              <el-select size="mini" v-model="resourcesType" placeholder="请选择">
                <el-option
                  v-for="item in resourcesTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box flight-number">
            <div class="label">航班号</div>
            <div class="value">
              <el-input
                placeholder="请输入航班号"
                :clearable = true
                size="mini"
                v-model="flightNumber">
              </el-input>
            </div>
          </div>
          <div class="btn">
            <el-button @click="queryFlight" size="mini" type="danger">查询</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="tool">
          <ul class="menu1">
            <li><button @click="checkFlightPlan" type="button" class="gray">{{checkMore}}</button></li>
            <li><button :class="{disableStyle:isDisable}">导出</button></li>
            <li><button :class="{disableStyle:isDisable}">导入</button></li>
            <li class="add"><button title="新增/修改航班计划" @click="addFlightPlan = true" :class="{disableStyle:isDisable}"><img class="addIcon" src="../../../assets/son_add.png"></button></li>
          </ul>
          <ul :class="{show:isShow}" class="menu2">
            <li><button @click="generateMoreFlight" type="button" class="yellow">航班生成</button></li>
            <li><button @click="deleteMoreFlight" type="button" class="gray">删除</button></li>
          </ul>
        </div>
        <ul class="flight-list">
          <li class="list-head">
            <p>资源类型</p>
            <p>航班号</p>
            <p>国际/国内</p>
            <p>线路</p>
            <p>计划始发</p>
            <p>计划到达</p>
            <p>舱位量</p>
            <p>班期</p>
            <p>操作</p>
          </li>
          <li v-if="flightList.length!==0" v-for="(item,index) in flightList" @click="clickItem(index)" :class="{hand:isShow}">
            <p>{{item.resourceType===1?'自营':'第三方'}}</p>
            <p>{{item.flight}}</p>
            <p>{{item.countryType===1?'国际':'国内'}}</p>
            <p class="line">
            <span class="box">
              <i></i>
              <span>{{item.cityStart}}</span>
              <span>{{item.cityEnd}}</span>
            </span>
            </p>
            <p>{{item.planStart}}</p>
            <p>{{item.planEnd}}</p>
            <p>{{item.shippingSpace}}</p>
            <p>{{item.flightSchedule.slice(0,-1)}}</p>
            <p>
              <img :class="{hide:isShow}" @click="flightPlanGenerate(item.id)" class="modify" title="航班生成" src="../../../assets/son_generate.png">
              <img :class="{hide:isShow}" @click="modifyFlightPlan(item)" class="modify" title="修改" src="../../../assets/son_modify.png">
              <img :class="{hide:isShow}" @click="deleteFlight(item.id)" title="删除" src="../../../assets/son_delete.png">
            </p>
            <span :class="{active:item.check}" class="sign"></span>
          </li>
          <li v-if="flightList.length===0" class="handle">暂无数据</li>
        </ul>
        <!--分页-->
        <div class="block pagination">
          <el-pagination
            layout="prev, pager, next"
            :page-size = 10
            @current-change = "flipList"
            :total="pageTotal">
          </el-pagination>
        </div>
        <!--新增航班计划模态框-->
        <div class="add-flight-plan">
          <el-dialog width="1000px" title="新增/修改航班计划" :visible.sync="addFlightPlan">
            <div class="content">
              <div class="left">
                <div class="box">
                  <div class="label">资源类型:</div>
                  <div class="value">
                    <el-select size="small" v-model="addFlightParameter.resourcesType">
                      <el-option
                        v-for="item in resourcesTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="box">
                  <div class="label">国内/国际:</div>
                  <div class="value">
                    <el-select size="small" v-model="addFlightParameter.domesticAbroad">
                      <el-option
                        v-for="item in domesticAbroadList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="box flight-schedule">
                  <div class="label">航班班期:</div>
                  <div class="value">
                    <div>
                      <el-checkbox-group v-model="checkboxGroup" size="mini">
                        <el-checkbox-button v-for="day in schedule" :label="day" :key="day">{{day}}</el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <div class="box">
                  <div class="label">始发港:</div>
                  <div class="value">
                    <el-select size="small" filterable v-model="addStartPort" placeholder="始发港">
                      <el-option
                        v-for="item in portList"
                        :key="item.id"
                        :label="item.cnName+'（'+item.airportCode+'）'"
                        :value="item.cnName+'（'+item.airportCode+'）'">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="box">
                  <div class="label">计划始发:</div>
                  <div class="value">
                    <el-time-picker
                      v-model="addFlightParameter.planStart"
                      value-format="HH:mm"
                      format="HH:mm"
                      :clearable=false
                      :editable=false
                      size="small"
                      placeholder="选择时间">
                    </el-time-picker>
                  </div>
                </div>
                <div class="box">
                  <div class="label">航班号:</div>
                  <div class="value">
                    <el-input
                      size="small"
                      v-model="addFlightParameter.flightNumber">
                    </el-input>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="box">
                  <div class="label">目的港:</div>
                  <div class="value">
                    <el-select size="small" filterable v-model="addEndPort" placeholder="目的港">
                      <el-option
                        v-for="item in portList"
                        :key="item.id"
                        :label="item.cnName+'（'+item.airportCode+'）'"
                        :value="item.cnName+'（'+item.airportCode+'）'">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="box">
                  <div class="label">计划到达:</div>
                  <div class="value">
                    <el-time-picker
                      v-model="addFlightParameter.planEnd"
                      value-format="HH:mm"
                      format="HH:mm"
                      :clearable=false
                      :editable=false
                      size="small"
                      placeholder="选择时间">
                    </el-time-picker>
                  </div>
                </div>
                <div class="box">
                  <div class="label">舱位量:</div>
                  <div class="value">
                    <el-input
                      size="small"
                      v-model="addFlightParameter.shippingSpace">
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="addFlightPlan = false">取 消</span>
              <el-button @click="getAddFlight" size="mini" class="sure" type="warning">保 存</el-button>
            </div>
          </el-dialog>
        </div>
        <!--航班生成-->
        <div class="flight-generate">
          <el-dialog width="1000px" title="航班生成" :visible.sync="flightGenerate">
            <div class="content">
              <div class="box">
                <div class="label">航班生成范围:</div>
                <div class="value">
                  <el-date-picker
                    v-model="dateRange"
                    :clearable=false
                    :editable=false
                    type="daterange"
                    value-format = "yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="flightGenerate = false">取 消</span>
              <el-button @click="getFlightGenerate" size="mini" class="sure" type="warning">保 存</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    data () {
      return {
//    搜索的初始值
        resourcesType: '',
        resourcesTypeList: [
          {
            value: 1,
            label: "自营"
          },
          {
            value: 2,
            label: "第三方"
          },
        ],
        startPort: '',
        endPort: '',
        portList: [],
        flightNumber: '',
        airlineCompany: '',
        checkMore: '批量选择',
        flightList: [],
        pageTotal: 0, //总页数
//    模态框状态
        addFlightPlan: false,
        domesticAbroadList: [
          {
            value: 0,
            label: "国内"
          },
          {
            value: 1,
            label: "国际"
          },
        ],
        checkboxGroup: [],
        schedule: [1, 2, 3, 4, 5, 6, 7],
        addFlightParameter: {},
        addStartPort: '',
        addEndPort: '',
        flightPlanId: -1,
//    航班生成
        flightGenerate: false,
        dateRange: '',
        flightGenerateIds: '',
      }
    },
    created (){
      this.getPortList();
      this.getAirPlanList (1);
    },
    watch: {
      addFlightPlan (){
        if(this.addFlightPlan === false){
          this.addFlightParameter = {};
          this.checkboxGroup = [];
          this.addStartPort = '';
          this.addEndPort = '';
        }
      },
    },
    methods:{
      getPortList (){
        this.axios.get("/airport/list").then(data => {
          this.portList = data.data;
        });
      },
      checkFlightPlan (){
        this.checkMore = (this.checkMore === '批量选择')?'取消选择':'批量选择';
        if(this.checkMore === '批量选择'){
          this.removeCheck();
        }
      },
      removeCheck (){
        let flightList = this.flightList;
        for(let i=0;i<flightList.length;i++){
          this.$set(this.flightList[i],'check',false);
        }
      },
      getAirPlanList (page){
        this.flightList = [];
        let resourcesType = this.resourcesType || -1;
        this.axios.post("/web/v1/fligt/getFlightPlanList",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.endPort,
          "cityStart": this.startPort,
          "flight": this.flightNumber,
          "resourceType": resourcesType,
          "pageIndex": page,
          "size": 10,
        }).then(data => {
          if(data.data.code === 1){
            if(data.data.hnaFlightPlans.length){
              this.pageTotal = data.data.total;
              this.flightList = data.data.hnaFlightPlans;
            }
          }
        });
      },
      flipList (page){
        this.getAirPlanList(page)
      },
      queryFlight (){
        this.getAirPlanList (1);
      },
      getAddFlight (){
        let flightSchedule = '';
        if(this.checkboxGroup.length){
          this.checkboxGroup = this.checkboxGroup.sort();
          for(let i=0;i<this.checkboxGroup.length;i++){
            flightSchedule += this.checkboxGroup[i]+',';
          }
        }
        if(!this.addEndPort
          ||!this.addStartPort
          ||!this.addFlightParameter.flightNumber
          ||!this.addFlightParameter.resourcesType
          ||!flightSchedule
          ||!this.addFlightParameter.planStart
          ||!this.addFlightParameter.planEnd
          ||!this.addFlightParameter.shippingSpace
          ||!(this.addFlightParameter.domesticAbroad===0||this.addFlightParameter.domesticAbroad===1)
        ){
          this.$notify.error({
            title: '错误',
            message: '填写有误，所有的项都是必须选择或填写的，请检查！'
          });
          return
        }
        this.axios.post("/web/v1/fligt/saveFlightPlan",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.addEndPort,
          "cityStart": this.addStartPort,
          "flight": this.addFlightParameter.flightNumber,
          "resourceType": this.addFlightParameter.resourcesType,
          "countryType": this.addFlightParameter.domesticAbroad,
          "flightSchedule": flightSchedule,
          "planStart": this.addFlightParameter.planStart,
          "planEnd": this.addFlightParameter.planEnd,
          "shippingSpace": this.addFlightParameter.shippingSpace,
          "flightPlanId": this.flightPlanId,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.addFlightPlan = false;
            this.getAirPlanList (1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      deleteFlight (flightId){
        this.$confirm('此操作将删除该条航班计划，无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/web/v1/fligt/delFlightPlan",{
            "id": this.id,
            "token": this.token,
            "ids": flightId
          }).then(data => {
            if(data.data.code === 1){
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              });
              this.getAirPlanList (1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        })
      },
      modifyFlightPlan (obj){
        this.addFlightPlan = true;
        this.addFlightParameter.resourcesType = obj.resourceType;
        this.domesticAbroad = obj.countryType;
        this.addFlightParameter.supplier = obj.supplierId;
        let arr = obj.flightSchedule.slice(0,-1).split(',');
        let newArr = [];
        if(arr.length){
          for(let i=0;i<arr.length;i++){
            newArr.push(parseInt(arr[i]));
          }
          this.checkboxGroup = newArr;
        }else{
          this.checkboxGroup = [];
        }
        this.addStartPort = obj.cityStart;
        this.addEndPort = obj.cityEnd;
        this.addFlightParameter.planStart = obj.planStart;
        this.addFlightParameter.planEnd = obj.planEnd;
        this.addFlightParameter.flightNumber = obj.flight;
        this.addFlightParameter.shippingSpace = obj.shippingSpace;
        this.addFlightParameter.domesticAbroad = obj.countryType;
        this.flightPlanId = obj.id;
      },
      flightPlanGenerate (ids){
        this.flightGenerateIds = ids;
        this.flightGenerate = true;
      },
      getFlightGenerate (){
        if(!this.dateRange){
          this.$notify.error({
            title: '错误',
            message: '请选择日期范围！'
          });
          return
        }
        this.axios.post("/web/v1/fligt/generateFlightRecord",{
          "id": this.id,
          "token": this.token,
          "ids": this.flightGenerateIds,
          "beginTime": this.dateRange[0],
          "endTime": this.dateRange[1],
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.flightGenerate = false;
            this.removeCheck();
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      clickItem (index){
        if(this.checkMore === '批量选择'){
          return
        }
        this.$set(this.flightList[index],'check',!this.flightList[index].check)
      },
      deleteMoreFlight (){
        let flightList = this.flightList;
        let ids = '';
        for(let i=0;i<flightList.length;i++){
            if(flightList[i].check){
              ids += flightList[i].id+',';
            }
        }
        if(ids){
          this.$confirm('此操作将删除勾选的航班计划，无法恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.post("/web/v1/fligt/delFlightPlan",{
              "id": this.id,
              "token": this.token,
              "ids": ids
            }).then(data => {
              if(data.data.code === 1){
                this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success'
                });
                this.getAirPlanList (1);
              }else{
                this.$notify.error({
                  title: '错误',
                  message: data.data.msg
                });
              }
            });
          })
        }else{
          this.$notify.error({
            title: '警告',
            message: '您还没有勾选要删除的航班计划，请点击勾选！',
            type: 'warning'
          });
        }
      },
      generateMoreFlight (){
        let flightList = this.flightList;
        let ids = '';
        for(let i=0;i<flightList.length;i++){
          if(flightList[i].check){
            ids += flightList[i].id+',';
          }
        }
        if(ids){
          this.flightGenerate = true;
          this.flightGenerateIds = ids;
        }else{
          this.$notify.error({
            title: '警告',
            message: '您还没有勾选要生成航班计划，请点击勾选！',
            type: 'warning'
          });
        }
      },
    },
    computed: {
      ...mapGetters(["id", "token"]),
      isDisable: function () {
        return this.checkMore === '取消选择'
      },
      isShow: function (){
        return this.checkMore === '取消选择'
      },
    }
  }
</script>
<style lang="scss">
  .airplan{
    .head{
      height: 61px;
      line-height: 61px;
      padding-left: 20px;
      color: #b3b3b3;
      font-size: 16px;
    }
    .body{
      color: #A7A7A7;
      .query {
        padding-left: 20px;
        .row {
          margin: 10px;
          .box{
            display: inline-block;
            margin-right: 20px;
            .label{
              display: inline-block;
              margin: 0px 10px;
              color: #595959;
            }
            .value{
              display: inline-block;
              input {
                background-color: #e6e6e6;
                border: none;
              }
            }
          }
          .business-type{
            .value{
              width: 160px;
            }
          }
          .supplier{
            .value{
              width: 160px;
            }
          }
          .start-port{
            .value{
              width: 160px;
            }
          }
          .end-port{
            .value{
              width: 160px;
            }
          }
          .airline-company{
            .value{
              width: 240px;
            }
          }
          .flight-number{
            .value{
              width: 160px;
            }
          }
          .btn{
            float: right;
            margin-right: 50px;
          }
        }
      }
      .content{
        border-top: 1px solid #ECECEC;
        padding-left: 20px;
        .tool{
          height: 40px;
          .menu1 {
            margin: 0;
            padding: 0;
            height: 40px;
            float: right;
            margin-right: 55px;
            li {
              float: left;
              height: 20px;
              line-height: 20px;
              width: 100px;
              margin-top: 10px;
              margin-right: 20px;
              button {
                width: 100%;
                height: 100%;
                border: 0;
                color: #fff;
                border-radius: 3px;
                background-color: #fccf00;
                cursor: pointer;
                outline: none;
                -moz-box-shadow: 0 3px 3px #CFCFCF; /*firefox*/
                -webkit-box-shadow: 0 3px 3px #CFCFCF; /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
              }
              .disableStyle {
                opacity: 0.5;
              }
              .disableStyle:hover {
                cursor: not-allowed;
              }
              .gray {
                background-color: #A0A0A0;
              }
            }
            .add {
              width: 20px;
              button {
                width: 20px;
                height: 20px;
                cursor: pointer;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                outline: none;
                -moz-box-shadow: 0 3px 3px #CFCFCF; /*firefox*/
                -webkit-box-shadow: 0 3px 3px #CFCFCF; /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
                img {
                  width: 20px;
                  height: 20px;
                }
              }
              .disableStyle {
                opacity: 0.5;
              }
              .disableStyle:hover {
                cursor: not-allowed;
              }
            }
          }
          .menu2{
            display: none;
            float: right;
            margin: 0;
            padding: 0;
            height: 40px;
            li {
              float: left;
              height: 20px;
              line-height: 20px;
              width: 80px;
              margin-right: 20px;
              margin-top: 10px;
              button{
                width: 100%;
                height: 100%;
                color: #fff;
                border-radius: 3px;
                cursor: pointer;
                border: 0;
                outline: none;
                -moz-box-shadow:0 3px 3px #CFCFCF;         /*firefox*/
                -webkit-box-shadow:0 3px 3px #CFCFCF;      /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
              }
              .yellow{
                background-color: #fccf00;
              }
              .gray{
                background-color: #808080;
              }
            }
          }
          ul.show{
            display: block;
          }
        }
        .flight-list{
          padding: 0;
          margin: 0;
          min-height: 600px;
          li{
            height: 70px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBEBEB;
            position: relative;
            p{
              float: left;
              height: 70px;
              line-height: 70px;
              margin: 0;
              text-align: center;
              img{
                cursor: pointer;
              }
              .hide{
                display: none;
              }
              .modify{
                margin-right: 10px;
              }
            }
            .line{
              line-height: 30px;
              .box{
                display: inline-block;
                height: 60px;
                line-height: 30px;
                position: relative;
                padding-left: 15px;
                margin-top: 5px;
                i{
                  position: absolute;
                  top: 14px;
                  left: 0;
                  width: 8px;
                  height: 32px;
                  border: 1px solid #b0b0b0;
                  border-right: 0;
                }
                span{
                  display: block;
                  text-align: left;
                }
              }
            }
            p:nth-child(1){width: 10%}
            p:nth-child(2){width: 10%}
            p:nth-child(3){width: 10%}
            p:nth-child(4){width: 15%}
            p:nth-child(5){width: 10%}
            p:nth-child(6){width: 10%}
            p:nth-child(7){width: 10%}
            p:nth-child(8){width: 12%}
            p:nth-child(9){width: 13%}
            .sign{
              display: none;
              position: absolute;
              width: 0;
              height: 0;
              border-top: 15px solid #fccf00;
              border-right: 15px solid #fccf00;
              border-bottom: 15px solid transparent;
              border-left: 15px solid transparent;
              right: 0px;
              top: 0px;
            }
            span.active{
              display: block;
            }
          }
          .handle{
            text-align: center;
            border: 0;
            margin-top: 30px;
          }
          .hand{
            cursor: pointer;
          }
          .list-head{
            height: 40px;
            p{
              height: 40px;
              line-height: 40px;
            }
          }
        }
        .pagination{
          text-align: center;
          margin-bottom: 30px;
        }
        .add-flight-plan{
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
                padding: 20px 60px;
                box-sizing: border-box;
                overflow: hidden;
                div{
                  .box{
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #E6E6E6;
                    .label{
                      width: 80px;
                      color: #A7A7A7;
                      display: inline-block;
                      text-align: justify;
                      text-align-last: justify;
                      -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                    }
                    .value{
                      display: inline-block;
                      .el-input{
                        width: 160px;
                      }
                      input{
                        border: 0;
                        width: 180px;
                      }
                    }
                  }
                }
                .left{
                  float: left;
                  width: 30%;
                  margin-right: 5%;
                  div.flight-schedule{
                    border: 0;
                    .label{
                      float: left;
                      margin-right: 5px;
                    }
                    .value{
                      span{
                        float: left;
                        margin-top: 9px;
                        box-sizing: border-box;
                        padding: 4px 8px;
                        font-size: 12px;
                      }
                      .el-checkbox-button__inner{
                        color: #FCCF00;
                        border-color: #FCCF00;
                      }
                      .el-checkbox-button.is-checked{
                        .el-checkbox-button__inner{
                          background-color: #FCCF00;
                          border-color: #FCCF00;
                          color: #fff;
                          -webkit-box-shadow: -1px 0 0 0 #FCCF00;
                          box-shadow: -1px 0 0 0 #FCCF00;
                        }
                      }
                    }
                  }
                }
                .center{
                  float: left;
                  width: 30%;
                  margin-right: 5%;
                }
                .right{
                  float: left;
                  width: 30%;
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
                  right: 320px;
                  color: #b4b4b4;
                }
              }
            }
          }
        }
        .flight-generate{
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
                padding: 20px 0px;
                text-align: center;
                .box{
                  display: inline-block;
                  text-align: left;
                  height: 40px;
                  line-height: 40px;
                  border-bottom: 1px solid #E6E6E6;
                  width: 600px;
                  .label{
                    width: 120px;
                    color: #A7A7A7;
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                    -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                  }
                  .value{
                    display: inline-block;
                    .el-date-editor{
                      width: 470px;
                      border: 0;
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
                  right: 320px;
                  color: #b4b4b4;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
