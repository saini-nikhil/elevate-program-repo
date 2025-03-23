// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Import components
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetail';
import Navbar from './components/Navbar';

// Create a layout component with Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="container">
      {children}
    </div>
  </>
);

// Define routes using v7 syntax
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><EmployeeList /></Layout>
  },
  {
    path: '/employees',
    element: <Layout><EmployeeList /></Layout>
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>
  },
  {
    path: '/signup',
    element: <Layout><Signup /></Layout>
  },
  {
    path: '/employees/new',
    element: <Layout><EmployeeForm /></Layout>
  },
  {
    path: '/employees/:id/edit',
    element: <Layout><EmployeeForm /></Layout>
  },
  {
    path: '/employees/:id',
    element: <Layout><EmployeeDetails /></Layout>
  },
  // Keep old routes for backward compatibility
  {
    path: '/add-employee',
    element: <Layout><EmployeeForm /></Layout>
  },
  {
    path: '/edit-employee/:id',
    element: <Layout><EmployeeForm /></Layout>
  },
  {
    path: '/employee/:id',
    element: <Layout><EmployeeDetails /></Layout>
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
