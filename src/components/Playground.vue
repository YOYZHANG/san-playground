<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Preview from '../components/Preview.vue'
import Editor from '../components/Editor.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakpoints.smaller('sm')
</script>

<template>
  <div>
    <div>
      <Splitpanes :horizontal="isMobile" w-screen h-screen overflow-hidden flex>
        <Pane>
          <Preview />
        </Pane>
        <Pane>
          <Editor />
        </Pane>
      </Splitpanes>
    </div>
  </div>
</template>

<style>

</style>
