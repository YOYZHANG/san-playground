<script setup lang="ts">
import { Splitpanes } from 'splitpanes'
import { ref } from 'vue'

import { panelRef } from '../composables/panel'
import HeadBar from '../components/HeadBar.vue'
import PanelHTML from './panel/PanelHTML.vue'
import PanelCSS from './panel/PanelCSS.vue'

const _panel = ref(panelRef)
</script>

<template>
  <HeadBar h-auto />
  <Splitpanes
    ref="_panel"
    horizontal
    w-full h-full
  >
    <PanelHTML />
    <PanelCSS />
  </Splitpanes>
</template>
