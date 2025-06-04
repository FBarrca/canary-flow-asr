import { vi, describe, expect, test, beforeEach } from 'vitest'

vi.mock('electron', () => ({
  app: { setLoginItemSettings: vi.fn() }
}))

vi.mock('electron-store', () => {
  return {
    default: class {
      store: Record<string, any>
      constructor(options: any) {
        this.store = { ...(options.defaults || {}) }
      }
      get(key: string) {
        return this.store[key]
      }
      set(key: string, value: any) {
        this.store[key] = value
      }
      delete(key: string) {
        delete this.store[key]
      }
      onDidChange() {}
    }
  }
})

import { initializeStore, getSettings } from './store'

describe('store', () => {
  beforeEach(async () => {
    await initializeStore()
  })

  test('returns default settings after initialization', () => {
    expect(getSettings()).toEqual({
      startWithWindows: false,
      theme: 'light',
      toggleKeybind: []
    })
  })
})
