<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { css, inputJS } from '../composables/url'
import { createSandboxProxy, runtimeWarn } from '../composables/ifame'
import Message from './Message.vue'

const iframe = ref<HTMLIFrameElement>()
const iframeData = reactive({
  source: 'playground',
  css,
  js: inputJS,
})

const iframeProxy = createSandboxProxy(iframe)

async function send() {
  return await iframeProxy.send('updateContent', JSON.stringify(iframeData))
}

watch([iframeData], send)
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
    <!-- <Message :message="runtimeError" type="err" /> -->
    <Message :message="runtimeWarn" type="warn" />
  </div>
</template>
