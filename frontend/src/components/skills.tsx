import React, {useState} from 'react';
import skillBadge from './skillBadge';
import { skills } from '../constants';

const Skills = () => {
  const [selectedArea, setSelectedArea] = useState(null as null | string);

  const areaTab = (area: string, icon?: JSX.Element) => {
    return (
      <button
        onClick={() => {
          selectedArea === area ? setSelectedArea(null) : setSelectedArea(area)
        }}
        className={`
          text-black cursor-pointer text-md font-bold px-3 py-1 rounded-full 
          ${selectedArea === area || selectedArea === null
            ? "bg-[#618264] text-white" 
            : "border-[#618264] border-2 text-[#618264]"}
        `}
      >
        {icon}&nbsp;&nbsp;{area}
      </button>
    );
  }

  return (
    <div id="skills" className="bg-white rounded-2xl p-8 boxShadow">
      <h2 className="font-bold text-2xl md:text-4xl text-center"><i className="fa-solid fa-code"></i>&nbsp;&nbsp;My Skills & Programming Languages</h2>
      
      <div className="flex mt-12 mb-4 gap-2 justify-center">
        {areaTab("Frontend", <i className="fa-solid fa-palette"></i>)}
        {areaTab("Backend", <i className="fa-solid fa-database"></i>)}
        {areaTab("DevOps", <i className="fa-solid fa-server"></i>)}
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {skills.filter(skill => selectedArea === null || skill.area === selectedArea).map(skill => (
          <>{skillBadge(skill.name, "large")}</>
        ))}
      </div>
    </div>
  );
};

export default Skills;