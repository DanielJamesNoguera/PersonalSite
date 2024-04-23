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

        <div className="flex gap-4 items-center font-bold">
          <a href="#skills">Skills & Languages</a>
          <a href="#about">About Me</a>
          <a href="mailto:daniel@onlyguera.com" className="text-white bg-[#618264] font-bold px-4 py-2 rounded-full"><i className="fa-solid fa-paper-plane"></i>&nbsp;&nbsp;Work with me</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;