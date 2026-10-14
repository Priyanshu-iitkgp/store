import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { CART_ACTIONS, cartReducer, emptyCart, MAX_QTY } from './cartReducer';
import { getProductById } from '../data/products';
import { getShipping } from '../utils/format';

const STORAGE_KEY = 'papermill-cart-v1';

const CartContext = createContext(null);

// Read the saved cart once, when the provider mounts.
// Anything malformed or unknown is dropped instead of crashing the app.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.items)) return emptyCart;

    const items = saved.items
      .filter((item) => getProductById(item?.id) && Number.isInteger(item.qty) && item.qty > 0)
      .map((item) => ({ id: item.id, qty: Math.min(item.qty, MAX_QTY) }));

    return { items };
  } catch {
    return emptyCart;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Persist every change so the cart survives refreshes and new sessions.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be full or blocked (e.g. private mode). The cart still works in memory.
    }
  }, [state]);

  const addItem = useCallback(
    (id, qty = 1) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { id, qty } }),
    [],
  );
  const removeItem = useCallback(
    (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } }),
    [],
  );
  const setQuantity = useCallback(
    (id, qty) => dispatch({ type: CART_ACTIONS.SET_QUANTITY, payload: { id, qty } }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: CART_ACTIONS.CLEAR_CART }), []);

  // Join cart lines with catalog data and derive totals in one place.
  const value = useMemo(() => {
    const items = state.items
      .map((line) => {
        const product = getProductById(line.id);
        return product ? { ...line, product, lineTotal: product.price * line.qty } : null;
      })
      .filter(Boolean);

    const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = getShipping(subtotal);

    return {
      items,
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      getQuantity: (id) => state.items.find((item) => item.id === id)?.qty ?? 0,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [state, addItem, removeItem, setQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
}
