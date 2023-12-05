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
      class="routes-table"
      :headers="headers"
      :items="routes"
      :search="search"
    >
      <template #item.name="{ item }">
        <a target="" :href="'/route/' + item.id" @click="handleClick"
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
<script setup>
// stylesheet
import "@/css/routes-table.css";
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";

import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
let search = ref(""); //unused
let headers = reactive([
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
]);

const routeStore = useRouteStore();
const { getRoutes } = storeToRefs(routeStore);
let routes = computed(() => routeStore.getRoutes);


let downloadGPX = async (file, routeName) => {
  //convert from base64 to plain text
  file = atob(file);
  const blob = new Blob([file], { type: "text/plain" }); //TODO: store gpx as blob in db instead of base64
  let gpxtext = await blob.text();

  let filename = routeName + ".gpx";

  //download to users machine by creating html anchor element and clicking it
  let pom = document.createElement("a");
  let bb = new Blob([gpxtext], { type: "text/plain" });

  pom.setAttribute("href", window.URL.createObjectURL(bb));
  pom.setAttribute("download", filename);

  pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
  pom.draggable = true;
  pom.classList.add("dragout");

  pom.click();
};
</script>
