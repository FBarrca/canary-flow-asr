import { ipcMain, BrowserWindow } from 'electron'
import { Settings, getSettings, saveSettings, onSettingsChange } from './store'
import { toggleOverlay } from './overlay-window'

export function setupIpcHandlers(): void {
  ipcMain.on('ping', (event) => {
    console.log('pong')
    event.reply('pong')
  })

  ipcMain.on('theme-changed', (_, newTheme: string) => {
    // Forward the theme change to all windows
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('theme-changed', newTheme)
    })
  })

  ipcMain.on('save-settings', (_, settings: Partial<Settings>) => {
    saveSettings(settings)
  })

  ipcMain.handle('get-settings', () => {
    return getSettings()
  })

  ipcMain.on('toggle-overlay', () => {
    toggleOverlay()
  })

  // Setup store change listeners
  try {
    onSettingsChange((key, value) => {
      // Forward settings changes to all windows
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send('settings-changed', { key, value })
      })
    })
  } catch (error) {
    console.error('Error setting up store change listeners:', error)
  }
}
