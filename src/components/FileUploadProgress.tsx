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
          background: "#222",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 1px 2px #0001",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#389e3d",
            transition: "width 0.2s",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#389e3d",
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
