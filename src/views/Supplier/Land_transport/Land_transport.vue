<template>
  <div class="land_transport">
    <div class="head">陆运产品管理</div>
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
              <el-select size="mini" filterable v-model="airPort" placeholder="请选择">
                <el-option
                  v-for="item in portList"
                  :key="item.id"
                  :label="item.cnName+'（'+item.airportCode+'）'"
                  :value="item.cnName+'（'+item.airportCode+'）'">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="box transport-type">
            <div class="label">运输类型</div>
            <div class="value">
              <el-select size="mini" v-model="transportType" placeholder="请选择">
                <el-option
                  v-for="item in transportTypeList"
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
          <div class="box start-end">
            <div class="label">始发/目的</div>
            <div class="value">
              <el-select size="mini" v-model="startEnd" placeholder="请选择">
                <el-option
                  v-for="item in startEndList"
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
            <li class="add">
              <button :class="{disableStyle:isDisable}">
                <img class="addIcon" src="../../../assets/son_add.png">
                <span class="distributionType">
                  <span @click="generalDistribution = true;">一般配送</span>
                  <span @click="carDistribution = true">专车配送</span>
                </span>
              </button></li>
          </ul>
          <ul :class="{show:isShow}" class="menu2">
            <li><button @click="enableMoreProduct" type="button" class="green">启用</button></li>
            <li><button @click="disableMoreProduct" type="button" class="red">禁用</button></li>
            <li><button @click="deleteMoreProduct" type="button" class="gray">删除</button></li>
          </ul>
        </div>
        <ul class="product-list">
          <li class="list-head">
            <div class="detail">
              <p>状态</p>
              <p>机场</p>
              <p>始发/目的</p>
              <p>生效开始时间</p>
              <p>生效结束时间</p>
              <p>运输类型</p>
              <p>操作</p>
            </div>
          </li>
          <li v-if="productList.length!==0" v-for="(item,index) in productList" @click="clickItem(index)" :class="{hand:isShow}">
            <div class="title">
              <p>{{item.resourceType===1?'自营':'第三方'}}</p>
              <p>{{item.hnaDataName}}</p>
              <img @click="deleteProduct(item.id)" :class="{hide:isShow}" title="删除" src="../../../assets/air_delete.png">
              <img @click="switchProduct(item.id,item.productStatus)" :title="item.productStatus===0?'禁用':'启用'" :class="{hide:isShow||item.productStatus===2}" :src="item.productStatus===0?productStatusSrc1:productStatusSrc2">
              <span :class="{active:item.check}" class="sign"></span>
            </div>
            <div class="detail">
              <p class="state">
                <span><img :src="productStatusImg(item.productStatus)"></span>
                <span>{{productStatusName(item.productStatus)}}</span>
              </p>
              <p>{{item.city}}</p>
              <p>{{item.departureArrival===0?'始发站':'目的地'}}</p>
              <p>{{item.effectiveStart.substring(0,10)}}</p>
              <p>{{item.effectiveEnd.substring(0,10)}}</p>
              <p>{{item.productType===1?'专车产品':'一般产品'}}</p>
              <p class="blue"><a @click="seeRangeAndPrice(item.id,item.productType)" href="javascript:void(0);">查看范围&价格</a></p>
            </div>
          </li>
          <li v-if="productList.length===0" class="handle">暂无数据</li>
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
        <!--一般配送模态框-->
        <div class="general-distribution">
          <el-dialog width="1000px" title="一般配送" :visible.sync="generalDistribution">
            <div class="content">
              <div class="up">
                <div class="left">
                  <div class="box">
                    <div class="label">货物类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="generalParameter.goodsType">
                        <el-option
                          v-for="item in goodsTypeList"
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
                    <div class="label">所在机场</div>
                    <div class="value">
                      <el-select size="mini" filterable v-model="generalParameter.airPort" placeholder="请选择">
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
                <div class="right">
                  <div class="box">
                    <div class="label">始发/目的:</div>
                    <div class="value">
                      <el-select size="small" v-model="generalParameter.startEnd">
                        <el-option
                          v-for="item in startEndList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div class="box">
                    <div class="label">资源类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="generalParameter.resourcesType">
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
                <div class="bottom">
                  <div class="box date">
                    <div class="label">生效时间:</div>
                    <div class="value">
                      <el-date-picker
                        v-model="generalParameter.addDateRange"
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
              </div>
              <div class="down">
                <ul>
                  <li>
                    <div class="box">所在市</div>
                    <div class="box">所在县区</div>
                    <div class="box"></div>
                    <div class="box">单价（元/公斤）</div>
                    <div class="box">最低收费</div>
                    <div class="box"></div>
                  </li>
                  <li v-for="(list,index) in chargeStandardList">
                    <div class="box">
                      <div class="value">
                        <el-select v-model="list.city" @change="selectCity" size="small" filterable>
                          <el-option
                            v-for="item in cityList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="box">
                      <div class="value">
                        <el-select v-model="list.county" size="small">
                          <el-option
                            v-for="item in countyList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="box"></div>
                    <div class="box"><input v-model="list.unitPrice" class="num" @keyup="formatNumber($event)" type="number"></div>
                    <div class="box"><input v-model="list.minimumPrice" class="num" @keyup="formatNumber($event)" type="number"></div>
                    <div class="box">
                      <img @click="chargeStandardList.splice(index,1)" src="../../../assets/minus_sign_delete.png">
                      <img :class="{hide:index !== (chargeStandardList.length-1)}" @click="addOneLine" src="../../../assets/son_add.png">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="generalDistribution = false">取 消</span>
              <el-button @click="getAddProduct" size="mini" class="sure" type="warning">保 存</el-button>
            </div>
          </el-dialog>
        </div>
        <!--专车配送模态框-->
        <div class="car-distribution">
          <el-dialog width="1100px" title="专车配送" :visible.sync="carDistribution">
            <div class="content">
              <div class="up">
                <div class="left">
                  <div class="box">
                    <div class="label">货物类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="carParameter.goodsType">
                        <el-option
                          v-for="item in goodsTypeList"
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
                    <div class="label">所在机场</div>
                    <div class="value">
                      <el-select size="mini" filterable v-model="carParameter.airPort" placeholder="请选择">
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
                <div class="right">
                  <div class="box">
                    <div class="label">始发/目的:</div>
                    <div class="value">
                      <el-select size="small" v-model="carParameter.startEnd">
                        <el-option
                          v-for="item in startEndList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="left">
                  <div class="box">
                    <div class="label">资源类型:</div>
                    <div class="value">
                      <el-select size="small" v-model="carParameter.resourcesType">
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
                <div class="bottom">
                  <div class="box date">
                    <div class="label">生效时间:</div>
                    <div class="value">
                      <el-date-picker
                        v-model="carParameter.addDateRange"
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
              </div>
              <div class="down">
                <ul>
                  <li>
                    <div class="box">所在市</div>
                    <div class="box">所在县区</div>
                    <div class="box"></div>
                    <div v-for="item in carTypeList" class="box">{{item.dataName}}</div>
                    <div class="box"></div>
                  </li>
                  <li v-for="(list,index) in chargeStandardList2">
                    <div class="box">
                      <div class="value">
                        <el-select v-model="list.city" @change="selectCity" size="small" filterable>
                          <el-option
                            v-for="item in cityList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="box">
                      <div class="value">
                        <el-select v-model="list.county" size="small">
                          <el-option
                            v-for="item in countyList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="box"></div>
                    <div v-for="(item,i) in carTypeList" class="box"><input v-model="list.priceList[i]" class="num" @keyup="formatNumber($event)" type="number"></div>
                    <div class="box">
                      <img @click="chargeStandardList2.splice(index,1)" src="../../../assets/minus_sign_delete.png">
                      <img :class="{hide:index !== (chargeStandardList2.length-1)}" @click="addOneLine2" src="../../../assets/son_add.png">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <span class="cancel" @click="carDistribution = false">取 消</span>
              <el-button @click="getAddProduct2" size="mini" class="sure" type="warning">保 存</el-button>
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
        airPort: '',
        portList: [],
        transportType: '',
        transportTypeList: [
          {
            value: 1,
            label: "专车产品"
          },
          {
            value: 2,
            label: "一般产品"
          },
        ],
        goodsType: '',
        goodsTypeList: [],
        startEnd: '',
        startEndList: [
          {
            value: 0,
            label: "始发站"
          },
          {
            value: 1,
            label: "目的站"
          },
        ],
        productStatus: '',
        productStatusList: [
          {
            value: 0,
            label: "启用"
          },
          {
            value: 1,
            label: "禁用"
          },
        ],
        effectiveDate: '',
        checkMore: '批量选择',
        productList: [],
        statusSrc1: require('../../../assets/air_state_1.png'),
        statusSrc2: require('../../../assets/air_state_2.png'),
        productStatusSrc1: require('../../../assets/air_state_4.png'),
        productStatusSrc2: require('../../../assets/son_state_1.png'),
        pageTotal: 0,
