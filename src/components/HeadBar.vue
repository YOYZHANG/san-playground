<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { inputCss, inputJS } from '../composables/url'
import { defaultCss, defaultJS } from '../composables/constant'

const { copy, copied } = useClipboard()
function handleCopy() {
  copy(window.location.href)
}

function handleReset() {
  inputJS.value = defaultJS
  inputCss.value = defaultCss
}
</script>

<template>
  <div flex bg-light b-1 p-2 c-blueGray flex-justify-between>
    <div flex>
      <p pr-2 font-700>
        San Playground
      </p>
      <p>
        v 3.13
      </p>
    </div>
    <div flex flex-end>
      <button
        :class="!copied ? 'i-ri-share-fill' : 'i-ri-check-fill c-green'"
        icon-btn @click="handleCopy"
      />
      <button i-carbon-erase @click="handleReset" />
      <a i-carbon-document href="https://baidu.github.io/san/" icon-btn />
      <a i-ri-github-line href="https://github.com/YOYZHANG/san-playground" icon-btn />
    </div>
  </div>
</template>
