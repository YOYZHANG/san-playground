import { createApp } from 'vue'
import App from './App.vue'

import './styles/main.css'
import '@unocss/reset/tailwind.css'
import 'splitpanes/dist/splitpanes.css'
import 'uno.css'

const app = createApp(App)

app.mount('#app')
