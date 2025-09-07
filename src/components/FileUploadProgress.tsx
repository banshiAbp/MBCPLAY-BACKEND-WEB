import React from "react";

interface FileUploadProgressProps {
  progress: number; // 0-100
  visible?: boolean;
}

const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  progress,
  visible = true,
}) => {
  if (!visible) return null;
  return (
    <div style={{ width: "100%", margin: "8px 0" }}>
      <div
        style={{
          height: 8,
          background: "var(--bs-text-dark)",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 1px 2px var(--bs-shadow-input)",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "var(--bs-text-success)",
            transition: "width 0.2s",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--bs-text-success)",
          marginTop: 2,
          textAlign: "right",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default FileUploadProgress;
