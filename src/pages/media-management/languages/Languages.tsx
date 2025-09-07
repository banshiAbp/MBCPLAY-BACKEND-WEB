import React, { useEffect, useState } from "react";
import { getLanguageList } from "../../../services/media-management/languages/getLanguageList";
import { LanguageType } from "../../../interfaces/media-management/language/languageType";
import { transformLanguageApiData } from "../../../interfaces/media-management/language/languageTransform";
import HeaderToolbar from "../../../components/HeaderToolbar";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import "../../../styles/media-management/languages.scss";
import Breadcrumb from "../../../components/Breadcrumb";
import ToggleSwitch from "../../../components/ToggleSwitch";

const Languages: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchLanguages(token, currentPage);
    }
  }, [currentPage]);

  const fetchLanguages = async (token: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getLanguageList({
        page,
        token,
      });
      setLanguages((data.data.languages || []).map(transformLanguageApiData));
      setTotalPages(data.data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch languages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="languages-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Languages" },
        ]}
      />
      <h2 className="languages-title">Languages</h2>
      <HeaderToolbar
        showSearchTypeDropdown={true}
        showSearchBox={true}
        showAddNewButton={true}
        searchPlaceholder="Search Language..."
        addNewLabel="Add"
        onAddNew={() => navigate("/media-management/languages/manage")}
      />
      <Loader visible={loading} />
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}
      <div className="languages-table-wrapper">
        <table className="languages-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Font Sample</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {languages.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data">
                  No languages found.
                </td>
              </tr>
            ) : (
              languages.map((lang) => (
                <tr key={lang.languageId}>
                  <td>{lang.languageTitle}</td>
                  <td style={{ fontFamily: "inherit" }}>
                    {lang.languageFontSample}
                  </td>
                  <td>
                    <ToggleSwitch
                      checked={lang.languageStatus}
                      onChange={() => {}}
                    />
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/media-management/languages/manage/${lang.languageId}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Languages;
