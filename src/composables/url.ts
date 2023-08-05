import { ref } from 'vue'
import { watchThrottled } from '@vueuse/core'
import { STORAGE_KEY, defaultCss, defaultJS } from './constant'

const urlParams = new URLSearchParams(location.search || localStorage.getItem(STORAGE_KEY) || '')

export const inputJS = ref(decodeURIComponent(urlParams.get('js') || '') || defaultJS)
export const css = ref(decodeURIComponent(urlParams.get('css') || '') || defaultCss)

watchThrottled([inputJS, css], () => {
  const url = new URL('/', location.origin)

  url.searchParams.set('js', encodeURIComponent(inputJS.value))
  url.searchParams.set('css', encodeURIComponent(css.value))

  localStorage.setItem(STORAGE_KEY, url.search)

  window.history.replaceState('', '', `${url.pathname}${url.search}`)
}, { deep: true, throttle: 1000 })
