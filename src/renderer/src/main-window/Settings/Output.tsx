

import React from "react";
import { Label, Dropdown, Option, Input, Switch, Button, Text, Divider } from "@fluentui/react-components";
import { Folder24Regular } from "@fluentui/react-icons";
import SectionCard from "./Sectioncard";
import Row from "./Row";
import { useSettings } from "../../hooks/useSettings";


const OutputSettings: React.FC = () => {
    const { settings, setSetting } = useSettings();
    const [autoSave, setAutoSave] = React.useState<boolean>(settings.autoSave ?? false);

    return (<SectionCard
        icon={<Folder24Regular />}
        title="Output Settings"
        description="Configure how transcriptions are saved and exported"
    >
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label>Default Save Location</Label>
                <div style={{ display: "flex", gap: 8 }}>
                    <Input value="/Users/username/Documents/Transcriptions" readOnly style={{ flex: 1 }} />
                    <Button appearance="secondary">Browse</Button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label>Default File Format</Label>
                <Dropdown placeholder="Select format" style={{ width: 220 }}>
                    {[
                        ["txt", "Plain Text (.txt)"],
                        ["docx", "Word Document (.docx)"],
                        ["pdf", "PDF Document (.pdf)"],
                        ["srt", "Subtitle File (.srt)"],
                        ["vtt", "WebVTT (.vtt)"],
                        ["json", "JSON (.json)"],
                    ].map(([val, label]) => (
                        <Option key={val} value={val}>
                            {label}
                        </Option>
                    ))}
                </Dropdown>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label>File Naming Convention</Label>
                <Dropdown placeholder="Select naming pattern" style={{ width: 260 }}>
                    <Option value="timestamp">Timestamp (2024-01-15_14-30-25)</Option>
                    <Option value="date">Date Only (2024-01-15)</Option>
                    <Option value="custom">Custom Prefix + Timestamp</Option>
                    <Option value="manual">Manual Naming</Option>
                </Dropdown>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Label>Custom Prefix</Label>
                <Input placeholder="e.g., Meeting, Interview, Notes" />
            </div>

            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ fontWeight: 500 }}>Auto‑Save Options</h4>

                <Row>
                    <div>
                        <Label>Auto‑save Transcriptions</Label>
                        <p style={{ fontSize: 12, opacity: 0.6 }}>
                            Automatically save completed transcriptions
                        </p>
                    </div>
                    <Switch
                        checked={autoSave}
                        onChange={(_, data) => {
                            setAutoSave(data.checked);
                            setSetting('autoSave', data.checked);
                        }}
                        aria-label="Auto save"
                    />
                </Row>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Label>Auto‑save Interval</Label>
                    <Dropdown placeholder="Select interval" style={{ width: 180 }}>
                        <Option value="30">Every 30 seconds</Option>
                        <Option value="60">Every minute</Option>
                        <Option value="300">Every 5 minutes</Option>
                        <Option value="600">Every 10 minutes</Option>
                    </Dropdown>
                </div>

                <Row>
                    <div>
                        <Label>Create Backup Copies</Label>
                        <p style={{ fontSize: 12, opacity: 0.6 }}>
                            Keep backup copies of transcriptions
                        </p>
                    </div>
                    <Switch aria-label="Backups" />
                </Row>
            </div>
        </div>
    </SectionCard>
    )
}

export default OutputSettings;