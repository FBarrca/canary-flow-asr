import { app } from 'electron'

export interface Settings {
  startWithWindows: boolean
  theme: string
  toggleKeybind: string[]
}

let store: any = null

export async function initializeStore() {
  const Store = (await import('electron-store')).default
  store = new Store({
    defaults: {
      startWithWindows: false,
      theme: 'light',
      toggleKeybind: []
    }
  })
}

export function getSettings(): Settings {
  return {
    startWithWindows: store.get('startWithWindows'),
    theme: store.get('theme'),
    toggleKeybind: store.get('toggleKeybind')
  }
}

export function saveSettings(settings: Partial<Settings>) {
  Object.entries(settings).forEach(([key, value]) => {
    if (value === undefined) {
      store.delete(key)
    } else {
      store.set(key, value)
    }
  })
  
  // Handle specific settings
  if ('startWithWindows' in settings) {
    app.setLoginItemSettings({
      openAtLogin: !!settings.startWithWindows
    })
  }
}

// Add proper store change event handling
export function onSettingsChange(callback: (key: string, value: any) => void) {
  if (!store) return
  
  // Listen for changes on each setting key
  const keys: (keyof Settings)[] = ['startWithWindows', 'theme', 'toggleKeybind']
  keys.forEach(key => {
    // Use the correct method signature for onDidChange
    store.onDidChange(key.toString(), (newValue: any) => {
      callback(key.toString(), newValue)
    })
  })
}   