import { useCart } from '../context/CartContext';
import { formatPrice, FREE_SHIPPING_FROM } from '../utils/format';
import '../styles/summary.css';

// Totals panel shared by the cart and checkout pages.
export default function OrderSummary({ children, showItems = false }) {
  const { items, subtotal, shipping, total } = useCart();
  const toFreeShipping = FREE_SHIPPING_FROM - subtotal;

  return (
    <aside className="summary" aria-label="Order summary">
      <h2 className="summary__title">Order summary</h2>

      {showItems && (
        <ul className="summary__items">
          {items.map(({ id, qty, product, lineTotal }) => (
            <li key={id}>
              <span>
                {product.name} <span className="summary__qty">× {qty}</span>
              </span>
              <span>{formatPrice(lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="summary__rows">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {toFreeShipping > 0 && (
        <p className="summary__note">
          Add <mark>{formatPrice(toFreeShipping)}</mark> more for free delivery.
        </p>
      )}

      {children}
    </aside>
  );
}
