import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

import './styles/main.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const pinia = createPinia()

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
})

app.use(pinia)
app.use(router)

app.mount('#app')
