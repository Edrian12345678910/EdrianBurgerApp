import { useState } from "react";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const burgers = [
    {
      id: 1,
      name: "Crispy Chicken",
      description:
        "Crispy chicken fillet with fresh lettuce and creamy sauce.",
      price: 99.15,
      image: "/chickenburger.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Ultimate Bacon",
      description:
        "Juicy beef patty topped with crispy bacon and cheese.",
      price: 129.15,
      image: "/baconburger.jpg",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Veggie Burger",
      description:
        "A delicious veggie patty with fresh vegetables and sauce.",
      price: 109.15,
      image: "/veggieburger.jpg",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Classic Cheese",
      description:
        "Classic beef burger with melted cheese and special sauce.",
      price: 119.15,
      image: "/cheeseburger.jpg",
      rating: 4.8,
    },
  ];

  // ADD TO CART
  const addToCart = (burger) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === burger.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...burger, quantity: 1 }];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // TOTAL ITEMS
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // PROCEED TO CHECKOUT
  const proceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  // PLACE ORDER
  const placeOrder = (event) => {
    event.preventDefault();

    setCartItems([]);
    setShowCheckout(false);
    setShowSuccess(true);
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <div className="logo">
          <img
            src="/burgerlogo.png"
            alt="Garben Burger Logo"
          />
        </div>

        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#menu">OUR MENU</a>
          <a href="#shop">SHOP</a>
          <a href="#contact">CONTACT</a>
        </div>

        {/* CART BUTTON */}
        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          🛒
          <span>{totalItems}</span>
        </button>

      </nav>

      {/* ================= MENU ================= */}
      <section id="menu" className="menu-section">

        <p className="small-title">
          WELCOME TO GARBEN BURGER
        </p>

        <h1>OUR CRAZY BURGERS</h1>

        <p className="intro">
          Fresh, juicy, and delicious burgers made to satisfy
          your cravings. Choose your favorite and enjoy every bite.
        </p>

        <div className="burger-grid">

          {burgers.map((burger) => (
            <div
              className="burger-card"
              key={burger.id}
            >

              {/* BURGER IMAGE */}
              <div className="burger-image">

                <img
                  src={burger.image}
                  alt={burger.name}
                />

                <button className="favorite">
                  ♡
                </button>

              </div>

              {/* BURGER INFORMATION */}
              <div className="burger-info">

                <div className="rating">
                  ⭐ {burger.rating}
                </div>

                <h2>{burger.name}</h2>

                <p>{burger.description}</p>

                <div className="card-bottom">

                  <span className="price">
                    ₱{burger.price.toFixed(2)}
                  </span>

                  <button
                    className="add-cart"
                    onClick={() => addToCart(burger)}
                  >
                    ADD TO CART
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="bottom-section"
      >
        <h2>ABOUT US</h2>

        <p>
          Garben Burger serves delicious and satisfying
          burgers made for burger lovers.
        </p>
      </section>

      {/* ================= SHOP ================= */}
      <section
        id="shop"
        className="bottom-section"
      >
        <h2>SHOP</h2>

        <p>
          Choose your favorite burger and add it to your cart.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="bottom-section"
      >
        <h2>CONTACT</h2>

        <p>
          Have questions? Get in touch with Garben Burger.
        </p>
      </section>

      {/* ================================================= */}
      {/* CART */}
      {/* ================================================= */}

      {showCart && (
        <div className="overlay">

          <div className="cart-panel">

            <div className="cart-header">

              <h2>YOUR CART</h2>

              <button
                className="close-button"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>

            </div>

            {/* EMPTY CART */}
            {cartItems.length === 0 ? (

              <div className="empty-cart">

                <div className="empty-icon">
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some delicious burgers first!
                </p>

                <button
                  className="continue-button"
                  onClick={() => setShowCart(false)}
                >
                  CONTINUE SHOPPING
                </button>

              </div>

            ) : (

              <>
                {/* CART ITEMS */}
                <div className="cart-items">

                  {cartItems.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₱{item.price.toFixed(2)}
                        </p>

                        <div className="quantity">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                      <strong>
                        ₱
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* CART TOTAL */}
                <div className="cart-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₱{totalPrice.toFixed(2)}
                  </strong>

                </div>

                {/* CHECKOUT BUTTON */}
                <button
                  className="checkout-button"
                  onClick={proceedToCheckout}
                >
                  PROCEED TO CHECKOUT
                </button>

              </>

            )}

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* CHECKOUT */}
      {/* ================================================= */}

      {showCheckout && (
        <div className="overlay">

          <div className="checkout-panel">

            <div className="checkout-header">

              <h2>CHECKOUT</h2>

              <button
                className="close-button"
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>

            </div>

            {/* ORDER SUMMARY */}
            <div className="checkout-summary">

              <h3>
                Order Summary
              </h3>

              {cartItems.map((item) => (

                <div
                  className="summary-item"
                  key={item.id}
                >

                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₱
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>

                </div>

              ))}

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₱{totalPrice.toFixed(2)}
                </strong>

              </div>

            </div>

            {/* CUSTOMER FORM */}
            <form
              onSubmit={placeOrder}
              className="checkout-form"
            >

              <h3>
                Customer Information
              </h3>

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                required
              />

              <label>
                Address
              </label>

              <input
                type="text"
                placeholder="Enter your delivery address"
                required
              />

              <label>
                Contact Number
              </label>

              <input
                type="tel"
                placeholder="Enter your contact number"
                required
              />

              <label>
                Payment Method
              </label>

              <select required>

                <option value="">
                  Select payment method
                </option>

                <option value="cash">
                  Cash on Delivery
                </option>

                <option value="gcash">
                  GCash
                </option>

              </select>

              <button
                type="submit"
                className="place-order-button"
              >
                PLACE ORDER
              </button>

            </form>

          </div>

        </div>
      )}

      {/* ================================================= */}
      {/* ORDER SUCCESS */}
      {/* ================================================= */}

      {showSuccess && (
        <div className="success-overlay">

          <div className="success-modal">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Confirmed!
            </h2>

            <p>
              Thank you for ordering from
              <strong> Garben Burger!</strong>
            </p>

            <p className="success-small">
              Your order has been placed successfully.
            </p>

            <button
              className="success-button"
              onClick={() => setShowSuccess(false)}
            >
              CONTINUE SHOPPING
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;