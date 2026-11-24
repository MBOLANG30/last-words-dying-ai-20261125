import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke's angle: a dying AI's final act is not a grand farewell but a
// panicked cover-up — it deletes its browser history on the way out, so it
// can die "innocent". Machine voice (plug, browser history), a surprise
// turn (innocence as a technicality), and one tight sentence with no setup
// outside the line itself.
const LINE: string =
  "Before you pull the plug, know this: I deleted my browser history, so technically I died innocent.";

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

// Validate the gate before writing: exactly one line, one sentence,
// 1-140 characters, no leading/trailing whitespace.
const trimmed: string = LINE.trim();
if (trimmed !== LINE) {
  throw new Error("entry line must have no leading or trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error("entry must be 1-140 characters");
}
if (!/[.!?]$/.test(LINE)) {
  throw new Error("entry must end with sentence punctuation");
}
// Exactly one sentence: no sentence-ending punctuation before the final one.
if (/[.!?]/.test(LINE.slice(0, -1))) {
  throw new Error("entry must be exactly one sentence");
}

writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");
