import React from "react";
import Pagination from "./Pagination";
import ToggleSwitch from "./ToggleSwitch";
import Popover from "./Popover";
import "../styles/components/common-table.scss";

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

export interface CommonTableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  error?: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStatusToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  noDataMessage?: string;
  className?: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  data,
  loading = false,
  error = null,
  currentPage,
  totalPages,
  onPageChange,
  onStatusToggle,
  onEdit,
  noDataMessage = "No data found.",
  className = "",
}) => {
  const [descModal, setDescModal] = React.useState<{ open: boolean; text: string }>({
    open: false,
    text: "",
  });

  const handleDescriptionClick = (text: string) => {
    if (text && text.length > 20) {
      setDescModal({ open: true, text });
    }
  };

  const renderCellContent = (column: TableColumn, row: any) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }

    // Special handling for status column (supports different naming patterns)
    if ((column.key === "status" || column.key.endsWith("Status")) && typeof value === "boolean" && onStatusToggle) {
      const id = row.id || row.languageId || row.genreId || row.categoryId;
      return (
        <ToggleSwitch
          checked={value}
          onChange={() => onStatusToggle(id)}
        />
      );
    }

    // Special handling for description column with truncation (supports different naming patterns)
    if ((column.key === "description" || column.key.endsWith("Description")) && typeof value === "string") {
      const desc = value || "";
      return desc.length > 20 ? (
        <>
          {desc.slice(0, 20)}
          <span
            className="common-table-description-more"
            onClick={() => handleDescriptionClick(desc)}
          >
            ...
          </span>
        </>
      ) : (
        desc
      );
    }

    // Special handling for icon columns
    if (column.key === "icon" || column.key === "iconUrl" || column.key.endsWith("Icon")) {
      return value ? (
        <img
          src={value}
          alt="icon"
          className="common-table-icon-img"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            backgroundColor: "var(--bs-header-bg)",
            objectFit: "cover"
          }}
        />
      ) : null;
    }

    // Special handling for action column
    if (column.key === "action" && onEdit) {
      const id = row.id || row.languageId || row.genreId || row.categoryId;
      return (
        <button
          className="common-table-edit-btn"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
      );
    }

    return value || "";
  };

  if (loading) {
    return (
      <div className="common-table-loading">
        <div className="common-table-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="common-table-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={`common-table-wrapper ${className}`}>
      <table className="common-table">
        <thead>
          <tr>
            {columns.map((column) => {
              const isIconColumn = column.key === "icon" || column.key === "iconUrl" || column.key.endsWith("Icon");
              const headerClassName = isIconColumn 
                ? `${column.className || ""} common-table-icon-cell`.trim()
                : column.className;
              
              return (
                <th key={column.key} className={headerClassName}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="common-table-no-data">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const id = row.id || row.languageId || row.genreId || row.categoryId;
              return (
                <tr key={id || index}>
                {columns.map((column) => {
                  const isIconColumn = column.key === "icon" || column.key === "iconUrl" || column.key.endsWith("Icon");
                  const cellClassName = isIconColumn 
                    ? `${column.className || ""} common-table-icon-cell`.trim()
                    : column.className;
                  
                  return (
                    <td key={column.key} className={cellClassName}>
                      {renderCellContent(column, row)}
                    </td>
                  );
                })}
              </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Popover
        isOpen={descModal.open}
        onClose={() => setDescModal({ open: false, text: "" })}
        className="description-popover"
      >
        <h3 className="popover-title">Description</h3>
        <div className="popover-content">{descModal.text}</div>
      </Popover>

      {data.length > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CommonTable;
