# Siva Santhosh Kumar Reddy — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber · Lenis

## Installation
```bash
npm install
npm run dev        # http://localhost:3000
```
Node.js 18.18 or newer is required.

## Deployment (Vercel)
1. Push this folder to a GitHub repository.
2. Import it at vercel.com/new (the Next.js preset is detected automatically).
3. Add `NEXT_PUBLIC_SITE_URL` (your live URL) and, optionally, the EmailJS variables from `.env.example`.

## Customization
- All content comes from `src/data/resume.ts`: edit text, skills, projects, education and links there.
- Replace `public/resume.pdf` and `public/photo.jpg` to update the resume download and portrait.
- Colors and glass styles live in `src/app/globals.css`; the 3D orb is in `src/components/animations/Orb3D.tsx`.
- Contact form: with the three `NEXT_PUBLIC_EMAILJS_*` variables set it sends through EmailJS; without them it opens your email app.

## Structure
```
src/app            layout, page, 404, loading, robots, sitemap, manifest
src/components     sections/ (Hero, About, Skills, Projects, Education, Certifications, Contact), ui/, animations/
src/data           resume.ts (single source of content)
```

## Contact form and certificates
- **Hire me** scrolls to the contact form. The form sends through EmailJS when the `NEXT_PUBLIC_EMAILJS_*` variables are set; otherwise it uses FormSubmit, which needs no setup. The first message you submit makes FormSubmit email you an activation link: click it once, and every later message arrives in your inbox.
- Certificate links are in `src/data/resume.ts` (`certs`). In Google Drive, set each file to "Anyone with the link can view" so recruiters can open it.
