<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { init } from '../composables/san'
import { css, inputHTML } from '../composables/url'

const iframe = ref<HTMLIFrameElement>()
const iframeData = reactive({
  source: 'playground',
  css,
  html: inputHTML,
})

function send() {
  iframe.value?.contentWindow?.postMessage(JSON.stringify(iframeData), location.origin)
}

watch([iframe, iframeData], send)
</script>

<template>
  <div w-full h-full flex justify-center bg-white relative b-1>
    <div>
      <iframe
        v-show="init"
        ref="iframe"
        src="/playground/_play.html"
        @load="send"
      />
    </div>
  </div>
</template>
