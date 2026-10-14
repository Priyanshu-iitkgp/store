import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatPrice, pluralize } from '../utils/format';

export default function OrderConfirmedPage() {
  const order = useLocation().state?.order;

  // Opening this URL directly (without placing an order) goes back to the shop.
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="empty empty--page confirmed">
      <svg className="confirmed__mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="var(--highlighter)" />
        <path d="M20 33l8 8 16-17" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h1>Order placed</h1>
      <p>
        Thanks, {order.name}. Your order <strong>{order.id}</strong> for {pluralize(order.itemCount, 'item')} has
        been confirmed.
      </p>
      <p>
        {order.payment === 'cod'
          ? `Keep ${formatPrice(order.total)} ready to pay when it arrives.`
          : `${formatPrice(order.total)} will be collected through UPI.`}
      </p>
      <Link to="/" className="btn">
        Continue shopping
      </Link>
    </div>
  );
}
