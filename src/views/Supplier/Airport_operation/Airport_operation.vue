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
          <div class="box domestic-abroad">
            <div class="label">国内/国际</div>
            <div class="value">
              <el-select size="mini" v-model="domesticAbroad" placeholder="请选择">
                <el-option
                  v-for="item in domesticAbroadList"
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
            <li class="add"><button title="新增/修改机场产品" @click="addProduct = true" :class="{disableStyle:isDisable}"><img class="addIcon" src="../../../assets/son_add.png"></button></li>
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
              <p>费用项</p>
              <p>计费方式</p>
              <p>单价（元/公斤）</p>
              <p>最低消费（元/票）</p>
              <p>固定收费</p>
              <p>生效开始时间</p>
              <p>生效结束时间</p>
            </div>
          </li>
          <li v-if="productList.length!==0" v-for="(item,index) in productList" @click="clickItem(index)" :class="{hand:isShow}">
            <div class="title">
              <p>{{item.resourceType===1?'自营':'第三方'}}</p>
              <p>{{item.hnaDataName}}</p>
              <p>{{item.countryType===1?'国际':'国内'}}</p>
              <p>{{item.departureArrival===1?'目的地':'始发站'}}</p>
              <img title="删除" @click="deleteProduct(item.id)" :class="{hide:isShow}" src="../../../assets/air_delete.png">
              <img title="修改" @click="getModifyProduct(item)" :class="{hide:isShow}" src="../../../assets/airport_operation_2.png">
              <img :title="item.productStatus===0?'禁用':'启用'" @click="switchProduct(item.id,item.productStatus)" :class="{hide:isShow||item.productStatus===2}" :src="item.productStatus===0?productStatusSrc1:productStatusSrc2">
              <span :class="{active:item.check}" class="sign"></span>
            </div>
            <div class="detail">
              <p class="state">
                <span><img :src="productStatusImg(item.productStatus)"></span>
                <span>{{productStatusName(item.productStatus)}}</span>
              </p>
              <p>{{item.airportName}}</p>
              <p>{{item.priceName}}</p>
              <p>{{priceTypeName(item.priceType)}}</p>
              <p>{{item.unitPrice}}</p>
              <p>{{item.minPrice}}</p>
              <p>{{item.priceType===12?item.unitPrice:'-'}}</p>
              <p>{{item.effectiveStart.substring(0,10)}}</p>
              <p>{{item.effectiveEnd.substring(0,10)}}</p>
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
          <el-dialog width="1000px" title="新增/修改机场产品" :visible.sync="addProduct">
            <div class="content">
              <div class="up">
                <div class="left">
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
                </div>
                <div class="center">
                  <div class="box">
                    <div class="label">所在机场:</div>
                    <div class="value">
                      <el-select size="mini" filterable v-model="addProductParameter.airPort" placeholder="请选择">
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
                      <el-select size="small" v-model="addProductParameter.startEnd">
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
                    <div class="label">国内/国际:</div>
                    <div class="value">
                      <el-select size="small" v-model="addProductParameter.domesticAbroad">
                        <el-option
                          v-for="item in domesticAbroadList"
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
                <div class="costTerm">
                  <div class="box cost">
                    <div class="label">费用项:</div>
                    <div class="value">
                      <el-select size="small" v-model="addProductParameter.costName">
                        <el-option
                          v-for="item in costTypeList"
                          :key="item.dataName"
                          :label="item.dataName"
                          :value="item.dataName">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="box billing-method">
                    <div class="label">计费方式:</div>
                    <div class="value">
                      <el-select size="small" @change="initPrice" v-model="addProductParameter.priceType">
                        <el-option
                          v-for="item in priceTypeList"
                          :key="item.id"
                          :label="item.dataName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <ul class="detail">
                  <li>
                    <p class="label">单价</p>
                    <input v-model="addProductParameter.unitPrice" :disabled="addProductParameter.priceType===12" @keyup="formatNumber($event)" type="number">
                  </li>
                  <li>
                    <p class="label">最低收费</p>
                    <input v-model="addProductParameter.minPrice" :disabled="addProductParameter.priceType===12" @keyup="formatNumber($event)" type="number">
                  </li>
                  <li>
                    <p class="label">固定费用</p>
                    <input v-model="addProductParameter.fixedPrice" :disabled="addProductParameter.priceType===11" @keyup="formatNumber($event)" type="number">
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
        airPort: '',
        portList: [],
        domesticAbroad: '',
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
        effectiveDate: '',
        checkMore: '批量选择',
        productList: [],
        productStatusSrc1: require('../../../assets/airport_operation_1.png'),
        productStatusSrc2: require('../../../assets/airport_operation_3.png'),
        priceTypeList: [],
        costTypeList: [],
        pageTotal: 0,
