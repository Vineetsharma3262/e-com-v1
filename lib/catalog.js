import uniqueImages from "./unique-images.json";

const delivery = [
  "Delivered in 3–6 business days across India",
  "Free shipping on orders over ₹299",
  "Easy returns and exchanges within 7 days of delivery",
  "Cash on delivery, or pay online at checkout",
];

const profiles = {
  "men-tee": {
    blurb: (name) =>
      `The ${name} is cut for an easy everyday fit in breathable cotton that holds its shape wash after wash. A plain tee with no print and no logo.`,
    details: [
      "Crew or relaxed neckline, true to size",
      "Breathable cotton jersey",
      "No branding printed on the garment",
      "Reinforced shoulder and hem stitching",
      'Model is 6\'0" and wears size M',
    ],
    care: ["Machine wash cold with similar colours", "Do not bleach", "Warm iron on the reverse", "Dry in shade"],
  },
  "men-shirt": {
    blurb: (name) =>
      `The ${name} is a clean button-down for the office and the weekend. A smooth collar, a straight hem and no visible branding.`,
    details: [
      "Button-down front with a structured collar",
      "Breathable cotton or linen-blend fabric",
      "Single chest pocket on selected styles",
      "No brand mark on the fabric",
      'Model is 6\'0" and wears size M',
    ],
    care: ["Machine wash cold", "Wash dark colours separately", "Warm iron", "Do not tumble dry"],
  },
  "men-suit2": {
    blurb: (name) =>
      `The ${name} is a two-piece suit: a tailored jacket and a matching trouser. Lined where it needs structure, and finished without any brand mark on the cloth.`,
    details: [
      "2 piece set: jacket and trouser",
      "Notch lapel, two-button jacket",
      "Matching flat-front trouser",
      "Partially lined for shape",
      "Chest sizes 38 to 46",
    ],
    care: ["Dry clean only", "Steam to refresh between wears", "Hang on a wide suit hanger", "Keep the jacket buttoned while hanging"],
  },
  "men-suit3": {
    blurb: (name) =>
      `The ${name} is a three-piece suit: jacket, waistcoat and trouser, cut as one set. Made for weddings, meetings and evenings, with no logo on the fabric.`,
    details: [
      "3 piece set: jacket, waistcoat and trouser",
      "Five-button waistcoat with an adjustable back",
      "Notch lapel jacket and matching trouser",
      "Lined jacket and waistcoat",
      "Chest sizes 38 to 46",
    ],
    care: ["Dry clean only", "Steam the jacket and waistcoat", "Store on a wide hanger in a garment bag", "Button the waistcoat while hanging"],
  },
  "women-tee": {
    blurb: (name) =>
      `The ${name} is a soft everyday tee with a flattering neckline and a clean finish. No print and no brand name on the fabric.`,
    details: [
      "Soft cotton jersey",
      "Everyday fit, true to size",
      "No branding printed on the garment",
      "Finished neckband and hem",
      'Model is 5\'7" and wears size S',
    ],
    care: ["Gentle machine wash cold", "Do not bleach", "Iron on low heat", "Dry in shade"],
  },
  "women-shirt": {
    blurb: (name) =>
      `The ${name} is an easy shirt you can tuck, knot or leave open over a tee. A clean collar and placket, with no logo on the cloth.`,
    details: [
      "Button-front shirt with a soft collar",
      "Lightweight cotton",
      "Straight hem you can wear tucked or out",
      "No brand mark on the fabric",
      'Model is 5\'7" and wears size S',
    ],
    care: ["Gentle machine wash cold", "Wash with similar colours", "Iron on medium heat", "Do not tumble dry"],
  },
  "women-suit2": {
    blurb: (name) =>
      `The ${name} is a matching two-piece set: a top and a bottom cut from the same cloth so the outfit already works together.`,
    details: [
      "2 piece set: top and bottom",
      "Matching fabric and finish",
      "Relaxed, flattering fit",
      "No branding on the garment",
      'Model is 5\'7" and wears size S',
    ],
    care: ["Dry clean, or gentle cold wash if the label allows", "Wash the set together", "Iron on low heat", "Hang both pieces to dry"],
  },
  "women-suit3": {
    blurb: (name) =>
      `The ${name} is a three-piece set: kurta, bottom and dupatta, finished as one outfit for festive days and evenings.`,
    details: [
      "3 piece set: kurta, bottom and dupatta",
      "Coordinated fabric across all three pieces",
      "Flattering straight or A-line kurta",
      "Dupatta with a finished edge",
      "No brand name printed on the cloth",
    ],
    care: ["Dry clean recommended", "Wash dark colours separately if hand washing", "Iron the dupatta on low heat", "Store folded with the set together"],
  },
};

