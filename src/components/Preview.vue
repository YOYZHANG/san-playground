<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { css, inputJS } from '../composables/url'
import { createSandboxProxy, runtimeError, runtimeWarn } from '../composables/ifame'
import Message from './Message.vue'

const iframe = ref<HTMLIFrameElement>()
const iframeData = reactive({
  source: 'playground',
  css,
  js: inputJS,
})

const iframeProxy = createSandboxProxy(iframe)

async function updateView() {
  runtimeWarn.value = ''
  runtimeError.value = ''
  return await iframeProxy.send('updateContent', JSON.stringify(iframeData))
}

async function send() {
  watchEffect(updateView)
}
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
    <Message
      :warn="runtimeWarn" :err="runtimeError
      "
    />
  </div>
</template>
