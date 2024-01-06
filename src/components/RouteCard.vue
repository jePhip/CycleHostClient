<template>
  <v-card class="mx-auto">
    <v-container>
      <v-card-title>{{ route.name }}</v-card-title>
      <CardMap :route="route" />
      <v-card-text>{{ route.length }} miles</v-card-text>
      <v-card-text>{{ route.elevation }} elevation</v-card-text>

      <v-card-actions>
        <v-btn router :to="link"> View Route </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import CardMap from "@/components/CardMap.vue";
export default {

  props: {
    route: null, //route inputed by parent component
    link: null,
  },
  data() {
    return {
      link: "/route/" + this.route.id,
    };
  },
  components: {
    CardMap,
  },
};
</script>

<style></style>
