// // sections/Projects.jsx

// import SectionWrapper from '../components/SectionWrapper'
// import ProjectCard from '../components/ProjectCard'
// import { FiArrowRight } from 'react-icons/fi'

// const PROJECTS = [
//   {
//   title: 'Chat App',
//   description: `A real-time chat application that enables instant messaging with user authentication and seamless synchronization across devices. Built using WebSockets/Socket.IO for fast and efficient real-time communication.`,
//   tech: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB'],
//   github: 'https://github.com/B-TechCode',
// },
//   {
//     title: 'Quiz Web App',
//     description:
//       'An interactive, timed quiz platform where users can test their knowledge across multiple categories. Features include score tracking, progress indicators, instant feedback, and a leaderboard system — all built with vanilla JS and a clean UI.',
//     tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
//     github: 'https://github.com/B-TechCode',
//   },

//     {
//   title: 'AI Resume Builder',
//   description: `An AI-driven web application that helps users create professional and ATS-friendly resumes. It provides intelligent suggestions, modern templates, and a smooth user-friendly interface to build resumes efficiently.`,
//   tech: ['React', 'Vite', 'Tailwind CSS', 'OpenAI API'],
//   github: 'https://github.com/B-TechCode',
// },

//   {
//     title: 'Developer Portfolio',
//     description: `The very website you're looking at — designed and built from scratch to showcase my skills, projects, and personality. Features smooth Framer Motion animations, a custom typewriter effect, responsive layout, and a contact form.`,
//     tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
//     github: 'https://github.com/B-TechCode',
//   },

//   //Add your more project here....
// ]

// export default function Projects() {
//   return (
//     <SectionWrapper id="projects">
//       <div className="section-container">

//         {/* Heading */}
//         <div className="text-center mb-14">
//           <p className="section-label">Projects</p>
//           {/* <h2 className="section-heading">
//             Things I've <span className="gradient-text">Built</span>
//           </h2> */}
//         </div>

//         {/* Projects Grid */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {PROJECTS.map((project, i) => (
//             <ProjectCard key={project.title} project={project} index={i} />
//           ))}
//         </div>

//         {/* GitHub Link */}
//         <div className="text-center mt-12">
//           <a
//             href="https://github.com/B-TechCode"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="btn-ghost"
//           >
//             See All Projects
//             <FiArrowRight className="inline ml-2" />
//           </a>
//         </div>

//       </div>
//     </SectionWrapper>
//   )
// }



//Here is the Edited code

// sections/Projects.jsx

import SectionWrapper from '../components/SectionWrapper'
import ProjectCard from '../components/ProjectCard'
import { FiArrowRight } from 'react-icons/fi'

const PROJECTS = [
  {
    title: 'Chat App',
    description: `A real-time chat application that enables instant messaging with user authentication and seamless synchronization across devices. Built using WebSockets/Socket.IO for fast and efficient real-time communication.`,
    tech: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB'],
    github: 'https://github.com/B-TechCode',
  },
  {
    title: 'Quiz Web App',
    description:
      'An interactive, timed quiz platform where users can test their knowledge across multiple categories. Features include score tracking, progress indicators, instant feedback, and a leaderboard system — all built with vanilla JS and a clean UI.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
    github: 'https://github.com/B-TechCode',
  },
  {
    title: 'AI Resume Builder',
    description: `An AI-driven web application that helps users create professional and ATS-friendly resumes. It provides intelligent suggestions, modern templates, and a smooth user-friendly interface to build resumes efficiently.`,
    tech: ['React', 'Vite', 'Tailwind CSS', 'OpenAI API'],
    github: 'https://github.com/B-TechCode',
  },
  {
    title: 'Developer Portfolio',
    description: `The very website you're looking at — designed and built from scratch to showcase my skills, projects, and personality. Features smooth Framer Motion animations, a custom typewriter effect, responsive layout, and a contact form.`,
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/B-TechCode',
  },
]

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="section-container">

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="section-label">Projects</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/B-TechCode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost py-2 px-4 text-sm"
          >
            See All Projects
            <FiArrowRight className="inline ml-2" />
          </a>
        </div>

      </div>
    </SectionWrapper>
  )
}



















