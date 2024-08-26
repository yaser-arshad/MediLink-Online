import React, { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const EditMed = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate();
  const [medicineData, setMedicineData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch medicine details by ID when component mounts
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          // Populate form fields with fetched data
          setMedicineData(data);
        } else {
          throw new Error('Failed to fetch medicine');
        }
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMedicineData({ ...medicineData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });
      if (response.ok) {
        setSuccessMessage('Medicine updated successfully');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/admin/manage-medicines'); // Navigate back to ManageMed.jsx after 3 seconds
        }, 3000);
      } else {
        throw new Error('Failed to update medicine');
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/admin/manage-medicines');
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Edit Medicine</h2>
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
            Edit Medicine
          </button>
          <button
            type="button"
            style={{ backgroundColor: currentColor }}
            className="w-full text-white font-semibold py-2 rounded-md"
            onClick={handleNavigate}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMed;
