<template>
  <v-card text="Clinton to Spf">
    <v-container> 
        <CardMap :route="route" />
     </v-container>
  </v-card>
</template>

<script>
import CardMap from "@/components/CardMap.vue";
export default {
    mounted(){
        console.log(this.route)
    },
  props: {
    route: null, //route inputed by parent component
  },
  components: {
    CardMap,
  },

};
</script>

<style></style>
