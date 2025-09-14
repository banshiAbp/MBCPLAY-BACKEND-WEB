import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLanguageDetail } from "../../../services/media-management/languages/getLanguageDetail";
import { createOrUpdateLanguage } from "../../../services/media-management/languages/manageLanguageService";
import { LanguageType } from "../../../interfaces/media-management/language/languageType";
import StatusMessage from "../../../components/StatusMessage";
import Loader from "../../../components/Loader";
import FormElementToggleSwitch from "../../../components/FormElementToggleSwitch";
import "../../../styles/media-management/manage-language.scss";
import Breadcrumb from "../../../components/Breadcrumb";

const ManageLanguage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<LanguageType>>({
    languageTitle: "",
    languageFontSample: "",
    languageStatus: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      const token = localStorage.getItem("token");
      getLanguageDetail({ id, token }).then(({ data }) => {
        if (data && data.data) {
          setForm({
            languageTitle: data.data.language_title || "",
            languageFontSample: data.data.language_font_sample || "",
            languageStatus: Boolean(data.data.language_status),
          });
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createOrUpdateLanguage(form, id);
      setSuccess("Language saved successfully");
    } catch {
      setError("Failed to save language");
    } finally {
      setLoading(false);
      setTimeout(() => navigate("/media-management/languages"), 2000);
    }
  };

  return (
    <>
      <Loader visible={loading} />
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Languages", path: "/media-management/languages" },
          { label: id ? "Edit Language" : "Add Language" },
        ]}
      />
      <div className="manage-genres-page">
        {error && (
          <StatusMessage
            type="error"
            message={error}
            onClose={() => setError("")}
          />
        )}
        {success && (
          <StatusMessage
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}
        <div className="manage-genres-back-row">
          <span className="manage-genres-back-btn" onClick={() => navigate(-1)}>
            &laquo; Back
          </span>
        </div>
        <div className="manage-genres-form-card">
          {/* Row 1: Title and Font Sample */}
          <div className="manage-genres-form-row">
            <div className="manage-genres-form-col">
              <div className="manage-genres-form-label">Title</div>
              <input
                className="manage-genres-form-input"
                type="text"
                name="languageTitle"
                value={form.languageTitle || ""}
                onChange={handleChange}
                placeholder="Language Title"
                required
              />
            </div>
            <div className="manage-genres-form-col">
              <div className="manage-genres-form-label">Font Sample</div>
              <input
                className="manage-genres-form-input"
                type="text"
                name="languageFontSample"
                value={form.languageFontSample || ""}
                onChange={handleChange}
                placeholder="Font Sample"
                required
              />
            </div>
          </div>

          {/* Row 2: Status */}
          <div className="manage-genres-form-row">
            <div className="manage-genres-form-col">
              <FormElementToggleSwitch
                label="Status"
                checked={!!form.languageStatus}
                onChange={(checked) =>
                  setForm((prev) => ({ ...prev, languageStatus: checked }))
                }
              />
            </div>
            <div className="manage-genres-form-col">
              {/* Empty column for alignment */}
            </div>
          </div>
          <div className="manage-genres-form-footer">
            <button
              className="manage-genres-form-save-btn"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              {id ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLanguage;
