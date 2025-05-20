# Book Recommendation App – Case Study

This is a simplified book recommendation system developed as part of the BASF case study interview process. The application is built using React, TypeScript, Vite, and Ant Design, and aims to provide a clean and interactive user experience.

## Tech Stack

- React with TypeScript
- Vite (development server and bundler)
- Ant Design (UI framework)
- Axios (for HTTP requests)
- React Router (routing)
- Redux Toolkit (for state management, planned)

## Features (in progress)

- [x] User login with session management via localStorage
- [x] Route protection for authenticated users
- [ ] Display of a static/dynamic book list with search
- [ ] Book detail view with rating and review form
- [ ] Client-side state management using Redux Toolkit
- [ ] Google Books API integration

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

The app starts with a login screen. After submitting a username and password, the credentials are stored in localStorage. Access to protected routes such as the book list and review pages is restricted to authenticated users.

## Project Structure

```
src/
├── components/       # Shared UI components
├── pages/            # Login, BookList, BookDetail
├── routes/           # Route configuration and protection
├── store/            # Redux slices and store setup (planned)
├── styles/           # SCSS styles
├── types/            # TypeScript interfaces and enums
└── utils/            # Axios instance and other helpers
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
