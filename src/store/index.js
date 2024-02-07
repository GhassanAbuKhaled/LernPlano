import { createStore } from 'vuex'
import Interaktionen from './data/interaktionen'
import componentData from './data/componentData'


const store = createStore({
  modules: {
    Interaktionen,
    componentData
  }
})

export default store
