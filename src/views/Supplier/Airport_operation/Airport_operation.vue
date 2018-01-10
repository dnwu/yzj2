<template>
  <div class="airport-operation">
    <div class="head">机场操作产品管理</div>
    <div class="body">
      <div class="query">
        <div class="row">
          <div class="box resources-type">
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
          <div class="box airport">
            <div class="label">所在机场</div>
            <div class="value">
              <el-select size="mini" v-model="airPort" placeholder="请选择">
                <el-option
                  v-for="item in airPortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box domestic-abroad">
            <div class="label">国内/国际</div>
            <div class="value">
              <el-select size="mini" v-model="airPort" placeholder="请选择">
                <el-option
                  v-for="item in airPortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box start-end">
            <div class="label">始发/目的</div>
            <div class="value">
              <el-select size="mini" v-model="airPort" placeholder="请选择">
                <el-option
                  v-for="item in airPortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="box goods-type">
            <div class="label">货物类型</div>
            <div class="value">
              <el-select size="mini" v-model="goodsType" placeholder="请选择">
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box cost">
            <div class="label">费用项</div>
            <div class="value">
              <el-select size="mini" v-model="airPort" placeholder="请选择">
                <el-option
                  v-for="item in airPortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box product-status">
            <div class="label">产品状态</div>
            <div class="value">
              <el-select size="mini" v-model="productStatus" placeholder="请选择">
                <el-option
                  v-for="item in productStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box effective-date">
            <div class="label">生效日期</div>
            <div class="value">
              <el-date-picker
                v-model="effectiveDate"
                type="date"
                size="mini"
                :editable=false
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="btn">
            <el-button @click="queryProduct" :disabled="isDisable" size="mini" type="danger">查询</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="tool">
          <ul class="menu1">
            <li><button @click="checkProduct" type="button" class="gray">{{checkMore}}</button></li>
            <li><button :class="{disableStyle:isDisable}" type="button">导出</button></li>
            <li><button :class="{disableStyle:isDisable}">导入</button></li>
            <li class="add"><button @click="addProduct = true" :class="{disableStyle:isDisable}"><img class="addIcon" src="../../../assets/son_add.png"></button></li>
          </ul>
          <ul :class="{show:isShow}" class="menu2">
            <li><button type="button" class="green">启用</button></li>
            <li><button type="button" class="red">禁用</button></li>
            <li><button type="button" class="gray">删除</button></li>
          </ul>
        </div>
        <ul class="product-list">
          <li class="list-head">
            <div class="detail">
              <p>状态</p>
              <p>供应商</p>
              <p>机场</p>
              <p>费用项</p>
              <p>计费方式</p>
              <p>单位（元/公斤）</p>
              <p>最低消费（元/票）</p>
              <p>固定收费</p>
              <p>生效开始时间</p>
              <p>生效结束时间</p>
            </div>
          </li>
          <li>
            <div class="title">
              <p>第三方</p>
              <p>普货</p>
              <p>国内</p>
              <p>始发</p>
              <img :class="{hide:isShow}" src="../../../assets/air_delete.png">
              <img :class="{hide:isShow}" src="../../../assets/airport_operation_2.png">
              <img :class="{hide:isShow}" src="../../../assets/airport_operation_1.png">
            </div>
            <div class="detail">
              <p class="state">
                <span><img src="../../../assets/air_state_1.png"></span>
                <span>启用</span>
              </p>
              <p>华宇物流</p>
              <p>北京</p>
              <p>出港服务费</p>
              <p>总量计费</p>
              <p>0.3</p>
              <p>15</p>
              <p>10</p>
              <p>2017-11-01</p>
              <p>2017-12-31</p>
            </div>
          </li>
        </ul>
        <!--新增/修改空运产品模态框-->
        <div class="add-product">
          <el-dialog width="1100px" title="新增/修改机场产品" :visible.sync="addProduct">
            <div class="content">
              <div class="up">
                <div class="left">
                  <div class="box">
                    <div class="label">供应商:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
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
                    <div class="label">货物类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
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
                <div class="center">
                  <div class="box">
                    <div class="label">所在机场:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
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
                    <div class="label">资源类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
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
                  <div class="box two">
                    <div class="start-end">
                      <div class="label">始发/目的:</div>
                      <div class="value">
                        <el-select size="small" v-model="resourcesType">
                          <el-option
                            v-for="item in resourcesTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="domestic-abroad">
                      <div class="label">国内/国外:</div>
                      <div class="value">
                        <el-select size="small" v-model="resourcesType">
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
                  <div class="box date">
                    <div class="label">生效时间:</div>
                    <div class="value">
                      <el-date-picker
                        v-model="effectiveDate"
                        type="date"
                        size="mini"
                        :editable=false
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <div class="arrow el-icon-arrow-down"></div>
                  </div>
                </div>
              </div>
              <div class="down">
                <div class="costTerm">
                  <div class="box cost">
                    <div class="label">费用项:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
                        <el-option
                          v-for="item in resourcesTypeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="box billing-method">
                    <div class="label">计费方式:</div>
                    <div class="value">
                      <el-select size="small" v-model="resourcesType">
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
                <ul class="detail">
                  <li>
                    <p class="label">单价</p>
                    <input @keyup="formatNumber($event)" type="number">
                  </li>
                  <li>
                    <p class="label">最低消费</p>
                    <input @keyup="formatNumber($event)" type="number">
                  </li>
                  <li>
                    <p class="label">固定费用</p>
                    <input @keyup="formatNumber($event)" type="number">
                  </li>
                </ul>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="addProduct = false">取 消</span>
              <el-button @click="getAddFlight" size="mini" class="sure" type="warning">保 存</el-button>
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
        resourcesType: '',
        resourcesTypeList: [
          {
            value: "1",
            label: "选项1"
          },
          {
            value: "2",
            label: "选项2"
          },
        ],
        airPort: '',
        airPortList: [
          {
            value: "1",
            label: "选项1"
          },
          {
            value: "2",
            label: "选项1"
          },
        ],
        goodsType: '',
        goodsTypeList: [
          {
            value: "1",
            label: "选项1"
          },
          {
            value: "2",
            label: "选项1"
          },
        ],
        productStatus: '',
        productStatusList: [
          {
            value: "1",
            label: "选项1"
          },
          {
            value: "2",
            label: "选项1"
          },
        ],
        effectiveDate: '',
        checkMore: '批量选择',
