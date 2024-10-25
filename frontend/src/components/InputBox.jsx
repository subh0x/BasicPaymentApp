export default function InputBox({ label, placeholder, type, onChange }) {
  return (
    <div>
      <div className="py-2 text-left text-sm font-medium">{label}</div>
      <div>
        <input
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full rounded border border-slate-200 px-2 py-1"
        ></input>
      </div>
    </div>
  );
}
