<script setup lang="ts">
import { Splitpanes } from 'splitpanes'
import { ref } from 'vue'

import { panelRef, panelSizes } from '../composables/panel'
import HeadBar from '../components/HeadBar.vue'
import PanelJS from './panel/PanelJS.vue'
import PanelCSS from './panel/PanelCSS.vue'

const _panel = ref(panelRef)

function handleResize(event: { size: number }[]) {
  event.map((e, i) => panelSizes[i] = e.size)
}
</script>

<template>
  <HeadBar />
  <Splitpanes
    ref="_panel"
    horizontal
    w-full h-full
    @resize="handleResize"
  >
    <PanelJS />
    <PanelCSS />
  </Splitpanes>
</template>
