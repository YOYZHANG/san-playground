import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const savedName = ref('')

  function setNewName(name: string) {
    savedName.value = name
  }

  return {
    savedName,
    setNewName,
  }
})
