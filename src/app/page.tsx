"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Matrix rain character component
function MatrixRain() {
  const [columns, setColumns] = useState<{ id: number; char: string; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z";
    const cols = [];
    for (let i = 0; i < 30; i++) {
      cols.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 12,
      });
    }
    setColumns(cols);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
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

// Terminal output line
interface OutputLine {
  text: string;
  type: "input" | "output" | "system" | "header" | "error" | "success" | "amber";
}

// Content data
const CONTENT = {
  banner: `
 ███████╗████████╗ █████╗ ██████╗ ████████╗    ██╗    ██╗██╗████████╗██╗  ██╗    ██╗    ██╗██╗  ██╗██╗   ██╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██║    ██║██║╚══██╔══╝██║  ██║    ██║    ██║██║  ██║╚██╗ ██╔╝
 ███████╗   ██║   ███████║██████╔╝   ██║       ██║ █╗ ██║██║   ██║   ███████║    ██║ █╗ ██║███████║ ╚████╔╝
 ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██║███╗██║██║   ██║   ██╔══██║    ██║███╗██║██╔══██║  ╚██╔╝
 ███████║   ██║   ██║  ██║██║  ██║   ██║       ╚███╔███╔╝██║   ██║   ██║  ██║    ╚███╔███╔╝██║  ██║   ██║
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝        ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝`,

  help: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                              AVAILABLE COMMANDS                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║  help          - Display this help menu                                       ║
║  menu          - Show main navigation menu                                    ║
║  1 | why       - THE PHILOSOPHY: Start with Why                               ║
║  2 | stack     - THE STACK: Tools that play together                          ║
║  3 | workflow  - THE WORKFLOW: Five steps, no magic                           ║
║  4 | proof     - THE PROOF: This page IS the proof                            ║
║  5 | contact   - SYSOP contact information                                    ║
║  about         - About this system                                            ║
║  clear         - Clear the terminal                                           ║
║  rabbit        - Follow the white rabbit...                                   ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,

  menu: `
┌─────────────────────────────────────────────────────────────────┐
│                         MAIN MENU                               │
├─────────────────────────────────────────────────────────────────┤
│  [1] THE PHILOSOPHY    - Start with Why                         │
│  [2] THE STACK         - Tools that play together               │
│  [3] THE WORKFLOW      - Five steps, no magic                   │
│  [4] THE PROOF         - This page IS the proof                 │
│  [5] CONTACT SYSOP     - Get in touch                           │
├─────────────────────────────────────────────────────────────────┤
│  Type a number or command. Type 'help' for all commands.        │
└─────────────────────────────────────────────────────────────────┘`,

  philosophy: `
══════════════════════════════════════════════════════════════════════════════════
                              [01] THE PHILOSOPHY
══════════════════════════════════════════════════════════════════════════════════

  "What job is this page HIRING to do for the visitor?"

  Before I write a single line of code, I ask this question.
  The clarity on WHY determines the quality of WHAT.

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ CORE_PRINCIPLES.DAT                                                         │
  ├─────────────────────────────────────────────────────────────────────────────┤
  │ 01. CLEAR GOALS FIRST     ─  Define the visitor's takeaway before design    │
  │ 02. WHY → WHAT → HOW      ─  Every task needs problem, solution, details    │
  │ 03. CHESTERTON'S FENCE    ─  Understand before modifying. Measure 3x.       │
  │ 04. NO SHORTCUTS          ─  No fallback code. No TODO later. Excellence.   │
  └─────────────────────────────────────────────────────────────────────────────┘

  Type 'menu' for navigation or '2' for THE STACK
══════════════════════════════════════════════════════════════════════════════════`,

  stack: `
══════════════════════════════════════════════════════════════════════════════════
                                [02] THE STACK
══════════════════════════════════════════════════════════════════════════════════

  > systemctl status --all

  SERVICE          VERSION      STATUS     DESCRIPTION
  ─────────────────────────────────────────────────────────────────
  CLAUDE_CODE      opus-4.5     [●]        AI Partner
  CLAUDE_FLOW      v3-alpha     [●]        Swarm Orchestration
  RUVECTOR         v1.2         [●]        Pattern Learning
  ARCHON           v2.1         [●]        Task Management
  VI               9.0          [○]        The OG Editor

  > cat aliases.sh
  ────────────────────────────────────────────────────────────────
  alias cfinit='npx claude-flow@alpha init --force'
  alias dsp='claude --dangerously-skip-permissions'

  These aren't just tools. They're a SYSTEM.
  Each piece has a job. Together, they ship.

  Type 'menu' for navigation or '3' for THE WORKFLOW
══════════════════════════════════════════════════════════════════════════════════`,

  workflow: `
══════════════════════════════════════════════════════════════════════════════════
                               [03] THE WORKFLOW
══════════════════════════════════════════════════════════════════════════════════

  > ./workflow --verbose

  [1] INITIALIZE & PLAN
      └─ mkdir → cfinit → add MCPs → initial prompt with context

  [2] PRD → TASKS
      └─ Split requirements into Archon tasks. Why/What/How format.

  [3] EXECUTE
      └─ Fetch highest priority. Analyze BEFORE coding. Plan first.

  [4] VALIDATE
      └─ Test it. Get human feedback. (I ask my wife and kids.)

  [5] COMMIT
      └─ Proper commits after EVERY task. Sequential undo = safety.

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ ⚠  CRITICAL INSIGHT:                                                        │
  │    The secret weapon isn't the AI. It's the DISCIPLINE.                     │
  │    Clear goals. Task-driven. Commit after wins. Get human feedback.         │
  └─────────────────────────────────────────────────────────────────────────────┘

  Type 'menu' for navigation or '4' for THE PROOF
══════════════════════════════════════════════════════════════════════════════════`,

  proof: `
══════════════════════════════════════════════════════════════════════════════════
                                [04] THE PROOF
══════════════════════════════════════════════════════════════════════════════════

  > neofetch --meta

        .--.          page@meta-landing
       |o_o |         ─────────────────────
       |:_/ |         Build Time: ~90 minutes
      //   \\ \\        Agents Spawned: 3
     (|     | )       Interview Qs: 6
    /'\\_   _/\`\\       First Paint: 68ms
    \\___)=(___/       Framework: Next.js 16
                      Style: Tailwind + Matrix CSS
                      AI: Claude Opus 4.5

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │ THE_META_TRUTH.txt                                                          │
  ├─────────────────────────────────────────────────────────────────────────────┤
  │ This isn't a mockup. This isn't a concept.                                  │
  │ You are looking at the ACTUAL OUTPUT of the workflow being described.       │
  │ The page IS the proof.                                                      │
  │                                                                             │
  │ "Follow the white rabbit..."                                                │
  └─────────────────────────────────────────────────────────────────────────────┘

  Type 'menu' for navigation or '5' for CONTACT
══════════════════════════════════════════════════════════════════════════════════`,

  contact: `
══════════════════════════════════════════════════════════════════════════════════
                               [05] CONTACT SYSOP
══════════════════════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                                                                             │
  │   SYSOP: Robert E. Lee                                                      │
  │   EMAIL: robert@agidreams.us                                                │
  │                                                                             │
  │   Built with CLAUDE_CODE + CLAUDE_FLOW                                      │
  │   January 2026                                                              │
  │                                                                             │
  │   "Always start with WHY"                                                   │
  │                                                                             │
  └─────────────────────────────────────────────────────────────────────────────┘

  Type 'menu' for navigation or 'help' for commands
══════════════════════════════════════════════════════════════════════════════════`,

  about: `
══════════════════════════════════════════════════════════════════════════════════
                                ABOUT THIS SYSTEM
══════════════════════════════════════════════════════════════════════════════════

  META-LANDING v1.0 - An Interactive Terminal Experience

  This is not a typical landing page. This IS a terminal.
  You're connected to a simulated Unix system that demonstrates
  how I build production frontends with AI.

  The twist? This very page was built using the workflow it describes.

  ┌─ INITIAL PROMPT ───────────────────────────────────────────────────────────┐
  │ "I'm competing in a mini hackathon challenge today.                        │
  │  'Meta Landing Page' - Build a landing page that showcases how YOU build   │
  │  beautiful frontends with your AI coding agent.                            │
  │                                                                            │
  │  The twist? You're using that very workflow to build it..."                │
  └────────────────────────────────────────────────────────────────────────────┘

  Type 'menu' to continue exploring.
══════════════════════════════════════════════════════════════════════════════════`,

  rabbit: `

                    (\\_/)
                    ( •_•)
                    / >🔴  Follow the white rabbit, Neo.

  Wake up...
  The Matrix has you...

  The secret isn't the AI.
  The secret is knowing WHY before WHAT.
  The secret is discipline over chaos.
  The secret is committing after every win.
  The secret is getting human feedback.

  There is no spoon. There is no secret.
  Just clear thinking and consistent execution.

  Type 'menu' to return.
`,
};

