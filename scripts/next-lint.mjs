#!/usr/bin/env node
import { spawn } from "child_process";

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("No file paths provided.");
  process.exit(1);
}

const fileArgs = files.flatMap((file) => ["--file", file]);

const args = ["--no", "--", "next", "lint", ...fileArgs];

console.log(`Running \`npx ${args.join(" ")}\``);

const child = spawn("npx", args, { stdio: "inherit" });

child.on("close", (code) => {
  process.exit(code);
});
