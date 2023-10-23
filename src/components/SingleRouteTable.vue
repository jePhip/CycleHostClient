<template>
  <v-table>
   
    <tbody class="table">
      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Name</th>   
        <td>{{ item.name }}</td>    
      </tr>

      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Length</th>
        <td>{{ item.length }}</td>
      </tr>

      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Terrain</th>
        <td>{{ item.terrain}}</td>
      </tr>

      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Difficulty</th>
        <th class="text-left">Safety Rating</th>
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

<style> 
.table
{ 
  width: 50%;
  background: #eee;
}

</style> 
