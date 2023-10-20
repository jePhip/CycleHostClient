<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Length</th>
        <th class="text-left">Terrain</th>
        <th class="text-left">Difficulty</th>
        <th class="text-left">Safety Rating</th>
        <th class="text-left">Try it out!</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in routes" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.length }}</td>
        <td>{{ item.terrain}}</td>
        <td>{{ item.diff}}</td>
        <td>{{ item.safety}}</td>
        <v-btn>Download</v-btn>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      routes: [//TODO: find way to pass in route from RouteView
        {
          name: "Frisco",
          length: "35 miles",
          terrain: "Gravel",
          diff: "4",
          safety: "4"
        },
      ],
    };
  },
};
</script>
