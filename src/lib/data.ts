import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export const BRAND = "Youngenz";
export const TAGLINE = "Same look. Smaller price. Creators earn.";

export const CATEGORIES = [
  "Streetwear", "Ethnic", "Casual", "Party", "Kurta",
  "T-shirts", "Shirts", "Jeans", "Sneakers", "Co-ords",
] as const;
export type Category = (typeof CATEGORIES)[number];
export type Gender = "Men" | "Women" | "Unisex";

export type Product = {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  image: string;
  prices: { amazon: number; flipkart: number; local: number };
  rating: number;
  colors: string[];
  fabric: string;
  sizes: string[];
  studentDeal: boolean;
  shopId: string;
  verified: false; // no product here has verified live pricing
};

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = ["Black", "White", "Purple", "Blue", "Beige", "Green", "Pink", "Grey"];
export const FABRICS = ["Cotton", "Linen", "Denim", "Rayon", "Polyester", "Silk blend", "Fleece", "Mesh"];

const IMG: Record<Category, string[]> = {
  Streetwear: [p1, p3], Ethnic: [p2], Casual: [p7, p3], Party: [p4], Kurta: [p2],
  "T-shirts": [p5], Shirts: [p6], Jeans: [p7], Sneakers: [p8], "Co-ords": [p4],
};

// name stem, price band [min, max], fabric options
const SPEC: Record<Category, { names: string[]; band: [number, number]; fabrics: string[] }> = {
  Streetwear: { names: ["Oversized Hoodie", "Baggy Cargo Pants", "Graphic Drop-Shoulder Tee", "Varsity Jacket", "Parachute Pants", "Zip-up Hoodie", "Boxy Sweatshirt", "Utility Vest", "Track Jacket", "Wide-leg Joggers", "Puffer Gilet", "Bandana Print Shirt"], band: [699, 2499], fabrics: ["Fleece", "Cotton", "Polyester"] },
  Ethnic: { names: ["Chikankari Kurta Set", "Anarkali Suit", "Nehru Jacket", "Printed Lehenga Skirt", "Bandhgala Kurta", "Palazzo Kurta Set", "Embroidered Dupatta Set", "Silk Blend Saree", "Pathani Suit", "Sharara Set", "Short Kurti", "Dhoti Pant Set"], band: [799, 2999], fabrics: ["Cotton", "Rayon", "Silk blend"] },
  Casual: { names: ["Everyday Chinos", "Relaxed Polo", "Basic Crew Sweatshirt", "Linen Shorts", "Henley Tee", "Denim Overshirt", "Ribbed Tank", "Straight Fit Trousers", "Knit Cardigan", "Lounge Joggers", "Striped Rugby Tee", "Canvas Jacket"], band: [449, 1799], fabrics: ["Cotton", "Linen", "Denim"] },
  Party: { names: ["Satin Slip Dress", "Sequin Crop Top", "Velvet Blazer", "Wrap Midi Dress", "Cuban Collar Shirt", "Bodycon Dress", "Metallic Co-ord", "Pleated Mini Skirt", "Silk Shirt", "Corset Top", "Flared Jumpsuit", "Tuxedo Trousers"], band: [899, 2999], fabrics: ["Polyester", "Silk blend", "Rayon"] },
  Kurta: { names: ["White Chikankari Kurta", "Cotton Straight Kurta", "Printed A-line Kurta", "Mandarin Collar Kurta", "Short Cotton Kurta", "Block Print Kurta", "Linen Kurta", "Pastel Festive Kurta", "Embroidered Yoke Kurta", "Pintuck Kurta", "Indigo Kurta", "Lucknowi Kurta"], band: [399, 1499], fabrics: ["Cotton", "Linen", "Rayon"] },
  "T-shirts": { names: ["Oversized Graphic Tee", "Plain Crew Tee", "Pocket Tee", "Acid Wash Tee", "Baby Tee", "Ringer Tee", "Long Sleeve Tee", "Typography Tee", "Anime Print Tee", "Striped Tee", "Polo Tee", "Muscle Fit Tee"], band: [249, 999], fabrics: ["Cotton", "Polyester"] },
  Shirts: { names: ["Linen Button-up Shirt", "Oxford Shirt", "Check Flannel Shirt", "Cuban Collar Shirt", "Denim Shirt", "Corduroy Shirt", "Printed Resort Shirt", "Mandarin Collar Shirt", "Oversized Striped Shirt", "White Formal Shirt", "Satin Shirt", "Half Sleeve Casual Shirt"], band: [399, 1599], fabrics: ["Linen", "Cotton", "Denim"] },
  Jeans: { names: ["Baggy Blue Jeans", "Straight Fit Jeans", "Wide-leg Jeans", "Mom Fit Jeans", "Slim Fit Black Jeans", "Bootcut Jeans", "Ripped Knee Jeans", "Carpenter Jeans", "High-rise Jeans", "Light Wash Jeans", "Cargo Jeans", "Flared Jeans"], band: [599, 2199], fabrics: ["Denim"] },
  Sneakers: { names: ["Chunky White Sneakers", "Low-top Canvas Sneakers", "Retro Runners", "High-top Sneakers", "Slip-on Sneakers", "Court Sneakers", "Platform Sneakers", "Knit Running Shoes", "Skate Shoes", "Pastel Dad Shoes", "Leather Look Sneakers", "Mesh Trainers"], band: [699, 2999], fabrics: ["Mesh", "Polyester"] },
  "Co-ords": { names: ["Lilac Wrap Co-ord", "Linen Shirt & Shorts Set", "Knit Co-ord Set", "Printed Resort Set", "Satin Co-ord", "Tracksuit Set", "Crop Top & Skirt Set", "Kurta Co-ord", "Denim Co-ord", "Waffle Knit Set", "Blazer & Trouser Set", "Floral Co-ord"], band: [799, 2799], fabrics: ["Linen", "Cotton", "Rayon"] },
};

