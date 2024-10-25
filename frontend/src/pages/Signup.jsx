import axios from "axios";
import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex h-screen justify-center bg-black">
      <div className="flex flex-col justify-center">
        <div className="h-max w-auto rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={"Sign Up"} />
          <SubHeading
            description={"Enter your information to create an account"}
          />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"john"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"doe"}
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
            placeholder={"123456"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                  },
                );

                // Store token to Local Storage
                localStorage.setItem("token", response.data.token);

                if (response.data.token) {
                  navigate("/dashboard");
                }
              }}
              className="w-full bg-black"
              label={"Sign Up"}
            />
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
