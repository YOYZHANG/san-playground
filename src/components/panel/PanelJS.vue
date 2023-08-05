<script setup lang="ts">
import { Pane } from 'splitpanes'
import { ref } from 'vue'
import CodeMirror from '../CodeMirror.vue'
import TitleBar from '../TitleBar.vue'
import { inputJS } from '../../composables/url'
import { isCollapsed, panelMinHeightPercent, panelSizes, toggle } from '../../composables/panel'
import { formatJS } from '../../composables/prettier'

// const index = defineProps({
//   index: Number,
// })

const modelV = ref(inputJS)
</script>

<template>
  <Pane w-full relative :min-size="panelMinHeightPercent" :size="panelSizes[0]" bg-light overflow-auto b-1>
    <div flex>
      <TitleBar title="js" @title-click="toggle(0)">
        <template #collapse>
          <div flex flex-wrap>
            <div
              i-ri-arrow-drop-right-line
              c-blueGray cursor-pointer
              :class="isCollapsed(0) ? '' : 'rotate-90'"
            />
            <div c-blueGray>
              js
            </div>
          </div>
        </template>

        <div flex justify-end cursor-pointer>
          <div v-show="!isCollapsed(0)" i-carbon-text-align-center c-blueGray @click="formatJS" />
        </div>
      </TitleBar>
    </div>
    <CodeMirror
      v-model="modelV"
      mode="js"
      :readonly="false"
    />
  </Pane>
</template>
