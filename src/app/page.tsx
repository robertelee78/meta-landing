"use client";

import { useState, useEffect, useRef } from "react";

// Matrix rain character component
function MatrixRain() {
  const [columns, setColumns] = useState<{ id: number; char: string; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789ABCDEFZ:・.\"=*+-<>¦｜╌";
    const cols = [];
    for (let i = 0; i < 40; i++) {
      cols.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 5 + Math.random() * 10,
      });
    }
    setColumns(cols);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {columns.map((col) => (
        <span
          key={col.id}
          className="matrix-char"
          style={{
            left: `${col.left}%`,
            animationDelay: `${col.delay}s`,
            animationDuration: `${col.duration}s`,
          }}
        >
          {col.char}
        </span>
      ))}
    </div>
  );
}

// Typewriter with terminal effect
function useTerminalTypewriter(lines: string[], baseDelay = 30) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const delay = currentLine[currentCharIndex] === '\n' ? 100 : baseDelay;
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setDisplayedLines(prev => [...prev, currentLine]);
      setCurrentLineIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentLineIndex, currentCharIndex, lines, baseDelay]);

  const currentTyping = currentLineIndex < lines.length
    ? lines[currentLineIndex].slice(0, currentCharIndex)
    : "";

  return { displayedLines, currentTyping, isComplete };
}

// Boot sequence component
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const bootLines = [
    "BIOS v2.4.1 (c) AGI Dreams Systems",
    "Memory Test: 640K OK",
    "Loading CLAUDE.SYS...",
    "Neural Interface: ACTIVE",
    "RuVector Engine: ONLINE",
    "Swarm Protocol: INITIALIZED",
    "",
    "████████████████████████ 100%",
    "",
    "Type 'help' for commands or scroll to explore",
  ];

  const { displayedLines, currentTyping, isComplete } = useTerminalTypewriter(bootLines, 15);

  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="font-mono text-sm">
      {displayedLines.map((line, i) => (
        <div key={i} className="boot-line" style={{ animationDelay: `${i * 0.05}s` }}>
          {line.includes("████") ? (
            <span className="text-[var(--terminal-bright)]">{line}</span>
          ) : line.startsWith("Type") ? (
            <span className="text-[var(--amber)]">{line}</span>
          ) : (
            line
          )}
        </div>
      ))}
      {!isComplete && (
        <div>
          {currentTyping}
          <span className="cursor">█</span>
        </div>
      )}
    </div>
  );
}

// ASCII Art Header
function ASCIIHeader() {
  return (
    <pre className="text-[var(--terminal-bright)] text-xs sm:text-sm leading-tight crt-glow">
{`
 ███████╗████████╗ █████╗ ██████╗ ████████╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
 ███████╗   ██║   ███████║██████╔╝   ██║
 ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
 ███████║   ██║   ██║  ██║██║  ██║   ██║
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
 ██╗    ██╗██╗████████╗██╗  ██╗
 ██║    ██║██║╚══██╔══╝██║  ██║
 ██║ █╗ ██║██║   ██║   ███████║
 ██║███╗██║██║   ██║   ██╔══██║
 ╚███╔███╔╝██║   ██║   ██║  ██║
  ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝
 ██╗    ██╗██╗  ██╗██╗   ██╗
 ██║    ██║██║  ██║╚██╗ ██╔╝
 ██║ █╗ ██║███████║ ╚████╔╝
 ██║███╗██║██╔══██║  ╚██╔╝     ▄▄
 ╚███╔███╔╝██║  ██║   ██║      ██
  ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝      ▀▀
`}
    </pre>
  );
}

