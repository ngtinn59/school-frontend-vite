import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../../../components/Link";
import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { HOMEPAGE_FEATURE_ARTICLES } from "../../../utils/constants";
import ArticleCard from "../../../ui/Card/ArticleCard";

export default function FeatureArticle() {
  return (
    <section className="py-4 pb-12 bg-gray-100">
      <Wrapper>
        <div className="flex flex-row  justify-between items-center">
          <Title type="h2" className="text-center">
            Feature Articles
          </Title>
          <Link to="/blog">
            <>
              <span>View all articles </span>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 pt-8">
          {HOMEPAGE_FEATURE_ARTICLES.map((article, index) => (
            <ArticleCard
              key={`feature-article-${index}`}
              containerClassName={`shadow-sm ${
                article.isHighlight
                  ? "md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-3 flex-col"
                  : "flex-row"
              }`}
              title={article.title}
              description={article.description}
              link={article.link}
              imageSrc={article.image}
              isHighlight={article.isHighlight}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
