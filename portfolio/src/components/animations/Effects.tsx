"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";

export default function Effects() {
  const x = useMotionValue(-600), y = useMotionValue(-600);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX - 300); y.set(e.clientY - 300); };
    window.addEventListener("mousemove", move);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = calm ? null : new Lenis({ lerp: 0.1 });
    let id = 0;
    const raf = (t: number) => { lenis?.raf(t); id = requestAnimationFrame(raf); };
    if (lenis) id = requestAnimationFrame(raf);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); lenis?.destroy(); };
  }, [x, y]);
  return (
    <>
      <motion.div style={{ scaleX: bar }} className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-gradient-to-r from-violet-400 to-cyan-300" />
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,.14),transparent_60%)]" />
    </>
  );
}
