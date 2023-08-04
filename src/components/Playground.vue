<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import Preview from '../components/Preview.vue'
import Editor from '../components/Editor.vue'
import Loading from '../components/Loading.vue'
import { init } from '../composables/codemirror'
</script>

<template>
  <div>
    <Loading v-show="!init" />
    <div>
      <Splitpanes v-show="init" :horizontal="false" w-screen h-screen overflow-hidden flex>
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
