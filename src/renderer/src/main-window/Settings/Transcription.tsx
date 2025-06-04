
import React from "react";
import { Label, Dropdown, Option, Slider, Switch, Badge, Text, Divider } from "@fluentui/react-components";
import { TextGrammarWand24Regular } from "@fluentui/react-icons";
import SectionCard from "./Sectioncard";
import Row from "./Row";

const TranscriptionSettings: React.FC = () => {
  // Add the use of React state for confidence and punctuation
  const [confidence, setConfidence] = React.useState<number>(80);
  const [punctuation, setPunctuation] = React.useState<boolean>(true);

  return (
    <SectionCard
      icon={<TextGrammarWand24Regular />}
      title="Language & Model"
      description="Configure transcription language and model settings"
    >
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>Primary Language</Label>
          <Dropdown placeholder="Select language" style={{ width: 220 }}>
            {[
              ["en", "English"],
              ["es", "Spanish"],
              ["fr", "French"],
              ["de", "German"],
              ["it", "Italian"],
              ["pt", "Portuguese"],
              ["ru", "Russian"],
              ["ja", "Japanese"],
              ["ko", "Korean"],
              ["zh", "Chinese"],
            ].map(([val, label]) => (
              <Option key={val} value={val}>
                {label}
              </Option>
            ))}
          </Dropdown>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>Transcription Model</Label>
          <Dropdown placeholder="Select model" style={{ width: 220 }}>
            <Option value="whisper-base" text="Whisper Base">
              Whisper Base <Badge appearance="tint">Fast</Badge>
            </Option>
            <Option value="whisper-small" text="Whisper Small">
              Whisper Small <Badge appearance="tint">Balanced</Badge>
            </Option>
            <Option value="whisper-medium" text="Whisper Medium">
              Whisper Medium <Badge appearance="tint">Accurate</Badge>
            </Option>
            <Option value="whisper-large" text="Whisper Large">
              Whisper Large <Badge appearance="tint">Best</Badge>
            </Option>
          </Dropdown>
          <Text size={200} style={{ opacity: 0.6 }}>
            Larger models provide better accuracy but require more processing power
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>Confidence Threshold</Label>
          <Slider
            value={confidence}
            onChange={(_, data) => setConfidence(data.value as number)}
            max={100}
            step={5}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            <span>0%</span>
            <span>{confidence}%</span>
            <span>100%</span>
          </div>
          <Text size={200} style={{ opacity: 0.6 }}>
            Words below this confidence level will be highlighted
          </Text>
        </div>

        <Divider />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h4 style={{ fontWeight: 500 }}>Processing Options</h4>
          <Row>
            <div>
              <Label>Auto Punctuation</Label>
              <p style={{ fontSize: 12, opacity: 0.6 }}>
                Automatically add punctuation marks
              </p>
            </div>
            <Switch
              checked={punctuation}
              onChange={(_, data) => setPunctuation(data.checked)}
              aria-label="Auto punctuation"
            />
          </Row>
        </div>
      </div>
    </SectionCard>
  );
};

export default TranscriptionSettings;