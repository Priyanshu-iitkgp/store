export default function Rating({ value, count }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5 from ${count} reviews`}>
      <span className="rating__star" aria-hidden="true">★</span>
      <span aria-hidden="true">
        {value.toFixed(1)} <span className="rating__count">({count})</span>
      </span>
    </span>
  );
}
