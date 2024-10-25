import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";

const Signin = () => {
  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="h-max w-auto rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Sign In"} />
          <SubHeading
            description={"Enter your credentials to access your account"}
          />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-4">
            <Button className="w-full bg-black" label={"Sign In"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
