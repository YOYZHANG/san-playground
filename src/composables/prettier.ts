import prettier from 'prettier/standalone'
import type { Ref } from 'vue'
import { computed } from 'vue'
import pluginCss from 'prettier/plugins/postcss'
import pluginEstree from 'prettier/plugins/estree'
import pluginBabel from 'prettier/plugins/babel'
import { css, inputJS } from './url'

function usePrettify(content: Ref<string>, type: 'babel' | 'css') {
  const plugins = {
    babel: [pluginBabel, pluginEstree],
    css: [pluginCss],
  }
  return computed(async () => {
    return await prettier.format(content.value || '', {
      semi: false,
      parser: type,
      plugins: plugins[type],
    })
  })
}

export async function formatJS() {
  const val = await usePrettify(inputJS, 'babel').value
  inputJS.value = val
}

export async function formatCSS() {
  const val = await usePrettify(css, 'css').value
  css.value = val
}
