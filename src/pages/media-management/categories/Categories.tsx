import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../../config/globalVariable";
import API_BASE_URL from "../../../config/api";
import Breadcrumb from "../../../components/Breadcrumb";
import Pagination from "../../../components/Pagination";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Checkbox from "../../../components/Checkbox";
import "../../../styles/media-management/categories.scss";
import { Category } from "../../../interfaces/media-management/categoryType";
import { transformCategoryList } from "../../../interfaces/media-management/categoryTransform";
import { FaFilter, FaFileExport } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import DetailsPopup from "../../../components/DetailsPopup";
import "../../../styles/components/details-popup.scss";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [descModal, setDescModal] = useState<{ open: boolean; text: string }>({
    open: false,
    text: "",
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    fetch(`${API_BASE_URL}category/list?page_no=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch(() => setError("Failed to fetch categories"))
      .finally(() => setLoading(false));
  }, [page, navigate]);

  const handleStatusToggle = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat))
    );
    // TODO: Optionally send status update to backend
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

      <div className="categories-table-container">
        {loading ? (
          <div className="categories-loading">Loading...</div>
        ) : error ? (
          <div className="categories-error">{error}</div>
        ) : (
          <table className="categories-table">
            <thead>
              <tr className="categories-table-header-row">
                <th className="categories-table-header-checkbox">
                  <Checkbox
                    checked={
                      categories.length > 0 &&
                      selectedIds.length === categories.length
                    }
                    onChange={(checked) => {
                      if (checked) {
                        setSelectedIds(categories.map((cat) => cat.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    disabled={categories.length === 0}
                  />
                </th>
                <th className="categories-table-header-title">Title</th>
                <th className="categories-table-header-description">
                  Description
                </th>
                <th className="categories-table-header-status">Status</th>
                <th className="categories-table-header-icon">Icon</th>
                <th className="categories-table-header-operation">Operation</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(categories) ? categories : []).map((cat) => {
                const desc = cat.description || "";
                return (
                  <tr key={cat.id} className="categories-table-row">
                    <td className="categories-table-checkbox">
                      <Checkbox
                        checked={selectedIds.includes(cat.id)}
                        onChange={(checked) => {
                          setSelectedIds((prev) =>
                            checked
                              ? [...prev, cat.id]
                              : prev.filter((id) => id !== cat.id)
                          );
                        }}
                      />
                    </td>
                    <td className="categories-table-title">{cat.title}</td>
                    <td className="categories-table-description">
                      {desc.length > 20 ? (
                        <>
                          {desc.slice(0, 20)}
                          <span
                            className="categories-table-description-more"
                            onClick={() =>
                              setDescModal({ open: true, text: desc })
                            }
                          >
                            ...
                          </span>
                        </>
                      ) : (
                        desc
                      )}
                    </td>
                    <td className="categories-table-status">
                      <ToggleSwitch
                        checked={cat.status}
                        onChange={() => handleStatusToggle(cat.id)}
                      />
                    </td>
                    <td className="categories-table-icon">
                      {cat.iconUrl ? (
                        <img
                          src={cat.iconUrl}
                          alt="icon"
                          className="categories-table-icon-img"
                        />
                      ) : null}
                    </td>
                    <td className="categories-table-operation">
                      <span
                        className="categories-table-edit-btn"
                        title="Edit"
                        onClick={() =>
                          navigate(
                            `/media-management/categories/edit/${cat.id}`
                          )
                        }
                      >
                        ✏️
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
      />

      {/* Description Modal (Reusable) */}
      <DetailsPopup
        open={descModal.open}
        title="Description"
        details={descModal.text}
        onClose={() => setDescModal({ open: false, text: "" })}
      />
    </div>
  );
};

export default CategoriesPage;
