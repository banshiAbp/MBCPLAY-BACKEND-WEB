# Routing Structure

This directory contains the routing configuration for the MBCPLAY admin panel, following industry best practices for scalable React applications.

## File Structure

```
src/routes/
├── index.tsx                 # Main routes configuration
├── ProtectedRoute.tsx       # Protected route wrapper component
└── README.md               # This documentation
```

## Route Organization

All routes are organized in a single `index.tsx` file with clear sections:

### Core Application Routes
- `/` - Root redirect (Dashboard or Login)
- `/login` - Authentication page
- `/dashboard` - Main dashboard

### Media Management Routes
- `/media-management/categories` - Categories listing
- `/media-management/categories/manage-categories` - Create category
- `/media-management/categories/edit/:id` - Edit category
- `/media-management/genres` - Genres listing
- `/media-management/genres/manage-genres` - Create genre
- `/media-management/genres/manage-genres/:id` - Edit genre
- `/media-management/languages` - Languages listing
- `/media-management/languages/manage` - Create language
- `/media-management/languages/manage/:id` - Edit language

### Future Routes
- Movies management routes
- Live TV management routes
- Cast & Crew management routes
- Advertisement management routes
- Subscription management routes

## Components

### ProtectedRoute (`ProtectedRoute.tsx`)
- **Purpose**: Wrapper component for protected routes
- **Functionality**: Redirects to login if user is not authenticated
- **Usage**: Wrap any component that requires authentication

## Benefits of This Structure

### 1. **Modularity**
- Each module has its own route file
- Easy to locate and modify specific route groups
- Clear separation of concerns

### 2. **Scalability**
- Easy to add new route modules
- No need to modify main App.tsx for new routes
- Organized by business domain

### 3. **Maintainability**
- Routes are grouped logically
- Easy to understand and navigate
- Reduces complexity in main App component

### 4. **Team Collaboration**
- Different team members can work on different route modules
- Reduced merge conflicts
- Clear ownership of route groups

## Adding New Routes

### For New Media Management Routes:
1. Add route to `mediaManagementRoutes.tsx`
2. Import the component
3. Add the Route element

### For New Management Modules:
1. Create new route file (e.g., `movieRoutes.tsx`)
2. Add routes to the new file
3. Import and add to `index.tsx`

### Example:
```typescript
// In mediaManagementRoutes.tsx
<Route
  path="/media-management/maturity-ratings"
  element={<MaturityRatings />}
/>
<Route
  path="/media-management/maturity-ratings/manage"
  element={<ManageMaturityRatings />}
/>
```

## Authentication

All routes automatically check authentication status using Redux state. Routes redirect to login if user is not authenticated.

## Future Enhancements

1. **Lazy Loading**: Implement React.lazy() for code splitting
2. **Route Guards**: Add role-based route protection
3. **Breadcrumbs**: Dynamic breadcrumb generation
4. **Route Metadata**: Add route metadata for better organization
5. **Nested Routes**: Implement nested routing for complex modules

## Best Practices

1. **Keep routes focused**: Each route file should handle one domain
2. **Use consistent naming**: Follow the established naming conventions
3. **Group related routes**: Keep related routes in the same file
4. **Document new routes**: Update this README when adding new routes
5. **Test route changes**: Ensure all routes work correctly after changes
