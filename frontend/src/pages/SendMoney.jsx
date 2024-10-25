import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

const SendMoney = () => {
  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="flex h-max w-96 flex-col items-center rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Send Money"} />
          <div className="my-4 flex items-baseline space-x-2">
            <div className="flex h-12 w-12 justify-center rounded-full bg-green-400">
              <div className="flex flex-col justify-center text-xl text-white">
                SG
              </div>
            </div>
            <div className="py-2 font-semibold">Subhrajit G</div>
          </div>
          <div className="w-full">
            <InputBox
              label={"Amount (in Rs.)"}
              placeholder={"Enter Amount"}
              type={"number"}
            />
            <div className="pt-4">
              <Button
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
