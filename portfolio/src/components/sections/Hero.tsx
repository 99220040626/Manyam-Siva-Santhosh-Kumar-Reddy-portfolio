"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { me } from "@/data/resume";
import { Count } from "@/components/ui/Primitives";

const Orb = dynamic(() => import("@/components/animations/Orb3D"), { ssr: false });

function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0), [t, setT] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const id = setTimeout(() => {
      if (!del) { setT(w.slice(0, t.length + 1)); if (t.length + 1 === w.length) setDel(true); }
      else { setT(w.slice(0, t.length - 1)); if (t.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); } }
    }, del ? (t.length === w.length ? 1400 : 35) : 70);
    return () => clearTimeout(id);
  }, [t, del, i, words]);
  return <span className="text-cyan-300">{t}<span className="animate-pulse">|</span></span>;
}

export default function Hero() {
  const L = me.links;
  const ghost = "btn border border-white/15 bg-white/5 hover:bg-white/10";
  return (
    <header className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <div className="blob left-[-10%] top-[10%] h-[480px] w-[480px] bg-violet-600" />
        <div className="blob right-[-5%] top-[30%] h-[420px] w-[420px] bg-cyan-500" style={{ animationDelay: "-6s" }} />
        <div className="blob bottom-[-10%] left-[30%] h-[380px] w-[380px] bg-emerald-500" style={{ animationDelay: "-12s" }} />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 pt-24 md:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-white/60">Computer Engineering · Class of 2026 · {me.location}</motion.p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {me.short.split(" ").map((w, k) => <motion.span key={w} className="grad mr-4 inline-block" initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.15 * k, duration: 0.9 }}>{w}</motion.span>)}
          </h1>
          <p className="mt-2 text-lg text-white/50">{me.name}</p>
          <p className="mt-6 min-h-8 text-2xl font-medium"><Typer words={me.roles} /></p>
          <p className="mt-5 max-w-xl text-white/65">I build Spring Boot and React web applications and train neural networks in Python, and I am looking for an entry-level software development role.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn bg-gradient-to-r from-violet-500 to-cyan-400 text-black shadow-[0_0_40px_rgba(124,92,255,.5)]"><Mail size={16} />Hire me</a>
            <a href="/resume.pdf" download className={ghost}><Download size={16} />Download resume</a>
            <a href={L.github} target="_blank" rel="noreferrer" className={ghost}>GitHub</a>
            <a href={L.linkedin} target="_blank" rel="noreferrer" className={ghost}>LinkedIn</a>
            <a href={L.leetcode} target="_blank" rel="noreferrer" className={ghost}>LeetCode</a>
          </div>
        </div>
        <div className="relative h-[360px] md:h-[560px]"><Orb /></div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 z-10 mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {me.stats.map((s) => <div key={s.label} className="glass px-5 py-4"><div className="text-3xl font-semibold"><Count to={s.to} dec={s.dec} suffix={s.suffix} /></div><div className="text-sm text-white/55">{s.label}</div></div>)}
      </div>
    </header>
  );
}
