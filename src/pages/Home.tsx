import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import UserLists from "../components/UserLists/UserLists";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { id } = useAuth();

  if (!id) return;

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex justify-between grow">
        <UserLists userId={id} />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
