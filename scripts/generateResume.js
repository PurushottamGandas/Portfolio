import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resume } from "./resumeContent.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");
const docxPath = resolve(publicDir, "resume.docx");
const pdfPath = resolve(publicDir, "resume.pdf");

mkdirSync(publicDir, { recursive: true });

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapePdf(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function zipStore(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const name = Buffer.from(file.name);
    const content = Buffer.from(file.content);
    const crc = crc32(content);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(content.length, 18);
    localHeader.writeUInt32LE(content.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, name, content);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(content.length, 20);
    centralHeader.writeUInt32LE(content.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);

    offset += localHeader.length + name.length + content.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDirectory, end]);
}

function paragraph(text, style = "") {
  return `<w:p>${style}<w:r><w:t>${escapeXml(text)}</w:t></w:r></w:p>`;
}

function heading(text) {
  return paragraph(text, '<w:pPr><w:pStyle w:val="Heading1"/></w:pPr>');
}

function bullet(text) {
  return `<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:ind w:left="360"/></w:pPr><w:r><w:t>• ${escapeXml(text)}</w:t></w:r></w:p>`;
}

function createDocx() {
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraph(resume.name, '<w:pPr><w:pStyle w:val="Title"/></w:pPr>')}
    ${paragraph(resume.title)}
    ${paragraph(`${resume.location} | ${resume.email}`)}
    ${paragraph(`${resume.github} | ${resume.linkedin}`)}
    ${heading("Summary")}
    ${paragraph(resume.summary)}
    ${heading("Experience")}
    ${resume.experience.map((item) => `${paragraph(`${item.role} - ${item.company}`, '<w:pPr><w:pStyle w:val="Heading2"/></w:pPr>')}${paragraph(item.location)}${paragraph(item.details)}`).join("")}
    ${heading("Education")}
    ${resume.education.map(bullet).join("")}
    ${heading("Skills")}
    ${resume.skills.map(bullet).join("")}
    ${heading("Languages")}
    ${resume.languages.map(bullet).join("")}
    ${heading("Featured Projects")}
    ${resume.projects.map((project) => `${paragraph(project.name, '<w:pPr><w:pStyle w:val="Heading2"/></w:pPr>')}${paragraph(project.details)}`).join("")}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/></w:sectPr>
  </w:body>
</w:document>`;

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:rPr><w:b/><w:sz w:val="26"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="Heading 2"/><w:rPr><w:b/><w:sz w:val="22"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/></w:style>
</w:styles>`;

  const files = [
    {
      name: "[Content_Types].xml",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`,
    },
    {
      name: "_rels/.rels",
      content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    },
    { name: "word/document.xml", content: documentXml },
    { name: "word/styles.xml", content: stylesXml },
  ];

  writeFileSync(docxPath, zipStore(files));
}

function wrapText(text, max = 88) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function createFallbackPdf() {
  const lines = [
    resume.name,
    resume.title,
    resume.email,
    resume.location,
    resume.github,
    resume.linkedin,
    "",
    "Summary",
    ...wrapText(resume.summary),
    "",
    "Experience",
    ...resume.experience.flatMap((item) => [
      `${item.role} - ${item.company}`,
      item.location,
      ...wrapText(item.details),
    ]),
    "",
    "Education",
    ...resume.education.flatMap((item) => wrapText(`- ${item}`)),
    "",
    "Skills",
    ...resume.skills.flatMap((skill) => wrapText(`- ${skill}`)),
    "",
    "Languages",
    ...resume.languages.flatMap((language) => wrapText(`- ${language}`)),
    "",
    "Featured Projects",
    ...resume.projects.flatMap((project) => [project.name, ...wrapText(project.details)]),
  ];

  let y = 760;
  const body = lines
    .map((line, index) => {
      const size = index === 0 ? 20 : line === "Summary" || line === "Skills" || line === "Featured Projects" ? 14 : 10;
      const font = index === 0 || size === 14 ? "/F1" : "/F2";
      const escaped = escapePdf(line);
      const command = `BT ${font} ${size} Tf 54 ${y} Td (${escaped}) Tj ET`;
      y -= line ? 17 : 12;
      return command;
    })
    .join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `6 0 obj\n<< /Length ${Buffer.byteLength(body)} >>\nstream\n${body}\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += object;
  }

  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  writeFileSync(pdfPath, pdf);
}

function findOfficeConverter() {
  for (const command of ["soffice", "libreoffice"]) {
    try {
      execFileSync("which", [command], { stdio: "ignore" });
      return command;
    } catch {
      // Try the next converter name.
    }
  }

  return null;
}

function convertDocxToPdf() {
  const converter = findOfficeConverter();

  if (!converter) {
    createFallbackPdf();
    console.log("Generated public/resume.docx and public/resume.pdf with built-in fallback PDF generator.");
    return;
  }

  const tempPdf = resolve(publicDir, "resume.pdf");
  if (existsSync(tempPdf)) {
    rmSync(tempPdf);
  }

  execFileSync(converter, ["--headless", "--convert-to", "pdf", "--outdir", publicDir, docxPath], {
    stdio: "inherit",
  });

  if (!existsSync(pdfPath)) {
    createFallbackPdf();
  }

  console.log("Generated public/resume.docx and converted it to public/resume.pdf.");
}

createDocx();
convertDocxToPdf();

if (!existsSync(docxPath) || !existsSync(pdfPath)) {
  throw new Error("Resume generation failed.");
}
