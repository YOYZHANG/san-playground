import { ref } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { STORAGE_KEY, defaultCss, defaultJS } from './constant'

const urlParams = new URLSearchParams(location.search || localStorage.getItem(STORAGE_KEY) || '')

export const inputJS = ref(decodeURIComponent(urlParams.get('js') || '') || defaultJS)
export const css = ref(decodeURIComponent(urlParams.get('css') || '') || defaultCss)

console.log(inputJS.value, 'inputJS')

watchThrottled([inputJS, css], () => {
  const url = new URL('/', location.origin)

  url.searchParams.set('js', encodeURIComponent(inputJS.value))
  url.searchParams.set('css', encodeURIComponent(css.value))

  localStorage.setItem(STORAGE_KEY, url.search)
}, { deep: true, throttle: 1000 })
