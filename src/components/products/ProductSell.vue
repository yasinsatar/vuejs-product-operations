<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>Ürün Çıkışı</h3>
          <hr>
          <div class="form-group">
            <label>Ürün Adı</label>
            <select class="form-control" v-model="selectedProductKey" @change="productSelected">
              <option value="null" disabled>Please select product</option>
              <option v-for="product in getProducts" :value="product.key" :disabled="product.count == 0">{{
                  product.title
              }}</option>
            </select>
          </div>
          <transition name="fade" mode="out-in">
            <div class="card mb-2 border border-danger" v-if="selectedProduct !== null">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 text-center">
                    <div class="mb-3">
                      <span class="badge badge-info">Stok : {{ selectedProduct.count }}</span>
                      <span class="badge badge-primary">Fiyat : {{ selectedProduct.price | currency }}</span>
                    </div>
                    <p class="border border-warning p-2 text-secondary">{{ selectedProduct.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="form-group">
            <label>Adet</label>
            <input type="text" v-model="product_count" class="form-control" :class="{ 'border border-danger' : product_count > (selectedProduct && selectedProduct.count)}" placeholder="Ürün adetini giriniz..">
            <div class="alert alert-danger mt-2 " v-show="product_count > (selectedProduct && selectedProduct.count)">Quantity cannot exceed the default quantity.</div>
          </div>
          <hr>
          <button @click="sellProduct" :disabled="disabled" class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedProductKey: null,
      selectedProduct: null,
      product_count: null,
      saveButtonClicked: false,
    }
  },
  methods: {
    productSelected() {
      this.selectedProduct = this.$store.getters.getProduct(this.selectedProductKey)[0];
    },
    sellProduct() {

      if (this.product_count <= 0) {
        alert("The quantity cannot be less than or equal to zero.");
        return false;
      }
      if ((this.selectedProduct.count - this.product_count) < 0) {
        alert("Quantity cannot exceed the default quantity.");
        return false;
      }
      this.saveButtonClicked = true;
      let product = {
        key: this.selectedProductKey,
        count: this.product_count
      }
      this.$store.dispatch("sellProduct", product);

    }
  },
  computed: {
    ...mapGetters(["getProducts"]),
    disabled() {
      return !(this.selectedProduct !== null && this.product_count > 0 );
    },
    isLoading(){
      if(this.saveButtonClicked){
        return{
          display: "block"
        }
      }else{
        return{
          display: "none"
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.saveButtonClicked && (this.selectedProduct !== null || this.product_count>0)) {
      if (confirm("There is unsaved data. Do you still want to go out?")) {
        next();
      }
      else {
        next(false);
      }
    } else {
      next();
    }

  }
}
</script>

<style>
.border-danger {
  border-style: dashed !important;
}

</style>
