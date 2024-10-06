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
import Subject from './components/Subject';
import Faq from './components/Faq';
// routes are defined
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />}, //default index route (Home page) //Order of routes is important!!
      {
        path: "/subjects", //route for subjects page
        element: <Subjects/>
      },
      {
        path: "/subjects/:title", //route for subjects page
        element: <Subject/>
      },
      {
        path: "/faq", //route for subjects page
        element: <Faq/>
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