// BBS-style menu
function BBSMenu({ activeSection }: { activeSection: string }) {
  const menuItems = [
    { key: "1", label: "THE PHILOSOPHY", id: "philosophy" },
    { key: "2", label: "THE STACK", id: "stack" },
    { key: "3", label: "THE WORKFLOW", id: "workflow" },
    { key: "4", label: "THE PROOF", id: "meta" },
    { key: "Q", label: "CONTACT SYSOP", id: "contact" },
  ];

  return (
    <div className="ascii-box p-4 my-8" data-title="[ MAIN MENU ]">
      <div className="text-[var(--amber)] mb-4 crt-glow-amber">
        ═══════════════════════════════════════════
      </div>
      {menuItems.map((item) => (
        <a
          key={item.key}
          href={`#${item.id}`}
          className={`block py-1 hover:bg-[var(--terminal-green)] hover:text-black transition-colors ${
            activeSection === item.id ? "text-[var(--terminal-bright)]" : ""
          }`}
        >
          <span className="text-[var(--amber)]">[{item.key}]</span> {item.label}
          {activeSection === item.id && <span className="ml-2">◄──</span>}
        </a>
      ))}
      <div className="text-[var(--amber)] mt-4 crt-glow-amber">
        ═══════════════════════════════════════════
      </div>
      <div className="text-[var(--gray)] text-xs mt-2">
        Press number or scroll to navigate
      </div>
    </div>
  );
}

// Terminal prompt line
function PromptLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 my-2">
      <span className="text-[var(--terminal-bright)] shrink-0">&gt;</span>
      <span>{children}</span>
    </div>
  );
}

