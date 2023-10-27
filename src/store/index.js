import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', {
  state: () => ({ routes: [], }),
  getters: {
    getRoute(id){
        return this.routes.find(r => 
           r.id == id)
  },
  actions: {//methods to mutate data
    increment() {
      this.count++
    },
  },
  }
})
