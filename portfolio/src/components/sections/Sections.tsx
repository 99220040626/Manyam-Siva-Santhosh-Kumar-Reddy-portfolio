"use client";
import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { me, projects, education, certs, type Project } from "@/data/resume";
import { Reveal, Tilt } from "@/components/ui/Primitives";

const NAV = ["about", "skills", "projects", "education", "certifications", "contact"];

export function Nav() {
  return (
    <nav aria-label="Primary" className="glass fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-2 text-sm">
      {NAV.map((n) => <a key={n} href={`#${n}`} className="hidden rounded-full px-3 py-1 capitalize text-white/70 hover:bg-white/10 hover:text-white md:block">{n}</a>)}
      <a href="/resume.pdf" download className="flex items-center gap-1 rounded-full bg-white px-4 py-1.5 font-medium text-black"><Download size={14} />Resume</a>
    </nav>
  );
}

function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <Reveal><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2></Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function About() {
  return (
    <Sec id="about" title="About me">
      <div className="grid items-center gap-10 md:grid-cols-[320px_1fr]">
        <Reveal><Tilt className="glass overflow-hidden p-2"><Image src="/photo.jpg" alt={`Portrait of ${me.name}`} width={800} height={1067} className="h-auto w-full rounded-[20px]" priority /></Tilt></Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-prose text-xl leading-relaxed text-white/80">{me.objective}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="glass p-5"><h3 className="text-sm text-white/50">Languages</h3><p className="mt-1">{me.languages.join(", ")}</p></div>
            <div className="glass p-5"><h3 className="text-sm text-white/50">Interests</h3><p className="mt-1">{me.interests.join(", ")}</p></div>
          </div>
        </Reveal>
      </div>
    </Sec>
  );
}

export function Skills() {
  const all = me.skills.flatMap((g) => g.items);
  return (
    <Sec id="skills" title="Skills">
      <div className="grid gap-5 md:grid-cols-3">
        {me.skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06} className="h-full">
            <Tilt className="glass h-full p-6">
              <h3 className="font-medium">{g.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">{g.items.map((s) => <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">{s}</span>)}</div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <div aria-hidden className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex w-max gap-10 text-3xl font-semibold text-white/25" style={{ animation: "marquee 35s linear infinite" }}>{[...all, ...all].map((s, i) => <span key={i}>{s}</span>)}</div>
      </div>
    </Sec>
  );
}

