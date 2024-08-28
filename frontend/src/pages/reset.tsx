import React, { useEffect } from 'react';

const ResetPage = () => {

  const clearBanksAndGoHome = (() => {
    console.log('clearBanksAndGoHome');
    // Get previously stored bank selections from local storage
    const bankSelections = localStorage.getItem('bankSelections');
    
    // Delete the bank selections from local storage
    if (bankSelections) {
      localStorage.removeItem('bankSelections');
    }

    // Send user to / 
    window.location.href = '/';

    console.log('bankSelections', bankSelections);
  });

  clearBanksAndGoHome();

  return (
    <div className="w-screen flex flex-col gap-10 px-4 md:px-8 pb-12">
    </div>
  );
}

export default ResetPage;