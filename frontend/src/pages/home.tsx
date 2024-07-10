import Hero from '../components/hero';
import Skills from '../components/skills';
import History from '../components/history';

import Nav from '../components/nav';

const Home = () => {
  return (
    <div className="w-screen flex flex-col gap-10 px-4 md:px-8 pb-12">
      <Nav />
      <div className="w-screen flex flex-col gap-10 px-4 md:px-8 pb-12">
        <Hero />
        <Skills />
        <History />
      </div>
    </div>
  );
}

export default Home;