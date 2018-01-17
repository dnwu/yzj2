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
          <div style="padding-left: 14px" class="label">目的港</div>
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
              v-model="flightNumber">
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
        <div class="box effective-date">
          <div class="label">生效日期:</div>
          <div class="value">
            <el-date-picker
              v-model="effectiveDate"
              type="date"
              value-format="yyyy-MM-dd"
              size="mini"
              :editable=false
              :clearable=false
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
          <li class="add"><button title="新增/修改空运产品" @click="addProduct = true" :class="{disableStyle:isDisable}"><img class="addIcon" src="../../../assets/son_add.png"></button></li>
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
            <p>费用状态</p>
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
        <li v-if="productList.length!==0" v-for="(item,index) in productList" @click="clickItem(index)" :class="{hand:isShow}">
          <div class="title">
            <p>{{item.resourceType===1?'自营':'第三方'}}</p>
            <p>{{item.hnaDataName}}</p>
            <p>{{item.flight}}</p>
            <p>生效时间：{{item.effectiveStart.substring(0,10)}}<span></span>{{item.effectiveEnd.substring(0,10)}}</p>
            <img @click="deleteProduct(item.id)" title="删除" :class="{hide:isShow}" src="../../../assets/air_delete.png">
            <span :class="{active:item.check}" class="sign"></span>
          </div>
          <div class="detail">
            <p class="state">
              <span><img :src="productStatusImg(item.productStatus)"></span>
              <span>{{productStatusName(item.productStatus)}}</span>
            </p>
            <p class="line">
              <span class="box">
                <i></i>
                <span>{{item.cityStart}}</span>
                <span>{{item.cityEnd}}</span>
              </span>
            </p>
            <p>{{item.minPrice}}</p>
            <p>{{item.levelN}}</p>
            <p>{{item.level45}}</p>
            <p>{{item.level100}}</p>
            <p>{{item.level300}}</p>
            <p>{{item.level500}}</p>
            <p>{{item.level1000}}</p>
            <p>{{item.fuelCharge}}</p>
            <p>{{item.otherCharge}}</p>
            <p>
              <img @click="modifyProduct(item)" title="修改" :class="{hide:isShow}" class="modify" src="../../../assets/son_modify.png">
              <img @click="switchProduct(item.id,item.productStatus)" :title="item.productStatus===0?'禁用':'启用'" :class="{hide:isShow||item.productStatus === 2}" :src="item.productStatus===0?productStatusSrc1:productStatusSrc2">
            </p>
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
      <!--新增/修改空运产品模态框-->
      <div class="add-product">
        <el-dialog width="1000px" title="新增/修改空运产品" :visible.sync="addProduct">
          <div class="content">
            <div class="up">
              <div class="left">
                <div class="box">
                  <div class="label">资源类型:</div>
                  <div class="value">
                    <el-select size="small" v-model="addProductParameter.resourcesType">
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
              </div>
              <div class="center">
                <div class="box">
                  <div class="label">货物类型:</div>
                  <div class="value">
                    <el-select size="small" v-model="addProductParameter.goodsType">
                      <el-option
                        v-for="item in goodsTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
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
              </div>
              <div class="right">
                <div class="box">
                  <div class="label">航班号:</div>
                  <div class="value">
                    <el-input
                      size="mini"
                      v-model="addProductParameter.flightNumber">
                    </el-input>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="box">
                  <div class="label">生效时间:</div>
                  <div class="value">
                    <el-date-picker
                      v-model="addProductParameter.addDateRange"
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
                  <p class="label">M</p>
                  <input v-model="addProductParameter.levelM" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">N</p>
                  <input v-model="addProductParameter.levelN" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥45</p>
                  <input v-model="addProductParameter.level45" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥100</p>
                  <input v-model="addProductParameter.level100" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥300</p>
                  <input v-model="addProductParameter.level300" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥500</p>
                  <input v-model="addProductParameter.level500" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">≥1000</p>
                  <input v-model="addProductParameter.level1000" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">燃油附加</p>
                  <input v-model="addProductParameter.fuelCharge" @keyup="formatNumber($event)" type="number">
                </li>
                <li>
                  <p class="label">其他</p>
                  <input v-model="addProductParameter.otherCharge" @keyup="formatNumber($event)" type="number">
                </li>
              </ul>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <span class="cancel" @click="addProduct = false">取 消</span>
            <el-button @click="getAddProduct" size="mini" class="sure" type="warning">保 存</el-button>
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
      goodsType: '',
      goodsTypeList: [],
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
        {
          value: 2,
          label: "审核中"
        },
      ],
      startPort: '',
      endPort: '',
      portList: [],
      flightNumber: '',
      effectiveDate: '',
      productList: [],
      productStatusSrc1: require('../../../assets/air_state_4.png'),
      productStatusSrc2: require('../../../assets/son_state_1.png'),
      pageTotal: 0,
      checkMore: '批量选择',
