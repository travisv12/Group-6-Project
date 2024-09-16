import {
  IconCheck,
  IconPlant2,
  IconActivity,
  IconBread,
  IconShieldCheck,
  IconLeaf,
  IconPlant,
  IconSalad,
  IconMilkOff,
  IconBone,
  IconWeight,
  IconDnaOff,
  IconHeart,
  IconFlask,
  IconAffiliate,
  IconPercentage,
  IconFish,
  IconTextWrap,
  IconReceipt,
} from "@tabler/icons-react";


import chiquitaBanana from "@/assets/chiquita-banana.png";
import kotimaistaGround from "@/assets/kotimaista-ground.png";
import kotimaistaSkimmed from "@/assets/kotimaista-skimmed.png";
import onion from "@/assets/onion.png";
import rainbowRiisipiirakka from "@/assets/rainbow-riisipiirakka.png";
import royalGalaApple from "@/assets/royal-gala-apple.png";
import valioArkiCheeseSlice from "@/assets/valio-arki-cheese-slice.png";
import xtraEggs from "@/assets/xtra-eggs.png";

export const icons = {
  check: IconCheck,
  plant2: IconPlant2,
  activity: IconActivity,
  bread: IconBread,
  shieldCheck: IconShieldCheck,
  leaf: IconLeaf,
  plant: IconPlant,
  salad: IconSalad,
  milkOff: IconMilkOff,
  bone: IconBone,
  weight: IconWeight,
  dnaOff: IconDnaOff,
  heart: IconHeart,
  flask: IconFlask,
  affiliate: IconAffiliate,
  percentage: IconPercentage,
  fish: IconFish,
  textWrap: IconTextWrap,
  receipt: IconReceipt,
};

export const shopData = [
  {
    id: "1",
    name: "Chiquita Banana",
    discount: "Up to 20% off",
    rating: 4.8,
    reviews: 153,
    features: [
      {
        text: "Farm Fresh",
        icon: "plant2",
      },
      {
        text: "Best Quality",
        icon: "check",
      },
    ],
    price: "$2.99",
    image: chiquitaBanana,
    company: "Farm Fresh",
  },
  {
    id: "2",
    name: "Kotimaista Ground Meat 20% 400g",
    discount: "Up to 15% off",
    rating: 4.7,
    reviews: 89,
    features: [
      {
        text: "Organic",
        icon: "plant",
      },
      {
        text: "High in Antioxidants",
        icon: "activity",
      },
    ],
    price: "$5.49",
    image: kotimaistaGround,
    company: "Farm Fresh",
  },
  {
    id: "3",
    name: "Kotimaista Skimmed Milk 1L",
    discount: "Up to 10% off",
    rating: 4.5,
    reviews: 234,
    features: [
      {
        text: "Freshly Baked",
        icon: "bread",
      },
      {
        text: "No Preservatives",
        icon: "shieldCheck",
      },
    ],
    price: "$3.99",
    image: kotimaistaSkimmed,
    company: "Farm Fresh",
  },
  {
    id: "4",
    name: "Onion",
    discount: "Up to 25% off",
    rating: 4.9,
    reviews: 320,
    features: [
      {
        text: "Dairy-Free",
        icon: "milkOff",
      },
      {
        text: "Rich in Calcium",
        icon: "bone",
      },
    ],
    price: "$4.29",
    image: onion,
    company: "Nutty Delights", // Added company name
  },
  {
    id: "5",
    name: "Rainbow Riisipiirakka 65g",
    discount: "Up to 30% off",
    rating: 4.6,
    reviews: 187,
    features: [
      {
        text: "Vegan",
        icon: "salad",
      },
      {
        text: "Gluten-Free",
        icon: "leaf",
      },
    ],
    price: "$8.99",
    image: rainbowRiisipiirakka,
    company: "Green Eats", // Added company name
  },
  {
    id: "6",
    name: "Royal Gala Apple",
    discount: "Up to 20% off",
    rating: 4.8,
    reviews: 411,
    features: [
      {
        text: "High Protein",
        icon: "dnaOff",
      },
      {
        text: "Low Fat",
        icon: "weight",
      },
    ],
    price: "$1.49",
    image: royalGalaApple,
    company: "Dairy Delight", // Added company name
  },
  {
    id: "7",
    name: "Valio Arki Cheese Slice 500g",
    discount: "Up to 15% off",
    rating: 4.3,
    reviews: 75,
    features: [
      {
        text: "Healthy Snack",
        icon: "heart",
      },
      {
        text: "No Artificial Flavors",
        icon: "flask",
      },
    ],
    price: "$3.59",
    image: valioArkiCheeseSlice,
    company: "Crispy Greens", // Added company name
  },
  {
    id: "8",
    name: "Xtra Eggs M15 855g",
    discount: "Up to 40% off",
    rating: 4.9,
    reviews: 289,
    features: [
      {
        text: "Rich in Flavonoids",
        icon: "affiliate",
      },
      {
        text: "70% Cocoa",
        icon: "percentage",
      },
    ],
    price: "$2.99",
    image: xtraEggs,
    company: "Cocoa Haven", // Added company name
  },
];
