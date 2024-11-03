import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../../components/Link";
import Title from "../../components/Title";
type props = {
  title: string;
  description: string;
  isHighlight?: boolean;
  containerClassName?: string;
  link: string;
  imageSrc: string;
};

export default function ArticleCard({
  title,
  description,
  isHighlight,
  containerClassName,
  link,
  imageSrc,
}: props) {
  return (
    <div
      className={`flex md:flex-col md:bg-white bg-gray-50 rounded-lg overflow-hidden h-fit ${containerClassName}`}
      onClick={() => window.open(`/blog/${link}`, "_blank")}
    >
      <div className="flex-1 ">
        <img src={imageSrc} alt={title} />
      </div>
      <div
        className={`flex flex-col px-4 flex-1  ${
          isHighlight ? "py-4 md:py-8 gap-2" : "py-2 md:py-4 gap-1"
        }`}
      >
        {isHighlight ? (
          <>
            <Title type="h3" className="line-clamp-2">
              {title}
            </Title>
            <p className="text-base text-gray-500 font-semibold line-clamp-2">
              {description}
            </p>
          </>
        ) : (
          <>
            <p className="text-base text-gray-700 font-semibold line-clamp-2">
              {title}
            </p>
          </>
        )}
        <Link
          to={`/blog/${link}`}
          className={`justify-items-end text-bases md:block hidden ${
            isHighlight ? "pt-6" : "pt-1"
          }`}
        >
          <>
            <span>Start reading</span>
            <span className="pl-1 text-sm">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </>
        </Link>
      </div>
    </div>
  );
}
