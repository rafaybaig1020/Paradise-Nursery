import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../features/cart/cartSlice';

const plantData = [
  { id: 1, name: 'Snake Plant', category: 'Air Purifying', price: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=300', description: 'Produces oxygen and filters indoor air.' },
  { id: 2, name: 'Peace Lily', category: 'Air Purifying', price: 18, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300', description: 'Thrives in shade and cleanses the air.' },
  { id: 3, name: 'Lavender', category: 'Aromatic', price: 12, image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300', description: 'Calming fragrance for home relaxation.' },
  { id: 4, name: 'Rosemary', category: 'Aromatic', price: 10, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300', description: 'Fresh culinary herb with a pleasant scent.' },
  { id: 5, name: 'Aloe Vera', category: 'Low Maintenance', price: 14, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300', description: 'Requires minimal watering and offers gel benefits.' },
  { id: 6, name: 'ZZ Plant', category: 'Low Maintenance', price: 20, image: 'https://images.unsplash.com/photo-1632207691143-62f237260533?w=300', description: 'Tolerates low light and neglect.' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const isAdded = (plantId) => {
    return cartItems.some(item => item.id === plantId);
  };

  const categories = [...new Set(plantData.map(plant => plant.category))];

  return (
    <div className="product-list-container">
      {categories.map(category => (
        <div key={category} className="category-section">
          <h2>{category} Plants</h2>
          <div className="product-grid">
            {plantData.filter(plant => plant.category === category).map(plant => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-image" />
                <h3>{plant.name}</h3>
                <p className="description">{plant.description}</p>
                <p className="price">${plant.price}</p>
                <button
                  className="add-to-cart-btn"
                  disabled={isAdded(plant.id)}
                  onClick={() => dispatch(addItem(plant))}
                >
                  {isAdded(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;