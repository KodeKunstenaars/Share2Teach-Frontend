import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Subjects from './components/Subjects';
import AddDocuments from './components/AddDocuments';
import ModerateDocuments from './components/ModerateDocuments';

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
        path: "/upload-document",
        element: <AddDocuments/>
      },
      {
        path: "/moderate-document",
        element: <ModerateDocuments/>
      }
      
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

