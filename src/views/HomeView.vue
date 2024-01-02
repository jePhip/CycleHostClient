<template>
  <CardMap />
  <Map />
  <RoutesTable />
  <br>
</template>

<script>
import { defineComponent } from 'vue';

//Components
import Map from '@/components/Map.vue'
import RoutesTable from '@/components/RoutesTable.vue'
export default defineComponent({
  name: 'HomeView',

  components: {
    Map,
    RoutesTable,
    
  },
});
</script>

<style>
.RoutesTable {
  scale: 80%
}
</style>