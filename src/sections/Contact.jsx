// // sections/Contact.jsx
// // Contact form with validation + social links

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'aakashchaurasiya630@gmail.com',
    href: 'mailto:aakashchaurasiya629@gmail.com',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/B-TechCode',
    href: 'https://github.com/B-TechCode',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aakashprasadchaurasiya',
    href: 'https://linkedin.com/in/aakashprasadchaurasiya',
  },
]

// ─── Simple form validation ──────────────────────────────────────────────
function validate(fields) {
  const errors = {}
  if (!fields.name.trim())                          errors.name    = 'Name is required.'
  if (!fields.email.trim())                         errors.email   = 'Email is required.'
  else if (!/\S+@\S+\.\S+/.test(fields.email))     errors.email   = 'Enter a valid email address.'
  if (!fields.message.trim())                       errors.message = 'Message cannot be empty.'
  else if (fields.message.trim().length < 20)       errors.message = 'Message must be at least 20 characters.'
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus]  = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    // ── Replace this block with your actual form service (Formspree, EmailJS, etc.) ──
    // Example with Formspree:
    // const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(fields),
    // })
    // For now we simulate a network request:
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
    setFields({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputClass = (field) =>
    `w-full bg-navy-800/80 border rounded-xl px-4 py-3 text-white text-sm font-body placeholder:text-slate-600
     focus:outline-none focus:ring-2 transition-all duration-200 ${
       errors[field]
         ? 'border-red-500/60 focus:ring-red-500/30'
         : 'border-white/8 focus:border-accent/50 focus:ring-accent/20'
     }`

  return (
    <SectionWrapper id="contact">
      <div className="section-container">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="section-label">Contact</p>
          <h2 className="section-heading">
            {/* Let's <span className="gradient-text">Work Together</span> */}
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            I'm open to internship opportunities, freelance projects, and collaborations.
            Drop me a message and I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Main code for Maintence height and width*/}

        {/* <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 max-w-5xl mx-auto"> */}

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* ── Left: Contact info ── */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-white mb-1">Get in Touch</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Whether you have a project idea, an internship opportunity, or just want to connect —
                I'm always happy to chat.
              </p>

              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Icon size={17} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-slate-500 mb-0.5">{label}</p>
                      <p className="text-slate-300 text-sm group-hover:text-accent transition-colors break-all">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass-card p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping opacity-50" />
              </div>
              <p className="text-slate-300 text-sm">
                <span className="text-accent font-medium">Currently available</span> for internships & freelance work
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-7"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Aakash"
                  className={inputClass('name')}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <FiAlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="aakash@example.com"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <FiAlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Hi Aakash, I'd love to discuss an internship opportunity..."
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <FiAlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'btn-primary'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <FiSend size={15} /> Send Message
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                      </svg>
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <FiCheck size={15} /> Message Sent!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-slate-600 text-xs text-center font-mono">
                I typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}



// //Edited code is here

// // sections/Contact.jsx

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import SectionWrapper from '../components/SectionWrapper'
// import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

// const CONTACT_INFO = [
//   {
//     icon: FiMail,
//     label: 'Email',
//     value: 'aakashchaurasiya630@gmail.com',
//     href: 'mailto:aakashchaurasiya629@gmail.com',
//   },
//   {
//     icon: FiGithub,
//     label: 'GitHub',
//     value: 'github.com/B-TechCode',
//     href: 'https://github.com/B-TechCode',
//   },
//   {
//     icon: FiLinkedin,
//     label: 'LinkedIn',
//     value: 'linkedin.com/in/aakashprasadchaurasiya',
//     href: 'https://linkedin.com/in/aakashprasadchaurasiya',
//   },
// ]

// function validate(fields) {
//   const errors = {}
//   if (!fields.name.trim()) errors.name = 'Name is required.'
//   if (!fields.email.trim()) errors.email = 'Email is required.'
//   else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Enter a valid email address.'
//   if (!fields.message.trim()) errors.message = 'Message cannot be empty.'
//   else if (fields.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
//   return errors
// }

// export default function Contact() {
//   const [fields, setFields] = useState({ name: '', email: '', message: '' })
//   const [errors, setErrors] = useState({})
//   const [status, setStatus] = useState('idle')

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFields((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const validationErrors = validate(fields)
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors)
//       return
//     }

//     setStatus('sending')
//     await new Promise((r) => setTimeout(r, 1500))
//     setStatus('success')
//     setFields({ name: '', email: '', message: '' })
//     setTimeout(() => setStatus('idle'), 4000)
//   }

//   const inputClass = (field) =>
//     `w-full bg-navy-800/80 border rounded-xl px-2.5 py-2 text-white text-sm font-body placeholder:text-slate-600
//      focus:outline-none focus:ring-2 transition-all duration-200 ${
//        errors[field]
//          ? 'border-red-500/60 focus:ring-red-500/30'
//          : 'border-white/8 focus:border-accent/50 focus:ring-accent/20'
//      }`

//   return (
//     <SectionWrapper id="contact">
//       <div className="section-container">

//         {/* Heading */}
//         <div className="text-center mb-10">
//           <p className="section-label">Contact</p>
//           <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">
//             I'm open to internship opportunities, freelance projects, and collaborations.
//             Drop me a message and I'll get back to you within 24 hours.
//           </p>
//         </div>

//         {/* <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 max-w-4xl mx-auto"> */}

//         <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 max-w-5xl mx-auto">


//         {/* Form Editing(i.e: Height & Width) */}
//         {/* <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6 max-w-6xl mx-auto"> */}


//           {/* Left */}
//           <div className="space-y-5">
//             <div className="glass-card p-5">
//               <h3 className="font-display font-bold text-white mb-1">Get in Touch</h3>
//               <p className="text-slate-500 text-sm mb-4 leading-relaxed">
//                 Whether you have a project idea, an internship opportunity, or just want to connect —
//                 I'm always happy to chat.
//               </p>

//               <div className="space-y-3">
//                 {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
//                   <a
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 group"
//                   >
//                     <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
//                       <Icon size={16} className="text-accent" />
//                     </div>
//                     <div>
//                       <p className="font-mono text-xs text-slate-500">{label}</p>
//                       <p className="text-slate-300 text-sm group-hover:text-accent transition-colors break-all">
//                         {value}
//                       </p>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div className="glass-card p-3 flex items-center gap-2">
//               <div className="relative">
//                 <div className="w-2.5 h-2.5 bg-accent rounded-full" />
//                 <div className="absolute inset-0 w-2.5 h-2.5 bg-accent rounded-full animate-ping opacity-50" />
//               </div>
//               <p className="text-slate-300 text-sm">
//                 <span className="text-accent font-medium">Currently available</span> for internships & freelance work
//               </p>
//             </div>
//           </div>

//           {/* Right Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="glass-card p-4 max-w-4xl mx-auto"
//           >
//             <form onSubmit={handleSubmit} noValidate className="space-y-4">

//               <div>
//                 <label className="block font-mono text-xs text-slate-400 mb-1">Your Name *</label>
//                 <input type="text" name="name" value={fields.name} onChange={handleChange} placeholder="Aakash" className={inputClass('name')} />
//               </div>

//               <div>
//                 <label className="block font-mono text-xs text-slate-400 mb-1">Email Address *</label>
//                 <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder="aakash@example.com" className={inputClass('email')} />
//               </div>

//               <div>
//                 <label className="block font-mono text-xs text-slate-400 mb-1">Message *</label>
//                 <textarea
//                   name="message"
//                   value={fields.message}
//                   onChange={handleChange}
//                   rows={4}
//                   placeholder="Hi Aakash, I'd love to discuss an internship opportunity..."
//                   className={`${inputClass('message')} resize-none`}
//                 />
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={status === 'sending' || status === 'success'}
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`w-full py-2.5 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
//                   status === 'success' ? 'bg-emerald-600 text-white' : 'btn-primary'
//                 }`}
//               >
//                 <AnimatePresence mode="wait">
//                   {status === 'idle' && <span className="flex items-center gap-2"><FiSend size={14}/> Send Message</span>}
//                   {status === 'sending' && <span className="flex items-center gap-2">Sending...</span>}
//                   {status === 'success' && <span className="flex items-center gap-2"><FiCheck size={14}/> Message Sent!</span>}
//                 </AnimatePresence>
//               </motion.button>

//               <p className="text-slate-600 text-xs text-center font-mono mt-1">
//                 I typically respond within 24 hours.
//               </p>

//             </form>
//           </motion.div>

//         </div>
//       </div>
//     </SectionWrapper>
//   )
// }