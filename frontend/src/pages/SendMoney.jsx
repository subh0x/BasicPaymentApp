import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();

  const destId = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="flex h-max w-96 flex-col items-center rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Send Money"} />
          <div className="my-4 flex items-baseline space-x-2">
            <div className="flex h-12 w-12 justify-center rounded-full bg-green-400">
              <div className="flex flex-col justify-center text-xl text-white">
                {name[0]}
              </div>
            </div>
            <div className="py-2 font-semibold">{name}</div>
          </div>
          <div className="w-full">
            <InputBox
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              label={"Amount (in Rs.)"}
              placeholder={"Enter Amount"}
              type={"number"}
            />
            <div className="pt-4">
              <Button
                onClick={() => {
                  axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      to: destId,
                      amount: Number(amount),
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    },
                  );

                  //TODO: Alert the user Transaction Successfull if Success
                  navigate("/dashboard");
                }}
                className="w-full bg-green-400"
                label={"Initiate Transfer"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
