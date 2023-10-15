<template>
  <Map />
</template>

<script>
import { defineComponent } from 'vue';

//Components
import Map from '@/components/Map.vue'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  name: 'HomeView',

  components: {
    Map,
    //Footer
  },
});
</script>
