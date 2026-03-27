#  Aakash Prasad Chaurasiya — Developer Portfolio

A modern, dark-themed developer portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

---

##  Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          ← Site favicon
│   └── resume.pdf           ←  ADD YOUR RESUME HERE
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Responsive navbar with mobile menu
│   │   ├── Footer.jsx       ← Clean footer with socials
│   │   ├── SectionWrapper.jsx ← Reusable animated section wrapper
│   │   └── ProjectCard.jsx  ← Reusable project card component
│   ├── sections/
│   │   ├── Hero.jsx         ← Landing hero with typewriter
│   │   ├── About.jsx        ← Personal intro + highlights
│   │   ├── Skills.jsx       ← Skill cards with progress bars
│   │   ├── Projects.jsx     ← Project showcase
│   │   ├── Services.jsx     ← Services offered
│   │   ├── Resume.jsx       ← Timeline + download button
│   │   └── Contact.jsx      ← Contact form with validation
│   ├── hooks/
│   │   ├── useTypewriter.js ← Typewriter text effect
│   │   └── useScrollReveal.js ← Scroll-triggered animations
│   ├── App.jsx              ← Root component
│   ├── main.jsx             ← Entry point
│   └── index.css            ← Global styles + Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ How to Run Locally

### 1. Prerequisites
- Node.js v18+ installed → [nodejs.org](https://nodejs.org)
- npm (comes with Node)

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
The production-ready files will be in the `dist/` folder.

---

## ✏️ How to Edit Your Content

### 👤 Personal Info
All your personal information is in the section files inside `src/sections/`.

| What to change | Where to find it |
|---|---|
| Name, role, headline | `src/sections/Hero.jsx` |
| Bio / introduction | `src/sections/About.jsx` |
| Skills & proficiency | `src/sections/Skills.jsx` — edit the `SKILLS` array |
| Projects | `src/sections/Projects.jsx` — edit the `PROJECTS` array |
| Services | `src/sections/Services.jsx` — edit the `SERVICES` array |
| Resume timeline | `src/sections/Resume.jsx` — edit the `TIMELINE` array |
| Email / Social links | `src/sections/Contact.jsx` — edit `CONTACT_INFO` |

### 📄 Adding Your Real Resume
1. Export your resume as a PDF
2. Rename it to `resume.pdf`
3. Place it in the `public/` folder (replacing the placeholder)

### 🔗 Updating GitHub/LinkedIn Links
Search for `aakashchaurasiya` in the codebase and replace with your real username.

### 🎨 Changing Colors
Open `tailwind.config.js` and edit the `accent` colors:
```js
accent: {
  DEFAULT: '#22c55e',   // ← change this to your preferred color
  dark:    '#16a34a',
  light:   '#4ade80',
}
```

### 📬 Connecting the Contact Form
The form currently simulates a submission. To make it work:

**Option 1 — Formspree (easiest, free):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and copy your form ID
3. In `src/sections/Contact.jsx`, uncomment the fetch block and replace `YOUR_ID`

**Option 2 — EmailJS:**
1. Sign up at [emailjs.com](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. Follow their React integration guide

---

## 🚀 How to Deploy

### Deploy on Vercel (Recommended — Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repository
4. Leave all settings default — Vercel auto-detects Vite
5. Click **Deploy** 🎉

Your site will be live at `https://your-project.vercel.app`

**To add a custom domain:** Go to your project Settings → Domains → Add domain.

### Deploy on Netlify (Alternative — Free)
1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag and drop the `dist/` folder
4. Done! ✅

Or connect via GitHub for automatic deploys on every push.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Lightning-fast build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Smooth animations |
| React Icons | Icon library |

---

## 📦 Key Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark theme with premium green accent
- ✅ Smooth scroll animations (Framer Motion)
- ✅ Typewriter text effect in hero
- ✅ Skill progress bars with animation
- ✅ Project cards with hover effects
- ✅ Contact form with validation
- ✅ Mobile hamburger menu
- ✅ Scroll-to-top button
- ✅ Active nav link tracking
- ✅ Custom scrollbar
- ✅ SEO meta tags

---

## 📝 License

This portfolio is personal — feel free to use it as a reference, but please don't copy it wholesale without customizing for yourself.

---

*Built with ❤️ by Aakash Prasad Chaurasiya*
