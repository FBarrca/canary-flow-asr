import { BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

let overlayWindow: BrowserWindow | null = null

export function createOverlayWindow(): void {
  if (overlayWindow) return

  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const overlayWidth  = 180
  const overlayHeight = 65

  overlayWindow = new BrowserWindow({
    width:  overlayWidth,
    height: overlayHeight,
    x: Math.round((width  - overlayWidth ) / 2),
    y: Math.round(height - overlayHeight ),
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    focusable: false,
    skipTaskbar: true,
    show: true,
    hasShadow: false,
    resizable: false,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      backgroundThrottling: false
    }
  })

  // Load the page *before* we try to show-it
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    overlayWindow.loadURL(`${process.env.ELECTRON_RENDERER_URL}/overlay-window.html`)
  } else {
    overlayWindow.loadFile(join(__dirname, '../renderer/overlay-window.html'))
  }
  overlayWindow.setIgnoreMouseEvents(true, { forward: true })

  /** Wait for the first paint.  A transparent window only has real dimensions after this. */
  overlayWindow.once('ready-to-show', () => {
    overlayWindow?.showInactive()
  })

  overlayWindow.on('closed', () => { overlayWindow = null })
}

export function getOverlayWindow() {
  return overlayWindow
} 

export function toggleOverlay() {
  if (!overlayWindow) return
  overlayWindow.isVisible() ? overlayWindow.hide() : overlayWindow.showInactive()
}
