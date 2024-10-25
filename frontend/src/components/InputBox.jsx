export default function InputBox({ label, placeholder }) {
  return (
    <div>
      <div className="py-2 text-left text-sm font-medium">{label}</div>
      <div>
        <input
          placeholder={placeholder}
          className="w-full rounded border border-slate-200 px-2 py-1"
        ></input>
      </div>
    </div>
  );
}
