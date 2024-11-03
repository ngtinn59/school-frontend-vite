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
  aboutMe: string;
};

export default function AboutMeSection({
  userInformation,
  templateColor,
  aboutMe,
}: Props) {
  return (
    <div className="gap-2 flex flex-col">
      <div className="z-20 flex flex-col gap-2">
        <Title
          type="h2"
          className={`md:text-start text-cv_color_red !text-${templateColor}`}
        >
          {userInformation.name}
        </Title>
        <Title type="h4" className="text-bold md:text-start font-normal">
          {userInformation.title}
        </Title>
      </div>

      <div className="sm:grid-cols-2 sm:grid-rows-2 grid grid-cols-1  gap-y-2 z-20">
        <div className="flex flex-row gap-2 flex-nowrap">
          <span className="text-base text-bold items-center">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <span className="text-base text-bold line-clamp-1">
            {userInformation.email}
          </span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base text-bold">
            <FontAwesomeIcon icon={faPhone} />
          </span>
          <span className="text-base text-bold line-clamp-1">
            {userInformation.phone}
          </span>
        </div>
        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base text-bold">
            <FontAwesomeIcon icon={faGift} />
          </span>
          <span className="text-base text-bold line-clamp-1">
            {userInformation.birthday}
          </span>
        </div>

        <div className="flex flex-row gap-2 flex-nowrap items-center">
          <span className="text-base text-bold">
            <FontAwesomeIcon icon={faLocation} />
          </span>
          {userInformation.location && (
            <span className="text-base text-bold line-clamp-1">
              {userInformation.location}
            </span>
          )}
        </div>
      </div>

      <p className="text-bold col-span-10 text-base">{aboutMe}</p>
    </div>
  );
}
