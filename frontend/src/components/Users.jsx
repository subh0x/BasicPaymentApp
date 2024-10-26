import axios from "axios";
import Button from "./Button";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk/?filter=${searchFilter}`)
      .then((Response) => {
        setUsers(Response.data.user);
      });
  }, [searchFilter]);

  return (
    <div className="px-4">
      <div className="pb-2 text-lg font-bold text-black">Users</div>
      <div className="flex w-full space-x-2">
        <input
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
          placeholder="Search users..."
          className="w-full rounded border border-slate-200 px-2 py-1"
        ></input>
      </div>
      <div className="grid grid-cols-2 place-content-around px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {users.map((user) => (
          <UserCard key={user._id} userData={user} />
        ))}
      </div>
    </div>
  );
}
