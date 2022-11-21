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
  saveProduct({commit}, payload){

    //You must root directory in add .env file and variable VUE_APP_FIREBASE_URL= "YOUR FIREBASE URL"
     Vue.http.post(process.env.VUE_APP_FIREBASE_URL+"/products.json", payload)
    .then((response) => {
      console.log(response);
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
