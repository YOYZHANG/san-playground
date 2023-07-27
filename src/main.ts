import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './styles/main.css'
import '@unocss/reset/tailwind.css'
import 'splitpanes/dist/splitpanes.css'
import 'uno.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

app.mount('#app')
