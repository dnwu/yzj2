<template>
  <div class="Plane_manage">
    <div class="head">航班管理</div>
    <div class="body">
      <div class="query">
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
          <div class="box start-port">
            <div class="label">始发港</div>
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
          <div class="box flight-date">
            <div class="label">航班日期</div>
            <div class="value">
              <el-date-picker
                v-model="flightDate"
                type="date"
                value-format = "yyyy-MM-dd"
                size="mini"
                :editable=false
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="btn">
            <el-button @click="queryFlight" size="mini" type="danger">查询</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="tool">
          <ul class="menu">
            <li class="add"><img title="航班新增" @click="addFlight = true" class="addIcon" src="../../../assets/son_add.png"></li>
          </ul>
        </div>
        <ul class="flight-list">
          <li class="list-head">
            <p>航班日期</p>
            <p>资源类型</p>
            <p>航班号</p>
            <p>国际/国内</p>
            <p>线路</p>
            <p>舱位总量</p>
            <p>剩余舱位</p>
            <p>操作</p>
          </li>
          <li v-if="flightList.length!==0" v-for="item in flightList">
            <p>{{item.flightDate}}</p>
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
            <p>{{item.totalSeats}}</p>
            <p>{{item.syShippingSpace}}</p>
            <p>
              <img title="删除" @click="deleteFlight(item.id)" src="../../../assets/son_delete.png">
            </p>
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
        <!--新增航班-->
        <div class="add-flight">
          <el-dialog width="1000px" title="航班新增" :visible.sync="addFlight">
            <div class="content">
              <div class="left">
                <div class="box date">
                  <div class="label">航班日期:</div>
                  <div class="value">
                    <el-date-picker
                      v-model="addFlightParameter.effectiveDate"
                      type="date"
                      size="small"
                      value-format = "yyyy-MM-dd"
                      :editable=false
                      placeholder="选择日期">
                    </el-date-picker>
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
              <div class="center">
                <div class="box">
                  <div class="label">始发港:</div>
                  <div class="value">
                    <el-select size="small" filterable v-model="addStartPort" placeholder="目的港">
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
                  <div class="label">舱位量:</div>
                  <div class="value">
                    <el-input
                      size="mini"
                      v-model="addFlightParameter.space">
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="addFlight = false">取 消</span>
              <el-button @click="getAddFlight" size="mini" class="sure" type="warning">保 存</el-button>
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
        // goodsType: '',
        // goodsTypeList: [
        //   {
        //     value: 7,
        //     label: "普货"
        //   },
        //   {
        //     value: 8,
        //     label: "冷链"
        //   },
        //   {
        //     value: 9,
        //     label: "重货"
        //   },
        //   {
        //     value: 10,
        //     label: "危险品"
        //   },
        // ],
        portList: [],
        startPort: '',
        endPort: '',
        flightNumber: '',
        flightDate: '',
        flightList: [],
        pageTotal: 0,
