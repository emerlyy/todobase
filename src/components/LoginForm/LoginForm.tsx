import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUser } from "../../store/user/userSlice";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

const loginFormSchema = z.object({
  email: z.email({ message: "Error format" }),
  password: z
    .string()
    .min(1, { message: "Required" })
    .min(5, { message: "Too short" }),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

type FormInput = {
  id: keyof LoginFormInputs;
  label: string;
  placeholder: string;
};

const formInputs: FormInput[] = [
  {
    id: "email",
    label: "Email",
    placeholder: "test@gmail.com",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "strongpassword",
  },
];

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginFormSchema) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const { user } = await doSignInWithEmailAndPassword(
      data.email,
      data.password
    );
    if (!user.email) return;

    const token = await user.getIdToken();

    dispatch(
      setUser({
        email: user.email,
        id: user.uid,
        displayName: user.displayName || "",
        token: token,
      })
    );
    navigate("/");
  };

  const dispatch = useAppDispatch();

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      linkPath="/register"
      linkTitle="Go to register"
    >
      {formInputs.map((input) => (
        <Input
          key={input.id}
          {...register(input.id)}
          label={input.label}
          placeholder={input.placeholder}
          errorMessage={errors[input.id]?.message}
        />
      ))}
    </AuthForm>
  );
};

export default LoginForm;