// Philosophy Section (BBS style)
function PhilosophySection() {
  return (
    <section id="philosophy" className="my-16 scroll-mt-8">
      <div className="text-[var(--cyan)] mb-4">
        ╔══════════════════════════════════════════════════════════════╗
        <br />
        ║ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [01] THE PHILOSOPHY &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ║
        <br />
        ╚══════════════════════════════════════════════════════════════╝
      </div>

      <div className="ml-4 space-y-4">
        <PromptLine>cat /etc/philosophy.txt</PromptLine>

        <blockquote className="text-xl crt-glow pl-4 border-l-2 border-[var(--terminal-dim)] my-6">
          "What job is this page <span className="text-[var(--amber)]">HIRING</span> to do for the visitor?"
        </blockquote>

        <p className="text-[var(--terminal-dim)]">
          Before I write a single line of code, I ask this question.
          The clarity on <span className="text-[var(--terminal-bright)]">WHY</span> determines
          the quality of <span className="text-[var(--terminal-bright)]">WHAT</span>.
        </p>

        <div className="mt-8 space-y-2">
          <div className="text-[var(--amber)]">CORE_PRINCIPLES.DAT:</div>
          {[
            { num: "01", title: "CLEAR GOALS FIRST", desc: "Define the visitor's takeaway before design" },
            { num: "02", title: "WHY → WHAT → HOW", desc: "Every task needs problem, solution, and details" },
            { num: "03", title: "CHESTERTON'S FENCE", desc: "Understand before modifying. Measure 3x, cut once." },
            { num: "04", title: "NO SHORTCUTS", desc: "No fallback code. No TODO later. Pure excellence." },
          ].map((item) => (
            <div key={item.num} className="flex">
              <span className="text-[var(--cyan)] w-8">{item.num}.</span>
              <span className="text-[var(--terminal-bright)]">{item.title}</span>
              <span className="text-[var(--gray)] mx-2">─</span>
              <span className="text-[var(--terminal-dim)]">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stack Section
function StackSection() {
  const tools = [
    { name: "CLAUDE_CODE", version: "opus-4", status: "ACTIVE", desc: "AI Partner" },
    { name: "CLAUDE_FLOW", version: "v3-alpha", status: "ACTIVE", desc: "Swarm Orchestration" },
    { name: "RUVECTOR", version: "v1.2", status: "ACTIVE", desc: "Pattern Learning" },
    { name: "ARCHON", version: "v2.1", status: "ACTIVE", desc: "Task Management" },
    { name: "VI", version: "9.0", status: "CLASSIC", desc: "The OG Editor" },
  ];

  return (
    <section id="stack" className="my-16 scroll-mt-8">
      <div className="text-[var(--magenta)] mb-4">
        ╔══════════════════════════════════════════════════════════════╗
        <br />
        ║ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [02] THE STACK &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;║
        <br />
        ╚══════════════════════════════════════════════════════════════╝
      </div>

      <div className="ml-4">
        <PromptLine>systemctl status --all</PromptLine>

        <div className="mt-4 font-mono text-sm">
          <div className="text-[var(--gray)] mb-2">
            SERVICE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; VERSION &nbsp; &nbsp; STATUS &nbsp; &nbsp; DESCRIPTION
          </div>
          <div className="text-[var(--gray)]">
            ─────────────────────────────────────────────────────────
          </div>
          {tools.map((tool) => (
            <div key={tool.name} className="flex items-center py-1">
              <span className="text-[var(--terminal-bright)] w-20">{tool.name}</span>
              <span className="text-[var(--cyan)] w-16">{tool.version}</span>
              <span className={`w-12 ${tool.status === "ACTIVE" ? "text-[var(--terminal-green)]" : "text-[var(--amber)]"}`}>
                [{tool.status === "ACTIVE" ? "●" : "○"}]
              </span>
              <span className="text-[var(--terminal-dim)]">{tool.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PromptLine>cat workflow.sh</PromptLine>
          <pre className="bg-black/50 p-4 mt-2 text-sm border border-[var(--terminal-dim)]">
{`#!/bin/bash
# The workflow that built THIS PAGE

$ mkdir meta-landing && cd meta-landing
$ cfinit  # npx claude-flow@alpha init --force
✓ Claude Flow initialized

$ dsp "I'm competing in a hackathon..."

[CLAUDE] Spawning research swarm...
> agent-01: Design Trends 2026    [COMPLETE]
> agent-02: Tech Stack Analysis   [COMPLETE]
> agent-03: Workflow Examples     [COMPLETE]

[CLAUDE] Initiating PM interview mode...
> Q1: Walk me through your workflow...
> Q2: What tools do you actually use...
> Q3: Secret weapon?
>     "ALWAYS START WITH WHY"`}
          </pre>
        </div>
      </div>
    </section>
  );
}

// Workflow Section
function WorkflowSection() {
  const steps = [
    { cmd: "init", title: "INITIALIZE & PLAN", desc: "mkdir → cfinit → add MCPs → initial prompt with context" },
    { cmd: "split", title: "PRD → TASKS", desc: "Split requirements into Archon tasks. Why/What/How format." },
    { cmd: "exec", title: "EXECUTE", desc: "Fetch highest priority. Analyze BEFORE coding. Plan first." },
    { cmd: "test", title: "VALIDATE", desc: "Test it. Get human feedback. (I ask my wife and kids.)" },
    { cmd: "save", title: "COMMIT", desc: "Proper commits after EVERY task. Sequential undo = safety." },
  ];

  return (
    <section id="workflow" className="my-16 scroll-mt-8">
      <div className="text-[var(--terminal-green)] mb-4">
        ╔══════════════════════════════════════════════════════════════╗
        <br />
        ║ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[03] THE WORKFLOW &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;║
        <br />
        ╚══════════════════════════════════════════════════════════════╝
      </div>

      <div className="ml-4">
        <PromptLine>./workflow --verbose</PromptLine>

        <div className="mt-4 space-y-4">
          {steps.map((step, i) => (
            <div key={step.cmd} className="flex items-start">
              <span className="text-[var(--amber)] w-8">[{i + 1}]</span>
              <div>
                <span className="text-[var(--terminal-bright)]">{step.title}</span>
                <div className="text-[var(--terminal-dim)] ml-4">└─ {step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 border border-dashed border-[var(--terminal-dim)]">
          <div className="text-[var(--amber)]">⚠ CRITICAL INSIGHT:</div>
          <p className="mt-2">
            The secret weapon isn&apos;t the AI. It&apos;s the <span className="text-[var(--terminal-bright)]">DISCIPLINE</span>.
            <br />
            Clear goals. Task-driven. Commit after wins. Get human feedback.
          </p>
        </div>
      </div>
    </section>
  );
}

// Meta Section (The Proof)
function MetaSection() {
  const [stats] = useState({
    buildTime: "~90",
    agents: 3,
    questions: 6,
    fcp: 236,
  });

  return (
    <section id="meta" className="my-16 scroll-mt-8">
      <div className="text-[var(--amber)] mb-4 crt-glow-amber">
        ╔══════════════════════════════════════════════════════════════╗
        <br />
        ║ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[04] THE PROOF &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;║
        <br />
        ╚══════════════════════════════════════════════════════════════╝
      </div>

      <div className="ml-4">
        <PromptLine>neofetch --meta</PromptLine>

        <div className="mt-4 flex flex-col md:flex-row gap-8">
          <pre className="text-[var(--terminal-bright)] text-xs">
{`        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\
    \\___)=(___/`}
          </pre>

          <div className="space-y-1 text-sm">
            <div><span className="text-[var(--cyan)]">page@</span><span className="text-[var(--terminal-bright)]">meta-landing</span></div>
            <div className="text-[var(--gray)]">─────────────────────</div>
            <div><span className="text-[var(--terminal-bright)]">Build Time:</span> {stats.buildTime} minutes</div>
            <div><span className="text-[var(--terminal-bright)]">Agents Spawned:</span> {stats.agents}</div>
            <div><span className="text-[var(--terminal-bright)]">Interview Qs:</span> {stats.questions}</div>
            <div><span className="text-[var(--terminal-bright)]">First Paint:</span> {stats.fcp}ms</div>
            <div><span className="text-[var(--terminal-bright)]">Framework:</span> Next.js 16</div>
            <div><span className="text-[var(--terminal-bright)]">Style:</span> Tailwind + Matrix CSS</div>
            <div><span className="text-[var(--terminal-bright)]">AI:</span> Claude Opus 4.5</div>
          </div>
        </div>

        <div className="mt-8">
          <PromptLine>cat THE_META_TRUTH.txt</PromptLine>
          <div className="mt-4 p-4 bg-black/50 border border-[var(--terminal-green)]">
            <p className="text-[var(--terminal-bright)]">
              This isn&apos;t a mockup. This isn&apos;t a concept.
            </p>
            <p className="mt-2">
              You are looking at the <span className="text-[var(--amber)]">ACTUAL OUTPUT</span> of the workflow
              being described. The page IS the proof.
            </p>
            <p className="mt-4 text-[var(--cyan)]">
              &quot;Follow the white rabbit...&quot;
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-[var(--gray)] mb-2">INITIAL_PROMPT.LOG:</div>
          <pre className="bg-black/30 p-4 text-xs border-l-2 border-[var(--terminal-dim)] overflow-x-auto">
{`"I'm competing in a mini hackathon challenge today.
'Meta Landing Page' - Build a beautiful landing page
that showcases how YOU build beautiful frontends with
your AI coding agent.

The twist? You're using that very workflow to build it.

Go into expert PM/TPM mode and do a deep Q&A interview
with me. Separately, fire off research agents to
investigate the best tech, scheme, look, feel..."`}
          </pre>
        </div>
      </div>
    </section>
  );
}

// Contact/Footer
function ContactSection() {
  return (
    <section id="contact" className="my-16 scroll-mt-8">
      <div className="text-[var(--gray)]">
        ════════════════════════════════════════════════════════════════
      </div>
      <div className="py-8 text-center">
        <div className="text-[var(--terminal-dim)]">SYSOP:</div>
        <div className="text-[var(--terminal-bright)] text-xl">Robert E. Lee</div>
        <a
          href="mailto:robert@agidreams.us"
          className="text-[var(--cyan)] hover:text-[var(--terminal-bright)]"
        >
          robert@agidreams.us
        </a>
        <div className="mt-4 text-[var(--gray)] text-sm">
          Built with CLAUDE_CODE + CLAUDE_FLOW | January 2026
        </div>
        <div className="mt-2 text-[var(--terminal-dim)] text-xs">
          &quot;Always start with WHY&quot;
        </div>
      </div>
      <div className="text-[var(--gray)]">
        ════════════════════════════════════════════════════════════════
      </div>
      <div className="text-center mt-4 text-[var(--terminal-dim)] text-sm">
        Connection closed. Thank you for visiting. <span className="cursor">█</span>
      </div>
    </section>
  );
}

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState("philosophy");
  const containerRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["philosophy", "stack", "workflow", "meta", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen scanlines flicker"
    >
      <MatrixRain />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {!booted ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl screen-on">
              <BootSequence onComplete={() => setBooted(true)} />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="text-center mb-8">
              <ASCIIHeader />
              <p className="text-[var(--terminal-dim)] mt-4">
                How I build production frontends with AI in hours, not days.
              </p>
              <p className="text-[var(--amber)] text-sm mt-2">
                ▼ A Meta Landing Page - Built With The Workflow It Describes ▼
              </p>
            </header>

            {/* BBS Menu */}
            <BBSMenu activeSection={activeSection} />

            {/* Sections */}
            <PhilosophySection />
            <StackSection />
            <WorkflowSection />
            <MetaSection />
            <ContactSection />
          </>
        )}
      </div>
    </main>
  );
}
