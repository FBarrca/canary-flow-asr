import { Tray, Menu, app } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { getMainWindow } from './main-window'

let tray: Tray | null = null

export function createTray(): void {
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        getMainWindow()?.show()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('Canary Flow')
  tray.setContextMenu(contextMenu)
}

export function getTray(): Tray | null {
  return tray
} 