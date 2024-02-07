<template>
  <v-table class="d-none d-lg-block">
    <thead>
      <tr>
        <th class="text-left">Length</th>
        <th class="text-left">Terrain</th>
        <th class="text-left">Difficulty</th>
        <th class="text-left">Elevation Gain</th>
        <th>Try it out!</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ route?.length }} miles</td>
        <td>{{ route?.terrain }}</td>
        <td>{{ route?.difficulty }}</td>
        <td>{{ route?.elevation }} feet</td>
        <td>
          <v-btn
            @click="downloadGPX(route.gpx, route.name)"
            icon="mdi-download"
            style="scale: 85%; color: blue"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-table class="d-lg-none">
    <tbody class="table">
      <tr>
        <th class="text-left">Length</th>
        <td>{{ route?.length }} miles</td>
      </tr>
      <tr>
        <th class="text-left">Terrain</th>
        <td>{{ route?.terrain }}</td>
      </tr>
      <tr>
        <th class="text-left">Elevation Gain</th>
        <td>{{ route?.elevation }} feet</td>
      </tr>
      <tr>
        <th class="text-left">Difficulty</th>
        <td>{{ route?.difficulty }}</td>
      </tr>
      <tr>
        <th class="text-left">Try it out!</th>
        <td>
          <v-btn
            class="gpxBtn"
            style="color: blue"
            icon="mdi-download"
            @click="downloadGPX(route.gpx, route.name)"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
// style sheet
import "@/css/route-view-table.css";

export default {
  //
  props: {
    route: null, //route inputed by parent component
  },
  methods: {
    downloadGPX: async (file, routeName) => {
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
    },
  },
};
</script>
