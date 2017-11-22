<template>
  <div class="company-info">
    <div class="header">公司基本信息</div>
    <div class="company-name">
      <div>公司名称</div>
      <div><el-input v-model="companyName" placeholder="公司名称"></el-input></div>
    </div>
    <div class="company-position">
      <div>营业执照所在地</div>
      <div><el-input v-model="companyPosition" placeholder="营业执照所在地"></el-input></div>
    </div>
    <div class="company-number">
      <div>营业执照号</div>
      <div><el-input v-model="companyNumber" placeholder="营业执照号"></el-input></div>
    </div>
    <div class="detail-position">
      <div>详细地址</div>
      <div><el-input v-model="detailPosition" placeholder="详细街道"></el-input></div>
    </div>
    <div class="legal-person">
      <div>法定代表人</div>
      <div><el-input v-model="legalPerson" placeholder="法定代表人"></el-input></div>
    </div>
    <div class="person-id">
      <div>身份证号码</div>
      <div><el-input v-model="personId" placeholder="身份证号码"></el-input></div>
    </div>
    <div class="electronic-id">
      <div>法人身份证电子版</div>
      <div>
        <el-input v-model="electronicId" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="time-limit">
      <div>营业期限</div>
      <div><el-input v-model="timeLimit" placeholder="营业期限"></el-input></div>
    </div>
    <div class="registered-capital">
      <div>注册资金</div>
      <div><el-input v-model="registeredCapital" placeholder="注册资金"></el-input></div>
    </div>
    <div class="business-line">
      <div>营业范围</div>
      <div><el-input v-model="businessLine" placeholder="营业范围"></el-input></div>
    </div>
    <div class="business-licence">
      <div>营业执照电子版</div>
      <div>
        <el-input v-model="businessLicence" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload1">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="framework-id">
      <div>组织机构代码</div>
      <div><el-input v-model="frameworkId" placeholder="组织机构代码"></el-input></div>
    </div>
    <div class="framework-deadline">
      <div>组织机构代码证有效期</div>
      <div><el-input v-model="frameworkDeadline" placeholder="组织机构代码证有效期"></el-input></div>
    </div>
    <div class="framework-licence">
      <div>组织机构代码证电子版</div>
      <div>
        <el-input v-model="frameworkLicence" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload2">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="header">公司税务登记证</div>
    <div class="taxpayer-id">
      <div>纳税人识别号</div>
      <div><el-input v-model="taxpayerID" placeholder="纳税人识别号"></el-input></div>
    </div>
    <div class="tax-licence">
      <div>税务登记证电子版</div>
      <div>
        <el-input v-model="taxLicence" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess3"
          :before-upload="beforeAvatarUpload3">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="taxpayer-id-licence">
      <div>一般纳税人资格证电子版</div>
      <div>
        <el-input v-model="taxpayerIdLicence" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess4"
          :before-upload="beforeAvatarUpload4">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="header">开户银行许可证</div>
    <div class="bank-username">
      <div>银行用户名</div>
      <div><el-input v-model="bankUsername" placeholder="银行用户名"></el-input></div>
    </div>
    <div class="bank-account-number">
      <div>公司银行账号</div>
      <div><el-input v-model="bankAccountNumber" placeholder="公司银行账号"></el-input></div>
    </div>
    <div class="bank-name">
      <div>开户银行支行名称</div>
      <div><el-input v-model="bankName" placeholder="开户银行支行名称"></el-input></div>
    </div>
    <div class="bank-address">
      <div>开户银行支行所在地</div>
      <div><el-input v-model="bankAddress" placeholder="开户银行支行所在地"></el-input></div>
    </div>
    <div class="bank-licence">
      <div>银行开户许可证电子版</div>
      <div>
        <el-input v-model="bankLicence" placeholder="选择文件..."></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess5"
          :before-upload="beforeAvatarUpload5">
          <el-button size="medium" type="info">浏览</el-button>
        </el-upload>
      </div>
    </div>
    <div class="header">联系人信息</div>
    <div class="contact-name">
      <div>联系人姓名</div>
      <div><el-input v-model="contactName" placeholder="联系人姓名"></el-input></div>
    </div>
    <div class="contact-phonenumber">
      <div>联系人手机</div>
      <div><el-input v-model="contactPhonenumber" placeholder="联系人手机"></el-input></div>
    </div>
    <div class="contact-email">
      <div>联系人邮箱</div>
      <div><el-input v-model="contactEmail" placeholder="联系人邮箱"></el-input></div>
    </div>
    <div class="save">
      <el-button type="success">保存</el-button>
      <el-button type="warning">企业注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: "深圳运捷讯信息系统有限公司",
      companyPosition: "广州省深圳市南山区",
      companyNumber: "1354163465416FSDAF",
      detailPosition: "粤海街道科苑路8号讯美科技广场",
      legalPerson: "刘戴白",
      personId: "11014648199134643135",
      electronicId: "选择文件。。。",
      timeLimit: "2017-03-03至长期",
      registeredCapital: "50万",
      businessLine: "运输",
      businessLicence:'',
      frameworkId:'4+65+5WDFSD',
      frameworkDeadline:'2017-03-03至长期',
      frameworkLicence:'',
      taxpayerID:'43154JJKJL',
      taxLicence:'',
      taxpayerIdLicence:'',
      bankUsername:'深圳运捷讯信息系统有限公司',
      bankAccountNumber:'164163132135',
      bankName:'民生银行',
      bankAddress:'广东省深圳市南山区',
      bankLicence:'',
      contactName:'张杰',
      contactPhonenumber:'135464165',
      contactEmail:'33565@qq.com'
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess1(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess4(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess5(res, file) {
      this.identitypic = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload2(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload3(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload4(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    beforeAvatarUpload5(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
.company-info {
  padding: 30px 100px;
  .header {
    width: 100%;
    height: 45px;
    background-color: #f9f9f9;
    position: relative;
    color: #f4c900;
    line-height: 45px;
    padding-left: 20px;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 4px;
      height: 100%;
      background-color: #f4c900;
      top: 0;
      left: 0;
    }
  }
  > div {
    display: flex;
    margin: 20px 0;
    > div {
      &:first-child {
        width: 170px;
        height: 40px;
        text-align: right;
        line-height: 40px;
        padding-right: 20px;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
  .electronic-id,.business-licence,.framework-licence,.tax-licence,.taxpayer-id-licence,.bank-licence {
    > div {
      &:last-child {
        display: flex;
        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
  .save{
    text-align: center;
    .el-button{
      margin:30px auto 0;
    }
  }
}
</style>
