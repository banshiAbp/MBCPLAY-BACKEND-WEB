# Admin Portal

This project is an admin portal built using React, Shadcn, and Tailwind CSS, with SCSS for styling. It provides a user-friendly interface for managing various admin functionalities.

## Project Structure

```
admin-portal
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── assets              # Static assets (images, fonts, etc.)
│   ├── components          # Reusable UI components (e.g., Breadcrumb, Pagination, Loader)
│   ├── interfaces          # TypeScript interfaces for each module (e.g., category under media-management)
│   ├── layouts             # Global layout components (e.g., Navbar, Sidebar)
│   ├── pages               # Page components organized by functionality (e.g., Dashboard, Login, Categories)
│   ├── services            # API communication logic for each module
│   ├── styles              # SCSS styles for the application and components
│   ├── utils               # Common utility functions used across the website
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point for the React application
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # npm configuration and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Folder Structure Overview

- **assets**: Static assets such as images and fonts.
- **components**: Reusable UI components (e.g., Breadcrumb, Pagination, Loader).
- **interfaces**: TypeScript interfaces for each module, organized by feature (e.g., category interfaces under media-management).
- **layouts**: Global layout components like `Navbar.tsx` and `Sidebar.tsx` used throughout the portal.
- **pages**: All main pages, organized by functionality (e.g., Dashboard, Login, Categories, ManageCategories).
- **services**: API communication logic for each module, handling all backend requests.
- **styles**: SCSS files for global and component-specific styles.
- **utils**: Common utility functions that can be used across the website.
- **App.tsx**: Main application component.
- **index.tsx**: Entry point for the React application.

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd admin-portal
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Run the application:**

   ```
   npm start
   ```

4. **Build for production:**
   ```
   npm run build
   ```

## Usage

- Navigate to the dashboard to access admin functionalities.
- Use the navigation bar to switch between different sections of the portal.

## Technologies Used

- React
- Tailwind CSS
- SCSS
- TypeScript

## License

This project is licensed under the MIT License.
