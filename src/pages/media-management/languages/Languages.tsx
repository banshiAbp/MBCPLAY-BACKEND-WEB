import React, { useEffect, useState } from "react";
import { getLanguageList } from "../../../services/media-management/languages/getLanguageList";
import { LanguageType } from "../../../interfaces/media-management/language/languageType";
import { transformLanguageApiData } from "../../../interfaces/media-management/language/languageTransform";
import HeaderToolbar from "../../../components/HeaderToolbar";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import StatusMessage from "../../../components/StatusMessage";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/languages.scss";
import Breadcrumb from "../../../components/Breadcrumb";

const Languages: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Define table columns
  const columns: TableColumn[] = [
    { key: "languageTitle", label: "Title" },
    { 
      key: "languageFontSample", 
      label: "Font Sample",
      render: (value) => (
        <span style={{ fontFamily: "inherit" }}>{value}</span>
      )
    },
    { key: "languageStatus", label: "Status" },
    { key: "action", label: "Action" },
  ];

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

  const handleStatusToggle = (id: string) => {
    setLanguages((prev) =>
      prev.map((lang) => (lang.languageId === id ? { ...lang, languageStatus: !lang.languageStatus } : lang))
    );
    // TODO: Implement status update API call
  };

  const handleEdit = (id: string) => {
    navigate(`/media-management/languages/manage/${id}`);
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
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}
      <CommonTable
        columns={columns}
        data={languages}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onStatusToggle={handleStatusToggle}
        onEdit={handleEdit}
        noDataMessage="No languages found."
        className="languages-table-wrapper"
      />
    </div>
  );
};

export default Languages;
