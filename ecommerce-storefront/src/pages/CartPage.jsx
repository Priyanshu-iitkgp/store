import { Link } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import ProductArt from '../components/ProductArt';
import QuantityStepper from '../components/QuantityStepper';
import { useCart } from '../context/CartContext';
import { getCategoryName } from '../data/products';
import { formatPrice, pluralize } from '../utils/format';
import '../styles/cart.css';

export default function CartPage() {
  const { items, itemCount, setQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty empty--page">
        <h1>Your cart is empty</h1>
        <p>Items you add will stay here, even if you close the browser.</p>
        <Link to="/" className="btn">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="page-head">
        <h1>Your cart</h1>
        <p className="page-head__meta">{pluralize(itemCount, 'item')}</p>
      </div>

      <div className="cart__layout">
        <section aria-label="Cart items">
          <ul className="cart-list">
            {items.map(({ id, qty, product, lineTotal }) => (
              <li key={id} className="cart-line">
                <Link to={`/product/${id}`} className="cart-line__art" tabIndex={-1} aria-hidden="true">
                  <ProductArt art={product.art} label="" />
                </Link>

                <div className="cart-line__info">
                  <Link to={`/product/${id}`} className="cart-line__name">
                    {product.name}
                  </Link>
                  <p className="cart-line__meta">
                    {getCategoryName(product.category)}, {formatPrice(product.price)} each
                  </p>
                  <button type="button" className="link-btn" onClick={() => removeItem(id)}>
                    Remove
                  </button>
                </div>

                <QuantityStepper
                  value={qty}
                  onChange={(next) => setQuantity(id, next)}
                  label={`Quantity of ${product.name}`}
                />
                <p className="cart-line__total price">{formatPrice(lineTotal)}</p>
              </li>
            ))}
          </ul>

          <div className="cart__actions">
            <Link to="/" className="btn btn--ghost">
              Continue shopping
            </Link>
            <button type="button" className="link-btn link-btn--danger" onClick={clearCart}>
              Empty cart
            </button>
          </div>
        </section>

        <OrderSummary>
          <Link to="/checkout" className="btn btn--large btn--block">
            Go to checkout
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
