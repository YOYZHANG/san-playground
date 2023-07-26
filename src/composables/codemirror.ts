import { EditorView, basicSetup } from 'codemirror'
import { htmlLanguage } from '@codemirror/lang-html'
import type { Ref, WritableComputedRef } from 'vue'
import { computed, watch } from 'vue'
import type { Extension } from '@codemirror/state'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'

const langExtensions: Record<string, () => object> = {
  html: () => htmlLanguage.extension,
  vue: () => htmlLanguage.extension,
  js: javascript,
  ts: () => javascript({ typescript: true }),
  jsx: () => javascript({ jsx: true }),
  css,
}

export function useCodeMirror(
  input: Ref<string> | WritableComputedRef<string>,
  parent: Ref<HTMLElement | undefined>,
  options: { mode: string; readonly: boolean },
) {
  const extensions = computed(() => {
    const { mode, readonly = false } = options

    return [
      basicSetup,
      langExtensions[mode]!(),
      readonly && EditorState.readOnly.of(true),
    ].filter(Boolean) as Extension[]
  })

  const cm = new EditorView({
    doc: input.value,
    parent: parent.value as Element,
    extensions: extensions.value,
    dispatch(tr) {
      cm.update([tr])

      if (tr.docChanged)
        input.value = cm.state.doc.toString()
    },
  })

  watch(input, (val) => {
    if (val !== cm.state.doc.toString()) {
      cm.dispatch({
        changes: {
          from: 0,
          to: cm.state.doc.length,
          insert: val,
        },
      })
    }
  }, { immediate: true })

  return cm
}
