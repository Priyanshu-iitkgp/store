# Papermill: E-Commerce Storefront

A multi-page stationery store built with **React** and **React Router**. Browse products, filter and sort them, search as you type, manage a cart that survives page reloads, and check out with a validated form.

## Features

- **Multi-page routing** with React Router: shop, product details, cart, checkout, order confirmation and a 404 page.
- **Global cart state** with the Context API and `useReducer`. The cart is saved to `localStorage`, so it persists across browser sessions.
- **Live search** with a debounced input. Matching text is highlighted in the results.
- **Category filters, price sorting and a max-price slider.** All filters live in the URL (`/?category=pens&sort=price-asc&q=ink`), so results can be shared and the back button works.
- **Checkout form validation** for name, email, Indian mobile number, PIN code and UPI ID, with accessible error messages.
- **Mobile-first responsive UI** built with CSS Flexbox and Grid. No UI framework.
- **Product illustrations drawn as inline SVG**, so the app needs no image files and every product is coloured from its data.

## Tech stack

React 18, React Router 6, Vite, plain CSS (Flexbox and Grid).

## Getting started

You need [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the dev server with hot reload     |
| `npm run build`   | Builds the production site into `dist/`   |
| `npm run preview` | Serves the production build locally       |

## Project structure

```
src/
├── main.jsx                 App entry: router, cart and toast providers
├── App.jsx                  Route definitions
├── data/products.js         Product catalog and categories
├── context/
│   ├── cartReducer.js       Pure reducer: add, remove, set quantity, clear
│   ├── CartContext.jsx      Provider, localStorage persistence, derived totals
│   └── ToastContext.jsx     "Added to cart" notifications
├── hooks/useDebounce.js     Debounce for live search
├── utils/format.js          Price formatting (₹) and delivery rules
├── components/              Navbar, SearchBar, ProductCard, ProductArt, OrderSummary, ...
├── pages/                   ShopPage, ProductPage, CartPage, CheckoutPage, ...
└── styles/                  One CSS file per area, mobile-first
```

## How the cart works

`cartReducer.js` is a pure function that only stores `{ id, qty }` for each line. `CartContext.jsx` joins those lines with the catalog to get names and prices, then derives the item count, subtotal, delivery fee and total in one `useMemo`. Every state change is written to `localStorage`. On load, the saved cart is validated, so a corrupted or outdated entry can't crash the app.

## Deployment

The app uses browser routing, so the host must send every path to `index.html`. Config for both common hosts is included:

- **Vercel**: `vercel.json` (import the repo, no other settings needed)
- **Netlify**: `public/_redirects` (build command `npm run build`, publish directory `dist`)

## Note

This is a demo store. No real orders are placed and no payments are taken.
