import Link from "next/link";
export default function NotFound() {
  return <main className="grid min-h-screen place-items-center text-center"><div><h1 className="grad text-8xl font-semibold">404</h1><p className="mt-4 text-white/60">This page does not exist.</p><Link href="/" className="btn mt-8 bg-white text-black">Back to home</Link></div></main>;
}
