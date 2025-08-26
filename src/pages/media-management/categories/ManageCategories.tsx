import React, { useState, ChangeEvent } from "react";
import FileUploadProgress from "../../../components/FileUploadProgress";
import { submitCategory } from "../../../services/media-management/categories/createNewCategoryService";
import { uploadCategoryImage } from "../../../services/media-management/categories/uploadCategory";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Breadcrumb from "../../../components/Breadcrumb";
import browseIcon from "../../../assets/browse.svg";
import "../../../styles/media-management/manage-categories.scss";

function ManageCategories() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // server path
  const [status, setStatus] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState<
    "success" | "error" | ""
  >("");

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageUploadError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setUploadProgress(0);
      const token = localStorage.getItem("token");
      try {
        const result = await uploadCategoryImage({
          file,
          token,
          onProgress: (progress) => setUploadProgress(progress),
        });
        console.log(result);
        setUploading(false);
        if (
          (result.status === 200 || result.status === 201) &&
          result.data &&
          result.data.public_url
        ) {
          setImageUrl(result.data.public_url);
          setUploadProgress(100);
        } else {
          setImageUploadError(result.message || "Image upload failed");
        }
      } catch (err: any) {
        setUploading(false);
        setImageUploadError(err?.message || "Image upload failed");
      }
    }
  };

  const handleSave = async () => {
    setTitleError("");
    setFormMessage("");
    setFormMessageType("");
    if (!name.trim()) {
      setTitleError("Title is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const { response, data } = await submitCategory({
        name,
        description,
        imageUrl,
        status,
        token,
      });
      if (response.ok) {
        setFormMessage("Category saved successfully!");
        setFormMessageType("success");
        setName("");
        setDescription("");
        setImageUrl("");
        setStatus(true);
      } else {
        setFormMessage(data.message || "Failed to save category.");
        setFormMessageType("error");
      }
    } catch (err) {
      setFormMessage("Network error.");
      setFormMessageType("error");
    }
  };

  return (
    <div className="categories-page">
      {formMessage && (
        <div
          style={{
            marginBottom: 16,
            padding: "10px 16px",
            borderRadius: 6,
            fontWeight: 600,
            color: formMessageType === "success" ? "#389e3d" : "#ff4d4f",
            background: formMessageType === "success" ? "#e6f9ea" : "#fff1f0",
            border: `1px solid ${
              formMessageType === "success" ? "#b7eb8f" : "#ffa39e"
            }`,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {formMessage}
        </div>
      )}
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Categories", path: "/media-management/categories" },
          { label: "Manage Category" },
        ]}
      />
      <div className="categories-back-row">
        <span className="categories-back-btn" onClick={() => navigate(-1)}>
          &laquo; Back
        </span>
      </div>
      <div className="categories-form-card">
        <div className="categories-form-row">
          {/* Image Upload */}
          <div className="categories-form-col">
            <div className="categories-form-label">Image</div>
            <div className="categories-image-upload-area">
              <div className="categories-image-upload-preview">
                {uploading && (
                  <FileUploadProgress
                    progress={uploadProgress}
                    visible={uploading}
                  />
                )}
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="preview"
                      className="categories-image-preview-img"
                    />
                    <span
                      className="categories-image-remove-btn"
                      title="Remove"
                      onClick={() => {
                        setImageUrl("");
                      }}
                    >
                      &#10060;
                    </span>
                  </>
                ) : (
                  <label className="categories-image-upload-label">
                    <img
                      src={browseIcon}
                      alt="Browse"
                      className="categories-image-upload-icon"
                    />
                    <span className="categories-browse-text">Browse</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="categories-browse-input"
                      disabled={uploading}
                    />
                  </label>
                )}
                {imageUploadError &&
                  imageUploadError !== "Image uploaded successfully" && (
                    <div
                      style={{ color: "#ff4d4f", fontSize: 14, marginTop: 4 }}
                    >
                      {imageUploadError}
                    </div>
                  )}
              </div>
            </div>
          </div>
          {/* Name */}
          <div className="categories-form-col">
            <div className="categories-form-label">
              Name<span className="categories-required">*</span>
            </div>
            <input
              className="categories-form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (titleError && e.target.value.trim()) setTitleError("");
              }}
              placeholder="Action"
            />
            {titleError && (
              <div style={{ color: "#ff4d4f", fontSize: 14, marginTop: 4 }}>
                {titleError}
              </div>
            )}
            <div className="categories-form-label categories-form-label-status">
              Status
            </div>
            <div className="categories-form-status-row">
              <span className="categories-status-active">Active</span>
              <ToggleSwitch checked={status} onChange={setStatus} />
            </div>
          </div>
          {/* Description */}
          <div className="categories-form-col">
            <div className="categories-form-label">Description</div>
            <textarea
              className="categories-form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide the description of the categories!!!"
              rows={6}
            />
          </div>
        </div>
        <div className="categories-form-footer">
          <button className="categories-form-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;
