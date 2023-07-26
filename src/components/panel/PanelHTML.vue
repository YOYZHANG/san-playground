<script setup lang="ts">
import { Pane } from 'splitpanes'
import CodeMirror from '../CodeMirror.vue'
import TitleBar from '../TitleBar.vue'
import { inputHTML } from '../../composables/url'
import { isCollapsed, panelMinHeightPercent, panelSizes, toggle } from '../../composables/panel'

// const index = defineProps({
//   index: Number,
// })
</script>

<template>
  <Pane w-full relative :min-size="panelMinHeightPercent" :size="panelSizes[0]" bg-gray overflow-hidden>
    <TitleBar title="html" @title-click="toggle(0)">
      <template #collapse>
        <div i-carbon-chevron-right c-blueGray :class="isCollapsed(0) ? '' : 'rotate-90'" />
      </template>

      <CodeMirror
        :model-v="inputHTML"
        mode="html"
        :readonly="false"
      />
    </TitleBar>
  </Pane>
</template>
