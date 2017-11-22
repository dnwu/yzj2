<template>
  <div>
    <waiting></waiting>
  </div>
</template>
<script>
import Waiting from "@/components/waiting";
export default {
  components: { Waiting },
  created() {
    this.$emit("sonPath", this.$route.fullPath);
  }
};
</script>
