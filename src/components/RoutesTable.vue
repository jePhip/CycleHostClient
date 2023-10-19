<template>
  <v-card>
    <v-card-title>
      <!-- title? -->
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="routes"
      :search="search"
    >
    <template #item.name="{ item }">
        <a target="" href="/route" @click="handleClick"><!-- eventually to route page -->
        {{ item.name }}
        </a>
    </template>
    <template  #item.gpx="{ item }">
        <div class="gpxBtn">
            <v-btn @click="downloadGPX">
            Download <!-- add download functionality -->
            </v-btn>
        </div>
        
    </template>

</v-data-table>
    
  </v-card>
</template>
<script>
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";

export default {
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  async mounted() {
    //console.log("mounted")
    await this.fetchRoutes();
    //console.log(this.routes)
  },
  data() {
    return {
      search: "",
      headers: [
        {
          align: "start",
          key: "name",
          sortable: true,
          title: "Routes",
        },
        { key: "gpx", title: "" },
      ],
      routes: [],
    };
  },

  methods: {
    downloadGPX(){
        console.log("clicked")
    },
    async fetchRoutes() {
      try {
        let response = await fetch("http://localhost:3000/v1/geo"); //eventually change to env variable
        response = await response.json();
        this.routes = response.routes.map((r) => {
          console.log({...r});
          return {
            ...r,
          };
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
    .gpxBtn {
        scale: 85%;
        color: blue;
    }
</style>
