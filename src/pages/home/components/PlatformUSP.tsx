import Button from "../../../components/Button";
import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import { HOMEPAGE_USPS } from "../../../utils/constants";

import uspBlogImage from "../../../assets/usp-blog-image.svg";
import uspCvTemplatesImage from "../../../assets/usp-cv-templates-image.svg";
import uspUserProfileImage from "../../../assets/usp-user-profile-image.svg";

const getPlatformUSPImage = (iconId: string) => {
  switch (iconId) {
    case "user-profile":
      return uspUserProfileImage;
    case "cv-templates":
      return uspCvTemplatesImage;
    case "blog":
      return uspBlogImage;
    default:
      break;
  }
};

export default function PlatformUSP() {
  return (
    <section className="py-4 pb-12">
      <Wrapper>
        <Title type="h2" className="text-center">
          Best tools for your application journey
        </Title>
        <div className="grid lg:grid-cols-3 gap-4 pt-8">
          {HOMEPAGE_USPS.map((usp, index) => (
            <div
              className="flex flex-col sm:flex-row items-center gap-4 w-full"
              key={`usp-${index}`}
            >
              <div>
                <img
                  src={getPlatformUSPImage(usp.iconId)}
                  className="min-w-48 lg:min-w-28 p-6 pt-0 lg:p-3"
                />
              </div>
              <div className="grid grid-row-4 gap-2 text-center sm:text-left">
                <Title type="h4">{usp.title}</Title>
                <p className="text-base font-semibold text-gray-700 row-span-2 pb-4">
                  {usp.description}
                </p>
                <Button
                  type="button"
                  buttonType={index % 2 != 0 ? "primary" : "outline"}
                  className="min-w-36 rounded-lg max-w-48 h-12 mx-auto sm:mx-0"
                >
                  <span className={`text-base font-semibold `}>{usp.cta}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
