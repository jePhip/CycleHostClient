<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Length</th>
        <th class="text-left">Terrain</th>
        <th class="text-left">Difficulty</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in routes" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.length }}</td>
        <td>{{ item.terrain}}</td>
        <td>{{ item.diff}}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import Frisco from '@/data/Frisco.json'
export default {
  data() {
    return {
      routes: [
        {
          name: "Frisco",
          length: "35 miles",
          terrain: "Gravel",
          diff: "4"
        },
      ],
    };
  },
};
</script>
