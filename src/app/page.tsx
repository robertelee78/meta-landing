"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { Variants } from "framer-motion";

// Typewriter effect hook
function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

// Animated counter
function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const terminalText = `$ mkdir meta-landing && cd meta-landing
$ cfinit  # npx claude-flow@alpha init --force
✓ Claude Flow initialized

$ dsp "I'm competing in a hackathon..."

[Claude] I'll conduct a PM interview AND spawn
research agents in parallel. Let's go.

> Spawning agent-01: Design Trends Research
> Spawning agent-02: Tech Stack Analysis
> Spawning agent-03: Workflow Examples

[Interview Mode]
Q1: Walk me through your ACTUAL workflow...`;

  const { displayed, done } = useTypewriter(terminalText, 20);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* HERO - Brutalist oversized typography */}
      <section className="min-h-screen relative flex flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* Floating grid accent */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-[0.03]"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </motion.div>

        {/* Accent blobs */}
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live Demo: Meta Landing Page Hackathon
          </div>

          {/* Main headline - MASSIVE */}
          <h1 className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter mb-8">
            <span className="block text-white/90">START</span>
            <span className="block text-white/90">WITH</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              WHY.
            </span>
          </h1>

          {/* Subhead with personality */}
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-light">
            Not another AI workflow page.{" "}
            <span className="text-white font-medium">
              This IS the workflow, running live.
            </span>
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#the-why"
              className="group px-8 py-4 bg-white text-black font-bold text-lg hover:bg-blue-400 hover:text-black transition-all duration-200"
            >
              The Philosophy
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#proof"
              className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg hover:border-white/60 transition-colors"
            >
              See The Proof
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-sm"
        >
          <span className="font-mono text-xs">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* THE WHY - Split screen with contrast */}
      <section id="the-why" className="min-h-screen grid md:grid-cols-2">
        {/* Left - Dark with quote */}
        <div className="bg-[#0a0f1a] p-12 md:p-20 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-400 font-mono text-sm mb-8 block">01 / THE PHILOSOPHY</span>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
              "What job is this page{" "}
              <span className="text-blue-400 font-medium">hiring</span>
              {" "}to do for the visitor?"
            </blockquote>
            <p className="text-slate-400 text-lg max-w-md">
              Before I write a single line of code, I ask this question.
              The more clarity on <span className="text-white">WHY</span>,
              the better you deliver the <span className="text-white">WHAT</span>.
            </p>
          </motion.div>
        </div>

        {/* Right - Principles stacked */}
        <div className="bg-[#060a12] p-12 md:p-20 flex flex-col justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {[
              {
                num: "01",
                title: "Clear Goals First",
                desc: "What is the visitor intended to learn? What problem are we solving?",
              },
              {
                num: "02",
                title: "Why → What → How",
                desc: "Every task needs a problem statement, proposed solution, and design details.",
              },
              {
                num: "03",
                title: "Chesterton's Fence",
                desc: "Never modify code without first understanding why it exists. Measure 3x, cut once.",
              },
              {
                num: "04",
                title: "No Shortcuts. Ever.",
                desc: "No fallback code. No 'TODO later'. Pure excellence, done right.",
              },
            ].map((item) => (
              <div key={item.num} className="group border-l-2 border-slate-700 pl-6 hover:border-blue-400 transition-colors">
                <span className="text-slate-600 font-mono text-xs">{item.num}</span>
                <h3 className="text-xl font-semibold text-white mt-1">{item.title}</h3>
                <p className="text-slate-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THE STACK - Horizontal scroll feel */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#030712]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 font-mono text-sm mb-4 block">02 / THE STACK</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-16">
            Tools that <span className="text-cyan-400">play together.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Claude Code", role: "AI Partner", color: "from-orange-500 to-red-600" },
              { name: "Claude Flow", role: "Swarm Orchestration", color: "from-blue-500 to-cyan-500" },
              { name: "RuVector", role: "Pattern Learning", color: "from-purple-500 to-pink-500" },
              { name: "Archon", role: "Task Management", color: "from-green-500 to-emerald-500" },
              { name: "vi", role: "Yes, really.", color: "from-slate-600 to-slate-800" },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 bg-slate-900/50 border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <h3 className="font-bold text-lg text-white">{tool.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{tool.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal block */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-black border border-slate-800 rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-slate-500 text-sm font-mono">~/meta-landing</span>
            </div>
            <pre className="p-6 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">
              {displayed}
              {!done && <span className="animate-pulse">▋</span>}
            </pre>
          </motion.div>
        </motion.div>
      </section>

      {/* THE WORKFLOW - Timeline with edge */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#030712] to-[#0a0f1a]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-400 font-mono text-sm mb-4 block">03 / THE WORKFLOW</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Five steps.{" "}
            <span className="text-purple-400">No magic.</span>
          </h2>
          <p className="text-slate-400 text-xl mb-16 max-w-2xl">
            A disciplined, task-driven approach. Each step has a reason.
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent" />

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Initialize & Plan",
                  detail: "mkdir → cfinit → add MCPs → initial prompt with full context",
                  code: "cfinit && dsp 'Here is my challenge...'",
                },
                {
                  step: "02",
                  title: "PRD → Tasks",
                  detail: "Split requirements into Archon tasks. Each has Why / What / How.",
                  code: null,
                },
                {
                  step: "03",
                  title: "Execute with Discipline",
                  detail: "Fetch highest priority. Analyze BEFORE touching code. Plan first.",
                  code: null,
                },
                {
                  step: "04",
                  title: "Validate & Learn",
                  detail: "Test it. Get human feedback. (I ask my wife and kids.) Update future tasks.",
                  code: null,
                },
                {
                  step: "05",
                  title: "Commit & Continue",
                  detail: "Proper commits after EVERY task. Sequential undo = safety net.",
                  code: "git commit -m 'feat: task complete'",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-slate-400 mt-2">{item.detail}</p>
                    {item.code && (
                      <code className="inline-block mt-3 px-3 py-1.5 bg-slate-900 text-cyan-400 text-sm font-mono rounded">
                        {item.code}
                      </code>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* THE PROOF - This is where we get META */}
      <section id="proof" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0f1a]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <span className="text-green-400 font-mono text-sm mb-4 block">04 / THE PROOF</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            This page <span className="text-green-400">is</span> the proof.
          </h2>
          <p className="text-slate-400 text-xl mb-16 max-w-2xl">
            Not a mockup. Not a concept. The actual workflow, demonstrated live.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: 45, label: "Minutes to build", suffix: "" },
              { value: 3, label: "Research agents spawned", suffix: "" },
              { value: 6, label: "Interview questions answered", suffix: "" },
              { value: 236, label: "First contentful paint (ms)", suffix: "ms" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-black/50 border border-slate-800"
              >
                <div className="text-4xl md:text-5xl font-black text-white">
                  <Counter target={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-slate-500 text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Actual prompt used */}
          <div className="space-y-8">
            <div className="p-8 bg-black border border-slate-800">
              <div className="text-green-400 font-mono text-sm mb-4">// THE ACTUAL INITIAL PROMPT</div>
              <p className="text-slate-300 font-mono text-sm leading-relaxed">
                "I'm competing in a mini hackathon challenge today. 'Meta Landing Page' -
                Build a beautiful landing page that showcases how YOU build beautiful frontends
                with your AI coding agent. The twist? You're using that very workflow to build it...
                <br /><br />
                Go into expert PM/TPM mode and do a deep Q&A interview with me.
                Separately, fire off research agents to investigate the best tech, scheme, look, feel..."
              </p>
            </div>

            {/* Interview excerpt */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/50 border border-slate-800">
                <div className="text-blue-400 font-mono text-xs mb-3">Q: SECRET WEAPON?</div>
                <p className="text-slate-300">
                  "I start with clear goals. What is the visitor intended to learn?
                  What job is the page hiring? The more clarity on WHY, the better
                  you deliver the WHAT. <span className="text-white font-medium">ALWAYS start with Why.</span>"
                </p>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-800">
                <div className="text-blue-400 font-mono text-xs mb-3">Q: RECOVERY STRATEGY?</div>
                <p className="text-slate-300">
                  "I commit after every successful task. This gives sequential undo capabilities.
                  If AI gives mediocre output? Iterate with specificity. Show examples,
                  reference sites, provide screenshots.{" "}
                  <span className="text-white font-medium">I also ask my wife and kids.</span>"
                </p>
              </div>
            </div>

            {/* Tech choices */}
            <div className="p-6 bg-slate-900/50 border border-slate-800">
              <div className="text-cyan-400 font-mono text-xs mb-4">STACK DECISION (BASED ON RESEARCH AGENTS)</div>
              <div className="flex flex-wrap gap-3">
                {["Next.js 15", "Tailwind CSS", "Framer Motion", "TypeScript", "Playwright Tests"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-black text-white text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Chosen for: speed-to-build + visual impact + instant deployment.
                Research showed 2026 trends favor micro-animations, dark mode, and clean focused layouts.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CLOSING - Bold statement */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-8">
            The secret?
            <br />
            <span className="text-slate-500">There is no secret.</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl">
            Start with clear goals.
            Use tools that work together.
            Commit after every win.
            Get human feedback.
            Learn and iterate.
          </p>

          <p className="text-2xl md:text-3xl text-white font-medium">
            That's it. That's the whole thing.
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-slate-800 bg-[#030712]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            Built with <span className="text-blue-400">Claude Code</span> +{" "}
            <span className="text-purple-400">Claude Flow</span>
            {" "}by{" "}
            <span className="text-white">Robert E. Lee</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="mailto:robert@agidreams.us" className="text-slate-400 hover:text-white transition-colors">
              robert@agidreams.us
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500 font-mono">January 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
