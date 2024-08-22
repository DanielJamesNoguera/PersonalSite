const skills = [
  {name: "React & Next JS", image: "react", area: "Frontend"},
  {name: "Vue & Nuxt JS", image: "vue", area: "Frontend"},
  {name: "Typescript", image: "typescript", area: "Frontend"},
  {name: "Tailwind CSS", image: "tailwind", area: "Frontend"},
  {name: "Node & Express JS", image: "node", area: "Backend"},
  {name: "Web3 & Ethers JS", image: "web3", area: "Backend"},
  {name: "Python", image: "python", area: "Backend"},
  {name: "PHP", image: "php", area: "Backend"},
  {name: "Django", image: "django", area: "Backend"},
  {name: "MongoDB", image: "mongodb", area: "Backend"},
  {name: "PostgreSQL", image: "postgresql", area: "Backend"},
  {name: "MySQL", image: "mysql", area: "Backend"},
  {name: "Firebase", image: "firebase", area: "Backend"},
  {name: "Vector DBs", image: "chroma", area: "Backend"},
  {name: "Docker", image: "docker", area: "DevOps"},
  {name: "Kubernetes", image: "kubernetes", area: "DevOps"},
  {name: "Heroku", image: "heroku", area: "DevOps"},
  {name: "Redis", image: "redis", area: "DevOps"},
  {name: "GIT", image: "git", area: "DevOps"},
  {name: "Gitlab CI/CD", image: "gitlab", area: "DevOps"},
]

const itemsToMeasure = [
  {name: "Body Score", target: 100, unit: " points", domain: [50, 100]},
  {name: "Weight", target: 65.8, unit: " kg", domain: [70, 77]},
  {name: "BMI", target: 22.5, unit: " kg/m²", domain: [23, 26]},
  {name: "Body Fat", target: 14.0, unit: "%", domain: [20, 24]},
  {name: "Water", target: 55.0, unit: "%", domain: [52, 56]},
  {name: "Visceral Fat", target: 9.0, unit: "", domain: [8, 11]},
  {name: "Bone Mass", target: 3.7, unit: " kg", domain: [2, 4]},
  {name: "Subcutaneous Fat", target: 15.0, unit: "%", domain: [18, 22]},
  {name: "Muscle", target: 54.5, unit: " kg", domain: [53, 56]},
  {name: "Protein", target: 17.2, unit: "%", domain: [15, 18]},
  {name: "Skeletal Muscle Mass", target: 30, unit: " kg", domain: [29, 31]},
  {name: "Body Age", target: 25, unit: " years", domain: [24, 29]}
];

const scheduleActivities = [
  { day: "Monday", activities: [
      { name: "Yoga", time: "10 - 11 AM" },
      { name: "Gym Upper Body", time: "2 - 3 PM" },
  ]},
  { day: "Tuesday", activities: [
      { name: "Pilates", time: "12 - 12:45 PM" },
      { name: "Zone 2 Cycling", time: "7 - 9 PM" },
  ]},
  { day: "Wednesday", activities: [
      { name: "Yoga", time: "10 - 11 AM" },
      { name: "Gym Lower Body", time: "2 - 3 PM"}
      
  ]},
  { day: "Thursday", activities: [
      { name: "Pilates", time: "12 - 12:45 PM" },
      { name: "Zone 2 Cycling", time: "7 - 9 PM"}
  ]},
  { day: "Friday", activities: [
      { name: "Gym Upper Body", time: "2 - 3 PM" },
      { name: "Zone 2 Cycling", time: "7 - 8 PM"}
  ]},
  { day: "Saturday", activities: [
      { name: "Race Cycling", time: "4 - 5 PM"},
      { name: "Evening 10km Walk", time: "8 - 9 PM"}
  ]},
  { day: "Sunday", activities: [
      { name: "Zone 2 Cycling", time: "7 - 8 PM"},
      { name: "V02 Max Cycling", time: "8 - 8:30 PM"}
  ]}
]

export { skills, itemsToMeasure, scheduleActivities };