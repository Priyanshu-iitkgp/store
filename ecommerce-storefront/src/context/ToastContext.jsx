import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/toast.css';

const ToastContext = createContext(null);
const TOAST_DURATION = 3200;

// A single toast slot: a new message replaces the old one instead of stacking.
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // { id, message, link? }
  const timer = useRef(null);

  const showToast = useCallback((message, link) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message, link });
    timer.current = setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className="toast" key={toast.id}>
            <span>{toast.message}</span>
            {toast.link && (
              <Link to={toast.link.to} className="toast__link" onClick={() => setToast(null)}>
                {toast.link.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
}
