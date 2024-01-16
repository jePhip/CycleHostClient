<template>
  <a target="" class="cardlink" :href="'/route/' + route.id">
    <v-card class="mx-auto" max-width="375" max-height="500">
      <CardMap :route="route" cover />

      <v-card-title>{{ route.name }}</v-card-title>
      <v-card-text>{{ route.length }} miles</v-card-text>
      <v-card-text>{{ route.difficulty }}</v-card-text>

      <v-card-actions>
        <v-btn router :to="link"> View Route </v-btn>
      </v-card-actions>
    </v-card>
  </a>
</template>

<script>
import CardMap from "@/components/cards/CardMap.vue";
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

<style>
.cardlink{
  text-decoration: none;
  color: inherit;
}
</style>
