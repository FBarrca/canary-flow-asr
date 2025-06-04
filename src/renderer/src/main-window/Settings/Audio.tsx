


import React from "react";
import { Label, Dropdown, Option, Slider, Switch } from "@fluentui/react-components";
import { Mic24Regular } from "@fluentui/react-icons";
import SectionCard from "./Sectioncard";
import Row from "./Row";

const AudioSettings: React.FC = () => {
  return (
    <SectionCard
    icon={<Mic24Regular />}
    title="Audio Input"
    description="Configure your microphone and audio input settings"
  >
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label htmlFor="input-device">Input Device</Label>
        <Dropdown placeholder="Select microphone" style={{ width: 280 }}>
          <Option value="default">Default Microphone</Option>
          <Option value="usb-mic">USB Microphone (Blue Yeti)</Option>
          <Option value="headset">Headset Microphone</Option>
          <Option value="internal">Internal Microphone</Option>
        </Dropdown>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>Input Gain</Label>
        <Slider defaultValue={50} max={100} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <Row>
        <div>
          <Label>Noise Reduction</Label>
          <p style={{ fontSize: 12, opacity: 0.6 }}>
            Reduce background noise during transcription
          </p>
        </div>
        <Switch defaultChecked aria-label="Noise reduction" />
      </Row>

      <Row>
        <div>
          <Label>Auto Gain Control</Label>
          <p style={{ fontSize: 12, opacity: 0.6 }}>
            Automatically adjust input levels
          </p>
        </div>
        <Switch defaultChecked aria-label="Auto gain" />
      </Row>
    </div>
  </SectionCard>
  );
};

export default AudioSettings;
