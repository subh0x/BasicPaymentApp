export default function Button({ label, className="" }) {
  return (
    <button
      type="button"
      className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white ${className}`}
    >
      {label}
    </button>
  );
}
