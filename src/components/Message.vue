<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  err?: string
  warn?: string
}>()

const dismissed = ref(false)

watch(() => [props.err, props.warn], () => {
  dismissed.value = false
})
</script>

<template>
  <Transition name="fade">
    <div v-show="!dismissed && (err || warn)" absolute bottom-2 left-3 right-3>
      <div v-show="err" c-red-6 bg-red-100 border-red-400 rd p-4>
        {{ err }}
      </div>
      <div v-show="warn && !err" c-orange-3 bg-orange-100 border-orange-400 rd p-4>
        {{ warn }}
      </div>
      <div absolute top-1 right-1 i-carbon-close-outline :class="err ? 'c-red-6' : 'c-orange-4'" p-3 @click="e => dismissed = true">
        x
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}
</style>
