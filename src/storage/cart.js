import { defineStore } from "pinia";
import Service from "@/services/axios.service";

export const cartStore = defineStore("cart", {
	state() {
		return {
			cartItems: [],
			
		};
	},
	getters: {
		
		
	},
	actions: {
		adjustItems(item, option) {
			
			const index = this.cartItems.findIndex(items => items.id == item.id);
			if (index!=-1 && option == true) {
									
				this.cartItems[index].qtyCart++;
			}
			else if (index != -1 && option == false) {
				this.cartItems[index].qtyCart--;
			}
			else this.cartItems.push(item);
		},
		deleteItems(item) {
            // do filter tao array moi va tra ve nen pinia ko track dc thay doi => ko update
			this.cartItems = this.cartItems.filter(items => items.id != item.id); 
		},
		checkQuantityItems(item) {
			const result = this.cartItems.find(items => items.id == item.id);
			if (result != undefined)
				return result.qtyCart;
			return 0;
		},
		placeOrder(person) {

			const order = {
				nameUser : person.name,
				phone : person.phone,
			    email : person.email,
				address: person.address,
				items: this.cartItems,

			}
			
			Service.sendCart(order);
			this.cartItems = [];
			
		},
		totalCart() {
			
			const result = this.cartItems.reduce((total, Items) => {
				return total + (Items.price * Items.qtyCart);
			},0);
			return result;
			
		},
		
		
		
	},
});
