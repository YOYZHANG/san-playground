<script setup lang="ts">
import { Pane } from 'splitpanes'
import CodeMirror from '../CodeMirror.vue'
import TitleBar from '../TitleBar.vue'
import { inputCss } from '../../composables/url'
import { formatCSS } from '../../composables/prettier'
import { isCollapsed, panelMinHeightPercent, panelSizes, toggle } from '../../composables/panel'
</script>

<template>
  <Pane w-full h-full :min-size="panelMinHeightPercent" :size="panelSizes[1]" bg-light overflow-auto b-1>
    <TitleBar title="css" @title-click="toggle(1)">
      <template #collapse>
        <div
          i-ri-arrow-drop-right-line
          c-blueGray cursor-pointer
          :class="isCollapsed(1) ? '' : 'rotate-90'"
        />
        <div c-blueGray>
          css
        </div>
      </template>
      <div flex justify-end cursor-pointer>
        <div v-show="!isCollapsed(1)" i-carbon-text-align-center c-blueGray @click="formatCSS" />
      </div>
    </TitleBar>
    <CodeMirror
      v-model="inputCss"
      mode="css"
      :readonly="false"
    />
  </Pane>
</template>
