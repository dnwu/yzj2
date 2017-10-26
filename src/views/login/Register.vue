<template>
  <div class="register-container">
    <div class="register-con">
      <el-row>
        <el-col :span="12">
          <button type="button" class="register-user-type"
                  :class="userType === 'personal' ? 'register-user-type-active':''" @click.stop="userType='personal'">
            个人用户注册
          </button>
        </el-col>
        <el-col :span="12">
          <button type="button" class="register-user-type"
                  :class="userType === 'company' ? 'register-user-type-active':''" @click.stop="userType='company'">
            企业用户注册
          </button>
        </el-col>
      </el-row>
      <el-form :model="form" :rules="rules" ref="form" labelWidth="200px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="用户名需要在6到20个字符之间" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input placeholder="密码应有8-20位大小写英文字母与阿拉伯数字组合而成" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码" prop="checkPassword">
          <el-input placeholder="必须与登录密码一致" type="password" v-model="form.checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请填写真实姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input placeholder="请填写真实身份证号码" v-model="form.idcard"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input placeholder="输入手机号码，长度为11位阿拉伯数字" v-model="form.phone"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="18">
            <el-form-item label="验证码" prop="code">
              <el-input placeholder="输入手机收到的6位短信验证码" v-model="form.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="send-code">
              <el-button type="primary" size="small" @click.stop="sendCode">发送验证码</el-button>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="固定电话" prop="flphone">
          <el-input placeholder="输入座机号码，格式为 区号-座机号" v-model="form.flphone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input placeholder="输入电子邮箱，格式为xxx@xxxx.xx" v-model="form.email"></el-input>
        </el-form-item>
        <template v-if="userType === 'company'">
          <hr class="type-hr">
          <el-form-item label="公司名称" prop="companyName">
            <el-input placeholder="必须填写营业执照上的公司名称" v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="营业执照编号" prop="companyCode">
            <el-input placeholder="必须填写营业执照上的真实编号" v-model="form.companyCode"></el-input>
          </el-form-item>
          <el-form-item label="营业执照及其他附件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :file-list="fileList"
              list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,最多上传5张</div>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </template>
        <button type="button" class="registerBtn" @click="submitForm('form')">注册</button>
        <a class="login" @click.stop="goPage('login')">已有账号，直接登录</a>
      </el-form>
    </div>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow
    },
    data (){
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else if (!/^\d+$/.test(value)) {
          callback(new Error('手机号码只能包含有阿拉伯数字!'));
        } else {
          callback();
        }
      };
      let validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else if (!/^\d+$/.test(value)) {
          callback(new Error('验证码只会包含有阿拉伯数字!'));
        } else if (value !== this.receiveCode) {
          callback(new Error('输入的验证码与系统发送的不一致!'));
        } else {
          callback();
        }
      };
      let validateFlphone = (rule, value, callback) => {
        if (value !== '') {
          if (!/\d{3}-\d{8}|\d{4}-\d{7}/.test(value)) {
            callback(new Error('座机号码格式应为 区号-座机号'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        userType: 'personal',
        receiveCode: '',
        form: {
          username: '',
          password: '',
          checkPassword: '',
          name: '',
          idcard: '',
          phone: '',
          code: '',
          flphone: '',
          email: '',
          companyName: '',
          companyCode: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 6, max: 20, message: '长度需要在 6 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 20, message: '长度需要由 8 到 20 个大小写英文字母与阿拉伯数字组成', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '请输入再次输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度需要由 8 到 20 个大小写英文字母与阿拉伯数字组成', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          idcard: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {min: 18, max: 18, message: '长度应为18位', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {min: 11, max: 11, message: '长度应为11位阿拉伯数字', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入手机收到的6位短信验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '长度应为6位阿拉伯数字', trigger: 'blur'},
            {validator: validateCode, trigger: 'blur'}
          ],
          flphone: [
            {validator: validateFlphone, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址,格式为xxx@xxxx.xx', trigger: 'blur,change'}
          ],
          companyName: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度需要在 2 到 20 个字符', trigger: 'blur'}
          ],
          companyCode: [
            {required: true, message: '请输入营业执照编号', trigger: 'blur'},
            {min: 2, max: 30, message: '长度需要在 2 到 30 个字符', trigger: 'blur'}
          ],
        },
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('login!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goPage (path){
        this.$router.push({name: path});
      },
      sendCode (){
        if (this.form.phone !== '') {
          this.$refs.form.validateField('phone', function (e) {
            if (!e) {
              this.receiveCode = '123456';
              alert("send ok!code=123456");
            }
          });
        } else {
          this.$refs.form.validateField('phone')
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file, fileList) {
        if (fileList.length > 5) {
          this.fileList = fileList.slice(0, 5);
        }
      },
      handleSuccess(file, fileList){
          console.log("upload success")
      },
      handleError(file, fileList){
          console.log("upload error")
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>
<style scoped>
  .register-container {
    display: block;
    width: 100%;
    padding: 80px 0;
    background-color: #f9f9f9;
  }

  .register-con {
    display: table;
    margin: auto;
    width: 1000px;
    background-color: white;
    box-shadow: 0 0 3px #bdbdbd;
    -webkit-box-shadow: 0 0 3px #bdbdbd;
    -moz-box-shadow: 0 0 3px #bdbdbd;
    box-sizing: border-box;
  }

  .register-user-type {
    width: 100%;
    border: none;
    text-align: center;
    background-color: #f9f9f9;
    font-size: 16px;
    border-bottom: 5px solid #f9f9f9;
    padding: 10px 6px;
    cursor: pointer;
    color: #939393;
  }

  .register-user-type-active {
    background-color: white;
    border-bottom-color: #f4c900;
    -moz-border-bottom-colors: #f4c900;
    color: #333;
  }

  .register-con > form {
    padding: 50px 150px 50px 50px;
  }

  .registerBtn {
    display: block;
    width: 300px;
    text-align: center;
    color: white;
    background-color: #f5ca00;
    padding: 10px 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin: 60px auto 15px;
  }

  .registerBtn:hover {
    background-color: #d7b100;
  }

  .login {
    display: block;
    text-align: center;
    color: #989898;
    font-size: 12px;
    cursor: pointer;
  }

  .login:hover {
    color: #666666;
  }

  .send-code {
    padding: 5px 20px;
  }

  .type-hr {
    margin: 20px 0;
    color: #f0f0f0;
  }
</style>
