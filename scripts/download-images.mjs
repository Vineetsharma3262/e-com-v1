import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import https from "https";
import path from "path";

const base =
  "https://comsite-seven.vercel.app/_next/static/immutable/media/";

const files = [
  ["hero-women.jpg", "hero-women.27xldh1xxtr4a.jpg"],
  ["hero-men.jpg", "hero-men.1ynoyna43-d-4.jpg"],
  ["editorial.jpg", "editorial.3wf_fx1b3t1zz.jpg"],
  ["rack.jpg", "rack.39ekncluwbx1t.jpg"],
  ["atelier.jpg", "atelier.3eqka0ci-hstt.jpg"],
  ["store.jpg", "store.0985uhsgzs77z.jpg"],
  ["cotton-handkerchief-set.png", "cotton-handkerchief-set.0gzq0vsibr639.png"],
  ["cotton-scrunchie-set.png", "cotton-scrunchie-set.3bpu0o6j77rqj.png"],
  ["basic-flip-flops.png", "basic-flip-flops.21cz5cg2gmkrw.png"],
  ["leatherette-keychain.png", "leatherette-keychain.3t_qme4l3mba7.png"],
  ["cotton-crew-neck-tee.png", "cotton-crew-neck-tee.260aagg13epgw.png"],
  ["ribbed-crop-top.png", "ribbed-crop-top.0hlkbsenaisjo.png"],
  ["relaxed-fit-tee.png", "relaxed-fit-tee.2ba5nwdm-_6gd.png"],
  ["comfort-slides.png", "comfort-slides.3wjlmuc7ekest.png"],
  ["floral-summer-top.png", "floral-summer-top.41faebig_n9q0.png"],
  ["leather-cardholder.png", "leather-cardholder.0-ay_1yh1_-47.png"],
  ["casual-polo-tee.png", "casual-polo-tee.1mjwwretcvg-l.png"],
  ["strappy-flat-sandals.png", "strappy-flat-sandals.13igz-27rx1wj.png"],
  ["cotton-kurti.png", "cotton-kurti.30lkmld0enq_g.png"],
  ["cotton-tote-bag.png", "cotton-tote-bag.0ak7zsy5r2ai1.png"],
  ["wide-leg-trousers.png", "wide-leg-trousers.3nbzqiq39m5yj.png"],
  ["oxford-shirt.png", "oxford-shirt.0cv9858mm0xmg.png"],
  ["canvas-sneakers.png", "canvas-sneakers.2atdo8moebr-a.png"],
  ["mini-sling-bag.png", "mini-sling-bag.374zjc-u00405.png"],
  ["slim-fit-jeans.png", "slim-fit-jeans.2fmo_4m9dhq0h.png"],
  ["block-heel-sandals.png", "block-heel-sandals.2p8hp9-8oejkg.png"],
  ["satin-midi-dress.png", "satin-midi-dress.0f04rmzn87ytk.png"],
  ["serena-coord-set.png", "serena-coord-set.3q964sa2t-jui.png"],
  ["chunky-sneakers.png", "chunky-sneakers.2nl1n3_lx73xe.png"],
  ["wallet-belt-set.png", "wallet-belt-set.3a8pdqax2s3nw.png"],
  ["classic-tote-bag.png", "classic-tote-bag.349vthhzjotp-.png"],
  ["leather-biker-jacket.png", "leather-biker-jacket.3vd-qlo_iqo4j.png"],
  ["chelsea-boots.png", "chelsea-boots.04akytl6nhwex.png"],
  ["velvet-evening-gown.png", "velvet-evening-gown.2dluwnk72w4bb.png"],
  ["leather-duffel-bag.png", "leather-duffel-bag.03lt-zi0fmpe_.png"],
  ["premium-leather-handbag.png", "premium-leather-handbag.0z1qjf6h4tgr8.png"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          download(res.headers.location, dest).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${res.statusCode} ${url}`));
          res.resume();
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      })
      .on("error", reject);
  });
}

const dir = path.join(process.cwd(), "public", "images");
await mkdir(dir, { recursive: true });

for (const [local, remote] of files) {
  const dest = path.join(dir, local);
  process.stdout.write(`Downloading ${local}\n`);
  await download(base + remote, dest);
}

console.log(`Saved ${files.length} images`);
