import { useEffect, useState } from 'react';

export const useValidToken = (): boolean => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      
      if (token && !token.startsWith("google_oauth_")) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 100);

    window.addEventListener('storage', checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  return isTokenValid;
};

