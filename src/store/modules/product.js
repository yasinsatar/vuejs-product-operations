import Vue from "vue";
const state = {
  products : []
}

const getters = {
  getProducts(state){
    return state.products;
  },
  getProduct(state){

  }
}

const mutations = {
  updateProductList(state, product){
    state.products.push(product);
  }
}

const actions = {
  initApp({commit}){
    // Vue Resource
  },
  saveProduct({dispatch,commit,state}, product){

    //You must root directory in add .env file and variable VUE_APP_FIREBASE_URL= "YOUR FIREBASE REALTIME DATABASE URL"
     Vue.http.post(process.env.VUE_APP_FIREBASE_URL+"/products.json", product)
    .then((response) => {
      // Product list uptaded
      product.key = response.body.name;
      commit("updateProductList", product);

      let tradeResult = {
        purchase: product.price,
        sale:0,
        count: product.count,
      }
      dispatch("setTradeResult", tradeResult)
    })
  },
  sellProduct({commit}, payload){
    // Vue Resource
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
