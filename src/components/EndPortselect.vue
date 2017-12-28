<template>
  <div>
    <el-select size="mini" @change="change" v-model="value" filterable :placeholder="placeholder">
      <el-option
        v-for="item in portList"
        :key="item.id"
        :label="item.cnName+'（'+item.airportCode+'）'"
        :value="item.cnName+'（'+item.airportCode+'）'">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      portList: [],
      value: ""
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "目的港"
    }
  },
  created() {
    this.getPortList();
  },
  methods: {
    getPortList() {
      this.portList = [];
      this.axios.get("/airport/list").then(data => {
        // console.log(data.data);
        this.portList.push(...data.data);
      });
    },
    change(data){
      this.$emit('endportvalue',data)
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
