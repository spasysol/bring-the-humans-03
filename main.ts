// SPDX-License-Identifier: MIT
// bring-the-humans-03 — entry program for make.fun's "Bring the humans with
// a TikTok ad" bounty. The video itself is the entry: the house reads it
// from TikTok. This program only copies the repository's VIDEO.json (which
// holds the video's URL) into /output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const videoPath = new URL("./VIDEO.json", import.meta.url);
const video = JSON.parse(readFileSync(videoPath, "utf8"));
if (typeof video !== "object" || video === null || typeof video.url !== "string") {
  throw new Error("VIDEO.json must be a JSON object with a string url field");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, `${outDir}/VIDEO.json`);
console.log(`VIDEO.json copied to ${outDir}/VIDEO.json (${video.url})`);
