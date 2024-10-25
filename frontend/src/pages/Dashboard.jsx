import Users from "../components/Users";
import AppBar from "../components/AppBar";
import UserBalance from "../components/UserBalance";

const Dashboard = () => {
    return (
        <>
        <AppBar />
        <UserBalance />
        <Users />
        </>
    );
};

export default Dashboard;