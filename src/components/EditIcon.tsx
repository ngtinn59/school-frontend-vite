import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = { className?: string };

export default function EditIcon({ className }: Props) {
  return (
    <span className={` text-primary cursor-pointer ${className}`}>
      <FontAwesomeIcon icon={faEdit} />
    </span>
  );
}
