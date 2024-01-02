<template>
  <RouteCard  :route="Frisco" />
  <Map />
  <RoutesTable />
  <br>
</template>

<script>
import { defineComponent } from 'vue';

//Components
import Map from '@/components/Map.vue'
import RoutesTable from '@/components/RoutesTable.vue'
import RouteCard from '@/components/RouteCard.vue'
import Frisco from '@/data/Frisco.json'
export default defineComponent({
  mounted(){
    console.log("routes", Frisco)
  },
  name: 'HomeView',

  components: {
    Map,
    RoutesTable,
    RouteCard,
  },
});
</script>

<style>
.RoutesTable {
  scale: 80%
}
</style>