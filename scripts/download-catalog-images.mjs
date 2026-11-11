import { createWriteStream } from "fs";
import { mkdir, stat } from "fs/promises";
import https from "https";
import path from "path";

const groups = {
  "men-tee": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=900",
  ],
  "men-shirt": [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=900",
  ],
  "men-suit2": [
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=900",
  ],
  "men-suit3": [
    "https://images.unsplash.com/photo-1507680434567-5739c80be1c2?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/5710082/pexels-photo-5710082.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=900&q=70",
  ],
  "women-tee": [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=900",
  ],
  "women-shirt": [
    "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1618932260643-eee4a2f2ceb6?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=70",
  ],
  "women-suit2": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=70",
  ],
  "women-suit3": [
    "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=900&q=70",
    "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=900",
    "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=900",
  ],
};

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 4) {
        res.resume();
        download(res.headers.location, dest, redirects + 1).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`${res.statusCode}`));
        return;
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
      file.on("error", reject);
    });
    req.setTimeout(20000, () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

const dir = path.join(process.cwd(), "public", "images", "catalog");
await mkdir(dir, { recursive: true });

const jobs = [];
for (const [group, urls] of Object.entries(groups)) {
  urls.forEach((url, index) => {
    jobs.push({ group, index, url, dest: path.join(dir, `${group}-${index}.jpg`) });
  });
}

let cursor = 0;
const failed = [];
async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    try {
      await download(job.url, job.dest);
      const info = await stat(job.dest);
      if (info.size < 8000) throw new Error("too small");
      process.stdout.write(`ok ${job.group}-${job.index}\n`);
    } catch (error) {
      failed.push(`${job.group}-${job.index} ${error.message}`);
      process.stdout.write(`fail ${job.group}-${job.index} ${error.message}\n`);
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
console.log(`done, failed ${failed.length}`);
if (failed.length) console.log(failed.join("\n"));
