import React from "react";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <img src="/me.png" alt="Me." className="w-full h-full object-cover rounded-2xl boxShadow" style={{maxHeight: "calc(100vh - 125px)"}} />

      <div className="h-full flex flex-col justify-center gap-4 p-8 bg-white rounded-2xl boxShadow">
        <h1 className="font-extrabold text-7xl">Hi there, I'm Daniel.</h1>

        <h3 className="text-xl md:text-2xl font-semibold">
          A 26 year old, Berlin-based, Full-Stack Web Developer with over <span className="primary-underline">six years experience</span> working in the industry.
        </h3>

        <p className="text-lg">
          I specialise in modern Javascript frameworks such as <span className="font-semibold">Typescript, React & Next, Vue & Nuxt and Node & Express</span> but have also worked extensively in <span className="font-semibold">Python & PHP</span> for backend, <span className="font-semibold">MongoDB, PostgreSQL, MySQL & Firebase</span> databases and <span className="font-semibold">Docker, Kubernetes, Redis & Heroku</span> for DevOps and system architecture.
        </p>

        <div className="flex gap-4">
          <a href="mailto:daniel@onlyguera.com" className="bg-[#618264] text-white font-bold px-4 py-2 rounded-full"><i className="fa-solid fa-paper-plane"></i>&nbsp;&nbsp;Work with me</a>

          <a href="#skills" className="bg-black text-white font-bold px-4 py-2 rounded-full"><i className="fa-solid fa-code"></i>&nbsp;&nbsp;My Skills & Languages</a>
        </div>
      </div>
    </div>
  );
}

export default Hero;