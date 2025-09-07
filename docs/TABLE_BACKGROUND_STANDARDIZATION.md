# Table Background Color Standardization

## Overview
Standardized the table background colors across all media management pages to match the Maturity Ratings page design. All pages now have consistent background colors for both the page and table containers.

## Changes Made

### 1. Maturity Ratings Reference
**File**: `src/styles/media-management/maturity-ratings.scss`

The Maturity Ratings page was used as the reference for the desired background colors:
- **Page Background**: `var(--bs-secondary-bg)`
- **Table Wrapper Background**: `var(--bs-card-bg)`

### 2. Categories Page Updates
**File**: `src/styles/media-management/categories.scss`

#### Before
```scss
.categories-page {
  padding: 24px;
  background: var(--bs-page-bg);  // Darker background
  min-height: 100vh;
}

.categories-table-container {
  background: var(--bs-secondary-bg);  // Medium background
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
}
```

#### After
```scss
.categories-page {
  padding: 24px;
  background: var(--bs-secondary-bg);  // Matches Maturity Ratings
  min-height: 100vh;
}

.categories-table-container {
  background: var(--bs-card-bg);  // Matches Maturity Ratings
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
}
```

### 3. Genres Page Updates
**File**: `src/styles/media-management/genres.scss`

#### Before
```scss
.genres-page {
  padding: 24px;
  background: var(--bs-page-bg);  // Darker background
  min-height: 100vh;
}

.genres-table-wrapper {
  background: var(--bs-secondary-bg);  // Medium background
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
  margin-bottom: 32px;
}
```

#### After
```scss
.genres-page {
  padding: 24px;
  background: var(--bs-secondary-bg);  // Matches Maturity Ratings
  min-height: 100vh;
}

.genres-table-wrapper {
  background: var(--bs-card-bg);  // Matches Maturity Ratings
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
  margin-bottom: 32px;
}
```

### 4. Languages Page Updates
**File**: `src/styles/media-management/languages.scss`

#### Before
```scss
.languages-page {
  padding: 24px;
  background: var(--bs-page-bg);  // Darker background
  min-height: 100vh;
}

.languages-table-wrapper {
  background: var(--bs-secondary-bg);  // Medium background
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
  margin-bottom: 32px;
}
```

#### After
```scss
.languages-page {
  padding: 24px;
  background: var(--bs-secondary-bg);  // Matches Maturity Ratings
  min-height: 100vh;
}

.languages-table-wrapper {
  background: var(--bs-card-bg);  // Matches Maturity Ratings
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px var(--bs-shadow-light);
  margin-bottom: 32px;
}
```

## Color Scheme Standardization

### Background Color Hierarchy
All media management pages now follow the same color hierarchy:

1. **Page Background**: `var(--bs-secondary-bg)` - Medium dark background
2. **Table Wrapper Background**: `var(--bs-card-bg)` - Lighter card background
3. **Table Header Background**: `var(--bs-table-header-bg)` - Darker header background

### Visual Consistency
- ✅ **Uniform Appearance**: All pages now have identical background colors
- ✅ **Better Contrast**: Table content stands out better against the card background
- ✅ **Professional Look**: Consistent visual hierarchy across all pages
- ✅ **User Experience**: Users get a familiar interface across all sections

## Affected Pages

### 1. Categories Page
- ✅ **Page Background**: Changed from `--bs-page-bg` to `--bs-secondary-bg`
- ✅ **Table Container**: Changed from `--bs-secondary-bg` to `--bs-card-bg`
- ✅ **Visual Result**: Matches Maturity Ratings page exactly

### 2. Genres Page
- ✅ **Page Background**: Changed from `--bs-page-bg` to `--bs-secondary-bg`
- ✅ **Table Wrapper**: Changed from `--bs-secondary-bg` to `--bs-card-bg`
- ✅ **Visual Result**: Matches Maturity Ratings page exactly

### 3. Languages Page
- ✅ **Page Background**: Changed from `--bs-page-bg` to `--bs-secondary-bg`
- ✅ **Table Wrapper**: Changed from `--bs-secondary-bg` to `--bs-card-bg`
- ✅ **Visual Result**: Matches Maturity Ratings page exactly

### 4. Maturity Ratings Page
- ✅ **Reference Standard**: No changes needed
- ✅ **Visual Result**: Maintains existing appearance

## Technical Benefits

### 1. Consistency
- ✅ **Uniform Design**: All pages follow the same color scheme
- ✅ **Predictable UI**: Users know what to expect across pages
- ✅ **Professional Appearance**: Cohesive visual design

### 2. Maintainability
- ✅ **Single Source of Truth**: Maturity Ratings serves as the design reference
- ✅ **Easy Updates**: Future color changes can be applied consistently
- ✅ **Clear Standards**: Established color hierarchy for new pages

### 3. User Experience
- ✅ **Visual Hierarchy**: Clear distinction between page and table areas
- ✅ **Better Readability**: Improved contrast for table content
- ✅ **Familiar Interface**: Consistent experience across all sections

## CSS Variables Used

### Primary Colors
- `--bs-secondary-bg`: Page background color
- `--bs-card-bg`: Table wrapper background color
- `--bs-table-header-bg`: Table header background color

### Supporting Colors
- `--bs-text-primary`: Primary text color
- `--bs-text-secondary`: Secondary text color
- `--bs-border-light`: Light border color
- `--bs-shadow-light`: Light shadow color

## Result

All media management pages now have:

1. **✅ Consistent Page Backgrounds**: All use `var(--bs-secondary-bg)`
2. **✅ Consistent Table Backgrounds**: All use `var(--bs-card-bg)`
3. **✅ Visual Harmony**: Uniform appearance across all pages
4. **✅ Better Contrast**: Table content is more readable
5. **✅ Professional Design**: Cohesive visual hierarchy

The table background color standardization is complete and all pages now match the Maturity Ratings page design!
