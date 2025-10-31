import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Not Authorized</h1>
            <p className="text-lg mb-6">You do not have permission to view this page.</p>
            <button onClick={() => navigate("/")} className="px-4 py-2 rounded-md bg-green-500 text-white">
                Go to Home
            </button>
        </div>
  )
}

export default NotAuthorizedPage;