<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <div inline-block text-4xl i-carbon-3d-cursor />
    <p px-4>
      <a href="https://github.com/YOYZHANG/originApp">Origin App</a>
    </p>

    <div>
      <input
        id="input"
        v-model="name"
        type="text"
        p="x-4 y-2"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        placeholder="What's your name?"
        autocomplete="false"
        @keydown.enter="go"
      >
    </div>

    <button m-3 text-sm :disabled="!name" @click="go">
      GO!
    </button>
  </div>
</template>
