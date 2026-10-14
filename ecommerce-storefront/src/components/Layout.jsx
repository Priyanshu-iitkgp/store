import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="container main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>Papermill</span>
          <span>A demo store built with React. No real orders are placed or charged.</span>
        </div>
      </footer>
    </>
  );
}
