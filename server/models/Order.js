import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  customer: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
  },
  total:{
    type:Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
