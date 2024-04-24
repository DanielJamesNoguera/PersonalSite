import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="text-black w-full boxShadow rounded-b-2xl">
      <div className="flex justify-between items-center h-full bg-white rounded-b-2xl py-4 text-black px-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="DJN Logo" className="h-10" />
          <div>
            <h3 className="font-extrabold text-2xl">Daniel James</h3>
            <p className="font-medium" style={{fontSize: "10px", marginTop: "-4px"}}>FULL-STACK WEB DEVELOPER</p>
          </div>
          
        </div>

        <div className="flex gap-6 items-center font-bold">
          <a className="hidden md:block" href="#skills"><i className="fa-solid fa-code"></i>&nbsp;&nbsp;Skills</a>
          <a className="hidden md:block" href="#history"><i className="fa-solid fa-clock-rotate-left"></i>&nbsp;&nbsp;Job History</a>
          <a className="hidden md:block" href="#about"><i className="fa-solid fa-person-hiking"></i>&nbsp;&nbsp;About Me</a>
          <a href="mailto:daniel@onlyguera.com" className="text-white bg-[#618264] font-bold px-4 py-2 rounded-full"><i className="fa-solid fa-paper-plane"></i>&nbsp;&nbsp;<span className="hidden md:block">Work with me</span></a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;