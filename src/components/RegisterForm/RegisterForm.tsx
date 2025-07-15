import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUser } from "../../store/user/userSlice";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

const registerFormSchema = z.object({
  displayName: z.string().min(1, { message: "Required" }),
  email: z.email({ message: "Error format" }),
  password: z
    .string()
    .min(1, { message: "Required" })
    .min(5, { message: "Too short" }),
});

type RegisterFormInputs = {
  displayName: string;
  email: string;
  password: string;
};

type FormInput = {
  id: keyof RegisterFormInputs;
  label: string;
  placeholder: string;
};

const formInputs: FormInput[] = [
  { id: "displayName", label: "Name", placeholder: "John" },
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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { user } = await doCreateUserWithEmailAndPassword(
      data.email,
      data.password
    );
    if (!user.email) return;

    const token = await user.getIdToken();

    await updateProfile(user, {
      displayName: data.displayName,
    });

    dispatch(
      setUser({
        email: user.email,
        id: user.uid,
        displayName: data.displayName,
        token,
      })
    );
    navigate("/");
  };

  const dispatch = useAppDispatch();

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      linkPath="/login"
      linkTitle="Go to login"
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

export default RegisterForm;
