import { defineStore } from "pinia";

export const useRoutesStore = defineStore("routes", {
  state: () => ({ routes: [] }),
  getters: {
    getRoute(id) {
      return this.routes.find((r) => r.id == id);
    },
    actions: {
      async addRoute(
        newRoute,
        routeName,
        gpx,
        routeLength,
        terrain,
        difficulty,
        routeDesc
      ) {
        routeToAdd = {
          route: newRoute,
          name: routeName,
          gpx: gpx,
          length: routeLength,
          terrain: terrain,
          difficulty: difficulty,
          desc: routeDesc,
        };
        this.routes.push(routeToAdd);
        let response = await fetch(`http://localhost:3000/v1/geo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(routeToAdd),
        });
        response = await response.json();
        return response;
      },
      async removeRoute(id) {
        //this.routes.remove((r) => r.id == id)//to update routes array in state
        let response = await fetch(`http://localhost:3000/v1/geo/${id}`, {
          method: "DELETE",
        });
        response = await response.json();
        this.routes = this.routes.filter((r) => {
          //update route list
          return r.id !== Number(response.id);
        });
      },
      //methods to mutate data
      async initFetchRoutes() {
        try {
          let response = await fetch("http://localhost:3000/v1/geo"); //eventually change to env variable
          response = await response.json();
          this.routes = response.routes.map((r) => {
            return {
              ...r,
              route: JSON.parse(r.route),
            };
          });
        } catch (error) {
          console.error(error);
        }
      },
    },
  },
});
