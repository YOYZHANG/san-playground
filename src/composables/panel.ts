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

  normalize()
}

export function normalize() {
  let collapsedNum = 0
  let normalNum = 0
  const collapsedIndex: number[] = []

  panelSizes.forEach((size, i) => {
    if (size <= panelMinHeightPercent.value) {
      collapsedNum++
      collapsedIndex.push(i)
    }
    else { normalNum++ }
  })

  let normalSize = 50

  if (normalNum)
    normalSize = (94 - collapsedNum * panelMinHeightPercent.value) / normalNum

  panelSizes.forEach((_, idx) => {
    if (!collapsedIndex.includes(idx))
      panelSizes[idx] = normalSize
  })
}
