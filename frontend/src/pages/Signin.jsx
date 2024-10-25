import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="h-max w-auto rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Sign In"} />
          <SubHeading
            description={"Enter your credentials to access your account"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  email: email,
                  password: password,
                });

                localStorage.setItem("token", response.data.token);

                if (response.data.token) {
                  window.location = "/dashboard";
                }
              }}
              className="w-full bg-black"
              label={"Sign In"}
            />
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
