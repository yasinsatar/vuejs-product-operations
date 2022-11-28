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
            <input type="text" class="form-control" placeholder="Ürün adetini giriniz..">
          </div>
          <hr>
          <button class="btn btn-primary">Kaydet</button>
        </div>
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
    }
  },
  methods: {
    productSelected() {
      this.selectedProduct = this.$store.getters.getProduct(this.selectedProductKey)[0];
    }
  },
  computed: {
    ...mapGetters(["getProducts"]),

  },
}
</script>

<style>
.border-danger {
  border-style: dashed !important;
}

</style>
