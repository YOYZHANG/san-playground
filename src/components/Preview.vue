<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { css, inputJS } from '../composables/url'

const iframe = ref<HTMLIFrameElement>()
const iframeData = reactive({
  source: 'playground',
  css,
  js: inputJS,
})

function send() {
  iframe.value?.contentWindow?.postMessage(JSON.stringify(iframeData), location.origin)
}

watch([iframe, iframeData], send)
</script>

<template>
  <div w-full h-full relative b-1 flex-1>
    <div>
      <iframe
        ref="iframe"
        w-full
        h-screen
        src="/__play.html"
        @load="send"
      />
    </div>
  </div>
</template>
