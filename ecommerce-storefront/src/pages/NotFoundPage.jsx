import { Link } from 'react-router-dom';

export default function NotFoundPage({ message = "This page doesn't exist. Check the address or go back to the shop." }) {
  return (
    <div className="empty empty--page">
      <h1>Page not found</h1>
      <p>{message}</p>
      <Link to="/" className="btn">
        Go to the shop
      </Link>
    </div>
  );
}
