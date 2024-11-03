import {
  faEnvelope,
  faGift,
  faGlobe,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../../../components/Title";
import { UserInformationType } from "../../../../utils/type/profileType";

type Props = {
  userInformation: UserInformationType;
};

export default function PersonalDetailSection({ userInformation }: Props) {
  return (
    <div className="flex flex-col gap-1.5 pb-28 text-white">
      <div className="z-10">
        <Title type="h2" className="	font-semibold">
          {userInformation.name}
        </Title>
        <Title type="h5" className="font-normal	">
          {userInformation.title}
        </Title>
      </div>
      <div className="flex flex-col flex-nowrap gap-1 ">
        <div className="flex flex-row gap-2 flex-nowrap">
          <span className="text-sm  items-center">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className="text-sm  line-clamp-1">{userInformation.email}</span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-sm ">
            <FontAwesomeIcon icon={faPhone} />
          </span>
          <span className="text-sm  line-clamp-1">{userInformation.phone}</span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-sm ">
            <FontAwesomeIcon icon={faGift} />
          </span>
          <span className="text-sm  line-clamp-1">
            {userInformation.birthday}
          </span>
        </div>

        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-sm ">
            <FontAwesomeIcon icon={faLocation} />
          </span>
          {userInformation.location && (
            <span className="text-sm  line-clamp-1">
              {userInformation.location}
            </span>
          )}
        </div>

        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-sm ">
            <FontAwesomeIcon icon={faGlobe} />
          </span>
          {userInformation.website && (
            <a
              className="text-sm  line-clamp-1 max-w-[200px]"
              href={userInformation.website}
            >
              {userInformation.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
