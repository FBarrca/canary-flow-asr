import React from "react";

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {children}
    </div>
  );

  export default Row;