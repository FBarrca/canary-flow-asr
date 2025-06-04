

import React from "react";
import { Label, Dropdown, Option, Switch, Button, Divider } from "@fluentui/react-components";
import { Shield24Regular, Delete24Regular } from "@fluentui/react-icons";
import SectionCard from "./Sectioncard";
import Row from "./Row";

const PrivacySettings: React.FC = () => {

    return (
<SectionCard
icon={<Shield24Regular />}
title="Privacy & Data"
description="Manage your privacy settings and local data storage"
>
<div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Row>
      <div>
        <Label>Store Audio Files</Label>
        <p style={{ fontSize: 12, opacity: 0.6 }}>
          Keep original audio files after transcription
        </p>
      </div>
      <Switch aria-label="Store audio" />
    </Row>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Label>Data Retention Period</Label>
      <Dropdown placeholder="Select retention period" style={{ width: 200 }}>
        <Option value="forever">Keep Forever</Option>
        <Option value="1year">1 Year</Option>
        <Option value="6months">6 Months</Option>
        <Option value="3months">3 Months</Option>
        <Option value="1month">1 Month</Option>
      </Dropdown>
    </div>

    <Row>
      <div>
        <Label>Encrypt Stored Files</Label>
        <p style={{ fontSize: 12, opacity: 0.6 }}>
          Encrypt transcriptions and audio files
        </p>
      </div>
      <Switch defaultChecked aria-label="Encrypt files" />
    </Row>

    <Row>
      <div>
        <Label>Anonymous Usage Statistics</Label>
        <p style={{ fontSize: 12, opacity: 0.6 }}>
          Help improve the app by sharing anonymous usage data
        </p>
      </div>
      <Switch aria-label="Usage stats" />
    </Row>
  </div>

  <Divider />

  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <h4
      style={{
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Delete24Regular /> Data Management
    </h4>

    {[
      [
        "history",
        "Clear Transcription History",
        "Remove all saved transcriptions",
      ],
      [
        "cache",
        "Clear Audio Cache",
        "Remove cached audio files (2.3 GB)",
      ],
      [
        "export",
        "Export All Data",
        "Download all your transcriptions and settings",
      ],
    ].map(([key, label, desc]) => (
      <div
        key={key as string}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          border: "1px solid var(--colorNeutralStroke2)",
          borderRadius: 8,
        }}
      >
        <div>
          <Label>{label}</Label>
          <p style={{ fontSize: 12, opacity: 0.6 }}>{desc}</p>
        </div>
        <Button appearance="secondary" size="small">
          {key === "export" ? "Export" : "Clear"}
        </Button>
      </div>
    ))}
  </div>
</div>
</SectionCard>
)
}

export default PrivacySettings;