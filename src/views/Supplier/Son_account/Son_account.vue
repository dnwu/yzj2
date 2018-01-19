<template>
<div class="son-account">
  <div class="head">子账号管理</div>
  <div class="body">
    <div class="company-admin">
      <ul class="top-line">
        <li v-for="list in 40"></li>
      </ul>
      <div class="content">
        <div class="left"><img src="../../../assets/head_img.png"></div>
        <div class="center">
          <p><span class="label">供应商名称&nbsp;&nbsp;:</span><span>{{accountInfo.supplierFullName}}</span></p>
          <p></p>
          <p><span class="label">用户名:</span><span>{{accountInfo.account}}</span></p>
        </div>
        <div class="right">
          <p><span class="label">姓名:</span><span>{{accountInfo.userName}}</span></p>
          <p><span class="label">手机号&nbsp;:</span><span>{{accountInfo.phone}}</span></p>
          <p><span class="label">邮箱:</span><span>{{accountInfo.email}}</span></p>
        </div>
      </div>
    </div>
    <!--新增子账号模态框-->
    <div class="add-account">
      <el-dialog width="1000px" title="添加子账号" :visible.sync="addAccount">
        <el-form :model="addAccountInfo" :rules="rules" ref="addAccountInfo" class="demo-ruleForm">
          <div class="content">
            <div class="left">
                <div class="box">
                  <div class="label">用户名</div>
                  <div class="value">
                    <el-form-item prop="userName">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.userName">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">密码</div>
                  <div class="value">
                    <el-form-item prop="password">
                      <el-input
                        type="password"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.password">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">确认密码</div>
                  <div class="value">
                    <el-form-item prop="secondPassword">
                      <el-input
                        type="password"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.secondPassword">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            <div class="right">
                <div class="box">
                  <div class="label">姓名</div>
                  <div class="value">
                    <el-form-item prop="name">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.name">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">身份证</div>
                  <div class="value">
                    <el-form-item prop="card">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.card">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">手机号</div>
                  <div class="value">
                    <el-form-item prop="phone">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.phone">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">固定电话</div>
                  <div class="value">
                    <el-form-item prop="telephone">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.telephone">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="box">
                  <div class="label">电子邮箱</div>
                  <div class="value">
                    <el-form-item prop="email">
                      <el-input
                        type="text"
                        @focus="modifyYellow($event)"
                        @blur="reduction($event)"
                        :clearable = false
                        size="small"
                        v-model="addAccountInfo.email">
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
          </div>
          <div class="btn">
            <el-form-item>
              <el-button @click="submitAddAccount('addAccountInfo')" size="mini" class="sure" type="warning">立即添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <ul v-if="hasSonList" class="son-list">
      <li class="list-head">
        <span>状态</span>
        <span>用户名</span>
        <span>姓名</span>
        <span>手机号</span>
        <span>邮箱</span>
        <span>身份证</span>
        <span>创建时间</span>
        <!--<span></span>-->
        <span></span>
        <span><img title="新增子账号" @click="addAccount = true" class="add" src="../../../assets/son_add.png"></span>
      </li>
      <li v-if="sonAccountList.length!==0" v-for="item in sonAccountList">
        <span><i :class="{circleGreen:item.accountStatus===1}" class="circle-yellow"></i></span>
        <span>{{item.account}}</span>
        <span>{{item.fullName}}</span>
        <span>{{item.phone}}</span>
        <span>{{item.email}}</span>
        <span>{{item.identityCard}}</span>
        <span>{{dateTransform(item.createtime)}}</span>
        <!--<span><img src="../../../assets/son_modify.png"></span>-->
        <span><img :title="item.accountStatus===1?'禁用':'启用'" @click="switchAccount(item.id,item.accountStatus)" :src="item.accountStatus===1?statusSrc2:statusSrc1"></span>
        <span><img title="删除" @click="deleteAccount(item.id)" src="../../../assets/son_delete.png"></span>
      </li>
      <li v-if="sonAccountList.length===0" class="handle">暂无数据</li>
    </ul>
    <div class="block pagination">
      <el-pagination
        layout="prev, pager, next"
        :page-size = 10
        @current-change = "flipList"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addAccountInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        accountInfo: {}, //帐号信息
        hasSonList: true, //是否有权限查看字账号列表
        sonAccountList: [], //子账号列表数据
        statusSrc1: require("../../../assets/son_state_1.png"), //启用
        statusSrc2: require("../../../assets/son_state_2.png"), //禁用
        pageTotal: 0, //总页数
        addAccount: false, //新增模态框
        addAccountInfo: { //新增子帐号信息
          userName: '',
          password: '',
          secondPassword: '',
          name: '',
          card: '',
          phone: '',
          telephone: '',
          email: '',
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 60, message: '长度在 6 到 60 个字符之间', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字母数字组成', trigger: 'blur' }
          ],
          secondPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
        }
      }
    },
    created (){
      this.getAccountInfo();
      this.getSonAccountList(1);
    },
    watch: {
      addAccount (){
        if(this.addAccount === false){
          this.$refs.addAccountInfo.resetFields();
        }
      }
    },
    methods: {
      getAccountInfo (){
        this.axios.post("/web/v1/supplier/info", {
          "id": this.id,
          "token": this.token,
        }).then(data => {
          if(data.data.code === 1){
            this.accountInfo = data.data.data;
          }
        });
      },
      getSonAccountList (page){
        this.sonAccountList = [];
        this.axios.post("/web/v1/supplier/subaccount/list", {
          "id": this.id,
          "token": this.token,
          "pageIndex": page,
          "size": 10,
        }).then(data => {
          if(data.data.code === 1){
            if(data.data.hnaAccounts.length){
              this.sonAccountList = data.data.hnaAccounts
              this.pageTotal = data.data.total;
            }
          }else if(data.data.code===-2){
            this.hasSonList = false;
          }
        });
      },
      flipList (page){
        this.getSonAccountList(page)
      },
      submitAddAccount (formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userInfo = this.addAccountInfo;
            this.axios.post("/web/v1/supplier/subaccount/save", {
              "id": this.id,
              "token": this.token,
              "account": userInfo.userName,
              "email": userInfo.email,
              "fullName": userInfo.name,
              "identityCard": userInfo.card,
              "password": userInfo.password,
              "phone": userInfo.phone,
              "telephone": userInfo.telephone,
            }).then(data => {
              if(data.data.code === 1) {
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
                this.addAccount = false;
                this.getSonAccountList(1);
              }else{
                this.$notify.error({
                  title: '错误',
                  message: data.data.msg
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      deleteAccount (accountId){
        this.$confirm('此操作将删除该帐号，无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post("/web/v1/supplier/subaccount/del", {
            "id": this.id,
            "token": this.token,
            "recordId": accountId,
          }).then(data => {
            if(data.data.code === 1){
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              });
              this.getSonAccountList(1);
            }else{
              this.$notify.error({
                title: '错误',
                message: data.data.msg
              });
            }
          });
        })
      },
      switchAccount (accountId,status){
        status =(status===1)?2:1;
        this.axios.post("/web/v1/supplier/subaccount/acstatus", {
          "id": this.id,
          "token": this.token,
          "subAccountId": accountId,
          "status": status,
        }).then(data => {
          if(data.data.code === 1){
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getSonAccountList(1);
          }else{
            this.$notify.error({
              title: '错误',
              message: data.data.msg
            });
          }
        });
      },
      modifyYellow (e){
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.className="box yellow";
      },
      reduction (e){
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.className="box";
      },
      dateTransform(time){
        let newTime = new Date(time);
        let year = newTime.getFullYear();
        let month = (newTime.getMonth() + 1)<10?'0'+(newTime.getMonth() + 1):(newTime.getMonth() + 1);
        let date = newTime.getDate()<10?'0'+newTime.getDate():newTime.getDate();
        let hour = newTime.getHours()<10?'0'+newTime.getHours():newTime.getHours();
        let minutes = newTime.getMinutes()<10?'0'+newTime.getMinutes():newTime.getMinutes();
        return year+'-'+month+'-'+date+' '+hour+':'+minutes
      }
    },
    computed: {
      ...mapGetters(["id", "token"]),
    }
  }