//    模态框状态
        addProduct: false,
      }
    },
    methods:{
      startPortValue (value){
        this.startPort = value
      },
      endPortValue (value){
        this.endPort = value
      },
      queryProduct (){
        alert("待开发")
      },
      checkProduct (){
        this.checkMore = (this.checkMore === '批量选择')?'取消选择':'批量选择';
      },
      formatNumber(e){//保留小数点后一位
        e.target.value = e.target.value&&Math.floor(parseFloat(e.target.value)*10)/10;
      },
      getAddFlight (){
        alert("待开发")
      },
      getFlightGenerate (){
        alert("待开发")
      }
    },
    computed: {
      isDisable: function () {
        return this.checkMore === '取消选择'
      },
      isShow: function (){
        return this.checkMore === '取消选择'
      }
    }
  }
</script>
<style lang="scss">
  .airport-operation{
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
          .resources-type{
            .value{
              width: 120px;
            }
          }
          .airport{
            .value{
              width: 160px;
            }
          }
          .domestic-abroad{
            .value{
              width: 120px;
            }
          }
          .start-end{
            .value{
              width: 120px;
            }
          }
          .goods-type{
            .value{
              width: 120px;
            }
          }
          .cost{
            .value{
              width: 120px;
            }
          }
          .product-status{
            .value{
              width: 120px;
            }
          }
          .effective-date{
            .value{
              width: 160px;
              .el-input{
                width: 160px;
              }
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
          .menu1{
            float: right;
            margin: 0;
            padding: 0;
            height: 40px;
            margin-right: 52px;
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
                border-radius: 3px;
                cursor: pointer;
                color: #fff;
                background-color: #fccf00;
                border: 0;
                outline: none;
                -moz-box-shadow:0 3px 3px #CFCFCF;         /*firefox*/
                -webkit-box-shadow:0 3px 3px #CFCFCF;      /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
              }
              .disableStyle{opacity: 0.5};
              .disableStyle:hover{cursor:not-allowed;}
              .gray{
                background-color: #A0A0A0;
              }
            }
            .add{
              width: 20px;
              button{
                width: 20px;
                height: 20px;
                cursor: pointer;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                outline: none;
                -moz-box-shadow:0 3px 3px #CFCFCF;         /*firefox*/
                -webkit-box-shadow:0 3px 3px #CFCFCF;      /*webkit*/
                box-shadow: 0 3px 3px #CFCFCF;
                img{
                  width: 20px;
                  height: 20px;
                }
              }
              .disableStyle{opacity: 0.5};
              .disableStyle:hover{cursor:not-allowed;}
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
              .green{
                background-color: #7AC943;
              }
              .red{
                background-color: #F52831;
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
        .product-list{
          padding: 0;
          margin: 0;
          li{
            height: 100px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBEBEB;
            .title{
              height: 30px;
              padding-left: 33px;
              position: relative;
              .sign{
                position: absolute;
                width: 0;
                height: 0;
                border-top: 15px solid #fccf00;
                border-right: 15px solid #fccf00;
                border-bottom: 15px solid transparent;
                border-left: 15px solid transparent;
                right: 0;
                top: 10px;
              }
              p{
                float: left;
                height: 20px;
                line-height: 20px;
                margin-top: 10px;
                margin-bottom: 0;
                margin-right: 45px;
              }
              img{
                float: right;
                margin-top: 10px;
                margin-right: 10px;
                cursor: pointer;
              }
              .hide{
                display: none;
              }
            }
            .detail{
              height: 70px;
              box-sizing: border-box;
              p{
                box-sizing: border-box;
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
              .state{
                padding-top: 15px;
                span{
                  display: block;
                  height: 20px;
                  line-height: 20px;
                }
              }
              p:nth-child(1){width: 8%}
              p:nth-child(2){width: 12%}
              p:nth-child(3){width: 10%}
              p:nth-child(4){width: 10%}
              p:nth-child(5){width: 9%}
              p:nth-child(6){width: 9%}
              p:nth-child(7){width: 9%}
              p:nth-child(8){width: 9%}
              p:nth-child(9){width: 12%}
              p:nth-child(10){width: 12%}
            }

          }
          .list-head{
            height: 40px;
            border: 0;
            .detail{
              p{
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
        .add-product{
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
                .up{
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
                          width: 160px;
                        }
                      }
                    }
                    .two{
                      border: 0;
                      box-sizing: border-box;
                      .start-end{
                        float: left;
                        height: 40px;
                        width: 47%;
                        margin-right: 6%;
                        border-bottom: 1px solid #E6E6E6;
                        input{
                          width: 110px;
                        }
                      }
                      .domestic-abroad{
                        float: left;
                        height: 40px;
                        width: 47%;
                        border-bottom: 1px solid #E6E6E6;
                        input{
                          width: 110px;
                        }
                      }
                    }
                    .date{
                      position: relative;
                      .arrow{
                        position: absolute;
                        right: 19px;
                        top: 13px;
                        color: #c0c4cc;
                      }
                    }
                  }
                  .left{
                    float: left;
                    width: 26%;
                    margin-right: 2%;
                  }
                  .center{
                    float: left;
                    width: 26%;
                    margin-right: 2%;
                  }
                  .right{
                    float: left;
                    width: 44%;
                  }
                }
                .down{
                  .costTerm{
                    margin-top: 50px;
                    box-sizing: border-box;
                    overflow: hidden;
                    padding-left: 161px;
                    .box{
                      float: left;
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
                      }
                    }
                    .cost{
                      margin-right: 30px;
                      input{
                        width: 300px;
                        border: 0;
                      }
                    }
                    .billing-method{
                      input{
                        width: 160px;
                        border: 0;
                      }
                    }

                  }
                  .detail{
                    overflow: hidden;
                    box-sizing: border-box;
                    padding-left: 250px;
                    margin: 0;
                    li{
                      float: left;
                      width: 160px;
                      text-align: center;
                      p{
                        color: #A7A7A7;
                      }
                      input{
                        text-align: center;
                        width: 100px;
                        height: 40px;
                        border: 0;
                        font-size: 16px;
                        color: #000;
                        outline: none;
                        border-bottom: 1px solid #E7E7E7;
                      }
                      input:focus{
                        border-bottom: 1px solid #fccf00;
                        color: #fccf00;
                      }
                      input::-webkit-outer-spin-button,
                      input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                      }
                      input[type="number"]{
                        -moz-appearance: textfield;
                      }
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
