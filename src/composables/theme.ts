import { EditorView } from 'codemirror'
import type { Extension } from '@codemirror/state'

const foreground = 'var(--cm-foreground)'
const lineNumber = 'var(--cm-line-number)'
const darkBackground = 'var(--cm-background)'
const highlightBackground = 'var(--cm-line-highlight-background)'
const background = 'var(--cm-background)'
const tooltipBackground = '#242222'
const selection = 'var(--cm-selection-background)'
const cursor = '#888'

export const vitesseTheme = EditorView.theme({
  '&': {
    color: foreground,
    backgroundColor: background,
  },
  '& div': {
    flexDirection: 'initial',
  },

  '&.cm-focused': {
    outline: 'none',
  },

  '.cm-content': {
    caretColor: cursor,
  },

  '.cm-completionIcon': {
    display: 'none',
  },

  '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

  '.cm-panels': { backgroundColor: darkBackground, color: foreground },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff',
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f',
  },

  '.cm-line': { border: '1px solid transparent' },
  '.cm-activeLine': { backgroundColor: highlightBackground, border: '1px solid var(--cm-line-highlight-border)' },
  '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: 'transparent',
  },

  '.cm-gutters': {
    backgroundColor: background,
    color: lineNumber,
    border: 'none',
  },

  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: '#bfbaaa',
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd',
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground,
    color: '#c2beb3',
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground,
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: '#ffffff14',
      color: '#c2beb3',
    },
  },
}, { dark: true })

export const vitesse: Extension = [vitesseTheme]
