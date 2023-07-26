import { ref } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { STORAGE_KEY, defaultCss, defaultHTML } from './constant'

const urlParams = new URLSearchParams(location.search || localStorage.getItem(STORAGE_KEY) || '')

export const inputHTML = ref(decodeURIComponent(urlParams.get('html') || '') || defaultHTML)
export const css = ref(decodeURIComponent(urlParams.get('css') || '') || defaultCss)

watchThrottled([inputHTML, css], () => {
  console.log('inputHTML change')
  const url = new URL('/playground/', location.origin)

  url.searchParams.set('html', encodeURIComponent(inputHTML.value))
  url.searchParams.set('css', encodeURIComponent(css.value))

  localStorage.setItem(STORAGE_KEY, url.search)
}, { deep: true, throttle: 1000 })
