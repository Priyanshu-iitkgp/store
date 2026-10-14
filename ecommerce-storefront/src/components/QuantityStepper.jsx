import { MAX_QTY } from '../context/cartReducer';
import { MinusIcon, PlusIcon } from './Icons';

export default function QuantityStepper({ value, onChange, min = 1, max = MAX_QTY, label = 'Quantity' }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon width={16} height={16} />
      </button>
      <output className="stepper__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}
