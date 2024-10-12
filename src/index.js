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
// routes are defined
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {
        path: "/subjects",
        element: <Subjects/>
      },
      {
        path: "/search/:query",
        element: <SearchResults/>
      },
      {
        path: "/subjects/:title",
        element: <Subject/>
      },
      {
        path: "/faq",
        element: <Faq/>
      },
      {
        path: "/upload-document",
        element: <AddDocuments/>
      },
      {
        path: "/moderate-document",
        element: <ModerateDocuments/>
      },
      {
        path: "/login",
        element: <Login/>
      },      
    ]
  }
])

// Rendering the application and router setup to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