//    模态框状态
        addFlight: false,
        addFlightParameter: {},
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
        addStartPort: '',
        addEndPort: '',
      }
    },
    created (){
      this.getPortList();
      this.getFlightList (1);
    },
    watch: {
      addFlight (){
        if(this.addFlight === false) {
          this.addFlightParameter = {};
          this.addStartPort = '';
          this.addEndPort = '';
        }
      },
    },
    methods:{
      // getGoodTypeList (){
      //   this.axios.post("/app/v1/common/queryDict",{
      //     "dataType": 2
      //   }).then(data => {
      //     console.log(data);
      //     let arr = [];
      //     if(data.data.data.detailDTOS.length){
      //       for(let i=0;i<data.data.data.detailDTOS.length;i++){
      //         let obj={};
      //         obj.value = data.data.data.detailDTOS[i].id;
      //         obj.label = data.data.data.detailDTOS[i].dataName;
      //         arr.push(obj);
      //       }
      //     }
      //     this.goodsTypeList = arr;
      //   });
      // },
      getPortList (){
        this.axios.get("/airport/list").then(data => {
          this.portList = data.data;
        });
      },
      getFlightList (page){
        // console.log(this.flightDate);
        this.flightList =[];
        let resourcesType = this.resourcesType || -1;
        this.axios.post("/web/v1/fligt/getFlightRecordList",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.endPort,
          "cityStart": this.startPort,
          "flight": this.flightNumber,
          "flightDate": this.flightDate,
          "pageIndex": page,
          "resourceType": resourcesType,
          "size": 10,
        }).then(data => {
          // console.log(data);
          if(data.data.code === 1){
            this.flightList = data.data.hnaFlightRecords;
            this.pageTotal = data.data.total;
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      flipList (page){
        this.getFlightList(page)
      },
      queryFlight (){
        this.getFlightList(1);
      },
      getAddFlight (){
        if(!this.addEndPort
          ||!this.addStartPort
          ||!this.addFlightParameter.flightNumber
          ||!this.addFlightParameter.resourcesType
          ||!this.addFlightParameter.space
          ||!this.addFlightParameter.effectiveDate
          ||!(this.addFlightParameter.domesticAbroad===0||this.addFlightParameter.domesticAbroad===1)
        ){
          this.$notify.error({
            title: '错误',
            message: '填写有误，所有的项都是必须选择或填写的，请检查！'
          });
          return
        }
        this.axios.post("/web/v1/fligt/saveFlightRecord",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.addEndPort,
          "cityStart": this.addStartPort,
          "flight": this.addFlightParameter.flightNumber,
          "resourceType": this.addFlightParameter.resourcesType,
          "countryType": this.domesticAbroad,
          "totalSeats": this.addFlightParameter.space,
          "flightDate": this.addFlightParameter.effectiveDate,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.addFlight = false;
            this.getFlightList(1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      deleteFlight (flightId){
        this.$confirm('此操作将删除该帐号，无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/web/v1/fligt/delFlightRecord",{
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
              this.getFlightList(1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        })
      },
    },
    computed: {
      ...mapGetters(["id", "token"]),
    }
  }
</script>
<style lang="scss">
  .Plane_manage{
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
          .start-port{
            .label{
              padding-left: 14px;
            }
            .value{
              width: 160px;
            }
          }
          .end-port{
            .value{
              width: 160px;
            }
          }
          .goods-type{
            .value{
              width: 160px;
            }
          }
          .airline-company{
            .value{
              width: 160px;
            }
          }
          .flight-number{
            .value{
              width: 160px;
            }
          }
          .flight-date{
            .value{
              .el-input{
                width: 160px;
              }
            }
          }
          .btn{
            float: right;
            margin-right: 42px;
          }
        }
      }
      .content{
        border-top: 1px solid #ECECEC;
        .tool{
          height: 40px;
          .menu{
            margin: 0;
            padding: 0;
            height: 40px;
            float: right;
            margin-right: 49px;
            li{
              float: left;
              height: 20px;
              line-height: 20px;
              width: 100px;
              margin-top: 10px;
              margin-right: 20px;
              button{
                width: 100%;
                height: 100%;
                border: 0;
                color: #fff;
                border-radius: 3px;
                background-color: #fccf00;
                cursor: pointer;
                outline: none;
                -moz-box-shadow:0 3px 3px #CFCFCF;         /*firefox*/
                -webkit-box-shadow:0 3px 3px #CFCFCF;      /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
              }
            }
            .add{
              width: 20px;
              img{
                width: 20px;
                height: 20px;
                cursor: pointer;
              }
            }
          }
        }
        .flight-list{
          padding: 0;
          margin: 0;
          padding-left: 30px;
          min-height: 600px;
          li{
            height: 70px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBEBEB;
            p{
              float: left;
              height: 70px;
              line-height: 70px;
              margin: 0;
              text-align: center;
              img{
                cursor: pointer;
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
            p:nth-child(1){width: 12%}
            p:nth-child(2){width: 12%}
            p:nth-child(3){width: 12%}
            p:nth-child(4){width: 12%}
            p:nth-child(5){width: 16%}
            p:nth-child(6){width: 12%}
            p:nth-child(7){width: 12%}
            p:nth-child(8){width: 12%}
          }
          .handle{
            text-align: center;
            border: 0;
            margin-top: 30px;
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
        .add-flight{
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
                padding: 40px 60px;
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
                  .date{
                    .value{
                      .el-input{
                        width: 180px;
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
      }
    }
  }
</style>
