import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
  }],
  customerDetails: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    address: {
      type: String,
      required: [true, 'Delivery address is required'],
      maxlength: [500, 'Address cannot be more than 500 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number'],
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount must be positive'],
  },
  status: {
    type: String,
    enum: ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Received',
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
