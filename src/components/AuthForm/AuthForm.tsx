import { type FormHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router";
import Button from "../Button/Button";

type Props = {
  title: string;
  linkTitle: string;
  linkPath: string;
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

const AuthForm = ({ title, linkTitle, linkPath, children, ...rest }: Props) => {
  return (
    <form
      className="p-3 border border-slate-500 rounded-xl flex flex-col gap-4 min-w-[400px]"
      {...rest}
    >
      <h1 className="font-medium text-2xl text-center">{title}</h1>
      <div className="flex flex-col gap-2">{children}</div>
      <Button>Submit</Button>
      <Link to={linkPath} className="text-sm hover:underline">
        {linkTitle}
      </Link>
    </form>
  );
};

export default AuthForm;
