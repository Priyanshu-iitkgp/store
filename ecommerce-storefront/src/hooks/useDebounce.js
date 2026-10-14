import { useEffect, useState } from 'react';

// Returns `value` only after it has stopped changing for `delay` ms.
// Used by the live search so the product list doesn't re-filter on every keystroke.
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
