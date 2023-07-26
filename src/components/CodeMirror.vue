<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { useCodeMirror } from '../composables/codemirror'

const props = defineProps<{
  modelValue: string
  mode: string
  readonly?: boolean
}>()

const emit = defineEmits<{ (e: 'update:modelValue', payload: string): void }>()

const input = useVModel(props, 'modelValue', emit)

const el = ref<HTMLElement>()

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
