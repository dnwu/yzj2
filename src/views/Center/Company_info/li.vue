<template>
<div class="my-li">
    <li v-for="(obj,name) in info">
        <div class="wrap">
        <span class="name" v-text="obj.name"></span>
        <span class="dot">:</span>
        </div>
        <input :style="widthStyle" class="value" v-text="obj.value" v-if="!obj.file" v-show="edit" v-model="obj.value"></input>
        <span :style="widthStyle" class="value" v-text="obj.value" v-if="!obj.file" v-show="!edit"></span>
        <span :style="widthStyle" v-if="obj.file&&!obj.value" v-show="!edit" class="value"></span>
        <span :style="widthStyle" v-if="obj.file&&obj.value" v-show="!edit" class="value"><i class="el-icon-picture"></i></span>
        <el-upload
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
    <!--             
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    -->
</div>

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
      required: true
    }
  },
  data() {
    return {
      widthStyle: "",
      name: ""
    };
  },
  methods: {
    getWitdthStyle() {
      this.widthStyle = `width:${this.width}px`;
    },
    setName(name) {
      this.name = name;
    },
    onChange(event) {
      this.$emit("fileChange", this.name, event.raw);
    }
  },
  mounted() {
    this.getWitdthStyle();
  }
};
</script>

<style scoped lang="scss">
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



