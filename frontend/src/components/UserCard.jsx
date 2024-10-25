import Button from "./Button";

export default function UserCard({ username = "Subhrajit" }) {
  return (
    <div className="pt-4">
      <div className="flex w-44 flex-col items-center rounded-lg border-2 p-2 px-4 text-center">
        <div className="flex h-12 w-12 justify-center rounded-full bg-slate-200">
          <div className="flex flex-col justify-center text-xl">SG</div>
        </div>
        <div className="py-2 font-semibold">{username}</div>
        <Button className="w-auto bg-black" label={"Send Money"} />
      </div>
    </div>
  );
}
