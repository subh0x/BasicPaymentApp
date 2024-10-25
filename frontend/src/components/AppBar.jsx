export default function AppBar() { 
  return (
    <div className="flex items-center justify-between border-b-2 px-4 py-4">
      <div className="text-2xl font-bold text-black">Payments App</div>
      <div className="flex flex-row items-center space-x-2">
        <div className="font-mediumn text-black">Hello, User</div>
        <div className="flex h-12 w-12 justify-center rounded-full bg-slate-200">
          <div className="flex flex-col justify-center text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
