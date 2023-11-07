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
        @click="handleClick(link)"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="cityText" cols="12">
        {{ new Date().getFullYear() }} — <strong>City of Bolivar</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
// import css
import '@/css/footer.css';
export default {
  data: () => ({
    links: [
      {
        name: "Home",
        to: "/",
      },
      {
        name: "About",
        to: "/about",
      },
      {
        name: "Contact Us",
        to: "https://bolivar.mo.us/contact-us/",
      },
    ],
  }),
  methods: {
    handleClick(link) {
      var a = document.createElement("a");
      a.href = link.to;
      a.click()

    },
  },
};
</script>

