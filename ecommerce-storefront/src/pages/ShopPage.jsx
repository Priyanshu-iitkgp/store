import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRICE_LIMITS, PRODUCTS } from '../data/products';
import { formatPrice, FREE_SHIPPING_FROM, pluralize } from '../utils/format';
import '../styles/shop.css';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'name', label: 'Name: A to Z' },
];

const SORTERS = {
  featured: () => 0, // keep catalog order
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  name: (a, b) => a.name.localeCompare(b.name),
};

const SLIDER_MIN = Math.floor(PRICE_LIMITS.min / 100) * 100;
const SLIDER_MAX = Math.ceil(PRICE_LIMITS.max / 100) * 100;

const matchesQuery = (product, query) => {
  if (!query) return true;
  const haystack = [product.name, product.category, product.description, ...product.tags]
    .join(' ')
    .toLowerCase();
  // Every word must match, so "blue ink" finds the royal blue ink.
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // All filter state is read from the URL.
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? 'all';
  const sort = SORTERS[searchParams.get('sort')] ? searchParams.get('sort') : 'featured';
  const maxPrice = Number(searchParams.get('max')) || SLIDER_MAX;

  const updateParam = (key, value, defaultValue) => {
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params);
        if (value === defaultValue || value === '') next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };

  // Products matching search + price, before the category filter.
  // Used for the counts next to each category.
  const searchAndPriceMatches = useMemo(
    () => PRODUCTS.filter((p) => matchesQuery(p, query) && p.price <= maxPrice),
    [query, maxPrice],
  );

  const visibleProducts = useMemo(() => {
    const inCategory =
      category === 'all'
        ? searchAndPriceMatches
        : searchAndPriceMatches.filter((p) => p.category === category);
    return [...inCategory].sort(SORTERS[sort]);
  }, [searchAndPriceMatches, category, sort]);

  const countFor = (categoryId) =>
    categoryId === 'all'
      ? searchAndPriceMatches.length
      : searchAndPriceMatches.filter((p) => p.category === categoryId).length;

  const hasFilters = query || category !== 'all' || maxPrice < SLIDER_MAX || sort !== 'featured';
  const clearFilters = () => setSearchParams({}, { replace: true });

  return (
    <div className="shop">
      <section className="shop__intro">
        <h1 className="shop__title">Paper, pens and desk things for people who still write by hand.</h1>
        <p className="shop__lede">
          Free delivery on orders over {formatPrice(FREE_SHIPPING_FROM)}. Orders ship within 2 working days.
        </p>
      </section>

      <nav className="categories" aria-label="Categories">
        {[{ id: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
          <button
            key={c.id}
            type="button"
            className="category"
            aria-pressed={category === c.id}
            onClick={() => updateParam('category', c.id, 'all')}
          >
            <span className="category__name">{c.name}</span>
            <span className="category__count">{countFor(c.id)}</span>
          </button>
        ))}
      </nav>

      <div className="toolbar">
        <p className="toolbar__count" aria-live="polite">
          {pluralize(visibleProducts.length, 'product')}
          {query && <> matching “{query}”</>}
        </p>

        <div className="toolbar__controls">
          <label className="field field--inline">
            <span className="field__label">Max price</span>
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={100}
              value={maxPrice}
              onChange={(e) => updateParam('max', e.target.value, String(SLIDER_MAX))}
            />
            <span className="toolbar__price">
              {maxPrice >= SLIDER_MAX ? 'Any' : `Up to ${formatPrice(maxPrice)}`}
            </span>
          </label>

          <label className="field field--inline">
            <span className="field__label">Sort by</span>
            <select
              className="select"
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value, 'featured')}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {hasFilters && (
            <button type="button" className="btn btn--ghost btn--small" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} query={query} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No products match these filters</h2>
          <p>Try a different word, raise the max price or pick another category.</p>
          <button type="button" className="btn" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