//    模态框状态
        addProduct: false,
        addProductParameter: {},
        productId: '',
      }
    },
    created() {
      this.getPortList();
      this.getGoodTypeList();
      this.getPriceTypeList();
      this.getCostTypeList();
      this.getProductList(1);
    },
    watch: {
      addProduct (){
        if (this.addProduct === false) {
          this.addProductParameter = {};
        }
      },
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
      getPriceTypeList (){
        this.axios.post("/app/v1/common/queryDict",{
          "dataType": 3
        }).then(data => {
          if(data.data.data.detailDTOS.length){
            this.priceTypeList = data.data.data.detailDTOS
          }
        });
      },
      getCostTypeList (){
        this.axios.post("/app/v1/common/queryDict",{
          "dataType": 8
        }).then(data => {
          if(data.data.data.detailDTOS.length){
            this.costTypeList = data.data.data.detailDTOS
          }
        });
      },
      getProductList (page){
        this.productList =[];
        let resourcesType = this.resourcesType || -1;
        let goodsType = this.goodsType || -1;
        let productStatus;
        if(this.productStatus === 0){
          productStatus = 0;
        }else {
          productStatus = this.productStatus || -1;
        }
        let startEnd;
        if(this.startEnd === 0){
          startEnd = 0;
        }else{
          startEnd = this.startEnd || -1;
        }
        let domesticAbroad;
        if(this.domesticAbroad === 0){
          domesticAbroad = 0;
        }else{
          domesticAbroad = this.domesticAbroad || -1;
        }
        this.axios.post("/web/v1/product/airport/getList",{
          "id": this.id,
          "token": this.token,
          "airportName": this.airPort,
          "countryType": domesticAbroad,
          "departureArrival": startEnd,
          "effectiveDate": this.effectiveDate,
          "goodsType": goodsType,
          "productStatus": productStatus,
          "resourceType": resourcesType,
          "pageIndex": page,
          "size": 10,
        }).then(data => {
          if(data.data.code === 1){
            if(data.data.hnaAirportProducts.length){
              this.productList = data.data.hnaAirportProducts;
              this.pageTotal = data.data.total;
            }
          }
        });
      },
      getAddProduct (){
        let pass1 = false;
        let pass2 = false;
        let pass3 = false;
        let unitPrice = '';
        if(!this.addProductParameter.goodsType
          ||!this.addProductParameter.airPort
          ||!(this.addProductParameter.startEnd===0||this.addProductParameter.startEnd===1)
          ||!(this.addProductParameter.domesticAbroad===0||this.addProductParameter.domesticAbroad===1)
          ||!this.addProductParameter.addDateRange
          ||!this.addProductParameter.costName
          ||!this.addProductParameter.priceType
        ){
          pass1 = true;
        }
        if(this.addProductParameter.priceType === 11){
          if(!this.addProductParameter.unitPrice||!this.addProductParameter.minPrice){
            pass2 = true;
          }
          unitPrice = this.addProductParameter.unitPrice;
        }else{
          if(!this.addProductParameter.fixedPrice){
            pass3 = true;
          }
          unitPrice = this.addProductParameter.fixedPrice;
        }
        if(pass1||pass2||pass3){
          this.$notify.error({
            title: '错误',
            message: '填写有误，所有的项都是必须选择或填写的，请检查！'
          });
          return
        }
        let minPrice = this.addProductParameter.minPrice || 0;
        if(this.productId){
          this.axios.post("/web/v1/product/airport/save",{
            "id": this.id,
            "token": this.token,
            "airportName": this.addProductParameter.airPort,
            "countryType": this.addProductParameter.domesticAbroad,
            "departureArrival": this.addProductParameter.startEnd,
            "effectiveStart": this.addProductParameter.addDateRange[0],
            "effectiveEnd": this.addProductParameter.addDateRange[1],
            "goodsType": this.addProductParameter.goodsType,
            "minPrice": parseInt(minPrice,10),
            "priceName": this.addProductParameter.costName,
            "priceType": this.addProductParameter.priceType,
            "unitPrice": parseInt(unitPrice,10),
            "airportId": this.productId,
          }).then(data => {
            if(data.data.code === 1){
              this.$notify({
                title: '成功',
                message: '操作成功！',
                type: 'success'
              });
              this.addProduct =false;
              this.getProductList (1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        }else{
          this.axios.post("/web/v1/product/airport/save",{
            "id": this.id,
            "token": this.token,
            "airportName": this.addProductParameter.airPort,
            "countryType": this.addProductParameter.domesticAbroad,
            "departureArrival": this.addProductParameter.startEnd,
            "effectiveStart": this.addProductParameter.addDateRange[0],
            "effectiveEnd": this.addProductParameter.addDateRange[1],
            "goodsType": this.addProductParameter.goodsType,
            "minPrice": parseInt(minPrice,10),
            "priceName": this.addProductParameter.costName,
            "priceType": this.addProductParameter.priceType,
            "unitPrice": parseInt(unitPrice,10),
          }).then(data => {
            if(data.data.code === 1){
              this.$notify({
                title: '成功',
                message: '操作成功！',
                type: 'success'
              });
              this.addProduct =false;
              this.getProductList (1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        }
      },
      getModifyProduct (obj){
        this.addProduct = true;
        this.addProductParameter.goodsType = obj.goodsType;
        this.addProductParameter.airPort = obj.airportName;
        this.addProductParameter.startEnd = obj.departureArrival;
        this.addProductParameter.domesticAbroad = obj.countryType;
        this.addProductParameter.addDateRange = [obj.effectiveStart.substring(0,10),obj.effectiveEnd.substring(0,10)];
        this.addProductParameter.costName = obj.priceName;
        this.addProductParameter.priceType = obj.priceType;
        if(obj.priceType === 11){
          this.addProductParameter.minPrice = obj.minPrice;
          this.addProductParameter.unitPrice = obj.unitPrice;
        }else{
          this.addProductParameter.fixedPrice = obj.unitPrice;
        }
        this.productId = obj.id;
      },
      switchProduct (productId,status){
        let url = '';
        if(status===1){
          url = '/web/v1/product/airport/setEnable';
        }else{
          url = '/web/v1/product/airport/setDisable';
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
          this.axios.post("/web/v1/product/airport/del",{
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
      initPrice (){
        this.addProductParameter.unitPrice = '';
        this.addProductParameter.minPrice = '';
        this.addProductParameter.fixedPrice = '';
      },
      queryProduct (){
        this.getProductList(1);
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
      priceTypeName (type){
        let name = '';
        for(let i=0;i<this.priceTypeList.length;i++){
          if(this.priceTypeList[i].id === type){
            name = this.priceTypeList[i].dataName;
          }
        }
        return name
      },
      flipList (page){
        this.getProductList(page)
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
      clickItem (index){
        if(this.checkMore === '批量选择'){
          return
        }
        this.$set(this.productList[index],'check',!this.productList[index].check)
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
          min-height: 600px;
          padding-left: 30px;
          li{
            height: 100px;
            box-sizing: border-box;
            border-bottom: 1px solid #EBEBEB;
            .title{
              height: 30px;
              padding-left: 33px;
              padding-right: 30px;
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
              p:nth-child(3){width: 12%}
              p:nth-child(4){width: 10%}
              p:nth-child(5){width: 10%}
              p:nth-child(6){width: 10%}
              p:nth-child(7){width: 10%}
              p:nth-child(8){width: 14%}
              p:nth-child(9){width: 14%}
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
                  .costTerm{
                    margin-top: 50px;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                    overflow: hidden;
                    padding-left: 111px;
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
                    padding-left: 200px;
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
