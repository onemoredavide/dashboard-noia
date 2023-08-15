import clone from "just-clone"
import { StoreApi, UseBoundStore, create } from "zustand"

type SSEStore<Notification extends {type: string}, InitParams> = {
  evtSource: EventSource | null
  connected: boolean
  connect: (args: InitParams) => void
  close: () => void

  handlers: {
    [key in Notification["type"]]?: ((event: Extract<Notification, {type: key}>) => void)[]
  }

  addHandler<EventType extends Notification["type"]>(type: EventType, callback: (data: Extract<Notification, {type: EventType}>) => void): void
  removeHandler<EventType extends Notification["type"]>(type: EventType, callback: (data: Extract<Notification, {type: EventType}>) => void): void
}

const initialState = {
  handlers: {},
  evtSource: null,
  connected: false
}

export const createSSEStore = <Notification extends {type: string}, InitParams>(
  getSSE: (args: InitParams) => EventSource,
): UseBoundStore<StoreApi<Omit<SSEStore<Notification, InitParams>, "evtSource">>> => {
  return create<SSEStore<Notification, InitParams>>((set, get) => ({
    ...clone(initialState),

    addHandler<EventType extends Notification["type"]>(type: EventType, callback: (data: Extract<Notification, {type: EventType}>) => void): void {
      const handlers = get().handlers[type]

      if (handlers) {
        const index = handlers.findIndex(cb => cb === callback)

        if (index === -1) {
          handlers.push(callback)
        }

        return
      }

      get().handlers[type] = [callback]
    },

    removeHandler<EventType extends Notification["type"]>(type: EventType, callback: (data: Extract<Notification, {type: EventType}>) => void): void {
      const handlers = get().handlers[type]

      if (!handlers) {
        return
      }

      const index = handlers.findIndex(cb => cb === callback)

      if (index >= 0) {
        handlers.splice(index, 1)
      }
    },

    connect: (args: InitParams): void => {
      const eventSource = getSSE(args)

      eventSource.onmessage = (event: MessageEvent<{data?: Notification}>): void => {
        const data = event.data.data

        if (!data) {
          return
        }

        const type = data.type as Notification["type"]
        const handlers = get().handlers[type]

        // ? we do not have control over the response type, so we need to check if the type is in the handlers
        if (handlers) {
          handlers.forEach(cb => {
            cb(data as Extract<Notification, {type: typeof type}>)
          })
        }
      }

      set({ evtSource: eventSource, connected: true })
    },

    close: (): void => {
      const evtSource = get().evtSource

      if (evtSource) {
        evtSource.close()
      }

      set(clone(initialState))
    }
  }))
}

