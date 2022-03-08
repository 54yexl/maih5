import { createApp } from 'vue'
import App from './App.vue'
import { setupPlugins } from './plugins'
// import { setupStore } from './store'
import { setupRouter } from './router'
import '@/utils/permission.js'
import 'amfe-flexible/index.js'

const app = createApp(App)

setupPlugins(app)

// setupStore(app)

setupRouter(app)
// const vConsole = new VConsole()
app.mount('#app')