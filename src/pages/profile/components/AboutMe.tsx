import { useDispatch, useSelector } from "react-redux";
import profile_about_me_icon from "../../../assets/profile_about_me.svg";
import EditIcon from "../../../components/EditIcon";
import Modal from "../../../components/Modal";
import TextArea from "../../../components/TextArea";
import { getUserProfile, updateUserProfile } from "../../../services/redux/user";
import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import { updateAboutMeApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";

type Props = {
  aboutMe: {
    description: string;
    id: number;
  };
};

export default function AboutMe({ aboutMe }: Props) {
  const dispatch = useDispatch();
  const userProfile = useSelector(getUserProfile);

  const handleEditAboutMe = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
  ) => {
    if (e) {
      console.log(e.target.value, "about me");
      dispatch(
        updateUserProfile({
          ...userProfile,
          aboutMe: { description: e.target.value },
        })
      );
    }
  };
  const handleSaveAboutMe = () => {
    updateAboutMeApi(userProfile.aboutMe.description)
      .then((res) => {
        if (res.status_code === 200) toast.success("About me updated successfully");
        else toast.error("Failed to update about me");
      })
      .catch((err) => toast.error("Failed to update about me: " + err));
  };
  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.aboutMe.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.aboutMe.description}
      icon={profile_about_me_icon}>
      <div>
        <p>{userProfile?.aboutMe?.description}</p>
        <Modal
          title={PROFILE_DATA_CATEGORY.aboutMe.title}
          handleSave={handleSaveAboutMe}
          buttonContent={<EditIcon className="text-lg  " />}
          buttonClassName="absolute right-4 top-4">
          <div>
            <div className="container mx-auto">
              <form>
                <div className="">
                  <TextArea
                    name="aboutMe"
                    rows={6}
                    placeholder="Tell about your self"
                    inputClassName={"w-full"}
                    onChange={handleEditAboutMe}
                    value={userProfile?.aboutMe?.description}
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </CardWithTitle>
  );
}
