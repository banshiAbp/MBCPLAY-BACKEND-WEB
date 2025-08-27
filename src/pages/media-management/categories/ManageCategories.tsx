import React, { useState, useEffect, ChangeEvent } from "react";
import FileUploadProgress from "../../../components/FileUploadProgress";
import { submitCategory } from "../../../services/media-management/categories/createNewCategoryService";
import { uploadCategoryImage } from "../../../services/media-management/categories/uploadCategory";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryDetail } from "../../../services/media-management/categories/getCategoryDetail";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Breadcrumb from "../../../components/Breadcrumb";
import browseIcon from "../../../assets/browse.svg";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import "../../../styles/components/status-message.scss";
import "../../../styles/loader.scss";
import "../../../styles/media-management/manage-categories.scss";

function ManageCategories() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState<
    "success" | "error" | ""
  >("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // If editing, fetch category details
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchCategory = async () => {
        const token = localStorage.getItem("token");
        const { data } = await getCategoryDetail({ id, token });
        if (data && data.data) {
          setName(data.data.category_title || "");
          setDescription(data.data.category_description || "");
          setImageUrl(data.data.category_image_path || "");
          setStatus(Boolean(data.data.category_status));
        }
        setLoading(false);
      };
      fetchCategory();
    }
  }, [id]);

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
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const { response, data } = await submitCategory({
        name,
        description,
        imageUrl,
        status,
        token,
        ...(id ? { id } : {}),
      });
      if (response.ok) {
        setFormMessage(
          id ? "Category updated successfully!" : "Category saved successfully!"
        );
        setFormMessageType("success");
        if (!id) {
          setName("");
          setDescription("");
          setImageUrl("");
          setStatus(true);
        }
      } else {
        setFormMessage(
          data.message ||
            (id ? "Failed to update category." : "Failed to save category.")
        );
        setFormMessageType("error");
      }
    } catch (err) {
      setFormMessage("Network error.");
      setFormMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Loader visible={saving || loading} />
      <div className="categories-page">
        {formMessage && formMessageType && (
          <StatusMessage
            type={formMessageType}
            message={formMessage}
            onClose={() => {
              setFormMessage("");
              setFormMessageType("");
            }}
          />
        )}
        <Breadcrumb
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Media Management", path: "/media-management" },
            { label: "Categories", path: "/media-management/categories" },
            { label: id ? "Edit Category" : "Manage Category" },
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
              {id ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCategories;
