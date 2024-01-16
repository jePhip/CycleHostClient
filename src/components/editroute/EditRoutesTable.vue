<template>
  <v-data-table :headers="headers" :items="routes">
    <template #item.name="{ item }">
      <a target="" :href="'/route/' + item.id" @click="handleClick"
        >
        {{ item.name }}
      </a>
    </template>
    <template #item.gpx="{ item }">
      <div class="gpxBtn">
        <v-btn
          icon="mdi-download"
          @click="downloadGPX(item.gpx, item.name)"
        />
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
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Edit Routes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ "l" }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
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

  //download to users machine
  let pom = document.createElement("a");
  let bb = new Blob([gpxtext], { type: "application/gpx+xml" });

  pom.setAttribute("href", window.URL.createObjectURL(bb));
  pom.setAttribute("download", filename);

  pom.dataset.downloadurl = [
    "application/gpx+xml",
    pom.download,
    pom.href,
  ].join(":");
  pom.draggable = true;
  pom.classList.add("dragout");

  pom.click();
};
</script>
