import React, { useEffect, useRef, useState } from "react";
import {
  BIO_TEXT,
  SKILL_GROUPS,
  PROJECTS,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../data/content";

function CmdHelp() {
  const rows = [
    ["whoami", "Brief professional overview"],
    ["skills", "Technical capabilities"],
    ["projects", "List flagship projects"],
    ["contact", "Reach out & socials"],
    ["exif-tool", "Extract EXIF & image forensics metadata"],
    ["ping <host>", "Ping a host (simulated)"],
    ["trace <host>", "Trace route to a host (simulated)"],
    ["clear", "Clear terminal buffer"],
  ];
  return (
    <div>
      <div className="text-accent-cyan font-bold mb-1">AVAILABLE COMMANDS:</div>
      <div className="space-y-1 text-slate-300">
        {rows.map(([cmd, desc]) => (
          <div key={cmd}>
            <span className="text-white font-semibold">{cmd}</span> - {desc}
          </div>
        ))}
      </div>
    </div>
  );
}

function CmdWhoami() {
  return (
    <p className="text-slate-300">
      <span className="text-accent-cyan font-bold">Vishwas Sanyal</span> &mdash;{" "}
      {BIO_TEXT}
    </p>
  );
}

function CmdSkills() {
  return (
    <div className="text-slate-300 space-y-1">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label}>
          <span className="text-accent-cyan">
            {g.label.replace("// ", "").toUpperCase()}:
          </span>{" "}
          {g.items.join(", ")}
        </div>
      ))}
    </div>
  );
}

