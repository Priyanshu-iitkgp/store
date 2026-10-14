// Wraps every match of `query` inside `text` in <mark>, so live search shows why a product matched.
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function Highlight({ text, query = '' }) {
  const needle = query.trim();
  if (!needle) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === needle.toLowerCase() ? <mark key={i}>{part}</mark> : part,
      )}
    </>
  );
}
