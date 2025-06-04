"use client";

import * as React from "react";
import { Button, TabList, Tab } from "@fluentui/react-components";
import {
  Mic24Regular,
  DocumentText24Regular,
  Folder24Regular,
  Keyboard24Regular,
  Shield24Regular,
} from "@fluentui/react-icons";
import AudioSettings from "@renderer/main-window/Settings/Audio";
import TranscriptionSettings from "@renderer/main-window/Settings/Transcription";
import OutputSettings from "@renderer/main-window/Settings/Output";
import ShortcutsSettings from "@renderer/main-window/Settings/Shortcuts";
import PrivacySettings from "@renderer/main-window/Settings/Privacy";

export default function TranscriptionSettingsFluent() {
  // --- state --------------------------------------------------------------
  const [selectedTab, setSelectedTab] = React.useState<
    "audio" | "transcription" | "output" | "shortcuts" | "privacy"
  >("audio");

  // --- main ---------------------------------------------------------------
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0, // ← allow its children to shrink
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", }}>
       

          <TabList
            size="large"
            selectedValue={selectedTab}
            onTabSelect={(_, data) => setSelectedTab(data.value as any)}
            style={{
              marginBottom: 24,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 4,
            }}
          >
            <Tab icon={<Mic24Regular />} value="audio">
              Audio
            </Tab>
            <Tab icon={<DocumentText24Regular />} value="transcription">
              Transcription
            </Tab>
            <Tab icon={<Folder24Regular />} value="output">
              Output
            </Tab>
            <Tab icon={<Keyboard24Regular />} value="shortcuts">
              Shortcuts
            </Tab>
            <Tab icon={<Shield24Regular />} value="privacy">
              Privacy
            </Tab>
          </TabList>

          {/* AUDIO */}
          {selectedTab === "audio" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                minHeight: 0, // ← allow SectionCard to size correctly
                overflow: "hidden",
              }}
            >
              <AudioSettings />
            </div>
          )}

          {/* TRANSCRIPTION */}
          {selectedTab === "transcription" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <TranscriptionSettings />
            </div>
          )}

          {/* OUTPUT */}
          {selectedTab === "output" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <OutputSettings />
            </div>
          )}

          {/* SHORTCUTS */}
          {selectedTab === "shortcuts" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <ShortcutsSettings />
            </div>
          )}

          {/* PRIVACY */}
          {selectedTab === "privacy" && (
            <div
              style={{
                flex: 1,
                display: "flex",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <PrivacySettings />
            </div>
          )}
        </div>
      </div>
      {/* Footer actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--colorNeutralStroke2)",
          padding: 24,
          background: "var(--colorNeutralBackground1)",
        }}
      >
        {/* Left: Heading and Description */}
        <div style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
            Canary Flow Settings
          </h1>
          <p style={{ opacity: 0.6, marginBottom: 0 }}>
            Configure your local voice transcription preferences
          </p>
        </div>
        {/* Right: Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <Button appearance="secondary">Reset to Defaults</Button>
          <Button appearance="primary">Save Settings</Button>
        </div>
      </div>
    </div>
  );
}
