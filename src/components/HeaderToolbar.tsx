import React from "react";
import { FaFilter, FaFileExport } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import "../styles/components/header-toolbar.scss";

export interface HeaderToolbarConfig {
  showActionDropdown?: boolean;
  showApplyButton?: boolean;
  showExportButton?: boolean;
  showSearchTypeDropdown?: boolean;
  showSearchBox?: boolean;
  showAdvancedFilter?: boolean;
  showAddNewButton?: boolean;
  actionOptions?: string[];
  searchType?: string[];
  searchPlaceholder?: string;
  addNewLabel?: string;
  onActionChange?: (value: string) => void;
  onApply?: () => void;
  onExport?: () => void;
  onSearchTypeChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onAdvancedFilter?: () => void;
  onAddNew?: () => void;
}

const HeaderToolbar: React.FC<HeaderToolbarConfig> = ({
  showActionDropdown = false,
  showApplyButton = false,
  showExportButton = false,
  showSearchTypeDropdown = false,
  showSearchBox = false,
  showAdvancedFilter = false,
  showAddNewButton = false,
  actionOptions = ["Action", "Delete", "Export"],
  searchType = ["All", "Enabled", "Disabled"],
  searchPlaceholder = "Search...",
  addNewLabel = "New",
  onActionChange,
  onApply,
  onExport,
  onSearchTypeChange,
  onSearch,
  onAdvancedFilter,
  onAddNew,
}) => {
  return (
    <div className="header-toolbar-row">
      {showActionDropdown && (
        <select
          className="header-toolbar-action-select"
          onChange={(e) => onActionChange?.(e.target.value)}
        >
          {actionOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
      {showApplyButton && (
        <button className="header-toolbar-apply-btn" onClick={onApply}>
          Apply
        </button>
      )}
      {showExportButton && (
        <button className="header-toolbar-export-btn" onClick={onExport}>
          <span className="header-toolbar-btn-icon">
            <FaFileExport />
          </span>
          Export
        </button>
      )}
      <div className="header-toolbar-action-spacer" />
      {showSearchTypeDropdown && (
        <select
          className="header-toolbar-enable-disable-select"
          onChange={(e) => onSearchTypeChange?.(e.target.value)}
        >
          {searchType.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
      {showSearchBox && (
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="header-toolbar-search-input"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      )}
      {showAdvancedFilter && (
        <button
          className="header-toolbar-advanced-filter-btn"
          onClick={onAdvancedFilter}
        >
          <span className="header-toolbar-btn-icon">
            <FaFilter />
          </span>
          Advanced Filter
        </button>
      )}
      {showAddNewButton && (
        <button className="header-toolbar-new-btn" onClick={onAddNew}>
          <span className="header-toolbar-btn-icon">
            <FaCirclePlus />
          </span>
          {addNewLabel}
        </button>
      )}
    </div>
  );
};

export default HeaderToolbar;
