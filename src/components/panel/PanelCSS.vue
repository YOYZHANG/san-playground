<script setup lang="ts">
import { Pane } from 'splitpanes'
import CodeMirror from '../CodeMirror.vue'
import TitleBar from '../TitleBar.vue'
import { css } from '../../composables/url'
import { isCollapsed, panelMinHeightPercent, panelSizes, toggle } from '../../composables/panel'
</script>

<template>
  <Pane w-full h-full :min-size="panelMinHeightPercent" :size="panelSizes[1]" bg-gray overflow-hidden>
    <TitleBar title="css" @title-click="toggle(1)">
      <template #collapse>
        <div i-carbon-chevron-right c-blueGray :class="isCollapsed(1) ? '' : 'rotate-90'" />
      </template>

      <CodeMirror
        :model-v="css"
        mode="css"
        :readonly="false"
      />
    </TitleBar>
  </Pane>
</template>
