import React from 'react';
import './index.css';

import Nav from './components/nav';
import Hero from './components/hero';
import Skills from './components/skills';
import History from './components/history';

function App() {
  return (
    <div className="w-screen flex flex-col gap-10 px-4 md:px-8 pb-12">
      <Nav />
      <Hero />
      <Skills />
      <History />
    </div>
  );
}

export default App;
