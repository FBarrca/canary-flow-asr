import * as React from 'react'
import { Button, Card, Text, Title3 } from '@fluentui/react-components'
import Pill from '@renderer/components/Pill'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <Card
      style={{
        minWidth: 360,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        alignItems: 'center'
      }}
    >
      <Title3>Welcome to Canary Flow</Title3>
      <Text>
        Build an Electron app with <b>React</b> and <b>TypeScript</b> using Fluent UI.
      </Text>
      <Text>
        Try pressing <code>F12</code> to open the DevTools.
      </Text>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button as="a" href="https://react.fluentui.dev/" target="_blank" appearance="primary">
          Fluent UI Docs
        </Button>
        <Button appearance="secondary" onClick={ipcHandle}>
          Send IPC
        </Button>
      </div>
      <Pill />
    </Card>
  )
}

export default App
