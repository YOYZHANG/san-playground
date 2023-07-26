<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCodeMirror } from '../composables/codemirror'

const props = defineProps<{
  modelV: string
  mode: string
  readonly?: boolean
}>()

const el = ref<HTMLElement>()

const input = computed(() => {
  console.log('codemirror input change')
  return props.modelV
})

onMounted(() => {
  useCodeMirror(input, el, {
    mode: props.mode,
    readonly: props.readonly || false,
  })
})
</script>

<template>
  <div
    ref="el"
    relative
  />
</template>
