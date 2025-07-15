import { useAppDispatch } from "../../hooks/reduxHooks";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/user/userSlice";
import Button from "../Button/Button";

const Header = () => {
  const { displayName } = useAuth();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <header className="h-16 flex justify-end border-b border-slate-200 px-2 shrink-0">
      <div className="flex items-center gap-2">
        <span>{displayName}</span>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
