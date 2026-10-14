import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import QuantityStepper from '../components/QuantityStepper';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { MAX_QTY } from '../context/cartReducer';
import { getCategoryName, getProductById, PRODUCTS } from '../data/products';
import { formatPrice, FREE_SHIPPING_FROM } from '../utils/format';
import NotFoundPage from './NotFoundPage';
import '../styles/product.css';

export default function ProductPage() {
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product) return <NotFoundPage message="We couldn't find that product. It may have been removed." />;

  // `key` resets the quantity picker when moving between products.
  return <ProductDetails key={product.id} product={product} />;
}

function ProductDetails({ product }) {
  const { addItem, getQuantity } = useCart();
  const showToast = useToast();
  const [qty, setQty] = useState(1);

  const inCart = getQuantity(product.id);
  const canAdd = MAX_QTY - inCart;
  const categoryName = getCategoryName(product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    showToast(`Added ${qty} × ${product.name} to your cart`, { to: '/cart', label: 'View cart' });
    setQty(1);
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/?category=${product.category}`}>{categoryName}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product">
        <ProductArt art={product.art} label={product.name} className="product__art" />

        <div className="product__info">
          <h1 className="product__name">{product.name}</h1>
          <Rating value={product.rating} count={product.reviews} />
          <p className="product__price price">{formatPrice(product.price)}</p>
          <p className="product__description">{product.description}</p>

          <div className="product__buy">
            {canAdd > 0 ? (
              <>
                <QuantityStepper value={qty} onChange={setQty} max={canAdd} />
                <button type="button" className="btn btn--large" onClick={handleAdd}>
                  Add to cart
                </button>
              </>
            ) : (
              <p className="notice">You have the maximum of {MAX_QTY} in your cart.</p>
            )}
          </div>
          {inCart > 0 && (
            <p className="product__in-cart">
              {inCart} already in your cart. <Link to="/cart">View cart</Link>
            </p>
          )}

          <h2 className="product__subhead">Details</h2>
          <ul className="product__details">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <p className="product__delivery">
            Free delivery on orders over {formatPrice(FREE_SHIPPING_FROM)}. Returns accepted within 14 days.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related">
          <h2 className="related__title">More in {categoryName}</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
