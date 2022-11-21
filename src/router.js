import Vue from "vue";
import VueRouter from "vue-router"

//components
import ProductList from "./components/products/ProductList"
import ProductSell from "./components/products/ProductSell"
import ProductPurchase from "./components/products/ProductPurchase"

Vue.use(VueRouter);

const routes = [
{ path: "/", component: ProductList},
{ path: "/product-operations", component: ProductPurchase},
{ path: "/product-sell", component: ProductSell},
{ path: "*", redirect: "/"},
];

export const router = new VueRouter({
  mode: "history",
  routes
});
