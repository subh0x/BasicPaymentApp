export default function UserBalance({ balance = 0 }) {
  return (
    <div className="flex items-center justify-start px-4 py-4">
      <div className="pr-2 text-lg font-bold text-black">Your Balance</div>
      <div className="text-lg font-semibold text-gray-900">Rs.{balance}</div>
    </div>
  );
}
