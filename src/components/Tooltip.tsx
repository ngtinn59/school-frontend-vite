import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = { text: string };

export default function Tooltip({ text }: Props) {
  return (
    <span className="group relative z-20 flex justify-center items-center">
      <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] -translate-x-[50%] hidden group-hover:block w-auto">
        <div className=" bottom-full  right-0 rounded bg-normal p-3 text-base text-white ">
          {text}
          <svg
            className="absolute left-0 top-full h-2 w-full text-black"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
      <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-400 " />
    </span>
  );
}
