<template>
  <v-table>
    <tbody class="table">
      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Name</th>
        <td>{{ item.name }}</td>
      </tr>

      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Length</th>
        <td>{{ item.length }}</td>
      </tr>

      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Terrain</th>
        <td>{{ item.terrain }}</td>
      </tr>

      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Difficulty</th>
        <td>{{ item.diff }}</td>
      </tr>
      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Safety Rating</th>
        <td>{{ item.safety }}</td>
      </tr>
      <tr v-for="item in routesE" :key="item.name">
        <th class="text-left">Try it out!</th>
        <td>
          <v-btn
            class="downloadBtn"
            icon="mdi-download"
            @click="downloadGPX(routes[0].gpx, item.name)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  async mounted() {
    //console.log("mounted")
    await this.fetchRoutes();
    console.log(this.routes)
  },
  data() {
    return {
      routes: null,
      routesE: [
        //TODO: find way to pass in route from RouteView
        {
          name: "Frisco",
          length: "35 miles",
          terrain: "Gravel",
          diff: "4",
          safety: "4",
        },
      ],
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
    async fetchRoutes() {
      try {
        let response = await fetch("http://localhost:3000/v1/geo/"); //eventually change to env variable
        response = await response.json();
        this.routes = response.routes.map((r) => {
          console.log({ ...r });
          return {
            ...r,
          };

        });
        this.routes = this.routes.filter(r => {
         return r.id == 5
        })
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.table {
  width: 50%;
  background: #eee;
}
.downloadBtn {
  scale: 80%;
  color: blue;
}
</style>
