import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [recipe, setRecipe] = useState([]);
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  async function fetchData() {
    try {
      const result = await fetch("https://dummyjson.com/recipes");
      const response = await result.json();
      setRecipe(response.recipes || []);
    } catch (error) {
      toast.error("Failed to fetch recipes");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addToCart(product) {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.error(`${product.name} is already in the cart`);
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to the cart`);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  }

  return (
    <div className="app">
      {/* Cart Info */}
      <div className="cart-info" onClick={() => setShow(true)}>
        🛒 <span>{cart.length}</span>
      </div>

      <ToastContainer autoClose={2000} position="top-right" />

      {/* Title */}
      <h1 className="title">🍽 Food Store</h1>

      {/* Products List */}
      <div className="list">
        {recipe.map((item) => (
          <div key={item.id} className="card">
            <img className="card-image" src={item.image} alt={item.name} />
            <h2 className="card-title">{item.name}</h2>
            <p className="card-description">
              Ingredients: {item.ingredients.join(", ")}
            </p>
            <div className="card-footer">
              <button
                className="cart-button"
                onClick={() => addToCart(item)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {show && (
        <div className="cart-modal" onClick={(e) => e.target.className === "cart-modal" && setShow(false)}>
          <div className="cart-modal-content">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))
            )}
            <button className="close-button" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;  
