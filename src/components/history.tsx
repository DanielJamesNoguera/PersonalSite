import React from "react";
import skillBadge from './skillBadge';
import skills from '../constants';

const History = () => {

  const job = (company: string, role: string, start: string, end: string, description: string, jobSkills: string[]) => {
    return (
      <div className="bg-white rounded-2xl p-6 boxShadow">
        <div className="flex justify-between gap-2 items-end flex-wrap">
          <h3 className="font-bold text-xl">{company} | {role}</h3>
          <p className="text-sm text-gray-500">{start} - {end}</p>
        </div>

        <p className="text-md mt-4">{description}</p>
        
        <p className="text-md mt-6 mb-2 font-semibold"><i className="fa-solid fa-code"></i>&nbsp;&nbsp;Development Stack</p>
        <div className="flex items-center gap-2 flex-wrap">
          {jobSkills.map(skill => (
            <>{skillBadge(skill, "small")}</>
          ))}
        </div>
      </div>
    );
  }

  const jobHistory = [
    {
      company: "MoveFactor X",
      role: "Full-Stack Developer",
      start: "Feb",
      end: "Apr 2024",
      description: "Most recently I built out and expanded upon initial designs for a sports and exercise platform. This primarily involved delivering data rich dashboard areas featuring charts and tables rendered via a React & TypeScript frontend with data coming from a Firebase backend.",
      jobSkills: ["Typescript", "React & Next JS", "Tailwind CSS", "Firebase", "GIT"]
    },
    {
      company: "ComparePrivatePlanes",
      role: "Full-Stack Developer",
      start: "Jan",
      end: "Mar 2024",
      description: "Developed a bespoke web dashboard for a London-based private plane comparison service,providing users with an industry overview dashboard and extensive model comparison functionality. Built with a React & Typescript frontend coupled with a robust Python, Django and PostgreSQL backend, all deployed and hosted via Heroku.",
      jobSkills: ["Typescript", "React & Next JS", "Tailwind CSS", "Python", "Django", "PostgreSQL", "Heroku", "GIT"]
    },
    {
      company: "Syntella",
      role: "Founder, CEO & Solo Developer",
      start: "Oct 2022",
      end: "Mar 2024",
      description: "Single-handedly developed and launched a SASS platform delivering personalised customer service AI agents that can be trained and deployed via a chat widget on client websites. Built the platform using React and TypeScript with a Node and Express backend with  vector databases to facilitate the AI Knowledge Bases. This was all hosted and deployed via Dockerised microservices running on Kubernetes.",
      jobSkills: ["Typescript", "Vue & Nuxt JS", "Tailwind CSS", "Node & Express JS", "MongoDB", "Vector DBs", "Docker", "Kubernetes", "Gitlab CI/CD"]
    },
    {
      company: "Arclight",
      role: "Founder, CEO & Full-Stack Developer",
      start: "Jan 2022",
      end: "Jan 2024",
      description: "Co-Founded and led the creation of a Game Studio that developed and launched our initial concept for a revolutionary decentralised gaming platform. This involved managing a team of over 20 employees, raising six figure investment and building a community of over 10.000 users. My development work conisisted of building out the marketing website and internal staff areas in Vue and Nuxt JS with a Node and Express backend and blockchain data sourced via Web3 and Ethers JS. The platform was deployed via Dockerised microservices running on Kubernetes and utilised Gitlab CI/CD for automated testing and deployment.",
      jobSkills: ["Typescript", "Vue & Nuxt JS", "Tailwind CSS", "Node & Express JS", "MongoDB", "Docker", "Kubernetes", "Gitlab CI/CD"]
    },
    {
      company: "Parrotly",
      role: "Full-Stack Developer",
      start: "Jun 2022",
      end: "Sep 2022",
      description: "Delivered a user-friendly and intuitive dashboard for an NFT platform. This work involved interacting with several smart contracts and blockchain APIs to fetch and display user's assets, previous activity and NFTs. The platform was built using React and TypeScript with a Next JS frontend and a Web3 and Ethers JS backend.",
      jobSkills: ["Typescript", "React & Next JS", "Tailwind CSS", "Web3 & Ethers JS"]
    },
    {
      company: "Sphere Finance",
      role: "Full-Stack Developer & Treasury Multisignatory",
      start: "Mar 2022",
      end: "Present",
      description: "Created the Wiki sister-site for the Sphere Finance decentralised finance platform. This involved building out an analytics and tools platform in Vue and Nuxt JS with a Node and Express backend and blockchain data sourced via Web3 and Ethers JS. I was also elected by a community of 30.000 token holders to be a multisignatory on the treasury wallet, responsible for the safekeeping and management of over $15M in on-chain assets.",
      jobSkills: ["Typescript", "Vue & Nuxt JS", "Tailwind CSS", "Node & Express JS", "Web3 & Ethers JS"]
    },
    {
      company: "Wonderful Payments",
      role: "Lead Full-Stack Developer",
      start: "Apr 2019",
      end: "Jun 2022",
      description: "For my first full-time position I jumped straight into the deep end taking on a position as the lead developer for an up and coming Open Banking payments platform. During this time I delivered the full site in PHP, from signup, user dashboard, staff admin area and end-to-end payment flow.",
      jobSkills: ["PHP", "MySQL", "GIT"]
    }
  ]

  return (
    <div id="history" className="pt-4">
      <h2 className="font-bold text-2xl md:text-4xl text-center"><i className="fa-solid fa-clock-rotate-left"></i>&nbsp;&nbsp;My Job History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {jobHistory.map(jobData => (
          <>{job(jobData.company, jobData.role, jobData.start, jobData.end, jobData.description, jobData.jobSkills)}</>
        ))}
      </div>
    </div>
  )
}

export default History;