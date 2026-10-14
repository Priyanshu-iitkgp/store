import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import '../styles/checkout.css';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  payment: 'upi',
  upiId: '',
};

// Returns { fieldName: 'message' } for every invalid field.
function validate(values) {
  const errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Enter an email like name@example.com.';
  if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.';
  if (values.address.trim().length < 8) errors.address = 'Enter your house number, street and area.';
  if (values.city.trim().length < 2) errors.city = 'Enter your city.';
  if (!/^[1-9]\d{5}$/.test(values.pincode.trim())) errors.pincode = 'Enter a 6-digit PIN code.';
  if (values.payment === 'upi' && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(values.upiId.trim()))
    errors.upiId = 'Enter a UPI ID like name@okbank.';
  return errors;
}

const FIELD_ORDER = ['fullName', 'email', 'phone', 'address', 'city', 'pincode', 'upiId'];

export default function CheckoutPage() {
  const { items, itemCount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [placing, setPlacing] = useState(false);

  if (items.length === 0 && !placing) return <Navigate to="/cart" replace />;

  const errors = validate(values);
  const showError = (name) => (touched[name] || submitAttempted) && errors[name];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const firstInvalid = FIELD_ORDER.find((name) => errors[name]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    // Simulate a network request to an orders API.
    setPlacing(true);
    setTimeout(() => {
      const order = {
        id: `PM-${Date.now().toString(36).toUpperCase()}`,
        name: values.fullName.trim().split(' ')[0],
        total,
        itemCount,
        payment: values.payment,
      };
      navigate('/order-confirmed', { replace: true, state: { order } });
      clearCart();
    }, 900);
  };

  // Small helper so every field gets the same label, error and aria wiring.
  const field = (name, label, props = {}) => (
    <div className={`form-field ${props.wide ? 'form-field--wide' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(showError(name))}
        aria-describedby={showError(name) ? `${name}-error` : undefined}
        type={props.type ?? 'text'}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        placeholder={props.placeholder}
      />
      {showError(name) && (
        <p className="form-field__error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="checkout">
      <div className="page-head">
        <h1>Checkout</h1>
        <Link to="/cart" className="page-head__meta">
          Back to cart
        </Link>
      </div>

      <div className="checkout__layout">
        <form ref={formRef} className="checkout__form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Contact</legend>
            <div className="form-grid">
              {field('fullName', 'Full name', { autoComplete: 'name', wide: true })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
              {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', inputMode: 'numeric' })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Delivery address</legend>
            <div className="form-grid">
              {field('address', 'House number, street and area', { autoComplete: 'street-address', wide: true })}
              {field('city', 'City', { autoComplete: 'address-level2' })}
              {field('pincode', 'PIN code', { autoComplete: 'postal-code', inputMode: 'numeric' })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={values.payment === 'upi'}
                  onChange={handleChange}
                />
                <span>
                  <strong>UPI</strong>
                  <span className="payment-option__hint">Pay with any UPI app</span>
                </span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={values.payment === 'cod'}
                  onChange={handleChange}
                />
                <span>
                  <strong>Cash on delivery</strong>
                  <span className="payment-option__hint">Pay when your order arrives</span>
                </span>
              </label>
            </div>
            {values.payment === 'upi' && (
              <div className="form-grid">{field('upiId', 'UPI ID', { placeholder: 'name@okbank', wide: true })}</div>
            )}
          </fieldset>

          <button type="submit" className="btn btn--large btn--block" disabled={placing}>
            {placing ? 'Placing order…' : `Place order, ${formatPrice(total)}`}
          </button>
        </form>

        <OrderSummary showItems />
      </div>
    </div>
  );
}
