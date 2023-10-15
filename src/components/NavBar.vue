<template>
  <nav>
    <div class="navbar">
      <v-toolbar flat app>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text">
            <v-list-tile-content>
              <v-btn class="white--text" router :to="link.route">{{
                link.text
              }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    </div>
    <v-img class="logo" height="50" src="@/assets/logo.jpg" />
  </nav>

  <br />
</template>

<script>
import logo from "@/assets/logo.jpg";
export default {
  data() {
    return {
      links: [
        { text: "Home", route: "/" },
        { text: "About", route: "/about" },
        { text: "Edit Routes", route: "/add" },
      ],
    };
  },
};
</script>

<style>

</style>
