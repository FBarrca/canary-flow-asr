import '../assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import TranscriptionSettingsFluent from '@renderer/main-window/Settings'
import { SettingsProvider } from '../hooks/useSettings'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

console.log('Mounting React application...')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <FluentProvider theme={webDarkTheme} style={{ height: '100%', width: '100%' }}>
      <SettingsProvider>
        <TranscriptionSettingsFluent />
      </SettingsProvider>
    </FluentProvider>
  </StrictMode>
)
