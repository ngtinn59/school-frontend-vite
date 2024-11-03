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
};
export default function PersonalDetailSection({ userInformation }: Props) {
  return (
    <div className=" bg-slate-500 p-6 relative">
      <div className="flex gap-6 flex-col md:flex-row items-center md:items-start">
        <div>
          <div
            className="bg-cover bg-center bg-no-repeat  relative block w-full p-16"
            style={{
              backgroundImage: `url(${userInformation.image_url})`,
              height: "120px",
              width: "120px",
            }}
          ></div>
        </div>
        <div className="gap-2 flex flex-col w-full flex-1">
          <div>
            <Title type="h2" className="text-center md:text-start text-white">
              {userInformation.name}
            </Title>
            <Title
              type="h4"
              className="text-white text-center md:text-start font-normal"
            >
              {userInformation.title}
            </Title>
          </div>

          <div className="sm:grid-cols-2 sm:grid-rows-2 grid grid-cols-1  gap-y-2 ">
            <div className="flex flex-row gap-2 flex-nowrap">
              <span className="text-base text-white items-center">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span className="text-base text-white line-clamp-1">
                {userInformation.email}
              </span>
            </div>
            <div className="flex flex-row gap-2 flex-nowrap items-center">
              <span className="text-base text-white">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span className="text-base text-white line-clamp-1">
                {userInformation.phone}
              </span>
            </div>
            <div className="flex flex-row gap-2 flex-nowrap items-center">
              <span className="text-base text-white">
                <FontAwesomeIcon icon={faGift} />
              </span>
              <span className="text-base text-white line-clamp-1">
                {userInformation.birthday}
              </span>
            </div>

            <div className="flex flex-row gap-2 flex-nowrap items-center">
              <span className="text-base text-white">
                <FontAwesomeIcon icon={faLocation} />
              </span>
              {userInformation.location && (
                <span className="text-base text-white line-clamp-1">
                  {userInformation.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <EditIcon className="absolute right-4 top-4 text-sm" /> */}
    </div>
  );
}
