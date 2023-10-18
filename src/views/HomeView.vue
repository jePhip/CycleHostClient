<template>
  <Map />
</template>

<script>
import { defineComponent } from 'vue';

//Components
import Map from '@/components/Map.vue'
export default defineComponent({
  name: 'HomeView',

  components: {
    Map,
  },
});
</script>
