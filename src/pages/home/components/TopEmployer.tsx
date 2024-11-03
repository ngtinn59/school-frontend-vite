import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import CompanyCard from "../../../ui/Card/CompanyCard";
import { HOMEPAGE_TOP_EMPLOYERS } from "../../../utils/constants";

export default function TopEmployer() {
  return (
    <section className="py-4 pb-12">
      <Wrapper>
        <Title type="h2" className="text-center">
          Top Employers
        </Title>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 pt-8">
          {HOMEPAGE_TOP_EMPLOYERS.map((employer, index) => (
            <CompanyCard
              key={`top-employer-${index}`}
              title={employer.title}
              skills={[...employer.skills]}
              location={employer.location}
              jobsCount={employer.jobsCount}
              className="mx-auto w-full"
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
