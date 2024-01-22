<template>
   <div class="desc">
        <strong class="text-decoration-bold">Description</strong>
        <p>
          {{ route?.desc }}
        </p>
      </div>
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