//    模态框状态
      addProduct: false,
      addProductParameter: {},
      addStartPort: '',
      addEndPort: '',
      productId: '',
    }
  },
  created (){
    this.getPortList();
    this.getGoodTypeList();
    this.getProductList(1);
  },
  watch: {
    addProduct (){
      if(this.addProduct === false){
        this.addProductParameter = {};
        this.addStartPort = '';
        this.addEndPort = '';
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
    getProductList (page){
      this.productList =[];
      let resourcesType = this.resourcesType || -1;
      let goodsType = this.goodsType || -1;
      let productStatus ;
      if(this.productStatus === 0){
        productStatus = 0;
      }else {
        productStatus = this.productStatus || -1;
      }
      this.axios.post("/web/v1/product/airfreight/getList",{
        "id": this.id,
        "token": this.token,
        "cityEnd": this.endPort,
        "cityStart": this.startPort,
        "flight": this.flightNumber,
        "resourceType": resourcesType,
        "goodsType": goodsType,
        "productStatus": productStatus,
        "effectiveDate": this.effectiveDate,
        "pageIndex": page,
        "size": 10,
      }).then(data => {
        if(data.data.code === 1){
          if(data.data.hnaAirfreights.length){
            this.pageTotal = data.data.total;
            this.productList = data.data.hnaAirfreights;
          }
        }
      });
    },
    getAddProduct (){
      if(!this.addEndPort
        ||!this.addStartPort
        ||!this.addProductParameter.flightNumber
        ||!this.addProductParameter.resourcesType
        ||!this.addProductParameter.goodsType
        ||!this.addProductParameter.addDateRange
        ||!this.addProductParameter.levelM
        ||!this.addProductParameter.levelN
        ||!this.addProductParameter.level45
        ||!this.addProductParameter.level100
        ||!this.addProductParameter.level300
        ||!this.addProductParameter.level500
        ||!this.addProductParameter.level1000
        ||!this.addProductParameter.fuelCharge
        ||!this.addProductParameter.otherCharge
      ){
        this.$notify.error({
          title: '错误',
          message: '填写有误，所有的项都是必须选择或填写的，请检查！'
        });
        return
      }
      if(this.productId){
        this.axios.post("/web/v1/product/airfreight/save",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.addEndPort,
          "cityStart": this.addStartPort,
          "flight": this.addProductParameter.flightNumber,
          "resourceType": this.addProductParameter.resourcesType,
          "goodsType": this.addProductParameter.goodsType,
          "effectiveStart": this.addProductParameter.addDateRange[0],
          "effectiveEnd": this.addProductParameter.addDateRange[1],
          "minPrice": parseInt(this.addProductParameter.levelM,10),
          "levelN": parseInt(this.addProductParameter.levelN,10),
          "level45": parseInt(this.addProductParameter.level45,10),
          "level100": parseInt(this.addProductParameter.level100,10),
          "level300": parseInt(this.addProductParameter.level300,10),
          "level500": parseInt(this.addProductParameter.level500,10),
          "level1000": parseInt(this.addProductParameter.level1000,10),
          "fuelCharge": parseInt(this.addProductParameter.fuelCharge,10),
          "otherCharge": parseInt(this.addProductParameter.otherCharge,10),
          "airfreightId": this.productId
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.addProduct = false;
            this.getProductList(1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      }else{
        this.axios.post("/web/v1/product/airfreight/save",{
          "id": this.id,
          "token": this.token,
          "cityEnd": this.addEndPort,
          "cityStart": this.addStartPort,
          "flight": this.addProductParameter.flightNumber,
          "resourceType": this.addProductParameter.resourcesType,
          "goodsType": this.addProductParameter.goodsType,
          "effectiveStart": this.addProductParameter.addDateRange[0],
          "effectiveEnd": this.addProductParameter.addDateRange[1],
          "minPrice": parseInt(this.addProductParameter.levelM,10),
          "levelN": parseInt(this.addProductParameter.levelN,10),
          "level45": parseInt(this.addProductParameter.level45,10),
          "level100": parseInt(this.addProductParameter.level100,10),
          "level300": parseInt(this.addProductParameter.level300,10),
          "level500": parseInt(this.addProductParameter.level500,10),
          "level1000": parseInt(this.addProductParameter.level1000,10),
          "fuelCharge": parseInt(this.addProductParameter.fuelCharge,10),
          "otherCharge": parseInt(this.addProductParameter.otherCharge,10),
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.addProduct = false;
            this.getProductList(1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      }
    },
    switchProduct (productId,status){
      let url = '';
      if(status===1){
          url = '/web/v1/product/airfreight/setEnable';
      }else{
          url = '/web/v1/product/airfreight/setDisable';
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
    modifyProduct (obj){
      this.addProduct = true;
      this.addStartPort = obj.cityStart;
      this.addEndPort = obj.cityEnd;
      this.addProductParameter.flightNumber = obj.flight;
      this.addProductParameter.resourcesType = obj.resourceType;
      this.addProductParameter.goodsType = obj.goodsType;
      this.addProductParameter.addDateRange = [obj.effectiveStart,obj.effectiveEnd];
      this.addProductParameter.levelM = obj.minPrice;
      this.addProductParameter.levelN = obj.levelN;
      this.addProductParameter.level45 = obj.level45;
      this.addProductParameter.level100 = obj.level100;
      this.addProductParameter.level300 = obj.level300;
      this.addProductParameter.level500 = obj.level500;
      this.addProductParameter.level1000 = obj.level1000;
      this.addProductParameter.fuelCharge = obj.fuelCharge;
      this.addProductParameter.otherCharge = obj.otherCharge;
      this.productId = obj.id;
    },
    deleteProduct (id){
      this.$confirm('此操作将删除所选空运产品，无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post("/web/v1/product/airfreight/del",{
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
      let ids = this.getCheckId2();
      if(!ids) {
        this.$notify.error({
          title: '警告',
          message: '您还没有勾选要启用的空运产品，请勾选！',
          type: 'warning'
        });
      }else if(ids==='审核中'){
        this.$notify.error({
          title: '警告',
          message: '勾选中含有审核中的产品，审核中的产品无法变更状态，请重新勾选！',
          type: 'warning'
        });
      }else{
        this.switchProduct(ids,1);
      }
    },
    disableMoreProduct (){
      let ids = this.getCheckId2();
      if(!ids) {
        this.$notify.error({
          title: '警告',
          message: '您还没有勾选要禁用的空运产品，请勾选！',
          type: 'warning'
        });
      }else if(ids==='审核中'){
        this.$notify.error({
          title: '警告',
          message: '勾选中含有审核中的产品，审核中的产品无法变更状态，请重新勾选！',
          type: 'warning'
        });
      }else{
        this.switchProduct(ids,2);
      }
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
    getCheckId2 (){
      let ids = '';
      for(let i=0;i<this.productList.length;i++){
        if(this.productList[i].check){
          if(this.productList[i].productStatus === 2){
            return '审核中'
          }
          ids += this.productList[i].id+',';
        }
      }
      return ids
    },
    queryProduct (){
      this.getProductList(1);
    },
    flipList (page){
      this.getProductList(page)
    },
    clickItem (index){
      if(this.checkMore === '批量选择'){
        return
      }
      this.$set(this.productList[index],'check',!this.productList[index].check)
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
              width: 160px;
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
          min-height: 600px;
          padding-left: 30px;
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
              span.active{
                display: block;
              }
              p{
                float: left;
                height: 20px;
                line-height: 20px;
                margin-top: 10px;
                margin-bottom: 0;
                margin-right: 50px;
                span{
                  display: inline-block;
                  width: 20px;
                  background-color: #a7a7a7;
                  height: 1px;
                  margin: 0px 3px 4px 3px;
                }
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
              p:nth-child(1){width: 9%}
              p:nth-child(2){width: 16%}
              p:nth-child(3){width: 7%}
              p:nth-child(4){width: 7%}
              p:nth-child(5){width: 7%}
              p:nth-child(6){width: 7%}
              p:nth-child(7){width: 7%}
              p:nth-child(8){width: 7%}
              p:nth-child(9){width: 7%}
              p:nth-child(10){width: 7%}
              p:nth-child(11){width: 7%}
              p:nth-child(12){width: 12%}
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
