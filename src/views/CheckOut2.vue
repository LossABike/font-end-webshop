<template>
    <div class="form-demo" >
        

        <div class="flex justify-content-center">
            <div class="card">
                <h1 class="text-center">INFORMATION ORDER</h1>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name*</label>
                        </div>
                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
                    </div>
                   
                    
                    <div class="field">
                        <div class="p-float-label">
                            <Dropdown id="country" v-model="country" :options="countries" optionLabel="name" />
                            <label for="country">Country</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="address" v-model="v$.address.$model" :class="{'p-invalid':v$.address.$invalid && submitted}" />
                            <label for="address" :class="{'p-error':v$.address.$invalid && submitted}">Address</label>
                        </div>
                        <small v-if="(v$.address.$invalid && submitted) || v$.address.$pending.$response" class="p-error">{{v$.address.required.$message.replace('Value', 'Adress')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="phone" v-model="v$.phone.$model" :class="{'p-invalid':v$.phone.$invalid && submitted}" />
                            <label for="phone" :class="{'p-error':v$.phone.$invalid && submitted}">Phone Number</label>
                        </div>
                        <small v-if="(v$.address.$invalid && submitted) || v$.address.$pending.$response" class="p-error">{{v$.address.required.$message.replace('Value', 'Adress')}}</small>
                    </div>
                    <div class="field-checkbox">
                        <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
                        <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">I agree to the terms and conditions*</label>
                    </div>
                    <Button type="submit" label="Submit" class="mt-2"></Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import CountryService from '@/assets/countryData.json';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import {mapStores} from 'pinia'
import {cartStore} from '@/storage/cart'
export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            name: '',
            email: '',
            password: '',
            address: '',
            phone : '',
            country: null,
            accept: null,
            submitted: false,
            countries: null,
            showMessage: false,
           
        }
    },
    components : {Dropdown , Checkbox, Password, Button , Divider , InputText , Dialog},
    countryService: null,
    computed : {
        ...mapStores(cartStore),
    },
    validations() {
        return {
            name: {
                required
            },
            email: {
                required,
                email
            },
            address: {
                required
            },
            phone: {
                required
            },
            accept: {
                required
            }
        }
    },
    created() {
               
    },
    mounted() {
        this.countries = CountryService.data;
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

            this.toggleDialog();
            const person = {
                name : this.name,
                email : this.email,
                address : this.address,
                phone : this.phone,
            }
            this.cartStore.placeOrder(person);
            this.$router.push({ name: "Shop" })
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
        
            if(!this.showMessage) {
                this.resetForm();
            }
            
        },
        
        resetForm() {
            this.name = '';
            this.email = '';
            this.password ='';
            this.phone='',
            this.address='',
            this.country = null;
            this.accept = null;
            this.submitted = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.form-demo {
    .card {
        min-width: 450px;

        form {
            margin-top: 2rem;
        }

        .field {
            margin-bottom: 1.5rem;
        }
       
    }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
}

</style>