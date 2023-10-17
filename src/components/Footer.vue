<template>
  <v-footer class="footer">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="cityText" cols="12">
        {{ new Date().getFullYear() }} — <strong>City of Bolivar</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>

<style>
  .footer {
    background-color: rgb(101, 101, 221);
  }
  .cityText {
    text-align: center;
    color: white;
  }
</style>
