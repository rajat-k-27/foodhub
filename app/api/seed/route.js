import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

const seedData = [
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
    price: 299,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=500&fit=crop',
    category: 'Pizza',
    available: true,
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni and mozzarella cheese',
    price: 399,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=500&fit=crop',
    category: 'Pizza',
    available: true,
  },
  {
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
    price: 179,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    category: 'Burger',
    available: true,
  },
  {
    name: 'Cheese Burger',
    description: 'Classic burger with double cheese and crispy bacon',
    price: 229,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop',
    category: 'Burger',
    available: true,
  },
  {
    name: 'Chicken Burger',
    description: 'Crispy chicken breast with mayo and fresh vegetables',
    price: 199,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=500&fit=crop',
    category: 'Burger',
    available: true,
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 279,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=500&fit=crop',
    category: 'Pasta',
    available: true,
  },
  {
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic and chili peppers',
    price: 249,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop',
    category: 'Pasta',
    available: true,
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with ice cream',
    price: 149,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=500&fit=crop',
    category: 'Dessert',
    available: true,
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 169,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=500&fit=crop',
    category: 'Dessert',
    available: true,
  },
  {
    name: 'Coca Cola',
    description: 'Refreshing classic cola drink',
    price: 60,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=500&fit=crop',
    category: 'Beverage',
    available: true,
  },
  // {
  //   name: 'Fresh Lemonade',
  //   description: 'Freshly squeezed lemonade with mint',
  //   price: 80,
  //   image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500&h=500&fit=crop',
  //   category: 'Beverage',
  //   available: true,
  // },
  {
    name: 'Mozzarella Sticks',
    description: 'Crispy fried mozzarella with marinara sauce',
    price: 199,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=500&h=500&fit=crop',
    category: 'Appetizer',
    available: true,
  },
];

async function seedDatabase() {
  await dbConnect();
  
  // Clear existing menu items
  await MenuItem.deleteMany({});
  
  // Insert seed data
  const menuItems = await MenuItem.insertMany(seedData);
  
  return { 
    success: true, 
    message: `${menuItems.length} menu items created successfully`,
    data: menuItems 
  };
}

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
