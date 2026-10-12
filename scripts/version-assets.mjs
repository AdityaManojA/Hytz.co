// Stamps styles.css / main.js links in every page with a hash of their contents (?v=xxxxxxxx),
// so browsers fetch fresh files right after a deploy. Runs automatically before `firebase deploy`.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const site = new URL("../hytz-v2/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const hash = createHash("sha1")
  .update(readFileSync(join(site, "main.js")))
  .update(readFileSync(join(site, "styles.css")))
  .digest("hex").slice(0, 8);

const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) pages.push(p);
  }
})(site);

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const out = html
    .replace(/(href="\/?styles\.css)(\?v=[0-9a-f]+)?"/g, `$1?v=${hash}"`)
    .replace(/(src="\/?main\.js)(\?v=[0-9a-f]+)?"/g, `$1?v=${hash}"`);
  if (out !== html) writeFileSync(page, out);
}
console.log(`assets versioned: v=${hash} (${pages.length} pages)`);
