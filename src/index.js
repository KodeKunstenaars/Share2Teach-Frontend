import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Subjects from './components/Subjects';
import AddDocuments from './components/AddDocuments';
import ModerateDocuments from './components/ModerateDocuments';
import Login from './components/Login';
import Subject from './components/Subject';
import Faq from './components/Faq';
import SearchResults from './components/SearchResult';
import Register from "./components/Register";
import CreateUser from "./components/CreateUser";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/subjects", element: <Subjects /> },
      { path: "/search", element: <SearchResults /> },
      { path: "/subjects/:title", element: <Subject /> },
      { path: "/faq", element: <Faq /> },

      // Protected routes
      {
        path: "/upload-document",
        element: (
            <ProtectedRoute allowedRoles={["educator", "admin", "moderator"]}>
              <AddDocuments />
            </ProtectedRoute>
        ),
      },
      {
        path: "/moderate-document",
        element: (
            <ProtectedRoute allowedRoles={["admin", "moderator"]}>
              <ModerateDocuments />
            </ProtectedRoute>
        ),
      },
      {
        path: "/create-user",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
        ),
      },
      { path: "/register-user", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);