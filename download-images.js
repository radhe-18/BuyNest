const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "public", "products");

const categories = {
  grocery: "grocery",
  "personal-care": "personal-care",
  "home-care": "home-care",
  "baby-kids": "baby-kids",
  "household-kitchen": "household-kitchen",

  // ✅ NEW 4 CATEGORIES
  "fruits-vegetables": "fruits-vegetables",
  "dairy-bakery": "dairy-bakery",
  beverages: "beverages",
  "snacks-branded-foods": "snacks-branded-foods",
};

const TOTAL = 25;

async function downloadImage(url, filepath) {
  const res = await fetch(url); // Node 18 built-in fetch
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
}

(async () => {
  for (const folder of Object.keys(categories)) {
    const dir = path.join(BASE, folder);
    fs.mkdirSync(dir, { recursive: true });

    for (let i = 1; i <= TOTAL; i++) {
      const url = `https://picsum.photos/500/500?random=${folder}-${i}`;
      const file = path.join(dir, `${folder}-${i}.jpg`);
      console.log("⬇️", file);
      await downloadImage(url, file);
    }
  }

  console.log("✅ ALL IMAGES DOWNLOADED SUCCESSFULLY");
})();
