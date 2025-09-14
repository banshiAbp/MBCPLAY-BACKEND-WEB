import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdvertisementDetail } from "../../../services/media-management/advertisements/getAdvertisementDetail";
import { createAdvertisement, updateAdvertisement } from "../../../services/media-management/advertisements/manageAdvertisementService";
import { AdvertisementManageRequest } from "../../../interfaces/media-management/advertisement/advertisementType";
import { transformAdvertisementDetail } from "../../../interfaces/media-management/advertisement/advertisementTransform";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import ToggleSwitch from "../../../components/ToggleSwitch";
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
      console.log("Fetching advertisement detail for ID:", id);
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

      console.log("Calling getAdvertisementDetail with ID:", advertisementId);
      const { data } = await getAdvertisementDetail({
        id: advertisementId,
        token,
      });
      console.log("Advertisement detail response:", data);

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
    console.log("Form submitted!", { isEdit, id, formData });
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
        console.log("Calling updateAdvertisement API with:", { id, data: formData });
        await updateAdvertisement({
          id,
          data: formData,
          token,
        });
        setSuccess("Advertisement updated successfully!");
      } else {
        console.log("Calling createAdvertisement API with:", { data: formData });
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

      <div className="advertisements-back-row">
        <span className="advertisements-back-btn" onClick={() => navigate(-1)}>
          &laquo; Back
        </span>
      </div>

      <form onSubmit={handleSubmit} className="advertisements-form-card">
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

        {/* Row 1: Title and URL */}
        <div className="advertisements-form-row">
          <div className="advertisements-form-col">
            <div className="advertisements-form-label">
              Title<span className="advertisements-required">*</span>
            </div>
            <input
              type="text"
              className="advertisements-form-input"
              value={formData.advertisementTitle}
              onChange={handleInputChange}
              name="advertisementTitle"
              required
              placeholder="Enter advertisement title"
            />
          </div>
          <div className="advertisements-form-col">
            <div className="advertisements-form-label">
              URL<span className="advertisements-required">*</span>
            </div>
            <input
              type="url"
              className="advertisements-form-input"
              value={formData.advertisementUrl}
              onChange={handleInputChange}
              name="advertisementUrl"
              required
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Row 2: Status */}
        <div className="advertisements-form-row">
          <div className="advertisements-form-col">
            <div className="advertisements-form-label">
              Status
            </div>
            <div className="advertisements-form-status-row">
              <ToggleSwitch 
                checked={formData.advertisementStatus} 
                onChange={(checked) => setFormData(prev => ({ ...prev, advertisementStatus: checked }))} 
              />
            </div>
          </div>
          <div className="advertisements-form-col">
            {/* Empty column for alignment */}
          </div>
        </div>

        {/* Row 3: Description */}
        <div className="advertisements-form-row">
          <div className="advertisements-form-col advertisements-form-col-full">
            <div className="advertisements-form-label">Description</div>
            <textarea
              className="advertisements-form-textarea"
              value={formData.advertisementDescription}
              onChange={handleInputChange}
              name="advertisementDescription"
              required
              placeholder="Enter advertisement description"
              rows={6}
            />
          </div>
        </div>

        <div className="advertisements-form-footer">
          <button 
            type="button" 
            className="advertisements-form-reset-btn" 
            onClick={() => setFormData({
              advertisementTitle: "",
              advertisementDescription: "",
              advertisementUrl: "",
              advertisementStatus: true,
            })}
            disabled={saving}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="advertisements-form-save-btn" 
            disabled={saving}
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageAdvertisement;
