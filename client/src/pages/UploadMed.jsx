import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const UploadMed = () => {
  const { currentColor } = useStateContext();
  const [medicineData, setMedicineData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMedicineData({ ...medicineData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });
      if (!response.ok) {
        throw new Error('Failed to add medicine');
      }
      console.log('Medicine added successfully');
      setSuccessMessage('Medicine added successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      // Clear input fields
      setMedicineData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md relative">
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-md absolute top-0 left-0 right-0 text-center mb-10">
          {successMessage}
          <button
            onClick={() => setSuccessMessage('')}
            className="ml-2 p-1 rounded-full bg-white text-green-500 hover:bg-green-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.05 10l3.476-3.475a1.2 1.2 0 0 0-1.697-1.697L11.353 8.303 7.878 4.828a1.2 1.2 0 0 0-1.697 1.697L9.654 10l-3.475 3.476a1.2 1.2 0 0 0 1.697 1.697l3.475-3.475 3.475 3.475a1.2 1.2 0 0 0 1.697-1.697L13.05 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Upload Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold">Medicine Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter medicine name"
              className="w-full border rounded-md p-2"
              value={medicineData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold">Medicine Description</label>
            <textarea
              id="description"
              placeholder="Enter medicine description"
              className="w-full border rounded-md p-2"
              value={medicineData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block font-semibold">Medicine Price</label>
            <input
              type="number"
              id="price"
              placeholder="Enter medicine price"
              min="0.00"
              step="0.01"
              className="w-full border rounded-md p-2"
              value={medicineData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="quantity" className="block font-semibold mr-2">Quantity</label>
            <div className="flex items-center border rounded-md">
              <input
                type="number"
                id="quantity"
                min="0"
                step="1"
                className="flex-1 border-t border-b p-2"
                value={medicineData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block font-semibold">Image URL</label>
            <input
              type="url"
              id="image"
              placeholder="Enter image URL"
              className="w-full border rounded-md p-2"
              value={medicineData.image}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: currentColor }}
            className="w-full text-white font-semibold py-2 rounded-md"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadMed;
