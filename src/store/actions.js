import Vue from "vue";

export const setTradeResult = ({state,commit},tradeResult)=> {

  let purchase = state.purchase;
  let sale =  state.sale;
  purchase += parseFloat(tradeResult.purchase) * parseInt(tradeResult.count);
  sale += parseFloat(tradeResult.sale) * parseInt(tradeResult.count);

  let tradeData = {
    purchase:purchase,
    sale:sale
  }
  Vue.http.put(process.env.VUE_APP_FIREBASE_URL+"/trade-result.json", tradeData)
  .then(response =>{
    commit("updateTradeResult", tradeResult);
    console.log(response);
  })
}

export const getTradeResult = ({commit}) =>{

  Vue.http.get(process.env.VUE_APP_FIREBASE_URL+"/trade-result.json")
  .then(response =>{
    commit("updateTradeResult", response.body);
    console.log(response);
  });


}