const images = {
  "men-tee": [
    "/images/cotton-crew-neck-tee.png",
    "/images/relaxed-fit-tee.png",
    "/images/casual-polo-tee.png",
    "/images/catalog/men-tee-0.jpg",
    "/images/catalog/men-tee-5.jpg",
    "/images/catalog/men-shirt-7.jpg",
  ],
  "men-shirt": ["/images/oxford-shirt.png", "/images/catalog/men-shirt-6.jpg", "/images/catalog/men-suit2-5.jpg"],
  "men-suit2": [
    "/images/catalog/men-suit2-0.jpg",
    "/images/catalog/men-suit2-1.jpg",
    "/images/catalog/men-suit2-5.jpg",
    "/images/catalog/men-suit3-1.jpg",
  ],
  "men-suit3": ["/images/catalog/men-suit2-6.jpg", "/images/catalog/men-suit3-4.jpg", "/images/catalog/men-suit3-1.jpg"],
  "women-tee": ["/images/ribbed-crop-top.png", "/images/catalog/women-tee-2.jpg", "/images/floral-summer-top.png"],
  "women-shirt": [
    "/images/floral-summer-top.png",
    "/images/catalog/women-suit3-2.jpg",
    "/images/catalog/women-shirt-4.jpg",
    "/images/cotton-kurti.png",
  ],
  "women-suit2": ["/images/serena-coord-set.png", "/images/catalog/women-suit2-0.jpg", "/images/catalog/women-suit2-4.jpg"],
  "women-suit3": [
    "/images/cotton-kurti.png",
    "/images/satin-midi-dress.png",
    "/images/velvet-evening-gown.png",
    "/images/catalog/women-suit3-1.jpg",
  ],
};

const groups = [
  {
    id: "men-tee",
    category: "men",
    pieces: 0,
    count: 30,
    min: 200,
    max: 899,
    sizes: ["S", "M", "L", "XL"],
    adjectives: ["Classic", "Everyday", "Soft", "Airy", "Essential", "Weekend", "Urban", "Clean", "Daily", "Easy"],
    fabrics: ["Cotton", "Jersey", "Slub Cotton"],
    products: ["Crew Neck T-Shirt", "Relaxed Fit T-Shirt", "Pocket T-Shirt", "Henley T-Shirt", "V-Neck T-Shirt", "Heavyweight T-Shirt"],
  },
  {
    id: "men-shirt",
    category: "men",
    pieces: 0,
    count: 30,
    min: 699,
    max: 2499,
    sizes: ["S", "M", "L", "XL"],
    adjectives: ["Classic", "Sharp", "Everyday", "Crisp", "Travel", "Office", "Weekend", "Soft", "Tailored", "Light"],
    fabrics: ["Cotton", "Poplin", "Linen Blend"],
    products: ["Oxford Shirt", "Formal Shirt", "Spread Collar Shirt", "Mandarin Shirt", "Chambray Shirt", "Half-Sleeve Shirt"],
  },
  {
    id: "men-suit2",
    category: "men",
    pieces: 2,
    count: 20,
    min: 2499,
    max: 6999,
    sizes: ["38", "40", "42", "44", "46"],
    adjectives: ["Tailored", "Formal", "Classic", "Slim", "Modern", "Evening", "Office", "Sharp", "Ceremony", "Textured"],
    fabrics: ["Wool Blend", "Matte Weave", "Tropical Wool"],
    products: ["Two-Piece Suit", "Jacket and Trouser", "Notch Lapel Suit", "Single-Breasted Suit"],
  },
  {
    id: "men-suit3",
    category: "men",
    pieces: 3,
    count: 20,
    min: 4499,
    max: 9499,
    sizes: ["38", "40", "42", "44", "46"],
    adjectives: ["Formal", "Heritage", "Wedding", "Classic", "Evening", "Boardroom", "Ceremony", "Tailored", "Grand", "Modern"],
    fabrics: ["Wool Blend", "Textured Weave", "Worsted Wool"],
    products: ["Three-Piece Suit", "Jacket Waistcoat Trouser", "Peak Lapel Three-Piece", "Waistcoat Suit"],
  },
  {
    id: "women-tee",
    category: "women",
    pieces: 0,
    count: 30,
    min: 249,
    max: 999,
    sizes: ["XS", "S", "M", "L", "XL"],
    adjectives: ["Everyday", "Soft", "Classic", "Airy", "Essential", "Weekend", "Clean", "Daily", "Easy", "Relaxed"],
    fabrics: ["Cotton", "Jersey", "Ribbed Cotton"],
    products: ["Crew Neck T-Shirt", "Relaxed Fit T-Shirt", "Scoop Neck T-Shirt", "Boxy T-Shirt", "Fitted T-Shirt", "Longline T-Shirt"],
  },
  {
    id: "women-shirt",
    category: "women",
    pieces: 0,
    count: 30,
    min: 599,
    max: 2299,
    sizes: ["XS", "S", "M", "L", "XL"],
    adjectives: ["Classic", "Soft", "Everyday", "Crisp", "Light", "Office", "Weekend", "Easy", "Airy", "Clean"],
    fabrics: ["Cotton", "Poplin", "Linen Blend"],
    products: ["Button-Down Shirt", "Collar Shirt", "Camp Collar Shirt", "Relaxed Shirt", "Tucked Shirt", "Overshirt"],
  },
  {
    id: "women-suit2",
    category: "women",
    pieces: 2,
    count: 20,
    min: 1999,
    max: 6499,
    sizes: ["XS", "S", "M", "L", "XL"],
    adjectives: ["Tailored", "Classic", "Soft", "Evening", "Office", "Modern", "Relaxed", "Ceremony", "Sharp", "Everyday"],
    fabrics: ["Crepe", "Cotton Blend", "Matte Weave"],
    products: ["Two-Piece Set", "Blazer and Trouser", "Co-ord Set", "Jacket and Skirt"],
  },
  {
    id: "women-suit3",
    category: "women",
    pieces: 3,
    count: 20,
    min: 3499,
    max: 8999,
    sizes: ["XS", "S", "M", "L", "XL"],
    adjectives: ["Festive", "Classic", "Evening", "Ceremony", "Heritage", "Soft", "Grand", "Modern", "Occasion", "Elegant"],
    fabrics: ["Cotton", "Silk Blend", "Chanderi"],
    products: ["Three-Piece Set", "Kurta Bottom Dupatta", "Straight Kurta Set", "Anarkali Set"],
  },
];

