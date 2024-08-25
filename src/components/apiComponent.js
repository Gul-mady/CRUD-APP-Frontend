// src/components/MyComponent.js
import React, { useEffect, useState } from 'react';

const apiComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Directly use your API URL
  const apiUrl = 'https://crud-app-backend-puce.vercel.app/'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/endpoint`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div>
      <h1>Data from API:</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default apiComponent;
