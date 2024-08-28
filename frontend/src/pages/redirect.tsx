import React, { useEffect } from 'react';

const RedirectPage = () => {
  return (
    <div className="h-screen p-2 justify-center top-4 w-full text-center flex flex-col items-center">
      <img src="/check-instant.png" alt="Instant Payments" className="h-10 invert rounded-full" />
      <h2 className="text-3xl font-bold mt-6">£1.99</h2>
      <p className="text-[#333333]">to All Ears Audio</p>
      <p className="text-[#333333] text-center max-w-[350px] mt-6">Your payment of was successful.</p>
      <p className="text-[#333333] text-center max-w-[350px] mt-2">You may now safely close this tab.</p>
    </div>
  );
}

export default RedirectPage;