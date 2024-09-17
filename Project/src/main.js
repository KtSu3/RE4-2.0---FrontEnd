import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App);

app.use(router); // Usa o roteador

app.use(Quasar, {

  plugins: { Notify },
  config: {
    // notify:
    // dark:
  },
});

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app');