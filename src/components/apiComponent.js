// src/components/MyComponent.js
import React, { useEffect } from 'react';

const api = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/endpoint`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, [apiUrl]);

  
};

export default api;