function combo(index, adjectives, fabrics, productWords) {
  const adjective = adjectives[index % adjectives.length];
  const fabric = fabrics[index % fabrics.length];
  const product = productWords[index % productWords.length];
  return `${adjective} ${fabric} ${product}`;
}

function priceFor(min, max, index, count) {
  if (count <= 1) return min;
  const raw = min + ((max - min) * index) / (count - 1);
  const rounded = Math.round(raw / 50) * 50;
  return Math.min(max, Math.max(min, rounded));
}

export const products = groups.flatMap((group) => {
  const profile = profiles[group.id];
  const pool = images[group.id];
  return Array.from({ length: group.count }, (_, index) => {
    let price = priceFor(group.min, group.max, index, group.count);
    if (group.id === "men-tee" && index === 0) price = 200;
    if (group.id === "men-suit3" && index === group.count - 1) price = 9500;
    const name = combo(index, group.adjectives, group.fabrics, group.products);
    const slug = `${group.id}-${String(index + 1).padStart(2, "0")}`;
    const unique = uniqueImages[group.id] || [];
    const image = unique[index] || pool[index % pool.length];
    return {
      slug,
      name,
      price,
      category: group.category,
      pieces: group.pieces,
      sizes: group.sizes,
      kind: group.id,
      image,
      images: unique[index] ? [image] : [image, pool[(index + 1) % pool.length], pool[(index + 2) % pool.length]],
      description: profile.blurb(name),
      details: profile.details,
      care: profile.care,
      delivery,
    };
  });
});

export const collections = [
  {
    slug: "men",
    title: "Men's Clothing",
    blurb: "T-shirts, shirts, two-piece suits and three-piece suits",
    image: "/images/catalog/men-suit2-1.jpg",
  },
  {
    slug: "women",
    title: "Women's Clothing",
    blurb: "T-shirts, shirts, two-piece sets and three-piece sets",
    image: "/images/serena-coord-set.png",
  },
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug) {
  if (slug === "all") {
    return {
      slug: "all",
      title: "All products",
      blurb: "Men's and women's t-shirts, shirts and suits",
      image: "/images/hero-women.jpg",
    };
  }
  return collections.find((collection) => collection.slug === slug);
}

