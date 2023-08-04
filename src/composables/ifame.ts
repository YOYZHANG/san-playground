import type { Ref } from 'vue'
import { ref } from 'vue'

let uid = 0
export const runtimeError = ref('')
export const runtimeWarn = ref('')

class SandBoxProxy {
  private pendingActionMap: Map<number, { resolve: (value: unknown) => void; reject: any }> = new Map()
  private iframe: Ref<HTMLIFrameElement | undefined>
  private handleE: (e: any) => void

  constructor(iframeEl: Ref<HTMLIFrameElement | undefined>) {
    this.iframe = ref(iframeEl)
    this.handleE = e => this.handleEventCb(e)
    this.addEventListener()
  }

  // 向 iframe 发送事件
  send(action: string, data: string) {
    return new Promise((resolve, reject) => {
      const cmdId = uid++
      this.pendingActionMap.set(cmdId, { resolve, reject })

      this.iframe?.value?.contentWindow?.postMessage({ action, data, cmdId }, location.origin)
    })
  }

  dispose() {
    this.pendingActionMap.clear()
    window.removeEventListener('message', this.handleE)
  }

  // 监听 iframe 的事件
  private addEventListener() {
    window.addEventListener('message', this.handleE, false)
  }

  private handleEventCb(e: any) {
    if (e.source !== this.iframe?.value?.contentWindow)
      return

    this.handleCommand(e.data)
  }

  private handleCommand(args: {
    action: string
    cmdId: number
    message?: string
    stack?: string
    level?: 'error' | 'warn'
  }) {
    const { cmdId, action } = args

    if (action === 'ok') {
      const pendingP = this.pendingActionMap.get(cmdId)

      if (pendingP) {
        const { resolve } = pendingP
        resolve(args)
        this.pendingActionMap.delete(cmdId)
      }
    }
    else if (action === 'error') {
      const { message } = args as { message: string; stack: string }

      runtimeError.value = `${message};`
    }
    else if (action === 'unhandledRejection') {
      const { message } = args as { message: string; stack: string }

      runtimeError.value = `[UnhandledRejection San Error]: ${message}`
    }
    else if (action === 'console') {
      const { level, message } = args

      if (level === 'error')
        runtimeError.value = message || ''

      else if (level === 'warn')
        runtimeWarn.value = message || ''
    }
  }
}

export function createSandboxProxy(iframe: Ref<HTMLIFrameElement | undefined>) {
  return new SandBoxProxy(iframe)
}
