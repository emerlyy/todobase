import { Link } from "react-router";
import type { List } from "../../types";

type Props = Pick<List, "id"  | "title">;

const ListCard = ({ id,  title }: Props) => {
  return (
    <Link
      to={`/${id}`}
      className="block px-4 py-2 rounded-md cursor-pointer border border-slate-200 bg-gray-50 hover:bg-gray-200"
    >
      <h2 className="font-medium text-xl">{title}</h2>
    </Link>
  );
};

export default ListCard;
