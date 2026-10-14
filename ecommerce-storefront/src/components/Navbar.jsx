import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartIcon } from './Icons';
import SearchBar from './SearchBar';
import '../styles/navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="brand" aria-label="Papermill home">
          <svg className="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
            <rect x="7" y="4" width="18" height="24" rx="3" fill="currentColor" />
            <rect x="19" y="4" width="3" height="24" fill="var(--highlighter)" />
          </svg>
          <span className="brand__name">Papermill</span>
        </Link>

        <div className="navbar__search">
          <SearchBar />
        </div>

        <nav className="navbar__links" aria-label="Main">
          <NavLink to="/" end className="navbar__link">
            Shop
          </NavLink>
          <NavLink to="/cart" className="navbar__link navbar__cart">
            <CartIcon />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="navbar__badge" aria-label={`${itemCount} items`}>
                {itemCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
