const list = [
  {
    id: 1,
    category: "Accessories",
    title: "Leather Messenger Bag",
    description: "Handcrafted leather messenger bag with multiple compartments.",
    price: 560,
    img: "data:image/jpeg;base64,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",
    amount: 1,
  },
  {
    id: 2,
    category: "Dresses",
    title: "Floral Print Summer Dress",
    description: "Stylish floral print dress perfect for summer outings.",
    price: 269,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0-m3uYAPwsYu1wtlhQyKUTxj-cFo6X9fDQ&usqp=CAU",
    amount: 1,
  },
  {
    id: 3,
    category: "Shirts",
    title: "Striped Cotton Shirt",
    description: "Classic striped cotton shirt for a casual yet smart look.",
    price: 349,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKpEuI12v87m1CdEjc6--HgywWbrPLxX1U0w&usqp=CAU",
    amount: 1,
  },
  {
    id: 4,
    category: "Shoes",
    title: "Men's Leather Loafers",
    description: "Handcrafted leather loafers for men, perfect for any occasion.",
    price: 459,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSVHGAxBlaZQ1u_X6yUUUVLD5Hh2krGocA4Q&usqp=CAU",
    amount: 1,
  },
  {
    id: 5,
    category: "Electronics",
    title: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation technology.",
    price: 1999,
    img: "data:image/jpeg;base64,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",
    amount: 1,
  },
  {
    id: 6,
    category: "Cosmetics",
    title: "Matte Liquid Lipstick Set",
    description: "Set of 5 long-lasting matte liquid lipsticks in various shades.",
    price: 485,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBo-ahOR6UWqc0AheQ2dBegXNA63SApQP8A&usqp=CAU",
    amount: 1,
  },
  // Add more products as needed
];

export default list;
