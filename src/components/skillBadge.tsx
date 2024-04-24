import skills from "../constants";

const skillBadge = (skill: string, size: "small" | "large") => {
  const { image } = skills.find(s => s.name === skill) || { image: "chroma" };

  return (
    <div className={`flex gap-2 items-center rounded-full ${size === "large" ? "py-2 pl-2 pr-5" : "py-1 pl-1 pr-3"} text-white bg-black`}>
      <div className={`${size === "large" ? "p-2" : "p-1"} bg-white rounded-full`}>
        <img 
          src={`/language_icons/${image === "chroma" ? "chroma.png" : `${image}.svg`}`}
          alt={skill}
          className={size === "large" ? "h-8" : "h-4"} 
        />
      </div>
      
      <p className={`${size === "large" ? "text-lg " : "text-md"} font-semibold`}>{skill}</p>
    </div>
  );
}

export default skillBadge;