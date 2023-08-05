<script setup lang="ts">
import { defineEmits } from 'vue'

defineProps<{
  title: string
}>()

const emit = defineEmits(['titleClick'])
</script>

<template>
  <div w-full all:my-auto flex flex-justify-between>
    <div bg-light flex p-1 border-b-1 @click="e => emit('titleClick', e)">
      <slot name="collapse" />
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
