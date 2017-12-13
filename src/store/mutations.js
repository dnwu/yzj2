import * as types from './mutation-type'

const mutations = {
  [types.SET_USERNAME](state,username) {
    window.localStorage.setItem("username", username);
    state.username = username
  },
  airShow (state) {
    state.airSelect = !state.airSelect
  },
  fuelShow (state) {
    state.fuelSelect = !state.fuelSelect
  },
  landShow (state) {
    state.landSelect = !state.landSelect
  },
  homeShow (state) {
    state.homeSelect = !state.homeSelect
  },
  dispatchShow (state) {
    state.dispatchSelect = !state.dispatchSelect
  },
  airForm(state, price) {
    state.airCost = price
  },
  fuelForm(state, price) {
    state.fuelCost = price
  },
  exportForm(state, price) {
    state.exportCost = price
  },
  landForm(state, price) {
    state.landCost = price
  },
  minForm(state, price) {
    state.minCost = price
  },
  formForm(state, price) {
    state.formCost = price
  },
  productForm(state, price) {
    state.productCost = price
  },
  dispatchForm(state, price) {
    state.dispatchCost = price
  },
  insuranceForm(state, price) {
    state.insuranceCost = price
  },
  safeForm(state, price) {
    state.safeCost = price
  },
  getWeight(state, index) {
    state.weightNum = index
  },
  getSum (state, price) {
    state.sum = price
  },
  getIndex (state) {
    state.nowIndex++
  },
  minIndex(state){
    state.nowIndex--
  },
  goIndex(state, index) {
    state.nowIndex = index
  },
  fristIndex(state) {
    state.nowIndex = 0
  },
  secondIndex(state){
    state.nowIndex = 1
  },
  list(state, select) {
    if (select) {
      state.sum += state.airCost*(state.weightNum)
      state.sum += state.fuelCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.airCost*(state.weightNum))*10)/10
      state.sum = parseInt((state.sum - state.fuelCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  export(state, select) {
    if (select) {
      state.sum += state.exportCost*(state.weightNum)
      state.sum += state.formCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.exportCost*(state.weightNum))*10)/10
      state.sum = parseInt((state.sum - state.formCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  land(state, select) {
    if (select) {
      state.sum += state.productCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.productCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  home(state, select) {
    if (select) {
      state.sum += state.landCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.landCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  dispatch(state, select) {
    if (select) {
      state.sum += state.dispatchCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.dispatchCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  insurance(state, select) {
    if (select) {
      state.sum += state.insuranceCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.insuranceCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  traffic(state, select) {
    if (select) {
      state.sum += state.safeCost*(state.weightNum)
      state.sum = parseInt(state.sum*10)/10
    } else {
      state.sum = parseInt((state.sum - state.safeCost*(state.weightNum))*10)/10
      state.sum = parseInt(state.sum*10)/10
    }
  },
  type (state, value) {
    if (value == '选项一') {
      state.productType = '普货'
    } else {
      state.productType = '特殊货物'
    }
  },
  startTime(state, value) {
    state.startDate = value
  },
  endTime(state, value) {
    state.endDate = value
  },
  startLand(state, value) {
    state.startLand = value
  },
  endLand(state, value) {
    state.endLand = value
  },
  [types.SET_TOKEN](state,token){
    window.localStorage.setItem("token", token);
    state.token = token
  },
  [types.SET_ID](state,id){
    window.localStorage.setItem("id", id);
    state.id = id
  },
  [types.LOGOUT](state){
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('id');
    state.token = null
    state.usertype = null
    state.id = null
  },
  [types.SET_USERTYPE](state,usertype){
    window.localStorage.setItem("usertype", usertype);
    state.usertype = usertype
  }

}
export default mutations
      //this.$store.commit('airForm', this.costDetail.air)
      //this.$store.commit('fuelForm', this.costDetail.fuel)
      //this.$store.commit('exportForm', this.costDetail.export)
      //this.$store.commit('landForm', this.costDetail.land)
      //this.$store.commit('minForm', this.costDetail.min)
      //this.$store.commit('formForm', this.costDetail.form)
      //this.$store.commit('productForm', this.costDetail.product)
      //this.$store.commit('dispatchForm', this.costDetail.dispatch1)
      //this.$store.commit('insuranceForm', this.costDetail.insurance)
      //this.$store.commit('safeForm', this.costDetail.safe)
