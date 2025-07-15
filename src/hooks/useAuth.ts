import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { email, token, id, isAuthLoading, displayName } = useAppSelector(
    (state) => state.user
  );

  return {
    isAuth: !!email,
    email,
    token,
    displayName,
    id,
    isAuthLoading,
  };
};
