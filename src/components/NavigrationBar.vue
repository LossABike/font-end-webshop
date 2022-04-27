<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://i2.wp.com/www.terabox.vn/wp-content/uploads/2018/08/azure.microsoft.com_.png?ssl=1"
          height="60"
          class="mr-2"
        />
      </template>

      <template #end>
        <InputText type="text" v-model="search"/>
        <router-link :to="{ name: 'Search', params: { items: this.search.replace(/\s/g, '').trim().toLowerCase() } }" v-if="search"> Find </router-link>
        
      </template>
    </Menubar>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
//import InputText from 'primevue/inputtext';
export default {
  data() {
    return {
      items: [
        {
          label: "Shop",
          icon: "pi pi-fw pi-shopping-bag",
          
           to: {
            name : 'Shop',

           }
        },
        {
          label: "Tracking",
          icon: "pi pi-fw pi-directions",
          // to: {
          //   name :"Tracking",

          // }
        },
        {
          label: "Cart",
          icon: "pi pi-fw pi-shopping-cart",
          to: {
            name :"Cart",
          }
        },
        {
          label: "Contact",
          icon: "pi pi-fw pi-phone",
          // to: {
          //   name :"Cart",

          // }
        },
      ],
      search: "",
      
      
    };
  },
  components: { Menubar, InputText , Button },
  methods : { 
    
  },
  
  created() { 
    this.search="";
  },
};

</script>
