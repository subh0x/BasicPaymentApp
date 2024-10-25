import UserCard from "./UserCard";

export default function Users() {
  return (
    <div className="px-4">
      <div className="pb-2 text-lg font-bold text-black">Users</div>
      <input
        placeholder="Search users..."
        className="w-full rounded border border-slate-200 px-2 py-1"
      ></input>
      <UserCard />
    </div>
  );
}
