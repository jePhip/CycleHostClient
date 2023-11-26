<template>
  <div class="add-route-container">
    <v-form class="routeForm" @submit.prevent="handleSubmit()" ref="form">
      <v-container class="input">
        <v-text-field
          label="Route Name"
          prepend-icon="mdi-bike"
          class="routeName"
          type="text"
          variant="outlined"
          name="routeName"
          v-model="routeName"
          required
        ></v-text-field>
        <v-container class="filter">
          <v-select
            label="Select Terrain:"
            v-model="terrain"
            :items="['Paved', 'Gravel', 'Dirt']"
          >
          </v-select>
          <v-select
            label="Select Difficulty: "
            v-model="difficulty"
            :items="['Beginner', 'Intermediate', 'Expert']"
          >
          </v-select>
        </v-container>
        <v-textarea
          label="Route Description"
          prepend-icon="mdi-pencil"
          class="routeDesc"
          type="text"
          variant="outlined"
          name="routeDesc"
          v-model="routeDesc"
          required
        ></v-textarea>
        <v-file-input
          label="Upload .gpx File"
          variant="outlined"
          type="file"
          ref="file"
          @change="handleFile(file)"
          required
        ></v-file-input>
        <v-btn @click="submit">submit</v-btn>
      </v-container>
    </v-form>

    <v-container class="routeList">
      <h2>Routes:</h2>
      <v-container class="route" :key="r.name" v-for="r in routes">
        <p>{{ r.name }} ID: {{ r.id }}</p>
        <v-btn @click="deleteBtn(r.id)">DELETE</v-btn>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { useRouteStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { ref, onMounted, reactive } from "vue";
const file = ref(null);
const routeStore = useRouteStore();
const { deleteRoute, addRoute, getRoutes } = storeToRefs(routeStore);
let routes = reactive(routeStore.getRoutes);
let newRoute = ref();
let routeName = ref("");
let gpx = ref("");
let difficulty = ref("");
let routeLength = ref(0);
let terrain = ref("");
let routeDesc = ref("");
let deleteBtn = (id) => {
  routes = routes.filter((r) => {
    //update route list
    return r.id !== +id;
  });
  console.log(routes);
  routeStore.deleteRoute(id);
};
let submit = async () => {
  try {
    handleFile();
    let routeToAdd = {
      route: newRoute.value,
      name: routeName.value,
      gpx: gpx.value,
      difficulty: difficulty.value,
      length: routeLength.value,
      terrain: terrain.value,
      desc: routeDesc.value,
    };
    routeStore.addRoute(routeToAdd);
  } catch (error) {
    console.log("error", error);
  } //
};
let handleFile = (e) => {
  console.log(file.value.files[0], "file value");

  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const tj = require("@tmcw/togeojson");
      const fileContent = file.value.files[0];
      const blob = new Blob([fileContent], { type: "text/plain" });
      const text = await blob.text();
      gpx.value = btoa(text);
      const gpxFile = new DOMParser().parseFromString(text, "text/xml");
      const converted = tj.gpx(gpxFile);
      newRoute.value = converted;
      const startCoords = converted.features[0].geometry.coordinates[0];
      const long = startCoords[0];
      const lat = startCoords[1];
      const coords = converted.features[0].geometry.coordinates;
      let locations = [];
      for (let i in coords) {
        locations[i] = {
          latitude: coords[i][1],
          longitude: coords[i][0],
        };
      }
      //max locations per request is 512
      let countBy = Math.ceil(locations.length / 512);
      let elevArr = {};
      let count = 0;
      //console.log(locations.length, countBy)
      for (let i = 0; i < locations.length; i = i + countBy) {
        elevArr[count] = {
          latitude: coords[i][1],
          longitude: coords[i][0],
        };
        count++;
      }
      count = 0;
      countBy = Math.ceil(locations.length / 25);
      let disArr = {};
      for (let i = 0; i < locations.length; i = i + countBy) {
        disArr[count] = {
          latitude: coords[i][1],
          longitude: coords[i][0],
        };
        count++;
      }
      console.log(disArr, "dis   ");
      let eresponse = await fetch(`http://localhost:3000/v1/geo/e`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elevArr),
      });
      let dresponse = await fetch(`http://localhost:3000/v1/geo/d`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(disArr),
      });
      eresponse = await eresponse.json();
      dresponse = await dresponse.json();
      routeLength.value =
        Math.round(
          (dresponse.response.rows[0].elements[
            dresponse.response.rows[0].elements.length - 1
          ].distance.value /
            1000) *
            0.621371 *
            10
        ) / 10; //meters to miles
    };
    reader.readAsText(file.value.files[0]);
  }
};
</script>
<style>
.add-route-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.add-route-container .routeForm {
  display: flex;
  flex-direction: column;
  text-align: left;
  background: #eee;
  margin: 0 0 10px 0;
  width: 50%;
  color: #083a8c;
}

.add-route-container .routeForm .input label {
  text-align: left;
  margin-right: 10px;
}

.add-route-container .routeList {
  text-align: center;
  background: white;
  width: 50%;
}

.routeList h2 {
  color: white;
}

.routeList .route {
  background: #eee;
}

.input {
  text-align: center;
  padding: 20px;
  width: 50%;
}

button.button {
  width: 100px;
  background: lightgray;
}

.routeList {
  font-family: roboto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px)
{ 
  .input
  { 
    width: 100%;
    padding: 0px;
    maring: 0 0 0 0;
  }

  .routeForm
  { 
    width: 100%;
    margin: 0 0 0 0;
  }

}
</style>