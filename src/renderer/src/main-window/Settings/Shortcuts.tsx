import React from "react";
import { Label, Switch, Badge, Text, Divider, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from "@fluentui/react-components";
import { Keyboard24Regular } from "@fluentui/react-icons";
import SectionCard from "./Sectioncard";
import Row from "./Row";

const ShortcutsSettings: React.FC = () => {

    const [editingShortcut, setEditingShortcut] = React.useState<string | null>(null);
    const [shortcuts, setShortcuts] = React.useState<Record<string, string>>({
        startStop: "Ctrl+Shift+R",
        pauseResume: "Ctrl+Shift+P",
        save: "Ctrl+Shift+S",
        new: "Ctrl+Shift+N",
        settings: "Ctrl+Shift+O",
        mute: "Ctrl+Shift+M",
    });

    const [capturedKeys, setCapturedKeys] = React.useState<string[]>([]);

    const handleKeyCapture = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        setCapturedKeys(prev => prev.includes(key) ? prev : [...prev, key]);
    };
    React.useEffect(() => {
        if (editingShortcut === null) return;
        window.addEventListener("keydown", handleKeyCapture);
        return () => window.removeEventListener("keydown", handleKeyCapture);
    }, [editingShortcut]);

    const cancelShortcut = () => {
        setEditingShortcut(null);
        setCapturedKeys([]);
    };

    const saveShortcut = () => {
        if (capturedKeys.length > 0) {
            setShortcuts({ ...shortcuts, [editingShortcut as string]: capturedKeys.join(" + ") });
            setEditingShortcut(null);
            setCapturedKeys([]);
        }
    };

    return (
        <SectionCard
            icon={<Keyboard24Regular />}
            title="Keyboard Shortcuts"
            description="Customize keyboard shortcuts for quick access"
        >
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                    ["startStop", "Start/Stop Recording", "Toggle transcription recording"],
                    ["pauseResume", "Pause/Resume", "Pause or resume transcription"],
                    ["save", "Save Transcription", "Save current transcription"],
                    ["new", "New Transcription", "Start a new transcription session"],
                    ["settings", "Open Settings", "Open settings window"],
                    ["mute", "Toggle Mute", "Mute/unmute microphone"],
                ].map(([key, label, desc]) => (
                    <Row key={key as string}>
                        <div>
                            <Label>{label}</Label>
                            <p style={{ fontSize: 12, opacity: 0.6 }}>{desc}</p>
                        </div>
                        <Badge
                            appearance="outline"
                            style={{ cursor: "pointer" }}
                            onClick={() => setEditingShortcut(key as string)}
                        >
                            {shortcuts[key as string]}
                        </Badge>
                    </Row>
                ))}

                <Divider />

                <Row>
                    <div>
                        <Label>Global Shortcuts</Label>
                        <p style={{ fontSize: 12, opacity: 0.6 }}>
                            Enable shortcuts when app is not focused
                        </p>
                    </div>
                    <Switch aria-label="Global shortcuts" />
                </Row>
            </div>

            {/* Shortcut dialog */}
            <Dialog
                open={editingShortcut !== null}
                modalType="alert"
                onOpenChange={(_, data) => !data.open && cancelShortcut()}
            >
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Change Keyboard Shortcut</DialogTitle>
                        <DialogContent>
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: 32,
                                    border: "2px dashed var(--colorNeutralStroke2)",
                                    borderRadius: 8,
                                    marginBottom: 24,
                                }}
                            >
                                <Keyboard24Regular
                                    style={{
                                        width: 32,
                                        height: 32,
                                        opacity: 0.6,
                                        marginBottom: 8,
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: 12,
                                        opacity: 0.6,
                                        marginBottom: 16,
                                    }}
                                >
                                    Press your desired key combination
                                </p>
                                <Text
                                    weight="semibold"
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: 16,
                                    }}
                                >
                                    {capturedKeys.length > 0
                                        ? capturedKeys.join(" + ")
                                        : "Waiting for input..."}
                                </Text>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={cancelShortcut}>
                                Cancel
                            </Button>
                            <Button
                                onClick={saveShortcut}
                                disabled={capturedKeys.length < 2}
                            >
                                Save Shortcut
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </SectionCard>
    )
}

export default ShortcutsSettings;