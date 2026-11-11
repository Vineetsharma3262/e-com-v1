import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourcePath = process.argv[2];
const outDir = path.join(root, "public", "images", "studio");
const manifestPath = path.join(root, "lib", "unique-images.json");
const need = {
  "men-tee": 30,
  "men-shirt": 30,
  "men-suit2": 20,
  "men-suit3": 20,
  "women-tee": 30,
  "women-shirt": 30,
  "women-suit2": 20,
  "women-suit3": 20,
};

const raw = JSON.parse(await readFile(sourcePath, "utf8"));
const store = JSON.parse(raw.result.value).store;

async function download(id) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`;
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) return null;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 8_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  return bytes;
}

async function mapPool(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: 6 }, run));
  return results;
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const manifest = {};
for (const [group, count] of Object.entries(need)) {
  const ids = (store[group] || []).map((item) => item.id);
  const saved = [];
  const batchSize = 8;
  for (let start = 0; start < ids.length && saved.length < count; start += batchSize) {
    const slice = ids.slice(start, start + batchSize);
    const files = await mapPool(slice, (id) => download(id).catch(() => null));
    for (let i = 0; i < files.length && saved.length < count; i += 1) {
      if (!files[i]) continue;
      const name = `${group}-${String(saved.length + 1).padStart(2, "0")}.jpg`;
      await writeFile(path.join(outDir, name), files[i]);
      saved.push(`/images/studio/${name}`);
    }
  }
  manifest[group] = saved;
  console.log(group, saved.length, "/", count, "from", ids.length);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await rm(path.join(root, "public", "images", "unique"), { recursive: true, force: true });
console.log("done");
