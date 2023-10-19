<template>
  <Map />
  <br>
  <br>
  <br>
  <h1>WIP Routes Table</h1>
  <br>
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
    RoutesTable
  },
});
</script>
