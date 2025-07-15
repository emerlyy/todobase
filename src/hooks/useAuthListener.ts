import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setUser, removeUser } from "../store/user/userSlice";

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email || "",
            token: user.refreshToken,
            displayName: user.displayName || "",
            id: user.uid,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};