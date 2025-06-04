import * as React from 'react'
import { Button, Text, Title3 } from '@fluentui/react-components'
import { useSettings } from '../hooks/useSettings'

function App(): React.JSX.Element {
  const { settings } = useSettings()
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div
      style={{
        minWidth: 360,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center',
        background: 'transparent',
        boxShadow: 'none'
      }}
    >
      <Title3>OVERLAY</Title3>
      <Text>
        Build an Electron app with <b>React</b> and <b>TypeScript</b> using Fluent UI.
      </Text>
      <Text>
        Try pressing <code>F12</code> to open the DevTools.
      </Text>
      <Text>Current input device: {settings.inputDevice || 'system default'}</Text>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button as="a" href="https://react.fluentui.dev/" target="_blank" appearance="primary">
          Fluent UI Docs
        </Button>
        <Button appearance="secondary" onClick={ipcHandle}>
          Send IPC
        </Button>
      </div>
    </div>
  )
}

export default App
