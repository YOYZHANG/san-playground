<script setup lang="ts">
import { defineEmits } from 'vue'

defineProps<{
  title: string
}>()

const emit = defineEmits(['titleClick'])
</script>

<template>
  <div relative w-full all:my-auto>
    <div bg-light flex p-1 border-b-1 @click="e => emit('titleClick', e)">
      <slot name="collapse" />
      <div c-blueGray>
        {{ title }}
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
