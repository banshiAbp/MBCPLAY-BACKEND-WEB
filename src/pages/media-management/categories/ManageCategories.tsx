import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Breadcrumb from "../../../components/Breadcrumb";
import browseIcon from "../../../assets/browse.svg";
import "../../../styles/media-management/manage-categories.scss";

const ManageCategories: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Handle file input change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="categories-page">
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
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="preview"
                      className="categories-image-preview-img"
                    />
                    <span
                      className="categories-image-remove-btn"
                      title="Remove"
                      onClick={() => setImage(null)}
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
                    />
                  </label>
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
              onChange={(e) => setName(e.target.value)}
              placeholder="Action"
            />
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
            <div className="categories-form-label">
              Description <span className="categories-required">*</span>
            </div>
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
          <button className="categories-form-save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
