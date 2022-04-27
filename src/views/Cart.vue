<template>
  
    <div class="card">
    <h1>{{this.getItemsInCart}}</h1>
        <OrderList v-model="getItemsInCart" listStyle="height:auto" >
            <template #header>
                Cart
            </template>
            <template #item="slotProps">
                <div class="product-item">
                    <div class="image-container">
                        <img :src="slotProps.item.image" :alt="slotProps.item.name" />
                         
                    </div>
                    <div class="product-list-detail">
                        <h6 class="mb-2">{{slotProps.item.name}}</h6>
                        <i class="pi pi-tag product-category-icon"></i>
                        <span class="product-category">{{slotProps.item.category}}</span>
                       
                    </div>
                     
                      
                        <Button icon="pi pi-times" class="p-button-rounded p-button-info" v-if="this.cartStore.checkQuantityItems(slotProps.item)<slotProps.item.qtyAvailable" @click="this.cartStore.adjustItems(slotProps.item, true)" >+</Button>
                        <Button icon="pi pi-times" class="p-button-rounded p-button-info" v-if="this.cartStore.checkQuantityItems(slotProps.item)>0" @click="this.cartStore.adjustItems(slotProps.item , false)" >-</Button>
                         <div class="product-list-detail">
                        
                        <div style="margin-top : 10px" class="product-category">Quantity: {{slotProps.item.qtyCart}}</div>
                        <span style="margin-top : 10px" class="product-category">Available: {{slotProps.item.qtyAvailable}}</span>
                        
                        </div>
                                           
                     <div class="product-list-action">
                        <h4 class="mb-2">${{slotProps.item.price}}</h4>
                        <span :class="'product-badge status-'+slotProps.item.inventoryStatus">{{slotProps.item.inventoryStatus}}</span>
                        
                        
                    </div>
                     <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="this.cartStore.deleteItems(slotProps.item)" />
                     
                </div>
                 
            </template>
        </OrderList>
        <div>     
         <h2 class="totalCart" v-if="this.cartStore.totalCart()" >Total: ${{this.cartStore.totalCart()}}</h2>
         <Button label="Success" class="p-button-success" style="margin-left : 70px" @click="redirectCheckOut()">Check Out</Button>
        </div>
       
    </div>
</template>

<script>
import Button from 'primevue/button';
import { mapStores } from 'pinia'
import { cartStore } from "@/storage/cart"
import OrderList from 'primevue/orderlist';

export default {
    
    components : {
        OrderList , Button 
    },
    computed : {
        ...mapStores (cartStore),
        getItemsInCart(){
            return this.cartStore.cartItems;
        },
       
    },
    methods : {
        removeItems(item){
            this.cartStore.deleteItems(item);
        },
         redirectCheckOut(){
        this.$router.push({name : "CheckOut"});
        },
        
    },
    created() {
       
    },
    mounted() {
        
    },
}
</script>
<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.product-item {
	display: flex;
	align-items: center;
	padding: .5rem;
	width: 100%;

	img {
		width: 75px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-right: 1rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.product-list-action {
		display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .product-category-icon {
        vertical-align: middle;
        margin-right: .5rem;
        font-size: .875rem;
    }

    .product-category {
        vertical-align: middle;
        line-height: 1;
        font-size: .875rem;
    }
}
.totalCart{
    margin-left:70px;
    color: rgb(41, 150, 177);
}

@media screen and (max-width: 576px) {
    .product-item {
        flex-wrap: wrap;

        .image-container {
            width: 100%;
            text-align: center;
        }

        img {
            margin: 0 0 1rem 0;
            width: 100px;
        }
    }
}
.p-button {
    margin: 2rem;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}

.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>