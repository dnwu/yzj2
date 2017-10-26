<template>
  <div style="height:500px">
    <h1>
      <span>敬</span>
      <span>请</span>
      <span>期</span>
      <span>待</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
      </h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
div{
  text-align: center;
}
h1 span {
  position: relative;
  top: 20px;
  display: inline-block;
  -webkit-animation: bounce .3s ease infinite alternate;
  animation: bounce .3s ease infinite alternate;
  font-family: 'Titan One', cursive;
  font-size: 80px;
  color: #F1C500;
  text-shadow: 0 1px 0 #F1C500,
  0 2px 0 #F1C500,
  0 3px 0 #F1C500,
  0 4px 0 #F1C500,
  0 5px 0 #F1C500,
  0 6px 0 transparent,
  0 7px 0 transparent,
  0 8px 0 transparent,
  0 9px 0 transparent,
  0 10px 10px rgba(0, 0, 0, .4);
  line-height: 500px;
}

h1 span:nth-child(2) {
  -webkit-animation-delay: .1s;
  animation-delay: .1s;
}

h1 span:nth-child(3) {
  -webkit-animation-delay: .2s;
  animation-delay: .2s;
}

h1 span:nth-child(4) {
  -webkit-animation-delay: .3s;
  animation-delay: .3s;
}

h1 span:nth-child(5) {
  -webkit-animation-delay: .4s;
  animation-delay: .4s;
}

h1 span:nth-child(6) {
  -webkit-animation-delay: .5s;
  animation-delay: .5s;
}

h1 span:nth-child(7) {
  -webkit-animation-delay: .6s;
  animation-delay: .6s;
}

h1 span:nth-child(8) {
  -webkit-animation-delay: .7s;
  animation-delay: .7s;
}

@-webkit-keyframes bounce {
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #CCC,
    0 2px 0 #CCC,
    0 3px 0 #CCC,
    0 4px 0 #CCC,
    0 5px 0 #CCC,
    0 6px 0 #CCC,
    0 7px 0 #CCC,
    0 8px 0 #CCC,
    0 9px 0 #CCC,
    0 50px 25px rgba(0, 0, 0, .2);
  }
}

@keyframes bounce {
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #CCC,
    0 2px 0 #CCC,
    0 3px 0 #CCC,
    0 4px 0 #CCC,
    0 5px 0 #CCC,
    0 6px 0 #CCC,
    0 7px 0 #CCC,
    0 8px 0 #CCC,
    0 9px 0 #CCC,
    0 50px 25px rgba(0, 0, 0, .2);
  }
}
</style>
