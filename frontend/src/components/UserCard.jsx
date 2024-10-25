import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function UserCard({ userData }) {
  const navigate = useNavigate();
  return (
    <div className="pt-4">
      <div className="flex w-40 flex-col items-center rounded-lg border-2 p-2 px-4 text-center">
        <div className="flex h-12 w-12 justify-center rounded-full bg-slate-200">
          <div className="flex flex-col justify-center text-xl">
            {userData.firstname[0] + userData.lastname[0]}
          </div>
        </div>
        <div className="py-2 font-semibold">
          {userData.firstname + " " + userData.lastname[0]}
        </div>
        <Button
          onClick={() => {
            navigate("/send?id=" + userData._id +"&name="+ userData.firstname);
          }}
          className="w-auto bg-black"
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
