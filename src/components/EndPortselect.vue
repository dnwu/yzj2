<template>
  <div>
    <el-select @change="change" v-model="value" filterable placeholder="目的港">
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
  name: "Portselect",
  data() {
    return {
      portList: [],
      value: ""
    };
  },
  // props: {
  //   placeHolder: {
  //     type: String,
  //     default: "始发港"
  //   }
  // },
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
