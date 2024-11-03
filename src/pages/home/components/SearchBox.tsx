import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-router-dom";
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import {
  COLOR_SECONDARY,
  HOMEPAGE_JOBS_CITIES,
  HOMEPAGE_SKILLS_TRENDING,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import { getUserAuthentication } from "../../../services/redux/user";

export default function SearchBox() {
  const user = useSelector(getUserAuthentication);
  return (
    <section className="py-4 pb-12  bg-gradient-to-r from-gray-950 from-40%  to-blue-800 ">
      <Wrapper className="gap-4 grid grid-cols-1 ">
        <Title type="h2" className="text-white">
          {"674 IT Jobs 'Chất' " + (user.name ? "for " + user.name : "")}
        </Title>

        <Form
          className="flex 6 md:flex-row flex-nowrap gap-2 flex-col"
          method="POST"
        >
          <Dropdown
            name="city"
            options={HOMEPAGE_JOBS_CITIES}
            icon={<FontAwesomeIcon icon={faLocationDot} />}
            containerClassName="h-12  font-semibold"
          />

          <div className="flex flex-row flex-1 md:gap-2">
            <Input
              containerClassName="flex-1 flex flex-col"
              type="text"
              name="keyword"
              required
              placeholder="Enter keyword skill (Java, iOS...), job title, company..."
            />
            <Button
              buttonType="primary"
              type="submit"
              className="-ml-1   rounded-s-none rounded-e-lg md:ml-0 px-4 md:rounded-lg  h-12"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="ml-2 md:inline hidden">Search</span>
            </Button>
          </div>
        </Form>

        <div className="flex flex-row flex-wrap gap-2 ">
          <Title type="h-3" className="font-semibold text-gray-100">
            Trending now:
          </Title>
          {HOMEPAGE_SKILLS_TRENDING.map((skill, index) => (
            <Button
              buttonType="colored"
              className="text-sm rounded-2xl border border-gray-400 border-solid hover:bg-gray-600 hover:opacity-100 hover:text-white py-1 px-2"
              backgroundColor={COLOR_SECONDARY}
              textColor="rgb(107,114,128)"
              key={index}
            >
              {skill}
            </Button>
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
