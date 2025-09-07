import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import ToggleSwitch from "../../../components/ToggleSwitch";
import { Genre } from "../../../interfaces/media-management/genre/genreType";
import { getGenreDetail } from "../../../services/media-management/genres/getGenreDetail";
import { submitGenre } from "../../../services/media-management/genres/createOrUpdateGenreService";
import "../../../styles/media-management/manage-genres.scss";

const ManageGenres: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      const token = localStorage.getItem("token");
      getGenreDetail({ id, token }).then(({ data }) => {
        if (data && data.data) {
          setTitle(data.data.genre_title || "");
          setDescription(data.data.genre_description || "");
          setCode(data.data.genre_code || "");
          setStatus(Boolean(data.data.genre_status));
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSave = async () => {
    setFormMessage("");
    setFormMessageType("");
    if (!title.trim()) {
      setFormMessage("Title is required");
      setFormMessageType("error");
      return;
    }
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      const { response, data } = await submitGenre({
        title,
        description,
        code,
        status,
        token,
        id,
      });
      if (data.code == 200) {
        setFormMessage("Genre saved successfully");
        setFormMessageType("success");
        if (!id) {
          setTitle("");
          setDescription("");
          setCode("");
          setStatus(true);
        }
      } else {
        setFormMessage(data.message || "Failed to save genre");
        setFormMessageType("error");
      }
    } catch (err: any) {
      setFormMessage(err.message || "Failed to save genre");
      setFormMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Loader visible={saving || loading} />
      <div className="manage-genres-page">
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
            { label: "Genres", path: "/media-management/genres" },
            { label: id ? "Edit Genre" : "Add Genre" },
          ]}
        />
        <div className="manage-genres-back-row">
          <span className="manage-genres-back-btn" onClick={() => navigate(-1)}>
            &laquo; Back
          </span>
        </div>
        <div className="manage-genres-form-card">
          <div className="manage-genres-form-row">
            <div className="manage-genres-form-col">
              <div className="manage-genres-form-card">
                {loading ? (
                  <Loader visible={true} />
                ) : (
                  <>
                    <div className="manage-genres-form-row">
                      <div className="manage-genres-form-col">
                        <div className="manage-genres-form-label">Title</div>
                        <input
                          className="manage-genres-form-input"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Genre Title"
                        />
                      </div>
                      <div className="manage-genres-form-col">
                        <div className="manage-genres-form-label">Code</div>
                        <input
                          className="manage-genres-form-input"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Genre Code"
                        />
                      </div>
                      <div className="manage-genres-form-col">
                        <div className="manage-genres-form-label">Status</div>
                        <ToggleSwitch checked={status} onChange={setStatus} />
                      </div>
                    </div>
                    <div className="manage-genres-form-row">
                      <div className="manage-genres-form-col">
                        <div className="manage-genres-form-label">
                          Description
                        </div>
                        <textarea
                          className="manage-genres-form-textarea"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Genre Description"
                          rows={6}
                        />
                      </div>
                    </div>
                    <div className="manage-genres-form-footer">
                      <button
                        className="manage-genres-form-save-btn"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {id ? "Update" : "Save"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageGenres;
