import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../../config/globalVariable";
import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import Breadcrumb from "../../../components/Breadcrumb";
import HeaderToolbar from "../../../components/HeaderToolbar";
import ToggleSwitch from "../../../components/ToggleSwitch";
import StatusMessage from "../../../components/StatusMessage";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/categories.scss";
import { Category } from "../../../interfaces/media-management/category/categoryType";
import { transformCategoryList } from "../../../interfaces/media-management/category/categoryTransform";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Define table columns
  const columns: TableColumn[] = [
    { key: "title", label: "Title", className: "categories-table-title" },
    { key: "description", label: "Description", className: "categories-table-description" },
    { key: "status", label: "Status", className: "categories-table-status" },
    { key: "iconUrl", label: "Icon", className: "categories-table-icon" },
    { key: "action", label: "Operation", className: "categories-table-operation" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          `${API_BASE_URL}category/list?page_no=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          },
          navigate
        );
        const data = await response.json();
        const tmpData = data.data;
        if (tmpData) {
          const allCategories = transformCategoryList(tmpData.categories || []);
          const totalPages = Math.ceil(tmpData.total / PAGE_SIZE);
          setCategories(allCategories);
          setTotalPages(totalPages);
          setPage(tmpData.page_no || 1);
        } else {
          setCategories([]);
          setTotalPages(1);
          setPage(1);
          setError("No categories found");
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, navigate]);

  const handleStatusToggle = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat))
    );
    // TODO: Optionally send status update to backend
  };

  const handleEdit = (id: string) => {
    navigate(`/media-management/categories/edit/${id}`);
  };

  return (
    <div className="categories-page">
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Categories" },
        ]}
      />
      <h2 className="categories-title">Categories</h2>
      <HeaderToolbar
        showSearchBox={true}
        showAddNewButton={true}
        showSearchTypeDropdown={true}
        searchPlaceholder="Search Category..."
        addNewLabel="New"
        onSearch={() => {}}
        onAddNew={() => navigate("/media-management/categories/manage-categories")}
      />
      {error && (
        <StatusMessage
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <CommonTable
        columns={columns}
        data={categories}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
        onStatusToggle={handleStatusToggle}
        onEdit={handleEdit}
        noDataMessage="No categories found."
        className="categories-table-wrapper"
      />
    </div>
  );
};

export default CategoriesPage;
