import axios from "axios";
import { useEffect, useState } from "react";
import Users from "../components/Users";
import AppBar from "../components/AppBar";
import UserBalance from "../components/UserBalance";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  // const [regUser, setRegUser] = useState()
  const getToken = () => localStorage.getItem("token");

  const getAuthorizationHeader = () => `Bearer ${getToken()}`;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: { Authorization: getAuthorizationHeader() },
      })
      .then((Response) => {
        setBalance(Response.data.accountBalance.toFixed(2));
      });
  }, []);

  return (
    <>
      <AppBar /> {/*  registeredUser={regUser} */}
      <UserBalance balance={balance} />
      <Users />
    </>
  );
};

export default Dashboard;
