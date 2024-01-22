<template>
  <v-footer class="footer">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-container>
            <a href="https://forecast.weather.gov/MapClick.php?textField1=37.61&textField2=-93.41" target="_blank">
              <v-img src="@/assets/jpglogowhite.png" height="50px" ></v-img>  
            </a>
          </v-container>
        </v-col>
        <v-col cols="6">
          <v-container>
            <v-row justify="center">
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
        </v-container>
      </v-col>
      <v-col cols="3">
        
      </v-col>
      </v-row>  
    </v-container>
  </v-footer>
</template>
<script>
// import css
import "@/css/footer.css";
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
      a.click();
    },
  },
};
</script>
