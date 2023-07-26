<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import Preview from '../components/Preview.vue'
import Editor from '../components/Editor.vue'
</script>

<template>
  <div>
    <Splitpanes w-screen h-screen :horizontal="false" overflow-hidden flex>
      <Pane>
        <Preview />
      </Pane>
      <Pane>
        <Editor />
      </Pane>
    </Splitpanes>
  </div>
</template>

<style>

</style>
