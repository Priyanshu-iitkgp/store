import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { CloseIcon, SearchIcon } from './Icons';

// Live search. The query lives in the URL (?q=...), so results can be shared,
// bookmarked and restored with the browser's back button.
export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const urlQuery = searchParams.get('q') ?? '';
  const [value, setValue] = useState(urlQuery);
  const debouncedValue = useDebounce(value.trim(), 300);
  const userTyped = useRef(false);

  // Write the debounced text to the URL once the user pauses typing.
  useEffect(() => {
    if (!userTyped.current || debouncedValue === urlQuery) return;

    if (pathname === '/') {
      setSearchParams(
        (params) => {
          const next = new URLSearchParams(params);
          if (debouncedValue) next.set('q', debouncedValue);
          else next.delete('q');
          return next;
        },
        { replace: true },
      );
    } else if (debouncedValue) {
      // Searching from a product or cart page jumps to the shop with results.
      navigate(`/?q=${encodeURIComponent(debouncedValue)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // Keep the input in sync when the URL changes from elsewhere (e.g. "Clear filters").
  useEffect(() => {
    if (urlQuery !== debouncedValue) setValue(urlQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery]);

  const handleChange = (event) => {
    userTyped.current = true;
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = value.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
  };

  const handleClear = () => {
    userTyped.current = true;
    setValue('');
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <SearchIcon className="search__icon" />
      <label htmlFor="site-search" className="visually-hidden">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        className="search__input"
        placeholder="Search notebooks, pens, lamps…"
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="search__clear" onClick={handleClear} aria-label="Clear search">
          <CloseIcon width={16} height={16} />
        </button>
      )}
    </form>
  );
}
