<template>
  <v-table>
   
    <tbody class="table">
<<<<<<< Updated upstream:src/components/SingleRouteTable.vue
      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Name</th>   
        <td>{{ item.name }}</td>    
      </tr>

      <tr  v-for="item in routes" :key="item.name">
=======
      <tr>
        <th class="text-left">Name</th>
        <td>{{ route?.name }}</td>
      </tr>
      <tr>
>>>>>>> Stashed changes:src/components/RouteViewTable.vue
        <th class="text-left">Length</th>
        <td>{{ route?.length }}</td>
      </tr>
<<<<<<< Updated upstream:src/components/SingleRouteTable.vue

      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Terrain</th>
        <td>{{ item.terrain}}</td>
      </tr>

      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Difficulty</th>
        <td>{{ item.diff}}</td>
      </tr>
      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Safety Rating</th>
        <td>{{ item.safety}}</td>
      </tr>
      <tr  v-for="item in routes" :key="item.name">
        <th class="text-left">Try it out!</th>
        <td>
          <v-btn @click="console.log(`click`)">DOWNLOAD</v-btn>
      
=======
      <tr>
        <th class="text-left">Terrain</th>
        <td>{{ route?.terrain }}</td>
      </tr>
      <tr>
        <th class="text-left">Difficulty</th>
        <td>{{ route?.difficulty }}</td>
      </tr>
      <tr>
        <th class="text-left">Try it out!</th>
        <td>
          <v-btn
            class="downloadBtn"
            icon="mdi-download"
            @click="downloadGPX(route.gpx, route.name)"
          />
>>>>>>> Stashed changes:src/components/RouteViewTable.vue
        </td>
      </tr>
    </tbody>
    

    
  </v-table>
</template>

<script>

export default {
<<<<<<< Updated upstream:src/components/SingleRouteTable.vue
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
=======
  props:{
        route: null
    },
  data() {
    return {
      
      routes: null,
    };
  },
  methods: {
    async downloadGPX(file, routeName) {
      file = atob(file);
      const blob = new Blob([file], { type: "text/plain" }); //TODO: store gpx as blob in db instead of base64
      var gpxtext = await blob.text();

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
  },
>>>>>>> Stashed changes:src/components/RouteViewTable.vue
};
</script>

<style> 
.table
{ 
  width: 50%;
  background: #eee;
}

</style> 
