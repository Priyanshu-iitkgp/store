import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { MAX_QTY } from '../context/cartReducer';
import { getCategoryName } from '../data/products';
import { formatPrice } from '../utils/format';
import ProductArt from './ProductArt';
import Highlight from './Highlight';
import Rating from './Rating';
import '../styles/product-card.css';

export default function ProductCard({ product, query = '' }) {
  const { addItem, getQuantity } = useCart();
  const showToast = useToast();
  const inCart = getQuantity(product.id);
  const atLimit = inCart >= MAX_QTY;

  const handleAdd = () => {
    addItem(product.id);
    showToast(`Added ${product.name} to your cart`, { to: '/cart', label: 'View cart' });
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <ProductArt art={product.art} label={product.name} className="product-card__art" />
        <h3 className="product-card__name">
          <Highlight text={product.name} query={query} />
        </h3>
      </Link>
      <p className="product-card__meta">
        {getCategoryName(product.category)}
        <Rating value={product.rating} count={product.reviews} />
      </p>
      <div className="product-card__footer">
        <span className="price">{formatPrice(product.price)}</span>
        <button type="button" className="btn btn--small" onClick={handleAdd} disabled={atLimit}>
          {atLimit ? 'Limit reached' : 'Add to cart'}
        </button>
      </div>
      {inCart > 0 && <p className="product-card__in-cart">{inCart} in your cart</p>}
    </article>
  );
}
