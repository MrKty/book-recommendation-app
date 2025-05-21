# Book Recommendation App – Case Study

This is a simplified book recommendation system developed as part of the BASF case study interview process. The application is built using React, TypeScript, Vite, and Ant Design, and aims to provide a clean and interactive user experience.

## Tech Stack

- React with TypeScript
- Vite (development server and bundler)
- Ant Design (UI framework)
- Axios (for HTTP requests)
- React Router (routing)
- Redux Toolkit (for state management)

## Features

- [x] User login with session management via localStorage
- [x] Protected routes for authenticated access
- [x] Book list fetched dynamically from Google Books API
- [x] Real-time search by title or author
- [x] Book detail view with:
  - Ratings (from API + user-adjusted)
  - Reviews with persistent client-side state
  - Preview embedded via Google Books iframe
- [x] Responsive layout with sticky sidebar
- [x] Styled with custom Ant Design theming and SCSS

## Additional Functionality and UI Features

- Interactive star rating component with Redux-backed state
- Review form with validation and confirmation message
- Tabbed layout for switching between "Book Info" and "Preview"
- Dynamic loading placeholders for cover image
- Sticky sidebar for action buttons and rating
- Responsive design supporting tablet and desktop views
- Use of icons, spinners, and status feedback via Ant Design components

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mrkty/book-recommendation-app.git
   cd book-recommendation-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at:
   ```
   http://localhost:5173
   ```

## Authentication

The app starts with a login screen. After submitting a username and password, credentials are stored in localStorage. All internal routes (e.g., book list and detail view) are protected and require authentication.

## Project Structure

```
src/
├── components/       # Reusable UI components (Sidebar, Tabs, Header)
├── pages/            # Login, BookList, BookDetail
├── routes/           # App router and route guards
├── store/            # Redux slices and store configuration
├── styles/           # SCSS styles and variables
├── types/            # TypeScript types and interfaces
└── utils/            # Axios instance and helpers
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.