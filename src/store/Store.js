
import { createStore, createLogger } from 'vuex';


const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    auth,
    product
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;