<template>
  <nav :elevation="24">
    <v-container justify-center class="navbar">
      <v-toolbar  class="toolbar" flat app>
        <v-img class="logo" src="@/assets/logo.jpg" />
        <v-spacer>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text">
            <v-list-tile-content>
              <v-btn class="white--text" router :to="link.route">{{
                link.text
              }}</v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-spacer>
      </v-toolbar>

      <v-navigation-drawer
        class="hamburger"
        v-model="drawer"
        location="bottom"
        temporary       
      >
        <v-list>
            <v-list-tile v-for="link in links" :key="link.text">
              <v-list-tile-content>
                <v-btn class="white--text" router :to="link.route">{{
                  link.text
                }}</v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>       

      </v-navigation-drawer>



    </v-container>    
  </nav>

 
</template>

<script>
// stylesheet
import '@/css/navbar.css'
export default {
  data() {
    return {
      links: [
        { text: "Home", route: "/" },
        { text: "About", route: "/about" },
        {text: "Admin Login", route: "/login"},
        { text: "Edit Routes", route: "/edit" },
      ],
    };
  },
};
</script>

