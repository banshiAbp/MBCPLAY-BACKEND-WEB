import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdvertisementDetail } from "../../../services/media-management/advertisements/getAdvertisementDetail";
import { createAdvertisement, updateAdvertisement } from "../../../services/media-management/advertisements/manageAdvertisementService";
import { AdvertisementManageRequest } from "../../../interfaces/media-management/advertisement/advertisementType";
import { transformAdvertisementDetail } from "../../../interfaces/media-management/advertisement/advertisementTransform";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import "../../../styles/media-management/manage-advertisements.scss";

const ManageAdvertisement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdvertisementManageRequest>({
    advertisementTitle: "",
    advertisementDescription: "",
    advertisementUrl: "",
    advertisementStatus: true,
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchAdvertisementDetail(id);
    }
  }, [isEdit, id]);

  const fetchAdvertisementDetail = async (advertisementId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const { data } = await getAdvertisementDetail({
        id: advertisementId,
        token,
      });

      const advertisement = transformAdvertisementDetail(data);
      setFormData({
        advertisementTitle: advertisement.advertisementTitle,
        advertisementDescription: advertisement.advertisementDescription,
        advertisementUrl: advertisement.advertisementUrl,
        advertisementStatus: advertisement.advertisementStatus,
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch advertisement details.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (isEdit && id) {
        await updateAdvertisement({
          id,
          data: formData,
          token,
        });
        setSuccess("Advertisement updated successfully!");
      } else {
        await createAdvertisement({
          data: formData,
          token,
        });
        setSuccess("Advertisement created successfully!");
      }

      setTimeout(() => {
        navigate("/media-management/advertisements");
      }, 1500);
    } catch (err: any) {
      setError(err.message || `Failed to ${isEdit ? "update" : "create"} advertisement.`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="manage-advertisements-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Advertisements", path: "/media-management/advertisements" },
          { label: isEdit ? "Edit Advertisement" : "New Advertisement" },
        ]}
      />

      <div className="manage-advertisements-container">
        <h2 className="manage-advertisements-title">
          {isEdit ? "Edit Advertisement" : "New Advertisement"}
        </h2>

        {error && (
          <StatusMessage
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {success && (
          <StatusMessage
            type="success"
            message={success}
            onClose={() => setSuccess(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="manage-advertisements-form">
          <div className="form-group">
            <label htmlFor="advertisementTitle" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="advertisementTitle"
              name="advertisementTitle"
              value={formData.advertisementTitle}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter advertisement title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="advertisementDescription" className="form-label">
              Description *
            </label>
            <textarea
              id="advertisementDescription"
              name="advertisementDescription"
              value={formData.advertisementDescription}
              onChange={handleInputChange}
              className="form-textarea"
              required
              placeholder="Enter advertisement description"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="advertisementUrl" className="form-label">
              URL *
            </label>
            <input
              type="url"
              id="advertisementUrl"
              name="advertisementUrl"
              value={formData.advertisementUrl}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="advertisementStatus"
                checked={formData.advertisementStatus}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="form-checkbox-text">Active</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/media-management/advertisements")}
              className="btn btn-secondary"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageAdvertisement;
