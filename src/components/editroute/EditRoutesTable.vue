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
    <br />
    <v-row justify="center">
      <v-dialog>
        <template v-slot:activator="{ props }">
          <v-btn flat v-bind="props"
            ><v-icon icon="mdi-plus" />Add a new route</v-btn
          >
        </template>

        <template v-slot:default="{ isActive }">
          <v-card style="color: blue" title="Add Route">
            <v-form
              class="routeForm"
              validate-on="submit lazy"
              @submit.prevent="submit"
              ref="form"
            >
              <v-row justify="center">
                <v-col cols="9">
                  <v-text-field
                    label="Route Name"
                    prepend-icon="mdi-bike"
                    class="routeName"
                    type="text"
                    variant="outlined"
                    name="routeName"
                    v-model="routeName"
                    :rules="inputRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="9">
                  <v-select
                    label="Select Terrain:"
                    prepend-icon="mdi-road"
                    v-model="terrain"
                    :items="['Paved', 'Gravel', 'Dirt']"
                    :rules="inputRules"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="9">
                  <v-select
                    label="Select Difficulty: "
                    prepend-icon="mdi-alert"
                    v-model="difficulty"
                    :items="['Beginner', 'Intermediate', 'Expert']"
                    :rules="inputRules"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="9">
                  <v-textarea
                    label="Route Description"
                    prepend-icon="mdi-pencil"
                    class="routeDesc"
                    type="text"
                    variant="outlined"
                    name="routeDesc"
                    v-model="routeDesc"
                    :rules="inputRules"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="9">
                  <v-file-input
                    label="Upload .gpx File"
                    variant="outlined"
                    accept=".gpx"
                    type="file"
                    ref="file"
                    :rules="inputRules"
                    prepend-icon="mdi-map"
                    required
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col justify="center">
                  <v-btn type="submit" flat>submit</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </template>
      </v-dialog>

      <v-dialog width="500">
        <template v-slot:activator="{ props }"> </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Add Route"> </v-card>
        </template>
      </v-dialog>
    </v-row>
    <v-data-table
      class="routes-table"
      :headers="headers"
      :items="routes"
      :search="search"
    >
      <template #item.name="{ item }">
        <a target="" :href="'/route/' + item.id"
          >
          {{ item.name }}
        </a>
      </template>
      <template #item.edit="{ item }">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn class="tableBtn" v-bind="props" icon="mdi-pencil"> </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Edit Route">
              <v-card-text>ID: {{ item.id }}</v-card-text>
              
            </v-card>
          </template>
        </v-dialog>
      </template>
      <template #item.del="{ item }">
        <div class="tableBtn">
          <v-btn
            icon="mdi-trash-can"
            @click="del(item.id)"
          /><!-- add download functionality -->
        </div>
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
    title: "Routes",
  },
  { key: "edit", title: "Edit", sortable: false },
  { key: "del", title: "Delete", sortable: false },
]);

const routeStore = useRouteStore();
const { getRoutes } = storeToRefs(routeStore);
let routes = computed(() => routeStore.getRoutes);

let del = async (id) => {
  routeStore.deleteRoute(id);
};
let add = async () => {};
let edit = async (id) => {};
let routeName = ref("");
let routeLength = ref();
let terrain = ref("");
let difficulty = ref("");
let routeDesc = ref("");
let file = ref();
let gpx = ref();
let newRoute = ref();
let elevation = ref();
//add route methods
let submit = async (event) => {
  const check = (await event).valid;
  if (check) {
    try {
      await handleFile();
      //create route and send it to the backend
      let routeToAdd = {
        route: newRoute.value,
        name: routeName.value,
        gpx: gpx.value,
        difficulty: difficulty.value,
        length: routeLength.value,
        terrain: terrain.value,
        desc: routeDesc.value,
        elevation: elevation.value,
      };

      routeStore.addRoute(routeToAdd);
    } catch (error) {
      console.log("error", error);
    } //
  }
};
let handleFile = () => {
  return new Promise((resolve, reject) => {
    try {
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const tj = require("@tmcw/togeojson"); //gpx to json converter
          const fileContent = file.value.files[0];
          //gpx text -> base64 to be stored in db
          const blob = new Blob([fileContent], { type: "text/plain" });
          const text = await blob.text();
          gpx.value = btoa(text);
          //make the text into a gpx file and parse it into a json object
          const gpxFile = new DOMParser().parseFromString(text, "text/xml");
          const converted = tj.gpx(gpxFile);
          newRoute.value = converted;

          const coords = converted.features[0].geometry.coordinates;
          //max locations per request is 512
          let countBy = Math.ceil(coords.length / 512);
          let elevArr = {};
          let count = 0;
          for (let i = 0; i < coords.length; i = i + countBy) {
            elevArr[count] = {
              latitude: coords[i][1],
              longitude: coords[i][0],
            };
            count++;
          }
          //get elevation at coord points from backend
          let eresponse = await fetch(`http://localhost:3000/v1/geo/e`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(elevArr),
          });
          eresponse = await eresponse.json();
          //elevation gain
          elevArr = eresponse.response.results;
          let egain = 0;
          let diff = 0;
          for (let i = 1; i < elevArr.length; i++) {
            diff = elevArr[i].elevation - elevArr[i - 1].elevation;
            //only positive elevation changes are added
            if (diff > 0) {
              egain += diff;
            }
          }
          egain = Math.round(egain * 3.28084 * 10) / 10; //meters to feet, rounded to 1 decimal
          elevation.value = egain;
          //route length/distance
          let totalDistance = 0;
          let lat1 = 0;
          let long1 = 0;
          let lat2 = 0;
          let long2 = 0;
          for (let i = 0; i < coords.length - 1; i++) {
            const d2ra = (angle) => (angle * Math.PI) / 180; //degrees to radians
            lat1 = d2ra(coords[i][1]);
            long1 = d2ra(coords[i][0]);
            lat2 = d2ra(coords[i + 1][1]);
            long2 = d2ra(coords[i + 1][0]);
            //use haversine formula to calculate distance between the two points
            const diffLat = lat2 - lat1; //distance between each point
            const diffLong = long2 - long1;
            const a =
              Math.sin(diffLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(diffLong / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const radius = 6371000; //earths radius
            const distance = radius * c;
            totalDistance += distance;
          }

          routeLength.value =
            Math.round((totalDistance / 1000) * 0.621371 * 10) / 10; //meters to miles, rounded to 1 decimal
          let f = (response) => {
            // request succeeded
            resolve(response);
          };
          f();
        };
        reader.readAsText(file.value.files[0]);
      }
    } catch (e) {
      reject(e);
    }
  });
};
</script>

<style scoped>
.tableBtn {
  scale: 80%;
}
.dialogBtn {
  scale: 80%;
}
</style>
