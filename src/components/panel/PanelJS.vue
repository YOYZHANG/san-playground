<script setup lang="ts">
import { Pane } from 'splitpanes'
import { ref } from 'vue'
import CodeMirror from '../CodeMirror.vue'
import TitleBar from '../TitleBar.vue'
import { inputJS } from '../../composables/url'
import { isCollapsed, panelMinHeightPercent, panelSizes, toggle } from '../../composables/panel'

// const index = defineProps({
//   index: Number,
// })

const modelV = ref(inputJS)
</script>

<template>
  <Pane w-full relative :min-size="panelMinHeightPercent" :size="panelSizes[0]" bg-light overflow-hidden b-1>
    <TitleBar title="js" @title-click="toggle(0)">
      <template #collapse>
        <div i-carbon-chevron-right c-blueGray :class="isCollapsed(0) ? '' : 'rotate-90'" />
      </template>

      <CodeMirror
        v-model="modelV"
        mode="js"
        :readonly="false"
      />
    </TitleBar>
  </Pane>
</template>
