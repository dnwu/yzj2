<template>
<div class="airlift">
  <div class="head">航班计划维护</div>
  <div class="body">
    <div class="query">
      <div class="row">
        <div class="box business-type">
          <div class="label">业务类型</div>
          <div class="value">
            <el-select size="mini" v-model="businessType" placeholder="请选择">
              <el-option
                v-for="item in businessTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box supplier">
          <div class="label">供应商</div>
          <div class="value">
            <el-select size="mini" v-model="supplier" placeholder="请选择">
              <el-option
                v-for="item in supplierList"
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
            <StartPortselect @startportvalue='startPortValue'></StartPortselect>
          </div>
        </div>
        <div class="box end-port">
          <div class="label">目的港</div>
          <div class="value">
            <EndPortselect @endportvalue='endPortValue'></EndPortselect>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="box airline-company">
          <div class="label">航空公司</div>
          <div class="value">
            <el-input
              placeholder="请输入公司名"
              :clearable = true
              size="mini"
              v-model="airlineCompany">
            </el-input>
          </div>
        </div>
        <div class="box flight-number">
          <div class="label">航班号</div>
          <div class="value">
            <el-input
              placeholder="请输入航班号"
              :clearable = true
              size="mini"
              v-model="airlineCompany">
            </el-input>
          </div>
        </div>
        <div class="btn">
          <el-button @click="queryFlight" size="mini" type="danger">查询</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <ul class="tool">
        <li @click="flightGenerate = true">航班生成</li>
        <li>导出</li>
        <li>导入</li>
        <li @click="addFlightPlan = true" class="add"><img class="addIcon" src="../../../assets/son_add.png"></li>
      </ul>
      <ul class="flight-list">
        <li class="list-head">
          <p>供应商</p>
          <p>资源类型</p>
          <p>航班号</p>
          <p>国际/国内</p>
          <p>线路</p>
          <p>计划始发</p>
          <p>计划到达</p>
          <p>仓位量</p>
          <p>班期</p>
          <p>操作</p>
        </li>
        <li>
          <p>海航货运</p>
          <p>自营</p>
          <p>HU1234</p>
          <p>国内</p>
          <p class="line">
            <span class="box">
              <i></i>
              <span>北京北京北京北京北京北京北京</span>
              <span>上海</span>
            </span>
          </p>
          <p>12:00</p>
          <p>16:00</p>
          <p>1000</p>
          <p>129</p>
          <p>
            <img class="modify" src="../../../assets/son_modify.png">
            <img src="../../../assets/son_delete.png">
          </p>
        </li>
      </ul>
      <!--新增航班计划模态框-->
      <div class="add-flight-plan">
        <el-dialog width="1000px" title="新增航班计划" :visible.sync="addFlightPlan">
          <div class="content">
            <div class="left">
              <div class="box">
                <div class="label">资源类型:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
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
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="box">
                <div class="label">供应商:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
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
                  <span class="active">1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
              </div>
            </div>
            <div class="center">
              <div class="box">
                <div class="label">始发港:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="box">
                <div class="label">计划始发:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
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
                    :clearable = true
                    size="mini"
                    v-model="airlineCompany">
                  </el-input>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="box">
                <div class="label">目的港:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="box">
                <div class="label">计划到达:</div>
                <div class="value">
                  <el-select size="small" v-model="businessType">
                    <el-option
                      v-for="item in businessTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="box">
                <div class="label">舱位量:</div>
                <div class="value">
                  <el-input
                    :clearable = true
                    size="mini"
                    v-model="airlineCompany">
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
                <el-select size="small" v-model="businessType">
                  <el-option
                    v-for="item in businessTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
  import StartPortselect from "@/components/StartPortselect";
  import EndPortselect from "@/components/EndPortselect";
export default {
  components: {
    StartPortselect,
    EndPortselect,
  },
  data () {
    return {
//    搜索的初始值
      businessType: '',
      businessTypeList: [
        {
          value: "1",
          label: "选项1"
        },
        {
          value: "2",
          label: "选项2"
        },
      ],
      supplier: '',
      supplierList: [
        {
          value: "1",
          label: "选项1"
        },
        {
          value: "2",
          label: "选项1"
        },
      ],
      startPort: '',
      endPort: '',
      airlineCompany: '',
//    模态框状态
      addFlightPlan: false,
//    航班生成
      flightGenerate: false,
    }
  },
  methods:{
    startPortValue (value){
      this.startPort = value
    },
    endPortValue (value){
      this.endPort = value
    },
    queryFlight (){
        alert("待开发")
    },
    getAddFlight (){
        alert("待开发")
    },
    getFlightGenerate (){
      alert("待开发")
    }
  }
}
</script>
<style lang="scss">
  .airlift{
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
              width: 120px;
            }
          }
          .supplier{
            .value{
              width: 120px;
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
            margin-right: 45px;
          }
        }
      }
      .content{
        border-top: 1px solid #ECECEC;
        .tool{
          margin: 0;
          padding: 0;
          height: 40px;
          margin-left: 840px;
          li{
            box-sizing: border-box;
            float: left;
            height: 20px;
            line-height: 20px;
            width: 100px;
            background-color: #fccf00;
            margin: 0px 10px;
            text-align: center;
            color: #fff;
            margin-top: 10px;
            border-radius: 3px;
            cursor: pointer;
          }
          .add{
            width: 20px;
            img{
              width: 20px;
              height: 20px;
            }
          }
        }
        .flight-list{
          padding: 0;
          margin: 0;
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
              .modify{
                margin-right: 20px;
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
            p:nth-child(2){width: 8%}
            p:nth-child(3){width: 8%}
            p:nth-child(4){width: 8%}
            p:nth-child(5){width: 20%}
            p:nth-child(6){width: 8%}
            p:nth-child(7){width: 8%}
            p:nth-child(8){width: 8%}
            p:nth-child(9){width: 8%}
            p:nth-child(10){width: 12%}
          }
          .list-head{
            height: 40px;
            p{
              height: 40px;
              line-height: 40px;
            }
          }
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
                  div.flight-schedule{
                    border: 0;
                    .value{
                      span{
                        box-sizing: border-box;
                        padding: 2px 5px;
                        border: 1px solid #FCCF00;
                        font-size: 12px;
                        color: #FCCF00;
                      }
                      .active{
                        background-color: #FCCF00;
                        color: #fff;
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
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                    -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                  }
                  .value{
                    display: inline-block;
                    input{
                      border: 0;
                      width: 470px;
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
