// Test file to verify React Router v7 imports
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';

// This is just a test file to verify the correct imports are available
export const testNavigate = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  return { navigate, params };
};  