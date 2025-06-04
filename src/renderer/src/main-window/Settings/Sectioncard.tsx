import { Card, CardHeader, Text } from "@fluentui/react-components";

  // --- render helpers -----------------------------------------------------
  const SectionCard: React.FC<{
    icon: React.ReactElement;
    title: string;
    description: string;
    children: React.ReactNode;
  }> = ({ icon, title, description, children }) => (
    <Card
      /* full height so it can consume the free space from its parent */
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardHeader
        header={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {icon}
            <Text weight="semibold">{title}</Text>
          </div>
        }
        description={description}
      />

      {/* NEW: this is now the scrollable area */}
      <div
        style={{
          flex: 1,                 // stretch to fill
          minHeight: 0,            // crucial! lets this box actually get a fixed height
          overflowY: "auto",       // add the scrollbar here
          padding: 24,             // keep the nice spacing you already had
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {children}
      </div>
    </Card>
  );

  export default SectionCard;