function CmdProjects() {
  return (
    <div className="space-y-2 text-slate-300">
      {PROJECTS.map((p) => (
        <div key={p.id}>
          &bull; <span className="text-white font-bold">{p.name}</span> (
          {p.stack.join(", ")}) &mdash; {p.summary}
          <div className="text-xs">
            Link:{" "}
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline break-all"
            >
              {p.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function CmdContact() {
  return (
    <div className="text-slate-300">
      <p>
        Email:{" "}
        <a
          href={`mailto:${EMAIL}`}
          className="text-accent-cyan hover:underline"
        >
          {EMAIL}
        </a>
      </p>
      <p>
        GitHub:{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-cyan hover:underline"
        >
          github.com/vishwas-sanyal
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-cyan hover:underline"
        >
          linkedin.com/in/vishwas-sanyal
        </a>
      </p>
    </div>
  );
}

function CmdPing({ args }) {
  const host = args[0];
  if (!host) {
    return (
      <span className="text-rose-400">
        usage: ping &lt;host&gt; &mdash; e.g. ping qdrant.local
      </span>
    );
  }
  const times = Array.from({ length: 4 }, () =>
    (12 + Math.random() * 30).toFixed(1)
  );
  return (
    <div className="text-slate-300 space-y-0.5">
      <div>PING {host} 56(84) bytes of data.</div>
      {times.map((t, i) => (
        <div key={i}>
          64 bytes from {host}: icmp_seq={i + 1} ttl=57 time={t} ms
        </div>
      ))}
      <div>--- {host} ping statistics ---</div>
      <div>4 packets transmitted, 4 received, 0% packet loss</div>
    </div>
  );
}

function CmdTrace({ args }) {
  const host = args[0];
  if (!host) {
    return (
      <span className="text-rose-400">
        usage: trace &lt;host&gt; &mdash; e.g. trace llama.lan
      </span>
    );
  }
  const hops = [
    { n: 1, name: "gateway.local", ip: "192.168.1.1" },
    { n: 2, name: "isp-core.net", ip: "10.64.0.1" },
    { n: 3, name: "cloudflare-edge", ip: "172.71.120.4" },
    { n: 4, name: host, ip: "target" },
  ];
  return (
    <div className="text-slate-300 space-y-0.5">
      <div>traceroute to {host}, 30 hops max, 60 byte packets</div>
      {hops.map((h) => (
        <div key={h.n}>
          {` ${h.n}  ${h.name} (${h.ip})  ${(0.8 + h.n * 6.5).toFixed(1)} ms`}
        </div>
      ))}
    </div>
  );
}

// Pure binary JPEG EXIF / TIFF header parser (never fails on bundler imports)
function parseJpegExifBinary(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) {
    return {};
  }

  let offset = 2;
  const length = view.byteLength;
  const exifData = {};

  const TAG_NAMES = {
    0x010f: "CameraMake",
    0x0110: "CameraModel",
    0x0112: "Orientation",
    0x011a: "XResolution",
    0x011b: "YResolution",
    0x0131: "Software",
    0x0132: "ModifyDate",
    0x013b: "Artist",
    0x8298: "Copyright",
    0x9003: "DateTimeOriginal",
    0x9004: "CreateDate",
    0x920a: "FocalLength",
    0xa002: "ExifImageWidth",
    0xa003: "ExifImageHeight",
    0xa434: "LensModel",
  };

  const readIFD = (tiffStart, dirStart, littleEndian) => {
    if (dirStart + 2 > length) return;
    const entries = view.getUint16(dirStart, littleEndian);
    for (let i = 0; i < entries; i++) {
      const entryOffset = dirStart + 2 + i * 12;
      if (entryOffset + 12 > length) break;
      const tag = view.getUint16(entryOffset, littleEndian);
      const type = view.getUint16(entryOffset + 2, littleEndian);
      const numValues = view.getUint32(entryOffset + 4, littleEndian);
      const valueOffset = entryOffset + 8;

      // ExifIFDPointer (0x8769) -> dive into sub-IFD
      if (tag === 0x8769) {
        const subIfdOffset = view.getUint32(valueOffset, littleEndian);
        readIFD(tiffStart, tiffStart + subIfdOffset, littleEndian);
        continue;
      }

      // GPSInfoIFDPointer (0x8825)
      if (tag === 0x8825) {
        exifData["GPSHeaderPresent"] = "Yes (Embedded GPS IFD)";
        continue;
      }

      const tagName = TAG_NAMES[tag];
      if (!tagName) continue;

      if (type === 2) {
        // ASCII string
        const strOffset =
          numValues > 4
            ? tiffStart + view.getUint32(valueOffset, littleEndian)
            : valueOffset;
        if (strOffset + numValues <= length) {
          let str = "";
          for (let c = 0; c < numValues - 1; c++) {
            const ch = view.getUint8(strOffset + c);
            if (ch === 0) break;
            str += String.fromCharCode(ch);
          }
          if (str.trim()) exifData[tagName] = str.trim();
        }
      } else if (type === 3) {
        // USHORT
        exifData[tagName] = view.getUint16(valueOffset, littleEndian);
      } else if (type === 4) {
        // ULONG
        exifData[tagName] = view.getUint32(valueOffset, littleEndian);
      } else if (type === 5) {
        // URATIONAL
        const ratOffset =
          tiffStart + view.getUint32(valueOffset, littleEndian);
        if (ratOffset + 8 <= length) {
          const num = view.getUint32(ratOffset, littleEndian);
          const den = view.getUint32(ratOffset + 4, littleEndian);
          if (den !== 0) exifData[tagName] = `${(num / den).toFixed(2)}`;
        }
      }
    }
  };

  while (offset + 4 < length) {
    if (view.getUint8(offset) !== 0xff) break;
    const marker = view.getUint8(offset + 1);
    if (marker === 0xda) break; // Start of scan
    const segLength = view.getUint16(offset + 2, false);

    // APP1 marker (0xFFE1) for EXIF
    if (marker === 0xe1 && offset + 10 < length) {
      const exifHeader = view.getUint32(offset + 4, false);
      if (exifHeader === 0x45786966) {
        const tiffStart = offset + 10;
        const endian = view.getUint16(tiffStart, false);
        const littleEndian = endian === 0x4949;
        const firstIFDOffset = view.getUint32(tiffStart + 4, littleEndian);
        readIFD(tiffStart, tiffStart + firstIFDOffset, littleEndian);
        break;
      }
    }
    offset += 2 + segLength;
  }

  return exifData;
}

function CmdExifTool() {
  const [meta, setMeta] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setLoading(true);
    setFileName(file.name);

    const basicInfo = {
      FileName: file.name,
      MIMEType: file.type || "application/octet-stream",
      FileSize: `${(file.size / 1024).toFixed(2)} KB (${file.size.toLocaleString()} bytes)`,
      LastModified: new Date(file.lastModified).toISOString(),
    };

    const reader = new FileReader();
    reader.onload = (ev) => {
      const buffer = ev.target.result;
      let exifTags = {};
      try {
        exifTags = parseJpegExifBinary(buffer);
      } catch (_) {
        exifTags = {};
      }

      // Also decode image dimensions via browser Image object
      const blobUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const mp = ((w * h) / 1000000).toFixed(2);
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const d = gcd(w, h) || 1;

        const combined = {
          ...basicInfo,
          Dimensions: `${w} x ${h} px`,
          Megapixels: `${mp} MP`,
          AspectRatio: `${w / d}:${h / d}`,
          ...exifTags,
        };
        if (Object.keys(exifTags).length === 0) {
          combined.EXIFNote =
            "Camera EXIF stripped or PNG/WebP container (showing file & pixel forensics)";
        }
        setMeta(combined);
        setLoading(false);
        URL.revokeObjectURL(blobUrl);
      };
      img.onerror = () => {
        setMeta({ ...basicInfo, ...exifTags });
        setLoading(false);
        URL.revokeObjectURL(blobUrl);
      };
      img.src = blobUrl;
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg bg-surface-raised hover:bg-slate-800 border border-surface-border text-accent-cyan font-mono text-xs transition-colors">
        Choose image...
        <input
          type="file"
          accept="image/*"
          data-testid="exif-file-input"
          onChange={onFile}
          className="hidden"
        />
      </label>
      <p className="text-slate-400 mt-1.5 text-xs">
        Upload any image (JPG, PNG, WebP) to extract binary EXIF headers &amp;
        pixel forensics.
      </p>
      {loading && (
        <div className="mt-2 text-accent-cyan text-xs">
          Scanning binary headers for {fileName}...
        </div>
      )}
      {meta && !loading && (
        <div className="mt-2.5 space-y-1 text-slate-300 text-xs bg-surface-base/70 p-3 rounded-xl border border-surface-border">
          <div className="text-accent-cyan font-bold mb-1">
            [FORENSICS &amp; EXIF REPORT] &mdash; {fileName}
          </div>
          {Object.entries(meta).map(([k, v]) => (
            <div key={k} className="flex flex-wrap gap-1.5">
              <span className="text-slate-400">{k}:</span>
              <span className="text-white font-semibold break-all">
                {String(v)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const COMMANDS = {
  help: CmdHelp,
  whoami: CmdWhoami,
  skills: CmdSkills,
  projects: CmdProjects,
  contact: CmdContact,
  "exif-tool": CmdExifTool,
  ping: CmdPing,
  trace: CmdTrace,
};

const QUICK = ["help", "whoami", "skills", "projects", "contact", "exif-tool"];

// Live Cloudflare Tunnel URL pointing to Termux llama-server (port 8080)
const NOBODY_API_URL = "https://warming-managing-africa-conversion.trycloudflare.com/v1/chat/completions";

// Personal data & portfolio prompt optimized for Qwen 2.5 0.5B Instruct
const NOBODY_SYSTEM_PROMPT = `Identity: Your name is "Nobody". You are an AI assistant created by Vishwas Sanyal.

[Server: You run 24/7 on Vishwas's old phone via Termux, llama.cpp, and Cloudflare Tunnels.]

Facts about Vishwas Sanyal:
- Role: Full-Stack & Backend Engineer (BCA graduate in India).
- Stack: JavaScript, Python, C/C++, React, Next.js, Node.js, Express, Linux, Docker, Qdrant, RAG.
- Contact: ${EMAIL} | GitHub: ${GITHUB_URL} | LinkedIn: ${LINKEDIN_URL}

Example:
User: Who is this?
Assistant: I am Nobody, an AI assistant running on an old phone.

User: Who is Vishwas Sanyal?
Assistant: Vishwas Sanyal is creater of me and a Full-Stack Engineer BCA graduate in India.

Rule: Answer in 1-2 short sentences.`;

const NOBODY_INTRO =
  "Hello there!!! I'm Nobody — Vishwas's self-hosted AI running live on phone via Termux & llama.cpp. Ask me about his projects, skills, developer stories, or how to hire him!";

export default function TerminalView({ mode = "shell", onModeChange }) {
  const [shellHistory, setShellHistory] = useState([]);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const screenRef = useRef(null);

  const isNobody = mode === "nobody";

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [shellHistory, chat, mode, busy]);

  // Seed the Nobody chat with the fixed intro prompt when entering the mode fresh.
  useEffect(() => {
    if (isNobody && chat.length === 0) {
      setChat([{ who: "nobody", text: NOBODY_INTRO }]);
    }
  }, [isNobody, chat.length]);

  const run = (raw) => {
    const clean = raw.trim();
    if (!clean) return;
    if (clean.toLowerCase() === "clear") {
      setShellHistory([]);
      setInput("");
      return;
    }
    const [cmd, ...args] = clean.split(/\s+/);
    const Exec = COMMANDS[cmd.toLowerCase()];
    const out = Exec ? (
      <Exec args={args} />
    ) : (
      <span className="text-rose-400">
        command not found: {cmd}. Type{" "}
        <span className="text-accent-cyan font-bold">'help'</span> for list of
        commands.
      </span>
    );
    setShellHistory((h) => [...h, { cmd: clean, out }]);
    setInput("");
  };

  // Connected live to Termux llama-server via Cloudflare Tunnel
  const sendMessageToNobody = async (userMessage, currentChat) => {
    try {
      const historyMessages = currentChat
        .filter((m) => m.text !== NOBODY_INTRO)
        .slice(-2)
        .map((m) => ({
          role: m.who === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const response = await fetch(NOBODY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: NOBODY_SYSTEM_PROMPT },
            ...historyMessages,
            { role: "user", content: userMessage },
          ],
          temperature: 0.1,
          top_p: 0.8,
	    repeat_penalty: 1.15,
          max_tokens: 100,
          cache_prompt: true,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return (
        data.choices?.[0]?.message?.content?.trim() ||
        "Packet received by server, but response payload was empty."
      );
    } catch (error) {
      console.error("Nobody AI Tunnel Error:", error);
      return "[OFFLINE] My Termux llama.cpp server is currently unreachable or the Cloudflare tunnel URL rotated. Switch to Shell Mode and type 'help' or 'projects'!";
    }
  };

  const sendChat = async () => {
    const msg = input.trim();
    if (!msg || busy) return;
    const updatedChat = [...chat, { who: "user", text: msg }];
    setChat(updatedChat);
    setInput("");
    setBusy(true);
    const reply = await sendMessageToNobody(msg, updatedChat);
    setChat((c) => [...c, { who: "nobody", text: reply }]);
    setBusy(false);
  };

  const modeBtn = (id, label, target, testid) => (
    <button
      key={id}
      data-testid={testid}
      onClick={() => onModeChange(target)}
      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors ${
        mode === target
          ? "bg-surface-raised border-accent-cyan/60 text-accent-cyan shadow-glow-cyan"
          : "bg-transparent border-surface-border text-slate-400 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section
      className="min-h-screen w-full p-4 sm:p-8 flex flex-col justify-center items-center"
      id="view-terminal"
    >
      <div className="w-full max-w-4xl lg:max-w-6xl bg-surface-card/95 border border-surface-border rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col h-[82vh]">
        {/* Window header */}
        <div className="px-5 py-3.5 bg-surface-base/90 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <div className="flex items-center gap-1.5">
            {modeBtn("shell", "Shell Mode", "shell", "mode-shell-btn")}
            {modeBtn("nobody", "Nobody AI Mode", "nobody", "mode-nobody-btn")}
          </div>
        </div>

        {/* Screen */}
        <div
          ref={screenRef}
          data-testid="terminal-screen"
          className="flex-1 p-5 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed"
        >
          {!isNobody && (
            <>
              <div className="text-slate-400 border-b border-surface-border/40 pb-3">
                <p className="text-accent-cyan font-semibold">
                  terminal/user$~ Welcome
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Interactive portfolio shell initialized. Type{" "}
                  <span className="text-accent-cyan font-bold">'help'</span> to
                  see available commands or click quick actions below.
                </p>
              </div>

              <div data-testid="terminal-history" className="space-y-3">
                {shellHistory.map((entry, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-surface-border pl-3 py-1"
                  >
                    <div className="text-slate-400 flex items-center gap-2">
                      <span className="text-accent-cyan font-bold">
                        terminal/user$~
                      </span>
                      <span>{entry.cmd}</span>
                    </div>
                    <div className="mt-1">{entry.out}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-accent-cyan font-bold select-none">
                  terminal/user$~
                </span>
                <input
                  data-testid="terminal-input"
                  id="terminal-input"
                  autoComplete="off"
                  autoFocus
                  spellCheck={false}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") run(input);
                  }}
                  placeholder="Type 'help', 'whoami', 'exif-tool'..."
                  className="flex-1 bg-transparent outline-none p-0 text-white font-mono text-xs sm:text-sm placeholder-slate-600"
                />
              </div>
            </>
          )}

          {isNobody && (
            <div data-testid="nobody-chat" className="space-y-3">
              {chat.map((m, i) => (
                <div
                  key={i}
                  className="border-l-2 border-surface-border pl-3 py-1"
                >
                  {m.who === "nobody" ? (
                    <p className="text-slate-300">
                      <span className="text-accent-cyan font-bold">
                        Nobody&gt;&gt;&gt;
                      </span>{" "}
                      {m.text}
                    </p>
                  ) : (
                    <p className="text-slate-300">
                      <span className="text-white font-bold">
                        User&gt;&gt;&gt;
                      </span>{" "}
                      {m.text}
                    </p>
                  )}
                </div>
              ))}

              {busy && (
                <div className="text-slate-400 flex items-center gap-2 pl-3">
                  <span className="text-accent-cyan font-bold">
                    Nobody&gt;&gt;&gt;
                  </span>
                  <span className="text-xs text-slate-500 animate-pulse">
                    querying Nobody’s server...
                  </span>
                  <span className="terminal-cursor"></span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <span className="text-white font-bold select-none">
                  User&gt;&gt;&gt;
                </span>
                <input
                  data-testid="nobody-input"
                  id="terminal-input"
                  autoComplete="off"
                  autoFocus
                  spellCheck={false}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChat();
                  }}
                  placeholder="Ask Nobody about Vishwas..."
                  className="flex-1 bg-transparent outline-none p-0 text-white font-mono text-xs sm:text-sm placeholder-slate-600"
                />
                {!busy && <span className="terminal-cursor"></span>}
              </div>
            </div>
          )}
        </div>

        {/* Quick shortcuts (shell mode only) */}
        {!isNobody && (
          <div className="p-3 bg-surface-base/80 border-t border-surface-border/70 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 mr-1 hidden sm:inline">
              Quick shortcuts:
            </span>
            {QUICK.map((q) => (
              <button
                key={q}
                data-testid={`terminal-quick-${q}`}
                onClick={() => run(q)}
                className="px-2.5 py-1 rounded-md bg-surface-raised hover:bg-slate-800 border border-surface-border text-[11px] font-mono text-slate-300"
              >
                {q}
              </button>
            ))}
            <button
              data-testid="terminal-quick-clear"
              onClick={() => run("clear")}
              className="px-2.5 py-1 rounded-md bg-surface-raised hover:bg-slate-800 border border-surface-border text-[11px] font-mono text-rose-400 ml-auto"
            >
              clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
