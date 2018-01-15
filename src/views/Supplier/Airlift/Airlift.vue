<template>
<div class="airlift">
  <div class="head">空运产品管理</div>
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
            <p>费用状态</p>
            <p>供应商</p>
            <p>线路</p>
            <p>M</p>
            <p>N</p>
            <p>≥45</p>
            <p>≥100</p>
            <p>≥300</p>
            <p>≥500</p>
            <p>≥1000</p>
            <p>燃油附加</p>
            <p>其他</p>
            <p>操作</p>
          </div>
        </li>
        <li>
          <div class="title">
            <p>自营</p>
            <p>普货</p>
            <p>HU8399</p>
            <img :class="{hide:isShow}" src="../../../assets/air_delete.png">
          </div>
          <div class="detail">
            <p class="state">
              <span><img src="../../../assets/air_state_1.png"></span>
              <span>启用</span>
            </p>
            <p>海航货运</p>
            <p class="line">
              <span class="box">
                <i></i>
                <span>北京北京北京北京北京北京北京</span>
                <span>上海</span>
              </span>
            </p>
            <p>100</p>
            <p>6.2</p>
            <p>5.9</p>
            <p>4.7</p>
            <p>4.5</p>
            <p>4.2</p>
            <p>4</p>
            <p>0.2</p>
            <p></p>
            <p>
              <img :class="{hide:isShow}" class="modify" src="../../../assets/son_modify.png">
              <img :class="{hide:isShow}" src="../../../assets/air_state_4.png">
            </p>
          </div>
        </li>
        <li>
          <div class="title">
            <p>自营</p>
            <p>普货</p>
            <p>HU8399</p>
            <img :class="{hide:isShow}" src="../../../assets/air_delete.png">
            <span class="sign"></span>
          </div>
          <div class="detail">
            <p class="state">
              <span><img src="../../../assets/air_state_2.png"></span>
              <span style="color: #F52831">禁用</span>
            </p>
            <p>海航货运</p>
            <p class="line">
              <span class="box">
                <i></i>
                <span>北京北京北京北京北京北京北京</span>
                <span>上海</span>
              </span>
            </p>
            <p>100</p>
            <p>6.2</p>
            <p>5.9</p>
            <p>4.7</p>
            <p>4.5</p>
            <p>4.2</p>
            <p>4</p>
            <p>0.2</p>
            <p></p>
            <p>
              <img :class="{hide:isShow}" class="modify" src="../../../assets/son_modify.png">
              <img :class="{hide:isShow}" src="../../../assets/son_state_1.png">
            </p>
          </div>
        </li>
        <li>
          <div class="title">
            <p>自营</p>
            <p>普货</p>
            <p>HU8399</p>
            <img :class="{hide:isShow}" src="../../../assets/air_delete.png">
          </div>
          <div class="detail">
            <p class="state">
              <span><img src="../../../assets/air_state_3.png"></span>
              <span style="color: #fccf00">审核中</span>
            </p>
            <p>海航货运</p>
            <p class="line">
              <span class="box">
                <i></i>
                <span>北京北京北京北京北京北京北京</span>
                <span>上海</span>
              </span>
            </p>
            <p>100</p>
            <p>6.2</p>
            <p>5.9</p>
            <p>4.7</p>
            <p>4.5</p>
            <p>4.2</p>
            <p>4</p>
            <p>0.2</p>
            <p></p>
            <p>
              <img :class="{hide:isShow}" class="modify" src="../../../assets/son_modify.png">
              <img :class="{hide:isShow}" src="">
            </p>
          </div>
        </li>
      </ul>
      <!--新增/修改空运产品模态框-->
      <div class="add-product">
        <el-dialog width="1000px" title="新增/修改空运产品" :visible.sync="addProduct">
          <div class="content">
            <div class="up">
              <div class="left">
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
              </div>
              <div class="center">
                <div class="box">
                  <div class="label">始发港:</div>
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
            </div>
            <div class="down">
              <ul>
                <li>
                  <p class="label">M</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">N</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥45</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥100</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥300</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥500</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥1000</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">燃油附加</p>
                  <input @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">其他</p>
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
      startPort: '',
      endPort: '',
      airlineCompany: '',
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
          .resources-type{
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
          .goods-type{
            .value{
              width: 120px;
            }
          }
          .flight-number{
            .value{
              width: 160px;
            }
          }
          .product-status{
            .value{
              width: 120px;
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
              padding-left: 40px;
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
                margin-right: 60px;
              }
              img{
                float: right;
                margin-top: 10px;
                margin-right: 30px;
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
              p:nth-child(1){width: 8%}
              p:nth-child(2){width: 11%}
              p:nth-child(3){width: 20%}
              p:nth-child(4){width: 5%}
              p:nth-child(5){width: 5%}
              p:nth-child(6){width: 5%}
              p:nth-child(7){width: 5%}
              p:nth-child(8){width: 5%}
              p:nth-child(9){width: 5%}
              p:nth-child(10){width: 5%}
              p:nth-child(11){width: 8%}
              p:nth-child(12){width: 8%}
              p:nth-child(13){width: 10%}
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
                          width: 180px;
                        }
                      }
                    }
                  }
                  .left{
                    float: left;
                    width: 30%;
                    margin-right: 5%;
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
                .down{
                  ul{
                    overflow: hidden;
                    padding-left: 80px;
                    box-sizing: border-box;
                    li{
                      float: left;
                      width: 80px;
                      text-align: center;
                      p{
                        color: #A7A7A7;
                      }
                      input{
                        text-align: center;
                        width: 60px;
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
