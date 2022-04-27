<template>
    <div class="card">
        <h1>ORDER INFORMATIONS</h1>
         <h2>Name</h2>
        <div  class="p-float-label">
            <InputText id="username" type="text" v-model="this.person.name"  />
            
        </div>
        <h2>Contact</h2>
        <div class="p-float-label">
            <InputText id="username" type="text" v-model="this.person.phone" />
            <label for="username">Phone number</label>
        </div>
       <h2>Shipping Address</h2>
        <div class="p-float-label">
            <InputText id="username" type="text" v-model="this.person.address" />
            
        </div>
        <h2>Note</h2>
        <div class="p-float-label">
            <Textarea v-model="this.person.note"  rows="5" cols="30" />
            
        </div>
        <Button label="Success"  class="p-button-success btn-custom" @click="placeOrders(person)">Place Order </Button>
        
    </div>

</template>

<script>
import {mapStores} from 'pinia'
import {cartStore} from '@/storage/cart'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
export default {
    data() {
        return {
            person : { 
                name : "",
                phone : "",
                address : "",
                note : "",
            }
        }
    },
    computed :{
        ...mapStores(cartStore), 
        
    },
    components :{InputText , Button,Textarea}
    ,
    methods : {
        
    },
    created(){
        this.person = {}
    }
}
</script>

<style lang="scss" scoped>
.sizes {
    .p-inputtext {
        display: block;
        margin-bottom: .5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
.btn-custom{
    margin-left :50px;
    margin-top:20px;
}
.field * {
    display: block;
    
}
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 1rem;
    margin-left : 700px;
    margin-right : 800px;
    margin-top :50px;
    padding-left : 100px
}
</style>