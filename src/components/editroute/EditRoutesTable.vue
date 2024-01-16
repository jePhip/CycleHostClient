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
      <template #item.edit="{ item }">
        <div class="tableBtn">
          <v-btn
          icon="mdi-pencil"
          @click="edit(item.id)"
          /><!-- add download functionality -->
        </div>
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
import { useRouteStore} from "@/store/index.js";
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
  { key: "edit", title: "Edit" },
  { key: "del", title: "Delete" },
]);

const routeStore = useRouteStore();
const { getRoutes } = storeToRefs(routeStore);
let routes = computed(() => routeStore.getRoutes);

let del = async (id) => {
  routeStore.deleteRoute(id)
};
let add = async () => {

};
let edit = async (id) => {

};
</script>

<style scoped>
  .tableBtn{
    scale: 80%;
  }
</style>
