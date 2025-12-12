export type Product = {
  id: number;
  name: string;
  pack: string;
  mrp: number;
  price: number;
  category:
    | "grocery-staples"
    | "fruits-vegetables"
    | "dairy-bakery"
    | "beverages"
    | "snacks-branded"
    | "personal-care"
    | "home-care"
    | "baby-kids"
    | "household-kitchen";
  image: string;
};

/* =========================
   GROCERY & STAPLES (30)
========================= */
const groceryStaples: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Grocery Item ${i + 1}`,
  pack: "Standard Pack",
  mrp: 100 + i * 10,
  price: 90 + i * 10,
  category: "grocery-staples",
  image: `/products/grocery/grocery-${i + 1}.jpg`,
}));

/* =========================
   FRUITS & VEGETABLES (25)
========================= */
const fruitsVegetables: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 501 + i,
  name: `Fruit / Vegetable ${i + 1}`,
  pack: "Standard Pack",
  mrp: 80 + i * 5,
  price: 60 + i * 5,
  category: "fruits-vegetables",
  image: `/products/fruits-vegetables/fruits-vegetables-${i + 1}.jpg`,
}));

/* =========================
   DAIRY & BAKERY (25)
========================= */
const dairyBakery: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 601 + i,
  name: `Dairy & Bakery Item ${i + 1}`,
  pack: "Standard Pack",
  mrp: 120 + i * 10,
  price: 100 + i * 10,
  category: "dairy-bakery",
  image: `/products/dairy-bakery/dairy-bakery-${i + 1}.jpg`,
}));

/* =========================
   BEVERAGES (25)
========================= */
const beverages: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 701 + i,
  name: `Beverage ${i + 1}`,
  pack: "Standard Pack",
  mrp: 90 + i * 5,
  price: 75 + i * 5,
  category: "beverages",
  image: `/products/beverages/beverages-${i + 1}.jpg`,
}));

/* =========================
   SNACKS & BRANDED FOODS (25)
========================= */
const snacksBranded: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 801 + i,
  name: `Snack Item ${i + 1}`,
  pack: "Standard Pack",
  mrp: 70 + i * 5,
  price: 55 + i * 5,
  category: "snacks-branded",
  image: `/products/snacks-branded-foods/snacks-branded-foods-${i + 1}.jpg`,
}));

/* =========================
   PERSONAL CARE (25)
========================= */
const personalCare: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 1001 + i,
  name: `Personal Care ${i + 1}`,
  pack: "Standard Pack",
  mrp: 150 + i * 10,
  price: 130 + i * 10,
  category: "personal-care",
  image: `/products/personal-care/personal-care-${i + 1}.jpg`,
}));

/* =========================
   HOME CARE (25)
========================= */
const homeCare: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 1201 + i,
  name: `Home Care ${i + 1}`,
  pack: "Standard Pack",
  mrp: 180 + i * 10,
  price: 150 + i * 10,
  category: "home-care",
  image: `/products/home-care/home-care-${i + 1}.jpg`,
}));

/* =========================
   BABY & KIDS (25)
========================= */
const babyKids: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 1401 + i,
  name: `Baby & Kids ${i + 1}`,
  pack: "Standard Pack",
  mrp: 300 + i * 20,
  price: 260 + i * 20,
  category: "baby-kids",
  image: `/products/baby-kids/baby-kids-${i + 1}.jpg`,
}));

/* =========================
   HOUSEHOLD & KITCHEN (25)
========================= */
const householdKitchen: Product[] = Array.from({ length: 25 }, (_, i) => ({
  id: 1601 + i,
  name: `Household & Kitchen ${i + 1}`,
  pack: "Standard Pack",
  mrp: 400 + i * 20,
  price: 360 + i * 20,
  category: "household-kitchen",
  image: `/products/household-kitchen/household-kitchen-${i + 1}.jpg`,
}));

/* =========================
   EXPORT ALL PRODUCTS
========================= */
export const products: Product[] = [
  ...groceryStaples,
  ...fruitsVegetables,
  ...dairyBakery,
  ...beverages,
  ...snacksBranded,
  ...personalCare,
  ...homeCare,
  ...babyKids,
  ...householdKitchen,
];
