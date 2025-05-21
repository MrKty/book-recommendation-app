# Book Recommendation App – Case Study

This is a simplified book recommendation system developed as part of the BASF case study interview process. The application is built using React, TypeScript, Vite, AG Grid, and Ant Design, and aims to provide a clean, responsive, and interactive user experience.

## Tech Stack

- **React** with **TypeScript**
- **Vite** (development server and bundler)
- **AG Grid** (interactive data table with sorting, pagination, filtering)
- **Ant Design** (UI framework)
- **Redux Toolkit** (state management)
- **Axios** (for HTTP requests)
- **React Router** (routing and guards)
- **SCSS** (modular styling)

## Features

- **User Authentication**
  - Login screen with optional “Remember Me” checkbox
  - Session stored in `localStorage` or `sessionStorage`
  - Route protection for non-authenticated users

- **Book List View**
  - Real-time search with filter by:
    - Title, Author, Publisher, ISBN
    - Genre/category selection
  - Data fetched from **Google Books API**
  - Client-side pagination (20 per page)
  - Responsive grid with AG Grid
  - Sortable and filterable columns
  - Clickable rows with double-click navigation

- **Book Detail View**
  - Detailed book info with ratings and metadata
  - Embedded preview using Google Books iframe
  - Sticky sidebar with:
    - Cover image
    - Action buttons: Preview, Google Play, Buy
    - Interactive rating (user review persisted via Redux)

- **UI/UX Enhancements**
  - Sticky header layout
  - Tabs for switching between book info and preview
  - Styled form controls and loading spinners

## Additional Functionality

- **AG Grid** for high-performance table rendering
- **Custom search component** with prefix filters, genre selection
- **Persistent Redux state** for user reviews
- **useBooks / useBookDetail custom hooks** for logic separation
- **SCSS styling** + Ant Design token overrides
- **Unnecessary re-render prevention** with memoized components and selectors

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

4. Open the app:
   ```
   http://localhost:5173
   ```

## Authentication Details

- Auth is handled via local/session storage.
- Credentials must exist in storage to access protected routes.
- `Remember Me` controls whether data is stored in `localStorage` or `sessionStorage`.

## Project Structure

```
src/
├── components/         # Reusable UI elements (Header, Sidebar, Tabs, Search, Grid config)
├── pages/              # BookList, BookDetail, Login
├── hooks/              # Custom hooks (useBooks, useBookDetail)
├── routes/             # Main router and route protection logic
├── store/              # Redux slices and store setup
├── styles/             # SCSS global styles and overrides
├── types/              # TypeScript interfaces for Book and Review
└── utils/              # Axios instance and other helpers
```

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.