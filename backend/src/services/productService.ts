import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Rose & Musk",
      image: "/images/rose-musk.png",
      price: 950,
      stock: 25,
      description:
        "An elegant floral fragrance blending delicate rose petals, soft musk, and warm amber for a timeless feminine scent.",
      category: ["Women"],
    },
    {
      title: "Vanilla & Amber",
      image: "/images/vanilla-amber.png",
      price: 1150,
      stock: 30,
      description:
        "A warm and comforting fragrance combining creamy vanilla, rich amber, and smooth sandalwood.",
      category: ["Women", "Men"],
    },
    {
      title: "Oud & Jasmine",
      image: "/images/oud-jasmine.png",
      price: 1450,
      stock: 18,
      description:
        "A sophisticated fragrance featuring precious oud, blooming jasmine, and deep woody notes.",
      category: ["Women", "Men"],
    },
    {
      title: "Peony Bloom",
      image: "/images/peony-bloom.png",
      price: 890,
      stock: 35,
      description:
        "A fresh floral perfume with peony, lychee, and soft rose notes, creating a light and romantic scent.",
      category: ["Women"],
    },
    {
      title: "Midnight Leather",
      image: "/images/midnight-leather.png",
      price: 1350,
      stock: 20,
      description:
        "A bold masculine fragrance with rich leather, bergamot, and warm tonka bean.",
      category: ["Men"],
    },
    {
      title: "Citrus Reverie",
      image: "/images/citrus-reverie.png",
      price: 850,
      stock: 40,
      description:
        "A refreshing fragrance blending sparkling bergamot, neroli, and clean musk.",
      category: ["Women", "Men"],
    },
    {
      title: "Velvet Rose",
      image: "/images/velvet-rose.png",
      price: 1100,
      stock: 22,
      description:
        "A luxurious rose fragrance with velvety petals, pink pepper, and soft vanilla.",
      category: ["Women"],
    },

    {
      title: "Coconut Bliss",
      image: "/images/coconut-bliss.png",
      price: 1250,
      stock: 24,
      description:
        "A dreamy feminine fragrance blending creamy coconut, soft vanilla, and delicate white musk for a warm, sweet, and tropical scent.",
      category: ["Women"],
    },

    {
      title: "White Musk",
      image: "/images/white-musk.png",
      price: 980,
      stock: 32,
      description:
        "A clean and delicate fragrance with white musk, powdery iris, and subtle floral notes.",
      category: ["Women", "Men"],
    },
    {
      title: "Golden Santal",
      image: "/images/golden-santal.png",
      price: 1400,
      stock: 16,
      description:
        "A rich fragrance built around creamy sandalwood, cardamom, and golden amber.",
      category: ["Women", "Men"],
    },
    {
      title: "Ocean Drift",
      image: "/images/ocean-drift.png",
      price: 920,
      stock: 38,
      description:
        "A fresh masculine fragrance with marine notes, grapefruit, and aromatic cedarwood.",
      category: ["Men"],
    },
    {
      title: "Amber Elixir",
      image: "/images/amber-elixir.png",
      price: 1300,
      stock: 20,
      description:
        "An enchanting feminine fragrance blending golden amber, orange blossom, and smooth vanilla.",
      category: ["Women"],
    },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
