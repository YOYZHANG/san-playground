import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

let uid = 0
export const runtimeError = reactive<string[]>([])
export const runtimeWarn = reactive<string[]>([])

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
    const pendingP = this.pendingActionMap.get(cmdId)

    if (!pendingP) {
      console.error('command not find', cmdId, action)
      return
    }

    const { resolve, reject } = pendingP

    if (action === 'ok') {
      resolve(args)
      this.pendingActionMap.delete(cmdId)
    }
    else if (action === 'error') {
      const { message, stack } = args as { message: string; stack: string }

      runtimeError.push(`[San Error]: ${message}; stack: ${stack}`)
      reject(args)
      this.pendingActionMap.delete(cmdId)
    }
    else if (action === 'unhandledRejection') {
      const { message, stack } = args as { message: string; stack: string }

      runtimeError.push(`[UnhandledRejection San Error]: ${message}; stack: ${stack}`)
      reject(args)
      this.pendingActionMap.delete(cmdId)
    }
    else if (action === 'console') {
      const { level, message } = args

      if (level === 'error')
        runtimeError.push(message!)

      else if (level === 'warn')
        runtimeWarn.push(message!)
    }
  }
}

export function createSandboxProxy(iframe: Ref<HTMLIFrameElement | undefined>) {
  return new SandBoxProxy(iframe)
}
