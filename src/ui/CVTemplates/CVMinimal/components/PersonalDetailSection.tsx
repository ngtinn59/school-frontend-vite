import {
  faEnvelope,
  faGift,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../../../components/Title";
import { UserInformationType } from "../../../../utils/type/profileType";

type Props = {
  userInformation: UserInformationType;
  templateColor: string;
};
export default function PersonalDetailSection({
  userInformation,
  templateColor,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        PERSONAL DETAILS
      </Title>
      <div className="flex flex-col flex-nowrap gap-1 ">
        <div className="flex flex-row gap-2 flex-nowrap">
          <span className="text-base  items-center">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className="text-base  line-clamp-1">
            {userInformation.email}
          </span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base ">
            <FontAwesomeIcon icon={faPhone} />
          </span>
          <span className="text-base  line-clamp-1">
            {userInformation.phone}
          </span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base ">
            <FontAwesomeIcon icon={faGift} />
          </span>
          <span className="text-base  line-clamp-1">
            {userInformation.birthday}
          </span>
        </div>

        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base ">
            <FontAwesomeIcon icon={faLocation} />
          </span>
          {userInformation.location && (
            <span className="text-base  line-clamp-1">
              {userInformation.location}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
