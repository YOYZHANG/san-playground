import { useElementSize } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'

export const TITLE_HEIGHT = 30
export const panelRef = ref<HTMLElement>()

const { height } = useElementSize(panelRef)

export const panelMinHeightPercent = computed(() => {
  if (!height.value)
    return 0

  return (TITLE_HEIGHT / height.value) * 100
})

export const panelSizes = reactive([
  50,
  50,
])

export function isCollapsed(index: number) {
  return panelSizes[index]! <= TITLE_HEIGHT
}

export function toggle(index: number) {
  if (isCollapsed(index))
    panelSizes[index] = 100 / panelSizes.length
  else
    panelSizes[index] = panelMinHeightPercent.value
}

// export function normalize() {
//   const collapsedNum = 0
//   const normalNum = 0
// }
