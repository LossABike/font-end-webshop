<script>
import NavigrationBar from "@/components/NavigrationBar.vue"
export default {
  components: {
      NavigrationBar
  },
};
</script>

<template>
   <NavigrationBar  />    
   
    <router-view ></router-view>

    
</template>

