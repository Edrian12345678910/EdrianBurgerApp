import { useMemo, useState } from "react";
import "./App.css";

const burgers = [
  {
    id: 1,
    name: "Crispy Chicken",
    description: "Crispy chicken fillet with fresh lettuce and creamy sauce.",
    price: 99.15,
    image: "/chickenburger.jpg",
    rating: 4.8,
    category: "Chicken",
    tag: "BEST SELLER",
  },
  {
    id: 2,
    name: "Ultimate Bacon",
    description: "Juicy beef patty topped with crispy bacon and cheese.",
    price: 129.15,
    image: "/baconburger.jpg",
    rating: 4.9,
    category: "Beef",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Veggie Burger",
    description: "A delicious veggie patty with fresh vegetables and sauce.",
    price: 109.15,
    image: "/veggieburger.jpg",
    rating: 4.7,
    category: "Veggie",
    tag: "FRESH PICK",
  },
  {
    id: 4,
    name: "Classic Cheese",
    description: "Classic beef burger with melted cheese and special sauce.",
    price: 119.15,
    image: "/cheeseburger.jpg",
    rating: 4.8,
    category: "Beef",
    tag: "CLASSIC",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    address: "",
    payment: "Cash on Delivery",
  });
  const [lastOrder, setLastOrder] = useState(null);

  const categories = ["All", "Beef", "Chicken", "Veggie"];

  const filteredBurgers = useMemo(() => {
    return burgers.filter((burger) => {
      const matchesCategory =
        activeCategory === "All" || burger.category === activeCategory;
      const matchesSearch =
        burger.name.toLowerCase().includes(search.toLowerCase()) ||
        burger.description.toLowerCase().includes(search.toLowerCase());
      const matchesFavorite =
        !showFavoritesOnly || favorites.includes(burger.id);

      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [activeCategory, search, showFavoritesOnly, favorites]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (burger) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === burger.id);

      if (existing) {
        return items.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...burger, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((items) =>
      items.includes(id)
        ? items.filter((favoriteId) => favoriteId !== id)
        : [...items, id]
    );
  };

  const openCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    setLastOrder({
      customer: { ...customer },
      items: [...cartItems],
      total: totalPrice,
      orderNumber: `GB-${Date.now().toString().slice(-6)}`,
    });

    setCartItems([]);
    setShowCheckout(false);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setCustomer({
      name: "",
      contact: "",
      address: "",
      payment: "Cash on Delivery",
    });
  };

  return (
    <div className="app">
      <div className="announcement">
        FRESHLY MADE. ALWAYS DELICIOUS. <span>•</span> YOUR BURGER CRAVINGS START HERE!
      </div>

      <header className="navbar">
        <a className="logo" href="#home" aria-label="Garben Burger home">
          <img src="/burgerlogo.png" alt="Garben Burger" />
          <span>GARBEN<span className="logo-accent">BURGER.</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">HOME</a>
          <a href="#menu">OUR MENU</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <button
          type="button"
          className="cart-button"
          onClick={() => setShowCart(true)}
          aria-label={`Open cart, ${totalItems} items`}
        >
          <span className="cart-symbol">🛒</span>
          <span className="cart-label">MY CART</span>
          <span className="cart-count">{totalItems}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-kicker">THE GOOD FOOD CLUB</span>
            <h1>
              BIG FLAVOR.
              <br />
              <span>BIG HAPPINESS.</span>
            </h1>
            <p>
              Fresh ingredients, juicy burgers, and flavors worth coming back
              for. Your next favorite bite is waiting.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#menu">EXPLORE MENU <span>→</span></a>
              <div className="hero-rating">
                <span>★★★★★</span>
                <small>Made with love, served fresh</small>
              </div>
            </div>
            <div className="hero-note">
              <span className="note-icon">✦</span>
              FRESHLY PREPARED • FULL OF FLAVOR
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>
            <div className="hero-image-wrap">
              <img src="/baconburger.jpg" alt="Our delicious signature bacon burger" />
            </div>
            <div className="hero-sticker">
              <span>100%</span>
              <small>DELICIOUS</small>
            </div>
            <div className="hero-price">
              <small>STARTING AT</small>
              <strong>₱99.15</strong>
            </div>
          </div>
        </section>

        <section className="features-strip">
          <div><span>✦</span><p>FRESH INGREDIENTS</p></div>
          <div><span>♨</span><p>MADE TO ORDER</p></div>
          <div><span>♥</span><p>MADE WITH LOVE</p></div>
          <div><span>★</span><p>BIG, BOLD FLAVOR</p></div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="section-kicker">TASTE THE DIFFERENCE</span>
              <h2>OUR CRAZY <span>BURGERS</span></h2>
              <p>Find your perfect burger. Every bite is a good decision.</p>
            </div>
            <div className="menu-count">{filteredBurgers.length} MENU ITEMS</div>
          </div>

          <div className="menu-tools">
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? "category-tab active" : "category-tab"}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowFavoritesOnly(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="menu-actions">
              <label className="search-box">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search burgers..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <button
                type="button"
                className={showFavoritesOnly ? "favorites-filter active" : "favorites-filter"}
                onClick={() => setShowFavoritesOnly((value) => !value)}
              >
                ♥ <span>Favorites ({favorites.length})</span>
              </button>
            </div>
          </div>

          {filteredBurgers.length > 0 ? (
            <div className="burger-grid">
              {filteredBurgers.map((burger) => (
                <article className="burger-card" key={burger.id}>
                  <div className="burger-image">
                    <img src={burger.image} alt={burger.name} />
                    <span className="product-tag">{burger.tag}</span>
                    <button
                      type="button"
                      className={favorites.includes(burger.id) ? "favorite is-favorite" : "favorite"}
                      onClick={() => toggleFavorite(burger.id)}
                      aria-label={favorites.includes(burger.id) ? `Remove ${burger.name} from favorites` : `Add ${burger.name} to favorites`}
                    >
                      {favorites.includes(burger.id) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className="burger-info">
                    <div className="rating">★ <span>{burger.rating}</span> <small>• {burger.category}</small></div>
                    <h3>{burger.name}</h3>
                    <p>{burger.description}</p>
                    <div className="card-bottom">
                      <strong className="price">{money(burger.price)}</strong>
                      <button type="button" className="add-cart" onClick={() => addToCart(burger)}>
                        <span>+</span> ADD
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span>🍔</span>
              <h3>No burgers found</h3>
              <p>Try another search or choose a different category.</p>
              <button type="button" onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setShowFavoritesOnly(false);
              }}>SHOW ALL BURGERS</button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-mark">G.</div>
          <div>
            <span className="section-kicker">MORE THAN JUST A BURGER</span>
            <h2>GOOD FOOD.<br /><span>GOOD MOOD.</span></h2>
            <p>
              At Garben Burger, we believe great moments start with great food.
              We bring together satisfying flavors and freshly prepared
              favorites to make every meal a little more special.
            </p>
            <a href="#menu" className="text-link">FIND YOUR FAVORITE <span>→</span></a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="section-kicker">READY FOR A BITE?</span>
          <h2>YOUR NEXT FAVORITE<br /><span>IS ONE CLICK AWAY.</span></h2>
          <a href="#menu" className="primary-button">ORDER YOUR BURGER <span>→</span></a>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">GARBEN<span>BURGER.</span></a>
        <p>Big flavor. Big happiness. Made fresh for you.</p>
        <small>© {new Date().getFullYear()} Garben Burger. All rights reserved.</small>
      </footer>

      {showCart && (
        <div className="modal-overlay" onMouseDown={() => setShowCart(false)}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <div><span className="section-kicker">GARBEN BURGER</span><h2>Your Cart <span>({totalItems})</span></h2></div>
              <button type="button" className="close-button" onClick={() => setShowCart(false)} aria-label="Close cart">×</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any burgers yet.</p>
                <button type="button" className="primary-button" onClick={() => setShowCart(false)}>EXPLORE MENU →</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{money(item.price)}</p>
                        <div className="quantity-controls">
                          <button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name}`}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Increase ${item.name}`}>+</button>
                        </div>
                      </div>
                      <div className="cart-item-end">
                        <strong>{money(item.price * item.quantity)}</strong>
                        <button type="button" className="remove-item" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="drawer-footer">
                  <div className="total-row"><span>Total items</span><strong>{totalItems}</strong></div>
                  <div className="total-row grand-total"><span>Total</span><strong>{money(totalPrice)}</strong></div>
                  <button type="button" className="checkout-button" onClick={openCheckout}>PROCEED TO CHECKOUT →</button>
                  <button type="button" className="continue-button" onClick={() => setShowCart(false)}>CONTINUE SHOPPING</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showCheckout && (
        <div className="modal-overlay checkout-overlay">
          <section className="checkout-panel" role="dialog" aria-modal="true" aria-label="Checkout">
            <div className="drawer-header">
              <div><span className="section-kicker">ALMOST THERE</span><h2>Checkout</h2></div>
              <button type="button" className="close-button" onClick={() => setShowCheckout(false)} aria-label="Close checkout">×</button>
            </div>
            <div className="checkout-layout">
              <form className="checkout-form" onSubmit={placeOrder}>
                <h3>Customer Information</h3>
                <label htmlFor="customer-name">Full Name</label>
                <input id="customer-name" type="text" name="name" placeholder="Enter your full name" value={customer.name} onChange={handleCustomerChange} required />
                <label htmlFor="customer-contact">Contact Number</label>
                <input id="customer-contact" type="tel" name="contact" placeholder="Enter your contact number" value={customer.contact} onChange={handleCustomerChange} required />
                <label htmlFor="customer-address">Delivery Address</label>
                <textarea id="customer-address" name="address" placeholder="Enter your complete delivery address" value={customer.address} onChange={handleCustomerChange} required rows="3" />
                <label htmlFor="customer-payment">Payment Method</label>
                <select id="customer-payment" name="payment" value={customer.payment} onChange={handleCustomerChange}>
                  <option>Cash on Delivery</option>
                  <option>GCash</option>
                  <option>Credit / Debit Card</option>
                </select>
                <button type="submit" className="checkout-button">PLACE ORDER • {money(totalPrice)}</button>
              </form>

              <div className="order-summary">
                <h3>Order Summary</h3>
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div><strong>{item.name}</strong><small>{item.quantity} × {money(item.price)}</small></div>
                    <b>{money(item.price * item.quantity)}</b>
                  </div>
                ))}
                <div className="summary-total"><span>Total ({totalItems} items)</span><strong>{money(totalPrice)}</strong></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {showSuccess && lastOrder && (
        <div className="modal-overlay success-overlay">
          <section className="success-modal" role="dialog" aria-modal="true" aria-label="Order confirmation">
            <div className="success-icon">✓</div>
            <span className="section-kicker">THANK YOU FOR CHOOSING US</span>
            <h2>ORDER CONFIRMED!</h2>
            <p>Thank you, <strong>{lastOrder.customer.name}</strong>! Your order has been placed successfully.</p>
            <div className="success-details">
              <div><span>Order Number</span><strong>{lastOrder.orderNumber}</strong></div>
              <div><span>Payment Method</span><strong>{lastOrder.customer.payment}</strong></div>
              <div><span>Delivery Address</span><strong>{lastOrder.customer.address}</strong></div>
              <div><span>Order Total</span><strong>{money(lastOrder.total)}</strong></div>
            </div>
            <button type="button" className="checkout-button" onClick={closeSuccess}>CONTINUE SHOPPING</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
