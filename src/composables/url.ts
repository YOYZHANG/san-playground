import { ref } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { STORAGE_KEY, defaultCss, defaultHTML } from './constant'

const urlParams = new URLSearchParams(location.search || localStorage.getItem(STORAGE_KEY) || '')

export const inputJS = ref(decodeURIComponent(urlParams.get('html') || '') || defaultHTML)
export const css = ref(decodeURIComponent(urlParams.get('css') || '') || defaultCss)

watchThrottled([inputJS, css], () => {
  console.log('inputJS change')
  const url = new URL('/', location.origin)

  url.searchParams.set('html', encodeURIComponent(inputJS.value))
  url.searchParams.set('css', encodeURIComponent(css.value))

  localStorage.setItem(STORAGE_KEY, url.search)
}, { deep: true, throttle: 1000 })
