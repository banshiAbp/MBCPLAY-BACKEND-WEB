import React from "react";
import browseIcon from "../assets/browse.svg";
import FileUploadProgress from "./FileUploadProgress";
import "../styles/components/image-upload.scss";

interface ImageUploadProps {
  imageUrl: string;
  uploading: boolean;
  uploadProgress: number;
  imageUploadError: string;
  onRemove: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  uploading,
  uploadProgress,
  imageUploadError,
  onRemove,
  onChange,
  disabled,
  label = "Image",
}) => (
  <>
    <div className="categories-form-label">{label}</div>
    <div className="image-upload-area">
      <div className="image-upload-preview">
        {uploading && (
          <FileUploadProgress progress={uploadProgress} visible={uploading} />
        )}
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="preview" className="image-preview-img" />
            <span
              className="image-remove-btn"
              title="Remove"
              onClick={onRemove}
            >
              &#10060;
            </span>
          </>
        ) : (
          <label className="image-upload-label">
            <img src={browseIcon} alt="Browse" className="image-upload-icon" />
            <span className="browse-text">Browse</span>
            <input
              type="file"
              accept="image/*"
              onChange={onChange}
              className="browse-input"
              disabled={disabled}
            />
          </label>
        )}
        {imageUploadError &&
          imageUploadError !== "Image uploaded successfully" && (
            <div style={{ color: "#ff4d4f", fontSize: 14, marginTop: 4 }}>
              {imageUploadError}
            </div>
          )}
      </div>
    </div>
  </>
);

export default ImageUpload;
