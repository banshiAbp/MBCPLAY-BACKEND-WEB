import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { manageMaturityRating } from "../../../services/media-management/maturity-ratings/manageMaturityRatingService";
import { getMaturityRatingDetail } from "../../../services/media-management/maturity-ratings/getMaturityRatingDetail";
import { transformMaturityRatingDetail } from "../../../interfaces/media-management/maturity-rating/maturityRatingTransform";
import FormElementToggleSwitch from "../../../components/FormElementToggleSwitch";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import "../../../styles/components/status-message.scss";
import "../../../styles/loader.scss";
import "../../../styles/media-management/manage-maturity-ratings.scss";

function ManageMaturityRating() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(true);
  const [titleError, setTitleError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState<
    "success" | "error" | ""
  >("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState("");

  // If editing, fetch maturity rating details
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchMaturityRating = async () => {
        try {
          const { data } = await getMaturityRatingDetail({
            id,
            navigate,
            setSessionExpired,
          });
          if (data && data.data) {
            const rating = transformMaturityRatingDetail(data.data);
            setTitle(rating.title || "");
            setDescription(rating.description || "");
            setCode(rating.code || "");
            setStatus(rating.status);
          }
        } catch (e) {
          // handled by fetchWithAuth
        } finally {
          setLoading(false);
        }
      };
      fetchMaturityRating();
    }
  }, [id, navigate]);

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setStatus(true);
    setTitleError("");
    setCodeError("");
    setFormMessage("");
    setFormMessageType("");
  };

  const handleSave = async () => {
    if (sessionExpired) return;
    setTitleError("");
    setCodeError("");
    setFormMessage("");
    setFormMessageType("");

    // Validation
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    if (!code.trim()) {
      setCodeError("Code is required");
      return;
    }

    setSaving(true);
    try {
      const { response, data } = await manageMaturityRating({
        title,
        description,
        code,
        status,
        ...(id ? { id } : {}),
      });
      if (response.ok) {
        setFormMessage(
          id ? "Maturity rating updated successfully!" : "Maturity rating saved successfully!"
        );
        setFormMessageType("success");
        if (!id) {
          setTitle("");
          setDescription("");
          setCode("");
          setStatus(true);
        }
      } else {
        setFormMessage(
          data.message ||
            (id ? "Failed to update maturity rating." : "Failed to save maturity rating.")
        );
        setFormMessageType("error");
      }
    } catch (err) {
      setFormMessage("Network error.");
      setFormMessageType("error");
    } finally {
      setSaving(false);
      setTimeout(() => navigate("/media-management/maturity-ratings"), 2000);
    }
  };

  return (
    <>
      <Loader visible={saving || loading} />
      <div className="maturity-ratings-page">
        {sessionExpired && (
          <StatusMessage
            type="error"
            message={sessionExpired}
            onClose={() => setSessionExpired("")}
          />
        )}
        <Breadcrumb
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Media Management", path: "/media-management" },
            { label: "Maturity Ratings", path: "/media-management/maturity-ratings" },
            { label: id ? "Edit Maturity Rating" : "Manage Maturity Rating" },
          ]}
        />
        <div className="maturity-ratings-back-row">
          <span className="maturity-ratings-back-btn" onClick={() => navigate(-1)}>
            &laquo; Back
          </span>
        </div>
        <div className="maturity-ratings-form-card">
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
          {/* Row 1: Title and Code */}
          <div className="maturity-ratings-form-row">
            <div className="maturity-ratings-form-col">
              <div className="maturity-ratings-form-label">
                Title<span className="maturity-ratings-required">*</span>
              </div>
              <input
                className="maturity-ratings-form-input"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError && e.target.value.trim()) setTitleError("");
                }}
                placeholder="PG-13"
              />
              {titleError && (
                <div style={{ color: "var(--bs-text-error)", fontSize: 14, marginTop: 4 }}>
                  {titleError}
                </div>
              )}
            </div>
            <div className="maturity-ratings-form-col">
              <div className="maturity-ratings-form-label">
                Code<span className="maturity-ratings-required">*</span>
              </div>
              <input
                className="maturity-ratings-form-input"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (codeError && e.target.value.trim()) setCodeError("");
                }}
                placeholder="PG13"
              />
              {codeError && (
                <div style={{ color: "var(--bs-text-error)", fontSize: 14, marginTop: 4 }}>
                  {codeError}
                </div>
              )}
            </div>
          </div>

         {/* Row 2: Status */}
         <div className="maturity-ratings-form-row">
           <div className="maturity-ratings-form-col">
             <FormElementToggleSwitch
               label="Status"
               checked={status}
               onChange={setStatus}
             />
           </div>
           <div className="maturity-ratings-form-col">
             {/* Empty column for alignment */}
           </div>
         </div>

          {/* Row 3: Description */}
          <div className="maturity-ratings-form-row">
            <div className="maturity-ratings-form-col maturity-ratings-form-col-full">
              <div className="maturity-ratings-form-label">Description</div>
              <textarea
                className="maturity-ratings-form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide the description of the maturity rating..."
                rows={6}
              />
            </div>
          </div>

          <div className="maturity-ratings-form-footer">
            <button className="maturity-ratings-form-reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button className="maturity-ratings-form-save-btn" onClick={handleSave}>
              {id ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageMaturityRating;
