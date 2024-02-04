<template>
   <v-container class="desc">
        <strong class="text-decoration-bold">Description</strong>
        <p>
          {{ route?.desc }}
        </p>
      </v-container>
</template>

<script>
export default {
    props:{
        route: null
    },
}
</script>

<style>

</style>