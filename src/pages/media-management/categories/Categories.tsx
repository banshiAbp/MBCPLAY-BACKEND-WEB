import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../../config/globalVariable";
import API_BASE_URL from "../../../config/api";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import Breadcrumb from "../../../components/Breadcrumb";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Checkbox from "../../../components/Checkbox";
import CommonTable, { TableColumn } from "../../../components/CommonTable";
import "../../../styles/media-management/categories.scss";
import { Category } from "../../../interfaces/media-management/category/categoryType";
import { transformCategoryList } from "../../../interfaces/media-management/category/categoryTransform";
import { FaFilter, FaFileExport } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  // Define table columns
  const columns: TableColumn[] = [
    {
      key: "checkbox",
      label: "",
      render: (_, row) => (
        <Checkbox
          checked={selectedIds.includes(row.id)}
          onChange={(checked) => {
            setSelectedIds((prev) =>
              checked
                ? [...prev, row.id]
                : prev.filter((id) => id !== row.id)
            );
          }}
        />
      ),
      className: "categories-table-checkbox"
    },
    { key: "title", label: "Title", className: "categories-table-title" },
    { key: "description", label: "Description", className: "categories-table-description" },
    { key: "status", label: "Status", className: "categories-table-status" },
    {
      key: "icon",
      label: "Icon",
      render: (value) => (
        value ? (
          <img
            src={value}
            alt="icon"
            className="categories-table-icon-img"
          />
        ) : null
      ),
      className: "categories-table-icon"
    },
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
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Media Management", path: "/media-management" },
          { label: "Categories" },
        ]}
      />

      {/* Action/Filter Row */}
      <div className="categories-action-row">
        <select className="categories-action-select">
          <option>Action</option>
          <option>Delete</option>
          <option>Export</option>
        </select>
        <button className="categories-apply-btn">Apply</button>
        <button className="categories-export-btn">
          <span className="categories-btn-icon">
            <FaFileExport />
          </span>
          Export
        </button>
        <div className="categories-action-spacer" />
        <select className="categories-filter-select">
          <option>All</option>
          <option>Enabled</option>
          <option>Disabled</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="categories-search-input"
        />
        <button className="categories-advanced-filter-btn">
          <span className="categories-btn-icon">
            <FaFilter />
          </span>
          Advanced Filter
        </button>
        <button
          className="categories-new-btn"
          onClick={() =>
            navigate("/media-management/categories/manage-categories")
          }
        >
          <span className="categories-btn-icon">
            <FaCirclePlus />
          </span>
          New
        </button>
      </div>

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
        className="categories-table-container"
      />
    </div>
  );
};

export default CategoriesPage;
