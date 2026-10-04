// next export writes one tags/[tag].html for the dynamic route; a static host
// has no rewrite for it, so give every linked tag its own copy of that page.
// The router reads the tag from the URL on the client.
import { copyFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const out = 'out';
const pages = [out, join(out, 'posts')].flatMap((dir) =>
  readdirSync(dir).filter((f) => f.endsWith('.html')).map((f) => join(dir, f)),
);

const tags = new Set(
  pages.flatMap((page) =>
    [...readFileSync(page, 'utf8').matchAll(/href="\/tags\/([^"/]+)"/g)].map((m) => m[1]),
  ),
);

for (const tag of tags) {
  copyFileSync(join(out, 'tags', '[tag].html'), join(out, 'tags', `${tag}.html`));
}
console.log(`export-tags: ${tags.size} tag pages`);
