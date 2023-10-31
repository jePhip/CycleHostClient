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
    </v-container>    
  </nav>

 
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: "Home", route: "/" },
        { text: "About", route: "/about" },
<<<<<<< HEAD
        { text: "Edit Routes", route: "/add" },
        {text: "Admin Login", route: "/login"},
=======
        { text: "Edit Routes", route: "/edit" },
>>>>>>> e46965e68b4cf3387684a6600e323661f240fd27
      ],
    };
  },
};
</script>

<style>
  .navbar
  { 
    margin: auto;
    width: 100%;  
    padding: 10px;
    background-color: white;
  }

  .toolbar
  { 
    background-color: white; 
    width: max;
  }

  .logo
  { 
    
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
</style>