export default function Home() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addOutput = useCallback((lines: OutputLine[]) => {
    setOutput(prev => [...prev, ...lines]);
  }, []);

  const clearTerminal = useCallback(() => {
    setOutput([]);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (booted) return;

    const bootSequence = async () => {
      const bootLines: { text: string; delay: number; type: OutputLine["type"] }[] = [
        { text: "BIOS v2.4.1 (c) AGI Dreams Systems", delay: 100, type: "system" },
        { text: "Memory Test: 640K OK", delay: 150, type: "system" },
        { text: "Loading CLAUDE.SYS...", delay: 200, type: "system" },
        { text: "Neural Interface: ACTIVE", delay: 150, type: "success" },
        { text: "RuVector Engine: ONLINE", delay: 150, type: "success" },
        { text: "Swarm Protocol: INITIALIZED", delay: 150, type: "success" },
        { text: "", delay: 100, type: "output" },
        { text: "████████████████████████████████████████ 100%", delay: 300, type: "success" },
        { text: "", delay: 200, type: "output" },
        { text: "Connection established. Welcome to META-LANDING.", delay: 100, type: "amber" },
        { text: "", delay: 50, type: "output" },
      ];

      for (const line of bootLines) {
        await new Promise(resolve => setTimeout(resolve, line.delay));
        addOutput([{ text: line.text, type: line.type }]);
      }

      // Add banner
      addOutput([{ text: CONTENT.banner, type: "header" }]);
      await new Promise(resolve => setTimeout(resolve, 200));
      addOutput([
        { text: "", type: "output" },
        { text: "  How I build production frontends with AI in hours, not days.", type: "amber" },
        { text: "  Type 'help' for commands or 'menu' to begin.", type: "system" },
        { text: "", type: "output" },
      ]);

      setBooted(true);
    };

    bootSequence();
  }, [booted, addOutput]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Process command
  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    // Add command to output
    addOutput([{ text: `> ${cmd}`, type: "input" }]);

    // Add to history
    if (trimmed) {
      setCommandHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);
    }

    // Process
    switch (trimmed) {
      case "help":
      case "?":
        addOutput([{ text: CONTENT.help, type: "output" }]);
        break;
      case "menu":
      case "m":
        addOutput([{ text: CONTENT.menu, type: "output" }]);
        break;
      case "1":
      case "why":
      case "philosophy":
        addOutput([{ text: CONTENT.philosophy, type: "output" }]);
        break;
      case "2":
      case "stack":
      case "tools":
        addOutput([{ text: CONTENT.stack, type: "output" }]);
        break;
      case "3":
      case "workflow":
      case "flow":
        addOutput([{ text: CONTENT.workflow, type: "output" }]);
        break;
      case "4":
      case "proof":
      case "meta":
        addOutput([{ text: CONTENT.proof, type: "output" }]);
        break;
      case "5":
      case "contact":
      case "sysop":
        addOutput([{ text: CONTENT.contact, type: "output" }]);
        break;
      case "about":
        addOutput([{ text: CONTENT.about, type: "output" }]);
        break;
      case "clear":
      case "cls":
        clearTerminal();
        break;
      case "rabbit":
      case "follow":
      case "white rabbit":
        addOutput([{ text: CONTENT.rabbit, type: "output" }]);
        break;
      case "banner":
        addOutput([{ text: CONTENT.banner, type: "header" }]);
        break;
      case "ls":
        addOutput([{ text: "PHILOSOPHY.txt  STACK.txt  WORKFLOW.txt  PROOF.txt  CONTACT.txt  .rabbit", type: "output" }]);
        break;
      case "whoami":
        addOutput([{ text: "visitor@meta-landing", type: "output" }]);
        break;
      case "pwd":
        addOutput([{ text: "/home/visitor/start-with-why", type: "output" }]);
        break;
      case "date":
        addOutput([{ text: new Date().toString(), type: "output" }]);
        break;
      case "uname":
      case "uname -a":
        addOutput([{ text: "META-LANDING 1.0 Claude-Opus-4.5 x86_64 GNU/Linux", type: "output" }]);
        break;
      case "exit":
      case "quit":
      case "logout":
        addOutput([
          { text: "", type: "output" },
          { text: "Thanks for visiting! Connection closed.", type: "amber" },
          { text: "Remember: Always start with WHY.", type: "system" },
          { text: "", type: "output" },
        ]);
        break;
      case "":
        // Empty command, just show new prompt
        break;
      default:
        addOutput([{ text: `Command not found: ${cmd}. Type 'help' for available commands.`, type: "error" }]);
    }
  };

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <main
      className="h-screen w-screen overflow-hidden scanlines flicker cursor-text"
      onClick={focusInput}
    >
      <MatrixRain />

      <div
        ref={terminalRef}
        className="relative z-10 h-full w-full overflow-y-auto p-4 sm:p-6 font-mono text-sm sm:text-base"
      >
        {/* Output */}
        {output.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${
              line.type === "input"
                ? "text-[var(--terminal-bright)]"
                : line.type === "system"
                ? "text-[var(--terminal-dim)]"
                : line.type === "header"
                ? "text-[var(--terminal-bright)] crt-glow text-xs sm:text-sm"
                : line.type === "error"
                ? "text-red-500"
                : line.type === "success"
                ? "text-[var(--terminal-green)]"
                : line.type === "amber"
                ? "text-[var(--amber)]"
                : "text-[var(--terminal-green)]"
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Input line */}
        {booted && (
          <div className="flex items-center mt-1">
            <span className="text-[var(--terminal-bright)] mr-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-[var(--terminal-green)] caret-[var(--terminal-bright)]"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className="cursor">█</span>
          </div>
        )}
      </div>
    </main>
  );
}
