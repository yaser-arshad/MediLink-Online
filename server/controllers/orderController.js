import Order from '../models/Order.js';

const createOrder = async (req, res) => {
  try {
    const orderData = req.body.order;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Missing data: No items in the order.' });
    }

    if (!orderData.customer || !orderData.customer.email || !orderData.customer.name || !orderData.customer.street || !orderData.customer.postalCode || !orderData.customer.city) {
      return res.status(400).json({ message: 'Missing data: Email, name, street, postal code, or city is missing.' });
    }

    const newOrder = new Order({
      items: orderData.items,
      customer: orderData.customer,
      total: orderData.total
    });
    await newOrder.save();
    

    res.status(201).json({ message: 'Order created!', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};


export { createOrder,getAllOrders };
