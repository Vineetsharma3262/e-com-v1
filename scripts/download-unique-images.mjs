import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "images", "unique");
const manifestPath = path.join(root, "lib", "unique-images.json");
const UA = "HaatCatalog/1.0 (clothing catalog; local demo store)";

const groups = [
  {
    id: "men-tee",
    count: 30,
    categories: [
      "Category:Men_wearing_T-shirts",
      "Category:Men_wearing_white_T-shirts",
      "Category:Men_wearing_black_T-shirts",
      "Category:Men_wearing_polo_shirts",
    ],
  },
  {
    id: "men-shirt",
    count: 30,
    categories: [
      "Category:Men_wearing_button-down_shirts",
      "Category:Men_wearing_dress_shirts",
      "Category:Men_wearing_white_shirts",
      "Category:Men_wearing_shirts",
    ],
  },
  {
    id: "men-suit2",
    count: 20,
    categories: ["Category:Men_wearing_suits", "Category:Men_wearing_neckties", "Category:Men_wearing_blazers"],
  },
  {
    id: "men-suit3",
    count: 20,
    categories: [
      "Category:Men_wearing_waistcoats",
      "Category:Men_wearing_three-piece_suits",
      "Category:Three-piece_suits",
      "Category:Men_wearing_suits",
    ],
  },
  {
    id: "women-tee",
    count: 30,
    categories: [
      "Category:Women_wearing_T-shirts",
      "Category:Women_wearing_white_T-shirts",
      "Category:Women_wearing_black_T-shirts",
      "Category:Women_wearing_polo_shirts",
    ],
  },
  {
    id: "women-shirt",
    count: 30,
    categories: [
      "Category:Women_wearing_blouses",
      "Category:Women_wearing_button-down_shirts",
      "Category:Women_wearing_shirts",
      "Category:Women_wearing_white_shirts",
    ],
  },
  {
    id: "women-suit2",
    count: 20,
    categories: [
      "Category:Women_wearing_pantsuits",
      "Category:Women_wearing_suits",
      "Category:Women_wearing_blazers",
    ],
  },
  {
    id: "women-suit3",
    count: 20,
    categories: [
      "Category:Women_wearing_shalwar_kameez",
      "Category:Women_wearing_salwar_kameez",
      "Category:Salwar_kameez",
      "Category:Women_wearing_kurtas",
      "Category:Women_wearing_dupattas",
    ],
  },
];

const banned =
  /logo|icon|flag|map|diagram|\.svg|poster|banner|adidas|nike|puma|gucci|chanel|prada|\bzara\b|levis|levi'|supreme|jersey|football|soccer|basketball|baseball|olymp|cricket|hockey|rugby|uniform|military|police|costume|cosplay|cartoon|drawing|illustration|painting|stamp|coin|emblem|screenshot|meme|comic|anime|manga|disney|marvel|pokemon|concert|tour shirt|\(page \d+\)|pdf/i;

const seen = new Set();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wiki(params) {
  const query = new URLSearchParams({ format: "json", ...params });
  const url = `https://commons.wikimedia.org/w/api.php?${query}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    const text = await response.text();
    if (response.status === 429 || /too many requests/i.test(text)) {
      await sleep(4000 * (attempt + 1));
      continue;
    }
    if (!response.ok) throw new Error(`${response.status} ${text.slice(0, 120)}`);
    return JSON.parse(text);
  }
  throw new Error("Wikimedia rate limit");
}

async function collect(category, limit) {
  const found = [];
  let cont = null;
  for (let page = 0; page < 6 && found.length < limit; page++) {
    const params = {
      action: "query",
      generator: "categorymembers",
      gcmtitle: category,
      gcmtype: "file",
      gcmlimit: "50",
      prop: "imageinfo",
      iiprop: "url|mime|size",
      iiurlwidth: "900",
    };
    if (cont?.continue) params.continue = cont.continue;
    if (cont?.gcmcontinue) params.gcmcontinue = cont.gcmcontinue;
    const data = await wiki(params);
    const pages = Object.values(data.query?.pages || {});
    for (const item of pages) {
      const info = item.imageinfo?.[0];
      if (!info?.thumburl) continue;
      const title = item.title || "";
      if (banned.test(title)) continue;
      if (seen.has(title)) continue;
      const mime = info.mime || "";
      if (!/jpeg|png|webp/.test(mime)) continue;
      const width = info.thumbwidth || info.width || 0;
      const height = info.thumbheight || info.height || 0;
      if (width < 360 || height < 360) continue;
      if (width > height * 1.7) continue;
      found.push({ title, url: info.thumburl, portrait: height / Math.max(width, 1) });
    }
    cont = data.continue;
    if (!cont) break;
    await sleep(350);
  }
  found.sort((a, b) => b.portrait - a.portrait);
  return found;
}

async function download(url) {
  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) return null;
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 12_000 || bytes.length > 4_000_000) return null;
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
  const isWebp = bytes.slice(0, 4).toString() === "RIFF";
  if (!isJpeg && !isPng && !isWebp) return null;
  const ext = isPng ? "png" : isWebp ? "webp" : "jpg";
  return { bytes, ext };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const manifest = {};
  for (const group of groups) {
    const saved = [];
    for (const category of group.categories) {
      if (saved.length >= group.count) break;
      let candidates = [];
      try {
        candidates = await collect(category, group.count * 3);
      } catch (error) {
        console.log("skip", category, error.message);
        continue;
      }
      console.log(group.id, category, "candidates", candidates.length);
      for (const candidate of candidates) {
        if (saved.length >= group.count) break;
        seen.add(candidate.title);
        try {
          const file = await download(candidate.url);
          if (!file) continue;
          const name = `${group.id}-${String(saved.length + 1).padStart(2, "0")}.${file.ext}`;
          await writeFile(path.join(outDir, name), file.bytes);
          saved.push(`/images/unique/${name}`);
        } catch (error) {
          console.log("fail", candidate.title, error.message);
        }
      }
      await sleep(400);
    }
    manifest[group.id] = saved;
    console.log("saved", group.id, saved.length, "/", group.count);
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  const total = Object.values(manifest).reduce((sum, list) => sum + list.length, 0);
  console.log("total", total);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