const GENDERS: Gender[] = ["Men", "Women", "Unisex"];

function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const round9 = (n: number) => Math.max(199, Math.round(n / 50) * 50 - 1);

// SAMPLE DATA — prices are illustrative, not live listings.
export const PRODUCTS: Product[] = CATEGORIES.flatMap((cat, ci) => {
  const s = SPEC[cat];
  return s.names.map((name, i) => {
    const k = ci * 100 + i;
    const [lo, hi] = s.band;
    const base = lo + (hi - lo) * seeded(k);
    const local = round9(base * (0.82 + 0.12 * seeded(k + 1)));
    const amazon = round9(base * (0.95 + 0.15 * seeded(k + 2)));
    const flipkart = round9(base * (0.92 + 0.15 * seeded(k + 3)));
    const imgs = IMG[cat];
    return {
      id: `${cat.toLowerCase().replace(/[^a-z]/g, "")}-${i + 1}`,
      name,
      category: cat,
      gender: GENDERS[k % 3]!,
      image: imgs[i % imgs.length]!,
      prices: { amazon, flipkart, local },
      rating: Math.round((3.8 + 1.1 * seeded(k + 4)) * 10) / 10,
      colors: [COLORS[k % COLORS.length]!, COLORS[(k + 3) % COLORS.length]!],
      fabric: s.fabrics[i % s.fabrics.length]!,
      sizes: cat === "Sneakers" ? ["S", "M", "L"] : SIZES.slice(i % 2, 5 + (i % 2)),
      studentDeal: i % 3 === 0,
      shopId: `s${(k % 6) + 1}`,
      verified: false,
    };
  });
});

export const bestPrice = (p: Product) => Math.min(p.prices.amazon, p.prices.flipkart, p.prices.local);
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const studentPrice = (n: number) => Math.round(n * 0.9);

export type Shop = {
  id: string; name: string; area: string; city: string; speciality: Category;
  distance: number; phone: string; open: string; deliveryHours: number; cashback: number; easyReturn: boolean; verified: boolean;
};
export const SHOPS: Shop[] = [
  { id: "s1", name: "Sarojini Drip Co.", area: "Sarojini Nagar", city: "Delhi", speciality: "Streetwear", distance: 1.2, phone: "+919800000001", open: "11am – 9pm", deliveryHours: 3, cashback: 5, easyReturn: true, verified: true },
  { id: "s2", name: "Linking Road Edit", area: "Bandra", city: "Mumbai", speciality: "Casual", distance: 2.8, phone: "+919800000002", open: "10am – 10pm", deliveryHours: 4, cashback: 2, easyReturn: true, verified: true },
  { id: "s3", name: "Commercial Street Threads", area: "Shivajinagar", city: "Bengaluru", speciality: "Party", distance: 3.5, phone: "+919800000003", open: "11am – 9pm", deliveryHours: 6, cashback: 10, easyReturn: true, verified: false },
  { id: "s4", name: "Lucknowi Chikan House", area: "Aminabad", city: "Lucknow", speciality: "Kurta", distance: 0.8, phone: "+919800000004", open: "10am – 8pm", deliveryHours: 2, cashback: 15, easyReturn: true, verified: true },
  { id: "s5", name: "Hauz Khas Vintage", area: "Hauz Khas", city: "Delhi", speciality: "Jeans", distance: 4.1, phone: "+919800000005", open: "12pm – 10pm", deliveryHours: 5, cashback: 100, easyReturn: false, verified: false },
  { id: "s6", name: "Pondy Bazaar Styles", area: "T. Nagar", city: "Chennai", speciality: "Ethnic", distance: 2.0, phone: "+919800000006", open: "10am – 9pm", deliveryHours: 3, cashback: 8, easyReturn: true, verified: true },
];
export const CITIES = ["All", ...Array.from(new Set(SHOPS.map((s) => s.city)))];
export const shopById = (id: string) => SHOPS.find((s) => s.id === id) ?? SHOPS[0]!;
