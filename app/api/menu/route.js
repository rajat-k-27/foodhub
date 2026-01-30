import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function GET() {
  try {
    await dbConnect();
    const menuItems = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
    
    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const menuItem = await MenuItem.create(body);
    
    return NextResponse.json({ success: true, data: menuItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
