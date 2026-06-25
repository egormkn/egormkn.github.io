import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <div className="flex flex-col grow items-center justify-center">
      <FontAwesomeIcon icon={faTriangleExclamation} className="text-warning" size="xl" />
      <div>Under construction</div>
    </div>
  );
}