export function Projects() {
  const [q, setQ] = useState(""), [f, setF] = useState("All"), [open, setOpen] = useState<Project | null>(null);
  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const list = useMemo(() => projects.filter((p) => (f === "All" || p.category === f) && `${p.title} ${p.summary} ${p.stack.join(" ")}`.toLowerCase().includes(q.toLowerCase())), [q, f]);
  return (
    <Sec id="projects" title="Projects">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input aria-label="Search projects" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects or technologies" className="glass w-full max-w-xs rounded-full px-5 py-2.5 text-sm outline-none focus:border-violet-400 md:w-auto" />
        {cats.map((c) => <button key={c} onClick={() => setF(c)} aria-pressed={f === c} className={`rounded-full border px-4 py-2 text-sm ${f === c ? "border-violet-400 bg-violet-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>{c}</button>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p) => (
          <Tilt key={p.title} onClick={() => setOpen(p)} className="glass cursor-pointer p-7">
            <p className="text-sm text-cyan-300">{p.category} · {p.period}</p>
            <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
            <p className="mt-3 text-white/65">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">{s}</span>)}</div>
            <button className="mt-6 text-sm font-medium text-violet-300">View details</button>
          </Tilt>
        ))}
        {list.length === 0 && <p className="text-white/60">No projects match. Clear the search to see all projects.</p>}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={open.title} className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#0b0d14] p-8" initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.96 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4"><h3 className="text-3xl font-semibold">{open.title}</h3><button aria-label="Close" onClick={() => setOpen(null)} className="rounded-full bg-white/10 p-2"><X size={18} /></button></div>
              <p className="mt-2 text-cyan-300">{open.period}</p>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-white/75">{open.features.map((x) => <li key={x}>{x}</li>)}</ul>
              <h4 className="mt-7 text-sm text-white/50">Architecture</h4>
              <div className="mt-3 flex flex-wrap items-center gap-2">{open.arch.map((a, i) => <span key={a} className="flex items-center gap-2"><span className="rounded-xl border border-violet-400/40 bg-violet-500/10 px-3 py-2 text-sm">{a}</span>{i < open.arch.length - 1 && <span aria-hidden className="text-white/40">→</span>}</span>)}</div>
              <a href={me.links.github} target="_blank" rel="noreferrer" className="btn mt-8 bg-white text-black">View on GitHub</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sec>
  );
}

export function Education() {
  return (
    <Sec id="education" title="Education">
      <ol className="relative ml-3 space-y-8 border-l border-white/15 pl-8">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <li className="relative"><span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 shadow-[0_0_20px_#7c5cff]" />
              <p className="text-sm text-white/50">{e.period}</p><h3 className="text-xl font-medium">{e.school}</h3><p className="text-white/70">{e.degree} · <span className="text-cyan-300">{e.score}</span></p></li>
          </Reveal>
        ))}
      </ol>
    </Sec>
  );
}

export function Certifications() {
  return (
    <Sec id="certifications" title="Certifications & achievements">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06} className="h-full">
            <Tilt className="glass flex h-full flex-col gap-5 p-6">
              <div className="flex items-center gap-4">
                <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg font-semibold text-black">{i === 0 ? "2" : "✓"}</motion.div>
                <div><h3 className="font-medium">{c.title}</h3><p className="text-sm text-white/60">{c.issuer}{c.year && ` · ${c.year}`}</p></div>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">{c.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm hover:bg-white/10">{l.label}</a>)}</div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Sec>
  );
}

const schema = z.object({ name: z.string().min(2, "Enter your name"), email: z.string().email("Enter a valid email address"), message: z.string().min(10, "Write at least 10 characters") });
type FormData = z.infer<typeof schema>;

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [msg, setMsg] = useState("");
  const send = async (d: FormData) => {
    const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const emailjs = Boolean(sid && tid && key);
    try {
      const r = emailjs
        ? await fetch("https://api.emailjs.com/api/v1.0/email/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service_id: sid, template_id: tid, user_id: key, template_params: d }) })
        : await fetch(`https://formsubmit.co/ajax/${me.email}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...d, _subject: `Portfolio message from ${d.name}`, _replyto: d.email }) });
      const j = emailjs ? null : await r.json().catch(() => null);
      const ok = r.ok && (emailjs || String(j?.success) === "true");
      if (ok) { setMsg("Message sent. Thank you!"); reset(); } else setMsg(j?.message ? String(j.message) : `Could not send. Please email me at ${me.email}.`);
    } catch { setMsg(`Could not send. Please email me at ${me.email}.`); }
  };
  const field = "glass w-full rounded-2xl px-5 py-3 outline-none focus:border-violet-400";
  return (
    <Sec id="contact" title="Let’s work together">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-white/70">I am open to entry-level software development roles. Send a message and I will reply by email.</p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li><a className="hover:text-cyan-300" href={`mailto:${me.email}`}>{me.email}</a></li>
            <li><a className="hover:text-cyan-300" href={`tel:${me.phone}`}>{me.phone}</a></li>
            <li className="flex gap-4 pt-2">{Object.entries({ GitHub: me.links.github, LinkedIn: me.links.linkedin, LeetCode: me.links.leetcode }).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noreferrer" className="underline decoration-white/30 hover:text-cyan-300">{k}</a>)}</li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(send)} className="space-y-4" noValidate>
            <input aria-label="Your name" placeholder="Your name" className={field} {...register("name")} />{errors.name && <p role="alert" className="text-sm text-rose-300">{errors.name.message}</p>}
            <input aria-label="Your email" placeholder="Your email" type="email" className={field} {...register("email")} />{errors.email && <p role="alert" className="text-sm text-rose-300">{errors.email.message}</p>}
            <textarea aria-label="Your message" placeholder="Your message" rows={5} className={field} {...register("message")} />{errors.message && <p role="alert" className="text-sm text-rose-300">{errors.message.message}</p>}
            <button disabled={isSubmitting} className="btn bg-gradient-to-r from-violet-500 to-cyan-400 text-black">Send message</button>
            <p aria-live="polite" className="text-sm text-white/70">{msg}</p>
          </form>
        </Reveal>
      </div>
    </Sec>
  );
}

export function Footer() {
  return <footer className="relative z-10 border-t border-white/10 py-10 text-center text-sm text-white/45">© 2026 {me.name}</footer>;
}
