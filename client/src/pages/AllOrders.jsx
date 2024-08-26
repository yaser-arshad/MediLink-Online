import React, { useState, useEffect } from 'react';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

 
 const handleApproveOrder = (orderId) => {
  setOrders(prevOrders =>
    prevOrders.map(order =>
      order._id === orderId ? { ...order, status: 'Out for Delivery' } : order
    )
  );
};
  return (
    <div className="px-4 my-12 mx-auto max-w-full mt-12 p-6 overflow-x-auto">
      <h2 className='mb-8 text-3xl font-bold'>All Customer Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.items.map((item, itemIndex) => (
                    <div key={item._id}>
                      {item.name}
                      {itemIndex !== order.items.length - 1 && <br />}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                {order.status === 'Out for Delivery' ? 'Out for Delivery' : (
                    <button
                      onClick={() => handleApproveOrder(order._id)}
                      className="bg-blue-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-400"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
