import Vue from "vue";
import {router} from "../../router";

const state = {
  products : []
}

const getters = {
  getProducts(state){
    return state.products;
  },
  getProduct(state){
    //The "key" captures the data sent to the "getter".
    return key => state.products.filter(element =>{
      return element.key == key;
    })
  }
}

const mutations = {
  updateProductList(state, product){
    state.products.push(product);
  }
}

const actions = {
  initApp({commit}){
    Vue.http.get(process.env.VUE_APP_FIREBASE_URL+"/products.json")
    .then(response =>{
      let data = response.body;
      for(let key in data){
        data[key].key = key;
        commit("updateProductList", data[key]);
      }
    })
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
      router.replace("/");
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