//    模态框状态
        //一般配送
        generalDistribution: false,
        generalParameter: {},
        chargeStandardList: [
          {
            city: '',
            county: '',
            unitPrice: '',
            minimumPrice: '',
          }
        ],
        //专车配送
        carDistribution: false,
        carParameter: {},
        chargeStandardList2: [
          {
            city: '',
            county: '',
            priceList: [],
          }
        ],
        carTypeList: [],
        countyList: [],
        cityList: [],

      }
    },
    created() {
      this.getPortList();
      this.getGoodTypeList();
      this.getCarTypeList();
      this.getProductList();
      this.createCity();
    },
    watch: {
      generalDistribution (){
        if(this.generalDistribution === false){
          this.generalParameter = {};
          this.chargeStandardList = [
            {
              city: '',
              county: '',
              unitPrice: '',
              minimumPrice: '',
            }
          ];
        }
      },
      carDistribution (){
        if(this.carDistribution === false){
          this.carParameter = {};
          this.chargeStandardList2 = [
            {
              city: '',
              county: '',
              priceList: [],
            }
          ]
        }
      }
    },
    methods:{
      getPortList (){
        this.axios.get("/airport/list").then(data => {
          this.portList = data.data;
        });
      },
      getGoodTypeList (){
        this.axios.post("/app/v1/common/queryDict",{
          "dataType": 2
        }).then(data => {
          let arr = [];
          if(data.data.data.detailDTOS.length){
            for(let i=0;i<data.data.data.detailDTOS.length;i++){
              let obj={};
              obj.value = data.data.data.detailDTOS[i].id;
              obj.label = data.data.data.detailDTOS[i].dataName;
              arr.push(obj);
            }
          }
          this.goodsTypeList = arr;
        });
      },
      getCarTypeList (){
        this.axios.post("/app/v1/common/queryDict",{
          "dataType": 7
        }).then(data => {
          this.carTypeList = data.data.data.detailDTOS;
        });
      },
      getProductList (page){
        this.productList =[];
        let resourcesType = this.resourcesType || -1;
        let goodsType = this.goodsType || -1;
        let transportType = this.transportType || -1;
        let productStatus ;
        if(this.productStatus === 0){
          productStatus = 0;
        }else {
          productStatus = this.productStatus || -1;
        }
        let startEnd ;
        if(this.startEnd === 0){
            startEnd = 0;
        }else{
            startEnd = this.startEnd || -1;
        }
        this.axios.post("/web/v1/product/landCarriage/getList",{
          "id": this.id,
          "token": this.token,
          "city": this.airPort,
          "departureArrival": startEnd,
          "effectiveDate": this.effectiveDate,
          "goodsType": goodsType,
          "productStatus": productStatus,
          "productType": transportType,
          "resourceType": resourcesType,
          "pageIndex": page,
          "size": 10,
        }).then(data => {
          if(data.data.code === 1){
            if(data.data.hnaLandCarriages.length){
              this.productList = data.data.hnaLandCarriages;
              this.pageTotal = data.data.total;
            }
          }
        });
      },
      getAddProduct (){
        let str = '';
        for(let i=0;i<this.chargeStandardList.length;i++){
          if(!this.chargeStandardList[i].city
            ||!this.chargeStandardList[i].county
            ||!this.chargeStandardList[i].unitPrice
            ||!this.chargeStandardList[i].minimumPrice
          ){
            this.$notify.error({
              title: '错误',
              message: '填写有误，所有的项都是必须选择或填写的，请检查！'
            });
            return
          }
          str += this.chargeStandardList[i].city + ':'
            + this.chargeStandardList[i].county + '-'
            + this.chargeStandardList[i].unitPrice + '-'
            + this.chargeStandardList[i].minimumPrice + ';'
        }
        this.getAddData(this.generalParameter,str,2);
      },
      getAddProduct2 (){
        let pass = false;
        let str = '';
        for(let i=0;i<this.chargeStandardList2.length;i++){
          if(!this.chargeStandardList2[i].city || !this.chargeStandardList2[i].county){
            this.$notify.error({
              title: '错误',
              message: '填写有误，所有的项都是必须选择或填写的，请检查！'
            });
            return
          }
          str += 'range-' + this.chargeStandardList2[i].city + ':'
            + this.chargeStandardList2[i].county + ',';
          if(this.chargeStandardList2[i].priceList.length){
            for(let j=0;j<this.chargeStandardList2[i].priceList.length;j++){
              if(this.chargeStandardList2[i].priceList[j]){
                pass = true;
              }
              str += this.carTypeList[j].id + '-'
                + this.chargeStandardList2[i].priceList[j] + ',';
            }
            str = str.slice(0,-1) + ';'
          }
        }
        if(!pass){
          this.$notify.error({
            title: '错误',
            message: '填写有误，所有的项都是必须选择或填写的，请检查！'
          });
          return
        }
        this.getAddData(this.carParameter,str,1);
      },
      getAddData (obj,str,type){
        if(!obj.goodsType
          ||!obj.airPort
          ||!obj.resourcesType
          ||!obj.addDateRange
          ||!(obj.startEnd===0||obj.startEnd===1)
        ){
          this.$notify.error({
            title: '错误',
            message: '填写有误，所有的项都是必须选择或填写的，请检查！'
          });
          return
        }
        this.axios.post("/web/v1/product/landCarriage/save",{
          "id": this.id,
          "token": this.token,
          "city": obj.airPort,
          "departureArrival": obj.startEnd,
          "effectiveStart": obj.addDateRange[0],
          "effectiveEnd": obj.addDateRange[1],
          "goodsType": obj.goodsType,
          "priceValues": str,
          "productType": type
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.generalDistribution =false;
            this.getProductList (1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      switchProduct (productId,status){
        let url = '';
        if(status===1){
          url = '/web/v1/product/landCarriage/setEnable';
        }else{
          url = '/web/v1/product/landCarriage/setDisable';
        }
        this.axios.post(url, {
          "id": this.id,
          "token": this.token,
          "ids": productId,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getProductList(1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      deleteProduct (id){
        this.$confirm('此操作将删除所选空运产品，无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/web/v1/product/landCarriage/del",{
            "id": this.id,
            "token": this.token,
            "ids": id
          }).then(data => {
            if(data.data.code === 1){
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              });
              this.getProductList(1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        });
      },
      deleteMoreProduct (){
        let ids = this.getCheckId();
        if(ids){
          this.deleteProduct(ids);
        }else{
          this.$notify.error({
            title: '警告',
            message: '您还没有勾选要删除的空运产品，请点击勾选！',
            type: 'warning'
          });
        }
      },
      enableMoreProduct (){
        let ids = this.getCheckId();
        if(ids){
          this.switchProduct(ids,1);
        }else{
          this.$notify.error({
            title: '警告',
            message: '您还没有勾选要启用的空运产品，请点击勾选！',
            type: 'warning'
          });
        }
      },
      disableMoreProduct (){
        let ids = this.getCheckId();
        if(ids){
          this.switchProduct(ids,2);
        }else{
          this.$notify.error({
            title: '警告',
            message: '您还没有勾选要禁用的空运产品，请点击勾选！',
            type: 'warning'
          });
        }
      },
      seeRangeAndPrice (id,type){
        /*if(type === 2){
          this.generalDistribution = true;
        }else{
          this.carDistribution = true;
        }*/
        this.axios.post("/web/v1/product/landCarriage/getDetail",{
          "id": this.id,
          "token": this.token,
          "recordId": id
        }).then(data => {
          console.log(data);
        });
      },
      getCheckId (){
        let ids = '';
        for(let i=0;i<this.productList.length;i++){
          if(this.productList[i].check){
            ids += this.productList[i].id+',';
          }
        }
        return ids
      },
      addOneLine (){
        let obj = {
          city: '',
          county: '',
          unitPrice: '',
          minimumPrice: '',
        };
        this.chargeStandardList.push(obj);
      },
      addOneLine2 (){
        let obj = {
          city: '',
          county: '',
          priceList: [],
        };
        this.chargeStandardList2.push(obj);
      },
      checkProduct (){
        this.checkMore = (this.checkMore === '批量选择')?'取消选择':'批量选择';
        if(this.checkMore === '批量选择'){
          this.removeCheck();
        }
      },
      removeCheck (){
        let productList = this.productList;
        for(let i=0;i<productList.length;i++){
          this.$set(this.productList[i],'check',false);
        }
      },
      flipList (page){
        this.getProductList(page)
      },
      queryProduct (){
        this.getProductList(1);
      },
      clickItem (index){
        if(this.checkMore === '批量选择'){
          return
        }
        this.$set(this.productList[index],'check',!this.productList[index].check)
      },
      productStatusName (type){
        let name = '';
        switch (type){
          case 0: name = "启用"; break;
          case 1: name = "禁用"; break;
          case 2: name = "审核中"; break;
        }
        return name
      },
      productStatusImg (type){
        let imgSrc = '';
        switch (type){
          case 0: imgSrc = require('../../../assets/air_state_1.png'); break;
          case 1: imgSrc = require('../../../assets/air_state_2.png'); break;
          case 2: imgSrc = require('../../../assets/air_state_3.png'); break;
        }
        return imgSrc
      },
      formatNumber(e){//保留小数点后一位
        e.target.value = e.target.value&&Math.floor(parseFloat(e.target.value)*10)/10;
      },
      createCity (){
        //区域城市
        var areaCitys = new Array();
        var j =0;
        areaCitys[j]=new Array("110100","北京市","Shixiaqu","2");
        j = j +1;
        areaCitys[j]=new Array("110200","天津市","Shixiaqu","2");
        j = j +1;
        areaCitys[j]=new Array("120100","重庆市","Shixiaqu","2");
        j = j +1;
        areaCitys[j]=new Array("130100","石家庄市","Shijiazhuang Shi","SJW");
        j = j +1;
        areaCitys[j]=new Array("130200","唐山市","Tangshan Shi","TGS");
        j = j +1;
        areaCitys[j]=new Array("130300","秦皇岛市","Qinhuangdao Shi","SHP");
        j = j +1;
        areaCitys[j]=new Array("130400","邯郸市","Handan Shi","HDS");
        j = j +1;
        areaCitys[j]=new Array("130500","邢台市","Xingtai Shi","XTS");
        j = j +1;
        areaCitys[j]=new Array("130600","保定市","Baoding Shi","BDS");
        j = j +1;
        areaCitys[j]=new Array("130700","张家口市","Zhangjiakou Shi ","ZJK");
        j = j +1;
        areaCitys[j]=new Array("130800","承德市","Chengde Shi","CDS");
        j = j +1;
        areaCitys[j]=new Array("130900","沧州市","Cangzhou Shi","CGZ");
        j = j +1;
        areaCitys[j]=new Array("131000","廊坊市","Langfang Shi","LFS");
        j = j +1;
        areaCitys[j]=new Array("131100","衡水市","Hengshui Shi ","HGS");
        j = j +1;
        areaCitys[j]=new Array("140100","太原市","Taiyuan Shi","TYN");
        j = j +1;
        areaCitys[j]=new Array("140200","大同市","Datong Shi ","DTG");
        j = j +1;
        areaCitys[j]=new Array("140300","阳泉市","Yangquan Shi","YQS");
        j = j +1;
        areaCitys[j]=new Array("140400","长治市","Changzhi Shi","CZS");
        j = j +1;
        areaCitys[j]=new Array("140500","晋城市","Jincheng Shi ","JCG");
        j = j +1;
        areaCitys[j]=new Array("140600","朔州市","Shuozhou Shi ","SZJ");
        j = j +1;
        areaCitys[j]=new Array("140700","晋中市","Jinzhong Shi","2");
        j = j +1;
        areaCitys[j]=new Array("140800","运城市","Yuncheng Shi","2");
        j = j +1;
        areaCitys[j]=new Array("140900","忻州市","Xinzhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("141000","临汾市","Linfen Shi","2");
        j = j +1;
        areaCitys[j]=new Array("141100","吕梁市","Lvliang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("150100","呼和浩特市","Hohhot Shi","Hhht");
        j = j +1;
        areaCitys[j]=new Array("150200","包头市","Baotou Shi ","BTS");
        j = j +1;
        areaCitys[j]=new Array("150300","乌海市","Wuhai Shi","WHM");
        j = j +1;
        areaCitys[j]=new Array("150400","赤峰市","Chifeng (Ulanhad)Shi","CFS");
        j = j +1;
        areaCitys[j]=new Array("150500","通辽市","Tongliao Shi","2");
        j = j +1;
        areaCitys[j]=new Array("150600","鄂尔多斯市","Eerduosi Shi","2");
        j = j +1;
        areaCitys[j]=new Array("150700","呼伦贝尔市","Hulunbeier Shi ","2");
        j = j +1;
        areaCitys[j]=new Array("150800","巴彦淖尔市","Bayannaoer Shi","2");
        j = j +1;
        areaCitys[j]=new Array("150900","乌兰察布市","Wulanchabu Shi","2");
        j = j +1;
        areaCitys[j]=new Array("152200","兴安盟","Hinggan Meng","HIN");
        j = j +1;
        areaCitys[j]=new Array("152500","锡林郭勒盟","Xilin Gol Meng","XGO");
        j = j +1;
        areaCitys[j]=new Array("152900","阿拉善盟","Alxa Meng","ALM");
        j = j +1;
        areaCitys[j]=new Array("210100","沈阳市","Shenyang Shi","SHE");
        j = j +1;
        areaCitys[j]=new Array("210200","大连市","Dalian Shi","DLC");
        j = j +1;
        areaCitys[j]=new Array("210300","鞍山市","AnShan Shi","ASN");
        j = j +1;
        areaCitys[j]=new Array("210400","抚顺市","Fushun Shi","FSN");
        j = j +1;
        areaCitys[j]=new Array("210500","本溪市","Benxi Shi","BXS");
        j = j +1;
        areaCitys[j]=new Array("210600","丹东市","Dandong Shi","DDG");
        j = j +1;
        areaCitys[j]=new Array("210700","锦州市","Jinzhou Shi","JNZ");
        j = j +1;
        areaCitys[j]=new Array("210800","营口市","Yingkou Shi","YIK");
        j = j +1;
        areaCitys[j]=new Array("210900","阜新市","Fuxin Shi","FXS");
        j = j +1;
        areaCitys[j]=new Array("211000","辽阳市","Liaoyang Shi","LYL");
        j = j +1;
        areaCitys[j]=new Array("211100","盘锦市","Panjin Shi","PJS");
        j = j +1;
        areaCitys[j]=new Array("211200","铁岭市","Tieling Shi","TLS");
        j = j +1;
        areaCitys[j]=new Array("211300","朝阳市","Chaoyang Shi","CYS");
        j = j +1;
        areaCitys[j]=new Array("211400","葫芦岛市","Huludao Shi","HLD");
        j = j +1;
        areaCitys[j]=new Array("220100","长春市","Changchun Shi ","CGQ");
        j = j +1;
        areaCitys[j]=new Array("220200","吉林市","Jilin Shi ","JLS");
        j = j +1;
        areaCitys[j]=new Array("220300","四平市","Siping Shi","SPS");
        j = j +1;
        areaCitys[j]=new Array("220400","辽源市","Liaoyuan Shi","LYH");
        j = j +1;
        areaCitys[j]=new Array("220500","通化市","Tonghua Shi","THS");
        j = j +1;
        areaCitys[j]=new Array("220600","白山市","Baishan Shi","BSN");
        j = j +1;
        areaCitys[j]=new Array("220700","松原市","Songyuan Shi","SYU");
        j = j +1;
        areaCitys[j]=new Array("220800","白城市","Baicheng Shi","BCS");
        j = j +1;
        areaCitys[j]=new Array("222400","延边朝鲜族自治州","Yanbian Chosenzu Zizhizhou","YBZ");
        j = j +1;
        areaCitys[j]=new Array("230100","哈尔滨市","Harbin Shi","HRB");
        j = j +1;
        areaCitys[j]=new Array("230200","齐齐哈尔市","Qiqihar Shi","NDG");
        j = j +1;
        areaCitys[j]=new Array("230300","鸡西市","Jixi Shi","JXI");
        j = j +1;
        areaCitys[j]=new Array("230400","鹤岗市","Hegang Shi","HEG");
        j = j +1;
        areaCitys[j]=new Array("230500","双鸭山市","Shuangyashan Shi","SYS");
        j = j +1;
        areaCitys[j]=new Array("230600","大庆市","Daqing Shi","DQG");
        j = j +1;
        areaCitys[j]=new Array("230700","伊春市","Yichun Shi","YCH");
        j = j +1;
        areaCitys[j]=new Array("230800","佳木斯市","Jiamusi Shi","JMU");
        j = j +1;
        areaCitys[j]=new Array("230900","七台河市","Qitaihe Shi","QTH");
        j = j +1;
        areaCitys[j]=new Array("231000","牡丹江市","Mudanjiang Shi","MDG");
        j = j +1;
        areaCitys[j]=new Array("231100","黑河市","Heihe Shi","HEK");
        j = j +1;
        areaCitys[j]=new Array("231200","绥化市","Suihua Shi","2");
        j = j +1;
        areaCitys[j]=new Array("232700","大兴安岭地区","Da Hinggan Ling Diqu","DHL");
        j = j +1;
        areaCitys[j]=new Array("310100","上海市","Shixiaqu","2");
        j = j +1;

        areaCitys[j]=new Array("320100","南京市","Nanjing Shi","NKG");
        j = j +1;
        areaCitys[j]=new Array("320200","无锡市","Wuxi Shi","WUX");
        j = j +1;
        areaCitys[j]=new Array("320300","徐州市","Xuzhou Shi","XUZ");
        j = j +1;
        areaCitys[j]=new Array("320400","常州市","Changzhou Shi","CZX");
        j = j +1;
        areaCitys[j]=new Array("320500","苏州市","Suzhou Shi","SZH");
        j = j +1;
        areaCitys[j]=new Array("320600","南通市","Nantong Shi","NTG");
        j = j +1;
        areaCitys[j]=new Array("320700","连云港市","Lianyungang Shi","LYG");
        j = j +1;
        areaCitys[j]=new Array("320800","淮安市","Huaian Xian","2");
        j = j +1;
        areaCitys[j]=new Array("320900","盐城市","Yancheng Shi","YCK");
        j = j +1;
        areaCitys[j]=new Array("321000","扬州市","Yangzhou Shi","YZH");
        j = j +1;
        areaCitys[j]=new Array("321100","镇江市","Zhenjiang Shi","ZHE");
        j = j +1;
        areaCitys[j]=new Array("321200","泰州市","Taizhou Shi","TZS");
        j = j +1;
        areaCitys[j]=new Array("321300","宿迁市","Suqian Shi","SUQ");
        j = j +1;
        areaCitys[j]=new Array("330100","杭州市","Hangzhou Shi","HGH");
        j = j +1;
        areaCitys[j]=new Array("330200","宁波市","Ningbo Shi","NGB");
        j = j +1;
        areaCitys[j]=new Array("330300","温州市","Wenzhou Shi","WNZ");
        j = j +1;
        areaCitys[j]=new Array("330400","嘉兴市","Jiaxing Shi","JIX");
        j = j +1;
        areaCitys[j]=new Array("330500","湖州市","Huzhou Shi ","HZH");
        j = j +1;
        areaCitys[j]=new Array("330600","绍兴市","Shaoxing Shi","SXG");
        j = j +1;
        areaCitys[j]=new Array("330700","金华市","Jinhua Shi","JHA");
        j = j +1;
        areaCitys[j]=new Array("330800","衢州市","Quzhou Shi","QUZ");
        j = j +1;
        areaCitys[j]=new Array("330900","舟山市","Zhoushan Shi","ZOS");
        j = j +1;
        areaCitys[j]=new Array("331000","台州市","Taizhou Shi","TZZ");
        j = j +1;
        areaCitys[j]=new Array("331100","丽水市","Lishui Shi","2");
        j = j +1;
        areaCitys[j]=new Array("340100","合肥市","Hefei Shi","HFE");
        j = j +1;
        areaCitys[j]=new Array("340200","芜湖市","Wuhu Shi","WHI");
        j = j +1;
        areaCitys[j]=new Array("340300","蚌埠市","Bengbu Shi","BBU");
        j = j +1;
        areaCitys[j]=new Array("340400","淮南市","Huainan Shi","HNS");
        j = j +1;
        areaCitys[j]=new Array("340500","马鞍山市","Ma anshan Shi","MAA");
        j = j +1;
        areaCitys[j]=new Array("340600","淮北市","Huaibei Shi","HBE");
        j = j +1;
        areaCitys[j]=new Array("340700","铜陵市","Tongling Shi","TOL");
        j = j +1;
        areaCitys[j]=new Array("340800","安庆市","Anqing Shi","AQG");
        j = j +1;
        areaCitys[j]=new Array("341000","黄山市","Huangshan Shi","HSN");
        j = j +1;
        areaCitys[j]=new Array("341100","滁州市","Chuzhou Shi","CUZ");
        j = j +1;
        areaCitys[j]=new Array("341200","阜阳市","Fuyang Shi","FYS");
        j = j +1;
        areaCitys[j]=new Array("341300","宿州市","Suzhou Shi","SUZ");
        j = j +1;
        areaCitys[j]=new Array("341400","巢湖市","Chaohu Shi","2");
        j = j +1;
        areaCitys[j]=new Array("341500","六安市","Liu an Shi","2");
        j = j +1;
        areaCitys[j]=new Array("341600","亳州市","Bozhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("341700","池州市","Chizhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("341800","宣城市","Xuancheng Shi","2");
        j = j +1;
        areaCitys[j]=new Array("350100","福州市","Fuzhou Shi","FOC");
        j = j +1;
        areaCitys[j]=new Array("350200","厦门市","Xiamen Shi","XMN");
        j = j +1;
        areaCitys[j]=new Array("350300","莆田市","Putian Shi","PUT");
        j = j +1;
        areaCitys[j]=new Array("350400","三明市","Sanming Shi","SMS");
        j = j +1;
        areaCitys[j]=new Array("350500","泉州市","Quanzhou Shi","QZJ");
        j = j +1;
        areaCitys[j]=new Array("350600","漳州市","Zhangzhou Shi","ZZU");
        j = j +1;
        areaCitys[j]=new Array("350700","南平市","Nanping Shi","NPS");
        j = j +1;
        areaCitys[j]=new Array("350800","龙岩市","Longyan Shi","LYF");
        j = j +1;
        areaCitys[j]=new Array("350900","宁德市","Ningde Shi","2");
        j = j +1;
        areaCitys[j]=new Array("360100","南昌市","Nanchang Shi","KHN");
        j = j +1;
        areaCitys[j]=new Array("360200","景德镇市","Jingdezhen Shi","JDZ");
        j = j +1;
        areaCitys[j]=new Array("360300","萍乡市","Pingxiang Shi","PXS");
        j = j +1;
        areaCitys[j]=new Array("360400","九江市","Jiujiang Shi","JIU");
        j = j +1;
        areaCitys[j]=new Array("360500","新余市","Xinyu Shi","XYU");
        j = j +1;
        areaCitys[j]=new Array("360600","鹰潭市","Yingtan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("360700","赣州市","Ganzhou Shi","GZH");
        j = j +1;
        areaCitys[j]=new Array("360800","吉安市","Jian Shi","2");
        j = j +1;
        areaCitys[j]=new Array("360900","宜春市","Yichun Shi","2");
        j = j +1;
        areaCitys[j]=new Array("361000","抚州市","Wuzhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("361100","上饶市","Shangrao Shi","2");
        j = j +1;
        areaCitys[j]=new Array("370100","济南市","Jinan Shi","TNA");
        j = j +1;
        areaCitys[j]=new Array("370200","青岛市","Qingdao Shi","TAO");
        j = j +1;
        areaCitys[j]=new Array("370300","淄博市","Zibo Shi","ZBO");
        j = j +1;
        areaCitys[j]=new Array("370400","枣庄市","Zaozhuang Shi","ZZG");
        j = j +1;
        areaCitys[j]=new Array("370500","东营市","Dongying Shi","DYG");
        j = j +1;
        areaCitys[j]=new Array("370600","烟台市","Yantai Shi","YNT");
        j = j +1;
        areaCitys[j]=new Array("370700","潍坊市","Weifang Shi","WEF");
        j = j +1;
        areaCitys[j]=new Array("370800","济宁市","Jining Shi","JNG");
        j = j +1;
        areaCitys[j]=new Array("370900","泰安市","Tai an Shi","TAI");
        j = j +1;
        areaCitys[j]=new Array("371000","威海市","Weihai Shi","WEH");
        j = j +1;
        areaCitys[j]=new Array("371100","日照市","Rizhao Shi","RZH");
        j = j +1;
        areaCitys[j]=new Array("371200","莱芜市","Laiwu Shi","LWS");
        j = j +1;
        areaCitys[j]=new Array("371300","临沂市","Linyi Shi","LYI");
        j = j +1;
        areaCitys[j]=new Array("371400","德州市","Dezhou Shi","DZS");
        j = j +1;
        areaCitys[j]=new Array("371500","聊城市","Liaocheng Shi","LCH");
        j = j +1;
        areaCitys[j]=new Array("371600","滨州市","Binzhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("371700","菏泽市","Heze Shi","HZ");
        j = j +1;
        areaCitys[j]=new Array("410100","郑州市","Zhengzhou Shi","CGO");
        j = j +1;
        areaCitys[j]=new Array("410200","开封市","Kaifeng Shi","KFS");
        j = j +1;
        areaCitys[j]=new Array("410300","洛阳市","Luoyang Shi","LYA");
        j = j +1;
        areaCitys[j]=new Array("410400","平顶山市","Pingdingshan Shi","PDS");
        j = j +1;
        areaCitys[j]=new Array("410500","安阳市","Anyang Shi","AYS");
        j = j +1;
        areaCitys[j]=new Array("410600","鹤壁市","Hebi Shi","HBS");
        j = j +1;
        areaCitys[j]=new Array("410700","新乡市","Xinxiang Shi","XXS");
        j = j +1;
        areaCitys[j]=new Array("410800","焦作市","Jiaozuo Shi","JZY");
        j = j +1;
        areaCitys[j]=new Array("410900","濮阳市","Puyang Shi","PYS");
        j = j +1;
        areaCitys[j]=new Array("411000","许昌市","Xuchang Shi","XCS");
        j = j +1;
        areaCitys[j]=new Array("411100","漯河市","Luohe Shi","LHS");
        j = j +1;
        areaCitys[j]=new Array("411200","三门峡市","Sanmenxia Shi","SMX");
        j = j +1;
        areaCitys[j]=new Array("411300","南阳市","Nanyang Shi","NYS");
        j = j +1;
        areaCitys[j]=new Array("411400","商丘市","Shangqiu Shi","SQS");
        j = j +1;
        areaCitys[j]=new Array("411500","信阳市","Xinyang Shi","XYG");
        j = j +1;
        areaCitys[j]=new Array("411600","周口市","Zhoukou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("411700","驻马店市","Zhumadian Shi","2");
        j = j +1;
        areaCitys[j]=new Array("420100","武汉市","Wuhan Shi","WUH");
        j = j +1;
        areaCitys[j]=new Array("420200","黄石市","Huangshi Shi","HIS");
        j = j +1;
        areaCitys[j]=new Array("420300","十堰市","Shiyan Shi","SYE");
        j = j +1;
        areaCitys[j]=new Array("420500","宜昌市","Yichang Shi","YCO");
        j = j +1;
        areaCitys[j]=new Array("420600","襄阳市","Xiangfan Shi","XFN");
        j = j +1;
        areaCitys[j]=new Array("420700","鄂州市","Ezhou Shi","EZS");
        j = j +1;
        areaCitys[j]=new Array("420800","荆门市","Jingmen Shi","JMS");
        j = j +1;
        areaCitys[j]=new Array("420900","孝感市","Xiaogan Shi","XGE");
        j = j +1;
        areaCitys[j]=new Array("421000","荆州市","Jingzhou Shi","JGZ");
        j = j +1;
        areaCitys[j]=new Array("421100","黄冈市","Huanggang Shi","HE");
        j = j +1;
        areaCitys[j]=new Array("421200","咸宁市","Xianning Xian","XNS");
        j = j +1;
        areaCitys[j]=new Array("421300","随州市","Suizhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("422800","恩施土家族苗族自治州","Enshi Tujiazu Miaozu Zizhizhou","ESH");
        j = j +1;
        areaCitys[j]=new Array("430100","长沙市","Changsha Shi","CSX");
        j = j +1;
        areaCitys[j]=new Array("430200","株洲市","Zhuzhou Shi","ZZS");
        j = j +1;
        areaCitys[j]=new Array("430300","湘潭市","Xiangtan Shi","XGT");
        j = j +1;
        areaCitys[j]=new Array("430400","衡阳市","Hengyang Shi","HNY");
        j = j +1;
        areaCitys[j]=new Array("430500","邵阳市","Shaoyang Shi","SYR");
        j = j +1;
        areaCitys[j]=new Array("430600","岳阳市","Yueyang Shi","YYG");
        j = j +1;
        areaCitys[j]=new Array("430700","常德市","Changde Shi","CDE");
        j = j +1;
        areaCitys[j]=new Array("430800","张家界市","Zhangjiajie Shi","ZJJ");
        j = j +1;
        areaCitys[j]=new Array("430900","益阳市","Yiyang Shi","YYS");
        j = j +1;
        areaCitys[j]=new Array("431000","郴州市","Chenzhou Shi","CNZ");
        j = j +1;
        areaCitys[j]=new Array("431100","永州市","Yongzhou Shi","YZS");
        j = j +1;
        areaCitys[j]=new Array("431200","怀化市","Huaihua Shi","HHS");
        j = j +1;
        areaCitys[j]=new Array("431300","娄底市","Loudi Shi","2");
        j = j +1;
        areaCitys[j]=new Array("433100","湘西土家族苗族自治州","Xiangxi Tujiazu Miaozu Zizhizhou ","XXZ");
        j = j +1;
        areaCitys[j]=new Array("440100","广州市","Guangzhou Shi","CAN");
        j = j +1;
        areaCitys[j]=new Array("440200","韶关市","Shaoguan Shi","HSC");
        j = j +1;
        areaCitys[j]=new Array("440300","深圳市","Shenzhen Shi","SZX");
        j = j +1;
        areaCitys[j]=new Array("440400","珠海市","Zhuhai Shi","ZUH");
        j = j +1;
        areaCitys[j]=new Array("440500","汕头市","Shantou Shi","SWA");
        j = j +1;
        areaCitys[j]=new Array("440600","佛山市","Foshan Shi","FOS");
        j = j +1;
        areaCitys[j]=new Array("440700","江门市","Jiangmen Shi","JMN");
        j = j +1;
        areaCitys[j]=new Array("440800","湛江市","Zhanjiang Shi","ZHA");
        j = j +1;
        areaCitys[j]=new Array("440900","茂名市","Maoming Shi","MMI");
        j = j +1;
        areaCitys[j]=new Array("441200","肇庆市","Zhaoqing Shi","ZQG");
        j = j +1;
        areaCitys[j]=new Array("441300","惠州市","Huizhou Shi","HUI");
        j = j +1;
        areaCitys[j]=new Array("441400","梅州市","Meizhou Shi","MXZ");
        j = j +1;
        areaCitys[j]=new Array("441500","汕尾市","Shanwei Shi","SWE");
        j = j +1;
        areaCitys[j]=new Array("441600","河源市","Heyuan Shi","HEY");
        j = j +1;
        areaCitys[j]=new Array("441700","阳江市","Yangjiang Shi","YJI");
        j = j +1;
        areaCitys[j]=new Array("441800","清远市","Qingyuan Shi","QYN");
        j = j +1;
        areaCitys[j]=new Array("441900","东莞市","Dongguan Shi","DGG");
        j = j +1;
        areaCitys[j]=new Array("442000","中山市","Zhongshan Shi","ZSN");
        j = j +1;
        areaCitys[j]=new Array("445100","潮州市","Chaozhou Shi","CZY");
        j = j +1;
        areaCitys[j]=new Array("445200","揭阳市","Jieyang Shi","JIY");
        j = j +1;
        areaCitys[j]=new Array("445300","云浮市","Yunfu Shi","YFS");
        j = j +1;
        areaCitys[j]=new Array("450100","南宁市","Nanning Shi","NNG");
        j = j +1;
        areaCitys[j]=new Array("450200","柳州市","Liuzhou Shi","LZH");
        j = j +1;
        areaCitys[j]=new Array("450300","桂林市","Guilin Shi","KWL");
        j = j +1;
        areaCitys[j]=new Array("450400","梧州市","Wuzhou Shi","WUZ");
        j = j +1;
        areaCitys[j]=new Array("450500","北海市","Beihai Shi","BHY");
        j = j +1;
        areaCitys[j]=new Array("450600","防城港市","Fangchenggang Shi","FAN");
        j = j +1;
        areaCitys[j]=new Array("450700","钦州市","Qinzhou Shi","QZH");
        j = j +1;
        areaCitys[j]=new Array("450800","贵港市","Guigang Shi","GUG");
        j = j +1;
        areaCitys[j]=new Array("450900","玉林市","Yulin Shi","YUL");
        j = j +1;
        areaCitys[j]=new Array("451000","百色市","Baise Shi","2");
        j = j +1;
        areaCitys[j]=new Array("451100","贺州市","Hezhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("451200","河池市","Hechi Shi","2");
        j = j +1;
        areaCitys[j]=new Array("451300","来宾市","Laibin Shi","2");
        j = j +1;
        areaCitys[j]=new Array("451400","崇左市","Chongzuo Shi","2");
        j = j +1;
        areaCitys[j]=new Array("460100","海口市","Haikou Shi","HAK");
        j = j +1;
        areaCitys[j]=new Array("460200","三亚市","Sanya Shi","SYX");
        j = j +1;
        areaCitys[j]=new Array("469000","省直辖县级行政区划","shengzhixiaxianjixingzhengquhua","2");
        j = j +1;
        areaCitys[j]=new Array("500100","市辖区","Shixiaqu","2");
        j = j +1;
        areaCitys[j]=new Array("510100","成都市","Chengdu Shi","CTU");
        j = j +1;
        areaCitys[j]=new Array("510300","自贡市","Zigong Shi","ZGS");
        j = j +1;
        areaCitys[j]=new Array("510400","攀枝花市","Panzhihua Shi","PZH");
        j = j +1;
        areaCitys[j]=new Array("510500","泸州市","Luzhou Shi","LUZ");
        j = j +1;
        areaCitys[j]=new Array("510600","德阳市","Deyang Shi","DEY");
        j = j +1;
        areaCitys[j]=new Array("510700","绵阳市","Mianyang Shi","MYG");
        j = j +1;
        areaCitys[j]=new Array("510800","广元市","Guangyuan Shi","GYC");
        j = j +1;
        areaCitys[j]=new Array("510900","遂宁市","Suining Shi","SNS");
        j = j +1;
        areaCitys[j]=new Array("511000","内江市","Neijiang Shi","NJS");
        j = j +1;
        areaCitys[j]=new Array("511100","乐山市","Leshan Shi","LES");
        j = j +1;
        areaCitys[j]=new Array("511300","南充市","Nanchong Shi","NCO");
        j = j +1;
        areaCitys[j]=new Array("511400","眉山市","Meishan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("511500","宜宾市","Yibin Shi","YBS");
        j = j +1;
        areaCitys[j]=new Array("511600","广安市","Guang an Shi","GAC");
        j = j +1;
        areaCitys[j]=new Array("511700","达州市","Dazhou Shi","2");
        j = j +1;
        areaCitys[j]=new Array("511800","雅安市","Ya an Shi","2");
        j = j +1;
        areaCitys[j]=new Array("511900","巴中市","Bazhong Shi","2");
        j = j +1;
        areaCitys[j]=new Array("512000","资阳市","Ziyang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("513200","阿坝藏族羌族自治州","Aba(Ngawa) Zangzu Qiangzu Zizhizhou","ABA");
        j = j +1;
        areaCitys[j]=new Array("513300","甘孜藏族自治州","Garze Zangzu Zizhizhou","GAZ");
        j = j +1;
        areaCitys[j]=new Array("513400","凉山彝族自治州","Liangshan Yizu Zizhizhou","LSY");
        j = j +1;
        areaCitys[j]=new Array("520100","贵阳市","Guiyang Shi","KWE");
        j = j +1;
        areaCitys[j]=new Array("520200","六盘水市","Liupanshui Shi","LPS");
        j = j +1;
        areaCitys[j]=new Array("520300","遵义市","Zunyi Shi","ZNY");
        j = j +1;
        areaCitys[j]=new Array("520400","安顺市","Anshun Xian","2");
        j = j +1;
        areaCitys[j]=new Array("522200","铜仁地区","Tongren Diqu","TRD");
        j = j +1;
        areaCitys[j]=new Array("522300","黔西南布依族苗族自治州","Qianxinan Buyeizu Zizhizhou","QXZ");
        j = j +1;
        areaCitys[j]=new Array("522400","毕节地区","Bijie Diqu","BJD");
        j = j +1;
        areaCitys[j]=new Array("522600","黔东南苗族侗族自治州","Qiandongnan Miaozu Dongzu Zizhizhou","QND");
        j = j +1;
        areaCitys[j]=new Array("522700","黔南布依族苗族自治州","Qiannan Buyeizu Miaozu Zizhizhou","QNZ");
        j = j +1;
        areaCitys[j]=new Array("530100","昆明市","Kunming Shi","KMG");
        j = j +1;
        areaCitys[j]=new Array("530300","曲靖市","Qujing Shi","QJS");
        j = j +1;
        areaCitys[j]=new Array("530400","玉溪市","Yuxi Shi","YXS");
        j = j +1;
        areaCitys[j]=new Array("530500","保山市","Baoshan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("530600","昭通市","Zhaotong Shi","2");
        j = j +1;
        areaCitys[j]=new Array("530700","丽江市","Lijiang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("530800","普洱市","Simao Shi","2");
        j = j +1;
        areaCitys[j]=new Array("530900","临沧市","Lincang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("532300","楚雄彝族自治州","Chuxiong Yizu Zizhizhou","CXD");
        j = j +1;
        areaCitys[j]=new Array("532500","红河哈尼族彝族自治州","Honghe Hanizu Yizu Zizhizhou","HHZ");
        j = j +1;
        areaCitys[j]=new Array("532600","文山壮族苗族自治州","Wenshan Zhuangzu Miaozu Zizhizhou","WSZ");
        j = j +1;
        areaCitys[j]=new Array("532800","西双版纳傣族自治州","Xishuangbanna Daizu Zizhizhou","XSB");
        j = j +1;
        areaCitys[j]=new Array("532900","大理白族自治州","Dali Baizu Zizhizhou","DLZ");
        j = j +1;
        areaCitys[j]=new Array("533100","德宏傣族景颇族自治州","Dehong Daizu Jingpozu Zizhizhou","DHG");
        j = j +1;
        areaCitys[j]=new Array("533300","怒江傈僳族自治州","Nujiang Lisuzu Zizhizhou","NUJ");
        j = j +1;
        areaCitys[j]=new Array("533400","迪庆藏族自治州","Deqen Zangzu Zizhizhou","DEZ");
        j = j +1;
        areaCitys[j]=new Array("540100","拉萨市","Lhasa Shi","LXA");
        j = j +1;
        areaCitys[j]=new Array("542100","昌都地区","Qamdo Diqu","QAD");
        j = j +1;
        areaCitys[j]=new Array("542200","山南地区","Shannan Diqu","SND");
        j = j +1;
        areaCitys[j]=new Array("542300","日喀则地区","Xigaze Diqu","XID");
        j = j +1;
        areaCitys[j]=new Array("542400","那曲地区","Nagqu Diqu","NAD");
        j = j +1;
        areaCitys[j]=new Array("542500","阿里地区","Ngari Diqu","NGD");
        j = j +1;
        areaCitys[j]=new Array("542600","林芝地区","Nyingchi Diqu","NYD");
        j = j +1;
        areaCitys[j]=new Array("610100","西安市","Xi an Shi","SIA");
        j = j +1;
        areaCitys[j]=new Array("610200","铜川市","Tongchuan Shi","TCN");
        j = j +1;
        areaCitys[j]=new Array("610300","宝鸡市","Baoji Shi","BJI");
        j = j +1;
        areaCitys[j]=new Array("610400","咸阳市","Xianyang Shi","XYS");
        j = j +1;
        areaCitys[j]=new Array("610500","渭南市","Weinan Shi","WNA");
        j = j +1;
        areaCitys[j]=new Array("610600","延安市","Yan an Shi","YNA");
        j = j +1;
        areaCitys[j]=new Array("610700","汉中市","Hanzhong Shi","HZJ");
        j = j +1;
        areaCitys[j]=new Array("610800","榆林市","Yulin Shi","2");
        j = j +1;
        areaCitys[j]=new Array("610900","安康市","Ankang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("611000","商洛市","Shangluo Shi","2");
        j = j +1;
        areaCitys[j]=new Array("620100","兰州市","Lanzhou Shi","LHW");
        j = j +1;
        areaCitys[j]=new Array("620200","嘉峪关市","Jiayuguan Shi","JYG");
        j = j +1;
        areaCitys[j]=new Array("620300","金昌市","Jinchang Shi","JCS");
        j = j +1;
        areaCitys[j]=new Array("620400","白银市","Baiyin Shi","BYS");
        j = j +1;
        areaCitys[j]=new Array("620500","天水市","Tianshui Shi","TSU");
        j = j +1;
        areaCitys[j]=new Array("620600","武威市","Wuwei Shi","2");
        j = j +1;
        areaCitys[j]=new Array("620700","张掖市","Zhangye Shi","2");
        j = j +1;
        areaCitys[j]=new Array("620800","平凉市","Pingliang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("620900","酒泉市","Jiuquan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("621000","庆阳市","Qingyang Shi","2");
        j = j +1;
        areaCitys[j]=new Array("621100","定西市","Dingxi Shi","2");
        j = j +1;
        areaCitys[j]=new Array("621200","陇南市","Longnan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("622900","临夏回族自治州","Linxia Huizu Zizhizhou ","LXH");
        j = j +1;
        areaCitys[j]=new Array("623000","甘南藏族自治州","Gannan Zangzu Zizhizhou","GNZ");
        j = j +1;
        areaCitys[j]=new Array("630100","西宁市","Xining Shi","XNN");
        j = j +1;
        areaCitys[j]=new Array("632100","海东地区","Haidong Diqu","HDD");
        j = j +1;
        areaCitys[j]=new Array("632200","海北藏族自治州","Haibei Zangzu Zizhizhou","HBZ");
        j = j +1;
        areaCitys[j]=new Array("632300","黄南藏族自治州","Huangnan Zangzu Zizhizhou","HNZ");
        j = j +1;
        areaCitys[j]=new Array("632500","海南藏族自治州","Hainan Zangzu Zizhizhou","HNN");
        j = j +1;
        areaCitys[j]=new Array("632600","果洛藏族自治州","Golog Zangzu Zizhizhou","GOL");
        j = j +1;
        areaCitys[j]=new Array("632700","玉树藏族自治州","Yushu Zangzu Zizhizhou","YSZ");
        j = j +1;
        areaCitys[j]=new Array("632800","海西蒙古族藏族自治州","Haixi Mongolzu Zangzu Zizhizhou","HXZ");
        j = j +1;
        areaCitys[j]=new Array("640100","银川市","Yinchuan Shi","INC");
        j = j +1;
        areaCitys[j]=new Array("640200","石嘴山市","Shizuishan Shi","SZS");
        j = j +1;
        areaCitys[j]=new Array("640300","吴忠市","Wuzhong Shi","WZS");
        j = j +1;
        areaCitys[j]=new Array("640400","固原市","Guyuan Shi","2");
        j = j +1;
        areaCitys[j]=new Array("640500","中卫市","Zhongwei Shi","2");
        j = j +1;
        areaCitys[j]=new Array("650100","乌鲁木齐市","Urumqi Shi","URC");
        j = j +1;
        areaCitys[j]=new Array("650200","克拉玛依市","Karamay Shi","KAR");
        j = j +1;
        areaCitys[j]=new Array("652100","吐鲁番地区","Turpan Diqu","TUD");
        j = j +1;
        areaCitys[j]=new Array("652200","哈密地区","Hami(kumul) Diqu","HMD");
        j = j +1;
        areaCitys[j]=new Array("652300","昌吉回族自治州","Changji Huizu Zizhizhou","CJZ");
        j = j +1;
        areaCitys[j]=new Array("652700","博尔塔拉蒙古自治州","Bortala Monglo Zizhizhou","BOR");
        j = j +1;
        areaCitys[j]=new Array("652800","巴音郭楞蒙古自治州","bayinguolengmengguzizhizhou","2");
        j = j +1;
        areaCitys[j]=new Array("652900","阿克苏地区","Aksu Diqu","AKD");
        j = j +1;
        areaCitys[j]=new Array("653000","克孜勒苏柯尔克孜自治州","Kizilsu Kirgiz Zizhizhou","KIZ");
        j = j +1;
        areaCitys[j]=new Array("653100","喀什地区","Kashi(Kaxgar) Diqu","KSI");
        j = j +1;
        areaCitys[j]=new Array("653200","和田地区","Hotan Diqu","HOD");
        j = j +1;
        areaCitys[j]=new Array("654000","伊犁哈萨克自治州","Ili Kazak Zizhizhou","ILD");
        j = j +1;
        areaCitys[j]=new Array("654200","塔城地区","Tacheng(Qoqek) Diqu","TCD");
        j = j +1;
        areaCitys[j]=new Array("654300","阿勒泰地区","Altay Diqu","ALD");
        j = j +1;
        areaCitys[j]=new Array("659000","自治区直辖县级行政区划","zizhiquzhixiaxianjixingzhengquhua","2");
        j = j +1;
        let cityList = [];
        for(let i=0;i<areaCitys.length;i++){
            let obj={};
            obj.label = areaCitys[i][1];
            obj.value = areaCitys[i][1];
            cityList.push(obj);
        }
        this.cityList = cityList;
      },
      selectCity (option){
        let _this = this;
        _this.countyList = [];
        _this.county = '';
        _this.axios.get('/front/sysRegion/list/area', {
          params: {
            regionLevel: 3,
            city: option
          }
        }).then(function (data) {
          if(data.data.code === 1){
            let res = data.data.data;
            if(res.length){
              let countyList = [];
              for(let i=0;i<res.length;i++){
                let obj = {};
                obj.label = res[i].regionName;
                obj.value = res[i].regionName;
                countyList.push(obj);
              }
              _this.countyList = countyList;
            }

          }
        })
      }
    },
    computed: {
      ...mapGetters(["id", "token"]),
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
  .land_transport{
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
          .transport-type{
            .value{
              width: 120px;
            }
          }
          .goods-type{
            .value{
              width: 120px;
            }
          }
          .start-end{
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
                position: relative;
                .distributionType{
                  display: none;
                  position: absolute;
                  width: 70px;
                  height: 50px;
                  bottom: -52px;
                  left: -25px;
                  background-color: #fff;
                  -moz-box-shadow:1px 1px 1px #CFCFCF;         /*firefox*/
                  -webkit-box-shadow:1px 1px 1px #CFCFCF;      /*webkit*/
                  box-shadow: 1px 1px 1px #CFCFCF;
                  border-radius: 3px;
                  padding: 5px;
                  box-sizing: border-box;
                  span{
                    display: block;
                    line-height: 20px;
                    color: #fccf00;
                    font-size: 12px;
                  }
                }
              }
              button:hover .distributionType{
                display: block;
              }
              .disableStyle{opacity: 0.5};
              .disableStyle:hover{cursor:not-allowed;}
              .disableStyle:hover .distributionType{display: none}
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
          min-height: 600px;
          padding-left: 30px;
          li{
            height: 100px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBEBEB;
            .title{
              height: 30px;
              padding-left: 43px;
              padding-right: 75px;
              position: relative;
              .sign{
                position: absolute;
                display: none;
                width: 0;
                height: 0;
                border-top: 15px solid #fccf00;
                border-right: 15px solid #fccf00;
                border-bottom: 15px solid transparent;
                border-left: 15px solid transparent;
                right: 0;
                top: 10px;
              }
              .active{
                display: block;
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
                margin-right: 15px;
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
                a{
                  color:#39B0FF;
                  text-decoration: none;
                }
                a:hover{
                  cursor: pointer;
                  text-decoration: underline;
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
              p:nth-child(1){width: 10%}
              p:nth-child(2){width: 14%}
              p:nth-child(3){width: 14%}
              p:nth-child(4){width: 15%}
              p:nth-child(5){width: 15%}
              p:nth-child(6){width: 14%}
              p:nth-child(7){width: 14%}
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
            border: 0;
            .detail{
              p{
                height: 40px;
                line-height: 40px;
              }
            }
          }
        }
        .pagination{
          text-align: center;
          margin-bottom: 30px;
        }
        .general-distribution{
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
                min-height: 370px;
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
                        .el-date-editor{
                          width: 300px;
                          border: 0;
                        }
                        .el-input{
                          width: 180px;
                          input{
                            border: 0;
                            width: 180px;
                          }
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
                  .bottom{
                    float: left;
                    width: 400px;
                  }
                }
                .down{
                  ul{
                    margin-top: 30px;
                    padding: 0;
                    width: 700px;
                    margin-left: 90px;
                    box-sizing: border-box;
                    li{
                      overflow: hidden;
                      .box{
                        box-sizing: border-box;
                        color: #A7A7A7;
                        float: left;
                        height: 40px;
                        line-height: 40px;
                        margin: 0;
                        text-align: center;
                        .value{
                          display: inline-block;
                          height: 38px;
                          line-height: 38px;
                          width: 160px;
                          border-bottom: 1px solid #E6E6E6;
                            input{
                              border: 0;
                              text-align: center;
                            }
                        }
                        .num{
                          border: 0;
                          width: 80px;
                          height: 36px;
                          text-align: center;
                          font-size: 16px;
                          color: #000;
                          outline: none;
                          border-bottom: 1px solid #E7E7E7;
                        }
                        .num:focus{
                          border-bottom: 1px solid #fccf00;
                          color: #fccf00;
                        }
                        .num::-webkit-outer-spin-button,
                        .num::-webkit-inner-spin-button {
                          -webkit-appearance: none;
                        }
                        .num{
                          -moz-appearance: textfield;
                        }
                        img{
                          width: 20px;
                          height: 20px;
                          float: right;
                          margin-top: 10px;
                          margin-right: 7px;
                          cursor: pointer;
                        }
                        .hide{
                          display: none;
                        }
                      }
                      .box:nth-child(1){width: 180px;}
                      .box:nth-child(2){width: 180px;}
                      .box:nth-child(3){width: 40px;}
                      .box:nth-child(4){width: 120px;}
                      .box:nth-child(5){width: 120px;}
                      .box:nth-child(6){width: 60px;}
                    }
                  }
                }
              }
            }
            .el-dialog__footer {
              padding-bottom: 30px;
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
        .car-distribution{
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
                min-height: 370px;
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
                        .el-date-editor{
                          width: 300px;
                          border: 0;
                        }
                        .el-input{
                          width: 180px;
                          input{
                            border: 0;
                            width: 180px;
                          }
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
                  .bottom{
                    float: left;
                    width: 400px;
                  }
                }
                .down{
                  text-align: center;
                  ul{
                    margin-top: 30px;
                    padding: 0;
                    display: inline-block;
                    box-sizing: border-box;
                    li{
                      overflow: hidden;
                      .box{
                        box-sizing: border-box;
                        width: 100px;
                        color: #A7A7A7;
                        float: left;
                        height: 40px;
                        line-height: 40px;
                        margin: 0;
                        text-align: center;
                        .value{
                          display: inline-block;
                          height: 38px;
                          line-height: 38px;
                          width: 160px;
                          border-bottom: 1px solid #E6E6E6;
                          input{
                            border: 0;
                            text-align: center;
                          }
                        }
                        .num{
                          border: 0;
                          width: 80px;
                          height: 36px;
                          text-align: center;
                          font-size: 16px;
                          color: #000;
                          outline: none;
                          border-bottom: 1px solid #E7E7E7;
                        }
                        .num:focus{
                          border-bottom: 1px solid #fccf00;
                          color: #fccf00;
                        }
                        .num::-webkit-outer-spin-button,
                        .num::-webkit-inner-spin-button {
                          -webkit-appearance: none;
                        }
                        .num{
                          -moz-appearance: textfield;
                        }
                        img{
                          width: 20px;
                          height: 20px;
                          float: right;
                          margin-top: 10px;
                          margin-right: 7px;
                          cursor: pointer;
                        }
                        .hide{
                          display: none;
                        }
                      }
                      .box:nth-child(1){width: 160px;}
                      .box:nth-child(2){width: 160px;}
                      .box:nth-child(3){width: 20px;}
                      .box:last-child{width: 60px;}
                    }
                  }
                }
              }
            }
            .el-dialog__footer {
              padding-bottom: 30px;
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
