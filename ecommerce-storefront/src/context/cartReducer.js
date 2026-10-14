// Pure reducer for the cart. The cart only stores product ids and quantities;
// names and prices are looked up from the catalog, so they never go stale.

export const MAX_QTY = 10;

export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_QUANTITY: 'SET_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

export const emptyCart = { items: [] }; // items: [{ id, qty }]

const clampQty = (qty) => Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { id, qty = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: clampQty(item.qty + qty) } : item,
          ),
        };
      }
      return { ...state, items: [...state.items, { id, qty: clampQty(qty) }] };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) };

    case CART_ACTIONS.SET_QUANTITY: {
      const { id, qty } = action.payload;
      const nextQty = clampQty(qty);

      if (nextQty === 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((item) => (item.id === id ? { ...item, qty: nextQty } : item)),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return emptyCart;

    default:
      return state;
  }
}
