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

import avacadoImage from "@/assets/avacado.png";
import blueberriesImage from "@/assets/blueberries.png";
import wheatBreadImage from "@/assets/wheat-bread.png";
import almondMilkImage from "@/assets/almond-milk.png";
import quinoaSaladImage from "@/assets/quinoa-salad.png";

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
    name: "Organic Avocado",
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
    image: avacadoImage,
    company: "Farm Fresh",
  },
  {
    id: "2",
    name: "Fresh Blueberries",
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
    image: blueberriesImage,
    company: "Farm Fresh",
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
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
    image: wheatBreadImage,
    company: "Farm Fresh",
  },
  {
    id: "4",
    name: "Almond Milk",
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
    image: almondMilkImage,
    company: "Nutty Delights", // Added company name
  },
  {
    id: "5",
    name: "Quinoa Salad",
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
    image: quinoaSaladImage,
    company: "Green Eats", // Added company name
  },
  {
    id: "6",
    name: "Greek Yogurt",
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
    image: "https://via.placeholder.com/150x150?text=Greek+Yogurt",
    company: "Dairy Delight", // Added company name
  },
  {
    id: "7",
    name: "Kale Chips",
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
    image: "https://via.placeholder.com/150x150?text=Kale+Chips",
    company: "Crispy Greens", // Added company name
  },
  {
    id: "8",
    name: "Dark Chocolate",
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
    image: "https://via.placeholder.com/150x150?text=Dark+Chocolate",
    company: "Cocoa Haven", // Added company name
  },
  {
    id: "9",
    name: "Sushi Platter",
    discount: "Up to 35% off",
    rating: 4.7,
    reviews: 124,
    features: [
      {
        text: "Freshly Made",
        icon: "textWrap",
      },
      {
        text: "Contains Fish",
        icon: "fish",
      },
    ],
    price: "$12.99",
    image: "https://via.placeholder.com/150x150?text=Sushi+Platter",
    company: "Ocean Fresh", // Added company name
  },
  {
    id: "10",
    name: "Spaghetti Bolognese",
    discount: "Up to 10% off",
    rating: 4.6,
    reviews: 158,
    features: [
      {
        text: "Authentic Recipe",
        icon: "receipt",
      },
      {
        text: "Gluten-Free Pasta Option",
        icon: "leaf",
      },
    ],
    price: "$9.99",
    image: "https://via.placeholder.com/150x150?text=Spaghetti+Bolognese",
    company: "Pasta Paradise", // Added company name
  },
];
