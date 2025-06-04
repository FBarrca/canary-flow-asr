import React, { createContext, useContext, useEffect, useState } from 'react'

export interface SettingsState {
  inputDevice?: string
  autoSave?: boolean
  shortcuts?: Record<string, string>
  confidence?: number
  punctuation?: boolean
}

interface SettingsContextValue {
  settings: SettingsState
  setSetting: (key: keyof SettingsState, value: any) => void
  saveSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      return JSON.parse(localStorage.getItem('settings') || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    const handler = (_: unknown, { key, value }: { key: string; value: any }) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    }
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.invoke('get-settings').then(stored => {
        setSettings(prev => ({ ...prev, ...stored }))
      })
      window.electron.ipcRenderer.on('settings-changed', handler)
    }
    return () => {
      window.electron?.ipcRenderer.removeListener('settings-changed', handler)
    }
  }, [])

  const setSetting = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    localStorage.setItem('settings', JSON.stringify(settings))
    window.electron?.ipcRenderer.send('save-settings', settings)
  }

  return (
    <SettingsContext.Provider value={{ settings, setSetting, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider')
  }
  return ctx
}
