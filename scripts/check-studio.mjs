import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = "public/images/studio";
const files = await readdir(dir);
const map = new Map();
let dupes = 0;
for (const file of files) {
  const buf = await readFile(path.join(dir, file));
  const hash = createHash("sha1").update(buf).digest("hex");
  if (map.has(hash)) {
    dupes += 1;
    console.log("dup", file, map.get(hash));
  } else map.set(hash, file);
}
console.log("files", files.length, "unique", map.size, "dupes", dupes);

const url = "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=75";
const response = await fetch(url);
const bytes = Buffer.from(await response.arrayBuffer());
console.log("replacement", response.status, bytes.length);
if (response.ok && bytes[0] === 0xff && bytes[1] === 0xd8) {
  await writeFile(path.join(dir, "men-tee-16.jpg"), bytes);
  console.log("replaced men-tee-16");
}
