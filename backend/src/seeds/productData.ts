import { IProduct } from '../models/Product';

export const seedProducts: Partial<IProduct>[] = [
  // Men's Category
  {
    name: "Classic White T-Shirt",
    description: "Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear and casual outings.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 150
  },
  {
    name: "Slim Fit Denim Jeans",
    description: "Modern slim fit jeans made from stretch denim for ultimate comfort. Features classic 5-pocket styling.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 120
  },
  {
    name: "Men's Leather Jacket",
    description: "Genuine leather jacket with quilted shoulders. Perfect for adding edge to any outfit.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 45
  },
  {
    name: "Cotton Hoodie",
    description: "Cozy fleece-lined hoodie with kangaroo pocket. Ideal for layering or wearing on its own.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 200
  },
  {
    name: "Formal Blazer",
    description: "Tailored blazer in premium fabric. Perfect for business meetings and formal occasions.",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 60
  },
  {
    name: "Casual Polo Shirt",
    description: "Classic polo shirt in breathable cotton. Great for smart-casual looks.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 180
  },
  {
    name: "Athletic Track Pants",
    description: "Comfortable track pants with elastic waistband. Perfect for workouts or lounging.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 140
  },
  
  // Women's Category
  {
    name: "Floral Summer Dress",
    description: "Light and breezy floral print dress. Perfect for summer days and garden parties.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 95
  },
  {
    name: "High-Waisted Jeans",
    description: "Flattering high-waisted jeans with stretch. Vintage-inspired with modern comfort.",
    price: 84.99,
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 130
  },
  {
    name: "Silk Blouse",
    description: "Elegant silk blouse with delicate button details. Perfect for office or evening wear.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 75
  },
  {
    name: "Knit Cardigan",
    description: "Soft knit cardigan perfect for layering. Cozy and stylish for cooler days.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 110
  },
  {
    name: "Leather Ankle Boots",
    description: "Classic leather ankle boots with side zipper. Versatile and comfortable.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 85
  },
  {
    name: "Maxi Skirt",
    description: "Flowing maxi skirt in breathable fabric. Elegant and comfortable for any occasion.",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 100
  },
  {
    name: "Cropped Denim Jacket",
    description: "Trendy cropped denim jacket. A wardrobe staple for layering.",
    price: 74.99,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 90
  },
  {
    name: "Athletic Leggings",
    description: "High-performance leggings with moisture-wicking fabric. Perfect for yoga and gym.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 160
  },

  // Kids' Category
  {
    name: "Kids' Graphic T-Shirt",
    description: "Fun graphic print t-shirt for kids. Soft cotton for all-day comfort.",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 200
  },
  {
    name: "Kids' Denim Overalls",
    description: "Adorable denim overalls with adjustable straps. Durable and playful.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 120
  },
  {
    name: "Kids' Winter Jacket",
    description: "Warm and water-resistant winter jacket. Keeps kids cozy in cold weather.",
    price: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e4?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 80
  },
  {
    name: "Kids' Cotton Hoodie",
    description: "Soft cotton hoodie with fun designs. Perfect for school or play.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 150
  },
  {
    name: "Kids' Athletic Shorts",
    description: "Comfortable athletic shorts for active kids. Breathable and lightweight.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 180
  },
  {
    name: "Kids' Summer Dress",
    description: "Cute and comfortable summer dress. Perfect for parties and play dates.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 110
  },
  {
    name: "Kids' Sneakers",
    description: "Durable sneakers with good grip. Great for running and playing.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 140
  }
];