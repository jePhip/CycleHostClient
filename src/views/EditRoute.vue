<template>
  <div class="add-route-container">
    <v-form
      class="routeForm"
      @submit.prevent="handleSubmit()"
      ref="form"
    >
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
        <v-text-field
          label="Route Length (miles)"
          prepend-icon="mdi-road"
          class="routeLength"
          type="number"
          variant="outlined"
          name="routeLength"
          v-model="routeLength"
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
let routeToAdd = reactive({
  route: newRoute.value,
  name: routeName.value,
  gpx: gpx.value,
  difficulty: gpx.value,
  length: routeLength.value,
  terrain: terrain.value,
  desc: routeDesc.value,
});
let deleteBtn =  (id) => {
  routes = routes.filter((r) => {
        //update route list
        return r.id !== +id;
      });
  console.log(routes)
  routeStore.deleteRoute(id)
}
let submit = async () => {
  try {
    handleFile()
    let routeToAdd2 = {
      route: newRoute.value,
      name: routeName.value,
      gpx: gpx.value,
      difficulty: difficulty.value,
      length: routeLength.value,
      terrain: terrain.value,
      desc: routeDesc.value,
    };
    routeStore.addRoute(routeToAdd2);
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
      console.log(routeToAdd, "route");
    };
    reader.readAsText(file.value.files[0]);
  }
};
</script>

<style></style>
