<script setup lang="ts">
import { useRouter } from 'vue-router/auto'

// const props = defineProps<{ name: string }>()
const router = useRouter()
</script>

<template>
  <div>
    <div i-carbon-3d-cursor inline-block text-4xl />
    <p>
      Hi, Welcome!
    </p>

    <div>
      <button text-sm @click="$event => router.back()">
        Back
      </button>
    </div>
  </div>
</template>
