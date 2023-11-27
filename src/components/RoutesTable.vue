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
    <v-data-table :headers="headers" :items="routes" :search="search">
      <template #item.name="{ item }">
        <a target="" :href="'/route/'+ item.id" @click="handleClick"
          ><!-- eventually to route page -->
          {{ item.name }}
        </a>
      </template>
      <template #item.gpx="{ item }">
        <div class="gpxBtn">
          <v-btn
            icon="mdi-download"
            @click="downloadGPX(item.gpx, item.name)"
          /><!-- add download functionality -->
        </div>
      </template>
      <template #item.length="{ item }">
        <p>
          {{ item.length }}
      </p>
      </template>
      <template #item.difficulty="{ item }">
        <p>
          {{ item.difficulty }}
      </p>
      </template>
      <template #item.terrain="{ item }">
        <p>
          {{ item.terrain }}
      </p>
      </template>
      <template #item.elevation="{ item }">
        <p>
          {{ item.elevation }}
      </p>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
// stylesheet
import '@/css/routes-table.css';

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
        { key: "length", title: "Length (miles)" },
        { key: "terrain", title: "Terrain" },
        { key: "difficulty", title: "Difficulty" },
        { key: "elevation", title: "Elevation Gain (feet)" },
        
      ],
      routes: [],
    };
  },

  methods: {
    async downloadGPX(file, routeName) {
      file = atob(file);
      const blob = new Blob([file], { type: "text/plain" }); //TODO: store gpx as blob in db instead of base64
      var gpxtext = await blob.text()

      var filename = routeName + ".gpx";
      var pom = document.createElement("a");
      var bb = new Blob([gpxtext], { type: "text/plain" });

      pom.setAttribute("href", window.URL.createObjectURL(bb));
      pom.setAttribute("download", filename);

      pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(
        ":"
      );
      pom.draggable = true;
      pom.classList.add("dragout");

      pom.click();
    },
    async fetchRoutes() {
      try {
        let response = await fetch("http://localhost:3000/v1/geo"); //eventually change to env variable
        response = await response.json();
        this.routes = response.routes.map((r) => {

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