export function productsIn(slug) {
  if (slug === "all") return products;
  return products.filter((product) => product.category === slug);
}

export function collectionStats(slug) {
  const list = productsIn(slug);
  const from = list.reduce((min, product) => Math.min(min, product.price), Infinity);
  return { count: list.length, from: Number.isFinite(from) ? from : 0 };
}

export function relatedProducts(product, limit = 4) {
  const others = products.filter((item) => item.category === product.category && item.slug !== product.slug);
  const sameKind = others.filter((item) => item.kind === product.kind);
  const rest = others.filter((item) => item.kind !== product.kind);
  return [...sameKind, ...rest].slice(0, limit);
}

export function sortProducts(list, sort) {
  const next = list.slice();
  if (sort === "low") next.sort((a, b) => a.price - b.price);
  if (sort === "high") next.sort((a, b) => b.price - a.price);
  return next;
}

export const spotlight = getProduct("men-suit3-20");

export const faqs = [
  {
    q: "Do you ship across India?",
    a: "Yes, we ship to every serviceable pin code in India. Orders usually arrive within 3–6 business days, and shipping is free on orders over ₹299.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "Unworn items with tags intact can be returned or exchanged within 7 days of delivery.",
  },
  {
    q: "How do I find my size?",
    a: "Each product lists its available sizes. Tops use standard Indian sizing (XS–XL). Suits are listed by chest size, from 38 to 46. Between sizes? Choose the larger one.",
  },
  {
    q: "Is cash on delivery available?",
    a: "Yes. At checkout you can choose cash on delivery or pay online. Online payment on this site is a demo checkout until the payment gateway is connected.",
  },
  {
    q: "What is included in a two-piece and a three-piece?",
    a: "A men's two-piece suit is a jacket and trouser. A three-piece adds a waistcoat. Women's two-piece sets are a top and bottom. Women's three-piece sets are a kurta, bottom and dupatta.",
  },
  {
    q: "Can I save more than one address?",
    a: "Yes. Add and edit addresses from your profile. The default address is selected when you place an order, and you can switch it at checkout.",
  },
];

export const faqsHi = [
  {
    q: "क्या आप पूरे भारत में शिप करते हैं?",
    a: "हाँ, हम भारत के हर सर्विसेबल पिन कोड पर भेजते हैं। ऑर्डर आमतौर पर 3–6 कार्यदिवसों में पहुँचते हैं, और ₹299 से ऊपर शिपिंग मुफ्त है।",
  },
  {
    q: "रिटर्न और एक्सचेंज की नीति क्या है?",
    a: "बिना पहने हुए सामान, टैग के साथ, डिलीवरी के 7 दिनों के अंदर रिटर्न या एक्सचेंज किया जा सकता है।",
  },
  {
    q: "मैं अपना साइज़ कैसे चुनूँ?",
    a: "हर प्रोडक्ट पर उपलब्ध साइज़ लिखे हैं। टॉप में XS से XL तक स्टैंडर्ड साइज़ है। सूट चेस्ट साइज़ 38 से 46 में हैं। दो साइज़ के बीच हों तो बड़ा साइज़ लें।",
  },
  {
    q: "क्या कैश ऑन डिलीवरी उपलब्ध है?",
    a: "हाँ। चेकआउट पर कैश ऑन डिलीवरी या ऑनलाइन पेमेंट चुन सकते हैं। ऑनलाइन पेमेंट अभी डेमो चेकआउट है, जब तक पेमेंट गेटवे जुड़ नहीं जाता।",
  },
  {
    q: "टू-पीस और थ्री-पीस में क्या मिलता है?",
    a: "पुरुषों के टू-पीस सूट में जैकेट और ट्राउज़र होते हैं। थ्री-पीस में वेस्टकोट भी जुड़ता है। महिलाओं के टू-पीस में टॉप और बॉटम, और थ्री-पीस में कुर्ता, बॉटम और दुपट्टा होता है।",
  },
  {
    q: "क्या मैं एक से ज़्यादा पता सेव कर सकता हूँ?",
    a: "हाँ। प्रोफाइल से पता जोड़ें या बदलें। डिफ़ॉल्ट पता ऑर्डर करते समय चुना हुआ दिखता है, और चेकआउट पर उसे बदल भी सकते हैं।",
  },
];
