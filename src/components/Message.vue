<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  message: string[]
  type: string
}>()

const dismissed = ref(false)

// watch([props.message], () => {
//   dismissed.value = true
// })
</script>

<template>
  <div v-show="!dismissed && message" absolute w-l b-1 bottom-5 left-3 p-5 style="background-color: #fdf6ec;color:#e6a23c">
    <div>
      {{ message.join('\n') }}
    </div>
    <div absolute top-1 right-1 i-carbon-close font-7 @click="e => dismissed = true">
      x
    </div>
  </div>
</template>
