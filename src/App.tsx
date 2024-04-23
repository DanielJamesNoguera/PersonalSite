import React from 'react';
import './index.css';

import Nav from './components/nav';
import Hero from './components/hero';

function App() {
  return (
    <div className="w-screen flex flex-col gap-6 px-4 md:px-8">
      <Nav />
      <Hero />
    </div>
  );
}

export default App;
