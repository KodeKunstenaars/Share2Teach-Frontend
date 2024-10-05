import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Subjects from './components/Subjects';
import AddDocuments from './components/AddDocuments';
import ModerateDocuments from './components/ModerateDocuments';
import Authenticate from './components/Authenticate';

// routes are defined
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />}, //default index route (Home page)
      {
        path: "/subjects", //route for subjects page
        element: <Subjects/>
      },
      {
        path: "/upload-document", // route for upload page
        element: <AddDocuments/>
      },
      {
        path: "/moderate-document", //route for moderation page
        element: <ModerateDocuments/>
      },
      {
        path: "/authenticate",
        element: <Authenticate/>
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

