import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";

const Signup = () => {
  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="h-max w-auto rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Sign Up"} />
          <SubHeading
            description={"Enter your information to create an account"}
          />
          <InputBox label={"First Name"} placeholder={"john"} />
          <InputBox label={"Last Name"} placeholder={"doe"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-4">
            <Button className="w-full bg-black" label={"Sign Up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
