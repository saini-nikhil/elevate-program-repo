// src/App.js
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';

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

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading"><i className="fas fa-spinner fa-spin"></i> Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public only route - redirects to employees if already logged in
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading"><i className="fas fa-spinner fa-spin"></i> Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/employees" replace />;
  }

  return children;
};

// Create routing configuration
const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/employees" replace />
    },
    {
      path: '/employees',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        </Layout>
      )
    },
    {
      path: '/login',
      element: (
        <Layout>
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        </Layout>
      )
    },
    {
      path: '/signup',
      element: (
        <Layout>
          <PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>
        </Layout>
      )
    },
    {
      path: '/employees/new',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        </Layout>
      )
    },
    {
      path: '/employees/:id/edit',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        </Layout>
      )
    },
    {
      path: '/employees/:id',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        </Layout>
      )
    },
    // Keep old routes for backward compatibility
    {
      path: '/add-employee',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        </Layout>
      )
    },
    {
      path: '/edit-employee/:id',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        </Layout>
      )
    },
    {
      path: '/employee/:id',
      element: (
        <Layout>
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        </Layout>
      )
    }
  ]);
};

const App = () => {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <RouterProvider router={createRouter()} />
      </EmployeeProvider>
    </AuthProvider>
  );
};

export default App;