</script>
<style lang="scss">
  .son-account{
    .head{
      height: 61px;
      line-height: 61px;
      padding-left: 20px;
      color: #b3b3b3;
      font-size: 16px;
    }
    .body{
      color: #A7A7A7;
      padding-top: 20px;
      padding-left: 20px;
      .company-admin{
        -moz-box-shadow:0 2px 2px #CFCFCF;         /*firefox*/
        -webkit-box-shadow:0 2px 2px #CFCFCF;      /*webkit*/
        box-shadow: 0 2px 2px #CFCFCF;
        .top-line{
          height: 4px;
          overflow-y: hidden;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          li:nth-child(2n){
            float: left;
            height: 4px;
            width: 40px;
            /* Safari 5.1 - 6.0 */
            background: -webkit-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* Opera 11.1 - 12.0 */
            background: -o-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* Firefox 3.6 - 15 */
            background: -moz-linear-gradient(30deg, #fedb43 50%, #f52731 50%);
            /* 标准的语法 */
            background: linear-gradient(30deg, #fedb43 50%, #f52731 50%);
          }
          li:nth-child(2n-1){
            float: left;
            height: 4px;
            width: 40px;
            /* Safari 5.1 - 6.0 */
            background: -webkit-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* Opera 11.1 - 12.0 */
            background: -o-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* Firefox 3.6 - 15 */
            background: -moz-linear-gradient(30deg, #f52731 50%, #fedb43 50%);
            /* 标准的语法 */
            background: linear-gradient(30deg, #f52731 50%, #fedb43 50%);
          }
        }
        .content{
          font-size: 16px;
          overflow: hidden;
          padding: 10px 20px;
          .left{
            float: left;
            margin: 0px 100px;
            img{
              display: inline-block;
              width: 97px;
              height: 97px;
              margin-top: 3px;
            }
          }
          .center{
            float: left;
            margin-right: 100px;
            p{
              height: 21px;
              margin: 10px 0px;
              .label{
                display: inline-block;
                margin-right: 20px;
                width: 120px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
              }
            }
          }
          .right{
            float: left;
            p{
              margin: 10px 0px;
              .label{
                display: inline-block;
                margin-right: 20px;
                width: 80px;
                text-align: justify;
                text-align-last: justify;
                -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
              }
            }
          }
        }
      }
      .add-account{
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
              overflow: hidden;
              box-sizing: border-box;
              padding: 30px 0px 30px 0px;
              div{
                .box{
                  height: 36px;
                  line-height: 36px;
                  border-bottom: 1px solid #999;
                  margin-bottom: 30px;
                  .label{
                    width: 70px;
                    margin-right: 15px;
                    color: #A7A7A7;
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                    -moz-text-align-last: justify;  /* 针对 Firefox 的代码 */
                  }
                  .value{
                    display: inline-block;
                    width: 220px;
                    input{
                      border: 0;
                      font-size: 16px;
                      color: #808080;
                    }
                    input:focus{
                      color: #fccf00;
                    }
                  }
                }
                div.yellow{
                  border-bottom: 1px solid #fccf00;
                  .label{
                    color: #fccf00;
                  }
                }
              }
              .left{
                float: left;
                width: 50%;
                padding-left: 80px;
                padding-right: 30px;
                box-sizing: border-box;
                padding-top: 66px;
              }
              .right{
                float: left;
                width: 50%;
                padding-left: 30px;
                padding-right: 80px;
                box-sizing: border-box;
              }
            }
            .btn{
              padding-bottom: 10px;
              text-align: center;
              .sure {
                padding: 8px 80px;
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
      .son-list{
        padding: 0;
        padding-top: 10px;
        margin: 0;
        min-height: 600px;
        li{
          height: 40px;
          box-sizing: border-box;
          span{
            float: left;
            height: 40px;
            line-height: 40px;
            text-align: center;
            .circle-yellow{
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 10px;
              background-color: #FCCF00;
            }
            i.circleGreen{
              background-color: #7AC943;
            }
            img{
              margin-top: 11px;
              cursor: pointer;
            }
            .add{
              margin-top: 8px;
            }
          }
          span:nth-child(1){width: 8%}
          span:nth-child(2){width: 12%}
          span:nth-child(3){width: 10%}
          span:nth-child(4){width: 15%}
          span:nth-child(5){width: 15%}
          span:nth-child(6){width: 15%}
          span:nth-child(7){width: 15%}
          span:nth-child(8){width: 5%}
          span:nth-child(9){width: 5%}
        }
        .list-head{
          margin-bottom: 10px;
        }
        li:not(:first-child){
          border-bottom: 1px solid #EBEBEB;
        }
        li.handle{
          text-align: center;
          border: 0;
          margin-top: 30px;
        }
      }
      .pagination{
        text-align: center;
        margin-bottom: 30px;
      }
    }
  }
</style>
