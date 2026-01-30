import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// This endpoint simulates automatic order status progression
// In a real app, this would be triggered by kitchen/delivery staff actions
export async function POST() {
  try {
    await dbConnect();
    
    const statusProgression = {
      'Order Received': 'Preparing',
      'Preparing': 'Out for Delivery',
      'Out for Delivery': 'Delivered',
    };
    
    // Find orders that are not completed
    const activeOrders = await Order.find({
      status: { $in: ['Order Received', 'Preparing', 'Out for Delivery'] },
    }).sort({ createdAt: -1 });
    
    const updates = [];
    
    for (const order of activeOrders) {
      const timeSinceLastUpdate = Date.now() - new Date(order.updatedAt).getTime();
      const minutesSinceUpdate = timeSinceLastUpdate / (1000 * 60);
      
      // Progress order status after certain time intervals (for demo purposes)
      // Order Received -> Preparing (after 2 minutes)
      // Preparing -> Out for Delivery (after 5 minutes)
      // Out for Delivery -> Delivered (after 8 minutes)
      
      let shouldUpdate = false;
      
      if (order.status === 'Order Received' && minutesSinceUpdate >= 2) {
        shouldUpdate = true;
      } else if (order.status === 'Preparing' && minutesSinceUpdate >= 5) {
        shouldUpdate = true;
      } else if (order.status === 'Out for Delivery' && minutesSinceUpdate >= 8) {
        shouldUpdate = true;
      }
      
      if (shouldUpdate) {
        const newStatus = statusProgression[order.status];
        order.status = newStatus;
        await order.save();
        updates.push({
          orderId: order._id,
          orderNumber: order.orderNumber,
          oldStatus: Object.keys(statusProgression).find(key => statusProgression[key] === newStatus),
          newStatus: newStatus,
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${updates.length} orders updated`,
      updates,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
