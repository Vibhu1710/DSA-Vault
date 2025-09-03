<%*
// Templater script: Insert one Better-PDF yaml block per page
// - will list PDFs (prefers Assets/), prompt for from (mandatory), to (optional), scale (optional)
// - clamps `to` to actual PDF page count using pdf.js

// 1) collect PDFs (prefer Assets/)
const allPdfs = app.vault.getFiles().filter(f => f.extension === 'pdf');
const assetsPdfs = allPdfs.filter(f => f.path.toLowerCase().startsWith('assets/'));
const candidates = assetsPdfs.length ? assetsPdfs : allPdfs;

if (!candidates.length) {
  await tp.file.cursor_append("<!-- No PDF files found in vault (or in Assets/) -->\n");
  throw new Error("No PDF files found in vault");
}

// 2) ask user to pick a file
const chosenPath = await tp.system.suggester(
  candidates.map(f => f.path),
  candidates,
  false,
  "Select PDF file (path)"
);
// chosenPath is the TFile object (because we passed files as items)
const pdfFile = chosenPath;

// 3) prompts for from / to / scale
const fromInput = await tp.system.prompt("From page (number, mandatory)", "1", true);
if (!fromInput) throw new Error("Cancelled");
const from = parseInt(fromInput);
if (isNaN(from) || from < 1) throw new Error("Invalid 'from' page number");

const toInput = await tp.system.prompt("To page (number, optional - leave blank for single page)", "", false);
let to = toInput ? parseInt(toInput) : from;
if (toInput && (isNaN(to) || to < 1)) throw new Error("Invalid 'to' page number");

const scaleInput = await tp.system.prompt("Scale (optional, default 2.0)", "2.0", false);
const scale = scaleInput ? parseFloat(scaleInput) : 2.0;

// 4) read binary from vault and convert to Uint8Array
const bin = await app.vault.adapter.readBinary(pdfFile.path);
let uint8;
if (bin instanceof Uint8Array) uint8 = bin;
else if (bin && bin.buffer instanceof ArrayBuffer) uint8 = new Uint8Array(bin.buffer);
else uint8 = new Uint8Array(bin);

// 5) load pdf.js from CDN (if not loaded), set worker, and get page count
async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js';
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
  // worker file (cdn) — adjust version if you prefer another one
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js';
  return window.pdfjsLib;
}

const pdfjs = await loadPdfJs();
const loadingTask = pdfjs.getDocument({ data: uint8 });
const pdfDoc = await loadingTask.promise;
const numPages = pdfDoc.numPages;

// 6) clamp and validate
if (from > numPages) {
  await tp.file.cursor_append(`<!-- from page ${from} > document pages (${numPages}) — aborting -->\n`);
  throw new Error("From page out of range");
}
if (!to || to < from) to = from;
if (to > numPages) to = numPages;

// 7) generate one yaml block per page and insert at cursor
let out = "";
for (let p = from; p <= to; p++) {
  out += "```pdf\n";
  out += `url: [[${pdfFile.path}]]\n`;
  out += `page: ${p}\n`;
  out += `scale: ${scale}\n`;
  out += "```\n\n";
}

await tp.file.cursor_append(out);
%>

