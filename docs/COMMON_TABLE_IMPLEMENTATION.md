# CommonTable Component Implementation

## Overview
Successfully created a reusable `CommonTable` component that provides uniform table styling and functionality across all media management pages (Categories, Genres, Languages, and Maturity Ratings). This ensures consistency in appearance, behavior, and maintainability.

## Files Created

### 1. CommonTable Component
- **`src/components/CommonTable.tsx`** - Main reusable table component
- **`src/styles/components/common-table.scss`** - Uniform table styling

## Features Implemented

### 1. Reusable Table Component
- **Configurable Columns**: Define columns with labels, keys, and custom render functions
- **Uniform Styling**: Consistent appearance across all pages
- **Loading States**: Built-in loading spinner and error handling
- **Pagination**: Integrated pagination component
- **Status Toggle**: Automatic toggle switch for status columns
- **Description Truncation**: Automatic truncation with "..." click-to-expand
- **Edit Actions**: Standardized edit button functionality

### 2. Column Configuration
```typescript
interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}
```

### 3. Props Interface
```typescript
interface CommonTableProps {
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
```

## Updated Pages

### 1. Maturity Ratings (`/media-management/maturity-ratings`)
- **Columns**: Title, Description, Code, Status, Action
- **Features**: Status toggle, description truncation, edit functionality
- **Data Mapping**: Direct field mapping

### 2. Categories (`/media-management/categories`)
- **Columns**: Checkbox, Title, Description, Status, Icon, Operation
- **Features**: Bulk selection checkboxes, icon display, custom edit button
- **Data Mapping**: Custom render functions for checkbox and icon columns

### 3. Genres (`/media-management/genres`)
- **Columns**: Title, Description, Code, Status, Action
- **Features**: Status toggle, description truncation, edit functionality
- **Data Mapping**: Genre-specific field names (genreTitle, genreDescription, etc.)

### 4. Languages (`/media-management/languages`)
- **Columns**: Title, Font Sample, Status, Action
- **Features**: Custom font sample rendering, status toggle, edit functionality
- **Data Mapping**: Language-specific field names (languageTitle, languageFontSample, etc.)

## Key Features

### 1. Smart ID Detection
The component automatically detects different ID field names:
- `row.id` (Maturity Ratings)
- `row.languageId` (Languages)
- `row.genreId` (Genres)
- `row.categoryId` (Categories)

### 2. Custom Render Functions
Support for custom column rendering:
```typescript
{
  key: "icon",
  label: "Icon",
  render: (value) => (
    value ? <img src={value} alt="icon" className="icon-img" /> : null
  )
}
```

### 3. Status Column Handling
Automatic toggle switch for status columns:
- Detects boolean values in status columns
- Provides toggle functionality
- Handles different ID field names

### 4. Description Truncation
Automatic description truncation with expand functionality:
- Truncates text longer than 20 characters
- Shows "..." clickable text
- Opens description in popup modal

### 5. Action Column
Standardized edit button:
- Consistent styling across all pages
- Handles different ID field names
- Customizable edit functionality

## Styling Features

### 1. Uniform Design
- **Background**: `var(--bs-card-bg)` (#232b36)
- **Header**: `var(--bs-table-header-bg)` (#2a3441)
- **Text**: `var(--bs-text-primary)` (#ffffff) and `var(--bs-text-secondary)` (#e2e8f0)
- **Borders**: `var(--bs-border-light)` (#3a4552)
- **Hover Effects**: `var(--bs-table-hover-bg)` (#2a3441)

### 2. Responsive Design
- Mobile-friendly table layout
- Responsive padding and font sizes
- Optimized for different screen sizes

### 3. Interactive Elements
- **Edit Button**: Brand primary color with hover effects
- **Description Links**: Brand primary color with underline on hover
- **Status Toggle**: Integrated toggle switch component
- **Loading Spinner**: Animated loading indicator

## Usage Examples

### Basic Usage
```tsx
const columns: TableColumn[] = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];

<CommonTable
  columns={columns}
  data={data}
  loading={loading}
  error={error}
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  onStatusToggle={handleStatusToggle}
  onEdit={handleEdit}
  noDataMessage="No data found."
/>
```

### With Custom Rendering
```tsx
const columns: TableColumn[] = [
  { key: "title", label: "Title" },
  {
    key: "icon",
    label: "Icon",
    render: (value) => (
      value ? <img src={value} alt="icon" /> : null
    )
  },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];
```

## Benefits

### 1. Consistency
- Uniform table appearance across all pages
- Consistent behavior and interactions
- Standardized loading and error states

### 2. Maintainability
- Single source of truth for table styling
- Easy to update table behavior globally
- Reduced code duplication

### 3. Reusability
- Easy to add new table pages
- Configurable column definitions
- Flexible data handling

### 4. Performance
- Optimized rendering
- Efficient state management
- Minimal re-renders

## Migration Summary

### Before (Individual Tables)
- Each page had its own table implementation
- Inconsistent styling and behavior
- Duplicated code across pages
- Different loading and error handling

### After (CommonTable)
- Single reusable component
- Consistent styling and behavior
- Centralized table logic
- Uniform loading and error handling

## Future Enhancements

1. **Sorting**: Add column sorting functionality
2. **Filtering**: Add row filtering capabilities
3. **Selection**: Add row selection with checkboxes
4. **Export**: Add data export functionality
5. **Virtualization**: Add virtual scrolling for large datasets
6. **Column Resizing**: Add column width adjustment
7. **Column Reordering**: Add drag-and-drop column reordering

## Integration Notes

- **Fully Integrated**: All media management pages now use CommonTable
- **Backward Compatible**: No breaking changes to existing functionality
- **Color System**: Uses the standardized CSS variable system
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation

The CommonTable component provides a solid foundation for all table-based data display in the MBCPLAY admin panel, ensuring consistency, maintainability, and a great user experience across all pages.
