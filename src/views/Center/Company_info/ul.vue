<template>
  <ul class="my-ul">
    <li class="my-li" v-for="(obj,name) in info">
        <div class="wrap">
          <span class="name" v-text="obj.name"></span>
          <span class="dot">:</span>
        </div>
        <input :style="widthStyle" class="value" v-if="!obj.file" v-show="edit" v-model="obj.value"></input>
        <span :style="widthStyle" class="value" v-if="!obj.file" v-show="!edit" v-text="obj.value"></span>
        <span :style="widthStyle" class="value" v-if="obj.file" v-show="!edit"><i v-if="obj.value" class="el-icon-picture"></i></span>
        <el-upload
            ref="upload"
            :style="widthStyle"
            v-if="obj.file"
            v-show="edit"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :multiple="false"
            :on-change="onChange"
            class="upload-demo"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary" @click="setName(name)">选取文件</el-button>
        </el-upload>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: "auto"
    }
  },
  data() {
    return {
      widthStyle: "",
      name: "",
      fileName: ""
    };
  },
  methods: {
    getWitdthStyle() {
      this.widthStyle = `width:${this.width}`;
    },
    setName(name) {
      this.name = name + "File";
      this.fileName = name;
    },
    onChange(event) {
      console.log(this.$refs);
      this.$emit("fileChange", this.name, event.raw);
      this.$emit("fileNameChange", this.fileName, event.raw.name);
    }
  },
  mounted() {
    this.getWitdthStyle();
  }
};
</script>

<style scoped lang="scss">
ul {
  padding-left: 0;
}

$font-height: 18px;
@mixin font {
  text-align: justify;
  height: $font-height;
  overflow: hidden;
  &::after {
    width: 100%;
    height: 0;
    margin: 0;
    display: inline-block;
    overflow: hidden;
    content: "";
  }
}
li {
  margin-bottom: 10px;
}
.wrap {
  display: inline-block;
  text-align: right;
  min-width: 220px;
  .name {
    display: inline-block;
    min-width: 110px;
    @include font;
  }
  .info-beteen-font {
    min-width: 105px; // 公司基本信息第二栏名字两边对齐布局，宽度控制
  }
  .dot {
    margin: 0 20px 0 10px;
  }
}
.value {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
}

.upload-demo {
  display: inline-block;
}
</style>
<style lang="scss">
.my-li {
  .el-upload-list {
    margin: -38px 0 0 90px;
    padding: 0;
    list-style: none;
    position: absolute;
    max-width: 250px;
  }
}
</style>



