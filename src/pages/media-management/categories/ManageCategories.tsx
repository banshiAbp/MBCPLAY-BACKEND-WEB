import React, { useState, ChangeEvent } from "react";
import FileUploadProgress from "../../../components/FileUploadProgress";
import API_BASE_URL from "../../../config/api";
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUploadError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE_URL}utility/upload-image`);
        const token = localStorage.getItem("token");
        if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
        xhr.onload = () => {
          setUploading(false);
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.code === 200 && data.data.public_url) {
              // use server path for preview and submission
              setImageUrl(data.data.public_url);
              // clear local preview, always use imageUrl
              setUploadProgress(100);
              // Do NOT set any success message here
            } else {
              setImageUploadError(data.message || "Image upload failed");
            }
          } catch {
            setImageUploadError("Image upload failed");
          }
        };
        xhr.onerror = () => {
          setUploading(false);
          setImageUploadError("Image upload failed");
        };
        xhr.send(formData);
      } catch (err) {
        setUploading(false);
        setImageUploadError("Image upload failed");
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
      const response = await fetch(`${API_BASE_URL}category/manage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          categoryTitle: name,
          categoryDescription: description,
          categoryImagePath: imageUrl || "",
          categoryStatus: status,
        }),
      });
      const data = await response.json();
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
