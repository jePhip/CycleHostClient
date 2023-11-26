import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", {
  state: () => ({ routes: [] }),

  getters: {//pre computed values ex: all "dirt" routes
    getRoutes(){
      return this.routes
    },
    getRoutebyID: (state) => {
      return (id) => {
        return state.routes.find((r=> r.id == id))
      }
      }
    },

  actions: {
    //methods to mutate data
    async updateRoute(updatedRoute) {
      //TODO: make this function work.. untested
      id = updatedRoute.id; //take in whatever attributes are being updated, leave rest unchanged, put back into state
      let response = await fetch(`http://localhost:3000/v1/geo/${id}`, {
        method: "PUT",
      });
      response = await response.json();
      this.routes = this.routes.map((r) => {
        //update route list
        if ((r.id = updatedRoute.id)) {
          r = updatedRoute;
        }
      });
    },
    async addRoute(routeToAdd) {
      //tested
      this.routes.push(routeToAdd);
      let response = await fetch(`http://localhost:3000/v1/geo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeToAdd),
      });
      response = await response.json();
      console.log(this.routes)
      return response;
    },
    async deleteRoute(id) {
      //tested
      //this.routes.remove((r) => r.id == id)//to update routes array in state
      let response = await fetch(`http://localhost:3000/v1/geo/${id}`, {
        method: "DELETE",
      });
      response = await response.json();
      this.routes = this.routes.filter((r) => {
        //update route list
        //console.log(this.routes)
        return r.id !== Number(response.id);
      });
      console.log(this.routes, "del route", id)
    },
    async getRoutesInit() {
      //tested
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
});
