<template>
  <link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css"/>
  <h1 v-if="checkCart">items {{this.checkCart}}</h1>
  <div class="card" >
    <DataView
      v-if="productData"
      :value="productData"
      
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.name"
            />
            <div class="product-list-detail">
              
              <div class="product-name" ><router-link class="product-name" to="/home"> {{ slotProps.data.name }}</router-link> </div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              ></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{
                slotProps.data.category
              }}</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                @click="addItem(slotProps.data)"
                 v-if="this.cartStore.checkQuantityItems(slotProps.data) < slotProps.data.quantity"
              ></Button>
               <Button label="Secondary" class="p-button-secondary"  v-if="this.cartStore.checkQuantityItems(slotProps.data) >= slotProps.data.quantity">OUT OF STOCK</Button>
              <span
                :class="
                  'product-badge status-' + slotProps.data.inventoryStatus
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{
                  slotProps.data.category
                }}</span>
              </div>
              <span
                :class="
                  'product-badge status-' +
                  slotProps.data.inventoryStatus.toLowerCase()
                "
                >{{ slotProps.data.inventoryStatus }}</span
              >
            </div>
            <div class="product-grid-item-content">
              <img
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                :alt="slotProps.data.name"
              />
              <div class="product-name"><router-link class="product-name" to="/home"> {{ slotProps.data.name }}</router-link></div>
              
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              ></Rating>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <Button
                icon="pi pi-shopping-cart"
                :disabled="
                  slotProps.data.inventoryStatus.toLowerCase() === 'OUTOFSTOCK'
                "
                v-if="this.cartStore.checkQuantityItems(slotProps.data) < slotProps.data.quantity"
              ></Button>
              <Button label="Secondary" class="p-button-secondary"  v-if="this.cartStore.checkQuantityItems(slotProps.data)>=slotProps.data.quantity">OUT OF STOCK</Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    
  </div>
  
</template>

<script>


import DataView from "primevue/dataview";
import Button from "primevue/button";
import Rating from "primevue/rating";
import Dropdown from "primevue/dropdown";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import { mapStores } from 'pinia';
import { cartStore } from "@/storage/cart"
import Service from "@/services/axios.service";

export default {
 props : {
    items : { type: String , required : false}
  },
  data() {
    return {
      quantityCart : 0,

      products: null,
      layout: "list",
      sortKey: null,
      sortOrder: null,
      sortField: false,
      product : [],
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
    };
  },
  components: {
    DataView,
    Button,
    Rating,
    Dropdown,
    DataViewLayoutOptions,
    
  }, 
  computed : {
    
    productData (){
          
          if(!this.items) 
          return this.products;
          if(this.items){
          this.product = [];
          this.notFound = false;
          this.items.trim();
          this.product.push( this.products.find(product=>product.name.replace(/\s/g, '').trim().toLowerCase().includes(this.items)));
          if(this.product[0]==null) return 
          return this.product;
           
          }
               
          
    },
    ...mapStores(cartStore),
    checkCart(){
      return this.cartStore.cartItems;
    },

    
  },
     
  methods: {
    //...mapActions(cartStore, ['addItems']),
    
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }

    },
    addItem(items){
      const item = {
        name : items.name,
        id : items.id,
        qtyAvailable : items.quantity,
        price : items.price,
        category : items.category,
        image : items.image,
        qtyCart : 1,
      }
      this.quantityCart++;
      this.cartStore.adjustItems(item , true);
    },
    async retrieveItems() {
      try {
        this.products = await Service.getAllItems();
      } catch (error) {
        console.log(error);
      }
    },
  
  },
  
  created (){
    this.product = [];
    this.notFound=false;
    
    
  },
  mounted (){
    this.product = [];
    this.notFound=false;
    this.retrieveItems();
  }
 
 
}
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
