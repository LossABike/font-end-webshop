import { createWebHistory, createRouter } from "vue-router";
import Shop from "@/views/Shop.vue";
import Cart from "@/views/Cart.vue";
const routes = [
  {
    path: "/",
    name: "Shop",
    component: Shop,
    alias : "/home"
  },

  {
    path: "/search/:items",
    name: "Search",
    
    component: Shop,
    props: (route) => ({ 
      ...route.params,
      
    })
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Notfound.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component : Cart,
    
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component : ()=> import("@/views/CheckOut2.vue")
  },
  {
    path: "/admin/manage",
    name: "Manage",
    component: () => import("@/views/manage-items.vue")
    
  }
  
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
