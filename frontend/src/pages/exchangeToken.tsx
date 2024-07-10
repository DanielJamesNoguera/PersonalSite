import React, { useEffect } from 'react';
import { updateStravaToken } from '../api';

const ExchangeToken = () => {

  // Fetch code from URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log(code);

  useEffect(() => {
    const updateTokenAndRedirect = async (code: string) => {
      try {
        await updateStravaToken(code);
        window.location.href = '/training';
      } catch (error) {
        console.error('Error updating token:', error);
      }
    }

    code && updateTokenAndRedirect(code);
  }, [code]);

  return (
    <div className="container">
      <h1>Exchange Tokens</h1>
    </div>
  );
}

export default ExchangeToken;